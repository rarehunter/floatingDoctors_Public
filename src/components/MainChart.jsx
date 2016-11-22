import React from 'react';
import RecordBar from '../components/RecordBar.jsx';

export default class MainChart extends React.Component {
	render() {
		const records = [
			"r1",
			"r2"
		]
		return <RecordBar records={records} x="0" height="300"/>
	}
}