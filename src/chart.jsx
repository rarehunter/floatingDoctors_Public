import React from 'react';
import { Button } from 'react-bootstrap';
import ScatterPlot from './components/scatter-plot.jsx';

const styles = {
	width: 500,
	height: 300,
	padding: 30
}

const numDataPoints = 50;

const randomNum = () => Math.floor(Math.random() * 10000);

const randomDataSet = () => {
	return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()]);
}

export default class Chart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: randomDataSet()};
	}

	randomizeData() {
		this.setState({data: randomDataSet()});
	}

	render() {
		return <div>
			<h1>React & D3</h1>
			<ScatterPlot {...this.state} {...styles} />
			<div className="controls">
				<Button className="randomize" onClick={() => this.randomizeData()}>
					Randomize data
				</Button>
			</div>
		</div>
	}
}
