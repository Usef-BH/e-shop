import React from 'react';
import styles from '../css/header.css';

export default class Header extends React.Component {

    styleNav() {
        let nav = document.getElementsByTagName('nav')[0];
        nav.classList = "nav_side";
/*         let list_items = [...document.getElementsByTagName('li')];
        list_items.forEach( item => {
            item.classList = "list_item_side";
        }); */
        console.log("nav: ", nav);
    }

    toogleSidebar() {
        let nav = document.getElementsByTagName('nav')[0];
        let overlay = document.getElementById('overlay');
        console.log("nav: ", nav);
        nav.classList.toggle("show_sidebar");
        overlay.classList.toggle("overlay");
    }

    render() {
        return (
            <header className={styles.header}>
                <div onClick={() => this.toogleSidebar()} className={styles.trigram}>&#9776;</div>
                <strong className={styles.title}><a href="/">SHOP</a></strong>
                <a href="/cart" className={styles.svg}>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false">
                    <g><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path></g>
                    </svg>
                </a>
                <nav className={styles.nav}>
                    <ul className={styles.nav_list}>
                        <li className={styles.list_item}><a href="#">Men's Outerwear</a></li>
                        <li className={styles.list_item}><a href="#">Ladies Outerwear</a></li>
                        <li className={styles.list_item}><a href="#">Men's T-shirt</a></li>
                        <li className={styles.list_item}><a href="#">Ladies T-shirt</a></li>                
                    </ul>
                </nav>
                <div id="overlay" onClick={() => this.toogleSidebar()}></div>
            </header>
    
        )
    }
}