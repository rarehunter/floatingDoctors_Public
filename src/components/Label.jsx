import React from 'react';
import styles from '../css/main.css';
import MultiviewDialog from '../MultiviewDialog.jsx';

export default class Label extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onUserInput(true, this.props.value);
	}

	render() {
		return <tspan className={styles.label} onClick={this.handleClick} x={this.props.x} dy={this.props.dy} dx={this.props.dx} y={this.props.y}> {this.props.value} </tspan>;
	}
}
