import React from 'react';
import * as d3 from 'd3';
import Bars from '../components/bars.jsx';
import XYAxis from '../components/x-y-axis.jsx';

const xMax = (data) => d3.max(data, (d) => parseInt(d.key));
const yMax = (data) => d3.max(data, (d) => parseInt(d.value));

const xScale = (props) => {
	return d3.scaleLinear()
		.domain([0, xMax(props.data)])
		.range([props.padding, props.width - props.padding]);
};

const yScale = (props) => {
	return d3.scaleLinear()
		.domain([0, yMax(props.data)])
		.range([props.height - props.padding, props.padding]);
};

export default (props) => {
	const scales = {xScale: xScale(props), yScale: yScale(props) };
	return <svg width={props.width} height={props.height}>
		<Bars {...props} data={props.allAge} stroke="#D9D9D9" {...scales} />
		<Bars {...props} data={props.maleAge} stroke="#5A95FE" {...scales} />
		<Bars {...props} data={props.femaleAge} stroke="#FE5A5A" {...scales} />

		<XYAxis {...props} xLabel={props.xLabel} yLabel={props.yLabel} {...scales} />
		</svg>
}
