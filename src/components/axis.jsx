import React from 'react';
import * as d3 from 'd3';

export default class Axis extends React.Component {
	componentDidMount() {
		console.log("Did mount");
		this.renderAxis();
	}

	componentDidUpdate() {
		this.renderAxis();
	}

	renderAxis() {
		var node = this.refs.axis;
		if (this.props.orient === 'left') {
			var axis = d3.axisLeft().ticks(5).scale(this.props.scale);
		} else {
			var axis = d3.axisBottom().ticks(5).scale(this.props.scale);
		}
		
		d3.select(node).call(axis);
	}

	render() {
		return <g className="axis" ref="axis" transform={this.props.translate}></g>
	}
}