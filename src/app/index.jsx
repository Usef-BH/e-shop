import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Main from './main.jsx';

class App extends React.Component {
    render() {
        return [
            <Header key="1"/>,
            <Main key="2"/>,
            <Footer key="3"/>
        ]
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));