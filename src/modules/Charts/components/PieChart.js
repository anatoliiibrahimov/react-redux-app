import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

export class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: null,
    };
    this.setSvgContainer = this.setSvgContainer.bind(this);
    this.fitParentContainer = this.fitParentContainer.bind(this);
  }

  componentDidMount() {
    this.fitParentContainer();
    window.addEventListener('resize', this.fitParentContainer);

    const { width, height } = this.props;

    const svg = d3.select(this.svgContainer).append('svg')
      .attr('width', width)
      .attr('height', height);
    svg.append('g')
      .attr('class', 'graph-holder')
      .attr('transform', 'translate(70,70)');

    svg.append('g')
      .attr('class', 'legend-holder')
      .attr('transform', 'translate(160,-25)');

    this.redrawChart();
  }

  componentDidUpdate() {
    this.fitParentContainer();
    this.redrawChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitParentContainer);
    if (this.tooltip) {
      this.tooltip.hide();
    }
  }

  setSvgContainer(el) {
    this.svgContainer = el;
  }

  fitParentContainer() {
    const { containerWidth } = this.state;
    const svgNode = d3.select(this.svgContainer).node();
    const currentContainerWidth = svgNode.getBoundingClientRect().width;

    const shouldResize = containerWidth !== currentContainerWidth;

    if (shouldResize) {
      this.setState({
        containerWidth: currentContainerWidth,
      });
    }
  }

  redrawChart() {
    const { radius, height, width } = this.props;
    const { containerWidth } = this.state;
    let chartData = [{ name: 'test1', value: '30' }, { name: 'test', value: '40' }, { name: 'test3', value: '30' }];

    chartData = chartData.map((d) => {
      const value = Math.round(d.value * 100) / 100;
      const name = d.name.toLowerCase().includes('unknown') ? 'UNKNOWN' : d.name;
      return { label: `${Math.round(d.value * 100) / 100}% - ${name}`, value };
    });

    const color = d3.scaleOrdinal()
      .range(['#002d7f', '#194fb2', '#1962e5', '#3f78e2', '#4c8bff', '#4c9dff', '#72b0fb', '#99c7ff', '#b0d3fc', '#cce3ff']);

    const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const pie = d3.pie()
      .value(d => d.value)(chartData);

    const parentWidth = containerWidth;

    const realHeight = height;
    const realWidth = parentWidth || width;

    const svg = d3.select(this.svgContainer).select('svg');
    svg
      .attr('width', realWidth)
      .attr('height', realHeight);

    const holder = svg.select('.graph-holder');

    const g = holder.selectAll('.arc')
      .data(pie)
      .enter().append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', arc)
      .style('fill', (d, i) => color(i));

    const legendHolder = svg.select('.legend-holder');
    const legendG = legendHolder.selectAll('.legend')
      .data(pie)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(20,${(i * 20) + 40})`)
      .attr('class', 'legend');

    d3.select('.tooltip').remove();

    this.tooltip = d3Tip()
      .attr('class', 'bar-name-tooltip')
      .offset([-10, 0])
      .html(d => `<span>${d.data.name}</span>`);

    legendG.append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', (d, i) => color(i));

    legendG.append('text')
      .text(d => d.data.label)
      .style('font-size', 12)
      .style('fill', '#a1adb1')
      .attr('class', 'hover-text')
      .attr('cursor', 'default')
      .attr('y', 10)
      .attr('x', 15);
  }

  render() {
    const { containerWidth } = this.state;
    const shouldRenderChart = containerWidth !== null;
    return (
      <div className="col-6">
        <h1>PieChart</h1>
        <div
          ref={this.setSvgContainer}
        >
          {shouldRenderChart && this.redrawChart()}
        </div>
      </div>
    );
  }
}

PieChart.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
};

export default PieChart;
