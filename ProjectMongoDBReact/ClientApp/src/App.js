import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Pokoje } from './components/Pokoje';
import { addPokoj } from './components/addPokoj';
import { pokojDetails } from './components/pokojDetails';
import { addRezerwacja } from './components/addRezerwacja';
import { getRezerwacje } from './components/getRezerwacje';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <AuthorizeRoute path='/fetch-data' component={FetchData} />
            <AuthorizeRoute path='/pokoje' component={Pokoje} />
            <AuthorizeRoute path='/addPokoj' component={addPokoj} />
            <Route path='/pokojDetails/:id' component={pokojDetails} />
            <AuthorizeRoute path='/addRezerwacja/:id' component={addRezerwacja} />
            <AuthorizeRoute path='/getRezerwacje' component={getRezerwacje} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
