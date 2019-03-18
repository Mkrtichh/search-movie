import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import NavBar from "../src/components/navbar/navbar";
import IntegrationDownshift from './components/search/search';

class App extends Component {
  render() {
    return ( [
        <NavBar />,
        <IntegrationDownshift />
      ]
    );
  }
}
export default App

ReactDOM.render(<App />, document.getElementById('root'));

