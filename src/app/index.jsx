import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';

import Header from './header.jsx';
import Main from './main.jsx';
import Footer from './footer.jsx';
import items from './mokeData';

let list = items.map(item => {
    return {
        id: item.id,
        price: item.price,
        title: item.title,
        quantity: 1
    }
})

const reducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            let index = state.findIndex(ele => ele.id == action.id);
            if(index !== -1) {
                state[index].quantity++;
                return state;
            }
            return [
                ...state,
                list[action.id-1]
            ];
        case 'REMOVE_ITEM':
            index = state.findIndex(ele => ele.id == action.id);
            if(index !== -1) {
                if(state[index].quantity === 1) {
                    return state.filter(item => item.id != action.id);   
                }else {
                    state[index].quantity--;
                    return state;
                }
            }
            return state;
        case 'REMOVE_ALL':
            return [];
        default:
            return state;
    }
}

const store = createStore(reducer);
console.log("store", store.getState());
const Wrapper = ({ store }) => {
    return [
        <Header store={store} key="1"/>,
        <Main store={store} key="2"/>,
        <Footer store={store} key="3"/>
    ]
}

const App = ({ store }) => (
    <Router>
        <Wrapper store={store}/>
    </Router>
)

const render = () => {
    ReactDOM.render(<App store={store}/>, document.getElementById('app'));
}

store.subscribe(render);
render();