import React from 'react';
import styles from './css/main.css';
import MainViewLayout from './MainViewLayout.jsx';
import LabelGroup from './components/LabelGroup.jsx';
import MainChart from './components/MainChart.jsx';
import LinkGroup from './components/LinkGroup.jsx';
import * as Meta from './Metadata.jsx';
import * as Helper from './Helper.jsx';

// Dummy data
const labelGroupData1 = [
	"Worms",
	"Prolapse",
	"Schizophremia",
	"Prostatitis",
	"Renal Colic"
];

const diagnosisData = [
	{"id":0, "name":"Worms", "state":0},
	{"id":1, "name":"Prolapse", "state":0},
	{"id":2, "name":"Schizophremia", "state":0},
	{"id":3, "name":"Prostatitis", "state":0},
	{"id":4, "name":"Renal", "state":0},	
];

const communityData = [
	{"name": "BG", "full_name":"BAHIA GRANDE", "state":0, "count": 25},
	{"name": "BH", "full_name":"BAHIA HONDA", "state":0, "count": 15},
	{"name": "BC", "full_name":"BAJO CEDRO", "state":0, "count": 35},
	{"name": "BE", "full_name":"BUENA ESPERANZA", "state":0, "count": 45},
	{"name": "CB", "full_name":"CERRO BRUJO", "state":0, "count": 5},
];

export default class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: window.innerWidth,
			height: window.innerHeight,
			activeRecord: '',
			activeLabel: '',
			selectedRecord: '',
			selectedLabels: [],
			records: [],
			communities: [],
			diagnosis: [],
			treatments: [],
			waterSources: [],
			bano: [],
			lines: [],
		};
		this.handleLabelInteraction = this.handleLabelInteraction.bind(this);
		this.handleRecordInteraction = this.handleRecordInteraction.bind(this);
	}

	componentDidMount() {
		const height = this.state.height - this.props.y;
		// Todo
		/*
		* Call dataManager to initialize 
		const recordsData = DataManager.getRecords();
		const communityData = DataManager.getCommunities();
		const diagnosisData = DataManager.getDiagnosis();
		const treatmentData = DataManager.getTreatments();
		const waterSourceData = DataManager.getWaterSources();
		const banoData = DataManager.getBano();
		*/
		this.setState({
			height: height,
			diagnosis: diagnosisData,
			communities: communityData
		});

		window.addEventListener("resize", this.updateSize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateSize);
	}

	updateSize() {
		console.log("Window resized");
		// this.setState({
		// 	width: window.innerWidth,
		// 	height: window.innerHeight
		// });
	}

	updateRecords() {
		const records = this.state.records.slice();
		this.setState({
			records: records
		});	
	}

	updateCommunities(updatedRecords, state) {
		if (state === 1) {
			const communities = this.state.communities.slice();
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
		if (state === 0) {
			const communities = communityData.slice();
			communities.map(c => {
				c.state = 0;
			});
			this.setState({
				communities: communities
			});
		}
		
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
		if (type === "diagnosis") {
			const diagnosis = this.state.diagnosis.slice();
			diagnosis.map((d) => {
				if (d.id === id) {
					d.state = state;
				}
			});
			this.setState({
				diagnosis: diagnosis
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

	render() {
		const { width, height } = this.state;
		const paneLeftX = 0;
		const paneLeftWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANE_LEFT_SPAN - Meta.PADDING;
		const paneCenterX = paneLeftWidth + Meta.PADDING;
		const paneCenterWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANEL_CENTER_SPAN;
		const paneRightX = paneLeftWidth + paneCenterWidth + Meta.PADDING * 2;
		const paneRightWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANEL_RIGHT_SPAN - Meta.PADDING;

		const communityName = Helper.getAttributeFromObejcts(communityData, "abr");
		console.log("Height is "+height);
		return (
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
							onRecordInteraction={this.handleRecordInteraction}
						/>,
						<LabelGroup key="1" 
							type="community" 
							direction='h' 
							title="Community" 
							data={this.state.communities} 
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y={Meta.MAIN_CHART_HEIGHT + Meta.PADDING * 2}/>
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
		);
	}
}