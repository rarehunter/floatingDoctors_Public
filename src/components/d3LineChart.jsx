import React from 'react';
import * as d3 from 'd3';
import Line from '../components/line.jsx';
import XYAxis from '../components/x-y-axis.jsx';

const xMax = (data) => d3.max(data, (d) => d.key);
const yMax = (data) => d3.max(data, (d) => d.value);

const xScale = (props) => {
	/* Find the correct scale which is the max of all the line data */
	// var final_max_x = Math.max(xMax(props.data[0]),
	// 							xMax(props.data[1]),
	// 							xMax(props.data[2]));

	var x = d3.scaleLinear()
		.domain([0, xMax(props.data)])
		// 	.domain([0, final_max_x])
	 	.range([props.padding, props.width - props.padding]);

	return x;
};

const yScale = (props) => {
	/* Find the correct scale which is the max of all the line data */
	// var final_max_y = Math.max(yMax(props.data[0]),
	// 							yMax(props.data[1]),
	// 							yMax(props.data[2]));

	var y = d3.scaleLinear()
		.domain([0, yMax(props.data)])
		// .domain([0, final_max_y])
		.range([props.height - props.padding, props.padding]);

	return y;
};


export default (props) => {
	const scales = {xScale: xScale(props), yScale: yScale(props) };

	const line = d3.line()
				.x(function(d) {return scales.xScale(d.key) } )
				.y(function(d) {return scales.yScale(d.value) } );

	return <svg width={props.width} height={props.height}>
	        <path d={line(props.allAge)} stroke="#d9d9d9" strokeLinecap="round" strokeWidth="2" fill="none"/>
			<path d={line(props.femaleAge)} stroke="#FE5A5A" strokeLinecap="round" strokeWidth="2" fill="none"/>
			<path d={line(props.maleAge)} stroke="#5A95FE" strokeLinecap="round" strokeWidth="2" fill="none"/>

			<XYAxis {...props} {...scales} />
		</svg>
}
