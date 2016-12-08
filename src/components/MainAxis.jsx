import React from 'react';
import * as d3 from 'd3';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';
import Tooltip from '../components/Tooltip.jsx';
import AxisDot from '../components/AxisDot.jsx';
import ReactTransitionGroup from 'react-addons-transition-group';

export default class MainAxis extends React.Component {
	constructor() {
        super();
        this.state = {
            scale: 1,
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
        this.handleDotInteraction = this.handleDotInteraction.bind(this);
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
					x: 0,
					y: 0,
				},
				offsetX: offsetX,
				offsetY: offsetY,
			}
		});
	}
    handleDotInteraction(i, state) {
		const offsetX = this.state.tooltip.offsetX;
		const offsetY = this.state.tooltip.offsetY;

		if (this.props.dates && this.props.tooltip) {
			const data = this.props.dates[i];

			const x = this.props.scale(data) + offsetX;
			const y = offsetY;


			if (state === 1) {
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
			} else {
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
			
		}
	}
	render() {
	
		return (
			<g className="axis" ref="axis" transform={this.props.translate}>
				{this.props.dates.map((d, i) => {
					return <AxisDot 
						key={`dot_${d}`}
						i={i}
						className={styles.axisDot} 
						onDotInteraction = {this.handleDotInteraction}
						r={parseInt(Meta.SquareSize())/2} 
						y="0" 
						x={this.props.scale(d)} />;
				})}
				<ReactTransitionGroup component='g'>
					<Tooltip key="tooltip"  tooltip={this.state.tooltip} />
				</ReactTransitionGroup>
			</g>
		)
	}
}