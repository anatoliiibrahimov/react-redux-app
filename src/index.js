/* eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AboutPage from './modules/About/container';
import CoursesPage from './modules/Courses';
import { ManageCoursePage } from './modules/Courses/components/ManageCoursePage';
import { NewCourse } from './modules/Courses/components/NewCourse';
import Charts from './modules/Charts/container';
import App from './App';
import HomePage from './modules/Home/container';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
console.log(store);
render(
  <Provider store={store}>
    <Router>
      <Switch>
        <div>
          <Route path="/" component={App} />
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/courses" component={CoursesPage} />
          <Route exact path="/course" component={NewCourse} />
          <Route path="/course/:id" component={ManageCoursePage} />
          <Route path="/charts" component={Charts} />
        </div>
      </Switch>
    </Router>
  </Provider>,
  window.document.getElementById('app'),
);
