import React from 'react';

const renderBars = (props) => {
	return (coords, index) => {
		const barProps = {
            x: props.xScale(coords[0]),
            y: props.yScale(coords[1]),
            width: 15,
            height: 200 - 30 - props.yScale(coords[1]),
			key: index
		};
		return <rect {...barProps} />;
	};
};

export default (props) => {
	return <g>{ props.data.map(renderBars(props)) }</g>
}
