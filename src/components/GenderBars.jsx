import React from 'react';
import * as d3 from 'd3';
import GBar from '../components/gbar.jsx';
import XYAxis from '../components/x-y-axis.jsx';

const xMax = (data) => d3.max(data, (d) => d[0]);
const yMax = (data) => d3.max(data, (d) => d[1]);

const xScale = (props) => {
	return d3.scaleLinear()
		.domain([0, xMax(props.data[0])])
		.range([props.padding, props.width - props.padding]);
};

const yScale = (props) => {
	return d3.scaleLinear()
		.domain([0, yMax(props.data[0])])
		.range([props.height - props.padding, props.padding]);
};

export default (props) => {
	const scales = {xScale: xScale(props), yScale: yScale(props) };
	const total = props.data[0][0] + props.data[0][1];

	const barPropsM = {
		x: 15,
		y: 15,
		height: 10,
		width: props.data[0][0],
		fill: '#5A95FE',
	};

	const barPropsF = {
		x: 15,
		y: 30,
		height: 10,
		width: props.data[0][1],
		fill: '#FF5858',
	};

	return <svg width={props.width} height={props.height}>
			<GBar {...props} barProps={barPropsM} gender="M" per={Math.round(props.data[0][0]/total * 100) } {...scales} />
			<GBar {...props} barProps={barPropsF} gender="F" per={Math.round(props.data[0][1]/total * 100) } {...scales}/>
		</svg>
}
