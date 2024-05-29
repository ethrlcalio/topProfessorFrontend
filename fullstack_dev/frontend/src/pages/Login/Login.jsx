import React, { useState } from 'react';
import LoginModal from '../../components/LoginModal';

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form data
    setFormData({
      username: '',
      password: ''
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted with:", formData);
  };

  return (
    <div>
      <button onClick={openModal}>Login</button>
      <LoginModal isOpen={isModalOpen} onClose={closeModal} formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
