import React from 'react';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';

export default class AxisDot extends React.Component {
	constructor() {
        super();
        this.state = {
            scale: 1
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.checkDotState = this.checkDotState.bind(this);
    }

    handleMouseOver() {
        this.setState({
            scale: 1.5
        });
        this.props.onDotInteraction(this.props.i, 1);
    }
    handleMouseOut() {
        this.setState({
            scale: 1
        });
        this.props.onDotInteraction(this.props.i, 0);
    }
    checkDotState() {
        let classy = "";
        if (this.state.scale === 1) {
            classy = `${styles.axisDot}`;
        } else {
            classy = `${styles.axisDot} ${styles.highlighted}`;
        }
        return classy;
    }
    render() {
        const translateX = this.props.x;
        const translateY = this.props.y;
        return (
            <circle 
                r={this.props.r} 
                cx={this.props.x} 
                cy={this.props.y}
                transform={`translate(${translateX}, ${translateY}) scale(${this.state.scale}) translate(${-translateX}, ${-translateY})`}
                className={this.checkDotState()}
                onMouseOver = {this.handleMouseOver}
                onMouseOut = {this.handleMouseOut}
            />
        );
    }


}