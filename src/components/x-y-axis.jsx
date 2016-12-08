import React from 'react';
import Axis from '../components/axis.jsx';
import NormalRange from '../components/normalrange.jsx';

export default (props) => {
	const xSettings = {
		translate: `translate(0, ${props.height - props.padding})`,
		scale: props.xScale,
		orient: 'bottom',
		ticks: 9
	};

	const ySettings = {
		translate: `translate(${props.padding}, 0)`,
		scale: props.yScale,
		orient: 'left',
		ticks: 6
	};

	return <g className="xy-axis">
	    	<svg y={props.height - props.padding + 10} x={props.padding} height="50" width={props.width - 2*props.padding}>
				<rect fill="none" x="0" y="0" width={props.width - 2*props.padding} height="50"></rect>
				<text x={(props.width-2*props.padding)/2} y="25" fill="black" textAnchor="middle" alignmentBaseline="central">{props.xLabel}</text>
			</svg>
			<svg x="-20" y={props.padding} height={props.height - 2*props.padding} width="50">
				<rect fill="none" x="0" y="0" width="50" height={props.height - 2*props.padding}></rect>
				<text x="25" y={(props.height - 2*props.padding)/2} fill="black" textAnchor="middle" alignmentBaseline="central" transform="rotate(-90,25,100)">{props.yLabel}</text>
			</svg>

			<NormalRange {...props} chartType1={props.chartType1} />
			<NormalRange {...props} chartType2={props.chartType2} showTwo="two"/>
			<Axis {...xSettings} />
			<Axis {...ySettings} />
		</g>
}
