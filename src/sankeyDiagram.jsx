import * as d3 from 'd3';
import { sankey, sankeyCenter, sankeyLinkHorizontal } from "d3-sankey";
import React, { useRef, useEffect, useState } from 'react';

const SankeyDiagram = () => {

    const MARGIN_Y = 25;
    const MARGIN_X = 5;

    const Data = {
        nodes: [
            { id: "source" },
            { id: "label 1" },
            { id: "label 2" },
            { id: "label 3" },
            { id: "label 4" },
            { id: "label 5" }
        ],
        links: [
            { source: "source", target: "label 1", value: 4 },
            { source: "source", target: "label 2", value: 4 },
            { source: "source", target: "label 3", value: 4 },
            { source: "source", target: "label 4", value: 4 },
            { source: "source", target: "label 5", value: 4 },
        ]
    }

    const SankeyProps = {
        width: 750,
        height: 500,
        data: Data
    }

    const sankeyGenerator = sankey()
        .nodeWidth(18)
        .nodePadding(30)
        .extent([
            [MARGIN_X, MARGIN_Y],
            [SankeyProps.width - MARGIN_X, SankeyProps.height - MARGIN_Y],
        ])
        .nodeId((node) => node.id)
        .nodeAlign(sankeyCenter);

    const { nodes, links } = sankeyGenerator(SankeyProps.data);

    const allNodes = nodes.map((node) => {
        return (
            <g key={node.index}>
                <rect
                    height={node.y1 - node.y0}
                    width={sankeyGenerator.nodeWidth()}
                    x={node.x0}
                    y={node.y0}
                    fill="#a9f5b9"
                    fillOpacity={0.8}
                    rx={0.9} 
                />
            </g>
        );
    });

    const allLinks = links.map((link, i) => {
        const linkGenerator = sankeyLinkHorizontal();
        const path = linkGenerator(link);
        return (
            <path
              key={i}
              d={path}
              stroke="#33de59"
              fill="none"
              strokeOpacity={0.1}
              strokeWidth={link.width}
            />
          );
    });

    const allLabels = nodes.map((node, i) => {
        return (
          <text
            key={i}
            x={node.x0 < SankeyProps.width / 2 ? node.x1 + 6 : node.x0 - 6}
            y={(node.y1 + node.y0) / 2}
            dy="0.35rem"
            textAnchor={node.x0 < SankeyProps.width / 2 ? "start" : "end"}
            fontSize={12}
          >
            {node.id}
          </text>
        );
      });

      console.log(nodes)

    return (
        <div>
            <svg width={SankeyProps.width} height={SankeyProps.height}>
                {allNodes}
                {allLinks}
                {allLabels}
            </svg>
        </div>
    )
}

export default SankeyDiagram;