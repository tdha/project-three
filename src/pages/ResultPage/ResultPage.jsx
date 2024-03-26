import React, { useState } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
// import ReactPaginate from 'react-paginate'; // this would not load (Dave)
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
