import './PropertyCard.css';
import { useState } from 'react';

const PropertyCard = ({ propertyData,travelTime,distance,transportation,}) => { 
  const [favorites, setFavorites] = useState ({
    address: "",
    purchasePrice: "",
    travelTime: "",
    distance: "",
    transportation: "",
    postCode: "",
    property: "",
  });


  const _favouriteButton = (event) => {
    event.preventDefault();
    setFavorites({
      ...favorites,
      [event.target.name]: event.target.value,
    });
  };
  
  useEffect(() => {
    console.log('Updated favorites:', favorites);
  }, [favorites]);
  

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

  // const affordability() {

  // }

  



  return (
    <>
      <form onSubmit={_favouriteButton}>
        <div className="property-card">
          <div className="property-image">
            <img src="https://picsum.photos/500/200/?random=1&blur=3" alt="" />
          </div>
          <div className="property-title">
            <input type="hidden" name="address" value={propertyData.address} />
            <h2>{propertyData.address}</h2>
            <hr />
          </div>
          <div className="flex-items">
            <div className="property-details">
              <p>
                <input type="hidden" name="purchasePrice" value={formattedValue} />
                <strong>Purchase Price:</strong> {formattedValue}
              </p>
              <p>
                <input type="hidden" name="travelTime" value={secondsToTime(travelTime)} />
                <strong>Travel Time:</strong> {secondsToTime(travelTime)}
              </p>
              <p>
                <input type="hidden" name="distance" value={distanceInKilometers.toFixed(2)} />
                <strong>Distance:</strong> {distanceInKilometers.toFixed(2)} Km
              </p>
              <p>
                <input type="hidden" name="transportation" value={transportationType} />
                <strong>Transportation:</strong> {transportationType}
              </p>
              <p>
                <input type="hidden" name="postcodeCode" value={propertyData.property_post_code} />
                <strong>Postcode:</strong> {propertyData.property_post_code}
              </p>
              <p>
                <input type="hidden" name="propertyId" value={propertyData.property_id} />
                <strong>Property ID:</strong> {propertyData.property_id}
              </p>
            </div>
            <div className="property-favorite">
              <button type="submit">★</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default PropertyCard;
