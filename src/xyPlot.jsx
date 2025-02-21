import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';

const xyPlot = () => {

    const width = 640;
    const height = 400;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;



    const gx = useRef();
    const gy = useRef();
    const ga = useRef();
    const x = d3.scaleUtc()
        .domain([new Date("2025-01-01"), new Date("2026-01-01")])
        .range([marginLeft, width - marginRight]);
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - marginBottom, marginTop]);
    useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
    useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);      
  
    

    return (
        <svg width={width} height={height}>
            <g ref={gx} transform={`translate(0, ${height - marginBottom})`}></g>
            <g ref={gy} transform={`translate(${marginLeft}, 0)`}></g>
        </svg>

    )

}

export default xyPlot;