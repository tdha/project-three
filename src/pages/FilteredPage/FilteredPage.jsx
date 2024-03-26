import React from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const FilteredPage = ({ fifteenMinute, thirtyMinute, fortyFiveMinute, sixtyMinute }) => {

    const fifteenMinuteDisplay = fifteenMinute.map((property) => (
        <div>
            <p>{property.propertyData.address}</p>
            <p>{property.propertyData.purchase_price}</p>
            <p>{property.properties[0].travel_time}</p>
            <p>{property.properties[0].distance}</p>
        </div>
    ));

    const thirtyMinuteDisplay = thirtyMinute.map((property) => (
        <div>
            <p>{property.propertyData.address}</p>
            <p>{property.propertyData.purchase_price}</p>
            <p>{property.properties[0].travel_time}</p>
            <p>{property.properties[0].distance}</p>
        </div>
    ));

    const fortyFiveMinuteDisplay = fortyFiveMinute.map((property) => (
        <div >
            <p>{property.propertyData.address}</p>
            <p>{property.propertyData.purchase_price}</p>
            <p>{property.properties[0].travel_time}</p>
            <p>{property.properties[0].distance}</p>
        </div>
    ));

    const sixtyMinuteDisplay = sixtyMinute.map((property) => (
        <div >
            <p>{property.propertyData.address}</p>
            <p>{property.propertyData.purchase_price}</p>
            <p>{property.properties[0].travel_time}</p>
            <p>{property.properties[0].distance}</p>
        </div>
    ));

    return (
        <>      
        {fifteenMinute.slice(0,10).map((property, index) => (
           <PropertyCard
            key={property.id}
            propertyData={property.propertyData}
            travelTime={property.properties[0].travel_time}
            distance={property.properties[0].distance}
            transportation={property.transportation}
            // postcode={property.}
          />
          
        ))}
            {/* <div>
               <h2>Cheapest 10 results within 15min travel time</h2>
                {fifteenMinuteDisplay}
            </div>

            <div>
               <h2>Cheapest 10 results within 30min travel time</h2>
                {fortyFiveMinuteDisplay}
            </div>

            <div>
               <h2>Cheapest 10 results within 45min travel time</h2>
                {fortyFiveMinuteDisplay}
            </div>

            <div>
               <h2>Cheapest 10 results within 60min travel time</h2>
                {sixtyMinuteDisplay}
            </div> */}
        </>

    
    )
};

export default FilteredPage;
