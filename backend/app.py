from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS
import pandas as pd
import sys
import os
from datetime import datetime
import numpy as np

# Import directly from the company_locator package
from company_locator.main import CompanyLocator

app = Flask(__name__)
# Configure CORS to allow requests from React
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Store logs in memory
logs = []

def add_log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logs.append(f"[{timestamp}] {message}")
    print(f"[{timestamp}] {message}")

def clean_value(value):
    """Clean a value by converting NaN to empty string and stripping whitespace"""
    if pd.isna(value):
        return ''
    return str(value).strip()

@app.route('/')
def home():
    # Create a simple HTML template to display logs
    template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Company Locator Logs</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .log-container { 
                background-color: #f5f5f5; 
                padding: 20px; 
                border-radius: 5px;
                max-height: 80vh;
                overflow-y: auto;
            }
            .log-entry {
                margin: 5px 0;
                padding: 5px;
                border-bottom: 1px solid #ddd;
            }
            .error { color: red; }
            .success { color: green; }
            .info { color: blue; }
        </style>
    </head>
    <body>
        <h1>Company Locator Logs</h1>
        <div class="log-container">
            {% for log in logs %}
            <div class="log-entry">{{ log }}</div>
            {% endfor %}
        </div>
    </body>
    </html>
    """
    return render_template_string(template, logs=logs)

@app.route('/api/company-locator', methods=['POST'])
def company_locator():
    add_log("=== Starting Company Locator Request ===")
    
    if 'file' not in request.files:
        add_log("Error: No file uploaded")
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        add_log("Error: No file selected")
        return jsonify({'error': 'No file selected'}), 400
    
    add_log(f"Received file: {file.filename}")
    
    try:
        # Read the Excel file
        add_log("Reading Excel file...")
        df = pd.read_excel(file)
        add_log(f"Excel file columns: {df.columns.tolist()}")
        add_log(f"Number of rows: {len(df)}")
        
        # Process the companies
        add_log("Processing companies...")
        results = []
        for index, row in df.iterrows():
            add_log(f"Processing row {index + 1}:")
            
            # Format the company data directly from the row, cleaning NaN values
            formatted_company = {
                'name': clean_value(row.get('Matched_Company_Name', '')),
                'address': clean_value(row.get('Matched_Company_Address', '')),
                'company_number': clean_value(row.get('Matched_Company_Number', '')),
                'postal_code': clean_value(row.get('Matched_Company_Postal_Code', '')),
                'sic_codes': clean_value(row.get('Matched_Company_SIC_Codes', '')),
                'industries': clean_value(row.get('Matched_Company_General_Industries', ''))
            }
            
            # Only add if we have at least a name
            if formatted_company['name']:
                add_log(f"Adding company: {formatted_company['name']}")
                results.append(formatted_company)
        
        add_log(f"Total results found: {len(results)}")
        add_log("=== Company Locator Request Complete ===")
        return jsonify({'companies': results})
    except Exception as e:
        add_log(f"Error processing file: {str(e)}")
        add_log("=== Company Locator Request Failed ===")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    add_log("=== Starting Flask Server ===")
    add_log("Server will be available at http://localhost:5000")
    add_log("Press Ctrl+C to stop the server")
    add_log("=============================")
    app.run(debug=True)
