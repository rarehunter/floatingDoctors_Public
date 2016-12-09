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
		} else if (state === 3) {
			classy = `${styles.label} ${styles.highlighted}`;
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
		} else if (state === 3) {
			classy += ` ${styles.circle} ${styles.show}`;
		} else {
			classy += ` ${styles.circle} ${styles.hide}`;
		}
		return classy;
	}

	handleMouseOver() {
		if (this.props.isFiltering) {

		} else {
			this.props.onLabelInteraction(
				this.props.id,
				1,
				false
			);
		}
	}

	handleMouseOut() {
		if (this.props.isFiltering) {

		} else if(!this.props.isDialogActive) {
			this.props.onLabelInteraction(
				this.props.id,
				0
			);
		}
	}

	handleClick(e) {
		if(e.shiftKey) {
			if (this.props.isFiltering) {
				this.props.onLabelInteraction(
					this.props.id,
					0,
					false
				);
			} else {
				this.props.onLabelInteraction(
					this.props.id,
					1, 
					true 
				);
			}
		} else {
			if(this.props.isFiltering) {
				if (this.props.activeLabel !== '' && this.props.activeLabel.type !== this.props.type) {
					if (this.props.state === 3) {
						this.props.onFilterUpdate(this.props.type, this.props.fullName, false);
					} else {
					    this.props.onFilterUpdate(this.props.type, this.props.fullName, true);
					}
				}
			} else {
				this.props.onUserInput(true, this.props.value, this.props.type);
			}
		}
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
