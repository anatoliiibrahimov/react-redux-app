import React from 'react';
import BarChart from './components/BarChart';

class Charts extends React.Component {
  render() {

    return (
      <div>
        <h1>Charts</h1>
        <svg width="960" height="500">
          <BarChart  width={400} height={300} x={0} y={0} />
        </svg>
      </div>
    );
  }
}

export default Charts;
