import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';

const routes = (
  <BrowserRouter>
    <div>
      <Route path='/'  component={App} />
      <Route exact path='/'  component={HomePage} />
      <Route path='/about'  component={AboutPage} />
    </div>
  </BrowserRouter>
);

export default routes;
