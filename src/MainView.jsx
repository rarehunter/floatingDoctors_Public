import React from 'react';
import styles from './css/main.css';
import MainViewLayout from './MainViewLayout.jsx';
import LabelGroup from './components/LabelGroup.jsx';
import MainChart from './components/MainChart.jsx';
import LinkGroup from './components/LinkGroup.jsx';

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

const diagnosisData = [
	{"id":0, "name":"Worms", "state":0},
	{"id":1, "name":"Prolapse", "state":0},
	{"id":2, "name":"Schizophremia", "state":0},
	{"id":3, "name":"Prostatitis", "state":0},
	{"id":4, "name":"Renal", "state":0},	
];

const communityData = [
	{"abr": "BG", "name":"BAHIA GRANDE"},
	{"abr": "BH", "name":"BAHIA HONDA"},
	{"abr": "BC", "name":"BAJO CEDRO"},
	{"abr": "BE", "name":"BUENA ESPERANZA"},
	{"abr": "CB", "name":"CERRO BRUJO"},
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
			highlightedRecords: [],
			highlightedCommunities: [],
			diagnosis: [],
			highlightedTreatments: [],
			highlightedWaterSources: [],
			highlightedBano: [],
			lines: [],
		};
		this.handleLabelInteraction = this.handleLabelInteraction.bind(this);
	}

	componentDidMount() {
		const height = this.state.height - this.props.y;
		this.setState({
			height: height,
			diagnosis: diagnosisData
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
		}
	}

	handleRecordMouseOver(type, id) {
		(type === "record") ? (
			this.setState({
				activeSquare: id
			})
		) : (
			this.setState({
				activeLabel: id
			})
		);
	}

	handleClick(type, id) {
		this.setState({

		});
	}

	render() {
		const { width, height } = this.state;
		const paneLeftX = 0;
		const paneLeftWidth = (width - PADDING * 2) / PANE_SPAN * PANE_LEFT_SPAN;
		const paneCenterX = paneLeftWidth;
		const paneCenterWidth = (width - PADDING * 2) / PANE_SPAN * PANEL_CENTER_SPAN;
		const paneRightX = paneLeftWidth + paneCenterWidth;
		const paneRightWidth = (width - PADDING * 2) / PANE_SPAN * PANEL_RIGHT_SPAN;

		const communityName = getAttributeFromObejcts(communityData, "abr");

		console.log("Height is "+height);
		return (
			<svg className={styles.svgWrapper} width={width} height={height} transform={`translate(${this.props.x}, ${this.props.y})`}>
				<MainViewLayout leftX={paneLeftX} centerX={paneCenterX} rightX={paneRightX} 
					left = {[
						<LabelGroup key="0" 
							type="diagnosis" 
							direction='v' 
							title="Diagnosis" 
							labels={labelGroupData1}
							data={this.state.diagnosis} 
							highlightedLabels={this.state.highlightedDiagnosis} 
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y="0"/>,
						<LabelGroup key="1" 
							type="watersources" 
							direction='v' 
							title="Water Sources" 
							labels={labelGroupData1}
							data={this.state.diagnosis} 
							highlightedLabels={this.state.highlightedWaterSources}
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y={height/2}/>
					]}
					center = {[	
						<MainChart key="0" />,
						<LabelGroup key="1" 
							type="community" 
							direction='h' 
							title="Community" 
							labels={communityName} 
							data={this.state.diagnosis} 
							highlightedLabels={this.state.highlightedCommunities} 
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y={height-96}/>
					]}
					right = {[
						<LabelGroup key="0" 
							type="treatment" 
							direction='v' 
							title="Treatment" 
							labels={labelGroupData1}
							data={this.state.diagnosis}  
							highlightedLabels={this.state.highlightedTreatments} 
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y="0"/>,
						<LabelGroup key="1" 
							type="bano" 
							direction='v' 
							title="Bano" 
							x="0" 
							labels={labelGroupData1} 
							data={this.state.diagnosis} 
							highlightedLabels={this.state.highlightedBano} 
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y={height/2}/>
					]}
				/>
				<LinkGroup />
			</svg>
		);
	}
}

function getAttributeFromObejcts(objects, attr) {
	let results = [];
	objects.forEach(function(d) {
		results.push(d[attr]);
	});
	return results;
}
