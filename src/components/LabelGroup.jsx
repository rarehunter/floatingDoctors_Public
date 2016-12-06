import React from 'react';
import * as d3 from 'd3';
import Label from '../components/Label.jsx';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';
import Tooltip from '../components/Tooltip.jsx';

export default class LabelGroup extends React.Component {
	constructor() {
		super();
		this.state = {
			tooltip: {
				display: false,
				data: '',
				pos:{
					x: 0,
					y: 0
				}
			}
		}
		this.handleLabelInteraction = this.handleLabelInteraction.bind(this);
	}
	handleLabelInteraction(id, state) {
		if (state === 1) {
			this.props.data && (this.props.type === 'community') && this.props.data.map((d, i) => {
				if (d.id === id) {
					this.setState({
						tooltip:{
							display: true,
							data: d.full_name,
							pos: {
								x: this.props.x + (Meta.LABEL_DX_L + Meta.LABEL_DX * i),
								y: this.props.y
							}
						}
					});
				}
			})
		} else {
			this.props.data && this.props.data.map((d, i) => {
				if (d.id === id) {
					this.setState({
						tooltip:{
							display: false,
							data: ''
						}
					});
				}
			})
		}
		this.props.onLabelInteraction(
			this.props.type,
			id,
			state
		);
	}
	render() {
		const shiftX = () => {
			if (this.props.textAnchor === "start") {
				return this.props.x - Meta.BAR_MARGIN;
			} else {
				return this.props.x + Meta.BAR_MARGIN;
			}
		}

		const barScale = (props) => {
			return d3.scaleLinear()
				.domain([0, d3.max(props.data, (d) => d.count)])
				.range([0, Meta.MAX_BAR_SIZE]);
		}

		return (
			<g>
				<text className={styles.labelTitle} textAnchor={this.props.textAnchor} x={this.props.x} y={this.props.y}>
					{this.props.title}
				</text>
				{this.props.data && this.props.data.map((d, i) => {
					return (
						(this.props.direction === "v") ? (
							<Label
								id={d.id}
								state={d.state}
								type={this.props.type}
								x={this.props.x} y={this.props.y + (Meta.LABEL_DY_L + Meta.LABEL_DY * i)}
								barX = {shiftX()}
								barY = {this.props.y + (Meta.LABEL_DY_L + Meta.LABEL_DY * i - 8)}
								barHeight={Meta.BAR_SIZE}
								barWidth={barScale(this.props)(d.count)}
								textAnchor={this.props.textAnchor}
								onLabelInteraction={this.handleLabelInteraction}
								value = {d.name}
								direction="h"
							/>
						) : (
							<Label
								id={d.id}
								state={d.state}
								type={this.props.type}
								x={this.props.x + (Meta.LABEL_DX_L + Meta.LABEL_DX * i)} y={this.props.y}
								barX = {this.props.x + (Meta.LABEL_DX_L + Meta.LABEL_DX * i + 6)}
								barY = {this.props.y + Meta.BAR_MARGIN}
								barHeight={barScale(this.props)(d.count)}
								barWidth={Meta.BAR_SIZE}
								textAnchor={this.props.textAnchor}
								onLabelInteraction={this.handleLabelInteraction}
								onUserInput={this.props.onUserInput}
								value = {d.name}
								direction="v"
							/>
						)
					);
				})}
				<Tooltip tooltip={this.state.tooltip} />
			</g>
		);
	}
}
