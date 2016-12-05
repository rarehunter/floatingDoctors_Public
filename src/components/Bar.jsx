import React from 'react';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';

export default class Bar extends React.Component {
	constructor() {
		super();
		this.checkBarState = this.checkBarState.bind(this);
	}

	checkBarState() {
		const state = this.props.state;
		let classy = "";
		if (state === 1) {
			classy = `${styles.bar} ${styles.show}`;
		} else if (state === 2) {
			classy = `${styles.bar} ${styles.show}`;
		} else {
			classy = `${styles.bar} ${styles.hide}`;
		}
		return classy;
	}

	render() {
		return <rect 
			className={this.checkBarState()}
			x={this.props.x} y={this.props.y}
			dx={this.props.dx} dy={this.props.dy}
			height={this.props.height} width={this.props.width} />
	}

}