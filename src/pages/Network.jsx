import React, { useMemo, useState } from 'react';
import {
  Network as NetworkIcon,
  Search,
  RefreshCw,
  User,
  Radio,
  CheckCircle2,
  Share2,
  GitFork,
  PlusCircle,
  Car,
  ShieldAlert,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  SlidersHorizontal,
  Phone,
  MapPin,
  Activity,
  Layers,
  ChevronRight,
  Link2,
  Trash2,
  Download,
  Info,
} from 'lucide-react';

export default function Network() {
  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  const [activeTopTab, setActiveTopTab] = useState('Incidents');

  // ---------------------------------------------------------------------------
  // Canvas state
  // ---------------------------------------------------------------------------

  const [zoomLevel, setZoomLevel] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // ---------------------------------------------------------------------------
  // Graph dataset
  // ---------------------------------------------------------------------------

  const [nodes, setNodes] = useState([
    {
      id: 'NODE-1',
      name: 'Ravi Kumar',
      type: 'Suspect',
      role: 'Primary Suspect',
      age: '34 years',
      location: 'Vijayawada',
      status: 'UNDER INVESTIGATION',
      cases: 'Case #2024-001, Case #2024-045',
      threat: 98,
      x: 280,
      y: 160,
    },
    {
      id: 'NODE-2',
      name: 'Mohan Reddy',
      type: 'Suspect',
      role: 'Associate',
      age: '29 years',
      location: 'Guntur',
      status: 'ACTIVE',
      cases: 'Case #2024-012',
      threat: 85,
      x: 160,
      y: 340,
    },
    {
      id: 'NODE-3',
      name: 'Priya Sharma',
      type: 'Suspect',
      role: 'Field Operative',
      age: '27 years',
      location: 'Vijayawada',
      status: 'MONITORED',
      cases: 'Case #2024-021',
      threat: 75,
      x: 440,
      y: 380,
    },
    {
      id: 'NODE-4',
      name: 'Suresh Babu',
      type: 'Suspect',
      role: 'Logistics Handler',
      age: '41 years',
      location: 'Tirupati',
      status: 'WATCHLIST',
      cases: 'Case #2024-031',
      threat: 82,
      x: 380,
      y: 520,
    },
    {
      id: 'NODE-5',
      name: 'Phone Scam',
      type: 'Crime',
      role: 'Financial Fraud',
      status: 'OPEN',
      cases: 'Case #2024-001',
      threat: 90,
      x: 500,
      y: 140,
    },
    {
      id: 'NODE-6',
      name: 'Bank Fraud',
      type: 'Crime',
      role: 'Syndicate Extortion',
      status: 'OPEN',
      cases: 'Case #2024-045',
      threat: 95,
      x: 520,
      y: 250,
    },
    {
      id: 'NODE-7',
      name: 'Gunfor Market',
      type: 'Location',
      role: 'Meeting Point',
      status: 'VERIFIED',
      threat: 60,
      x: 380,
      y: 70,
    },
    {
      id: 'NODE-8',
      name: 'Vijayawada Junction',
      type: 'Location',
      role: 'Transit Hub',
      status: 'VERIFIED',
      threat: 50,
      x: 460,
      y: 300,
    },
    {
      id: 'NODE-9',
      name: 'Trupati Highway',
      type: 'Location',
      role: 'Drop Zone',
      status: 'MONITORED',
      threat: 65,
      x: 600,
      y: 480,
    },
    {
      id: 'NODE-10',
      name: '+91-08***-1234',
      type: 'Phone',
      role: 'Burner Device 1',
      status: 'INTERCEPTED',
      threat: 88,
      x: 420,
      y: 180,
    },
    {
      id: 'NODE-11',
      name: '+91-76***-5678',
      type: 'Phone',
      role: 'Burner Device 2',
      status: 'INTERCEPTED',
      threat: 80,
      x: 260,
      y: 440,
    },
    {
      id: 'NODE-12',
      name: 'AP-08-CD-5678',
      type: 'Vehicle',
      role: 'Escape SUV',
      status: 'TRACKED',
      threat: 82,
      x: 390,
      y: 230,
    },
    {
      id: 'NODE-13',
      name: 'AP-39-AB-1234',
      type: 'Vehicle',
      role: 'Delivery Truck',
      status: 'TRACKED',
      threat: 70,
      x: 540,
      y: 600,
    },
  ]);

  const [links, setLinks] = useState([
    {
      id: 'LINK-1',
      source: 'NODE-1',
      target: 'NODE-5',
      label: 'Phone Scam',
      connectionType: 'Accused',
    },
    {
      id: 'LINK-2',
      source: 'NODE-1',
      target: 'NODE-6',
      label: 'Bank Fraud',
      connectionType: 'Mastermind',
    },
    {
      id: 'LINK-3',
      source: 'NODE-1',
      target: 'NODE-2',
      label: 'Mohan Reddy',
      connectionType: 'Associate',
    },
    {
      id: 'LINK-4',
      source: 'NODE-1',
      target: 'NODE-10',
      label: '+91-08***-1234',
      connectionType: 'Owner',
    },
    {
      id: 'LINK-5',
      source: 'NODE-1',
      target: 'NODE-12',
      label: 'AP-08-CD-5678',
      connectionType: 'Driver',
    },
    {
      id: 'LINK-6',
      source: 'NODE-1',
      target: 'NODE-7',
      label: 'Gunfor Market',
      connectionType: 'Spotted At',
    },
    {
      id: 'LINK-7',
      source: 'NODE-1',
      target: 'NODE-8',
      label: 'Vijayawada Junction',
      connectionType: 'Transit',
    },
    {
      id: 'LINK-8',
      source: 'NODE-2',
      target: 'NODE-11',
      label: '+91-76***-5678',
      connectionType: 'Owner',
    },
    {
      id: 'LINK-9',
      source: 'NODE-4',
      target: 'NODE-9',
      label: 'Trupati Highway',
      connectionType: 'Drop Zone',
    },
    {
      id: 'LINK-10',
      source: 'NODE-4',
      target: 'NODE-13',
      label: 'AP-39-AB-1234',
      connectionType: 'Operator',
    },
  ]);

  const [selectedNode, setSelectedNode] = useState(nodes[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');

  const [exportNotification, setExportNotification] = useState(false);

  // ---------------------------------------------------------------------------
  // Modal state
  // ---------------------------------------------------------------------------

  const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // New node form
  // ---------------------------------------------------------------------------

  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeType, setNewNodeType] = useState('Suspect');
  const [newNodeRole, setNewNodeRole] = useState('Operative');
  const [newNodeThreat, setNewNodeThreat] = useState(80);
  const [newNodeLocation, setNewNodeLocation] = useState('Indore');

  // ---------------------------------------------------------------------------
  // New link form
  // ---------------------------------------------------------------------------

  const [linkSource, setLinkSource] = useState(nodes[0]?.id || '');
  const [linkTarget, setLinkTarget] = useState(nodes[1]?.id || '');
  const [linkConnectionType, setLinkConnectionType] =
    useState('Associated');

  // ---------------------------------------------------------------------------
  // Canvas interaction
  // ---------------------------------------------------------------------------

  const handleMouseDown = (e) => {
    if (
      e.target.dataset &&
      e.target.dataset.canvas === 'true'
    ) {
      setIsDraggingCanvas(true);

      setDragStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDraggingCanvas) return;

    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  // ---------------------------------------------------------------------------
  // Export / reset
  // ---------------------------------------------------------------------------

  const handleExport = () => {
    setExportNotification(true);

    setTimeout(() => {
      setExportNotification(false);
    }, 3000);
  };

  const handleReset = () => {
    setZoomLevel(100);
    setPan({ x: 0, y: 0 });
    setSearchTerm('');
    setSelectedTypeFilter('All');
    setSelectedNode(nodes[0] || null);
  };

  // ---------------------------------------------------------------------------
  // Remove node
  // ---------------------------------------------------------------------------

  const handleRemoveNode = (nodeId) => {
    const remainingNodes = nodes.filter(
      (node) => node.id !== nodeId
    );

    setNodes(remainingNodes);

    setLinks(
      links.filter(
        (link) =>
          link.source !== nodeId &&
          link.target !== nodeId
      )
    );

    if (selectedNode?.id === nodeId) {
      setSelectedNode(remainingNodes[0] || null);
    }

    if (linkSource === nodeId) {
      setLinkSource(remainingNodes[0]?.id || '');
    }

    if (linkTarget === nodeId) {
      setLinkTarget(remainingNodes[1]?.id || '');
    }
  };

  // ---------------------------------------------------------------------------
  // Create node
  // ---------------------------------------------------------------------------

  const handleCreateNode = (e) => {
    e.preventDefault();

    if (!newNodeName.trim()) return;

    const nextNumber =
      nodes.reduce((max, node) => {
        const number = Number(
          node.id.replace('NODE-', '')
        );

        return Number.isNaN(number)
          ? max
          : Math.max(max, number);
      }, 0) + 1;

    const genId = `NODE-${nextNumber}`;

    const newNode = {
      id: genId,
      name: newNodeName.trim(),
      type: newNodeType,
      role: newNodeRole || 'Operative',
      age: '30 years',
      location: newNodeLocation || 'Not specified',
      status: 'ACTIVE',
      threat: Number(newNodeThreat),
      cases: 'Case #2026-999',
      x: Math.floor(200 + Math.random() * 350),
      y: Math.floor(120 + Math.random() * 420),
    };

    setNodes((prev) => [...prev, newNode]);
    setSelectedNode(newNode);

    setNewNodeName('');
    setNewNodeRole('Operative');
    setNewNodeThreat(80);
    setNewNodeLocation('Indore');

    setIsNodeModalOpen(false);
  };

  // ---------------------------------------------------------------------------
  // Create link
  // ---------------------------------------------------------------------------

  const handleCreateLink = (e) => {
    e.preventDefault();

    if (!linkSource || !linkTarget) return;

    if (linkSource === linkTarget) {
      alert(
        'Source and target nodes cannot be identical.'
      );
      return;
    }

    const targetNodeObj = nodes.find(
      (node) => node.id === linkTarget
    );

    const newLink = {
      id: `LINK-${links.length + 1}`,
      source: linkSource,
      target: linkTarget,
      label: targetNodeObj
        ? targetNodeObj.name
        : 'Connection',
      connectionType:
        linkConnectionType || 'Associated',
    };

    setLinks((prev) => [...prev, newLink]);
    setIsLinkModalOpen(false);
  };

  // ---------------------------------------------------------------------------
  // Node icon
  // ---------------------------------------------------------------------------

  const renderNodeIcon = (type, large = false) => {
    const size = large ? 18 : 14;

    switch (type) {
      case 'Suspect':
        return (
          <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
            <User
              size={size}
              className="text-red-600"
            />
          </div>
        );

      case 'Crime':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
            <ShieldAlert
              size={size}
              className="text-amber-600"
            />
          </div>
        );

      case 'Location':
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <MapPin
              size={size}
              className="text-emerald-600"
            />
          </div>
        );

      case 'Phone':
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Phone
              size={size}
              className="text-blue-600"
            />
          </div>
        );

      case 'Vehicle':
        return (
          <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center">
            <Car
              size={size}
              className="text-violet-600"
            />
          </div>
        );

      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
            <NetworkIcon
              size={size}
              className="text-slate-600"
            />
          </div>
        );
    }
  };

  // ---------------------------------------------------------------------------
  // Config
  // ---------------------------------------------------------------------------

  const getTypeConfig = (type) => {
    const configs = {
      Suspect: {
        label: 'Suspect',
        color: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
        dot: 'bg-red-500',
      },
      Crime: {
        label: 'Crime / Case',
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
      },
      Location: {
        label: 'Location',
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
      },
      Phone: {
        label: 'Phone / Device',
        color: 'text-blue-700',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        dot: 'bg-blue-500',
      },
      Vehicle: {
        label: 'Vehicle',
        color: 'text-violet-700',
        bg: 'bg-violet-50',
        border: 'border-violet-200',
        dot: 'bg-violet-500',
      },
    };

    return (
      configs[type] || {
        label: type,
        color: 'text-slate-700',
        bg: 'bg-slate-50',
        border: 'border-slate-200',
        dot: 'bg-slate-500',
      }
    );
  };

  const getThreatConfig = (score) => {
    if (score >= 90) {
      return {
        label: 'Critical',
        text: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
        bar: 'bg-red-500',
      };
    }

    if (score >= 75) {
      return {
        label: 'High',
        text: 'text-orange-700',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        bar: 'bg-orange-500',
      };
    }

    return {
      label: 'Moderate',
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      bar: 'bg-amber-500',
    };
  };

  // ---------------------------------------------------------------------------
  // Filtered nodes
  // ---------------------------------------------------------------------------

  const filteredNodes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return nodes.filter((node) => {
      const matchesSearch =
        !query ||
        node.name.toLowerCase().includes(query) ||
        node.type.toLowerCase().includes(query) ||
        node.role.toLowerCase().includes(query) ||
        node.id.toLowerCase().includes(query) ||
        (node.location || '')
          .toLowerCase()
          .includes(query);

      const matchesType =
        selectedTypeFilter === 'All' ||
        node.type === selectedTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [nodes, searchTerm, selectedTypeFilter]);

  // ---------------------------------------------------------------------------
  // Summary statistics
  // ---------------------------------------------------------------------------

  const summary = useMemo(() => {
    return {
      total: nodes.length,
      relationships: links.length,
      suspects: nodes.filter(
        (node) => node.type === 'Suspect'
      ).length,
      highRisk: nodes.filter(
        (node) => node.threat >= 85
      ).length,
      locations: nodes.filter(
        (node) => node.type === 'Location'
      ).length,
      devices: nodes.filter(
        (node) => node.type === 'Phone'
      ).length,
    };
  }, [nodes, links]);

  const selectedConnections = selectedNode
    ? links.filter(
        (link) =>
          link.source === selectedNode.id ||
          link.target === selectedNode.id
      )
    : [];

  // ---------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans">
      {/* ===================================================================== */}
      {/* HEADER                                                                */}
      {/* ===================================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="px-4 md:px-6 py-4">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
                <NetworkIcon
                  size={20}
                  className="text-white"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-[0.14em] font-bold text-slate-400">
                    Investigation Workspace
                  </span>

                  <ChevronRight
                    size={12}
                    className="text-slate-300"
                  />

                  <span className="text-[10px] uppercase tracking-[0.14em] font-bold text-slate-500">
                    Network Intelligence
                  </span>
                </div>

                <h1 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                  Criminal Network Analysis
                </h1>

                <p className="mt-1 text-xs text-slate-500">
                  Interactive entity relationship graph for
                  investigation and intelligence analysis.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50">
                <Activity
                  size={14}
                  className="text-emerald-600"
                />

                <span className="text-[11px] font-semibold text-slate-600">
                  Analysis Workspace
                </span>
              </div>

              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
              >
                <Download size={14} />
                Export
              </button>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
              >
                <RefreshCw size={14} />
                Reset View
              </button>
            </div>
          </div>

          {/* Top tabs */}
          <div className="mt-5 flex items-center gap-1 border-b border-slate-100 -mb-4">
            {[
              'Settings',
              'Incidents',
              'i-Core Analysis',
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTopTab(tab)}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition ${
                  activeTopTab === tab
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* SUMMARY                                                               */}
      {/* ===================================================================== */}

      <main className="p-4 md:p-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          <SummaryCard
            label="Entities"
            value={summary.total}
            icon={Layers}
          />

          <SummaryCard
            label="Relationships"
            value={summary.relationships}
            icon={GitFork}
          />

          <SummaryCard
            label="Suspects"
            value={summary.suspects}
            icon={User}
          />

          <SummaryCard
            label="High Risk"
            value={summary.highRisk}
            icon={ShieldAlert}
            accent="red"
          />

          <SummaryCard
            label="Locations"
            value={summary.locations}
            icon={MapPin}
          />

          <SummaryCard
            label="Devices"
            value={summary.devices}
            icon={Phone}
          />
        </div>

        {/* =================================================================== */}
        {/* WORKSPACE                                                           */}
        {/* =================================================================== */}

        <div className="grid grid-cols-12 gap-4">
          {/* ================================================================= */}
          {/* LEFT PANEL                                                        */}
          {/* ================================================================= */}

          <aside className="col-span-12 xl:col-span-3 space-y-4">
            {/* Filters */}
            <section className="bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal
                    size={15}
                    className="text-slate-500"
                  />

                  <h2 className="text-xs font-bold text-slate-800">
                    Graph Filters
                  </h2>
                </div>

                <span className="text-[10px] font-mono text-slate-400">
                  {filteredNodes.length}/{nodes.length}
                </span>
              </div>

              <div className="p-4 space-y-4">
                {/* Search */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">
                    Search entities
                  </label>

                  <div className="relative">
                    <Search
                      size={15}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="text"
                      placeholder="Name, ID, role, location..."
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                      className="w-full h-10 rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                    />
                  </div>
                </div>

                {/* Type filters */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                    Entity type
                  </label>

                  <div className="space-y-1">
                    {[
                      'All',
                      'Suspect',
                      'Crime',
                      'Location',
                      'Phone',
                      'Vehicle',
                    ].map((type) => {
                      const active =
                        selectedTypeFilter === type;

                      const config =
                        type === 'All'
                          ? null
                          : getTypeConfig(type);

                      return (
                        <button
                          key={type}
                          onClick={() =>
                            setSelectedTypeFilter(type)
                          }
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition ${
                            active
                              ? 'bg-slate-900 border-slate-900 text-white'
                              : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {type === 'All' ? (
                              <NetworkIcon size={13} />
                            ) : (
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  config?.dot
                                }`}
                              />
                            )}

                            {type === 'All'
                              ? 'All entities'
                              : config?.label}
                          </span>

                          <span
                            className={`font-mono text-[10px] ${
                              active
                                ? 'text-slate-300'
                                : 'text-slate-400'
                            }`}
                          >
                            {type === 'All'
                              ? nodes.length
                              : nodes.filter(
                                  (node) =>
                                    node.type === type
                                ).length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Analysis settings */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                    Analysis configuration
                  </div>

                  <div className="space-y-2">
                    <SettingRow
                      label="Incident relationships"
                      checked
                    />

                    <SettingRow
                      label="Offense associations"
                      checked
                    />

                    <SettingRow
                      label="District context"
                      checked
                    />

                    <SettingRow
                      label="Reachability — 3 hops"
                      checked
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Entity actions */}
            <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
              <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-3">
                Graph operations
              </div>

              <div className="space-y-2">
                <button
                  onClick={() =>
                    setIsNodeModalOpen(true)
                  }
                  className="w-full h-10 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <PlusCircle size={15} />
                  Add Entity Node
                </button>

                <button
                  onClick={() =>
                    setIsLinkModalOpen(true)
                  }
                  className="w-full h-10 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <Link2 size={15} />
                  Link Entities
                </button>
              </div>
            </section>

            {/* Legend */}
            <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Entity legend
                </span>

                <Layers
                  size={14}
                  className="text-slate-400"
                />
              </div>

              <div className="space-y-2">
                {[
                  ['Suspect', 'red'],
                  ['Crime / Case', 'amber'],
                  ['Location', 'emerald'],
                  ['Phone / Device', 'blue'],
                  ['Vehicle', 'violet'],
                ].map(([label, color]) => (
                  <LegendRow
                    key={label}
                    label={label}
                    color={color}
                  />
                ))}
              </div>
            </section>
          </aside>

          {/* ================================================================= */}
          {/* CENTER GRAPH                                                      */}
          {/* ================================================================= */}

          <section className="col-span-12 xl:col-span-6">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-full min-h-[680px] flex flex-col">
              {/* Graph header */}
              <div className="px-4 py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <GitFork
                      size={15}
                      className="text-slate-500"
                    />

                    <h2 className="text-xs font-bold text-slate-800">
                      Relationship Graph
                    </h2>
                  </div>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Drag the canvas to pan. Select entities
                    to inspect their dossier.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-slate-50 text-[10px] font-mono text-slate-500">
                    ZOOM {zoomLevel}%
                  </div>

                  <div className="flex items-center rounded-lg border border-slate-200 overflow-hidden">
                    <button
                      onClick={() =>
                        setZoomLevel((prev) =>
                          Math.min(prev + 10, 150)
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 text-slate-600"
                      title="Zoom in"
                    >
                      <ZoomIn size={14} />
                    </button>

                    <div className="w-px h-5 bg-slate-200" />

                    <button
                      onClick={() =>
                        setZoomLevel((prev) =>
                          Math.max(prev - 10, 50)
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 text-slate-600"
                      title="Zoom out"
                    >
                      <ZoomOut size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Graph viewport */}
              <div
                className={`flex-1 relative overflow-hidden bg-[#f8fafc] ${
                  isDraggingCanvas
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                data-canvas="true"
              >
                {/* Grid */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  data-canvas="true"
                  style={{
                    backgroundImage:
                      'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                    opacity: 0.45,
                  }}
                />

                {/* Canvas label */}
                <div className="absolute top-3 left-3 z-30 pointer-events-none">
                  <div className="px-2.5 py-1.5 rounded-md border border-slate-200 bg-white/95 shadow-sm text-[10px] text-slate-500">
                    Case network • {nodes.length} entities •{' '}
                    {links.length} relationships
                  </div>
                </div>

                {/* Transform layer */}
                <div
                  className="absolute left-0 top-0 w-[2000px] h-[2000px]"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${
                      zoomLevel / 100
                    })`,
                    transformOrigin: '0 0',
                    transition: isDraggingCanvas
                      ? 'none'
                      : 'transform 0.05s ease-out',
                  }}
                  data-canvas="true"
                >
                  {/* SVG relationships */}
                  <svg
                    className="absolute left-0 top-0 w-[2000px] h-[2000px] overflow-visible pointer-events-none"
                  >
                    <defs>
                      <marker
                        id="network-arrow"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto-start-reverse"
                      >
                        <path
                          d="M 0 0 L 10 5 L 0 10 z"
                          fill="#94a3b8"
                        />
                      </marker>
                    </defs>

                    {links.map((link) => {
                      const sourceNode = nodes.find(
                        (node) =>
                          node.id === link.source
                      );

                      const targetNode = nodes.find(
                        (node) =>
                          node.id === link.target
                      );

                      if (
                        !sourceNode ||
                        !targetNode
                      ) {
                        return null;
                      }

                      const visible =
                        filteredNodes.some(
                          (node) =>
                            node.id === sourceNode.id
                        ) &&
                        filteredNodes.some(
                          (node) =>
                            node.id === targetNode.id
                        );

                      if (!visible) return null;

                      return (
                        <g key={link.id}>
                          <path
                            d={`
                              M ${sourceNode.x + 48}
                                ${sourceNode.y + 42}
                              Q ${
                                (sourceNode.x +
                                  targetNode.x) /
                                2 +
                                48
                              }
                                ${
                                  (sourceNode.y +
                                    targetNode.y) /
                                    2 -
                                  20
                                }
                              ${targetNode.x + 48}
                                ${targetNode.y + 42}
                            `}
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="1.5"
                            strokeOpacity="0.75"
                            markerEnd="url(#network-arrow)"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Nodes */}
                  {filteredNodes.map((node) => {
                    const typeConfig =
                      getTypeConfig(node.type);

                    const threatConfig =
                      getThreatConfig(node.threat);

                    const isSelected =
                      selectedNode?.id === node.id;

                    return (
                      <div
                        key={node.id}
                        onMouseDown={(e) =>
                          e.stopPropagation()
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNode(node);
                        }}
                        style={{
                          left: `${node.x}px`,
                          top: `${node.y}px`,
                        }}
                        className={`absolute w-24 rounded-xl border bg-white shadow-sm cursor-pointer transition z-10 pointer-events-auto ${
                          isSelected
                            ? 'border-slate-900 ring-2 ring-slate-900/10 scale-[1.04]'
                            : 'border-slate-200 hover:border-slate-400 hover:shadow-md'
                        }`}
                      >
                        <div className="p-2.5">
                          <div className="flex items-center justify-between">
                            {renderNodeIcon(
                              node.type
                            )}

                            <span
                              className={`text-[8px] font-bold ${
                                threatConfig.text
                              }`}
                            >
                              {node.threat}
                            </span>
                          </div>

                          <div className="mt-2">
                            <div className="font-semibold text-[10px] text-slate-800 truncate">
                              {node.name}
                            </div>

                            <div className="mt-0.5 text-[8px] text-slate-400 truncate">
                              {node.role}
                            </div>
                          </div>

                          <div className="mt-2 h-1 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full ${threatConfig.bar}`}
                              style={{
                                width: `${node.threat}%`,
                              }}
                            />
                          </div>

                          <div className="mt-1.5 flex items-center justify-between">
                            <span
                              className={`text-[7px] font-bold ${typeConfig.color}`}
                            >
                              {node.type}
                            </span>

                            <span className="text-[7px] font-mono text-slate-400">
                              {node.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Empty result */}
                {filteredNodes.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center max-w-xs">
                      <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center mx-auto mb-3">
                        <Search
                          size={18}
                          className="text-slate-400"
                        />
                      </div>

                      <h3 className="text-sm font-bold text-slate-800">
                        No matching entities
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Adjust the search query or entity
                        type filter to restore the graph.
                      </p>
                    </div>
                  </div>
                )}

                {/* Canvas controls */}
                <div
                  className="absolute right-4 bottom-4 z-30 flex items-center rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden"
                  onMouseDown={(e) =>
                    e.stopPropagation()
                  }
                >
                  <button
                    onClick={() =>
                      setZoomLevel((prev) =>
                        Math.min(prev + 10, 150)
                      )
                    }
                    className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 text-slate-600"
                    title="Zoom in"
                  >
                    <ZoomIn size={15} />
                  </button>

                  <div className="w-px h-5 bg-slate-200" />

                  <button
                    onClick={() =>
                      setZoomLevel((prev) =>
                        Math.max(prev - 10, 50)
                      )
                    }
                    className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 text-slate-600"
                    title="Zoom out"
                  >
                    <ZoomOut size={15} />
                  </button>

                  <div className="w-px h-5 bg-slate-200" />

                  <button
                    onClick={() => {
                      setZoomLevel(100);
                      setPan({ x: 0, y: 0 });
                    }}
                    className="w-9 h-9 flex items-center justify-center hover:bg-slate-50 text-slate-600"
                    title="Reset viewport"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 left-4 z-30 pointer-events-none">
                  <div className="px-2.5 py-1.5 rounded-md bg-white/95 border border-slate-200 shadow-sm text-[9px] text-slate-500">
                    Click a node to inspect • Drag canvas
                    to pan
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================= */}
          {/* RIGHT INSPECTOR                                                   */}
          {/* ================================================================= */}

          <aside className="col-span-12 xl:col-span-3">
            <section className="bg-white border border-slate-200 rounded-xl shadow-sm min-h-[680px] flex flex-col">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2
                    size={15}
                    className="text-slate-500"
                  />

                  <div>
                    <h2 className="text-xs font-bold text-slate-800">
                      Entity Inspector
                    </h2>

                    <p className="text-[9px] text-slate-400">
                      Selected node intelligence
                    </p>
                  </div>
                </div>

                {selectedNode && (
                  <button
                    onClick={() =>
                      setSelectedNode(null)
                    }
                    className="w-7 h-7 rounded-md hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {selectedNode ? (
                <div className="p-4 flex flex-col flex-1">
                  {/* Entity identity */}
                  <div className="flex items-start gap-3">
                    {renderNodeIcon(
                      selectedNode.type,
                      true
                    )}

                    <div className="min-w-0">
                      <div
                        className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase ${
                          getTypeConfig(
                            selectedNode.type
                          ).bg
                        } ${
                          getTypeConfig(
                            selectedNode.type
                          ).border
                        } ${
                          getTypeConfig(
                            selectedNode.type
                          ).color
                        }`}
                      >
                        {selectedNode.type}
                      </div>

                      <h3 className="mt-2 text-sm font-bold text-slate-900 break-words">
                        {selectedNode.name}
                      </h3>

                      <p className="mt-0.5 text-[10px] font-mono text-slate-400">
                        {selectedNode.id}
                      </p>
                    </div>
                  </div>

                  {/* Threat score */}
                  <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        Threat score
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-md border text-[9px] font-bold ${
                          getThreatConfig(
                            selectedNode.threat
                          ).bg
                        } ${
                          getThreatConfig(
                            selectedNode.threat
                          ).border
                        } ${
                          getThreatConfig(
                            selectedNode.threat
                          ).text
                        }`}
                      >
                        {
                          getThreatConfig(
                            selectedNode.threat
                          ).label
                        }
                      </span>
                    </div>

                    <div className="mt-2 flex items-end justify-between">
                      <span className="text-2xl font-bold text-slate-900">
                        {selectedNode.threat}
                      </span>

                      <span className="text-[10px] text-slate-400">
                        / 100
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full ${
                          getThreatConfig(
                            selectedNode.threat
                          ).bar
                        }`}
                        style={{
                          width: `${selectedNode.threat}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-4 rounded-xl border border-slate-200 overflow-hidden">
                    <InspectorRow
                      label="Role"
                      value={selectedNode.role}
                    />

                    <InspectorRow
                      label="Age"
                      value={
                        selectedNode.age || 'N/A'
                      }
                    />

                    <InspectorRow
                      label="Location"
                      value={
                        selectedNode.location ||
                        'N/A'
                      }
                    />

                    <InspectorRow
                      label="Cases"
                      value={
                        selectedNode.cases || 'N/A'
                      }
                    />

                    <div className="px-3 py-2.5 flex items-center justify-between gap-3 bg-slate-50">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
                        Status
                      </span>

                      <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[9px] font-bold text-slate-700">
                        {selectedNode.status}
                      </span>
                    </div>
                  </div>

                  {/* Connections */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-xs font-bold text-slate-800">
                          Connections
                        </h3>

                        <p className="text-[9px] text-slate-400">
                          Direct graph relationships
                        </p>
                      </div>

                      <span className="min-w-6 h-6 px-1.5 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold font-mono">
                        {selectedConnections.length}
                      </span>
                    </div>

                    <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                      {selectedConnections.length > 0 ? (
                        selectedConnections.map(
                          (link) => {
                            const otherId =
                              link.source ===
                              selectedNode.id
                                ? link.target
                                : link.source;

                            const otherNode =
                              nodes.find(
                                (node) =>
                                  node.id ===
                                  otherId
                              );

                            return (
                              <div
                                key={link.id}
                                className="rounded-lg border border-slate-200 bg-white p-2.5"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-7 h-7 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                                      <Link2
                                        size={12}
                                        className="text-slate-500"
                                      />
                                    </div>

                                    <span className="text-[10px] font-semibold text-slate-700 truncate">
                                      {otherNode
                                        ? otherNode.name
                                        : link.label}
                                    </span>
                                  </div>

                                  <span className="text-[8px] font-mono text-slate-400 shrink-0">
                                    {link.id}
                                  </span>
                                </div>

                                <div className="mt-2 ml-9">
                                  <span className="inline-flex px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-[8px] font-semibold text-slate-500">
                                    {link.connectionType}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )
                      ) : (
                        <div className="rounded-lg border border-dashed border-slate-200 p-5 text-center">
                          <p className="text-[10px] text-slate-400">
                            No direct relationships
                            recorded.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-5">
                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <Info
                          size={13}
                          className="text-blue-600 shrink-0 mt-0.5"
                        />

                        <p className="text-[9px] leading-4 text-blue-800">
                          Graph relationships shown here
                          represent the current prototype
                          investigation dataset.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleRemoveNode(
                          selectedNode.id
                        )
                      }
                      className="w-full h-9 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition flex items-center justify-center gap-2"
                    >
                      <Trash2 size={13} />
                      Remove Entity
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-[220px]">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto">
                      <NetworkIcon
                        size={20}
                        className="text-slate-400"
                      />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-800">
                      No entity selected
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Select an entity in the relationship
                      graph to inspect its intelligence
                      record.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </aside>
        </div>

        {/* =================================================================== */}
        {/* TIMELINE                                                            */}
        {/* =================================================================== */}

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <Activity
                size={15}
                className="text-slate-500"
              />

              <div>
                <h2 className="text-xs font-bold text-slate-800">
                  Temporal Incident Timeline
                </h2>

                <p className="text-[9px] text-slate-400">
                  Activity density across the selected
                  investigation period
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono text-slate-400">
              JUN '07 — SEP '08
            </span>
          </div>

          <div className="p-4">
            <div className="h-20 rounded-lg border border-slate-200 bg-slate-50 relative overflow-hidden">
              <div className="absolute inset-x-3 bottom-3 top-3 flex items-end gap-1">
                {[
                  20,
                  35,
                  50,
                  70,
                  85,
                  60,
                  40,
                  30,
                  80,
                  95,
                  65,
                  45,
                  30,
                  60,
                  85,
                  90,
                  70,
                  50,
                  40,
                  75,
                  90,
                ].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 min-w-0"
                  >
                    <div
                      className="w-full rounded-t bg-slate-300 hover:bg-slate-500 transition"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="absolute left-[25%] right-[25%] top-2 bottom-2 border border-slate-400 bg-white/40 rounded-md pointer-events-none" />

              <div className="absolute left-3 bottom-1 text-[8px] text-slate-400 font-mono">
                2007
              </div>

              <div className="absolute right-3 bottom-1 text-[8px] text-slate-400 font-mono">
                2008
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* FOOTER CONTEXT                                                      */}
        {/* =================================================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-1">
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <CheckCircle2
              size={12}
              className="text-emerald-600"
            />

            <span>
              Graph workspace operational • Local prototype
              dataset loaded
            </span>
          </div>

          <div className="text-[10px] font-mono text-slate-400">
            {summary.total} NODES • {summary.relationships}{' '}
            LINKS
          </div>
        </div>
      </main>

      {/* ===================================================================== */}
      {/* ADD ENTITY MODAL                                                      */}
      {/* ===================================================================== */}

      {isNodeModalOpen && (
        <ModalOverlay
          onClose={() => setIsNodeModalOpen(false)}
        >
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <ModalHeader
              icon={PlusCircle}
              title="Add Entity Node"
              subtitle="Create an entity for the current investigation graph."
              onClose={() =>
                setIsNodeModalOpen(false)
              }
            />

            <form
              onSubmit={handleCreateNode}
              className="p-5 space-y-4"
            >
              <FormField label="Entity Name">
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singh"
                  value={newNodeName}
                  onChange={(e) =>
                    setNewNodeName(e.target.value)
                  }
                  className={inputClass}
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Entity Type">
                  <select
                    value={newNodeType}
                    onChange={(e) =>
                      setNewNodeType(e.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="Suspect">
                      Suspect
                    </option>
                    <option value="Crime">
                      Crime
                    </option>
                    <option value="Location">
                      Location
                    </option>
                    <option value="Phone">
                      Phone
                    </option>
                    <option value="Vehicle">
                      Vehicle
                    </option>
                  </select>
                </FormField>

                <FormField label="Threat Score">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newNodeThreat}
                    onChange={(e) =>
                      setNewNodeThreat(
                        e.target.value
                      )
                    }
                    className={inputClass}
                  />
                </FormField>
              </div>

              <FormField label="Role / Designation">
                <input
                  type="text"
                  value={newNodeRole}
                  onChange={(e) =>
                    setNewNodeRole(e.target.value)
                  }
                  placeholder="e.g. Accomplice"
                  className={inputClass}
                />
              </FormField>

              <FormField label="Location">
                <input
                  type="text"
                  value={newNodeLocation}
                  onChange={(e) =>
                    setNewNodeLocation(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Vijayawada"
                  className={inputClass}
                />
              </FormField>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setIsNodeModalOpen(false)
                  }
                  className="px-4 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center gap-2"
                >
                  <PlusCircle size={14} />
                  Save Entity
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* ===================================================================== */}
      {/* ADD LINK MODAL                                                        */}
      {/* ===================================================================== */}

      {isLinkModalOpen && (
        <ModalOverlay
          onClose={() => setIsLinkModalOpen(false)}
        >
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <ModalHeader
              icon={Link2}
              title="Establish Relationship"
              subtitle="Create a relationship between two graph entities."
              onClose={() =>
                setIsLinkModalOpen(false)
              }
            />

            <form
              onSubmit={handleCreateLink}
              className="p-5 space-y-4"
            >
              <FormField label="Source Entity">
                <select
                  value={linkSource}
                  onChange={(e) =>
                    setLinkSource(e.target.value)
                  }
                  className={inputClass}
                >
                  {nodes.map((node) => (
                    <option
                      key={node.id}
                      value={node.id}
                    >
                      {node.id} — {node.name}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Target Entity">
                <select
                  value={linkTarget}
                  onChange={(e) =>
                    setLinkTarget(e.target.value)
                  }
                  className={inputClass}
                >
                  {nodes.map((node) => (
                    <option
                      key={node.id}
                      value={node.id}
                    >
                      {node.id} — {node.name}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Relationship Type">
                <input
                  type="text"
                  required
                  placeholder="e.g. Associate, Owner, Mastermind"
                  value={linkConnectionType}
                  onChange={(e) =>
                    setLinkConnectionType(
                      e.target.value
                    )
                  }
                  className={inputClass}
                />
              </FormField>

              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                <div className="flex items-start gap-2">
                  <Info
                    size={14}
                    className="text-blue-600 shrink-0 mt-0.5"
                  />

                  <p className="text-[10px] leading-4 text-blue-800">
                    The relationship will be added to
                    the current prototype graph and will
                    appear in the entity inspector.
                  </p>
                </div>
              </div>

              <div className="pt-1 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setIsLinkModalOpen(false)
                  }
                  className="px-4 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center gap-2"
                >
                  <Link2 size={14} />
                  Link Entities
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* ===================================================================== */}
      {/* EXPORT TOAST                                                          */}
      {/* ===================================================================== */}

      {exportNotification && (
        <div className="fixed right-5 bottom-5 z-[70] max-w-sm rounded-xl border border-emerald-200 bg-white shadow-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2
                size={16}
                className="text-emerald-600"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800">
                Intelligence graph compiled
              </p>

              <p className="text-[10px] text-slate-400">
                Export package prepared successfully.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Reusable Components
// =============================================================================

const inputClass =
  'w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100';

function SummaryCard({
  label,
  value,
  icon: Icon,
  accent = 'slate',
}) {
  const accentClasses = {
    slate: {
      icon: 'text-slate-600',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
    },
    red: {
      icon: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
  };

  const config =
    accentClasses[accent] || accentClasses.slate;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
          {label}
        </span>

        <div
          className={`w-7 h-7 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center`}
        >
          <Icon
            size={14}
            className={config.icon}
          />
        </div>
      </div>

      <div className="mt-3 text-xl font-bold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

function SettingRow({ label, checked = false }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="w-3.5 h-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-200"
      />

      <span className="text-[10px] font-medium text-slate-600">
        {label}
      </span>
    </label>
  );
}

function LegendRow({ label, color }) {
  const classes = {
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    violet: 'bg-violet-500',
  };

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`w-2.5 h-2.5 rounded-full ${
          classes[color] || 'bg-slate-400'
        }`}
      />

      <span className="text-[10px] text-slate-600">
        {label}
      </span>
    </div>
  );
}

function InspectorRow({ label, value }) {
  return (
    <div className="px-3 py-2.5 border-b border-slate-100 last:border-b-0 flex items-start justify-between gap-3">
      <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 shrink-0">
        {label}
      </span>

      <span className="text-[10px] font-medium text-slate-700 text-right break-words max-w-[170px]">
        {value}
      </span>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5">
        {label}
      </label>

      {children}
    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={onClose}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full"
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({
  icon: Icon,
  title,
  subtitle,
  onClose,
}) {
  return (
    <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
          <Icon
            size={17}
            className="text-slate-600"
          />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-0.5 text-[10px] leading-4 text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-7 h-7 rounded-md hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
      >
        <X size={15} />
      </button>
    </div>
  );
}