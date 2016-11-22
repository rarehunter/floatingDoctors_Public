import React from 'react';

export default function MainViewLayout(props) {
	return (
		<g className="Panes">
			<g key="0" className="Pane-left" transform={`translate(${props.leftX}, 0)`}>
				{props.left}
			</g>
			<g key="1" className="Pane-center" transform={`translate(${props.centerX}, 0)`}>
				{props.center}
			</g>
			<g key="2" className="Pane-right" transform={`translate(${props.rightX}, 0)`}>
				{props.right}
			</g>
		</g>
	);
}