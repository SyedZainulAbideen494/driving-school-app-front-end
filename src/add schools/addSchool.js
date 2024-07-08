import React, { useState } from 'react';
import axios from 'axios';
import './addSchool.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../app_modules/apiRoutes';

const DrivingSchoolForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    establishedYear: '',
    address: '',
    email: '',
    website: '',
    ownerName: '',
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.establishedYear) newErrors.establishedYear = 'Established year is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
    if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone number is invalid';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post(API_ROUTES.requestDrivingSchool, formData);
        setShowModal(true); // Show modal on successful submission
      } catch (error) {
        console.error('There was an error adding the driving school!', error);
      }
    }
  };

  const handleDoneBtn = () => {
    navigate('/')
  }

  return (
    <div className="container-create-driving-school">
      <header className="form-header-create-driving-school">
        <button className="back-button-create-driving-school" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h4>Driving School Application</h4>
      </header>
      <h4>Request to Add Your Driving School</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group-create-driving-school">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group-create-driving-school">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div className="form-group-create-driving-school">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        <div className="form-group-create-driving-school">
          <label htmlFor="establishedYear">Established Year:</label>
          <input
            type="number"
            id="establishedYear"
            name="establishedYear"
            value={formData.establishedYear}
            onChange={handleChange}
          />
          {errors.establishedYear && <span className="error">{errors.establishedYear}</span>}
        </div>

        <div className="form-group-create-driving-school">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group-create-driving-school">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group-create-driving-school">
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='submit-btn-create-driving-school'>Submit</button>
      </form>

      {showModal && (
        <div className="modal-create-driving-school">
          <div className="modal-content-create-driving-school">
            <div className="green-tick-create-driving-school"></div>
            <h4>Request Submitted Successfully!<br/>Our team will get in touch with you shortly</h4>
            <button className='submit-btn-create-driving-school' onClick={handleDoneBtn}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrivingSchoolForm;