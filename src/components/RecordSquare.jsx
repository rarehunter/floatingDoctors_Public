import React from 'react';
import styles from '../css/main.css';

export default class RecordSquare extends React.Component {
	constructor() {
		super();
		this.state = {
			scale: 1,
			fill: "rgba(254,90,90,0.2)",
		};
	}
	render() {
		const size = this.props.size * this.state.scale;
		const translateX = this.props.x;
		const translateY = this.props.y + this.props.size / 2;
		return (
			<rect 
				width={this.props.size} 
				height={this.props.size} 
				x={this.props.x - this.props.size / 2} 
				y={this.props.y} 
				fill={this.state.fill}
				transform={`translate(${translateX}, ${translateY}) scale(${this.state.scale}) translate(-${translateX}, -${translateY})`}
				className={styles.recordSquare}
				onMouseOver = {() => {this.setState({
					scale: 1.2,
					fill: "rgba(254,90,90,1)"
				});}}
				onMouseOut = {() => {this.setState({
					scale: 1,
					fill: "rgba(254,90,90,0.2)"
				});}}
			/>
		)
	}
}