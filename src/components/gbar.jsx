import React from 'react';

const renderBars = (props) => {
	return (coords, index) => {
		const barProps = {
            x: props.barProps.x,
            y: props.barProps.y,
            width: props.barProps.width,
            height: 10,
			fill: props.barProps.fill,
			key: index
		};
		return <rect {...barProps} />;
	};
};


export default (props) => {
	// return <g><rect x={props.x} y={props.y} fill={props.fill} height="10" width="50" /></g>
	return <g>
			<text y={props.barProps.y + 10 }>{props.gender}</text>
			{ props.data.map(renderBars(props)) }
			<text y={props.barProps.y + 10 } x={props.barProps.width + 20}>{props.barProps.width} ({props.per}%)</text>
		</g>
}
