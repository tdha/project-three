import React, { useEffect, useState } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import ReactPaginate from 'react-paginate'; // this would not load (Dave)
import './ResultPage.css';

const ResultPage = ({ results }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const [postcodeAverages, setPostcodeAverages] = useState([]);


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
     


    
    // Iterate over postcode keys
    useEffect(() => {
        const calculateAverages = () => {
          const averages = [];
          for (const postcode in suburbPrices) {
            if (suburbPrices.hasOwnProperty(postcode)) {
              const prices = suburbPrices[postcode];
              const sum = prices.reduce((acc, price) => acc + price, 0 );
              const averagePrice = sum /prices.length;
              averages.push({postcode, averagePrice})


              //format average prices to $000,000
              // const formattedAveragePrice = averagePrice.toLocaleString('en-US', {
              //   style: 'currency',
              //   currency: 'AUD',
              //   minimumFractionDigits: 0,
              //   maximumFractionDigits: 0,
              // });
              
              // console.log(`Average price for postcode ${postcode}: ${averagePrice}`);
            }
          }
          console.log('Averages array', averages)          
          setPostcodeAverages(averages)
        }
        

      const layeredSuburbPrices = results.flatMap(result => 
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
        const suburbPrices = layeredSuburbPrices['0'];
        // console.log('suburbPrices', suburbPrices); 

        calculateAverages();

        // console.log('Suburb Prices:', layeredSuburbPrices );
        console.log('postcode Averages:', postcodeAverages);
    }, [results])
  
  
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
