import requests
from typing import Dict, List
import os
from dotenv import load_dotenv
from pathlib import Path

class CompaniesHouseClient:
    def __init__(self):
        print("\n=== Debug Information ===")
        print(f"Current working directory: {os.getcwd()}")
        
        # Load the .env file
        print("\nLoading .env file...")
        load_dotenv(override=True)  # Force reload of environment variables
        print("Finished loading .env file")
        
        # Debug: Print ALL environment variables
        print("\nAll environment variables:")
        for key, value in os.environ.items():
            print(f"{key}: {value}")
        
        # Get API key from environment
        try:
            print("\nAttempting to get API key...")
            # Try different methods to get the API key
            api_key = os.getenv("COMPANIES_HOUSE_API_KEY")
            if not api_key:
                # Try case-insensitive search
                for key, value in os.environ.items():
                    if key.upper() == "COMPANIES_HOUSE_API_KEY":
                        api_key = value
                        break
            
            if not api_key:
                raise KeyError("API key not found")
                
            self.api_key = api_key
            print(f"Successfully got API key: {self.api_key[:8]}...")  # Show first 8 chars
        except KeyError:
            print("\nERROR: API key not found in environment variables")
            print("Available environment variables containing 'COMPANIES_HOUSE':")
            for key in os.environ.keys():
                if 'COMPANIES_HOUSE' in key:
                    print(f"- {key}")
            raise ValueError("Companies House API key not found. Please set COMPANIES_HOUSE_API_KEY in .env file")
        
        self.base_url = "https://api.company-information.service.gov.uk"
        self.headers = {
            'Accept': 'application/json'
        }

    def search_company(self, company_name: str) -> List[Dict]:
        """Search for a company using the Companies House API, returning up to 5 results"""
        search_url = f"{self.base_url}/search/companies"
        params = {
            'q': company_name,
            'items_per_page': 5
        }
        try:
            response = requests.get(search_url, headers=self.headers, params=params, auth=(self.api_key, ''))
            response.raise_for_status()
            data = response.json()
            return data.get('items', [])
        except requests.exceptions.RequestException as e:
            print(f"Error searching for company {company_name}: {str(e)}")
            return []

    def get_company_profile(self, company_number: str) -> Dict:
        """Get the company profile including registered address and SIC codes"""
        company_url = f"{self.base_url}/company/{company_number}"
        try:
            response = requests.get(company_url, headers=self.headers, auth=(self.api_key, ''))
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error getting profile for company {company_number}: {str(e)}")
            return {} 