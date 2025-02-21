import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';

const chordDiagram = () => {

    // data values for the groups in the chart
    const data = [
        [10, 20, 30, 40],
        [50, 60, 70, 80],
        [90, 100, 110, 120],
        [130, 140, 150, 160]
    ]

    const svgRef = useRef();
    const [chordData, setChordData] = useState(data);

    useEffect(() => {
        if (!chordData) return;

        // dimensions of the svg tag
        const width = 500;
        const height = 500;
        const innerRadius = Math.min(width, height) * 0.4;
        const outerRadius = innerRadius * 1.05;

        // hooks into the svg tag holding the svgRef reference
        d3.select(svgRef.current).select("svg").remove();

        // applies svg dimensions and styling to svg tag, then appends the first
        // g tag
        const svg = d3.select(svgRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // creates chord diagram and sorts the values from the data array
        const chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending)
            .sortChords(d3.descending)(chordData);

        // creates arcs to be appended to paths
        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        // creates ribbon gives it a radial value
        const ribbon = d3.ribbon()
            .radius(innerRadius);

        const color = d3.scaleOrdinal()
            .domain(d3.range(chordData.length))
            .range(d3.schemeCategory10);

        // appends the group tag to the svg, with the class "chord-groups",
        // and joins the chord data to the group tag while appending group tags
        const group = svg.append("g")
            .attr("class", "chord-groups")
            .selectAll("g")
            .data(chord.groups)
            .enter().append("g");

        // appends the path tag to every g tag inside "chord-groups" including
        // fill, stoke, and arc data
        group.append("path")
            .style("fill", (d) => color(d.index))
            .style("stroke", (d) => d3.rgb(color(d.index)).darker())
            .attr("d", arc);

        // appends text tag coordinates to every g tag inside "chord-groups"
        group.append("text")
            .attr("x", 10)
            .attr("dy", 15)
            .filter((d) => (d.endAngle - d.startAngle) > 0.1)
            .attr("transform", (d) => `rotate(${(d.startAngle + d.endAngle) / 2 * (180 / Math.PI) - 90}) 
            translate(${outerRadius + 10},0)`)
            .attr("text-anchor", (d) => (d.startAngle + d.endAngle) / 4 < Math.PI ? "start" : "end")
            .text((d, i) => `Label ${i + 1}`);
        
        // appends group tag to the first g tag with the class "chord-ribbons",
        // then enters the "chord-ribbons" group, adds in the ribbon style data
        // while appending path elements containing the chord coordinates
        svg.append("g")
            .attr("class", "chord-ribbons")
            .selectAll("path")
            .data(chord)
            .enter().append("path")
            .attr("d", ribbon)
            .style("fill", (d) => color(d.source.index))
            .style("stroke", (d) => d3.rgb(color(d.source.index)).darker());
    }, [chordData]);




    // const width = 640;
    // const height = 400;
    // const marginTop = 20;
    // const marginRight = 20;
    // const marginBottom = 30;
    // const marginLeft = 40;



    // const gx = useRef();
    // const gy = useRef();
    // const ga = useRef();
    // const x = d3.scaleUtc()
    //     .domain([new Date("2025-01-01"), new Date("2026-01-01")])
    //     .range([marginLeft, width - marginRight]);
    // const y = d3.scaleLinear()
    //     .domain([0, 100])
    //     .range([height - marginBottom, marginTop]);
    // useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
    // useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);      
  
    

    return (
        // <svg width={width} height={height}>
        //     {/* <g ref={gx} transform={`translate(0, ${height - marginBottom})`}></g>
        //     <g ref={gy} transform={`translate(${marginLeft}, 0)`}></g> */}
        // </svg>

        <div ref={svgRef}></div>
    )
}

export default chordDiagram;