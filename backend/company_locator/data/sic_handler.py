import csv
from typing import Dict, List
import os
from pathlib import Path

class SICHandler:
    def __init__(self, sic_file=None):
        if sic_file is None:
            # Get the path to the data directory
            current_dir = Path(__file__).parent
            sic_file = current_dir / 'sic_3_digit_codes.csv'
        self.sic_map = self.load_sic_3digit_map(sic_file)

    def load_sic_3digit_map(self, sic_file: str) -> Dict[str, str]:
        """Load SIC code descriptions from CSV file"""
        sic_map = {}
        try:
            with open(sic_file, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                code_header = '\ufeffCode' if '\ufeffCode' in reader.fieldnames else 'Code'
                for row in reader:
                    if code_header in row:
                        sic_map[row[code_header]] = row['Description']
                    else:
                        print(f"Warning: Could not find code header ('{code_header}' or 'Code') in {sic_file} row: {row}")
        except FileNotFoundError:
            print(f"Warning: 3-digit SIC code descriptions file not found at {sic_file}")
        except Exception as e:
            print(f"Warning: Could not load 3-digit SIC code descriptions: {e}")
        return sic_map

    def get_general_industries(self, sic_codes: List[str]) -> str:
        """Get general industry descriptions for SIC codes"""
        if not sic_codes:
            return ''
        if isinstance(sic_codes, str):
            sic_codes = [sic_codes]
        industries = set()
        for code in sic_codes:
            code = str(code).strip()
            if len(code) >= 3:
                three_digit = code[:3]
                desc = self.sic_map.get(three_digit)
                if desc:
                    industries.add(desc)
        return ', '.join(sorted(industries)) 