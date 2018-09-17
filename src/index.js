/*eslint-disable import/default*/
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import HomePage from 'modules/Home/container';
import AboutPage from 'modules/About/container';
import CoursesPage from 'modules/Courses';
import ManageCoursePage from 'modules/Courses/components/ManageCoursePage';
import rootReducer from './rootReducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router>
      <Switch>
        <div>
          <Route path="/"  component={App} />
          <Route exact path="/"  component={HomePage} />
          <Route path="/about"  component={AboutPage} />
          <Route path="/courses" component={CoursesPage} />
          <Route exact path="/course" component={ManageCoursePage} />
          <Route path="/course/:id" component={ManageCoursePage} />
        </div>
      </Switch>
    </Router >
  </Provider>,
  document.getElementById('app')
);
