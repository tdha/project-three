import { checkToken } from "../../utilities/users-services";

const OrderHistoryPage = () => {
    const _handleCheckToken = async () => {
        const expDate = await checkToken();
        console.log(expDate);
    };

    return (
        <>
        <h1>
            Order History
        </h1>
        <button onClick={ _handleCheckToken }>Click when my login expires</button>
        </>
    )
};

export default OrderHistoryPage;