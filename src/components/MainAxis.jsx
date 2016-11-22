import React from 'react';
import * as d3 from 'd3';
import styles from '../css/main.css';

export default class MainAxis extends React.Component {
	
	render() {
		return (
			<g className="axis" ref="axis" transform={this.props.translate}>
				{this.props.dates.map((d, i) => {
					return <circle className={styles.axisDot} r="2" cy="0" cx={this.props.scale(d)} />;
				})}
			</g>
		)
	}
}