import React from 'react';

const renderBars = (props) => {
	return (coords, index) => {
		const barProps = {
			className: props.className,
            x: props.barProps.x,
            y: props.barProps.y,
            width: props.barProps.width,
            height: 10,
			fill: props.barProps.fill,
			key: index
		};

		const onMouseOver = () => {
			props.onMouseOver(true);
		}

		const onMouseOut = () => {
			if(!props.clickState)
				props.onMouseOut(true);
		}

		const onClick = () => {
			props.onClick();
		}

		if(props.clickState) {
			return <rect {...barProps} style={{opacity: "1"}} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick} />;
		}
		else {
			return <rect {...barProps} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick} />;
		}
	};
};


export default (props) => {
	return <g>
			<text y={props.barProps.y + 10 }>{props.gender}</text>
			{ props.data.map(renderBars(props)) }
			<text y={props.barProps.y + 10 } x={props.barProps.width + 20}>{props.barProps.number} ({props.barProps.percentage}%)</text>
		</g>
}
