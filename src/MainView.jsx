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
		const paneLeftWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANE_LEFT_SPAN;
		const paneCenterX = paneLeftWidth;
		const paneCenterWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANEL_CENTER_SPAN;
		const paneRightX = paneLeftWidth + paneCenterWidth;
		const paneRightWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANEL_RIGHT_SPAN;

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
							data={this.state.diagnosis} 
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y="0"/>,
						<LabelGroup key="1" 
							type="watersources" 
							direction='v' 
							title="Water Sources" 
							data={this.state.diagnosis} 
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y={height/2}/>
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
							data={this.state.diagnosis} 
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y={Meta.MAIN_CHART_HEIGHT + Meta.PADDING * 2}/>
					]}
					right = {[
						<LabelGroup key="0" 
							type="treatment" 
							direction='v' 
							title="Treatment" 
							data={this.state.diagnosis} 
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y="0"/>,
						<LabelGroup key="1" 
							type="bano" 
							direction='v' 
							title="Bano" 
							x="0" 
							data={this.state.diagnosis}
							onLabelInteraction={this.handleLabelInteraction}
							x="0" y={height/2}/>
					]}
				/>
				<LinkGroup />
			</svg>
		);
	}
}
