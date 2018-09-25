import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from 'App';
import HomePage from 'modules/Home/container';
import AboutPage from 'modules/About/container';
import CoursesPage from 'modules/Courses/container';
import ManageCoursePage from 'modules/Courses/components/ManageCoursePage';
import NewCourse from 'modules/Courses/components/NewCourse';

const routes = (
  <BrowserRouter>
    <div>
      <Route path="/"  component={App} />
      <Route exact path="/"  component={HomePage} />
      <Route path="/about"  component={AboutPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route exact path="/course" component={NewCourse} />
      <Route path="/course/:id" component={ManageCoursePage} />
    </div>
  </BrowserRouter>
);

export default routes;
