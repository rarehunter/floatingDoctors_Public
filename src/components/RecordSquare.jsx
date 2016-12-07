import React from 'react';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';
import PatientDetailsDialog from '../PatientDetailsDialog.jsx';


export default class RecordSquare extends React.Component {
    constructor() {
        super();
        this.state = {
            scale: 1
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.checkSquareState = this.checkSquareState.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentWillEnter(callback) {
       const el = ReactDOM.findDOMNode(this);
       TweenMax.fromTo(el, 0.6, {x: this.props.x - Meta.SquareSize() / 2, y: this.props.y+20, opacity: 0}, {x: this.props.x - Meta.SquareSize() / 2, y: this.props.y, opacity: 1, onComplete: callback});
    }

    componentWillLeave(callback) {
       const el = ReactDOM.findDOMNode(this);
       TweenMax.fromTo(el, 0.3, {opacity: 1}, {opacity: 0, onComplete: callback});
    }

    componentWillReceiveProps(nextProps) {
    	if (this.props.i != nextProps.i) {
            const el = ReactDOM.findDOMNode(this);
            // console.log(el);
            TweenMax.fromTo(el, 0.6, {x: this.props.x - Meta.SquareSize() / 2, y: this.props.y}, {x: nextProps.x - Meta.SquareSize() / 2, y: nextProps.y});
        }
    }

    handleMouseOver() {
        this.setState({
            scale: 1.2
        });
        this.props.onUserHover(this.props.record, 1);
    }
    handleMouseOut() {
        this.setState({
            scale: 1
        });
        this.props.onUserHover(this.props.record, 0);
    }
    handleOnClick(){
        this.props.onUserInput(true, this.props.record);
    }
    checkSquareState() {
        let classy = "";
        if (this.state.scale === 1 && this.props.record.state == 0) {
            classy = `${styles.recordSquare}`;
        } else {
            classy = `${styles.recordSquare} ${styles.highlighted}`;
        }
        return classy;
    }
    render() {
        // console.log(this.props.record.state);
        const translateX = this.props.x;
        const translateY = this.props.y + Meta.SquareSize() / 2;
        return (
            <rect 
                width={Meta.SquareSize()} 
                height={Meta.SquareSize()} 
                x={this.props.x - Meta.SquareSize() / 2} 
                y={this.props.y}
                transform={`translate(${translateX}, ${translateY}) scale(${this.state.scale}) translate(${-translateX}, ${-translateY})`}
                className={this.checkSquareState()}
                onMouseOver = {this.handleMouseOver}
                onMouseOut = {this.handleMouseOut}
                onClick = {this.handleOnClick}
            />
        );
    }
}
