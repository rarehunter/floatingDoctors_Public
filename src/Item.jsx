import React from 'react';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (<h4>In Item.</h4>)
        // var records = this.props.records.map((key) => {
        //     return (
        //         <h4> {key} </h4>
        //     );
        // });
    }
}