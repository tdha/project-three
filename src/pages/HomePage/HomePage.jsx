import React, { useState, useEffect } from 'react';
import { properties } from '../../../seed';
import { RotatingTriangles } from 'react-loader-spinner';
import ResultPage from '../ResultPage/ResultPage';
import './HomePage.css';


  
const HomePage = ({ search, sendInformation }) => {
  const [address1, setAddress1] = useState('');
  const [transportation, setTransportation] = useState('driving');
  const [mappedResults, setMappedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchCoordinates = async (address) => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data && data.length > 0) {
        const coordinates = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
        return coordinates;
      } else {
        throw new Error('Coordinates not found for the provided address.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startingLocation = await fetchCoordinates(address1);

    if (startingLocation) {
      await fetchDistance(startingLocation, properties);
    } else {
      console.log('Failed to fetch coordinates for one or both addresses.');
    }
  };

  const fetchDistance = async (startingLocation, properties) => {
    const locationObjects = properties.map((property, index) => ({
      id: `other-location-${index}`,
      coords: {
        lat: property.coordinates.lat,
        lng: property.coordinates.lon,
      },
      propertyData: property,
    }));

    const requestBody = {
      locations: [
        {
          id: 'starting-location',
          coords: {
            lat: startingLocation.lat,
            lng: startingLocation.lon,
          },
        },
        ...locationObjects,
      ],
      departure_searches: [
        {
          id: 'Departure search',
          arrival_location_ids: locationObjects.map((location) => location.id),
          departure_location_id: 'starting-location',
          departure_time: new Date().toISOString(),
          travel_time: 5400,
          properties: ['travel_time', 'distance'],
          transportation: {
            type: transportation,
          },
        },
      ],
      arrival_searches: [],
    };

    try {
      const res = await fetch('https://api.traveltimeapp.com/v4/time-filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': '516250a87ff7610e38bd9cc62982b57e',
          'X-Application-Id': 'e9f7d35c',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      

      const results = Array.isArray(data.results)
        ? data.results
        : [data.results];

      const mappedResults = results.map((result) => {
        const locations = result.locations.map((location) => {
          const locationObject = locationObjects.find(
            (obj) => obj.id === location.id
        
          );
          
          return {
            ...location,
            propertyData: locationObject ? locationObject.propertyData : null,
          };
        });
        return {
          ...result,
          locations,
        };
      });

     console.log(mappedResults);
      setResult(mappedResults);
      
    } catch (error) {
      console.error('Error fetching distance:', error);
    }
  };
   // console.log(mappedResults[0].locations[0].properties[0].travel_time)

   function showResults(mappedResults) {
    let filteredResults = mappedResults.flatMap(result =>
      result.locations.flatMap(location => location.properties && location.propertyData
        )
      
    );
    console.log(filteredResults);
  }
  
  

  return (
    <>
      <div className="search-container">
        <h2>Address Distance Calculator</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="address1">Address 1:</label>
          <input
            id="address1"
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
            placeholder="Address 1"
          />
          <label htmlFor="transportation">Transportation:</label>
          <select
            id="transportation"
            value={transportation}
            onChange={(e) => setTransportation(e.target.value)}
          >
            <option value="driving">Driving</option>
            <option value="public_transport">Public Transport</option>
            <option value="walking">Walking</option>
          </select>
          <button className="button-search" type="submit">
            Calculate Distance
          </button>
        </form>
        <div className="loading">
          {isLoading ? (
            <RotatingTriangles
              visible={true}
              height="80"
              width="80"
              color="blue"
              ariaLabel="rotating-triangles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : null}
        </div>
      </div>
      {search && <ResultPage results={mappedResults} />}
    </>
    )
};