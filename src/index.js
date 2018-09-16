/*eslint-disable import/default*/
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from 'store/configureStore';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {loadCourses} from 'actions/courseActions';
import {loadAuthors} from 'actions/authorActions';
import App from './App';
import HomePage from 'modules/Home/container';
import AboutPage from 'modules/About/container';
import CoursesPage from 'modules/Courses/container';
import ManageCoursePage from 'modules/Courses/components/ManageCoursePage';

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
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
