import React from 'react';
import Label from '../components/Label.jsx';
import styles from '../css/main.css';

export default class LabelGroup extends React.Component {

	render() {
		return (
			<text className={styles.labelTitle} x={this.props.x} y={this.props.y}>
				{this.props.title}
				{this.props.labels && this.props.labels.map((l, i) => {
					return (
						(i === 0) ? (
							<Label key={i} value={l} x="0" dy="32"/>
						) : (
							<Label key={i} value={l} x="0" dy="20"/>
						)
					);
				})}
			</text>
		);
	}
}