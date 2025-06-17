# The ToolBox

## Description

A full-stack application with a React frontend and Python Flask backend, designed to help users manage and analyze company data. The application includes various calculators and work tools to improve productivity.

## Project Structure

```
.
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   │   ├── components/    # React components
│   │   ├── layouts/       # Layout components
│   │   ├── styles/        # CSS styles
│   │   ├── utils/         # Utility functions
│   │   └── hooks/         # Custom React hooks
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
├── backend/           # Python Flask backend
│   ├── app.py        # Main Flask application
│   ├── requirements.txt
│   └── company_locator/  # Company locator module
└── README.md
```

## Features

- CFA Calculators
  - Mean Calculator
  - Return Calculator
- Work Tools
  - Company Locator

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Unix or MacOS:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Backend

1. Make sure your virtual environment is activated
2. Run the Flask application:
   ```bash
   python app.py
   ```
   The backend server will start on http://localhost:5000

### Frontend

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   The frontend will be available at http://localhost:3000

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
