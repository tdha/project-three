import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FavoriteCard = ({
  propertyData,
  travelTime,
  distance,
  transportation,
}) => {
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

  const removeFromFavorites = async () => {
    try {
      toast.info('Deleting property');
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `/api/properties/${propertyData.property_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      toast.error('Error deleting property');
    }
  };

  return (
    <div className="property-card margin-card">
      <div className="property-image">
        <img src="https://picsum.photos/500/200/?random=1&blur=3" alt="" />
      </div>
      <div className="property-title">
        <h2>{propertyData.address}</h2>
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
            {propertyData.area === null
              ? 'No information'
              : `${propertyData.area} m2`}
          </p>
          <p>
            <strong>Travel Time:</strong> {secondsToTime(travelTime)}
          </p>
          <p>
            <strong>Latitude:</strong> {propertyData.coordinates.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {propertyData.coordinates.lon}
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
          <button onClick={removeFromFavorites}>Remove</button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
      />
    </div>
  );
};

export default FavoriteCard;
