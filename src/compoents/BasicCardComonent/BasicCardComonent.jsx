import React from 'react';
import PropTypes from 'prop-types';
import './BasicCardComonent.css'; // Stylesheet for the card

const BasicCardComonent = ({
    imageUrl, headerText, icon, hourlyRate, buttonText 
}) => {
    return (
        <div className="card">
            <img src={imageUrl} alt="Card" className="card-image" />
            <div className="card-header">
                <div className="card-icon">{icon}</div>
                <h2>{headerText}</h2>
            </div>
            <div className="card-details">
                <p className="hourly-rate">
                    Hourly Rate:
                    <div className="card-rate">${hourlyRate}</div>
                </p>
                <button className="card-button">{buttonText}</button>
            </div>
        </div>
    );
};

BasicCardComonent.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    hourlyRate: PropTypes.number.isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default BasicCardComonent;
