import React, { useState } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import ReactPaginate from 'react-paginate'; // this would not load (Dave)
import './ResultPage.css';

const ResultPage = ({ results }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;

  const pageCount = Math.ceil(
    results.flatMap((result) => result.locations).length / itemsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results
    .flatMap((result) => result.locations)
    .slice(indexOfFirstItem, indexOfLastItem);

  // affordabilityChecker
  const suburbPrices = results.flatMap(result => 
    result.locations.reduce((acc, property) => {
      const postcode = property.propertyData.property_post_code;
      if (!acc[postcode]) {
        acc[postcode] = [];
      }
      acc[postcode].push(property.propertyData.purchase_price);
      return acc;
    }, {})  
  );

  // Remove '0' layer from results
    const noZeroLayer = suburbPrices['0'];
    console.log('noZeroLayer', noZeroLayer);    

// Function to calculate average
    function calculateAverage(prices) {
      const sum = prices.reduce((acc, price) => acc + price, 0);
      return sum / prices.length;
    }
    
    // Iterate over postcode keys
    for (const postcode in noZeroLayer) {
      if (noZeroLayer.hasOwnProperty(postcode)) {
        const prices = noZeroLayer[postcode];
        const averagePrice = calculateAverage(prices);
        console.log(`Average price for postcode ${postcode}: ${averagePrice}`);
      }
    }

    
  // Calculate average prices for each suburb
  // const averagePrices = {};
  // for (const [postcode, prices] of Object.entries(suburbPrices)) {
  //   const averagePrice = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  //   averagePrices[postcode] = averagePrice;
  // }



  console.log('Suburb Prices:', suburbPrices );
  console.log('Suburb Prices lengths:', suburbPrices[0].length );
  // console.log('Suburb Average Prices:', averagePrices );


  return (
    <>
      <div className="result-page">
        {currentItems.map((property) => (
          <PropertyCard
            key={property.id}
            propertyData={property.propertyData}
            travelTime={property.properties[0].travel_time}
            distance={property.properties[0].distance}
            transportation={property.transportation}
            // postcode={property.}
          />
        ))}
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageClick}
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
};

export default ResultPage;
