import React from "react";
import { useState, useEffect } from "react";
import { getFavorites } from "../../utilities/favorites-api";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const favoritePage = () => {
    const [userFavorites, setUserFavorites] = useState([]);


    if (userFavorites.length === 0) {
        return <p>No favorites yet!</p>
    }

    useEffect(function () { 
        const _findFavorites = async () => {
            try {
                const findFavorites = await getFavorites();
                setUserFavorites(findFavorites);
            }catch {
                console.log('fnotes no work')
            }
        }
        _findFavorites();
    }, []);

    
    return (
        <>
          <div className="result-page">
            {userFavorites.map((property) => (
              <PropertyCard
                key={property.property} // Assuming property.id is a unique identifier
                address={property.address}
                travelTime={property.travelTime}
                distance={property.distance}
                transportation={property.transportation}
                postcode={property.postCode}
              />
            ))}
          </div>
        </>
      );     
};
export default favoritePage;

// address,
// purchasePrice,
// travelTime,
// distance,
// transportation,
// postCode,
// property