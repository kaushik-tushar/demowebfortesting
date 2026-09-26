import React, { useState } from 'react';
import { 
  Download, Filter, Search, AlertTriangle, 
  ArrowRight, DollarSign, Activity, CreditCard, RefreshCw 
} from 'lucide-react';

export default function FinancialIntelligence() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data tailored for MHA/NCRB financial tracking
  const transactions = [
    { id: 'TXN-8821', source: 'UPI-98765*****', destination: 'Mule Acc #9041', amount: '₹45,000', type: 'UPI', risk: 'High', date: '26 Sep 2026', status: 'Flagged' },
    { id: 'TXN-8822', source: 'Mule Acc #9041', destination: 'Apex Shell Corp', amount: '₹12,50,000', type: 'RTGS', risk: 'Critical', date: '25 Sep 2026', status: 'Frozen' },
    { id: 'TXN-8823', source: 'Cash Deposit', destination: 'Hawala Node (Dubai)', amount: '₹4,50,00,000', type: 'Hawala', risk: 'Critical', date: '24 Sep 2026', status: 'Investigating' },
    { id: 'TXN-8824', source: 'Crypto Wallet 0x8A', destination: 'Tornado Cash Mixer', amount: '12.4 ETH', type: 'Crypto', risk: 'High', date: '24 Sep 2026', status: 'Flagged' },
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      alert("AI Analysis Complete: 3 new layering patterns detected across offshore shell accounts.");
    }, 1500);
  };

  const handleExport = () => {
    alert("Initiating secure download: Financial_Dossier_Case26189.pdf");
  };

  const filteredTransactions = transactions.filter(t => 
    (filter === 'All' || t.type === filter) &&
    (t.source.toLowerCase().includes(searchQuery.toLowerCase()) || t.destination.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Intelligence</h1>
          <p className="text-sm text-gray-500 mt-1">Track money trails, identify shell networks, and analyze suspicious financial behaviors.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleAnalyze}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin text-blue-600' : 'text-gray-500'}`} />
            {isAnalyzing ? 'Mining Patterns...' : 'Run AI Analysis'}
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Dossier
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
        {[
          { label: 'Total Volume Tracked', value: '₹142.8 Cr', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'High-Risk Transactions', value: '1,248', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
          { label: 'Identified Shell Entities', value: '14', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-100' },
          { label: 'Frozen Accounts', value: '32', icon: CreditCard, color: 'text-green-600', bg: 'bg-green-100' },
        ].map((metric, idx) => (
          <div key={idx} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div className="p-5 flex items-center">
              <div className={`flex-shrink-0 rounded-md p-3 ${metric.bg}`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{metric.label}</dt>
                  <dd className="text-xl font-semibold text-gray-900">{metric.value}</dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Money Trail (Simulated Flow Diagram) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-600" />
          Active Layering Pattern: Case #26189
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 relative">
          
          {/* Layer 1: Placement */}
          <div className="flex flex-col items-center z-10">
            <span className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Placement</span>
            <div className="bg-white p-4 border border-red-200 rounded-lg shadow-sm w-48 text-center">
              <p className="font-bold text-gray-800">Multiple Victims</p>
              <p className="text-xs text-red-600 mt-1">147 UPI Transfers</p>
              <p className="text-sm font-medium mt-1">₹42,00,000</p>
            </div>
          </div>

          <ArrowRight className="w-8 h-8 text-gray-400 my-4 md:my-0 md:mx-4 hidden md:block" />

          {/* Layer 2: Layering */}
          <div className="flex flex-col items-center z-10">
             <span className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Layering</span>
            <div className="bg-white p-4 border border-orange-200 rounded-lg shadow-sm w-48 text-center">
              <p className="font-bold text-gray-800">4 Mule Accounts</p>
              <p className="text-xs text-orange-600 mt-1">Rapid intra-bank routing</p>
              <p className="text-sm font-medium mt-1">₹39,50,000</p>
            </div>
          </div>

          <ArrowRight className="w-8 h-8 text-gray-400 my-4 md:my-0 md:mx-4 hidden md:block" />

          {/* Layer 3: Integration */}
          <div className="flex flex-col items-center z-10">
             <span className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Integration</span>
            <div className="bg-white p-4 border border-blue-200 rounded-lg shadow-sm w-48 text-center ring-2 ring-blue-500">
              <p className="font-bold text-gray-800">Apex Horizon Shell</p>
              <p className="text-xs text-blue-600 mt-1">Offshore Wire (Cayman)</p>
              <p className="text-sm font-medium mt-1">₹35,00,000</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Financial Ledger</h3>
          
          <div className="mt-3 sm:mt-0 flex space-x-3">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                placeholder="Search entities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="UPI">UPI</option>
              <option value="RTGS">RTGS/NEFT</option>
              <option value="Hawala">Hawala/Cash</option>
              <option value="Crypto">Crypto</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source Node</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination Node</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((txn, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{txn.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      txn.risk === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {txn.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {txn.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No transactions match your current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}