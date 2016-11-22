import './css/main.css';
import React, { Component } from 'react';
import MainView from './MainView.jsx';


export default class App extends Component {
	
	render() {
		const offsets = document.getElementById('root').getBoundingClientRect();
		const top = offsets.top;
		const left = offsets.left;
		return (
			<MainView y={top} x={left}/>
		);
	}
}

