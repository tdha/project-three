import './PropertyCard.css';
import axios from 'axios';
import { useState } from 'react';

const PropertyCard = ({
  propertyData,
  travelTime,
  distance,
  transportation,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  function secondsToTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} Hour ${minutes} Minutes`;
    } else {
      return `${minutes} Minutes`;
    }
  }
  let transportationType;
  if (transportation === 'driving') {
    transportationType = 'Driving';
  }
  if (transportation === 'public_transport') {
    transportationType = 'Public Transport';
  }
  if (transportation === 'walking') {
    transportationType = 'Walking';
  }

  const formattedValue = propertyData.purchase_price.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });

  const distanceInKilometers = distance / 1000;

  const handleAddToFavorites = async () => {
    try {
      setIsButtonDisabled(true);
      propertyData.travelTime = travelTime;
      propertyData.distance = distance;
      propertyData.transportation = transportation;
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/properties/addFavoriteProperty',
        { propertyData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Property added to favorites successfully!');
    } catch (error) {
      setIsButtonDisabled(false);
      console.error('Error adding property to favorites:', error);
      alert('Error adding property to favorites. Please try again.');
    }
  };

  return (
    <>
      <div className="property-card">
        <div className="property-image">
          <img src="https://picsum.photos/500/200/?random=1&blur=3" alt="" />
        </div>
        <div className="property-title">
          <h2>{propertyData.address}</h2>
          <hr />
        </div>
        <div className="flex-items">
          <div className="property-details">
            <p>
              <strong>Purchase Price:</strong> {formattedValue}
            </p>
            <p>
              <strong>Postcode:</strong> {propertyData.property_post_code}
            </p>
            <p>
              <strong>Area:</strong>{' '}
              {propertyData.area === ''
                ? 'No information'
                : `${propertyData.area} m2`}
            </p>
            <p>
              <strong>Travel Time:</strong> {secondsToTime(travelTime)}
            </p>
            <p>
              <strong>Distance:</strong> {distanceInKilometers.toFixed(2)} Km
            </p>

            <p>
              <strong>Transportation:</strong> {transportationType}
            </p>

            <p>
              <strong>Property ID:</strong> {propertyData.property_id}
            </p>
          </div>
          <div className="property-favorite">
            <button
              onClick={() =>
                handleAddToFavorites({
                  propertyData,
                })
              }
              disabled={isButtonDisabled}
            >
              ★
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;
