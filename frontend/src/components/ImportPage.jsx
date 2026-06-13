import './ImportPage.css'
import CsvUpload from './CsvUpload.jsx'
import TransactionTable from './TransactionTable.jsx'
import React, { useState } from 'react';

export default function ImportPage() {
    const [transactionsFile, setTransactionsFile] = useState(null);
    const [retirementFile, setContributionsFile] = useState(null);
    const [transactions, setTransactions] = useState(null);

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
      setTransactions(data);
    };

    return <>
    <h2>Import transactions</h2>
    <p>Upload your CSV files to get started.</p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <CsvUpload label="Transactions" onFileSelect={setTransactionsFile}/>
        <CsvUpload label="Retirement contributions" onFileSelect={setContributionsFile}/>
    </div>
    <button onClick={handleSubmit} disabled={!transactionsFile || !retirementFile} style={{marginTop: "12px"}}>Upload and parse</button>
    {transactions && <TransactionTable data={transactions} />}
    </>
}