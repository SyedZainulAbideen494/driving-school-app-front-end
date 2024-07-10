import React, { useState } from 'react';
import axios from 'axios';
import { API_ROUTES } from '../app_modules/apiRoutes';
import './ads.css'; // Import the CSS file

const AdForm = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(12); // Default duration
  const [banner, setBanner] = useState(null);
  const [website, setWebsite] = useState('');
  const [err, setErr] = useState('')
  const handleBannerChange = (e) => {
    setBanner(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Replace with your logic to get the token

    const formData = new FormData();
    formData.append('title', title);
    formData.append('duration', duration);
    formData.append('banner', banner);
    formData.append('website', website);

    try {
      const response = await axios.post(API_ROUTES.runAds, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Ad submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting ad:', error.response ? error.response.data : error.message);
      setErr(error.response.data)
    }
  };

  return (
    <div className="ad-form-container">
      <header className="ad-form-header">
        <button className="back-button">&larr;</button>
        <h2>Create Ad</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Duration (20rs per 12 hrs)</label>
          <input type="range" className="form-control-range" min="12" max="600" step="12" value={duration} onChange={(e) => setDuration(e.target.value)} />
          <span className="duration-display">{duration} hrs</span>
        </div>
        <div className="form-group">
          <label>Banner</label>
          <input type="file" className="form-control-file" onChange={handleBannerChange} />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input type="text" className="form-control" value={website} onChange={(e) => setWebsite(e.target.value)} required />
        </div>
        <p>{err}</p>
        <button type="submit" className="submit-button">Submit Ad</button>
      </form>
    </div>
  );
};

export default AdForm;