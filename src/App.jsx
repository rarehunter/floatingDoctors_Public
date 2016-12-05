import './css/main.css';
import React, { Component } from 'react';
import MainView from './MainView.jsx';
import MultiviewDialog from './MultiviewDialog.jsx';
import PatientDetailsDialog from './PatientDetailsDialog.jsx';
import dataManager from './helper/dataManager.jsx';


export default class App extends Component {
    render() {
        const offsets = document.getElementById('root').getBoundingClientRect();
        const top = offsets.top;
        const left = offsets.left;

        // Data manager testing
        // var startTime = new Date('2014', '01', '01');
        // const dm = new dataManager(startTime);
        // var endTime = new Date('2015', '01', '01');
        // var visited = 20;

        // const visitedDate = dm.getVisits(160, endTime);
        // const diagRecords = dm.getRecords('diagnosis', 'Abcess');
        // const allRecrods = dm.getAllRecords();
        // const communities = dm.getCommunities();
        
        return (
            <div>
                <MainView y={top} x={left}/>
              </div>
        );
    }
}
