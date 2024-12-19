// src/components/LoanEligibilityChecker.js
import React, { useState } from 'react';
import axios from 'axios';
import './LoanEligibilityChecker.css';  // Custom styling for this component

const LoanEligibilityChecker = () => {
  const [customerId, setCustomerId] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleCheckEligibility = async () => {
    setError('');
    setResult('');
    if (!customerId || !loanAmount) {
      setError('Please enter both Customer ID and Loan Amount.');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/loans/check?customerId=${customerId}&loanAmount=${loanAmount}`
      );
      setResult(response.data);
    } catch (err) {
      setError('Error connecting to the server. Please try again.');
    }
  };

  return (
    <div className="loan-eligibility-container">
      <h2 className="loan-header">Loan Eligibility Checker</h2>
      <div className="form-group mt-4">
        <label>Customer ID:</label>
        <input
          type="text"
          className="form-control"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="Enter Customer ID"
        />
      </div>

      <div className="form-group mt-3">
        <label>Loan Amount:</label>
        <input
          type="text"
          className="form-control"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter Loan Amount"
        />
      </div>

      <button className="btn btn-success mt-3" onClick={handleCheckEligibility}>
        Check Eligibility
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {result && <div className="alert alert-success mt-3">{result}</div>}
    </div>
  );
};

export default LoanEligibilityChecker;
