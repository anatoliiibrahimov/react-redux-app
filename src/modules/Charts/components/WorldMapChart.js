import React from 'react';
import { geoMercator, geoPath } from 'd3-geo';

const WorldMapChart = ({ data, hoverElement, colorScale, onHover, size }) => {
  console.log(data);
  const projection = geoMercator()
    .scale(120)
    .translate([430,250]);
  const pathGenerator = geoPath().projection(projection);
  const countries = data
    .map((d,i) => <path
      key={'path' + i}
      d={pathGenerator(d)}
      onMouseEnter={() => {onHover(d)}}
      style={{fill: hoverElement === d.id ? "#FCBC34" : colorScale(d.launchday), stroke: "black", strokeOpacity: 0.5 }}
      className='countries'
      />
    );

  return (
    <div className="col-6">
      <h1>World map</h1>
      <svg width={size[0]} height={size[1]}>
        {countries}
      </svg>
    </div>
  );
}

export default WorldMapChart;
