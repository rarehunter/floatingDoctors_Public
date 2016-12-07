import React from 'react';
import * as d3 from 'd3';
import Line from '../components/line.jsx';
import XYAxis from '../components/x-y-axis.jsx';

const xMax = (data) => d3.max(data, (d) => parseInt(d.key));
const yMax = (data) => d3.max(data, (d) => parseInt(d.value));

const xScale = (props) => {
	var x = d3.scaleLinear()
		.domain([0, xMax(props.data)])
	 	.range([props.padding, props.width - props.padding]);
	return x;
};

const yScale = (props) => {
	var y = d3.scaleLinear()
		.domain([0, yMax(props.data)])
		.range([props.height - props.padding, props.padding]);

	return y;
};


export default (props) => {
	const scales = {xScale: xScale(props), yScale: yScale(props) };

	const line = d3.line()
				.x(function(d) {return scales.xScale(d.key) } )
				.y(function(d) {return scales.yScale(d.value) } );

	return <svg width={props.width} height={props.height}>
	        <path d={line(props.allAge)} stroke="black" strokeLinecap="round" strokeWidth="1" fill="none"/>
			<path d={line(props.femaleAge)} stroke="red" strokeLinecap="round" strokeWidth="1" fill="none"/>
			<path d={line(props.maleAge)} stroke="blue" strokeLinecap="round" strokeWidth="1" fill="none"/>

			<XYAxis {...props} {...scales} />
		</svg>
}
