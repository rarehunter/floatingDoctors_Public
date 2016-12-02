import React from 'react';
import Label from '../components/Label.jsx';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';
import Bar from '../components/Bar.jsx';

export default class LabelGroup extends React.Component {
	constructor() {
		super();
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
		const shiftX = () => {
			if (this.props.textAnchor === "start") {
				return Meta.BAR_SIZE * 12; 
			} else {
				return 0;
			}
		}
		return (
			<g>
				<text className={styles.labelTitle} textAnchor={this.props.textAnchor} x={this.props.x} y={this.props.y}>
					{this.props.title}
					{this.props.data && this.props.data.map((d, i) => {
						return (
							(this.props.direction === "v") ? (
								(i === 0) ? (
									<Label key={d.id}
										id={d.id}
										value={d.name}
										x={this.props.x}
										state={d.state}
										onLabelInteraction={this.handleLabelInteraction}
										dy={Meta.LABEL_DY_L}/>
								) : (
									<Label key={d.id}
										id={d.id}
										value={d.name}
										x={this.props.x}
										state={d.state}
										onLabelInteraction={this.handleLabelInteraction}
										dy={Meta.LABEL_DY}/>
								)
							) : (

								<Label key={d.id}
									id={d.id}
									value={d.name}
									y={this.props.y}
									state={d.state}
									onLabelInteraction={this.handleLabelInteraction}
									onUserInput={this.props.onUserInput}
									dx={Meta.LABEL_DX}/>
							)

						);
					})}
				</text>
				<g>
				{this.props.data && this.props.data.map((d, i) => {
					return (
						(this.props.direction === "v") ? (
							(i === 0) ? (
								<Bar
									state={d.state}
									x={this.props.x - shiftX()}
									y={this.props.y+Meta.LABEL_DY_L - 7}
									height={Meta.BAR_SIZE}
									width={Meta.BAR_SIZE * 12} />
							) : (
								<Bar
									state={d.state}
									x={this.props.x - shiftX()}
									y={this.props.y + (Meta.LABEL_DY * i + Meta.LABEL_DY_L - 7)} 
									height={Meta.BAR_SIZE}
									width={Meta.BAR_SIZE * 12} />
							)
						) : (
							<Bar
								state={d.state}
								y={this.props.y}
								x={this.props.x + Meta.LABEL_DX * (i+1)}
								height={Meta.BAR_SIZE * 12}
								width={Meta.BAR_SIZE} />
						)
					)
				})}
				</g>
			</g>
		);
	}
}
