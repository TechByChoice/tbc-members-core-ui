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
            <div className="card-content">
                <p>Hourly Rate: ${hourlyRate}</p>
            </div>
            <button className="card-button">{buttonText}</button>
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
