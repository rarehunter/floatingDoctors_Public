import React from 'react';
import * as d3 from 'd3';
import Label from '../components/CommunityLabel.jsx';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';
import ReactTransitionGroup from 'react-addons-transition-group';

export default class CommunityLabelGroup extends React.Component {
	constructor() {
		super();
		this.state = {
			pos: [],
		}
		this.handleLabelInteraction = this.handleLabelInteraction.bind(this);
	}

	handleLabelInteraction(id, state) {
		this.props.onLabelInteraction(
			this.props.type,
			id,
			state
		);
	}

	render() {
		
		// Use d3 scale to calculate the radius of the circle
		const circleScale = (props) => {
			return d3.scaleLinear()
				.domain([0, d3.max(props.data, (d) => d.count)])
				.range([0, Meta.MAX_BAR_SIZE]);
		}

		// Calculate the position Matrix
		const unitWidth = this.props.width / parseInt(Meta.LABEL_PER_ROW);
		let pos = [];
		for (var i = 0; i < this.props.data.length; i++) {
			const xn = i % parseInt(Meta.LABEL_PER_ROW);
			const yn = Math.floor(i / parseInt(Meta.LABEL_PER_ROW));
			pos.push({
				x: xn * unitWidth + unitWidth / 2 + this.props.x,
				y: (yn+1) * Meta.LABEL_ROW_OFFSET + this.props.y,
			});
		}

		return (
			<g>
				<text className={styles.labelTitle} textAnchor={this.props.textAnchor} x={this.props.x+this.props.width/2} y={this.props.y}>
					{this.props.title}
				</text>
				<ReactTransitionGroup component='g'>
				{this.props.data && this.props.data.map((d, i) => {
					return (
						<Label
							key={`${this.props.type}_${d.name}`}
							i = {i}
							id={d.id}
							state={d.state}
							type={this.props.type}
							x={pos[i].x} y={pos[i].y}
							r={circleScale(this.props)(d.count)}
							textAnchor={this.props.textAnchor}
							onLabelInteraction={this.handleLabelInteraction}
							onUserInput={this.props.onUserInput}
							value = {d.name}
							fullName = {d.full_name}
						/>
					);
				})}
				</ReactTransitionGroup>
			</g>
		);
	}
}
