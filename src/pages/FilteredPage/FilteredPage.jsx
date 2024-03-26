import React from "react";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import "./FilteredPage.css"
import Footer from "../../components/Footer/Footer";

const FilteredPage = ({ fifteenMinute, thirtyMinute, fortyFiveMinute, sixtyMinute, seventyFiveMinute, ninetyMinute }) => {

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
        <div>
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
    
    const seventyFiveMinuteDisplay = seventyFiveMinute.map((property) => (
        <div >
            <p>{property.propertyData.address}</p>
            <p>{property.propertyData.purchase_price}</p>
            <p>{property.properties[0].travel_time}</p>
            <p>{property.properties[0].distance}</p>
        </div>
    ));

    const ninetyMinuteDisplay = ninetyMinute.map((property) => (
        <div >
            <p>{property.propertyData.address}</p>
            <p>{property.propertyData.purchase_price}</p>
            <p>{property.properties[0].travel_time}</p>
            <p>{property.properties[0].distance}</p>
        </div>
    ));

    return (
        <div className="filterPage">
            <div>
                <div className="headerBlock">
                    <h1>15min travel radius</h1>
                    <h3>The ten most affordable properties sold in March.</h3>
                </div>
                <div className="filterCard">
                    {fifteenMinute.slice(0, 10).map((property, index) => (
                        <PropertyCard
                            key={property.id}
                            propertyData={property.propertyData}
                            travelTime={property.properties[0].travel_time}
                            distance={property.properties[0].distance}
                            transportation={property.transportation}
                        />
                    ))}
                </div>
            </div>
            <div>
                <div className="headerBlock">
                    <h1>30min travel radius</h1>
                    <h3>The ten most affordable properties sold in March.</h3>
                </div>
                <div className="filterCard">
                    {thirtyMinute.slice(0, 10).map((property, index) => (
                        <PropertyCard
                            key={property.id}
                            propertyData={property.propertyData}
                            travelTime={property.properties[0].travel_time}
                            distance={property.properties[0].distance}
                            transportation={property.transportation}
                        />
                    ))}
                </div>
            </div>
            <div>
                <div className="headerBlock">
                    <h1>45min travel radius</h1>
                    <h3>The ten most affordable properties sold in March.</h3>
                </div>
                <div className="filterCard">
                    {fortyFiveMinute.slice(0, 10).map((property, index) => (
                        <PropertyCard
                            key={property.id}
                            propertyData={property.propertyData}
                            travelTime={property.properties[0].travel_time}
                            distance={property.properties[0].distance}
                            transportation={property.transportation}
                        />
                    ))}
                </div>
            </div>
            <div>
                <div className="headerBlock">
                    <h1>60min travel radius</h1>
                    <h3>The ten most affordable properties sold in March.</h3>
                </div>
                <div className="filterCard">
                    {sixtyMinute.slice(0, 10).map((property, index) => (
                        <PropertyCard
                            key={property.id}
                            propertyData={property.propertyData}
                            travelTime={property.properties[0].travel_time}
                            distance={property.properties[0].distance}
                            transportation={property.transportation}
                        />
                    ))}
                </div>
            <div>
                <div className="headerBlock">
                    <h1>75min travel radius</h1>
                    <h3>The ten most affordable properties sold in March.</h3>
                </div>
                <div className="filterCard">
                    {seventyFiveMinute.slice(0, 10).map((property, index) => (
                        <PropertyCard
                            key={property.id}
                            propertyData={property.propertyData}
                            travelTime={property.properties[0].travel_time}
                            distance={property.properties[0].distance}
                            transportation={property.transportation}
                        />
                    ))}
                </div>
            </div>
            <div>
                <div className="headerBlock">
                    <h1>90min travel radius</h1>
                    <h3>The ten most affordable properties sold in March.</h3>
                </div>
                <div className="filterCard">
                    {ninetyMinute.slice(0, 10).map((property, index) => (
                        <PropertyCard
                            key={property.id}
                            propertyData={property.propertyData}
                            travelTime={property.properties[0].travel_time}
                            distance={property.properties[0].distance}
                            transportation={property.transportation}
                        />
                    ))}
                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
};

export default FilteredPage;
