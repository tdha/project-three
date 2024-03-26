import React from "react";

const FilteredPage = ({ results  }) => {
    
 console.log(results);
    const fifteenMinuteDisplay = results.flatMap((property) => (
        <div>{property.propertyData.address}</div>
    ));
    
    // const fifteenMinuteDisplay = fifteenMinute.map(property => (
    //     <div>{property.propertyData.address}</div>
    // ));
    
    // const travelTimes = fifteenMinute.map(property => property.properties[0].travel_time);
    // console.log(travelTimes);

    return (
        <>      
        
            <div>
             {fifteenMinuteDisplay}
            </div>
        </>

    )
};

export default FilteredPage;