import React from 'react';
import styles from '../css/main.css';

export default class Label extends React.Component {
	render() {
		return <tspan className={styles.label} x={this.props.x} dy={this.props.dy}> {this.props.value} </tspan>;
	}
}