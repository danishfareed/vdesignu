// D3.js Tree Layout Network Graph
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { GraphNode, GraphEdge } from './types';

interface NetworkGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onNodeClick?: (node: GraphNode) => void;
  width?: number;
  height?: number;
}

const riskColors: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
  none: '#6b7280'
};

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  nodes,
  edges,
  onNodeClick,
  width = 1200,
  height = 800
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    
    // Zoom / Pan Group
    const g = svg.append('g');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);
    // Initial zoom to fit
    svg.call(zoom.transform, d3.zoomIdentity.translate(100, height / 2).scale(0.8));

    // Data Processing: Stratify
    // We need to ensure a single root.
    // If multiple roots, we create a virtual root.
    // Our buildNetworkGraph creates 'domain' as root, and 'subdomains' connected to it.
    
    // D3 Stratify expects id and parentId.
    // We have edges: source -> target. target is child, source is parent.
    // We map nodes to include parentId.
    
    try {
        const rootId = nodes.find(n => n.type === 'root')?.id || nodes[0].id;
        
        const hierarchyData = nodes.map(node => {
            // Find parent from edges
            const parentEdge = edges.find(e => e.target === node.id);
            return {
                ...node,
                parentId: node.id === rootId ? null : parentEdge?.source || rootId // Default to root if orphan (safe fallback)
            };
        });

        // Handle potential cycles or missing parents by validating standard hierarchy
        // Simplification: Just use the edges to build hierarchy manually if stratify matches exactly
        
        const stratify = d3.stratify<any>()
            .id(d => d.id)
            .parentId(d => d.parentId);

        const root = stratify(hierarchyData);

        // Tree Layout
        // Provide plenty of vertical space based on number of leaves
        const leafCount = root.leaves().length;
        const dynamicHeight = Math.max(height, leafCount * 30);
        
        const treeLayout = d3.tree<any>()
            .size([dynamicHeight, width - 400]) // [height, width] for horizontal
            .separation((a, b) => (a.parent == b.parent ? 1.5 : 2.5));

        treeLayout(root);

        // Draw Links (Orthogonal)
        const linkGen = d3.linkHorizontal<any, any>()
            .x(d => d.y)
            .y(d => d.x);

        g.selectAll('.link')
            .data(root.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', linkGen)
            .attr('fill', 'none')
            .attr('stroke', '#374151') // gray-700
            .attr('stroke-width', 1.5)
            .attr('stroke-opacity', 0.6);

        // Draw Nodes
        const node = g.selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.y},${d.x})`)
            .attr('cursor', 'pointer')
            .on('click', (event, d) => {
                event.stopPropagation();
                onNodeClick?.(d.data);
            });

        // Node Rect/Circle
        // Using Rects for better text placement like the user image
        node.append('rect')
            .attr('width', 180)
            .attr('height', 36)
            .attr('x', 0)
            .attr('y', -18)
            .attr('rx', 6)
            .attr('fill', '#1e293b') // slate-800
            .attr('stroke', d => riskColors[d.data.risk] || riskColors.none)
            .attr('stroke-width', 2)
            .attr('class', 'transition-colors hover:fill-slate-700');

        // Text
        node.append('text')
            .attr('dy', 4)
            .attr('x', 10)
            .attr('font-size', 12)
            .attr('font-family', 'monospace')
            .attr('font-weight', 'bold')
            .attr('fill', '#e2e8f0') // slate-200
            .text(d => {
                const label = d.data.label || d.data.id;
                return label.length > 22 ? label.slice(0, 20) + '...' : label;
            });
            
        // Status indicator (dot)
        node.append('circle')
            .attr('cx', 170)
            .attr('cy', 0)
            .attr('r', 4)
            .attr('fill', d => d.data.status === 'live' ? '#22c55e' : '#ef4444');

    } catch (e) {
        console.error("Graph build error:", e);
        // Fallback or error msg
        g.append('text')
         .attr('x', width/2)
         .attr('y', height/2)
         .attr('text-anchor', 'middle')
         .attr('fill', 'red')
         .text('Graph data structure error');
    }

  }, [nodes, edges, width, height, onNodeClick]);

  return (
    <div ref={wrapperRef} className="relative w-full h-[600px] bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[var(--border-subtle)]">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{ cursor: 'move' }}
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[var(--bg-secondary)]/90 backdrop-blur-sm rounded-xl p-4 text-xs space-y-2 border border-[var(--border-subtle)] shadow-lg">
        <div className="font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Risk Level</div>
        {Object.entries(riskColors).map(([level, color]) => (
          <div key={level} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[var(--text-muted)] capitalize">{level}</span>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 right-4 bg-[var(--bg-secondary)]/90 backdrop-blur-sm rounded-xl px-3 py-2 text-xs text-[var(--text-muted)] border border-[var(--border-subtle)] shadow-lg">
        Scroll to zoom • Drag to pan
      </div>
    </div>
  );
};

export default NetworkGraph;
