import React, { useState } from 'react';
import './SearchLocationPage.css';
const SearchLocationPage = () => {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [distance, setDistance] = useState(null);
  const [transportation, setTransportation] = useState('driving');
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
    const otherLocation = await fetchCoordinates(address2);
    console.log(startingLocation, otherLocation);

    if (startingLocation && otherLocation) {
      await fetchDistance(startingLocation, otherLocation);
    } else {
      console.log('Failed to fetch coordinates for one or both addresses.');
    }
  };

  const fetchDistance = async (startingLocation, otherLocation) => {
    const res = await fetch('https://api.traveltimeapp.com/v4/time-filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': '516250a87ff7610e38bd9cc62982b57e',
        'X-Application-Id': 'e9f7d35c',
      },
      body: JSON.stringify({
        locations: [
          {
            id: 'starting-location',
            coords: {
              lat: startingLocation.lat,
              lng: startingLocation.lon,
            },
          },
          {
            id: 'other-location-0',
            coords: {
              lat: otherLocation.lat,
              lng: otherLocation.lon,
            },
          },
        ],
        departure_searches: [
          {
            id: 'Departure search',
            arrival_location_ids: ['other-location-0'],
            departure_location_id: 'starting-location',
            departure_time: '2024-03-21T22:00:00.000Z',
            travel_time: 5400,
            properties: ['travel_time', 'distance'],
            transportation: {
              type: transportation,
            },
          },
        ],
        arrival_searches: [],
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
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
        <label htmlFor="address2">Address 2:</label>
        <input
          id="address2"
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          required
          placeholder="Address 2"
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
    </div>
  );
};
export default SearchLocationPage;
