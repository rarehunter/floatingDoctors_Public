import React from 'react';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';
import PatientDetailsDialog from '../PatientDetailsDialog.jsx';


export default class RecordSquare extends React.Component {
    constructor() {
        super();
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.checkSquareState = this.checkSquareState.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleMouseOver() {
        this.props.onUserHover(this.props.record, 1);
    }
    handleMouseOut() {
        if(!this.props.isDialogActive)
        {
            this.props.onUserHover(this.props.record, 0);
        }
    }
    handleOnClick(){
        this.props.onUserInput(true, this.props.record, 1);
    }

    checkSquareState()
    {
        let scale = 1;
        if(this.props.record.state == 1) { scale = 1.2; }
        return scale;
    }

    checkSquareClass() {
        let classy = "";
        if (this.props.record.state == 0) {
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
                transform={`translate(${translateX}, ${translateY}) scale(${this.checkSquareState()}) translate(${-translateX}, ${-translateY})`}
                className={this.checkSquareClass()}
                onMouseOver = {this.handleMouseOver}
                onMouseOut = {this.handleMouseOut}
                onClick = {this.handleOnClick}
            />
        );
    }
}
