import React from 'react';
import styles from './css/main.css';
import MainViewLayout from './MainViewLayout.jsx';
import LabelGroup from './components/LabelGroup.jsx';
import MainChart from './components/MainChart.jsx';
import LinkGroup from './components/LinkGroup.jsx';
import MultiviewDialog from './MultiviewDialog.jsx';
import PatientDetailsDialog from './PatientDetailsDialog.jsx';
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
            patientDialogShowing: false,
            patientRecord: '',
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
        this.handlePatientClick = this.handlePatientClick.bind(this);
        this.handleLabelInteraction = this.handleLabelInteraction.bind(this);
        this.handleRecordInteraction = this.handleRecordInteraction.bind(this);
    }

    componentWillmount(){
        // console.log("Component will mount");

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
                    visitedDate: visitedDate,
                });

            });
        });
        window.addEventListener("resize", this.updateSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSize);
    }

    updateSize() {
        // console.log("Window resized");
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

	filterRecords(activeLabel) {
		return ((record) =>  {
			if (activeLabel === '') return true;

			let result = '';
			if (activeLabel.type === 'diagnosis') {
				const diagnosis = this.state.diagnosis.find(d => {
					return d.id === activeLabel.value;
				});

				record.diagnosis && (result = record.diagnosis.find(r => {
					return r === diagnosis.name;
				}));
			} else if (activeLabel.type === 'treatment') {
				const treatment = this.state.treatments.find(t => {
					return t.id === activeLabel.value;
				});
				record.treatment && (result = record.treatment.find(r => {
					return r === treatment.name;
				}));
			} else if (activeLabel.type === 'watersources') {
				const watersource = this.state.waterSources.find(w => {
					return w.id === activeLabel.value;
				});
				if (record.waterResource === watersource.name) {
					result = watersource.name;
				}

			} else if (activeLabel.type === 'bano') {
				const bano = this.state.bano.find(b => {
					return b.id === activeLabel.value;
				});
				if (record.bano === bano.name) {
					result = bano.name;
				}
			} else if (activeLabel.type === 'community') {

				const community = this.state.communities.find(c => {
					return c.id === activeLabel.value;
				});
				// console.log(community.name);
				if (record.consultLocation === community.full_name) {
					result = community.name;
				}
			}
			if (result === '' || result === undefined) {
				return false;
			} else {
				return true;
			}
		});
	}

	updateCommunities(updatedRecords, state) {
		// console.log(updatedRecords.length);
		const communities = this.state.communities.slice();
		communities.map(c => {
			c.count = 0;
			c.state = 0;
		});
		const communityRecords = d3.nest()
			.key(function(d) {return d.consultLocation;})
			.rollup(function(leaf) {return leaf.length;})
			.entries(updatedRecords);

		communityRecords.map(r => {
			communities.map(c => {
				if (c.full_name === r.key) {
					c.state = state;
					c.count = r.value;
				}
			})
		});

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

	updateDiagnosis(updatedRecords, state) {
		// console.log(updatedRecords.length);
		const diagnosis = this.state.diagnosis.slice();
		diagnosis.map(d => {
			d.count = 0;
			d.state = 0;
		});
		const diagnosisRecords = dataManager.getDiagnosis(updatedRecords);
		// console.log(diagnosisRecords);
		diagnosisRecords.map(r => {
			diagnosis.map(d => {
				if (d.name === r.name) {
					d.state = state;
					d.count = r.count;
				}
			})
		});

		diagnosis.sort((a,b) => {
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
			diagnosis: diagnosis
		});
	}

	updateTreatments(updatedRecords, state) {
		const treatments = this.state.treatments.slice();
		treatments.map(t => {
			t.count = 0;
			t.state = 0;
		});

		const treatmentsRecords = dataManager.getTreatments(updatedRecords);
		treatmentsRecords.map(r => {
			treatments.map(t => {
				if (t.name === r.name) {
					t.state = state;
					t.count = r.count;
				}
			})
		});

		treatments.sort((a,b) => {
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
			treatments: treatments
		});
	}

	updateWaterSources(updatedRecords, state) {
		const waterSources = this.state.waterSources.slice();
		waterSources.map(w => {
			w.count = 0;
			w.state = 0;
		});

		const waterSourcesRecords = dataManager.getWaterSources(updatedRecords);
		waterSourcesRecords.map(r => {
			waterSources.map(w => {
				if (w.name === r.name) {
					w.state = state;
					w.count = r.count;
				}
			})
		});

		waterSources.sort((a,b) => {
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
			waterSources: waterSources
		});
	}

	updateBano(updatedRecords, state) {
		const bano = this.state.bano.slice();
		bano.map(b => {
			b.count = 0;
			b.state = 0;
		});

		const banoRecords = dataManager.getbanoData(updatedRecords);
		banoRecords.map(r => {
			bano.map(b => {
				if (b.name === r.name) {
					b.state = state;
					b.count = r.count;
				}
			})
		});

		bano.sort((a,b) => {
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
			bano: bano
		});
	}

	handleLabelInteraction(type, id, state) {
		let activeLabel = "";
		let toState = 0;
		if (state === 1) {
			activeLabel = {'type':type, 'value':id};
			toState = 2;
		}
		if (type === "diagnosis") {
			const diagnosis = this.state.diagnosis.slice();
			const results = diagnosis.map((d, i) => {
				if (d.id === id) {
					d.state = state;
				}
				return d;
			});
			this.setState({
				diagnosis: results,
				activeLabel: activeLabel
			});
			this.updateCommunities(this.state.records.filter(this.filterRecords(activeLabel)), toState);
		}
		if (type === "treatment") {
			const treatments = this.state.treatments.slice();
			const results = treatments.map((t, i) => {
				if (t.id === id) {
					t.state = state;
				}
				return t;
			});
			this.setState({
				treatments: results,
				activeLabel: activeLabel
			});
			this.updateCommunities(this.state.records.filter(this.filterRecords(activeLabel)), toState);
		}
		if (type === "watersources") {
			const watersources = this.state.waterSources.slice();
			const results = watersources.map((w, i) => {
				if (w.id === id) {
					w.state = state;
				}
				return w;
			});
			this.setState({
				waterSources: results,
				activeLabel: activeLabel
			});
			this.updateCommunities(this.state.records.filter(this.filterRecords(activeLabel)), toState);
		}
		if (type === "bano") {
			const bano = this.state.bano.slice();
			const results = bano.map((b, i) => {
				if (b.id === id) {
					b.state = state;
				}
				return b;
			});
			this.setState({
				bano: results,
				activeLabel: activeLabel
			});
			this.updateCommunities(this.state.records.filter(this.filterRecords(activeLabel)), toState);
		}
		if (type === "community") {
			const communities = this.state.communities.slice();
			const results = communities.map((c, i) => {
				if (c.id === id) {
					c.state = state;
				}
				return c;
			});
			this.setState({
				communities: results,
				activeLabel: activeLabel
			});
			// this.updateCommunities(this.state.records.filter(this.filterRecords(activeLabel)), toState);
			this.updateDiagnosis(this.state.records.filter(this.filterRecords(activeLabel)), toState);
			this.updateTreatments(this.state.records.filter(this.filterRecords(activeLabel)), toState);
			this.updateWaterSources(this.state.records.filter(this.filterRecords(activeLabel)), toState);
			this.updateBano(this.state.records.filter(this.filterRecords(activeLabel)), toState);
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

		//Translate abbreviation to full community name
		var full_community_name;

		if(communityShowing == '')
		{
			full_community_name = '';
		}
		else
		{
			var dict_array = Object.entries(Meta.COMMUNITY_NAME_DICT);

			for (var i = 0; i < dict_array.length; i++)
			{
				if(dict_array[i][1] === communityShowing)
				{
					full_community_name = dict_array[i][0];
					break;
				}
			}
		}
		this.setState({
			multiViewShowing: multiViewShowing,
			communityShowing: full_community_name
	    });
	}

	handlePatientClick(patientDialogShowing, patientRecord) {

		this.setState({
			patientDialogShowing: patientDialogShowing,
			patientRecord: patientRecord
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
			   <PatientDetailsDialog isDialogActive={this.state.patientDialogShowing} patient={this.state.patientRecord} onHideModal={this.handlePatientClick} />

				<svg className={styles.svgWrapper} width={width} height={height} transform={`translate(${this.props.x}, ${this.props.y})`}>
					<MainViewLayout leftX={paneLeftX} centerX={paneCenterX} rightX={paneRightX}
						left = {[
							<LabelGroup key="0"
								type="diagnosis"
								direction='v'
								title="Diagnosis"
								textAnchor="end"
								data={this.state.diagnosis.slice(0,11)}
								onLabelInteraction={this.handleLabelInteraction}
								x={paneLeftWidth} y="0"/>,
							<LabelGroup key="1"
								type="watersources"
								direction='v'
								title="Water Sources"
								textAnchor="end"
								data={this.state.waterSources.slice(0,11)}
								onLabelInteraction={this.handleLabelInteraction}
								x={paneLeftWidth} y={height/2}/>
						]}
						center = {[
							<MainChart key="0"
								data={this.state.records}
                                visitedDate={this.state.visitedDate}
								onRecordInteraction={this.handleRecordInteraction}
								onUserInput={this.handlePatientClick}
							/>,
							<LabelGroup key="1"
								type="community"
								direction='h'
								title="Community"
								data={this.state.communities.slice(0,20)}
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
								data={this.state.treatments.slice(0,11)}
								onLabelInteraction={this.handleLabelInteraction}
								x="0" y="0"/>,
							<LabelGroup key="1"
								type="bano"
								direction='v'
								title="Bano"
								x="0"
								data={this.state.bano.slice(0,11)}
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
