import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'
import App from './App'
import Users from './users'
import AlignItemsList from '../src/components/movie-list/movieList'
import NavBar from "../src/components/navbar/navbar";


const routing = (

  <Router>
    <Link to="/users/:id">Contact</Link>
      <NavBar />
      <Route path="/" component={App} />
      <Route path="/users/:id" component={ Users } />
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));

