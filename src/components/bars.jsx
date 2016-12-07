import React from 'react';

const renderBars = (props) => {
	return (coords, index) => {
		const barProps = {
            x: props.xScale(coords.key),
            y: props.yScale(coords.value),
            width: 0.5,
            height: props.height - props.padding - props.yScale(coords.value),
			key: index
		};
		return <rect {...barProps} fill="#FFFFFF" stroke={props.stroke}/>;
	};
};

export default (props) => {
	return <g>{ props.data.map(renderBars(props)) }</g>
}
