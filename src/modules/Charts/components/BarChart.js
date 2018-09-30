import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { max, sum } from 'd3-array';
import { select } from 'd3-selection';
import { legendColor } from 'd3-svg-legend';

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount() {
    this.createBarChart();
  }

  componentDidUpdate() {
    this.createBarChart();
  }

  createBarChart() {
    const { node } = this;
    const {
      data,
      size,
      colorScale,
      onHover,
      hoverElement,
    } = this.props;
    const dataMax = max(data.map(d => sum(d.data)));
    const barWidth = size[0] / data.length;

    const legend = legendColor()
      .scale(colorScale)
      .labels(['1', '2', '3', '4']);

    select(node)
      .selectAll('g.legend')
      .data([0])
      .enter()
      .append('g')
      .attr('class', 'legend')
      .call(legend);

    select(node)
      .select('g.legend')
      .attr('transform', 'translate(' + (size[0] - 100) + ', 20)'); // eslint-disable-line

    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, size[1]]);

    select(node)
      .selectAll('rect.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .on('mouseover', onHover);

    select(node)
      .selectAll('rect.bar')
      .data(data)
      .exit()
      .remove();

    select(node)
      .selectAll('rect.bar')
      .data(data)
      .attr('x', (d, i) => i * barWidth)
      .attr('y', d => size[1] - yScale(sum(d.data)))
      .attr('height', d => yScale(sum(d.data)))
      .attr('width', barWidth)
      .style('fill', (d, i) => hoverElement === d.id ? '#FCBC34' : colorScale(d.launchday)) // eslint-disable-line
      .style('stroke', 'black')
      .style('stroke-opacity', 0.25);
  }

  render() {
    const { size } = this.props;
    return (
      <div className="col-6">
        <h1>BarChart</h1>
        <svg
          ref={(node) => { this.node = node; }}
          width={size[0]}
          height={size[1]}
        />
      </div>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  size: PropTypes.arrayOf(PropTypes.any).isRequired,
  colorScale: PropTypes.arrayOf(PropTypes.any).isRequired,
  onHover: PropTypes.func.isRequired,
  hoverElement: PropTypes.string.isRequired,
};

export default BarChart;
