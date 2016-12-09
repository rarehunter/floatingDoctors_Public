import React from 'react';
import * as d3 from 'd3';
import RecordBar from '../components/RecordBar.jsx';
import {getAttributeFromObejcts} from '../Helper.jsx';
import MainAxis from '../components/MainAxis.jsx';
import * as Meta from '../Metadata.jsx';

const xMax = (data) => d3.max(data, (d) => d[0]);
const yMax = (data) => d3.max(data, (d) => d[1]);

var visitDates;

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
        if(this.props.visitedDate)
        {
            visitDates = getAttributeFromObejcts(this.props.visitedDate, "key");
            const xScale = () => {
                return d3.scalePoint()
                    .domain(visitDates)
                    .range([0, Meta.MainChartWidth()]);
            }
            const scaleX = xScale();
            const xSettings = {
                translate: `translate(0, ${Meta.MainChartHeight()})`,
                scale: scaleX,
                orient: 'bottom',
                dates: visitDates
            };
            return (
                <g className="mainChart">
                    {visitDates.map((d, i) => {
                        return <RecordBar key={d}
                                    isDialogActive={this.props.isDialogActive}
                                    onUserHover={this.props.onUserHover}
                                    onUserInput={this.props.onUserInput}
                                    records={this.props.visitedDate[i].value}
                                    x={scaleX(d)}
                                    isFiltering={this.props.isFiltering}
                                    height={Meta.MainChartHeight()}/>
                    })};
                    <MainAxis {...xSettings} tooltip="true"
								tooltipPos="bottom"/>
                </g>
            );
        }
        else
        {
            return (<g></g>);
        }
    }
}
