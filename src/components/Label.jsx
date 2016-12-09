import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/main.css';
import MultiviewDialog from '../MultiviewDialog.jsx';
import * as d3 from 'd3';
import ReactTransitionGroup from 'react-addons-transition-group';

const transition = d3.transition()
                   .duration(750)
                   .ease(d3.easeCubic);
export default class Label extends React.Component {
	constructor() {
		super();
		this.state = {
			type: '',
			value: '',
			direction: '',
			textAnchor: '',
			opacity: 1e-6,
			x: 0,
			y: 0,
			barWidth: 0,
		};
		this.checkLabelState = this.checkLabelState.bind(this);
		this.checkBarState = this.checkBarState.bind(this);
		this.checkBarSize = this.checkBarSize.bind(this);
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	
	componentDidMount() {
		this.setState({
			type: this.props.type,
			value: this.props.value,
			textAnchor: this.props.textAnchor,
			direction: this.props.direction,
			x: this.props.x,
       		y: this.props.y,
		});
	}

	componentWillEnter(callback) {
       const el = ReactDOM.findDOMNode(this);
       this.setState({
       		x: this.props.x,
       		y: this.props.y,
       });
       TweenMax.fromTo(el, 0.6, {opacity: 0}, {opacity: 1, onComplete: callback});
    }

    componentWillLeave(callback) {
       const el = ReactDOM.findDOMNode(this);
       TweenMax.fromTo(el, 0.3, {opacity: 1}, {opacity: 0, onComplete: callback});
    }

    componentWillReceiveProps(nextProps) {
    	if (this.props.i != nextProps.i) {
            const el = ReactDOM.findDOMNode(this);
            TweenMax.fromTo(el, 0.6, {x: this.props.x, y: this.props.y}, {x: nextProps.x, y: nextProps.y});
        }
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

	checkBarSize() {
		const state = this.props.state;
		if (state === 1) {
			return this.props.barWidth;
		} else {
			return 0;
		}
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
				0,
				false
			);
		}
	}


	handleClick(e) {
		console.log("isDialogActive: ", this.props.isDialogActive);
		console.log("isFiltering: ", this.props.isFiltering);
		// when dialog is active
		if(this.props.isDialogActive)
		{
			console.log("this.props.activeLabel: ", this.props.activeLabel);
			console.log("this.props.activeLabel.type: ", this.props.activeLabel.type);
			console.log("this.props.type", this.props.type);
			if(this.props.activeLabel !== '' && this.props.activeLabel.type != this.props.type)
			{
				if(this.props.state == 1)
				{
					this.props.onUserInput(true, this.props.value, this.props.type, false);
				}
				else
				{
					this.props.onUserInput(true, this.props.value, this.props.type, true);
				}
			}
		}
		else
		{
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
						1, //enter filtering mode
						true
					);
				}
			} else {
				if(this.props.isFiltering) {
					if (this.props.activeLabel !== '' && this.props.activeLabel.type !== this.props.type) {
						if (this.props.state === 1) {
							this.props.onFilterUpdate(this.props.type, this.state.value, false);
						} else {
						    this.props.onFilterUpdate(this.props.type, this.state.value, true);
						}
					}
				} else {
					this.props.onUserInput(true, this.props.value, this.props.type, true);
					this.props.onLabelInteraction(
						this.props.id,
						1, //enter filtering mode
						true
					);
				}
			}

		}
		
	}

	render() {

		return (
			(this.state.direction === "h") ? (
				<g transform={`translate(${this.state.x},${this.state.y})`}>
					<text
						className={this.checkLabelState()}
						// x={this.props.x} y={this.props.y}
						x="0" y="0"
						textAnchor={this.state.textAnchor}
						onMouseOver={this.handleMouseOver}
						onMouseOut ={this.handleMouseOut}
						onClick={this.handleClick}
						>
						{this.state.value}
					</text>
					<g transform={(this.state.textAnchor==="start")?(`translate(${this.props.barX},${parseInt(this.props.barY)+2}) rotate(180) translate(${-this.props.barX},${-this.props.barY-2})`):("")}>
						<rect
							className={this.checkBarState(this.state.textAnchor, this.state.direction)}
							x={this.props.barX}
							y={this.props.barY}
							height={this.props.barHeight}
							width={this.props.barWidth}
						>
						</rect>
					</g>
				</g>
			) : (
				<g transform={`translate(${this.state.x},${this.state.y})`}>
					<text
						className={this.checkLabelState()}
						x="0" y="0"
						textAnchor={this.state.textAnchor}
						onMouseOver={this.handleMouseOver}
						onMouseOut ={this.handleMouseOut}
						onClick={this.handleClick}
						>
						{this.state.value}
					</text>
					<rect
						className={this.checkBarState(this.state.textAnchor, this.state.direction)}
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
