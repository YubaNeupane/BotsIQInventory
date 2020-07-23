import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as routes from './routes';
import Home from '../Home';
import CategoryList from '../CategoryList';
import ProductList from '../Products/ProductList';
import Search from '../Search';
import ProductDetail from '../Products/ProductDetail';
import StudentOrderInfo from '../StudentOrderInfo/index.js'


const StudentProductRoutery = (props) => {
  return (
    <Switch>
      <Route 
        exact 
        path={routes.HOME} 
        component={Home} 
      />
      <Route 
        path={routes.CATEGORYLIST} 
        component={CategoryList} 
      />
      <Route 
        path={routes.SEARCH} 
        component={Search} 
      />
       <Route 
        path={routes.StudentOrderView} 
        component={StudentOrderInfo} 
      />
      <Route
        exact
        path={`${routes.DASHBOARD}/:category`}
        component={ProductList}
      />
      <Route
        exact
        path={`${routes.DASHBOARD}/:category/:productId`}
        component={ProductDetail}
      />
    </Switch>
  );
};

export default StudentProductRoutery;
