import React from 'react';
import * as d3 from 'd3';
import RecordBar from '../components/RecordBar.jsx';
import {getAttributeFromObejcts} from '../Helper.jsx';
import MainAxis from '../components/MainAxis.jsx';
import * as Meta from '../Metadata.jsx';

const xMax = (data) => d3.max(data, (d) => d[0]);
const yMax = (data) => d3.max(data, (d) => d[1]);

const visits = [
{"date": "February 16, 2014", "total":10},
{"date": "October 18, 2012", "total":94},
{"date": "July 26, 2012", "total":76},
{"date": "February 11, 2014", "total":69},
{"date": "May 16, 2013", "total":54},
{"date": "March 08, 2012", "total":59},
{"date": "July 19, 2016", "total":31},
{"date": "May 01, 2012", "total":53},
{"date": "January 19, 2015", "total":82},
{"date": "March 26, 2013", "total":63},
{"date": "October 11, 2014", "total":80},
{"date": "September 26, 2012", "total":93},
{"date": "March 24, 2014", "total":46},
{"date": "October 31, 2015", "total":49},
{"date": "August 21, 2016", "total":28},
{"date": "December 11, 2014", "total":35},
{"date": "January 23, 2015", "total":19},
{"date": "March 28, 2015", "total":83},
{"date": "September 23, 2012", "total":58},
{"date": "November 19, 2012", "total":62},
{"date": "January 28, 2014", "total":45},
{"date": "September 30, 2013", "total":48},
{"date": "November 24, 2012", "total":33},
{"date": "January 14, 2013", "total":50},
{"date": "April 27, 2015", "total":14},
{"date": "May 22, 2012", "total":24},
{"date": "July 11, 2012", "total":50},
{"date": "April 17, 2014", "total":64},
{"date": "August 13, 2014", "total":39},
{"date": "March 25, 2013", "total":54},
{"date": "July 27, 2014", "total":47},
{"date": "July 22, 2012", "total":37},
{"date": "September 23, 2016", "total":25},
{"date": "December 28, 2012", "total":47},
{"date": "August 09, 2012", "total":65},
{"date": "August 24, 2013", "total":23},
{"date": "July 12, 2013", "total":80},
{"date": "September 13, 2016", "total":53},
{"date": "March 24, 2015", "total":82},
{"date": "November 27, 2013", "total":50},
{"date": "February 19, 2015", "total":86},
{"date": "September 27, 2013", "total":49},
{"date": "April 07, 2016", "total":93},
{"date": "April 02, 2015", "total":72},
{"date": "June 17, 2014", "total":69},
{"date": "February 16, 2016", "total":64},
{"date": "August 28, 2012", "total":48},
{"date": "September 12, 2015", "total":93},
{"date": "August 15, 2016", "total":61},
{"date": "July 02, 2012", "total":44},
{"date": "June 13, 2014", "total":33},
{"date": "August 01, 2015", "total":11},
{"date": "December 03, 2013", "total":44},
{"date": "March 28, 2016", "total":40},
{"date": "July 03, 2015", "total":33},
{"date": "July 10, 2013", "total":49},
{"date": "February 06, 2013", "total":84},
{"date": "June 07, 2016", "total":13},
{"date": "April 29, 2015", "total":83},
{"date": "December 23, 2013", "total":5},
{"date": "April 26, 2015", "total":92},
{"date": "October 20, 2015", "total":35},
{"date": "November 23, 2013", "total":39},
{"date": "February 10, 2015", "total":11},
{"date": "July 30, 2016", "total":83},
{"date": "December 11, 2012", "total":6},
{"date": "March 16, 2015", "total":51},
{"date": "September 01, 2014", "total":81},
{"date": "May 04, 2013", "total":39},
{"date": "November 20, 2013", "total":53},
{"date": "September 12, 2015", "total":41},
{"date": "August 31, 2013", "total":21},
{"date": "April 13, 2016", "total":57},
{"date": "January 16, 2016", "total":20},
{"date": "June 06, 2013", "total":76},
{"date": "May 15, 2016", "total":26},
{"date": "March 23, 2016", "total":26},
{"date": "August 24, 2015", "total":87},
{"date": "March 12, 2016", "total":7},
{"date": "June 15, 2013", "total":63},
{"date": "September 07, 2015", "total":51},
{"date": "November 11, 2013", "total":46},
{"date": "August 27, 2016", "total":79},
{"date": "September 23, 2016", "total":96},
{"date": "March 16, 2016", "total":10},
{"date": "July 06, 2016", "total":56},
{"date": "August 15, 2015", "total":73},
{"date": "January 07, 2013", "total":36},
{"date": "March 11, 2016", "total":53},
{"date": "March 26, 2012", "total":93},
{"date": "April 05, 2013", "total":78},
{"date": "September 18, 2015", "total":9},
{"date": "August 13, 2014", "total":78},
{"date": "October 14, 2012", "total":58},
{"date": "May 09, 2016", "total":2},
{"date": "April 22, 2013", "total":63},
{"date": "December 30, 2013", "total":33},
{"date": "August 10, 2013", "total":18},
{"date": "February 04, 2013", "total":58},
{"date": "December 06, 2013", "total":77},
{"date": "March 15, 2012", "total":31},
{"date": "March 01, 2014", "total":80},
{"date": "February 20, 2014", "total":86},
{"date": "July 20, 2013", "total":7},
{"date": "November 20, 2016", "total":31},
{"date": "March 06, 2012", "total":70},
{"date": "February 09, 2014", "total":98},
{"date": "February 23, 2014", "total":87},
{"date": "June 28, 2015", "total":8},
{"date": "February 26, 2013", "total":39},
{"date": "January 13, 2015", "total":85},
{"date": "February 12, 2014", "total":18},
{"date": "July 24, 2014", "total":12},
{"date": "April 04, 2013", "total":24},
{"date": "September 26, 2016", "total":87},
{"date": "June 14, 2013", "total":31},
{"date": "December 09, 2013", "total":3},
{"date": "September 20, 2012", "total":74},
{"date": "July 15, 2014", "total":90},
{"date": "November 06, 2013", "total":50},
{"date": "February 19, 2013", "total":17},
{"date": "February 26, 2012", "total":90},
{"date": "February 28, 2014", "total":62},
{"date": "September 17, 2015", "total":45},
{"date": "March 20, 2014", "total":22},
{"date": "November 03, 2015", "total":42},
{"date": "February 01, 2016", "total":26},
{"date": "March 24, 2012", "total":56},
{"date": "August 16, 2014", "total":67},
{"date": "December 10, 2014", "total":72},
{"date": "November 05, 2013", "total":21},
{"date": "June 10, 2012", "total":92},
{"date": "March 22, 2012", "total":78},
{"date": "October 26, 2015", "total":42},
{"date": "October 23, 2016", "total":3},
{"date": "December 08, 2015", "total":64},
{"date": "September 16, 2014", "total":38},
{"date": "July 31, 2016", "total":48},
{"date": "November 04, 2016", "total":50},
{"date": "November 20, 2014", "total":67},
{"date": "December 14, 2013", "total":49},
{"date": "July 17, 2014", "total":78},
{"date": "June 28, 2015", "total":3},
{"date": "March 06, 2015", "total":70},
{"date": "June 02, 2016", "total":18},
{"date": "July 25, 2013", "total":3},
{"date": "March 10, 2013", "total":41},
{"date": "June 20, 2015", "total":36},
{"date": "June 15, 2016", "total":93},
{"date": "February 05, 2016", "total":86},
{"date": "December 10, 2013", "total":46},
{"date": "June 12, 2012", "total":70},
{"date": "March 05, 2016", "total":12},
{"date": "January 31, 2014", "total":57},
{"date": "April 05, 2013", "total":78},
{"date": "July 05, 2013", "total":4},
{"date": "June 23, 2014", "total":5},
{"date": "April 05, 2016", "total":96},
{"date": "September 20, 2013", "total":44},
{"date": "September 06, 2015", "total":48},
];
const records = [
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",
	"r1",

];
const visitDates = getAttributeFromObejcts(visits, "date");
const xScale = () => {
	return d3.scalePoint()
		.domain(visitDates)
		.range([0,Meta.MainChartWidth()]);
}
const randomRecords = () => {
	const len = Math.floor(Math.random() * (100 + 1));

	let results = [];

	for(var i = 0; i < len; i++) {
		results.push("r");
	}

	return results;
}
export default class MainChart extends React.Component {
	render() {
		const scaleX = xScale();
		const xSettings = {
			translate: `translate(0, ${Meta.MAIN_CHART_HEIGHT})`,
			scale: scaleX,
			orient: 'bottom',
			dates: visitDates
		};
		return (
		<g className="mainChart">
			{visitDates.map((d, i) => {
				return <RecordBar key={i} records={randomRecords()} x={scaleX(d)} height={Meta.MAIN_CHART_HEIGHT}/>;
			})};
			<MainAxis {...xSettings} />
		</g>
		)
	}
}