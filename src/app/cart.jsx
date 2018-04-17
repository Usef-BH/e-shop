import React from 'react';

const Cart = ({ store }) => {
    console.log("store.getState: ", store.getState());
    return (
    <div>
        <h1 style={{backgroundColor: 'red'}}>Hello in Cart view!</h1>
        <ul>
            {store.getState().map((item, index) => <li key={index}>{item.title}</li>)}   
        </ul>
    </div>
    )
}

export default Cart