import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUser, logoutUser } from '../features/authSlice';

const Navbar = () => {
const isAuthenticated = useSelector(selectIsAuthenticated);
const user = useSelector(selectUser);
const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem('user');

    dispatch(logoutUser());
    navigate('/login');
};

return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <Link className="navbar-brand" to="/">User App</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Dashboard</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">{user.role}</span>
              </li>
              <li className="nav-item">
              {user && <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>}
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar