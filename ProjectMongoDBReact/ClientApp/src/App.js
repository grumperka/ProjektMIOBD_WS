import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Pokoje } from './components/Pokoje';
import { addPokoj } from './components/addPokoj';
import { pokojDetails } from './components/pokojDetails';
import { addRezerwacja } from './components/addRezerwacja';
import { getRezerwacje } from './components/getRezerwacje';
import { getAllRezerwacje } from './components/getAllRezerwacje';
import { getAllRachunki } from './components/getAllRachunki';
import { getKlienci } from './components/getKlienci';
import { getPracownicy } from './components/getPracownicy';
import { userDetails } from './components/userDetails';
import { checkPokoj } from './components/checkPokoj';
import { userData } from './components/userData';
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
            <AuthorizeRoute path='/pokoje' component={Pokoje} />
            <AuthorizeRoute path='/addPokoj' component={addPokoj} />
            <AuthorizeRoute path='/pokojDetails/:id' component={pokojDetails} />
            <AuthorizeRoute path='/addRezerwacja/:id' component={addRezerwacja} />
            <AuthorizeRoute path='/getRezerwacje' component={getRezerwacje} />
            <AuthorizeRoute path='/getAllRezerwacje' component={getAllRezerwacje} />
            <AuthorizeRoute path='/getAllRachunki' component={getAllRachunki} />
            <AuthorizeRoute path='/getKlienci' component={getKlienci} />
            <AuthorizeRoute path='/getPracownicy' component={getPracownicy} />
            <AuthorizeRoute path='/userDetails' component={userDetails} />
            <AuthorizeRoute path='/checkPokoj' component={checkPokoj} />
            <AuthorizeRoute path='/userData/:email' component={userData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
