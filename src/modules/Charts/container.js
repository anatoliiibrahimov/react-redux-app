import React from 'react';
import { range } from 'd3-array';
import { scaleThreshold } from 'd3-scale';
import worldData from '../common/WorldData';
import BarChart from './components/BarChart';
import WorldMapChart from './components/WorldMapChart';
import Brush from './components/Brush';
import PieChart from './components/PieChart';

const data = worldData.features;

data
  .forEach((d,i) => {
    const offset = Math.random()
    d.launchday = i
    d.data = range(200).map((p,q) => q < i ? 0 : Math.random() * 2 + offset)
  });

const colorScale = scaleThreshold().domain([5,10,20,30]).range(["#75739F", "#5EAFC6", "#41A368", "#93C464"]);

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: "none",
      brushExtent: [0, 100],
      screenWidth: 1200, screenHeight: 500,
    };

    this.onHover = this.onHover.bind(this);
    this.onBrush = this.onBrush.bind(this);
  }

  onHover(d) {
    this.setState({ hover: d.id })
  }

  onBrush(d) {
    this.setState({ brushExtent: d })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <BarChart 
            hoverElement={this.state.hover}
            onHover={this.onHover}
            colorScale={colorScale}
            data={data}
            size={[this.state.screenWidth / 2, this.state.screenHeight / 2]}
          />
          <WorldMapChart
            hoverElement={this.state.hover}
            onHover={this.onHover}
            colorScale={colorScale}
            data={data}
            size={[this.state.screenWidth, this.state.screenHeight]}
          />
          <Brush
            changeBrush={this.onBrush} size={[this.state.screenWidth, 50]}
          />
          <PieChart radius={80} height={600} width={600}/>
        </div>
      </div>
    );
  }
}

export default Charts;
