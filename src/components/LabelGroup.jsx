import React from 'react';
import Label from '../components/Label.jsx';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';

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
		return (
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
								dx={Meta.LABEL_DX}/>
						)
					);
				})}
			</text>
		);
	}
}