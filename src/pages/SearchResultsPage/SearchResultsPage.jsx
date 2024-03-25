import { useLocation } from 'react-router-dom';

const SearchResultsPage = () => {
  const location = useLocation();
  const { travelInfo, propertyData } = location.state || {};
//   const { data } = location.state;

  return (
    <div className="results-container">
      <h2>Search Results</h2>
      {travelInfo && (
        <div>
          <h3>Travel Information</h3>
          <p>Travel Time: {travelInfo.travel_time} seconds</p>
          <p>Distance: {travelInfo.distance} meters</p>
        </div>
      )}
      {propertyData && (
        <div>
          <h3>Property Information</h3>
          <p>Property ID: {propertyData["Property ID"]}</p>
          <p>Address: {propertyData.Address}</p>
          <p>Post Code: {propertyData["Property post code"]}</p>
          <p>Area: {propertyData.Area} sqm</p>
          <p>Sold Date: {propertyData["Sold date"]}</p>
          <p>Purchase Price: ${propertyData["Purchase price"].toLocaleString()}</p>
          {/* Add more property details as needed */}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
