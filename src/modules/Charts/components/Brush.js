import React from 'react';
import PropTypes from 'prop-types';
import { select, event } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { brushX } from 'd3-brush';
import { axisBottom } from 'd3-axis';

class Brush extends React.Component {
  constructor(props) {
    super(props);

    this.createBrush = this.createBrush.bind(this);
  }

  componentDidMount() {
    this.createBrush();
  }

  componentDidUpdate() {
    this.createBrush();
  }

  createBrush() {
    const { node } = this;
    const { size, changeBrush } = this.props;
    const scale = scaleLinear().domain([0, 36])
      .range([0, size[0]]);

    const dayBrush = brushX()
      .extent([[0, 0], size])
      .on('brush', brushed);

    const dayAxis = axisBottom().scale(scale);

    select(node)
      .selectAll('g.brushaxis')
      .data([0])
      .enter()
      .append('g')
      .attr('class', 'brushaxis')
      .attr('transform', 'translate(0,25)');

    select(node)
      .select('g.brushaxis')
      .call(dayAxis);

    select(node)
      .selectAll('g.brush')
      .data([0])
      .enter()
      .append('g')
      .attr('class', 'brush')
      .attr('transform', 'translate(0,0)');

    select(node)
      .select('g.brush')
      .call(dayBrush);

    select(node)
      .select('g.brush')
      .selectAll('g.resize')
      .selectAll('circle')
      .data([0])
      .enter()
      .append('circle')
      .attr('r', 25)
      .attr('cy', 25)
      .style('fill', 'white')
      .style('stroke', 'black')
      .style('stroke-width', '4px')
      .style('opacity', .75); // eslint-disable-line

    const brushFn = changeBrush;

    function brushed() {
      const selectedExtent = event.selection.map(d => scale.invert(d));
      brushFn(selectedExtent);
    }
  }

  render() {
    const { size } = this.props;
    return (
      <div className="col-6">
        <h1>Brush</h1>
        <svg ref={(node) => { this.node = node; }} width={size[0]} height={50} />
      </div>
    );
  }
}

Brush.propTypes = {
  size: PropTypes.arrayOf(PropTypes.any).isRequired,
  changeBrush: PropTypes.func.isRequired,
};

export default Brush;
