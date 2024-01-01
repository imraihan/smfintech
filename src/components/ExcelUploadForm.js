import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCustomersFromExcel } from '../features/customerSlice';
import * as XLSX from 'xlsx';

const ExcelUploadForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = parseExcel(e.target.result);
        dispatch(addCustomersFromExcel(data));

        setFile(null);
        navigate('/list');
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please check your file.');
      }
    };

    reader.readAsBinaryString(file);
  };

  const parseExcel = (excelData) => {
    const workbook = XLSX.read(excelData, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
  
    const data = XLSX.utils.sheet_to_json(worksheet);
  
    const formattedData = data.map((customer) => {
      return {
        name: customer.Name, 
        email: customer.Email,
        mobile: customer.Mobile,
        nid: customer.NID,
        dob: new Date(customer.DOB).toISOString().split('T')[0], 
      };
    });
  
    return formattedData;
  };
  
  

  return (
    <div className="mb-3">
      <label htmlFor="file" className="form-label">
        Upload Excel File:
      </label>
      <input type="file" className="form-control" id="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button type="button" className="btn btn-secondary mt-2" onClick={handleUpload}>
        Upload File
      </button>
    </div>
  );
};

export default ExcelUploadForm;
