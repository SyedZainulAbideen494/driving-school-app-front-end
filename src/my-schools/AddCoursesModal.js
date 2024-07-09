import React, { useState } from 'react';
import './my-schools.css'; // Import CSS for styling
import { API_ROUTES } from '../app_modules/apiRoutes'; // Assuming you have defined API_ROUTES
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddCoursesModal = ({ isOpen, onClose, onSave }) => {
    const [courseData, setCourseData] = useState({
        title: '',
        price: '',
        description: '',
        image: null // To store the selected image file
    });

    const params = useParams();
    const school_id = params.id; // Fetch school_id from URL params

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setCourseData({ ...courseData, image: files[0] }); // Store the image file
        } else {
            setCourseData({ ...courseData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare form data with image file
        const formData = new FormData();
        formData.append('title', courseData.title);
        formData.append('price', courseData.price);
        formData.append('description', courseData.description);
        formData.append('image', courseData.image);
        formData.append('school_id', school_id); // Add school_id to form data

        // Call API to add course with form data
        axios.post(API_ROUTES.addCourses, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                onSave(response.data); // Update the parent component with new data
                onClose(); // Close the modal
            })
            .catch(error => console.error('Error adding course:', error));
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay-add-courses">
            <div className="modal-content-add-courses">
                <h3>Add Course</h3>
                <form onSubmit={handleSubmit}>
                    <label>Title: <input type="text" name="title" value={courseData.title} onChange={handleChange} required /></label>
                    <label>Price: <input type="text" name="price" value={courseData.price} onChange={handleChange} required /></label>
                    <label>Description: <textarea name="description" value={courseData.description} onChange={handleChange} required /></label>
                    <label>Image: <input type="file" name="image" onChange={handleChange} accept="image/*" required /></label>
                    <div className="modal-buttons-add-courses">
                        <button type="submit">Add</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCoursesModal;