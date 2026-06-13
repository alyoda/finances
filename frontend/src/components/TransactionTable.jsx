import './TransactionTable.css'
import React, { useState } from 'react';

const SECTIONS = [
    { key: 'expenses', label: 'Expenses' },
    { key: 'income', label: 'Income' },
    { key: 'retirement', label: 'Retirement' },
];

const COLUMNS = [
    { key: 'date', label: 'Date' },
    { key: 'vendor', label: 'Vendor' },
    { key: 'amount', label: 'Amount' },
    { key: 'category', label: 'Category' },
    { key: 'subCategory', label: 'Subcategory' },
];

function TransactionSection({ label, rows, onChange }) {
    if (!rows || rows.length === 0) return null;

    const handleCellChange = (index, key, value) => {
        const updated = rows.map((row, i) => i === index ? { ...row, [key]: value } : row);
        onChange(updated);
    };

    return <div className="transaction-section">
        <h3>{label}</h3>
        <table className="transaction-table">
            <thead>
                <tr>
                    {COLUMNS.map(col => <th key={col.key}>{col.label}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        {COLUMNS.map(col => (
                            <td key={col.key}>
                                <input
                                    value={row[col.key]}
                                    onChange={(e) => handleCellChange(index, col.key, e.target.value)}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>;
}

export default function TransactionTable({ data }) {
    const [rows, setRows] = useState(data);

    return <div className="transaction-table-container">
        {SECTIONS.map(({ key, label }) => (
            <TransactionSection
                key={key}
                label={label}
                rows={rows[key]}
                onChange={(updated) => setRows({ ...rows, [key]: updated })}
            />
        ))}
    </div>;
}
