import React from 'react';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';
import CustomerForm from '../components/CustomerForm';
import CustomerList from '../components/CustomerList';
import NotFound from '../components/NotFound';

const Index = () => {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/create" element={<CustomerForm />} />
        <Route path="/list" element={<CustomerList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
