import axios from 'axios';
import { useEffect, useState } from 'react';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import { RotatingTriangles } from 'react-loader-spinner';

const FavoritePage = () => {
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/properties/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoriteProperties(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="center-favorites">
        {isLoading ? (
          <RotatingTriangles
            visible={true}
            height="160"
            width="160"
            color="blue"
            ariaLabel="rotating-triangles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : error ? (
          <p className="favorites-error">No favorites found.</p>
        ) : (
          favoriteProperties.map((property) => (
            <FavoriteCard
              key={property._id}
              propertyData={{
                address: property.address,
                purchase_price: property.purchase_price,
                property_id: property.property_id,
                property_post_code: property.property_post_code,
                area: property.area,
                sold_date: property.sold_date,
                strata_lot_number: property.strata_lot_number,
                street_address: property.street_address,
                coordinates: property.coordinates,
              }}
              travelTime={property.travelTime}
              distance={property.distance}
              transportation={property.transportation}
            />
          ))
        )}
      </div>
    </>
  );
};

export default FavoritePage;
