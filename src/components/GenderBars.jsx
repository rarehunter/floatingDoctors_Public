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
	var male_percentage;
	var female_percentage;

	/* This is needed for times when total is 0 and we don't want to divide by 0 */
	if(total == 0) {
		male_percentage = 0;
		female_percentage = 0;
	}
	else {
		male_percentage = Math.round(props.data[0][0] / total * 100);
		female_percentage = Math.round(props.data[0][1] / total * 100);
	}

	var higher;
	var lower;
	var barPropsF;
	var barPropsM;

	if(props.data[0][0] >= props.data[0][1])
	{
		higher = props.data[0][0];
		lower = props.data[0][1];

		barPropsF = {
			x: 15,
			y: 15,
			height: 10,
			width: Math.round((lower * 150) / higher),
			number: props.data[0][0],
			percentage: female_percentage,
			fill: '#FF5858',
		};

		barPropsM = {
			x: 15,
			y: 30,
			height: 10,
			width: 150,
			number: props.data[0][1],
			percentage: male_percentage,
			fill: '#5A95FE',
		};
	}
	else
	{
		higher = props.data[0][1];
		lower = props.data[0][0];

		barPropsF = {
			x: 15,
			y: 15,
			height: 10,
			width: 150,
			number: props.data[0][1],
			percentage: female_percentage,
			fill: '#FF5858',
		};

		barPropsM = {
			x: 15,
			y: 30,
			height: 10,
			width: Math.round((lower * 150) / higher),
			number: props.data[0][0],
			percentage: male_percentage,
			fill: '#5A95FE',
		};
	}

	return <svg height="100">
			<GBar {...props}
				  barProps={barPropsM}
				  gender="M"
				  className={props.maleClass}
				  clickState={props.maleState}
				  {...scales}
				  onMouseOver={props.maleHover}
				  onMouseOut={props.maleOut}
				  onClick={props.maleClick}
			/>

			<GBar {...props}
				  barProps={barPropsF}
				  gender="F"
				  className={props.femaleClass}
				  clickState={props.femaleState}
				  {...scales}
				  onMouseOver={props.femaleHover}
				  onMouseOut={props.femaleOut}
				  onClick={props.femaleClick}
			/>
		</svg>
}
