import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-600 text-sm font-medium">Current Level</div>
          <div className="text-4xl font-bold text-primary mt-2">1</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-600 text-sm font-medium">Total XP</div>
          <div className="text-4xl font-bold text-secondary mt-2">0</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-600 text-sm font-medium">Achievements</div>
          <div className="text-4xl font-bold text-accent mt-2">0</div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Topics</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600">Loading topics...</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
