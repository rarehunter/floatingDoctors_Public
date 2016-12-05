import React from 'react';
import styles from '../css/main.css';

export default class Tooltip extends React.Component {
	constructor() {
		super();
	}
	render() {
		var visibility="hidden";
        var transform="";
        var x=0;
        var y=0;
        var width=150,height=70;
        var transformText='translate('+width/2+','+(height/2-5)+')';
       	var classy = styles.tooltip;

        if(this.props.tooltip.display === true){
            var position = this.props.tooltip.pos;
            x= position.x;
            y= position.y;
            visibility="visible";
            transform='translate(' + x + ',' + (y - 20)+ ')';
        }else{
            classy += ` ${styles.hide}`;
            transform='translate(' + x + ',' + (y - 40)+ ')';
        }
		return (
			<g transform={transform} className={classy} >
                <rect width={width} height={height} rx="5" ry="5" visibility="hidden" />
                <text textAnchor="middle">
                   {this.props.tooltip.data}
                </text>
            </g>
		);
	}
}