import React from 'react';

const renderBars = (props) => {
	return (coords, index) => {
		const barProps = {
            x: props.xScale(coords.key),
            y: props.yScale(coords.value[0]),
            width: 0.5,
            height: props.yScale(coords.value[1]) - props.yScale(coords.value[0]),
			key: index
		};

		const onMouseOver = () => {
			props.handleDataBarHover(true, coords.key);
			props.updateDetails(coords.key, Math.round(coords.value[0] * 100)/100, Math.round(coords.value[1] * 100)/100);
		}

		const onMouseOut = () => {
			props.handleDataBarOut(true);
			props.updateDetails('', '');
		}

		if(props.visibility == false) {
			return <rect {...barProps} className={props.dataBars} fill="#FFFFFF" stroke={props.stroke} visibility="hidden" />;
		}
		else if(props.clickState == true) {
			return <rect {...barProps} className={props.dataBars} onMouseOver={onMouseOver} onMouseOut={onMouseOut} fill="#FFFFFF" stroke={props.stroke} />;
		}
		else {
			return <rect {...barProps} className={props.dataBars} onMouseOver={onMouseOver} onMouseOut={onMouseOut} fill="#FFFFFF" stroke={props.stroke}/>;
		}
	};
};

export default (props) => {
	return <g>{ props.data.map(renderBars(props)) }</g>
}
