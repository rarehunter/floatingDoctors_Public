import React from 'react';

const renderLines = (props) => {
	return (coords, index) => {
        if(index+1 < props.data.length)
        {
            var next_coords = props.data[index+1];

    		const lineProps = {
    			x1: props.xScale(coords[0]),
    			y1: props.yScale(coords[1]),
                x2: props.xScale(next_coords[0]),
                y2: props.yScale(next_coords[1]),
                stroke: props.stroke,
                strokeWidth: 1,
    			key: index
    		};
    		return <line {...lineProps} />;
        }
	};
};

export default (props) => {
	return <g>{ props.data.map(renderLines(props)) }</g>
}
