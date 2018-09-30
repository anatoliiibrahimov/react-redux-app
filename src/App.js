import React from 'react';
import PropTypes from 'prop-types';
import Header from './modules/common/Header';
import './assets/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';

const App = (props) => {
  const { children, loading } = props;
  return (
    <div className="container-fluid">
      <Header
        loading={loading}
      />
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default App;
