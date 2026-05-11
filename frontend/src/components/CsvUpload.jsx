import './CsvUpload.css'
import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText } from "lucide-react";

export default function CsvUpload({label, onFileSelect}) {
    const [file, setFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef(null)

    const handleFile = (f) => {
        if (!f) return;
        setFile(f)
        onFileSelect(f)
    }

    const formatSize = (size) => {
        if (size <= 1024) return `${size} B`;
        if (size <= 1024 * 1024) return `${Math.round(size / 1024)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    const handleRemove = (e) => {
        e.stopPropagation()
        if (!file) return;
        setFile(null)
        onFileSelect(null)
        inputRef.current.value = ""
    }

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
    }, []);

    const handleDragOver = () => {
        setDragOver(true);
    }

    const handleDragLeave = () => {
        setDragOver(false);
    }

    return <div>
        <p id="csv-upload-label">{label}</p>
        <div id="drop-zone"
            style={{ 
                border: file
                  ? "1.5px dashed #22c55e"
                  : dragOver
                  ? "1.5px dashed #3b82f6"
                  : "1.5px dashed #ccc",
                background: file ? "#f0fdf4" : dragOver ? "#eff6ff" : "#f9fafb",
                borderRadius: 12,
                padding: "1.75rem 1rem",
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.15s, background 0.15s",
                }}
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            {file ? (
                // Selected state
                <>
                <FileText size={16} color="#22c55e" />
                <p id="csv-upload-label">{file.name}</p>
                <p className="csv-upload-subtext">
                    {formatSize(file.size)} · {" "} 
                    <span id="remove-file" onClick={handleRemove}>
                    remove
                    </span>
                </p>
                </>
            ): (
                // Not selected
                <>
                <Upload size={16} color="#6b7280" />
                <p id="csv-upload=label">Drop CSV here</p>
                <p className="csv-upload-subtext">
                    or <span style={{ color: "#3b82f6" }}> browse</span>
                </p>
                </>
            )
            }
        </div>
        <input ref={inputRef} id="file-drop-zone" type="file" accept=".csv" onChange={(e) => handleFile(e.target.files[0])}/>
    </div>
}