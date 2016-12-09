import React from 'react';
import * as d3 from 'd3';
import Label from '../components/Label.jsx';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';
import Tooltip from '../components/Tooltip.jsx';
import ReactTransitionGroup from 'react-addons-transition-group';

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
				},
				offsetX: 0,
				offsetY: 0,
			},
		};
		this.handleLabelInteraction = this.handleLabelInteraction.bind(this);
		this.getTooltip = this.getTooltip.bind(this);
	}
	componentDidMount() {
		let offsetX = 0;
		let offsetY = 0;
		if (this.props.tooltipPos === "bottom") {
			offsetY = parseInt(Meta.TOOLTIP_OFFSET_V);
		} else if (this.props.tooltipPos === "top") {
			offsetY -= parseInt(Meta.TOOLTIP_OFFSET_V);
		} else if (this.props.tooltipPos === "left") {
			offsetX -= parseInt(Meta.TOOLTIP_OFFSET_H);
		} else if (this.props.tooltipPos === "right") {
			offsetX = parseInt(Meta.TOOLTIP_OFFSET_H);
		} else {
			offsetY -= parseInt(Meta.TOOLTIP_OFFSET_V); // default = top
		}
		this.setState({
			tooltip: {
				display: false,
				data: '',
				pos:{
					x: this.props.x,
					y: this.props.y,
				},
				offsetX: offsetX,
				offsetY: offsetY,
			}
		});
	}
	handleLabelInteraction(id, state, toFilter) {
		const offsetX = this.state.tooltip.offsetX;
		const offsetY = this.state.tooltip.offsetY;

		let x = 0;
		let y = 0;
		
		if (state === 1) {
			this.props.data && this.props.tooltip && this.props.data.map((d, i) => {
				let data = "";
				if(this.props.type === "community") {
					data = d.full_name;
				} else {
					data = d.count;
				}
				if (this.props.direction === "v") {
					x = parseInt(this.props.x)  + this.state.tooltip.offsetX;
					y = parseInt(this.props.y) + (parseInt(Meta.LABEL_DY_L) + parseInt(Meta.LABEL_DY) * i) + this.state.tooltip.offsetY;
				} else {
					x = parseInt(this.props.x) + (parseInt(Meta.LABEL_DX_L) + parseInt(Meta.LABEL_DX) * i) + this.state.tooltip.offsetX;
					y = parseInt(this.props.y) +  + this.state.tooltip.offsetY;
				}
				if (d.id === id) {
					this.setState({
						tooltip:{
							display: true,
							data: data,
							pos: {
								x: x,
								y: y,
							},
							offsetX: offsetX,
							offsetY: offsetY,
						}
					});
				}
			})
		} else {
			this.props.data && this.props.tooltip && this.props.data.map((d, i) => {
				if (this.props.direction === "v") {
					x = parseInt(this.props.x)  + this.state.tooltip.offsetX;
					y = parseInt(this.props.y) + (parseInt(Meta.LABEL_DY_L) + parseInt(Meta.LABEL_DY) * i) + this.state.tooltip.offsetY;
				} else {
					x = parseInt(this.props.x) + (parseInt(Meta.LABEL_DX_L) + parseInt(Meta.LABEL_DX) * i) + this.state.tooltip.offsetX;
					y = parseInt(this.props.y)  + this.state.tooltip.offsetY;
				}
				if (d.id === id) {
					this.setState({
						tooltip:{
							display: false,
							data: '',
							pos: {
								x: x,
								y: y,
							},
							offsetX: offsetX,
							offsetY: offsetY,
						}
					});
				}
			})
		}
		this.props.onLabelInteraction(
			this.props.type,
			id,
			state,
			toFilter
		);
	}

	getTooltip() {

		if (this.props.tooltip !== "true") {
			return "";
		} else {
			return <Tooltip key="tooltip"  tooltip={this.state.tooltip} />;
		}
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
				<ReactTransitionGroup component='g'>
				{this.props.data && this.props.data.map((d, i) => {
					return (
						(this.props.direction === "v") ? (
							<Label
								key={`${this.props.type}_${d.name}`}
								i = {i}
								id={d.id}
								isDialogActive={this.props.isDialogActive}
								state={d.state}
								type={this.props.type}
								x={this.props.x} y={this.props.y + (Meta.LABEL_DY_L + Meta.LABEL_DY * i)}
								barX = {shiftX()-this.props.x}
								barY = "-8"
								barHeight={Meta.BAR_SIZE}
								barWidth={barScale(this.props)(d.count)}
								textAnchor={this.props.textAnchor}
								onLabelInteraction={this.handleLabelInteraction}
								groupRecords={this.props.groupRecords}
								onUserInput={this.props.onUserInput}
								value = {d.name}
								direction="h"
								isFiltering={this.props.isFiltering}
								activeLabel={this.props.activeLabel}
								onFilterUpdate={this.props.onFilterUpdate}
							/>
						) : (
							<Label
								key={`${this.props.type}_${d.name}`}
								i = {i}
								id={d.id}
								isDialogActive={this.props.isDialogActive}
								state={d.state}
								type={this.props.type}
								x={this.props.x + (Meta.LABEL_DX_L + Meta.LABEL_DX * i)} y={this.props.y}
								barX = "6"
								barY = {Meta.BAR_MARGIN}
								barHeight={barScale(this.props)(d.count)}
								barWidth={Meta.BAR_SIZE}
								textAnchor={this.props.textAnchor}
								onLabelInteraction={this.handleLabelInteraction}
								groupRecords={this.state.groupRecords}
								onUserInput={this.props.onUserInput}
								value = {d.name}
								direction="v"
								isFiltering={this.props.isFiltering}
								activeLabel={this.props.activeLabel}
								onFilterUpdate={this.props.onFilterUpdate}
							/>
						)
					);
				})}
				{this.getTooltip()}
				</ReactTransitionGroup>
			</g>
		);
	}
}
