import React from 'react';
import PropTypes from 'prop-types';
import { geoMercator, geoPath } from 'd3-geo';

const WorldMapChart = ({
  data, hoverElement, colorScale, onHover, size,
}) => {
  const projection = geoMercator()
    .scale(120)
    .translate([430, 250]);
  const pathGenerator = geoPath().projection(projection);
  const countries = data.map(d => (
    <path
      key={`path + ${d.geometry.coordinates}`}
      d={pathGenerator(d)}
      onMouseEnter={() => { onHover(d); }}
      style={{ fill: hoverElement === d.id ? '#FCBC34' : colorScale(d.launchday), stroke: 'black', strokeOpacity: 0.5 }}
      className="countries"
    />
  ));

  return (
    <div className="col-6">
      <h1>World map</h1>
      <svg width={size[0]} height={size[1]}>
        {countries}
      </svg>
    </div>
  );
};

WorldMapChart.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  size: PropTypes.arrayOf(PropTypes.any).isRequired,
  colorScale: PropTypes.arrayOf(PropTypes.any).isRequired,
  onHover: PropTypes.func.isRequired,
  hoverElement: PropTypes.string.isRequired,
};

export default WorldMapChart;
