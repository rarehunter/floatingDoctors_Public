import React from 'react';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';

export default class RecordSquare extends React.Component {
	constructor() {
		super();
		this.state = {
			scale: 1
		};
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.checkSquareState = this.checkSquareState.bind(this);
	}
	handleMouseOver() {
		this.setState({
			scale: 1.2
		})
	}
	handleMouseOut() {
		this.setState({
			scale: 1
		})
	}
	checkSquareState() {
		let classy = "";
		if (this.state.scale === 1) {
			classy = `${styles.recordSquare}`;
		} else {
			classy = `${styles.recordSquare} ${styles.highlighted}`;
		}
		return classy;
	}
	render() {
		const translateX = this.props.x;
		const translateY = this.props.y + Meta.SquareSize() / 2;
		return (
			<rect 
				width={Meta.SquareSize()} 
				height={Meta.SquareSize()} 
				x={this.props.x - Meta.SquareSize() / 2} 
				y={this.props.y} 
				transform={`translate(${translateX}, ${translateY}) scale(${this.state.scale}) translate(-${translateX}, -${translateY})`}
				className={this.checkSquareState()}
				onMouseOver = {this.handleMouseOver}
				onMouseOut = {this.handleMouseOut}
			/>
		)
	}
}