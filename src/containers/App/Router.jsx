import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import requireAuth from '../../hoc/requireAuth';

import LogIn from '../LogIn/index';
import Customers from '../Customers';
import Dashboard from '../Dashboard';
import CustomerDetails from '../Customers/CustomerDetails';

const Pages = () => (
  <Switch>
    <Route path="/customers" component={requireAuth (Customers)} />
    <Route path="/dashboard" component={requireAuth (Dashboard)} />
    <Route
      path="/customer-details/:id"
      component={requireAuth (CustomerDetails)}
    />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/" component={Pages} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/log_in" component={LogIn} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
