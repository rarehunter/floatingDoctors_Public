import React from 'react';

const renderCircles = (props) => {
	return (coords, index) => {
		const circleProps_DYS = {
			cx: props.xScale(coords.key),
			cy: props.yScale(coords.value[1]),
			r: 2,
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
			return <circle {...circleProps_DYS} className={props.dataBars} fill="#FFFFFF" stroke={props.stroke} visibility="hidden" />;
		}
		else if(props.clickState == true) {
			return <circle {...circleProps_DYS} className={props.dataBars} onMouseOver={onMouseOver} onMouseOut={onMouseOut} fill="#FFFFFF" stroke={props.stroke} />;
		}
		else {
			return <circle {...circleProps_DYS} className={props.dataBars} onMouseOver={onMouseOver} onMouseOut={onMouseOut} fill="#FFFFFF" stroke={props.stroke}/>;
		}


	};
};

export default (props) => {
	return <g>{ props.data.map(renderCircles(props)) }</g>
}
