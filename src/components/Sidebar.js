import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/authSlice';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="bg-light border-end" id="sidebar">
      <div className="sidebar-heading text-center py-4">
        <p className="text-muted">Welcome Mr. {user.name}</p>
      </div>
      {user.role === 'admin' && (
        <>
          <div className="list-group list-group-flush">
            <p className="list-group-item bg-light">Admin Sidebar</p>
            <Link to='/create' className="list-group-item">Create Customer</Link>
            <Link to='/list' className="list-group-item">Show Customer List</Link>
          </div>
        </>
      )}
      {user.role === 'hr' && (
        <>
          <div className="list-group list-group-flush">
            <p className="list-group-item bg-light">HR Sidebar</p>
            <Link to='/list' className="list-group-item">Show Customer List</Link>
          </div>
        </>
      )}
      {user.role === 'customer' && (
        <>
          <div className="list-group list-group-flush">
            <p className="list-group-item bg-light">Welcome Customer!</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
