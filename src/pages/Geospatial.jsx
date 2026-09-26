import React, { useState } from 'react';
import { 
  MapPin, Crosshair, Filter, Clock, 
  Activity, Wifi, AlertCircle, Download, 
  Navigation, Eye
} from 'lucide-react';

export default function Geospatial() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [filter, setFilter] = useState('All');
  const [isLiveTracking, setIsLiveTracking] = useState(false);

  // Mock geographical data points mapped to percentage coordinates (x, y) for UI rendering
  const geoPoints = [
    { id: 1, type: 'Crime Scene', x: 45, y: 35, title: 'Primary Incident Zone', detail: 'FIR #2026-NCRB-9021', time: '26 Sep, 02:30 AM', risk: 'Critical', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500' },
    { id: 2, type: 'Tower Dump', x: 55, y: 28, title: 'Cell Tower IND-402', detail: 'Burner SIM (+91 98210-XXXXX) Ping', time: '26 Sep, 02:14 AM', risk: 'High', icon: Wifi, color: 'text-orange-500', bg: 'bg-orange-500' },
    { id: 3, type: 'Sighting', x: 65, y: 50, title: 'ANPR Camera Sighting', detail: 'Black SUV MH-02-EE5544', time: '26 Sep, 03:15 AM', risk: 'Medium', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500' },
    { id: 4, type: 'Tower Dump', x: 30, y: 60, title: 'Cell Tower IND-405', detail: 'Suspect Co-location Detected', time: '26 Sep, 04:00 AM', risk: 'High', icon: Wifi, color: 'text-orange-500', bg: 'bg-orange-500' },
    { id: 5, type: 'Safehouse', x: 40, y: 55, title: 'Suspected Safehouse', detail: 'Frequent destination of target vehicle', time: '26 Sep, 05:30 AM', risk: 'Critical', icon: MapPin, color: 'text-purple-500', bg: 'bg-purple-500' }
  ];

  const handleTrackingToggle = () => {
    setIsLiveTracking(!isLiveTracking);
  };

  const handleExport = () => {
    alert("Exporting Geospatial KML map data for Case #26189.");
  };

  const filteredPoints = geoPoints.filter(point => filter === 'All' || point.type === filter);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Geospatial Intelligence</h1>
          <p className="text-sm text-gray-500 mt-1">Map suspect movements, tower co-locations, and crime scene proximity.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            onClick={handleTrackingToggle}
            className={`flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors ${
              isLiveTracking 
                ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Crosshair className={`w-4 h-4 mr-2 ${isLiveTracking ? 'animate-pulse text-red-600' : 'text-gray-500'}`} />
            {isLiveTracking ? 'Live Tracking Active' : 'Enable Live Tracking'}
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Map
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Map Area (Simulated UI for Hackathon) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[600px] overflow-hidden relative">
          
          {/* Map Toolbar */}
          <div className="p-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center z-10">
            <div className="flex space-x-2">
              {['All', 'Crime Scene', 'Tower Dump', 'Sighting'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                    filter === f 
                      ? 'bg-blue-100 border-blue-300 text-blue-700' 
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" /> Last 24 Hours
            </div>
          </div>

          {/* Map Surface (Stylized Grid to simulate map engine) */}
          {/* Note: In a real environment, replace this div with <MapContainer> from react-leaflet or Google Maps */}
          <div 
            className="flex-1 relative bg-slate-100 overflow-hidden cursor-crosshair"
            style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            onClick={() => setActiveMarker(null)}
          >
            {/* Live Tracking Radar Effect */}
            {isLiveTracking && (
              <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -ml-[200px] -mt-[200px] border border-red-300 rounded-full animate-ping opacity-20 pointer-events-none"></div>
            )}

            {/* Plotting Geo-Points */}
            {filteredPoints.map((point) => (
              <div 
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: `${point.y}%`, left: `${point.x}%` }}
                onClick={(e) => { e.stopPropagation(); setActiveMarker(point); }}
              >
                {/* Marker Pulse (if active or critical) */}
                {(activeMarker?.id === point.id || point.risk === 'Critical') && (
                  <span className={`absolute flex h-6 w-6 -top-1 -left-1 opacity-50 rounded-full animate-ping ${point.bg}`}></span>
                )}
                
                {/* Marker Icon */}
                <div className={`relative bg-white p-1.5 rounded-full shadow-md border-2 ${
                  activeMarker?.id === point.id ? 'border-gray-900 scale-110' : 'border-gray-200 hover:scale-110'
                } transition-transform`}>
                  <point.icon className={`w-5 h-5 ${point.color}`} />
                </div>

                {/* Tooltip Hover */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-max bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                  {point.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Intelligence Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-blue-600" />
              Location Intelligence
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Selected Marker Details */}
            {activeMarker ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center mb-2">
                  <activeMarker.icon className={`w-5 h-5 mr-2 ${activeMarker.color}`} />
                  <h3 className="font-bold text-gray-900">{activeMarker.title}</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700"><span className="font-semibold text-gray-900">Type:</span> {activeMarker.type}</p>
                  <p className="text-gray-700"><span className="font-semibold text-gray-900">Details:</span> {activeMarker.detail}</p>
                  <p className="text-gray-700"><span className="font-semibold text-gray-900">Time:</span> {activeMarker.time}</p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Status:</span> 
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${
                      activeMarker.risk === 'Critical' ? 'bg-red-200 text-red-800' : 
                      activeMarker.risk === 'High' ? 'bg-orange-200 text-orange-800' : 'bg-blue-200 text-blue-800'
                    }`}>
                      {activeMarker.risk}
                    </span>
                  </p>
                </div>
                <button className="mt-4 w-full bg-white border border-blue-300 text-blue-700 py-1.5 rounded text-sm font-medium hover:bg-blue-100 transition-colors">
                  View Full Entity Graph
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-center text-sm text-gray-500">
                Click a point on the map to view detailed geographical intelligence.
              </div>
            )}

            {/* Geographical Event Timeline */}
            <h3 className="font-medium text-gray-900 mb-2 border-b pb-2">Geospatial Event Log</h3>
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
              {geoPoints.map((point) => (
                <div key={point.id} className="relative pl-4 cursor-pointer" onClick={() => setActiveMarker(point)}>
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${point.bg}`}></div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500">{point.time}</span>
                    <span className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">{point.title}</span>
                    <span className="text-xs text-gray-600 truncate">{point.detail}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}