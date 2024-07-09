import React, { useState } from 'react';
import './my-schools.css'; // Import CSS for styling
import { API_ROUTES } from '../app_modules/apiRoutes'; // Assuming you have defined API_ROUTES
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddClassesModal = ({ isOpen, onClose, onSave }) => {
    const [classData, setClassData] = useState({
        title: '',
        description: '',
        video: null // To store the selected video file
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'video') {
            setClassData({ ...classData, video: files[0] }); // Store the video file
        } else {
            setClassData({ ...classData, [name]: value });
        }
    };

    const params = useParams()

    const schoolId = params.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', classData.title);
            formData.append('description', classData.description);
            formData.append('video', classData.video);
            formData.append('school_id', schoolId); // Include school_id in the form data

            // Upload video file to API
            const response = await axios.post(API_ROUTES.addClasses, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            onSave(response.data); // Update the parent component with new data
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error adding class:', error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay-add-classes">
            <div className="modal-content-add-classes">
                <h3>Add Class</h3>
                <form onSubmit={handleSubmit}>
                    <label>Title: <input type="text" name="title" value={classData.title} onChange={handleChange} /></label>
                    <label>Description: <textarea name="description" value={classData.description} onChange={handleChange} /></label>
                    <label>Video File: <input type="file" name="video" onChange={handleChange} accept="video/*" required /></label>
                    <div className="modal-buttons-add-classes">
                        <button type="submit">Add</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClassesModal;