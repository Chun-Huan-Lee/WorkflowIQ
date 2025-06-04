'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  Brain,
  Settings,
  Bell,
  User
} from 'lucide-react';

// Mock data for demonstration
const mockWorkflows = [
  {
    id: '1',
    name: 'Customer Onboarding',
    status: 'active',
    progress: 75,
    lastUpdated: '2 hours ago',
    collaborators: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    efficiency: 85,
    bottlenecks: 2
  },
  {
    id: '2',
    name: 'Invoice Processing',
    status: 'optimizing',
    progress: 60,
    lastUpdated: '1 day ago',
    collaborators: ['Sarah Wilson', 'Tom Brown'],
    efficiency: 92,
    bottlenecks: 1
  },
  {
    id: '3',
    name: 'Product Launch',
    status: 'completed',
    progress: 100,
    lastUpdated: '3 days ago',
    collaborators: ['Alice Chen', 'Bob Davis', 'Carol White', 'David Lee'],
    efficiency: 78,
    bottlenecks: 0
  }
];

const mockMetrics = {
  totalWorkflows: 12,
  activeProcesses: 8,
  avgEfficiency: 84,
  timesSaved: '156 hours'
};

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [workflows, setWorkflows] = useState(mockWorkflows);

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || workflow.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'optimizing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">WorkflowIQ</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-blue-600 font-medium">Dashboard</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Workflows</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Analytics</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Team</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              New Workflow
            </button>
          </div>
          
          <nav className="px-6">
            <div className="space-y-1">
              <a href="#" className="bg-blue-50 text-blue-700 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <BarChart3 className="mr-3 h-5 w-5" />
                Overview
              </a>
              <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <Activity className="mr-3 h-5 w-5" />
                Active Processes
              </a>
              <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <TrendingUp className="mr-3 h-5 w-5" />
                Analytics
              </a>
              <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                <Users className="mr-3 h-5 w-5" />
                Team
              </a>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                  <p className="text-3xl font-bold text-gray-900">{mockMetrics.totalWorkflows}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Processes</p>
                  <p className="text-3xl font-bold text-gray-900">{mockMetrics.activeProcesses}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Efficiency</p>
                  <p className="text-3xl font-bold text-gray-900">{mockMetrics.avgEfficiency}%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Saved</p>
                  <p className="text-3xl font-bold text-gray-900">{mockMetrics.timesSaved}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Workflows Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Workflows</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </button>
              </div>
              
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search workflows..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="optimizing">Optimizing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredWorkflows.map((workflow, index) => (
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{workflow.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                          {workflow.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Progress</p>
                          <div className="mt-1 flex items-center space-x-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${workflow.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{workflow.progress}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600">Efficiency</p>
                          <p className="text-lg font-semibold text-gray-900">{workflow.efficiency}%</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600">Bottlenecks</p>
                          <div className="flex items-center space-x-1">
                            <p className="text-lg font-semibold text-gray-900">{workflow.bottlenecks}</p>
                            {workflow.bottlenecks > 0 && (
                              <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-600">Team</p>
                          <div className="flex -space-x-2 mt-1">
                            {workflow.collaborators.slice(0, 3).map((_, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center"
                              >
                                <span className="text-xs text-gray-600">
                                  {workflow.collaborators[i]?.charAt(0)}
                                </span>
                              </div>
                            ))}
                            {workflow.collaborators.length > 3 && (
                              <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-xs text-gray-600">
                                  +{workflow.collaborators.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-2">Last updated {workflow.lastUpdated}</p>
                    </div>
                    
                    <button className="ml-4 p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 