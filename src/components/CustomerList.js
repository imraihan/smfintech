import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCustomers, deleteCustomer, editCustomer } from '../features/customerSlice';
import { selectUser } from '../features/authSlice';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const customers = useSelector(selectCustomers);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [editedIndex, setEditedIndex] = useState(null);
  const navigate = useNavigate();

  const handleDeleteCustomer = (index) => {
    if (user.role === 'admin') {
      dispatch(deleteCustomer(index));
    } else {
      alert("You don't have permission to delete customers.");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEditCustomer = (index) => {
    if (user.role === 'admin') {
      setEditedCustomer(customers[index]);
      setEditedIndex(index);
      setShowModal(true);
    } else {
      alert("You don't have permission to edit customers.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedCustomer({});
    setEditedIndex(null);
  };

  const handleUpdateCustomer = () => {
    if (user.role === 'admin') {
      dispatch(editCustomer({ index: editedIndex, updatedCustomer: editedCustomer }));
      handleCloseModal();
    } else {
      alert("You don't have permission to edit customers.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div>
            <h2>Customer List</h2>
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>
              Back
            </button>
          </div>
          {customers.length === 0 ? (
            <p className="alert alert-info">No customers available. Please create a customer.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">NID</th>
                  <th scope="col">DOB</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.mobile}</td>
                    <td>{customer.nid}</td>
                    <td>{formatDate(customer.dob)}</td>
                    <td>
                      {user.role === 'admin' && (
                        <>
                          <button
                            className="btn btn-danger me-2"
                            onClick={() => handleDeleteCustomer(index)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEditCustomer(index)}
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateCustomer}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
