# The ToolBox

## Description

A full-stack application with a React frontend and Python Flask backend, designed to collate all of the small projects I've made into one place. The application includes various calculators and work tools to improve productivity.

## Quick Setup (Windows)

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- [Git](https://git-scm.com/)

### One-Command Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Maxs-ToolBox/The_ToolBox.git
   cd The_ToolBox
   ```

2. Run the setup script:

   ```bash
   setup.bat
   ```

   This will automatically:

   - Set up the Python virtual environment
   - Install backend dependencies
   - Start the backend server
   - Install frontend dependencies
   - Start the frontend development server

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Manual Setup

If you prefer to set up manually or are using a different operating system, follow these steps:

1. Set up the Backend:

   ```bash
   # Navigate to backend directory
   cd backend

   # Create and activate virtual environment
   python -m venv venv

   # On Windows:
   .\venv\Scripts\activate
   # On Unix or MacOS:
   source venv/bin/activate

   # Install dependencies
   pip install -r requirements.txt

   # Start the backend server
   python app.py
   ```

   The backend server will start on http://localhost:5000

2. Set up the Frontend (in a new terminal):

   ```bash
   # Navigate to frontend directory
   cd frontend

   # Install dependencies
   npm install

   # Start the development server
   npm start
   ```

   The frontend will be available at http://localhost:3000

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

## Troubleshooting

### Common Issues

1. **Port already in use**

   - If port 5000 is in use, you can change the backend port in `backend/app.py`
   - If port 3000 is in use, React will automatically ask to use a different port

2. **Module not found errors**

   - Make sure you're in the correct directory when running commands
   - Ensure all dependencies are installed
   - Try deleting `node_modules` and running `npm install` again for frontend issues
   - Try deleting `venv` and recreating it for backend issues

3. **CORS errors**
   - The backend is configured to accept requests from http://localhost:3000
   - If you're using a different port, update the CORS settings in `backend/app.py`

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
