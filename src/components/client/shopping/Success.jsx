import React, { useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { Link } from "react-router-dom";

const Success = () => {

    const { clearCart } = useShoppingCart();
    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div>
            <div>
                <h1>Thank You</h1>
                <p>Order Placed Successfully</p>
                <Link to="/">
                    Another Shopping
                </Link>
            </div>
        </div>
    )
}

export default Success
