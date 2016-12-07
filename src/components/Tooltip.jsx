import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';

export default class Tooltip extends React.Component {
	constructor() {
		super();
        this.state= {
            x: 20,
            y: 20,
            visibility: "hidden",
        };
	}

    componentDidMount() {
       // this.setState({
        //     x: this.props.tooltip.pos.x,
        //     y: this.props.tooltip.pos.y,
        // });
    }
   
    componentWillReceiveProps(nextProps) {
        if (this.props.tooltip.data !== nextProps.tooltip.data && this.props.tooltip.display !== nextProps.tooltip.display) {
            const el = ReactDOM.findDOMNode(this);
            if (nextProps.tooltip.display === true) {
                this.setState({
                    visibility: "visibile",
                });
                TweenMax.fromTo(el, 0.4, {opacity: 0}, {opacity: 1});
            } else {
                TweenMax.fromTo(el, 0.4, {opacity: 1}, {opacity: 0});
            }
        }
    }
	render() {
		return (
			<g transform={`translate(${this.props.tooltip.pos.x},${this.props.tooltip.pos.y})`} className={styles.tooltip} visibility={this.state.visibility}>
                <text textAnchor="middle">
                   {this.props.tooltip.data}
                </text>
            </g>
		);
	}
}