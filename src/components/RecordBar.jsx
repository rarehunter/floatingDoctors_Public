import React from 'react';
import RecordSquare from '../components/RecordSquare.jsx';
import * as Meta from '../Metadata.jsx';
import ReactTransitionGroup from 'react-addons-transition-group';

export default function RecordBar(props) {
    return (
    	<g>
       
        {props.records && props.records.map((r,i) => {
            return <RecordSquare key={r.key}
            			i = {i}
                        onUserInput={props.onUserInput}
                        onUserHover={props.onUserHover}
                        record={r}
                        x={props.x}
                        y={props.height - (i+1) * (Meta.SQUARE_GUTTER+Meta.SQUARE_SIZE) - Meta.SQUARE_SIZE} />;
        })};
        
        </g>
    );
    
}
