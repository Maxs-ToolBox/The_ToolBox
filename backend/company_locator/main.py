import pandas as pd
import time
import os
from typing import List, Dict
from .api.companies_house_client import CompaniesHouseClient
from .utils.data_processor import DataProcessor
from .data.sic_handler import SICHandler

class CompanyLocator:
    def __init__(self):
        self.api_client = CompaniesHouseClient()
        self.data_processor = DataProcessor()
        self.sic_handler = SICHandler()

    def process_excel_file(self, input_file: str, company_column: str, output_file: str):
        """Process an Excel file containing company names and fetch matches for each"""
        try:
            df = pd.read_excel(input_file, skiprows=0, usecols='A')
            
            if company_column not in df.columns:
                raise ValueError(f"Column '{company_column}' not found in the Excel file")
            
            output_rows = []
            for _, row in df.iterrows():
                input_company_name = row[company_column]
                if pd.isna(input_company_name):
                    continue
                print(f"Processing {input_company_name}...")
                
                companies = self.api_client.search_company(input_company_name) or []
                results = []
                
                for company_data in companies[:3]:
                    if not company_data:
                        continue
                        
                    company_number = company_data.get('company_number', '')
                    matched_name = company_data.get('title', '')
                    address = company_data.get('address') or {}
                    
                    full_address, postal_code = self.data_processor.format_address(address)
                    
                    # Get SIC codes from company profile
                    sic_codes = []
                    if company_number:
                        profile_data = self.api_client.get_company_profile(company_number)
                        sic_codes = profile_data.get('sic_codes', [])
                    
                    sic_codes_str = ', '.join(sic_codes) if isinstance(sic_codes, list) else str(sic_codes)
                    general_industries_str = self.sic_handler.get_general_industries(sic_codes)
                    
                    results.append({
                        'Matched_Company_Name': matched_name,
                        'Matched_Company_Number': company_number,
                        'Matched_Company_Address': full_address,
                        'Matched_Company_Postal_Code': postal_code,
                        'Matched_Company_SIC_Codes': sic_codes_str,
                        'Matched_Company_General_Industries': general_industries_str
                    })
                
                if results:
                    best_match = self.data_processor.select_best_match(results, input_company_name)
                    if best_match:
                        output_rows.append(best_match)
                
                time.sleep(0.01)  # Rate limiting
            
            output_df = pd.DataFrame(output_rows)
            output_df.to_excel(output_file, index=False)
            print(f"Results saved to {output_file}")
            
        except Exception as e:
            print(f"Error processing Excel file: {str(e)}")

def main():
    if not os.path.exists('.env'):
        with open('.env', 'w') as f:
            f.write('COMPANIES_HOUSE_API_KEY=your_api_key_here')
        print("Created .env file. Please add your Companies House API key to it.")
        return

    locator = CompanyLocator()
    
    input_file = input("Enter the path to your Excel file: ")
    company_column = input("Enter the name of the column containing company names: ")
    output_file = input("Enter the name for the output Excel file: ")
    
    locator.process_excel_file(input_file, company_column, output_file)

if __name__ == "__main__":
    main() 