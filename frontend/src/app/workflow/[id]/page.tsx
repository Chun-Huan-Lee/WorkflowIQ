'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Play, 
  Pause, 
  RotateCcw,
  Users,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  name: string;
  type: 'start' | 'process' | 'decision' | 'end';
  x: number;
  y: number;
  status: 'pending' | 'running' | 'completed' | 'error';
  duration?: number;
  efficiency?: number;
}

interface WorkflowEdge {
  source: string;
  target: string;
  condition?: string;
}

const mockWorkflow = {
  id: 'workflow-1',
  name: 'Customer Onboarding Process',
  description: 'Complete customer onboarding from registration to activation',
  nodes: [
    { id: 'start', name: 'New Customer Registration', type: 'start', x: 100, y: 200, status: 'completed', duration: 5 },
    { id: 'validate', name: 'Validate Information', type: 'process', x: 300, y: 200, status: 'completed', duration: 10, efficiency: 95 },
    { id: 'credit-check', name: 'Credit Check', type: 'decision', x: 500, y: 200, status: 'running', duration: 15 },
    { id: 'manual-review', name: 'Manual Review', type: 'process', x: 500, y: 350, status: 'pending', duration: 60 },
    { id: 'auto-approve', name: 'Auto Approve', type: 'process', x: 700, y: 150, status: 'pending', duration: 2 },
    { id: 'send-docs', name: 'Send Documents', type: 'process', x: 800, y: 250, status: 'pending', duration: 5 },
    { id: 'complete', name: 'Onboarding Complete', type: 'end', x: 950, y: 250, status: 'pending' }
  ] as WorkflowNode[],
  edges: [
    { source: 'start', target: 'validate' },
    { source: 'validate', target: 'credit-check' },
    { source: 'credit-check', target: 'manual-review', condition: 'Failed' },
    { source: 'credit-check', target: 'auto-approve', condition: 'Passed' },
    { source: 'manual-review', target: 'send-docs' },
    { source: 'auto-approve', target: 'send-docs' },
    { source: 'send-docs', target: 'complete' }
  ] as WorkflowEdge[],
  metrics: {
    totalSteps: 7,
    completedSteps: 2,
    avgProcessingTime: '2.5 hours',
    successRate: '94%',
    bottlenecks: ['Manual Review'],
    efficiency: 87
  }
};

const aiInsights = [
  {
    type: 'optimization',
    title: 'Reduce Manual Review Time',
    description: 'AI analysis suggests automating document verification could reduce manual review time by 40%.',
    impact: 'high'
  },
  {
    type: 'bottleneck',
    title: 'Credit Check Delay',
    description: 'Current credit check process has a 15% failure rate leading to manual reviews.',
    impact: 'medium'
  },
  {
    type: 'efficiency',
    title: 'Parallel Processing Opportunity',
    description: 'Document preparation could run in parallel with credit checks to save 20% time.',
    impact: 'high'
  }
];

export default function WorkflowDetailPage({ params }: { params: { id: string } }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [collaborators] = useState([
    { id: 1, name: 'John Doe', avatar: 'JD', cursor: { x: 120, y: 180 } },
    { id: 2, name: 'Jane Smith', avatar: 'JS', cursor: { x: 320, y: 220 } }
  ]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1200;
    const height = 600;

    svg.attr('width', width).attr('height', height);

    // Create arrow markers
    svg.append('defs').selectAll('marker')
      .data(['arrow'])
      .enter().append('marker')
      .attr('id', d => d)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('class', 'fill-gray-400');

    // Draw edges
    svg.selectAll('.edge')
      .data(mockWorkflow.edges)
      .enter().append('line')
      .attr('class', 'edge stroke-gray-300 stroke-2')
      .attr('x1', d => {
        const sourceNode = mockWorkflow.nodes.find(n => n.id === d.source);
        return sourceNode ? sourceNode.x + 60 : 0;
      })
      .attr('y1', d => {
        const sourceNode = mockWorkflow.nodes.find(n => n.id === d.source);
        return sourceNode ? sourceNode.y + 30 : 0;
      })
      .attr('x2', d => {
        const targetNode = mockWorkflow.nodes.find(n => n.id === d.target);
        return targetNode ? targetNode.x : 0;
      })
      .attr('y2', d => {
        const targetNode = mockWorkflow.nodes.find(n => n.id === d.target);
        return targetNode ? targetNode.y + 30 : 0;
      })
      .attr('marker-end', 'url(#arrow)');

    // Draw nodes
    const nodeGroups = svg.selectAll('.node')
      .data(mockWorkflow.nodes)
      .enter().append('g')
      .attr('class', 'node cursor-pointer')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .on('click', (event, d) => setSelectedNode(d));

    // Node backgrounds
    nodeGroups.append('rect')
      .attr('width', 120)
      .attr('height', 60)
      .attr('rx', 8)
      .attr('class', d => {
        const statusColors = {
          'completed': 'fill-green-100 stroke-green-500',
          'running': 'fill-blue-100 stroke-blue-500',
          'pending': 'fill-gray-100 stroke-gray-300',
          'error': 'fill-red-100 stroke-red-500'
        };
        return `${statusColors[d.status]} stroke-2`;
      });

    // Node text
    nodeGroups.append('text')
      .attr('x', 60)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('class', 'text-sm font-medium')
      .text(d => d.name.length > 15 ? d.name.substring(0, 15) + '...' : d.name);

    // Status indicators
    nodeGroups.append('circle')
      .attr('cx', 110)
      .attr('cy', 10)
      .attr('r', 6)
      .attr('class', d => {
        const statusColors = {
          'completed': 'fill-green-500',
          'running': 'fill-blue-500',
          'pending': 'fill-gray-400',
          'error': 'fill-red-500'
        };
        return statusColors[d.status];
      });

  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'running': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{mockWorkflow.name}</h1>
              <p className="text-sm text-gray-600">{mockWorkflow.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Simulate'}
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Workflow Canvas */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 relative">
            {/* Collaboration Cursors */}
            {collaborators.map((collaborator) => (
              <motion.div
                key={collaborator.id}
                className="absolute z-10 pointer-events-none"
                style={{ 
                  left: collaborator.cursor.x, 
                  top: collaborator.cursor.y 
                }}
                animate={{ 
                  x: [0, 10, 0], 
                  y: [0, -5, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm" />
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md">
                    {collaborator.name}
                  </span>
                </div>
              </motion.div>
            ))}

            <svg ref={svgRef} className="w-full h-96" />
          </div>

          {/* Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockWorkflow.metrics.completedSteps}/{mockWorkflow.metrics.totalSteps}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Time</p>
                  <p className="text-2xl font-bold text-gray-900">{mockWorkflow.metrics.avgProcessingTime}</p>
                </div>
                <Clock className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{mockWorkflow.metrics.successRate}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Efficiency</p>
                  <p className="text-2xl font-bold text-gray-900">{mockWorkflow.metrics.efficiency}%</p>
                </div>
                <Zap className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 bg-white border-l border-gray-200 min-h-screen">
          <div className="p-6">
            {/* AI Insights */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                AI Insights
              </h3>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{insight.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        insight.impact === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {insight.impact}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{insight.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Collaborators */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Team ({collaborators.length + 1})
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">YO</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">You</p>
                    <p className="text-xs text-gray-500">Owner</p>
                  </div>
                  <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-medium">{collaborator.avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{collaborator.name}</p>
                      <p className="text-xs text-gray-500">Collaborator</p>
                    </div>
                    <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Details */}
            {selectedNode && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Node Details</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <h4 className="font-medium text-gray-900">{selectedNode.name}</h4>
                    {getStatusIcon(selectedNode.status)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium capitalize">{selectedNode.status}</span>
                    </div>
                    {selectedNode.duration && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{selectedNode.duration}min</span>
                      </div>
                    )}
                    {selectedNode.efficiency && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Efficiency:</span>
                        <span className="font-medium">{selectedNode.efficiency}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Comments */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-500" />
                Comments
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">JD</span>
                    </div>
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    The credit check step seems to be taking longer than expected. Should we review the criteria?
                  </p>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
} 