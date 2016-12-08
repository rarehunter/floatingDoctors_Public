import React from 'react';
import * as d3 from 'd3';


const selectRangeType = (props) => {

    if(props.showTwo == "two" )
    {
        if (props.chartType2 == "hb-female") {
                const svgProps = {      //HB Female Normal Range
                    y: props.yScale(15.5),
                    x: props.padding,
                    height: props.height - props.padding - props.yScale(15.5-12),
                    width: props.width - 2*props.padding,
                };

                const rectProps = {
                    fill: "#ff9494",
                    fillOpacity: "0.3",
                    x: "0",
                    y:"0",
                    width: props.width - 2*props.padding,
                    height: props.height - props.padding - props.yScale(17.5-13.5),
                };

                return <svg {...svgProps}>
                    <rect {...rectProps}></rect>
                </svg>;
        }
        else if (props.chartType2 == "bp-dys") {
                const svgProps = {
                    y: props.yScale(80),
                    x: props.padding,
                    height: "1",
                    width: props.width - 2*props.padding,
                };

                const rectProps = {
                    fill: "green",
                    x: "0",
                    y:"0",
                    width: props.width - 2*props.padding,
                    height: "1",
                };

                return <svg {...svgProps}>
                    <rect {...rectProps}></rect>
                </svg>;
        }
    }

	if(props.chartType1 == "bmi") {
        const svgProps = {
            y: props.yScale(24.9),
            x: props.padding,
            height: props.height - props.padding - props.yScale(24.9-18.5),
            width: props.width - 2*props.padding,
        };

        const rectProps = {
            fill: "#ccffcc",
            fillOpacity: "0.3",
            x: "0",
            y: "0",
            width: props.width - 2*props.padding,
            height: props.height - props.padding - props.yScale(24.9-18.5),
        };

        return <svg {...svgProps}>
            <rect {...rectProps}></rect>
		</svg>;
    }
    else if(props.chartType1 == "hb-male") {
        const svgProps = {      //HB Male Normal Range
            y: props.yScale(17.5),
            x: props.padding,
            height: props.height - props.padding - props.yScale(17.5-13.5),
            width: props.width - 2*props.padding,
        };

        const rectProps = {
            fill: "#95bbfe",
            fillOpacity: "0.3",
            x: "0",
            y: "0",
            width: props.width - 2*props.padding,
            height: props.height - props.padding - props.yScale(17.5-13.5),
        };

        return <svg {...svgProps}>
            <rect {...rectProps}></rect>
        </svg>;
    }
    else if (props.chartType1 == "bp-sys") {
            const svgProps = {
                y: props.yScale(120),
                x: props.padding,
                height: "1",
                width: props.width - 2*props.padding,
            };

            const rectProps = {
                fill: "green",
                x: "0",
                y:"0",
                width: props.width - 2*props.padding,
                height: "1",
            };

            return <svg {...svgProps}>
                <rect {...rectProps}></rect>
            </svg>;
    }
    else
    {

        return <rect></rect>;
    }
}

export default (props) => {
     return selectRangeType(props);
}
