import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Home from './home.jsx';
import List from './list.jsx';
import Cart from './cart.jsx';

const Main = ({ store }) => (
    <Switch>
        <Route exact store={store} path="/" render={() => <Home store={store}/>} />
        <Route exact store={store} path="/cart" render={() => <Cart store={store}/>} />
        <Route exact store={store} path="/list/:category" render={() => <List store={store}/>} />
    </Switch>
)

export default Main