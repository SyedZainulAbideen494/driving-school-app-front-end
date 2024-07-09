import React, { useState } from 'react';
import './my-schools.css'; // Import CSS for styling
import { API_ROUTES } from '../app_modules/apiRoutes'; // Assuming you have defined API_ROUTES
import axios from 'axios';

const EditSchoolModal = ({ schoolData, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...schoolData });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call API to update school details
        axios.put(`${API_ROUTES.updateSchool}/${schoolData.id}`, formData)
            .then(response => {
                onSave(response.data); // Update the parent component with new data
                onClose(); // Close the modal
            })
            .catch(error => console.error('Error updating school details:', error));
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay-edit-school">
            <div className="modal-content-edit-school">
                <h3>Edit School Details</h3>
                <form onSubmit={handleSubmit}>
                    <label>Name:<br/> <input type="text" name="name" value={formData.name} onChange={handleChange} /></label><br/>
                    <label>Address:<br/> <input type="text" name="address" value={formData.address} onChange={handleChange} /></label><br/>
                    <label>City:<br/> <input type="text" name="city" value={formData.city} onChange={handleChange} /></label><br/>
                    <label>State:<br/> <input type="text" name="state" value={formData.state} onChange={handleChange} /></label><br/>
                    <label>Country:<br/> <input type="text" name="country" value={formData.country} onChange={handleChange} /></label><br/>
                    <label>Zip Code:<br/> <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} /></label><br/>
                    <label>Phone:<br/> <input type="text" name="phone" value={formData.phone} onChange={handleChange} /></label><br/>
                    <label>Email:<br/> <input type="email" name="email" value={formData.email} onChange={handleChange} /></label><br/>
                    <label>Website:<br/> <input type="text" name="website" value={formData.website} onChange={handleChange} /></label><br/>
                    <label>Description:<br/> <textarea name="description" value={formData.description} onChange={handleChange} /></label><br/>
                    <div className="modal-buttons-edit-school">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSchoolModal;