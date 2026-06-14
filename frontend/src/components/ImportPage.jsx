import CsvUpload from './CsvUpload.jsx';
import './ImportPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImportPage() {
    const [transactionsFile, setTransactionsFile] = useState(null);
    const [retirementFile, setContributionsFile] = useState(null);

    let navigate = useNavigate();

    const handleSubmit = async () => {
      if (!transactionsFile || !retirementFile) {
        alert("Please add both a transactions and retirement file");
        return;
      }
      const formData = new FormData();
      console.log("transactions:", transactionsFile);
      console.log("retirement:", retirementFile);
      formData.append("transactions", transactionsFile);
      formData.append("retirement", retirementFile);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    
      const data = await res.json();
      navigate("/transactions", { state: data });
    };

    return <>
    <h2>Import transactions</h2>
    <p>Upload your CSV files to get started.</p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <CsvUpload label="Transactions" onFileSelect={setTransactionsFile}/>
        <CsvUpload label="Retirement contributions" onFileSelect={setContributionsFile}/>
    </div>
    <button onClick={handleSubmit} disabled={!transactionsFile || !retirementFile} style={{marginTop: "12px"}}>Upload and parse</button>
    </>
}