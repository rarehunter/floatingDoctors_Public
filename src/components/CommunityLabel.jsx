import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/main.css';
import MultiviewDialog from '../MultiviewDialog.jsx';
import * as d3 from 'd3';
import ReactTransitionGroup from 'react-addons-transition-group';

const transition = d3.transition()
                   .duration(750)
                   .ease(d3.easeCubic);
export default class CommunityLabel extends React.Component {
	constructor() {
		super();
		this.checkLabelState = this.checkLabelState.bind(this);
		this.checkLabelValue = this.checkLabelValue.bind(this);
		this.checkCircleState = this.checkCircleState.bind(this);
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	checkLabelState() {
		const state = this.props.state;
		let classy = "";
		if (state === 1) {
			classy = `${styles.label} ${styles.highlighted}`;
		} else if (state === 2) {
			classy = `${styles.label}`;
		} else {
			classy = `${styles.label}`;
		}
		return classy;
	}

	checkLabelValue() {
		const state = this.props.state;
		let value = "";
		if (state === 1) {
			value = this.props.fullName;
		} else {
			value = this.props.value;
		}
		return value;
	}

	checkCircleState() {
		const state = this.props.state;
		let classy = "";
		
		if (state === 1) {
			classy += ` ${styles.circle} ${styles.hide}`;
		} else if (state === 2) {
			classy += ` ${styles.circle} ${styles.show}`;
		} else {
			classy += ` ${styles.circle} ${styles.hide}`;
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
		if(!this.props.isDialogActive)
		{
			this.props.onLabelInteraction(
				this.props.id,
				0
			);
		}
	}

	handleClick() {
		this.props.onUserInput(true, this.props.value, this.props.type);
	}

	render() {

		return (
			<g transform={`translate(${this.props.x},${this.props.y})`}>
				<circle
					className={this.checkCircleState()}
					cx="0"
					cy="-4"
					r={this.props.r/2}
				>
				</circle>
				<text
					className={this.checkLabelState()}
					x="0" y="0"
					textAnchor={this.props.textAnchor}
					onMouseOver={this.handleMouseOver}
					onMouseOut ={this.handleMouseOut}
					onClick={this.handleClick}
					>
					{this.checkLabelValue()}
				</text>
			</g>
		);
	}
}
