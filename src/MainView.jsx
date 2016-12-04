import React from 'react';
import styles from './css/main.css';
import MainViewLayout from './MainViewLayout.jsx';
import LabelGroup from './components/LabelGroup.jsx';
import MainChart from './components/MainChart.jsx';
import LinkGroup from './components/LinkGroup.jsx';
import MultiviewDialog from './MultiviewDialog.jsx';
import * as Meta from './Metadata.jsx';
import * as Helper from './Helper.jsx';
import DataManager from './helper/dataManager.jsx';
import * as d3 from 'd3';

const PADDING = 32;
const PANE_SPAN = 12;
const PANE_LEFT_SPAN = 2;
const PANEL_CENTER_SPAN = 8;
const PANEL_RIGHT_SPAN = 2;

// Dummy data
const labelGroupData1 = [
    "Worms",
    "Prolapse",
    "Schizophremia",
    "Prostatitis",
    "Renal Colic"
];

// var diagnosisData = [
//  {"id":0, "name":"Worms", "state":0},
//  {"id":1, "name":"Prolapse", "state":0},
//  {"id":2, "name":"Schizophremia", "state":0},
//  {"id":3, "name":"Prostatitis", "state":0},
//  {"id":4, "name":"Renal", "state":0},
// ];

// const communityData = [
//  {"name": "BG", "full_name":"BAHIA GRANDE", "state":0, "count": 25},
//  {"name": "BH", "full_name":"BAHIA HONDA", "state":0, "count": 15},
//  {"name": "BC", "full_name":"BAJO CEDRO", "state":0, "count": 35},
//  {"name": "BE", "full_name":"BUENA ESPERANZA", "state":0, "count": 45},
//  {"name": "CB", "full_name":"CERRO BRUJO", "state":0, "count": 5},
// ];

const startTime = Meta.DEFAULT_START_TIME.getTime();
const endTime = Meta.DEFAULT_END_TIME.getTime();
var records;
var visitedDate;
var diagnosisData;
var communityData;
var treatmentData;
var waterSourceData;
var banoData;
var dataManager;


export default class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight,
			activeRecord: '',
			activeLabel: '',
			multiViewShowing: false,
			communityShowing: '',
			selectedRecord: '',
			selectedLabels: [],
			records: [],
            visitedDate: [],
			communities: [],
			diagnosis: [],
			treatments: [],
			waterSources: [],
			bano: [],
			lines: [],
		};
		this.handleUserClick = this.handleUserClick.bind(this);
		this.handleLabelInteraction = this.handleLabelInteraction.bind(this);
		this.handleRecordInteraction = this.handleRecordInteraction.bind(this);
	}

    componentWillmount(){
        console.log("Component will mount");

    }

    componentDidMount() {
        const height = this.state.height - this.props.y;
        dataManager = new DataManager(Meta.DEFAULT_END_TIME);
        var that = this;
        dataManager.getVisits(function(visitedDate){

            dataManager.getVisitedRecords(function(data){
                visitedDate = dataManager.visitedDate;
                records = dataManager.records;
                diagnosisData = dataManager.diagnosisData;
                communityData = dataManager.communityData;
                treatmentData = dataManager.treatmentData;
                waterSourceData = dataManager.waterSourceData;
                banoData = dataManager.banoData;

                // Change state
                that.setState({
                    records: records,
                    height: height,
                    diagnosis: diagnosisData,
                    communities: communityData,
                    treatments: treatmentData,
                    waterSources: waterSourceData,
                    bano: banoData,
                    visitedDate: visitedDate
                });


            });
        });
        window.addEventListener("resize", this.updateSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSize);
    }

    updateSize() {
        console.log("Window resized");
        // this.setState({
        //  width: window.innerWidth,
        //  height: window.innerHeight
        // });
    }

	updateRecords() {
		const records = this.state.records.slice();
		this.setState({
			records: records
		});
	}


	filterRecords(record) {
		if (this.state.activeLabel !== '') {
			if (this.state.activeLabel.category === 'diagnosis') {
				record.diagnosis.find(r => {
					return r === this.state.activeLabel.value;
				})
			} else {
				return true;
			}
		} else {
			return true;
		}
	}

	updateCommunities(updatedRecords, state) {
		const communities = this.state.communities.slice();
		if (state === 1) {
			communities.map(c => {
				c.count = 0;
			});
			updatedRecords.map(r => {
				const community = communities.find((c) => {
					return c.full_name === r.key;
				});
				if (community !== undefined) {
					community.state = state;
					community.count = r.value;
				}

			});

		}else if (state === 0) {
			communities.map((c,i) => {
				c.state = 0;
				c.count = communityData[i].count;
			});
		}
		// const communityRecords = d3.nest()
		// 	.key(function(d) {return d.community;})
		// 	.rollup(function(leaf) {return leaf.length;})
		// 	.entries(updatedRecords);

		// communityRecords.map(r => {
		// 	communities.map(c => {
		// 		if (c.full_name === r.key) {
		// 			c.state = state;
		// 			c.count = r.value;
		// 		}
		// 	})
		// });
		communities.sort((a,b) => {
			const countA = a.count;
			const countB = b.count;
			if (countA < countB) {
				return 1;
			}
			if (countA > countB) {
				return -1;
			}
			return 0;
		});
		this.setState({
			communities: communities
		});

	}

	updateDiagnosis() {
		const diagnosis = this.state.diagnosis.slice();
		this.setState({
			diagnosis: diagnosis
		});
	}

	updateTreatments() {
		const treatments = this.state.treatments.slice();
		this.setState({
			treatments: treatments
		});
	}

	updateWaterSources() {
		const waterSources = this.state.waterSources.slice();
		this.setState({
			waterSources: waterSources
		});
	}

	updateBano() {
		const bano = this.state.bano.slice();
		this.setState({
			bano: bano
		});
	}


	handleLabelInteraction(type, id, state) {
		let activeLabel = "";
		if (state === 1) {
			activeLabel = {'category':type, 'value':id}
		}
		if (type === "diagnosis") {
			const diagnosis = this.state.diagnosis.slice();
			diagnosis.map((d) => {
				if (d.id === id) {
					d.state = state;
				}
			});
			this.setState({
				diagnosis: diagnosis,
				activeLabel: activeLabel
			});
			// Todo
			/* Use dataManager
			const recordsByDiagnosis = DataManager.getRecordsByDiagnosis(id);
			*/
			const recordsByDiagnosis = [
				{
					"key":"BAJO CEDRO",
					"value":30
				},
				{
					"key":"BUENA ESPERANZA",
					"value":20
				}
			];
			this.updateCommunities(recordsByDiagnosis, state);
			// this.updateCommunities(this.state.records.filter(filterRecordsl), state);
		}
	}

    handleRecordInteraction(id, state) {
        const records = this.state.records.slice();
        records.map((r) => {
            if (r.id === id) r.state = state;
        });
        this.setState({
            records: records
        });
    }

	handleUserClick(multiViewShowing, communityShowing) {
		this.setState({
			multiViewShowing: multiViewShowing,
			communityShowing: communityShowing
	    });
	}

	render() {
		const { width, height } = this.state;
		const paneLeftX = 0;
		const paneLeftWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANE_LEFT_SPAN - Meta.PADDING;
		const paneCenterX = paneLeftWidth + Meta.PADDING;
		const paneCenterWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANEL_CENTER_SPAN;
		const paneRightX = paneLeftWidth + paneCenterWidth + Meta.PADDING * 2;
		const paneRightWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANEL_RIGHT_SPAN - Meta.PADDING;

		return (
			<div>
			   <MultiviewDialog isDialogActive={this.state.multiViewShowing} community={this.state.communityShowing} onHideModal={this.handleUserClick}/>

				<svg className={styles.svgWrapper} width={width} height={height} transform={`translate(${this.props.x}, ${this.props.y})`}>
					<MainViewLayout leftX={paneLeftX} centerX={paneCenterX} rightX={paneRightX}
						left = {[
							<LabelGroup key="0"
								type="diagnosis"
								direction='v'
								title="Diagnosis"
								textAnchor="end"
								data={this.state.diagnosis}
								onLabelInteraction={this.handleLabelInteraction}
								x={paneLeftWidth} y="0"/>,
							<LabelGroup key="1"
								type="watersources"
								direction='v'
								title="Water Sources"
								textAnchor="end"
								data={this.state.diagnosis}
								onLabelInteraction={this.handleLabelInteraction}
								x={paneLeftWidth} y={height/2}/>
						]}
						center = {[
							<MainChart key="0"
								data={this.state.records}
                                visitedDate={this.state.visitedDate}
								onRecordInteraction={this.handleRecordInteraction}
							/>,
							<LabelGroup key="1"
								type="community"
								direction='h'
								title="Community"
								data={this.state.communities}
								onLabelInteraction={this.handleLabelInteraction}
								onUserInput={this.handleUserClick}
								x="0" y={Meta.MainChartHeight() + Meta.PADDING}/>
						]}
						right = {[
							<LabelGroup key="0"
								type="treatment"
								direction='v'
								title="Treatment"
								textAnchor="start"
								data={this.state.diagnosis}
								onLabelInteraction={this.handleLabelInteraction}
								x="0" y="0"/>,
							<LabelGroup key="1"
								type="bano"
								direction='v'
								title="Bano"
								x="0"
								data={this.state.diagnosis}
								textAnchor="start"
								onLabelInteraction={this.handleLabelInteraction}
								x="0" y={height/2}/>
						]}
					/>
					<LinkGroup />
				</svg>
			</div>
		);
	}
}


