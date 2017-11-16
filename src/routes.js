import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';

const routes = (
  <BrowserRouter>
    <div>
      <Route path="/"  component={App} />
      <Route exact path="/"  component={HomePage} />
      <Route path="/about"  component={AboutPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route exact path="/course" component={ManageCoursePage} />
      <Route path="/course/:id" component={ManageCoursePage} />
    </div>
  </BrowserRouter>
);

export default routes;
