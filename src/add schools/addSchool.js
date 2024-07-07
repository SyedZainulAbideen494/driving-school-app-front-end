import React, { useState } from 'react';
import axios from 'axios';
import Switch from 'react-switch';
import './addSchool.css';
import { FaArrowLeft, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DrivingSchoolForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    logo_url: '',
    established_year: ''
  });

  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);
  const [step, setStep] = useState(1); // Step state
  const [showWebsiteInput, setShowWebsiteInput] = useState(false); // State for switch
  const [progressText, setProgressText] = useState('Start'); // Progress text state
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'logo_url') {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);
        setFormData({
          ...formData,
          logo_url: file // Store file object directly
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'logo_url' && key !== 'website') {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create FormData object for file upload
    const formDataWithFile = new FormData();
    formDataWithFile.append('name', formData.name);
    formDataWithFile.append('address', formData.address);
    formDataWithFile.append('city', formData.city);
    formDataWithFile.append('state', formData.state);
    formDataWithFile.append('zip_code', formData.zip_code);
    formDataWithFile.append('country', formData.country);
    formDataWithFile.append('phone', formData.phone);
    formDataWithFile.append('email', formData.email);
    formDataWithFile.append('website', formData.website);
    formDataWithFile.append('description', formData.description);
    formDataWithFile.append('established_year', formData.established_year);
    formDataWithFile.append('logo_url', formData.logo_url); // Append file object

    axios.post('http://localhost:8080/api/create/schools', formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          console.log('Form submitted successfully!', response);
          // Handle success (e.g., redirect or show success message)
        })
        .catch((error) => {
          console.error('There was an error submitting the form!', error);
          // Handle error (e.g., show error message)
        });
  };

  const renderProgressText = () => {
    if (step === 1) {
      return 'Start';
    } else if (step === 2) {
      return 'Almost There';
    } else if (step === 3) {
      return 'Finished';
    }
  };

  const handleBackclick = () => {
    nav('/');
  };
  return (
    <div className="container-create-driving-school">
      <header className="header-create-driving-school">
      <div className="back-btn" onClick={handleBackclick}>
                    <FaArrowLeft />
                </div>
        <h3>Add New Driving School</h3>
      </header>
      <form className="form-create-driving-school" onSubmit={handleSubmit}>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            Name:
            <input
              className="form-input-create-driving-school"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="validation-message">{errors.name}</div>}
          </label>
        </div>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            Address:
            <input
              className="form-input-create-driving-school"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <div className="validation-message">{errors.address}</div>}
          </label>
        </div>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            City:
            <input
              className="form-input-create-driving-school"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <div className="validation-message">{errors.city}</div>}
          </label>
        </div>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            State:
            <input
              className="form-input-create-driving-school"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <div className="validation-message">{errors.state}</div>}
          </label>
        </div>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            Zip Code:
            <input
              className="form-input-create-driving-school"
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
            />
            {errors.zip_code && <div className="validation-message">{errors.zip_code}</div>}
          </label>
        </div>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            Country:
            <input
              className="form-input-create-driving-school"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            {errors.country && <div className="validation-message">{errors.country}</div>}
          </label>
        </div>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            Phone:
            <input
              className="form-input-create-driving-school"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="validation-message">{errors.phone}</div>}
          </label>
        </div>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            Email:
            <input
              className="form-input-create-driving-school"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="validation-message">{errors.email}</div>}
          </label>
        </div>
        <div className="form-group-create-driving-school">
        </div>
          <div className="form-group-create-driving-school">
            <label className="form-label-create-driving-school">
              Website:
              <input
                className="form-input-create-driving-school"
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </label>
          </div>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            Description:
            <textarea
              className="form-input-create-driving-school"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <div className="validation-message">{errors.description}</div>}
          </label>
        </div>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            Established Year:
            <input
              className="form-input-create-driving-school"
              type="text"
              name="established_year"
              value={formData.established_year}
              onChange={handleChange}
            />
            {errors.established_year && <div className="validation-message">{errors.established_year}</div>}
          </label>
        </div>
        <div className="form-group-create-driving-school">
          <label className="form-label-create-driving-school">
            Logo URL:
            <input
              className="form-input-create-driving-school"
              type="file"
              name="logo_url"
              onChange={handleChange}
            />
          </label>
          {logoPreview && (
            <div className="image-preview">
              <img src={logoPreview} alt="Logo Preview" />
            </div>
          )}
        </div>
        <div className="form-actions-create-driving-school">
          <button className="btn cancel-btn-create-driving-school" type="button" onClick={() => setStep(1)}>
            <FaTimes className="icon" /> cancel
          </button>
          <button className="btn confirm-btn-create-driving-school" type="submit">
            <FaCheck className="icon" /> confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default DrivingSchoolForm;