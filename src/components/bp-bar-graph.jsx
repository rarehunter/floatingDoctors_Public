import React from 'react';
import * as d3 from 'd3';
import BPBars from '../components/bpbars.jsx';
import XYAxis from '../components/x-y-axis.jsx';
import BPCircles from '../components/bpcircles.jsx';
import BPCirclesDYS from '../components/bpcircles-dys.jsx';

const xMax = (data) => d3.max(data, (d) => parseInt(d.key));
const yMax = (data) => d3.max(data, (d) => parseInt(d.value[0]));

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
		<BPCircles {...props}
				data={props.allAge}
				stroke="#A8A8A8"
				className={props.dataBars}
				handleDataBarHover={props.onDataBarHover}
				handleDataBarOut={props.onDataBarOut}
				visibility="true"
				highlightThis={props.highlightThis}
				updateDetails={props.updateDetails}
				{...scales} />

		<BPCircles {...props}
				data={props.maleAge}
				stroke="#5A95FE"
				className={props.dataBars}
				handleDataBarHover={props.onDataBarHover}
				handleDataBarOut={props.onDataBarOut}
				visibility={props.maleShowing}
				clickState={props.maleState}
				highlightThis={props.highlightThis}
				updateDetails={props.updateDetails}
				{...scales} />

			<BPCircles {...props}
				data={props.femaleAge}
				stroke="#FE5A5A"
				className={props.dataBars}
				handleDataBarHover={props.onDataBarHover}
				handleDataBarOut={props.onDataBarOut}
				visibility={props.femaleShowing}
				clickState={props.femaleState}
				highlightThis={props.highlightThis}
				updateDetails={props.updateDetails}
				{...scales} />

			<BPCirclesDYS {...props}
						data={props.allAge}
						stroke="#A8A8A8"
						className={props.dataBars}
						handleDataBarHover={props.onDataBarHover}
						handleDataBarOut={props.onDataBarOut}
						visibility="true"
						highlightThis={props.highlightThis}
						updateDetails={props.updateDetails}
						{...scales} />

				<BPCirclesDYS {...props}
						data={props.maleAge}
						stroke="#5A95FE"
						className={props.dataBars}
						handleDataBarHover={props.onDataBarHover}
						handleDataBarOut={props.onDataBarOut}
						visibility={props.maleShowing}
						clickState={props.maleState}
						highlightThis={props.highlightThis}
						updateDetails={props.updateDetails}
						{...scales} />

					<BPCirclesDYS {...props}
						data={props.femaleAge}
						stroke="#FE5A5A"
						className={props.dataBars}
						handleDataBarHover={props.onDataBarHover}
						handleDataBarOut={props.onDataBarOut}
						visibility={props.femaleShowing}
						clickState={props.femaleState}
						highlightThis={props.highlightThis}
						updateDetails={props.updateDetails}
						{...scales} />


		<XYAxis {...props} xLabel={props.xLabel} yLabel={props.yLabel} chartType1={props.chartType1} chartType2={props.chartType2} {...scales} />
		</svg>
}
