import React from 'react';
import styles from '../css/main.css';

export default class Label extends React.Component {
	constructor() {
		super();
		this.checkLabelState = this.checkLabelState.bind(this);
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
	}
	checkLabelState() {
		const state = this.props.state;
		let classy = "";
		if (state === 1) {
			classy = `${styles.label} ${styles.highlighted}`;
		} else if (state === 2) {
			classy = `${styles.label} ${styles.selected}`;
		} else {
			classy = `${styles.label}`;
		}
		return classy;
	}
	handleMouseOver() {
		this.props.onLabelInteraction(
			this.props.id,
			1
		);
	}
	handleMouseOut() {
		this.props.onLabelInteraction(
			this.props.id,
			0
		);
	}
	render() {
		return <tspan 
			className={this.checkLabelState()} 
			onMouseOver={this.handleMouseOver} 
			onMouseOut ={this.handleMouseOut}
			x={this.props.x} dy={this.props.dy} dx={this.props.dx} y={this.props.y}> {this.props.value} </tspan>;
	}
}