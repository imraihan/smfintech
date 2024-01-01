import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../features/customerSlice';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExcelUploadForm from './ExcelUploadForm';

const CustomerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [nid, setNid] = useState('');
  const [dob, setDob] = useState(new Date());

  const handleCreateCustomer = () => {
    if (!name || !email || !mobile || !nid || !dob) {
      alert('Please fill in all fields');
      return;
    }

    if (![10, 13, 17].includes(nid.length)) {
      alert('Invalid NID length');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return;
    }

    const mobileRegex = /^\d{13}$/;
    if (!mobileRegex.test(mobile)) {
      alert('Invalid mobile number');
      return;
    }

    const newCustomer = { name, email, mobile, nid, dob: dob.toDateString() };
    dispatch(addCustomer(newCustomer));

    // Reset form fields
    setName('');
    setEmail('');
    setMobile('');
    setNid('');
    setDob(new Date());

    // Navigate to the list page
    navigate('/list');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Create Customer</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">
                Mobile:
              </label>
              <input
                type="text"
                className="form-control"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nid" className="form-label">
                NID:
              </label>
              <input
                type="text"
                className="form-control"
                id="nid"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                DOB:
              </label>
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate('/list')}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateCustomer}
              >
                Create Customer
              </button>
            </div>
          </form>
          <ExcelUploadForm />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
