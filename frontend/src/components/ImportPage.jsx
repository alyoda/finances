import './ImportPage.css'
import CsvUpload from './CsvUpload.jsx'
import React, { useState } from 'react';

export default function ImportPage() {
    const [transactionsFile, setTransactionsFile] = useState(null);
    const [contributionsFile, setContributionsFile] = useState(null);
  
    const handleSubmit = async () => {
      // use both files here
    };

    return <>
    <h2>Import transactions</h2>
    <p>Upload your CSV files to get started.</p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <CsvUpload label="Transactions" onFileSelect={setTransactionsFile}/>
        <CsvUpload label="Retirement contributions" onFileSelect={setContributionsFile}/>
    </div>
    <button style={{marginTop: "12px"}}>Upload and parse</button>
    </>
}