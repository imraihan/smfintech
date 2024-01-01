import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { selectUser } from '../features/authSlice';

const Dashboard = () => {
  const user = useSelector(selectUser);
  if (!user || !user.email) {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <Sidebar />
          </nav>

          <main className="col-md-10 ms-sm-auto">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome!</h5>
              <p className="card-text">Please register and test the app.</p>
            </div>
          </div>
          </main>
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <Sidebar />
        </nav>

        <main className="col-md-10 ms-sm-auto">
          <div className="pt-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">User Information</h5>
                <p className="card-text">Email: {user.email}</p>
                <p className="card-text">Name: {user.name}</p>
                <p className="card-text">Role: {user.role}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
