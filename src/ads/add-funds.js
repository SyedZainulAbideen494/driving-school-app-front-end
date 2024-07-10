import React, { useState } from 'react';
import axios from 'axios';
import './ads.css'; // Import your CSS for the Add Funds page
import { API_ROUTES } from '../app_modules/apiRoutes';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51LoS3iSGyKMMAZwsaj8KZX4Sqqffth0eo9jyTSElpu9UG8M815kZdSIg1huPtPgke75vqtymOLDXtwosJrEYBWPh001ecyI5aW'); // Replace with your actual publishable key

const AddFunds = () => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleAddFunds = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(API_ROUTES.addFunds, { amount, token });

            const sessionId = response.data.sessionId;

            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
                sessionId: sessionId,
            });

            if (error) {
                console.error('Error redirecting to Checkout:', error);
                setError('Failed to redirect to Stripe Checkout. Please try again later.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            setError('Failed to create checkout session. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <div className="add-funds-page">
            <h1>Add Funds</h1>
            <div className="add-funds-form">
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                />
                <button onClick={handleAddFunds} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Funds'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default AddFunds;