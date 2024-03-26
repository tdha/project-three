import React from "react";

const FilteredPage = ({ fifteenMinute }) => {
    console.log('this is FP', fifteenMinute);

    // const fifteenMinuteDisplay = fifteenMinute.flatMap((property) => (
    //     <div>{property.propertyData.address}</div>
    // ));
    
    // const fifteenMinuteDisplay = fifteenMinute.map(property => (
    //     <div>{property.propertyData.address}</div>
    // ));
    
    const travelTimes = fifteenMinute.map(property => property.properties[0].travel_time);
    console.log(travelTimes);

    




    return (
        <>      
        {fifteenMinute.map(property => 
            <div>
                {property.propertyData}
            </div>)}
        </>

    )
};

export default FilteredPage;