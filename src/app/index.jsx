import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';

import Header from './header.jsx';
import Main from './main.jsx';
import Footer from './footer.jsx';
import items from './mokeData';

const reducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
        console.log("action.id:", action.id);
            return [
                ...state,
                items[action.id-1]
            ];
            break;
        case 'REMOVE_ITEM':
            return state.filter(item => item.id != action.id);
            break;
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