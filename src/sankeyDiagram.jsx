import * as d3 from 'd3';
import { sankey, sankeyCenter, sankeyLinkHorizontal } from "d3-sankey";
import React, { useRef, useEffect, useState } from 'react';

const SankeyDiagram = () => {

    const data = {
        nodes: [
            { node: 0, name: "node0" },
            { node: 1, name: "node1" },
            { node: 2, name: "node2" },
            { node: 3, name: "node3" },
        ],
        links: [
            { source: 0, target: 2, value: 2 },
            { source: 1, target: 2, value: 2 },
            { source: 1, target: 3, value: 2 },
        ]
    }

    const SankeyProps = {
        width: 500,
        height: 500,
        data: data
    }

    const MARGIN_Y = 25;
    const MARGIN_X = 5;

    const sankeyGenerator = sankey()
        .nodeWidth(26)
        .nodePadding(29)
        .extent([
            [MARGIN_X, MARGIN_Y],
            [width - MARGIN_X, height - MARGIN_Y],
        ])
        .nodeId((node) => node.id)
        .nodeAlign(sankeyCenter);

    return (
        <svg width={SankeyProps.width} height={SankeyProps.height}></svg>
    )
}

export default SankeyDiagram;