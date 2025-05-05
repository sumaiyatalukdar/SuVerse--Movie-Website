import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../assets/background_banner.jpg';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import './ContactUs.css';

const ContactUs = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [rating, setRating] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(null);
    const [showThankYou, setShowThankYou] = useState(false);

    const emojiRatings = [
        { value: 1, emoji: "😡", label: "Very Bad" },
        { value: 2, emoji: "😞", label: "Bad" },
        { value: 3, emoji: "😐", label: "Neutral" },
        { value: 4, emoji: "😊", label: "Good" },
        { value: 5, emoji: "🤩", label: "Excellent" }
    ];

    const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    };

    useEffect(() => {
        const savedRating = getCookie('userRating');
        if (savedRating) {
            setRating(savedRating);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Message sent successfully!');
        setShowPopup(true);
        setFormData({ name: '', email: '', message: '' });
    };

    const handleRating = (value) => {
        setRating(value);
        document.cookie = `userRating=${value}; path=/; max-age=31536000`;

        // Close rating popup after 0.1s & show Thank You message
        setTimeout(() => {
            setShowPopup(false);
            setShowThankYou(true);
        }, 100);

        // Auto-close Thank You message after 5 seconds
        setTimeout(() => {
            setShowThankYou(false);
        }, 5000);
    };

    return (
        <div className='backdrop' style={{ backgroundImage: `url(${backgroundImg})` }}>
            <img
                src={back_arrow_icon}
                alt="Back"
                onClick={() => navigate(-1)}
                className="back-arrow-icon"
            />

            <div className="contact-us-container">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you! Please fill out the form below and we'll get back to you soon.</p>

                <form onSubmit={handleSubmit} className="contact-us-form">
                    <label htmlFor="name">Full Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="email">Email Address:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="message">Your Message:</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        rows="4" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required
                    ></textarea>

                    <button type="submit">Send Message</button>
                </form>

                {/* Display last rating if available */}
                {rating && (
                    <div className="rating-container">
                        <h3>Your Last Rating:</h3>
                        <p className="rating-display">{emojiRatings.find(e => e.value == rating)?.emoji} ({rating}/5)</p>
                    </div>
                )}

                {/* Rating Popup */}
                {showPopup && (
                    <div className="rating-popup">
                        <h3>Rate Us</h3>
                        <p className="rating-question">How would you rate our service?</p>
                        <div className="rating-options">
                            {emojiRatings.map(({ value, emoji, label }) => (
                                <button 
                                    key={value} 
                                    onClick={() => handleRating(value)} 
                                    onMouseEnter={() => setHoveredRating(label)}
                                    onMouseLeave={() => setHoveredRating(null)}
                                    className="emoji-button"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                        {hoveredRating && <p className="hovered-rating-message">{hoveredRating}</p>}
                    </div>
                )}

                {/* Thank You Popup */}
                {showThankYou && (
                    <div className="thank-you-popup" onClick={() => setShowThankYou(false)}>
                        <p>🎉 Thank You for Your Feedback! 😊</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactUs;
