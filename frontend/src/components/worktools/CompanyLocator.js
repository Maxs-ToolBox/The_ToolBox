import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { FaBuilding, FaDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import "../../App.css";

const API_BASE_URL = "http://localhost:5000";

const CompanyLocator = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sidebarItems = [
    {
      path: "/worktools/company-locator",
      label: "Company Locator",
      icon: <FaBuilding className="sidebar-icon" />,
    },
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a valid Excel file (.xlsx)");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/company-locator`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Failed to process file" }));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      setResults(data.companies || []);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An error occurred while processing the file");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (results.length === 0) return;

    // Reorder results for Excel export
    const orderedResults = results.map((company) => ({
      company_number: company.company_number,
      company_name: company.name,
      address: company.address,
      postal_code: company.postal_code,
      sic_codes: company.sic_codes,
      industries: company.industries,
    }));

    const worksheet = XLSX.utils.json_to_sheet(orderedResults);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Company Results");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "company_results.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Sidebar items={sidebarItems} />
      <div className="page-container">
        <div className="work-tools-main">
          {/* Top Row */}
          <div className="work-tools-top-row">
            <div className="card-header">
              <h3>Company Search</h3>
            </div>
            <div className="card-content">
              <div className="input-group brand-file-upload">
                <input
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                  className="form-control"
                />
                <button
                  className="btn btn-primary"
                  onClick={handleUpload}
                  disabled={loading || !file}
                >
                  {loading ? "Processing..." : "Upload"}
                </button>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="work-tools-bottom-row">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h3>Results</h3>
                {results.length > 0 && (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleDownload}
                  >
                    <FaDownload className="me-2" />
                    Download Excel
                  </button>
                )}
              </div>
            </div>
            <div className="card-content">
              <div className="table-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Company Number</th>
                      <th>Company Name</th>
                      <th>Address</th>
                      <th>Postal Code</th>
                      <th>SIC Codes</th>
                      <th>Industries</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((company, index) => (
                      <tr key={index}>
                        <td>{company.company_number}</td>
                        <td>{company.name}</td>
                        <td>{company.address}</td>
                        <td>{company.postal_code}</td>
                        <td>{company.sic_codes}</td>
                        <td>{company.industries}</td>
                      </tr>
                    ))}
                    {results.length === 0 && !loading && (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No results to display
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyLocator;
