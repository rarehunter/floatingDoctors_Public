import React from 'react';
import styles from '../css/main.css';

export default class RecordSquare extends React.Component {
	render() {
		return (
			<rect 
				key={this.props.key} 
				width={this.props.size} 
				height={this.props.size} 
				x={this.props.x} 
				y={this.props.y} 
				className={styles.recordSquare}
			/>
		)
	}
}