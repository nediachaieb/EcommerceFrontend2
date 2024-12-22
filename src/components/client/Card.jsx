///affichages des articles pour le client 
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart';

const Card = ({ article }) => {
    const { addItem } = useShoppingCart()
    const addToCart = (article) => {
        const product = {
            id: article.id,
            title: article.designation,
            image: article.imageart,
            price: article.prix,
            qtestock: article.qtestock,
            quantity: 1
        };
        addItem(product);
        console.log('Item added to cart:', product);
    };
    return (
        <div className='card'>
            {article.imageart && <img src={article.imageart} alt={article.reference}
            />}
            <div className="card-content">
                <h1 className="card-title">{article.reference}</h1>
                <p className="card-description">{article.designation.substr(0, 20)}</p>
                <h1 className="card-title">Prix : {article.prix} TND</h1>

                <button
                    disabled={article.qtestock <= 1}
                    className="card-button"
                    onClick={() => addToCart(article)}>
                    <i className="fa-solid fa-basket-shopping"></i>
                    Add to cart</button>

            </div>
        </div>
    );
};

export default Card
