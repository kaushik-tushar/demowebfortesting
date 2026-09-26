import React, { useState } from 'react';
import { 
  UploadCloud, FileText, CheckCircle, 
  Brain, Database, User, MapPin, Phone, 
  CreditCard, Truck, RefreshCw, AlertTriangle 
} from 'lucide-react';

export default function DocumentProcessor() {
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, processing, complete
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock extracted entities tailored to Case #26189
  const extractedEntities = [
    { type: 'Person', value: 'Rajesh "Raju" Sharma', icon: User, color: 'text-blue-700', bg: 'bg-blue-100', labelBg: 'bg-blue-200' },
    { type: 'Phone', value: '+91 98765 43210', icon: Phone, color: 'text-orange-700', bg: 'bg-orange-100', labelBg: 'bg-orange-200' },
    { type: 'Location', value: 'Sector 62, Noida', icon: MapPin, color: 'text-green-700', bg: 'bg-green-100', labelBg: 'bg-green-200' },
    { type: 'Account', value: 'HDFC A/C ****9041', icon: CreditCard, color: 'text-purple-700', bg: 'bg-purple-100', labelBg: 'bg-purple-200' },
    { type: 'Vehicle', value: 'AP-16-CD-5678', icon: Truck, color: 'text-gray-700', bg: 'bg-gray-200', labelBg: 'bg-gray-300' },
  ];

  const handleFileUpload = (e) => {
    e.preventDefault();
    setUploadState('uploading');
    
    // Simulate file upload
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setUploadState('processing');
        
        // Simulate NLP pipeline delay
        setTimeout(() => {
          setUploadState('complete');
        }, 2500);
      }
    }, 300);
  };

  const handleSyncToGraph = () => {
    alert("Success: 5 new entities and their relationships have been synchronized with the Neo4j Graph Database.");
  };

  const resetProcessor = () => {
    setUploadState('idle');
    setUploadProgress(0);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-indigo-600" />
            AI Document Processor
          </h1>
          <p className="text-sm text-gray-500 mt-1">Upload unstructured FIRs, intel reports, or surveillance transcripts to auto-extract network entities.</p>
        </div>
      </div>

      {/* Upload Zone (Visible when idle) */}
      {uploadState === 'idle' && (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-16 flex flex-col items-center justify-center transition-colors hover:bg-gray-50 hover:border-indigo-400">
          <UploadCloud className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">Drag and drop documents here</h3>
          <p className="text-sm text-gray-500 mb-6">Supports PDF, DOCX, TXT, and scanned images (OCR enabled).</p>
          
          <label className="relative cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors">
            <span>Browse Files</span>
            <input type="file" className="sr-only" onChange={handleFileUpload} />
          </label>
          <p className="text-xs text-gray-400 mt-4">Demo mode: Click 'Browse Files' to simulate upload.</p>
        </div>
      )}

      {/* Uploading & Processing State */}
      {(uploadState === 'uploading' || uploadState === 'processing') && (
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-12 text-center max-w-2xl mx-auto mt-10">
          {uploadState === 'uploading' ? (
            <>
              <UploadCloud className="w-12 h-12 text-indigo-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-medium text-gray-900 mb-4">Uploading Document...</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
              </div>
              <p className="text-sm text-gray-500">{uploadProgress}% Complete</p>
            </>
          ) : (
            <>
              <RefreshCw className="w-12 h-12 text-indigo-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI Extraction Pipeline Active</h3>
              <div className="space-y-3 mt-6 text-sm text-gray-600 text-left max-w-xs mx-auto">
                <p className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Performing OCR text recognition...</p>
                <p className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Running Named Entity Recognition (NER)...</p>
                <p className="flex items-center animate-pulse"><RefreshCw className="w-4 h-4 text-indigo-500 mr-2 animate-spin" /> Mapping relational edges...</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Results View */}
      {uploadState === 'complete' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          
          <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-indigo-600 mr-3" />
              <div>
                <h3 className="text-sm font-bold text-gray-900">FIR_CyberCell_2026_9021.pdf</h3>
                <p className="text-xs text-gray-500">Processed successfully • 5 Key Entities Extracted</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button onClick={resetProcessor} className="text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 px-3 py-1.5 rounded bg-white">
                Upload Another
              </button>
              <button onClick={handleSyncToGraph} className="flex items-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded shadow-sm">
                <Database className="w-4 h-4 mr-2" />
                Sync to Case Graph
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column: Original Text with Highlights */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[500px]">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Source Document Viewer</h2>
              </div>
              <div className="p-6 overflow-y-auto flex-1 font-serif text-gray-800 leading-relaxed text-sm">
                <p className="mb-4"><strong>FIRST INFORMATION REPORT</strong></p>
                <p className="mb-4">
                  Based on intelligence gathered, it is suspected that an organized syndicate is operating from <span className="bg-green-200 px-1 font-medium rounded cursor-pointer border-b-2 border-green-400">Sector 62, Noida</span>. 
                  The primary operative, identified as <span className="bg-blue-200 px-1 font-medium rounded cursor-pointer border-b-2 border-blue-400">Rajesh "Raju" Sharma</span>, was seen coordinating via telephonic communication.
                </p>
                <p className="mb-4">
                  CDR analysis of the primary suspect's number <span className="bg-orange-200 px-1 font-medium rounded cursor-pointer border-b-2 border-orange-400">+91 98765 43210</span> reveals frequent contact with offshore nodes. 
                  Following the calls, a sum of ₹42,00,000 was layered into <span className="bg-purple-200 px-1 font-medium rounded cursor-pointer border-b-2 border-purple-400">HDFC A/C ****9041</span>.
                </p>
                <p>
                  A suspicious vehicle, bearing registration <span className="bg-gray-300 px-1 font-medium rounded cursor-pointer border-b-2 border-gray-500">AP-16-CD-5678</span>, was captured by ANPR cameras leaving the vicinity shortly after the financial transaction was executed.
                </p>
              </div>
            </div>

            {/* Right Column: Extracted Entities List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[500px]">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Extracted Intelligence Nodes</h2>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full">5 Identified</span>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto space-y-3">
                
                {/* Warning Card */}
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4 flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    <strong>AI Note:</strong> 3 of these entities already exist in the global registry. Syncing will create new relational edges between them in Case #26189.
                  </p>
                </div>

                {/* Entity List */}
                {extractedEntities.map((entity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${entity.bg}`}>
                        <entity.icon className={`w-4 h-4 ${entity.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{entity.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Found 1 occurrence</p>
                      </div>
                    </div>
                    <div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-md ${entity.color} ${entity.labelBg}`}>
                        {entity.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}