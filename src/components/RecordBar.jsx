import React from 'react';
import RecordSquare from '../components/RecordSquare.jsx';

export default function RecordBar(props) {
	return (
		<g>
		{props.records && props.records.map((r,i) => {
			return <RecordSquare key={i} size="4" x={props.x} y={props.height - (i+1) * 5 - 4} />;
		})};
		</g>
	);
	
}