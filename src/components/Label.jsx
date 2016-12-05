import React from 'react';
import styles from '../css/main.css';
import MultiviewDialog from '../MultiviewDialog.jsx';

export default class Label extends React.Component {
	constructor() {
		super();
		this.state = {
			type: '',
		};
		this.checkLabelState = this.checkLabelState.bind(this);
		this.checkBarState = this.checkBarState.bind(this);
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.setState({
			type: this.props.type
		});
	}	

	componentDidUpdate() {

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

	checkBarState(textAnchor, direction) {
		const state = this.props.state;
		let classy = "";
		if (textAnchor === "start") {
			classy = styles.start;
		} else {
			classy = styles.end;
		}
		classy += " ";
		if (direction === "v") {
			classy += styles.vertical;
		} else {
			classy += styles.horizontal;
		}
		if (state === 1) {
			classy += ` ${styles.bar} ${styles.hide}`;
		} else if (state === 2) {
			classy += ` ${styles.bar} ${styles.show}`;
		} else {
			classy += ` ${styles.bar} ${styles.hide}`;
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

	handleClick() {
		this.props.onUserInput(true, this.props.value);
	}

	render() {
		return (
			(this.props.direction === "h") ? (
				<g>
					<text 
						className={this.checkLabelState()}
						x={this.props.x} y={this.props.y}
						textAnchor={this.props.textAnchor}
						onMouseOver={this.handleMouseOver}
						onMouseOut ={this.handleMouseOut}
						onClick={this.handleClick}
						>
						{this.props.value}
					</text>
					<g transform={(this.props.textAnchor==="start")?(`translate(${this.props.barX},${this.props.barY}) rotate(180) translate(${-this.props.barX},${-this.props.barY})`):("")}>
						<rect
							className={this.checkBarState(this.props.textAnchor, this.props.direction)}
							x={this.props.barX}
							y={this.props.barY}
							height={this.props.barHeight}
							width={this.props.barWidth}
						>
					</rect>
					</g>
				</g>
			) : (
				<g>
					<text 
						className={this.checkLabelState()}
						x={this.props.x} y={this.props.y}
						textAnchor={this.props.textAnchor}
						onMouseOver={this.handleMouseOver}
						onMouseOut ={this.handleMouseOut}
						onClick={this.handleClick}
						>
						{this.props.value}
					</text>
					<rect
						className={this.checkBarState(this.props.textAnchor, this.props.direction)}
						x={this.props.barX}
						y={this.props.barY}
						height={this.props.barHeight}
						width={this.props.barWidth}
					>
					</rect>
				</g>
			)
		);
	}
}
