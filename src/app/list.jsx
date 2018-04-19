import React from 'react';

import styles from '../css/list.css';
import men from '../img/men.jpg';
import girl from '../img/girl.jpg';
import boy from '../img/boy.jpg';
import women from '../img/women.png';
import items from './mokeData';


export class List extends React.Component {
    constructor(props, match) {
        super(props);
    }

    addItem({ target }, id) {
        this.props.store.dispatch({type: 'ADD_ITEM', id });
    }

    removeItem({ target }, id) {
        this.props.store.dispatch({type: 'REMOVE_ITEM', id });
    }

    render() {
        console.log("store state:", this.props.store.getState());
        //const { params } = this.props.match;
        let stylesh1, src=items;
/*         if(params.category === "men") {
            stylesh1 = {backgroundColor: 'blue'};
            src = [{img: men, title: "category"}, ...items];
        } else if(params.category === "women") {
            stylesh1 = {backgroundColor: 'hotpink'};
            src = [{img: women, title: "category"}, ...items];
        } else if(params.category === "boys") {
            stylesh1 = {backgroundColor: 'green'};
            src = [{img: boy, title: "category"}, ...items];
        } else {
            stylesh1 = {backgroundColor: 'purple'};
            src = [{img: girl, title: "category"}, ...items];
        } */
        return (
            <div className={styles.list_container}>
                <h1 style={stylesh1} className={styles.cat_title}>Items List</h1>
                <div className={styles.list}>
                    { src.map((img, index) => (
                    <div key={index} className={styles.item}>
                        <img className={styles.img_item} src={`../${img.img}`} alt={img.title}/>
                        <input className={styles.additem} type="button" value="Add Item" 
                        onClick={(e) => this.addItem(e, img.id)}/>
                        <input className={styles.additem} type="button" value="Remove Item" 
                        onClick={(e) => this.removeItem(e, img.id)}/>
                    </div>
                    )) }                    
                </div>

            </div>
        )
    }
}

export default List