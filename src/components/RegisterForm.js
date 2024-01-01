import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleRegister = () => {
    const user = { name, email, password, role };
    localStorage.setItem(email, JSON.stringify(user));
    dispatch(loginUser(user));
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Register</h2>
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
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role:
              </label>
              <select
                className="form-select"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>Select a Role</option>
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleRegister}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
