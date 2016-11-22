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
			activeSquare: '',
			activeLabel: '',
			lines: [],
			squares: [],
			labels: [],
		};
	}

	componentDidMount() {
		const height = this.state.height - this.props.y;
		this.setState({
			height: height
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
						<LabelGroup key="0" direction='v' title="Diagnosis" labels={labelGroupData1} x="0" y="0"/>,
						<LabelGroup key="1" direction='v' title="Water Sources"  x="0" y={height/2}/>
					]}
					center = {[
						<MainChart key="0" />,
						<LabelGroup key="1" direction='h' title="Community" labels={communityName} x="0" y={height-96}/>
					]}
					right = {[
						<LabelGroup key="0" direction='v' title="Treatment" x="0" y="0"/>,
						<LabelGroup key="1" direction='v' title="Bano" x="0" y={height/2}/>
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
