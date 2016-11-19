import React from 'react';
import Rebase from 're-base';
import Item from './Item.jsx';

var base = Rebase.createClass({
    apiKey: "AIzaSyC7kqijvE-MYFjuvJarGXs8AC06zq0PFEo",
    authDomain: "floatdocadmin.firebaseapp.com",
    databaseURL: "https://floatdocadmin.firebaseio.com",
    storageBucket: "floatdocadmin.appspot.com",
    messagingSenderId: "487269857429"
});


// var database = firebase.database();

export default class Records extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    getRecords(){
        base.fetch('records', {
            context: this,
            asArray: true,
            queries: {
                limitToLast: 1
            }
        }).then(data => {
            this.setState({
                items: data
            })
            console.log(data);
        });
    }

    componentDidMount() {
        console.log("Did mount");
        base.fetch('records', {
            context: this,
            asArray: true,
            queries: {
                limitToLast: 3
            }
        }).then(data => {
            console.log(data);
        });
    }

    componentWillMount(){
        this.ref = base.bindToState('records',{
            context: this,
            state: 'records',
            asArray: true
        });
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    
    render(){
        return (<div><Item records={this.state.items}/></div>);
    }
}


