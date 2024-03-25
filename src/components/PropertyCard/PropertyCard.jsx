import './PropertyCard.css';

const PropertyCard = ({
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

  return (
    <>
      <div className="property-card">
        <div className="property-image">
          <img src="https://picsum.photos/500/200" alt="" />
        </div>
        <div className="property-title">
          <h2>{propertyData.address}</h2>
          <hr />
        </div>
        <div className="flex-items">
          <div className="property-details">
            <p>
              <strong>Property ID:</strong> {propertyData.property_id}
            </p>
            <p>
              <strong>Purchase Price:</strong> {formattedValue}
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
          </div>
          <div className="property-favorite">
            <button>Favorite ★</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;
