import re
from typing import List, Dict
from rapidfuzz import fuzz

class DataProcessor:
    @staticmethod
    def normalize_company_name(name: str) -> str:
        """Normalize company name for better matching"""
        if not name:
            return ''
        name = name.lower()
        name = re.sub(r'[^a-z0-9 ]', '', name)
        name = name.replace(' ltd', ' limited')
        name = name.replace('ltd ', 'limited ')
        name = name.replace(' co ', ' company ')
        name = name.replace('plc', 'public limited company')
        name = name.replace('&', 'and')
        name = re.sub(r'\s+', ' ', name).strip()
        return name

    @staticmethod
    def format_address(address: Dict) -> tuple:
        """Format address components into full address and postal code"""
        address_parts = []
        for key in ['premises', 'address_line_1', 'address_line_2', 'locality', 'region', 'postal_code']:
            if address.get(key):
                address_parts.append(address[key])
        full_address = ', '.join(address_parts)
        postal_code = address.get('postal_code', '')
        return full_address, postal_code

    @staticmethod
    def select_best_match(results: List[Dict], input_company_name: str) -> Dict:
        """Select the best matching company from multiple results"""
        if not results:
            return {}
            
        results_with_address = [r for r in results if r.get('address')]
        if len(results_with_address) == 1:
            return results_with_address[0]
        elif len(results_with_address) > 1:
            postcodes = [r.get('address', {}).get('postal_code', '') for r in results_with_address]
            if len(postcodes) != len(set(postcodes)):
                return results_with_address[0]
            else:
                norm_input = DataProcessor.normalize_company_name(input_company_name)
                return max(
                    results_with_address,
                    key=lambda r: fuzz.ratio(norm_input, DataProcessor.normalize_company_name(r.get('title', '')))
                )
        return results[0] if results else {} 