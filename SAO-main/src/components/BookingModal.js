// src/components/BookingModal.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ message, onClose }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Set up the countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect to homepage after countdown reaches 0
    if (countdown === 0) {
      clearInterval(timer);
      navigate('/');
    }

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-4">{message}</h3>
        <p className="text-center mb-4">You will be redirected in {countdown} seconds...</p>
        <button
          onClick={onClose}
          className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
