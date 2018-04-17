import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../css/home.css';
import men from '../img/mens_outerwear.jpg';
import ladies from '../img/ladies_outerwear.jpg';
import men_tshirt from '../img/mens_tshirts.jpg';
import ladies_tshirt from '../img/ladies_tshirts.jpg';

const Main = () => (
    <section className={styles.main}>
        <section className={styles.men}>
            <img src={men} alt="men clothes" className={styles}/>
            <Link to="/list/men" className={styles.cat_link}>Men's Category</Link>
        </section>
        <section className={styles.women}>
            <img src={ladies} alt="women" className={styles}/>
            <Link to="/list/women" className={styles.cat_link}>Women's Category</Link>
        </section>
        <section className={styles.boys}>
            <img src={men_tshirt} alt="men tshirt" className={styles}/>
            <Link to="/list/boys" className={styles.cat_link}>Boys Category</Link>   
        </section>
        <section className={styles.girls}>
            <img src={ladies_tshirt} alt="ladies tshirt" className={styles}/>
            <Link to="/list/girls" className={styles.cat_link}>Girlss Category</Link>   
        </section>
    </section>
)

export default Main