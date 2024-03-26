import React from "react";

const FilteredPage = ({ fifteenMinuteArray }) => {
    console.log(fifteenMinuteArray);

    const fifteenMinuteDisplay = fifteenMinuteArray.map((property) => (
        <div>
            <p>{property.propertyData.address}</p>
            <p>{property.propertyData.purchase_price}</p>
            <p>{property.properties.travel_time}</p>
        </div>
    ));

    




    return (
        <>      
        
            <div>
                Test
             {fifteenMinuteDisplay}
            </div>
        </>

    
    )
};

export default FilteredPage;



// import React from "react";

// // const FilteredPage = ({ fifteenMinute }) => {
// //     console.log('this is FP', fifteenMinute);

    
// //     // const fifteenMinuteDisplay = fifteenMinute.map(property => (
// //     //     <div>{property.propertyData.address}</div>
// //     // ));
    
// //     // const travelTimes = fifteenMinute.map(property => property.properties[0].travel_time);
// //     // console.log(travelTimes);

// //     return (
// //         <>      
// //         {fifteenMinute.map(property => 
// //             <div>
// //                 {property.propertyData}
// //             </div>)}
// //         </>

// //     )
// // };

// export default FilteredPage;