import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'
import App from './app'
import AlignItemsList from '../src/components/movie-list/movieList'
import NavBar from "../src/components/navbar/navbar";

const routing = (
  <NavBar />,
  <Router>

      <Route path="/" component={App} />
      <Route path="/movie/:id" component={ AlignItemsList } />
  </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

