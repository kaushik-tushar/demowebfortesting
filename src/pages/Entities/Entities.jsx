import React, { useMemo, useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { 
  Users, 
  Search, 
  Filter, 
  User, 
  Phone, 
  Building2, 
  CreditCard, 
  ChevronRight, 
  ShieldAlert, 
  Plus, 
  Download, 
  ArrowUpDown, 
  Activity, 
  MapPin, 
  FileText, 
  Network, 
  SlidersHorizontal, 
  X, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react'; 
 
export default function Entities() { 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [typeFilter, setTypeFilter] = useState('ALL'); 
  const [statusFilter, setStatusFilter] = useState('ALL'); 
  const [sortField, setSortField] = useState('riskScore'); 
 
  // Modals State 
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); 
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); 
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success 
 
  // Form State 
  const [formData, setFormData] = useState({ 
    name: '', 
    type: 'SUSPECT', 
    role: '', 
    firNo: '', 
    riskScore: 50, 
    status: 'INVESTIGATING', 
    primaryIdentifier: '' 
  }); 
 
  // Master Entity Registry Data
  const [entities, setEntities] = useState([ 
    { 
      id: 'ENT-801', 
      name: 'Vikram "Raja" Malhotra', 
      type: 'SUSPECT', 
      role: 'Primary Kingpin / Syndicate Operative', 
      linkedCases: ['26189-042', '26189-088'], 
      firNo: 'FIR-2026-NCRB-9021', 
      riskScore: 92, 
      connectionsCount: 12, 
      status: 'UNDER_SURVEILLANCE', 
      lastSeen: '12 Jan 2026 - Noida Sector 62', 
      primaryIdentifier: 'AADHAAR: [Aadhaar Redacted]', 
    }, 
    { 
      id: 'ENT-802', 
      name: '+91 98210-XXXXX', 
      type: 'PHONE', 
      role: 'Burner SIM Line (Tower Dump Link)', 
      linkedCases: ['26189-042'], 
      firNo: 'FIR-2026-NCRB-9021', 
      riskScore: 78, 
      connectionsCount: 5, 
      status: 'FLAGGED', 
      lastSeen: '12 Jan 2026 - CDR Call Peak', 
      primaryIdentifier: 'IMSI: 4044509128XXXXX', 
    }, 
    { 
      id: 'ENT-803', 
      name: 'Apex Horizon Shell Corp Ltd.', 
      type: 'ENTITY', 
      role: 'Offshore Financial Proxy Company', 
      linkedCases: ['26189-088'], 
      firNo: 'FIR-2026-DL-4410', 
      riskScore: 88, 
      connectionsCount: 8, 
      status: 'FROZEN', 
      lastSeen: '05 Feb 2026 - Wire Transfer', 
      primaryIdentifier: 'CIN: U72200DL2024PTC9021', 
    }, 
    { 
      id: 'ENT-804', 
      name: 'Axis Bank Mule Acct #9041', 
      type: 'FINANCIAL', 
      role: 'Mule Account (Money Laundering)', 
      linkedCases: ['26189-042', '26189-088'], 
      firNo: 'FIR-2026-NCRB-9021', 
      riskScore: 65, 
      connectionsCount: 4, 
      status: 'INVESTIGATING', 
      lastSeen: '15 Jan 2026 - ATM Withdrawal', 
      primaryIdentifier: 'IFSC: UTIB0000102', 
    }, 
    { 
      id: 'ENT-805', 
      name: 'Anand "Micro" Verma', 
      type: 'SUSPECT', 
      role: 'Technical Conduit / Mule Recruiter', 
      linkedCases: ['26189-102'], 
      firNo: 'FIR-2026-MH-1102', 
      riskScore: 71, 
      connectionsCount: 6, 
      status: 'DETAINED', 
      lastSeen: '20 Feb 2026 - In Custody', 
      primaryIdentifier: 'PAN: BKPPR9021K', 
    }, 
  ]); 
 
  // Handlers 
  const handleRegisterSubmit = (e) => { 
    e.preventDefault(); 
    const newEntity = { 
      id: `ENT-${Math.floor(Math.random() * 900) + 100}`, 
      ...formData, 
      linkedCases: [], 
      connectionsCount: 0, 
      lastSeen: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} - System Entry`, 
    }; 
      
    setEntities([newEntity, ...entities]); 
    setIsRegisterModalOpen(false); 
    setFormData({ name: '', type: 'SUSPECT', role: '', firNo: '', riskScore: 50, status: 'INVESTIGATING', primaryIdentifier: '' }); // Reset 
  }; 
 
  const handleFileUpload = (e) => { 
    const file = e.target.files[0]; 
    if (!file) return; 
      
    setUploadStatus('uploading'); 
      
    // Simulate processing time 
    setTimeout(() => { 
      // Mocking parsed data addition 
      const mockImport = { 
        id: `ENT-${Math.floor(Math.random() * 900) + 100}`, 
        name: 'Imported Record (Excel)', 
        type: 'FINANCIAL', 
        role: 'Bulk Imported Data Link', 
        linkedCases: ['SYS-IMPORT'], 
        firNo: 'PENDING', 
        riskScore: 45, 
        connectionsCount: 1, 
        status: 'FLAGGED', 
        lastSeen: 'Just now - Data Import', 
        primaryIdentifier: `SYS: ${Math.floor(Math.random() * 100000)}`, 
      }; 
      setEntities(prev => [mockImport, ...prev]); 
      setUploadStatus('success'); 
        
      setTimeout(() => { 
        setIsUploadModalOpen(false); 
        setUploadStatus('idle'); 
      }, 1500); 
    }, 2000); 
  }; 
 
  // Config Maps 
  const getTypeConfig = (type) => { 
    switch (type) { 
      case 'SUSPECT': return { label: 'Individual / Suspect', icon: User, iconClass: 'text-red-600', bgClass: 'bg-red-50', borderClass: 'border-red-100' }; 
      case 'PHONE': return { label: 'CDR Phone Line', icon: Phone, iconClass: 'text-amber-600', bgClass: 'bg-amber-50', borderClass: 'border-amber-100' }; 
      case 'ENTITY': return { label: 'Corporate Entity', icon: Building2, iconClass: 'text-indigo-600', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-100' }; 
      case 'FINANCIAL': return { label: 'Financial Account', icon: CreditCard, iconClass: 'text-cyan-600', bgClass: 'bg-cyan-50', borderClass: 'border-cyan-100' }; 
      default: return { label: 'Entity', icon: Users, iconClass: 'text-slate-500', bgClass: 'bg-slate-50', borderClass: 'border-slate-200' }; 
    } 
  }; 
 
  const getStatusConfig = (status) => { 
    switch (status) { 
      case 'UNDER_SURVEILLANCE': return { label: 'Under Surveillance', className: 'bg-red-50 text-red-700 border-red-200' }; 
      case 'FROZEN': return { label: 'Frozen', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' }; 
      case 'DETAINED': return { label: 'Detained', className: 'bg-amber-50 text-amber-700 border-amber-200' }; 
      case 'FLAGGED': return { label: 'Flagged', className: 'bg-orange-50 text-orange-700 border-orange-200' }; 
      case 'INVESTIGATING': return { label: 'Investigating', className: 'bg-cyan-50 text-cyan-700 border-cyan-200' }; 
      default: return { label: status, className: 'bg-slate-50 text-slate-600 border-slate-200' }; 
    } 
  }; 
 
  const getRiskConfig = (score) => { 
    if (score >= 85) return { label: 'Critical', text: 'text-red-600', bar: 'bg-red-500', track: 'bg-red-100' }; 
    if (score >= 70) return { label: 'High', text: 'text-orange-600', bar: 'bg-orange-500', track: 'bg-orange-100' }; 
    return { label: 'Moderate', text: 'text-amber-600', bar: 'bg-amber-500', track: 'bg-amber-100' }; 
  }; 
 
  // Derived State 
  const filteredEntities = useMemo(() => { 
    const query = searchQuery.trim().toLowerCase(); 
    return [...entities] 
      .filter((item) => { 
        const matchesSearch = !query || item.name.toLowerCase().includes(query) || item.role.toLowerCase().includes(query) || item.id.toLowerCase().includes(query) || item.primaryIdentifier.toLowerCase().includes(query) || item.firNo.toLowerCase().includes(query); 
        const matchesType = typeFilter === 'ALL' || item.type === typeFilter; 
        const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter; 
        return matchesSearch && matchesType && matchesStatus; 
      }) 
      .sort((a, b) => { 
        if (sortField === 'riskScore') return b.riskScore - a.riskScore; 
        if (sortField === 'connectionsCount') return b.connectionsCount - a.connectionsCount; 
        if (sortField === 'name') return a.name.localeCompare(b.name); 
        return 0; 
      }); 
  }, [entities, searchQuery, typeFilter, statusFilter, sortField]); 
 
  const summary = useMemo(() => ({ 
    total: entities.length, 
    suspects: entities.filter((e) => e.type === 'SUSPECT').length, 
    highRisk: entities.filter((e) => e.riskScore >= 85).length, 
    monitored: entities.filter((e) => e.status === 'UNDER_SURVEILLANCE' || e.status === 'FLAGGED').length, 
  }), [entities]); 
 
  const resetFilters = () => { 
    setSearchQuery(''); setTypeFilter('ALL'); setStatusFilter('ALL'); setSortField('riskScore'); 
  }; 
 
  const hasActiveFilters = searchQuery || typeFilter !== 'ALL' || statusFilter !== 'ALL'; 
 
  return ( 
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans p-4 md:p-6 lg:p-8"> 
      <div className="max-w-[1600px] mx-auto space-y-6"> 
 
        {/* ========================================================= 
            PAGE HEADER 
        ========================================================= */} 
        <header className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5"> 
          <div> 
            <div className="flex items-center gap-2 mb-2"> 
              <div className="h-7 w-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center"> 
                <Users size={15} className="text-blue-600" /> 
              </div> 
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-blue-700"> 
                Entity Intelligence Registry 
              </span> 
            </div> 
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950"> 
              Target & Suspect Directory 
            </h1> 
            <p className="text-sm text-slate-500 mt-1.5 max-w-3xl"> 
              Central registry for persons, communication identifiers, corporate entities, and financial accounts. 
            </p> 
          </div> 
 
          <div className="flex flex-wrap items-center gap-2"> 
            <button 
              onClick={() => setIsUploadModalOpen(true)} 
              type="button" 
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-slate-300 hover:bg-slate-50 transition shadow-sm" 
            > 
              <Upload size={14} /> 
              Import Excel 
            </button> 
            <button 
              type="button" 
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-slate-300 hover:bg-slate-50 transition shadow-sm" 
            > 
              <Download size={14} /> 
              Export 
            </button> 
            <button 
              onClick={() => setIsRegisterModalOpen(true)} 
              type="button" 
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition shadow-sm" 
            > 
              <Plus size={15} /> 
              Register Entity 
            </button> 
          </div> 
        </header> 
 
        {/* ========================================================= 
            SUMMARY STRIP & FILTERS 
        ========================================================= */} 
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3"> 
          <SummaryCard label="Total Entities" value={summary.total} icon={Users} description="Registry records" /> 
          <SummaryCard label="Individuals" value={summary.suspects} icon={User} description="Suspect profiles" /> 
          <SummaryCard label="High Risk" value={summary.highRisk} icon={ShieldAlert} description="Score ≥ 85" valueClass="text-red-600" /> 
          <SummaryCard label="Monitored" value={summary.monitored} icon={Activity} description="Surveillance / flagged" valueClass="text-orange-600" /> 
        </div> 
 
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm"> 
          <div className="px-4 py-3.5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3"> 
            <div className="flex items-center gap-2"> 
              <SlidersHorizontal size={16} className="text-slate-500" /> 
              <div> 
                <h2 className="text-sm font-semibold text-slate-900">Registry Filters</h2> 
              </div> 
            </div> 
            {hasActiveFilters && ( 
              <button onClick={resetFilters} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition"> 
                <X size={13} /> Clear filters 
              </button> 
            )} 
          </div> 
 
          <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-3"> 
            <div className="lg:col-span-5 relative"> 
              <Search size={15} className="absolute left-3.5 top-3.5 text-slate-400" /> 
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search name, ID, FIR..." className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition" /> 
            </div> 
            <div className="lg:col-span-3 relative"> 
              <Filter size={14} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" /> 
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full h-10 appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer"> 
                <option value="ALL">All Entity Categories</option> 
                <option value="SUSPECT">Individuals / Suspects</option> 
                <option value="PHONE">CDR Phone Lines</option> 
                <option value="ENTITY">Corporate Entities</option> 
                <option value="FINANCIAL">Financial Accounts</option> 
              </select> 
            </div> 
            <div className="lg:col-span-2 relative"> 
              <ShieldAlert size={14} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" /> 
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full h-10 appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer"> 
                <option value="ALL">All Statuses</option> 
                <option value="UNDER_SURVEILLANCE">Under Surveillance</option> 
                <option value="FLAGGED">Flagged</option> 
                <option value="FROZEN">Frozen</option> 
                <option value="DETAINED">Detained</option> 
                <option value="INVESTIGATING">Investigating</option> 
              </select> 
            </div> 
            <div className="lg:col-span-2 relative"> 
              <ArrowUpDown size={14} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" /> 
              <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="w-full h-10 appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer"> 
                <option value="riskScore">Sort: Risk Score</option> 
                <option value="connectionsCount">Sort: Connections</option> 
                <option value="name">Sort: Name</option> 
              </select> 
            </div> 
          </div> 
        </section> 
 
        {/* ========================================================= 
            ENTITY GRID - Adjusted to lg:grid-cols-3 xl:grid-cols-4 and flattened layout
        ========================================================= */} 
        {filteredEntities.length === 0 ? ( 
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm"> 
            <div className="mx-auto h-11 w-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center"> 
              <Search size={18} className="text-slate-400" /> 
            </div> 
            <h3 className="mt-4 text-sm font-semibold text-slate-800">No matching entities</h3> 
            <p className="mt-1 text-xs text-slate-400">Try changing your search terms or clearing filters.</p> 
          </div> 
        ) : ( 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> 
            {filteredEntities.map((item) => {
              const typeConfig = getTypeConfig(item.type);
              const statusConfig = getStatusConfig(item.status);
              const riskConfig = getRiskConfig(item.riskScore);
              const TypeIcon = typeConfig.icon;

              return (
                <article key={item.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 overflow-hidden group flex flex-col">
                  <div className={`h-1 w-full ${riskConfig.bar}`} />
                  <div className="p-3 flex-1 flex flex-col">
                    
                    {/* Header & Status (Combined on one line to save height) */}
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className={`h-8 w-8 rounded-lg border ${typeConfig.borderClass} ${typeConfig.bgClass} flex items-center justify-center shrink-0`}>
                        <TypeIcon size={14} className={typeConfig.iconClass} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-[9px] font-mono font-bold tracking-wide text-blue-600">
                            {item.id}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wide font-bold ${statusConfig.className}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-900 leading-tight truncate group-hover:text-blue-700 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="mt-2.5">
                      <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">Entity Role</span>
                      <p className="text-[11px] text-slate-700 font-medium leading-snug line-clamp-1" title={item.role}>
                        {item.role}
                      </p>
                    </div>

                    {/* Primary Identifier (Flattened to single line) */}
                    <div className="mt-2.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 flex items-center justify-between gap-2">
                      <span className="text-[8px] uppercase tracking-wider font-semibold text-slate-400 shrink-0">ID / Hash</span>
                      <span className="font-mono text-[9px] font-semibold text-slate-700 truncate">
                        {item.primaryIdentifier}
                      </span>
                    </div>

                    {/* Metrics Grid */}
                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                      <div className="rounded-lg border border-slate-200 p-2 bg-white flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] uppercase tracking-wider font-semibold text-slate-400">Risk</span>
                          <span className={`text-[8px] font-bold ${riskConfig.text}`}>{riskConfig.label}</span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className={`text-sm font-bold font-mono leading-none ${riskConfig.text}`}>{item.riskScore}</span>
                        </div>
                        <div className={`h-1 rounded-full ${riskConfig.track} mt-1.5 overflow-hidden`}>
                          <div className={`h-full rounded-full ${riskConfig.bar}`} style={{ width: `${item.riskScore}%` }} />
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-200 p-2 bg-white flex items-center gap-2">
                        <div className="h-7 w-7 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                          <Network size={12} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="text-[8px] uppercase tracking-wider font-semibold text-slate-400 leading-none mb-1">Graph links</div>
                          <div className="text-sm font-bold font-mono text-slate-900 leading-none">
                            {item.connectionsCount} <span className="text-[8px] text-slate-400 font-sans font-normal">nodes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Spacer to push footer to bottom */}
                    <div className="flex-1"></div>

                    {/* Footer (Flattened to single line) */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="min-w-0 flex items-center gap-1.5">
                        <span className="text-[8px] uppercase tracking-wider font-semibold text-slate-400 shrink-0">FIR</span>
                        <span className="text-[9px] font-mono text-slate-600 truncate">{item.firNo}</span>
                      </div>
                      <button className="inline-flex items-center gap-1 shrink-0 px-2 py-1.5 rounded-md bg-slate-900 text-white hover:bg-blue-600 text-[9px] font-semibold transition-colors">
                        Graph <ChevronRight size={10} />
                      </button>
                    </div>

                  </div>
                </article>
              );
            })} 
          </div> 
        )} 
      </div> 
 
      {/* ========================================================= 
          REGISTER MODAL 
      ========================================================= */} 
      {isRegisterModalOpen && ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity"> 
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"> 
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50"> 
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2"> 
                <Plus size={16} className="text-blue-600" /> 
                Register New Entity 
              </h2> 
              <button onClick={() => setIsRegisterModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition"> 
                <X size={18} /> 
              </button> 
            </div> 
              
            <form onSubmit={handleRegisterSubmit} className="p-5 overflow-y-auto space-y-4"> 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                <div className="md:col-span-2"> 
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1.5">Entity Name</label> 
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Vikram Malhotra" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" /> 
                </div> 
                  
                <div> 
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1.5">Entity Type</label> 
                  <select required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none bg-white"> 
                    <option value="SUSPECT">Individual / Suspect</option> 
                    <option value="PHONE">CDR Phone Line</option> 
                    <option value="ENTITY">Corporate Entity</option> 
                    <option value="FINANCIAL">Financial Account</option> 
                  </select> 
                </div> 
 
                <div> 
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1.5">Status</label> 
                  <select required value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none bg-white"> 
                    <option value="INVESTIGATING">Investigating</option> 
                    <option value="FLAGGED">Flagged</option> 
                    <option value="UNDER_SURVEILLANCE">Under Surveillance</option> 
                    <option value="DETAINED">Detained</option> 
                    <option value="FROZEN">Frozen (Assets)</option> 
                  </select> 
                </div> 
 
                <div className="md:col-span-2"> 
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1.5">Role / Description</label> 
                  <input required type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} placeholder="e.g. Syndicate Operative" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition" /> 
                </div> 
 
                <div> 
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1.5">Primary Identifier</label> 
                  <input required type="text" value={formData.primaryIdentifier} onChange={(e) => setFormData({...formData, primaryIdentifier: e.target.value})} placeholder="e.g. PAN: ABCDE1234F" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none font-mono text-xs transition" /> 
                </div> 
 
                <div> 
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1.5">Associated FIR No.</label> 
                  <input required type="text" value={formData.firNo} onChange={(e) => setFormData({...formData, firNo: e.target.value})} placeholder="FIR-2026-..." className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none font-mono text-xs transition" /> 
                </div> 
 
                <div className="md:col-span-2 pt-2"> 
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-2 flex items-center justify-between"> 
                    <span>Initial Risk Score</span> 
                    <span className="text-blue-600 font-bold">{formData.riskScore}/100</span> 
                  </label> 
                  <input type="range" min="0" max="100" value={formData.riskScore} onChange={(e) => setFormData({...formData, riskScore: parseInt(e.target.value)})} className="w-full accent-blue-600" /> 
                </div> 
              </div> 
 
              <div className="pt-4 mt-2 border-t border-slate-100 flex gap-3 justify-end"> 
                <button type="button" onClick={() => setIsRegisterModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg transition">Cancel</button> 
                <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition">Save Entity</button> 
              </div> 
            </form> 
          </div> 
        </div> 
      )} 
 
      {/* ========================================================= 
          UPLOAD EXCEL MODAL 
      ========================================================= */} 
      {isUploadModalOpen && ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity"> 
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-200 overflow-hidden flex flex-col"> 
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50"> 
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2"> 
                <FileSpreadsheet size={16} className="text-emerald-600" /> 
                Import Excel Data 
              </h2> 
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition"> 
                <X size={18} /> 
              </button> 
            </div> 
              
            <div className="p-6"> 
              {uploadStatus === 'idle' && ( 
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-blue-400 transition cursor-pointer relative group"> 
                  <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /> 
                  <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"> 
                    <Upload size={24} /> 
                  </div> 
                  <p className="text-sm font-semibold text-slate-900 mb-1">Click or drag Excel file here</p> 
                  <p className="text-xs text-slate-400">Supports .xlsx, .xls, .csv up to 10MB</p> 
                </div> 
              )} 
 
              {uploadStatus === 'uploading' && ( 
                <div className="py-12 flex flex-col items-center justify-center text-center"> 
                  <Loader2 size={32} className="text-blue-600 animate-spin mb-4" /> 
                  <p className="text-sm font-semibold text-slate-900">Processing bulk upload...</p> 
                  <p className="text-xs text-slate-400 mt-1">Validating entity constraints</p> 
                </div> 
              )} 
 
              {uploadStatus === 'success' && ( 
                <div className="py-12 flex flex-col items-center justify-center text-center"> 
                  <CheckCircle2 size={40} className="text-emerald-500 mb-4" /> 
                  <p className="text-sm font-semibold text-slate-900">Upload Complete</p> 
                  <p className="text-xs text-slate-500 mt-1">Records successfully appended to registry.</p> 
                </div> 
              )} 
            </div> 
          </div> 
        </div> 
      )} 
    </div> 
  ); 
} 
 
function SummaryCard({ label, value, icon: Icon, description, valueClass = 'text-slate-900' }) { 
  return ( 
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"> 
      <div className="flex items-start justify-between gap-2"> 
        <div> 
          <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 leading-tight">{label}</p> 
          <p className={`text-xl font-bold mt-0.5 leading-none ${valueClass}`}>{value}</p> 
          <p className="text-[9px] text-slate-400 mt-1 leading-tight">{description}</p> 
        </div> 
        <div className="h-7 w-7 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0"> 
          <Icon size={13} className="text-slate-500" /> 
        </div> 
      </div> 
    </div> 
  ); 
}