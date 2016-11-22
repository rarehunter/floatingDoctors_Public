import './css/main.css';
import React, { Component } from 'react';
import MainView from './MainView.jsx';
import Records from './Records.jsx';
import MultiviewDialog from './MultiviewDialog.jsx';
import PatientDetailsDialog from './PatientDetailsDialog.jsx';

export default class App extends Component {
  render() {
  	const offsets = document.getElementById('root').getBoundingClientRect();
	const top = offsets.top;
	const left = offsets.left;
    return ([
      	<MainView y={top} x={left}/>,
        <MultiviewDialog />,
        <br />,
        <PatientDetailsDialog />,
    ]);
  }
