import React from 'react';
import styles from './css/main.css';
import MainViewLayout from './MainViewLayout.jsx';
import LabelGroup from './components/LabelGroup.jsx';
import MainChart from './components/MainChart.jsx';
import LineGroup from './components/LineGroup.jsx';

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

export default class MainView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			width: screen.width,
			height: screen.height,
			activeSquare: '',
			activeLabel: '',
			lines: [],
			squares: [],
			labels: [],
		};
	}

	componentDidMount() {

	}

	render() {
		const { width, height } = this.state;
		const paneLeftX = 0;
		const paneLeftWidth = (width - PADDING * 2) / PANE_SPAN * PANE_LEFT_SPAN;
		const paneCenterX = paneLeftWidth;
		const paneCenterWidth = (width - PADDING * 2) / PANE_SPAN * PANEL_CENTER_SPAN;
		const paneRightX = paneLeftWidth + paneCenterWidth;
		const paneRightWidth = (width - PADDING * 2) / PANE_SPAN * PANEL_RIGHT_SPAN;

		return (
			<svg className={styles.svgWrapper} width={width} height={height}>
				<MainViewLayout leftX={paneLeftX} centerX={paneCenterX} rightX={paneRightX} 
					left = {[
						<LabelGroup key="0" direction='v' title="Diagnosis" labels={labelGroupData1} x="0" y="0"/>,
						<LabelGroup key="1" direction='v' title="Water Sources"  x="0" y={height/2}/>
					]}
					center = {[
						<MainChart key="0" />,
						<LabelGroup key="1" direction='h'/>
					]}
					right = {[
						<LabelGroup key="0" direction='v' title="Treatment" x="0" y="0"/>,
						<LabelGroup key="1" direction='v' title="Bano" x="0" y={height/2}/>
					]}
				/>
				<LineGroup />
			</svg>
		);
	}
}
