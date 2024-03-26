const ResultPage = ({ results }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 12;
    const [postcodeAverages, setPostcodeAverages] = useState([]);
    let averages = []; // Declare averages variable outside the function
  
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
    useEffect(() => {
      const calculateAverages = () => {
        averages = []; // Clear averages array
        for (const postcode in suburbPrices) {
          if (suburbPrices.hasOwnProperty(postcode)) {
            const prices = suburbPrices[postcode];
            const sum = prices.reduce((acc, price) => acc + price, 0);
            const averagePrice = sum / prices.length;
            averages.push({ postcode, averagePrice });
          }
        }
        setPostcodeAverages(averages);
      };
  
      const layeredSuburbPrices = results.flatMap((result) =>
        result.locations.reduce((acc, property) => {
          const postcode = property.propertyData.property_post_code;
          if (!acc[postcode]) {
            acc[postcode] = [];
          }
          acc[postcode].push(property.propertyData.purchase_price);
          return acc;
        }, {})
      );
  
      const suburbPrices = layeredSuburbPrices['0'];
      calculateAverages();
      console.log('Averages array:', averages); // Now averages is accessible here
    }, [results]);
  
    return (
      <>
        <div className="result-page">
          {/* Render PropertyCard components */}
        </div>
      </>
    );
  };
  
  export default ResultPage;


  const startingLocation = await fetchCoordinates(address1);

        if (startingLocation) {
            // Filter properties based on the selected property type
            const filteredProperties = propertyType === 'all' ? properties : properties.filter(property => {
                return propertyType === 'house' ? !property.strata_lot_number : !!property.strata_lot_number;
            });

            await fetchDistance(startingLocation, filteredProperties);
            setIsLoading(false);
            sendInformation();
        } else {
            console.log('Failed to fetch coordinates for one or both addresses.');
        }
    };