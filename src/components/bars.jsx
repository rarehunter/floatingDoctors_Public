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

		const onMouseOver = () => {
			props.handleDataBarHover(true, coords.key);
			props.updateDetails(coords.key, Math.round(coords.value * 100)/100);
		}

		const onMouseOut = () => {
			if(props.clickState == true)
			{
				props.updateDetails('','');
			}
			else {
				props.handleDataBarOut(true);
				props.updateDetails('','');
			}
		}

		if(props.visibility == false) {
			return <rect {...barProps} className={props.dataBars} fill="#FFFFFF" stroke={props.stroke} visibility="hidden" />;
		}
		else if(props.clickState == true) {
			return <rect {...barProps} className={props.dataBars} onMouseOver={onMouseOver} onMouseOut={onMouseOut} fill="#FFFFFF" stroke={props.stroke} />;
		}
		else if(props.highlightThis == coords.key) {
			return <rect {...barProps} className={props.dataBars} onMouseOver={onMouseOver} onMouseOut={onMouseOut} stroke={props.stroke} />;
		}
		else {
			return <rect {...barProps} className={props.dataBars} onMouseOver={onMouseOver} onMouseOut={onMouseOut} fill="#FFFFFF" stroke={props.stroke} />;
		}
	};
};

export default (props) => {
	return <g>{ props.data.map(renderBars(props)) }</g>
}
