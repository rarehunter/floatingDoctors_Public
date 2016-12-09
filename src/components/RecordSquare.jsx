import React from 'react';
import styles from '../css/main.css';
import * as Meta from '../Metadata.jsx';
import PatientDetailsDialog from '../PatientDetailsDialog.jsx';


const recordFemaleStyle = {
    fill: Meta.RECORD_SQUARE_FEMALE,
    opacity: 0.2
};

const recordFemaleStyleHighlighted = {
    fill: Meta.RECORD_SQUARE_FEMALE,
    opacity: 1
};

const recordMaleStyle = {
    fill: Meta.RECORD_SQUARE_MALE,
    opacity: 0.2
};

const recordMaleStyleHighlighted = {
    fill: Meta.RECORD_SQUARE_MALE,
    opacity: 1
};

const recordDefaultStyle = {
    fill: Meta.RECORD_SQUARE_DEFAULT,
    opacity: 0.2
}

const recordDefaultStyleHighlighted = {
    fill: Meta.RECORD_SQUARE_DEFAULT,
    opacity: 1
}

export default class RecordSquare extends React.Component {
    constructor() {
        super();
        this.state = {
            scale: 1.0,
        }
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.checkSquareState = this.checkSquareState.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleMouseOver() {
        if (this.props.isFiltering) {
            if(this.props.record.state===1) {
                this.setState({
                    scale: 1.8,
                });
            }
        } else {
            this.setState({
                scale: 1.8,
            });
            this.props.onUserHover(this.props.record, 1);
        }  
    }
    handleMouseOut() {
        this.setState({
            scale: 1.0,
        });
        if (this.props.isFiltering) {
         
        } else {
            
            if(!this.props.isDialogActive)
            {
                this.props.onUserHover(this.props.record, 0);
            }
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

    checkSquareStyle() {
        let style = {};

        if (this.props.record.state == 0) {
            style = recordDefaultStyle;
            if(this.props.record.gender.toUpperCase() == 'M'){ style = recordMaleStyle; }
            if(this.props.record.gender.toUpperCase() == 'F'){ style = recordFemaleStyle; }
        } else {
            style = recordDefaultStyleHighlighted;
            if(this.props.record.gender.toUpperCase() == 'M') { style = recordMaleStyleHighlighted; }
            if(this.props.record.gender.toUpperCase() == 'F') { style = recordFemaleStyleHighlighted; }
        }
        return style;
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
                className={`${styles.recordSquare}`}
                style={this.checkSquareStyle()}
                onMouseOver = {this.handleMouseOver}
                onMouseOut = {this.handleMouseOut}
                onClick = {this.handleOnClick}
            />
        );
    }
}
