import React from 'react';

import styles from '../css/cart.css';
import remove from '../img/trash.svg';

export default class Cart extends React.Component {

    removeItem(id) {
        this.props.store.dispatch({type: 'REMOVE_ITEM', id });
    }

    render() {
        let { store } = this.props;
        console.log("store.getState: ", store.getState());
        return (
        <div>
            <h1 className={styles.cat_title}>Hello in Cart view!</h1>
            <ul className={styles.cart_list}>
                {store.getState().map((item, index) => <li key={index} className={styles.list_item}>{item.title}
                <button className="fontawesome-trash" onClick={() => this.removeItem(item.id)} role="Remove item from cart"></button>
                </li>)}   
            </ul>
        </div>
        )        
    }
}