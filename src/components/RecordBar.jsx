import React from 'react';
import RecordSquare from '../components/RecordSquare.jsx';
import * as Meta from '../Metadata.jsx';

export default function RecordBar(props) {
	return (
		<g>
		{props.records && props.records.map((r,i) => {
			return <RecordSquare key={i} x={props.x} y={props.height - (i+1) * (Meta.SQUARE_GUTTER+Meta.SQUARE_SIZE) - Meta.SQUARE_SIZE} />;
		})};
		</g>
	);
	
}