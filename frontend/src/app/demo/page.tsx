'use client';

import Link from 'next/link';
import { ArrowLeftIcon, PlayIcon, ChartBarIcon, UsersIcon, BoltIcon, CogIcon } from '@heroicons/react/24/outline';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WorkflowIQ
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <Link
                href="/auth/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Hero */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            WorkflowIQ
            <span className="block text-3xl sm:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Interactive Demo
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience the power of AI-driven business process intelligence with our interactive platform demo.
          </p>
        </div>

        {/* Demo Video Placeholder */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-800 px-6 py-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="ml-4 text-gray-300 text-sm font-mono">WorkflowIQ Platform Demo</div>
          </div>
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-[500px] flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <PlayIcon className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Interactive Platform Demo
              </h3>
              <p className="text-gray-600 mb-8 max-w-lg">
                Watch how WorkflowIQ transforms complex business processes into intelligent, automated workflows with real-time collaboration.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors inline-flex items-center text-lg">
                <PlayIcon className="h-5 w-5 mr-3" />
                Start Demo Experience
              </button>
            </div>
            
            {/* Demo Features Overlay */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Demo Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• AI Process Discovery</li>
                <li>• Real-time Collaboration</li>
                <li>• Interactive Dashboards</li>
                <li>• Workflow Automation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feature Demos */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Explore Platform Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <BoltIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Process Discovery</h3>
              <p className="text-gray-600 text-sm mb-4">
                Watch AI automatically identify and map your business processes from documents and system logs.
              </p>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:underline">
                Try AI Discovery →
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <UsersIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Collaboration</h3>
              <p className="text-gray-600 text-sm mb-4">
                Experience live collaborative editing with multiple users working on the same process diagram.
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm group-hover:underline">
                Start Collaborating →
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600 text-sm mb-4">
                Explore interactive dashboards with real-time metrics and predictive insights.
              </p>
              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm group-hover:underline">
                View Analytics →
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <CogIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Automation</h3>
              <p className="text-gray-600 text-sm mb-4">
                Build and test automated workflows with conditional logic and integrations.
              </p>
              <button className="text-orange-600 hover:text-orange-700 font-medium text-sm group-hover:underline">
                Build Workflow →
              </button>
            </div>
          </div>
        </div>

        {/* Demo CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business Processes?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Start your free trial today and experience the power of AI-driven process intelligence firsthand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/auth/login"
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 