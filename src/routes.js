import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from 'components/App';
import HomePage from 'components/home/HomePage';
import AboutPage from 'components/about/AboutPage';
import CoursesPage from 'components/course/CoursesPage';
import ManageCoursePage from 'components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default

const routes = (
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
);

export default routes;
