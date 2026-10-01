import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Network,
  Search,
  RefreshCw,
  Phone,
  User,
  CheckCircle2,
  GitFork,
  PlusCircle,
  Car,
  ShieldAlert,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  SlidersHorizontal,
  MapPin,
  Activity,
  Download,
  Link2,
  ChevronRight,
  Building2,
} from 'lucide-react';
import { useAppStore } from '../store/appStore';
import neo4j from 'neo4j-driver';

const NEO4J_URI = 'neo4j+s://83d392b4.databases.neo4j.io';
const NEO4J_USERNAME = '83d392b4';
const NEO4J_PASSWORD = 'xlB8rIu5gJlptJInn84lZBitYP7NBhMa3OK0avPC7Uw';
const NEO4J_DATABASE = '83d392b4';

const toJsValue = (value) => {
  if (neo4j.isInt(value)) return value.toNumber();
  if (Array.isArray(value)) return value.map(toJsValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, toJsValue(item)])
    );
  }
  return value;
};

const toNumber = (value, fallback = 0) => {
  const converted = toJsValue(value);
  const number = Number(converted);
  return Number.isFinite(number) ? number : fallback;
};

const getNodeProperty = (properties, keys) => {
  for (const key of keys) {
    if (
      properties[key] !== undefined &&
      properties[key] !== null &&
      String(properties[key]).trim() !== ''
    ) {
      return toJsValue(properties[key]);
    }
  }
  return undefined;
};

const normalizeNodeType = (labels = [], properties = {}) => {
  const rawType = getNodeProperty(properties, ['type', 'entityType', 'entity_type', 'category']);
  const labelText = [...(labels || []), rawType].filter(Boolean).join(' ').toLowerCase();

  if (labelText.includes('suspect') || labelText.includes('person') || labelText.includes('criminal')) return 'Suspect';
  if (labelText.includes('crime') || labelText.includes('incident') || labelText.includes('case')) return 'Crime';
  if (labelText.includes('location') || labelText.includes('place') || labelText.includes('address')) return 'Location';
  if (labelText.includes('phone') || labelText.includes('mobile') || labelText.includes('sim')) return 'Phone';
  if (labelText.includes('vehicle') || labelText.includes('car') || labelText.includes('bike')) return 'Vehicle';
  return 'Network';
};

const getNodeLabel = (properties, fallbackId) => {
  const label = getNodeProperty(properties, ['name', 'fullName', 'full_name', 'title', 'label', 'phone', 'number', 'accountNumber']);
  return label !== undefined ? String(label) : String(fallbackId);
};

const getNodeRiskScore = (properties) =>
  Math.max(0, Math.min(100, toNumber(getNodeProperty(properties, ['riskScore', 'risk_score', 'risk', 'score']), 0)));

export default function LinkAnalysis() {
  const { activeCaseId } = useAppStore();

  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [graphSearchQuery, setGraphSearchQuery] = useState('');

  // Modals
  const [addEntityModalOpen, setAddEntityModalOpen] = useState(false);
  const [addLinkModalOpen, setAddLinkModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [shortestPathModalOpen, setShortestPathModalOpen] = useState(false);

  // Form states
  const [newNodeType, setNewNodeType] = useState('Suspect');
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeDetail, setNewNodeDetail] = useState('');
  const [newNodeLocation, setNewNodeLocation] = useState('');
  const [linkSourceId, setLinkSourceId] = useState('');
  const [linkTargetId, setLinkTargetId] = useState('');
  const [linkRelation, setLinkRelation] = useState('Communicates With');
  const [pathSourceId, setPathSourceId] = useState('');
  const [pathTargetId, setPathTargetId] = useState('');

  // Canvas / Pan Zoom & Drag
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [canvasDragStart, setCanvasDragStart] = useState({ x: 0, y: 0 });
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [nodeDragOffset, setNodeDragOffset] = useState({ x: 0, y: 0 });
  const [notificationToast, setNotificationToast] = useState('');

  const containerRef = useRef(null);
  const neo4jDriverRef = useRef(null);

  if (!neo4jDriverRef.current) {
    neo4jDriverRef.current = neo4j.driver(
      NEO4J_URI,
      neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD),
      { disableLosslessIntegers: true }
    );
  }

  const neo4jDriver = neo4jDriverRef.current;

  const triggerToast = (message) => {
    setNotificationToast(message);
    window.setTimeout(() => setNotificationToast(''), 3000);
  };

  const loadGraph = async () => {
    setLoading(true);
    let session;
    try {
      await neo4jDriver.verifyConnectivity();
      session = neo4jDriver.session({ database: NEO4J_DATABASE });

      const nodeResult = await session.run(`MATCH (n) RETURN n LIMIT 50`);
      const relationshipResult = await session.run(`MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 50`);

      const nodeMap = new Map();
      nodeResult.records.forEach((record, index) => {
        const n = record.get('n');
        const props = toJsValue(n.properties || {});
        const id = String(props.id ?? props.entityId ?? n.elementId);

        // Scattered grid layout matching dashboard aesthetic
        const col = index % 4;
        const row = Math.floor(index / 4);

        nodeMap.set(id, {
          id,
          label: getNodeLabel(props, id),
          type: normalizeNodeType(n.labels, props),
          riskScore: getNodeRiskScore(props),
          x: Number(props.x) || 100 + col * 280,
          y: Number(props.y) || 100 + row * 220,
          details: props,
        });
      });

      const links = [];
      const seenLinks = new Set();
      relationshipResult.records.forEach((record) => {
        const sourceNode = record.get('n');
        const relationship = record.get('r');
        const targetNode = record.get('m');
        const sourceProps = toJsValue(sourceNode.properties || {});
        const targetProps = toJsValue(targetNode.properties || {});

        const source = String(sourceProps.id ?? sourceNode.elementId);
        const target = String(targetProps.id ?? targetNode.elementId);
        const relation = String(relationship.type || 'RELATED_TO');
        const key = `${source}|${target}|${relation}`;

        if (!nodeMap.has(source)) {
          nodeMap.set(source, { id: source, label: getNodeLabel(sourceProps, source), type: 'Network', riskScore: 50, x: 200, y: 200, details: sourceProps });
        }
        if (!nodeMap.has(target)) {
          nodeMap.set(target, { id: target, label: getNodeLabel(targetProps, target), type: 'Network', riskScore: 50, x: 400, y: 400, details: targetProps });
        }

        if (!seenLinks.has(key)) {
          seenLinks.add(key);
          links.push({ source, target, relation });
        }
      });

      const nodes = Array.from(nodeMap.values());
      setGraphData({ nodes, links });
      if (nodes.length) {
        setLinkSourceId(nodes[0].id);
        setLinkTargetId(nodes[1]?.id || nodes[0].id);
      }
      triggerToast(`Loaded ${nodes.length} entities and ${links.length} relationships.`);
    } catch (error) {
      console.error('Neo4j load error:', error);
      triggerToast('Failed to load Neo4j graph data.');
    } finally {
      if (session) await session.close();
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGraph();
  }, [activeCaseId]);

  const summaryCounts = useMemo(() => ({
    suspects: graphData.nodes.filter((n) => n.type === 'Suspect').length,
    crimes: graphData.nodes.filter((n) => n.type === 'Crime').length,
    locations: graphData.nodes.filter((n) => n.type === 'Location').length,
    vehicles: graphData.nodes.filter((n) => n.type === 'Vehicle').length,
    phones: graphData.nodes.filter((n) => n.type === 'Phone').length,
  }), [graphData.nodes]);

  const filteredNodes = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return graphData.nodes.filter((n) => {
      const matchSearch = !q || String(n.label).toLowerCase().includes(q) || String(n.id).toLowerCase().includes(q);
      const matchType = selectedTypeFilter === 'All' || n.type === selectedTypeFilter;
      return matchSearch && matchType;
    });
  }, [graphData.nodes, searchTerm, selectedTypeFilter]);

  const associatedNodeIds = useMemo(() => {
    if (!graphSearchQuery.trim()) return null;
    const q = graphSearchQuery.trim().toLowerCase();
    const matched = graphData.nodes.filter((n) => String(n.label).toLowerCase().includes(q) || String(n.id).toLowerCase().includes(q));
    if (!matched.length) return new Set();

    const ids = new Set(matched.map((n) => n.id));
    graphData.links.forEach((l) => {
      if (ids.has(l.source)) ids.add(l.target);
      if (ids.has(l.target)) ids.add(l.source);
    });
    return ids;
  }, [graphSearchQuery, graphData.nodes, graphData.links]);

  const handleMouseDownCanvas = (e) => {
    if (draggingNodeId) return;
    setIsDraggingCanvas(true);
    setCanvasDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleNodeMouseDown = (e, node) => {
    e.stopPropagation();
    setDraggingNodeId(node.id);
    setNodeDragOffset({
      x: e.clientX / zoomLevel - node.x,
      y: e.clientY / zoomLevel - node.y,
    });
    setSelectedNode(node);
  };

  const handleMouseMove = (e) => {
    if (draggingNodeId) {
      const newX = e.clientX / zoomLevel - nodeDragOffset.x;
      const newY = e.clientY / zoomLevel - nodeDragOffset.y;
      setGraphData((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) => (n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n)),
      }));
      return;
    }
    if (!isDraggingCanvas) return;
    setPanPosition({ x: e.clientX - canvasDragStart.x, y: e.clientY - canvasDragStart.y });
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
    setDraggingNodeId(null);
  };

  const getNodeConfig = (type) => {
    switch (type) {
      case 'Suspect': return { icon: User, iconClass: 'text-blue-600', iconBg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' };
      case 'Crime': return { icon: ShieldAlert, iconClass: 'text-violet-600', iconBg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700' };
      case 'Location': return { icon: MapPin, iconClass: 'text-emerald-600', iconBg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' };
      case 'Phone': return { icon: Phone, iconClass: 'text-pink-600', iconBg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700' };
      case 'Vehicle': return { icon: Car, iconClass: 'text-amber-600', iconBg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' };
      default: return { icon: Network, iconClass: 'text-slate-600', iconBg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-700' };
    }
  };

  const getRiskClass = (score) => {
    if (score >= 90) return 'text-red-600';
    if (score >= 80) return 'text-orange-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const getRiskBg = (score) => {
    if (score >= 90) return 'bg-red-500/10 border-red-500/20';
    if (score >= 80) return 'bg-orange-500/10 border-orange-500/20';
    if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-emerald-500/10 border-emerald-500/20';
  };

  return (
    <div
      className="min-h-full bg-[#f6f8fb] text-slate-900 p-4 md:p-6 font-sans select-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {notificationToast && (
        <div className="fixed right-5 top-5 z-[100] flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800 shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          {notificationToast}
        </div>
      )}

      <div className="mx-auto flex max-w-[1700px] flex-col gap-5">
        {/* Header */}
        <header className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                <Network className="h-4 w-4 text-blue-600" />
                CrimeGraph AI
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                Link Analysis
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Criminal Network Analysis (Neo4j Live)
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setAddEntityModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                <PlusCircle className="h-4 w-4" /> Add Entity
              </button>
              <button
                onClick={() => setAddLinkModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300"
              >
                <Link2 className="h-4 w-4" /> Add Link
              </button>
              <button
                onClick={loadGraph}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>
          </div>
        </header>

        {/* Summary metrics */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <SummaryCard icon={User} label="Suspects" value={summaryCounts.suspects} tone="red" />
          <SummaryCard icon={ShieldAlert} label="Crimes" value={summaryCounts.crimes} tone="violet" />
          <SummaryCard icon={MapPin} label="Locations" value={summaryCounts.locations} tone="emerald" />
          <SummaryCard icon={Phone} label="Phones" value={summaryCounts.phones} tone="amber" />
          <SummaryCard icon={Car} label="Vehicles" value={summaryCounts.vehicles} tone="blue" />
        </div>

        {/* Filters and Search */}
        <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto">
              <div className="flex shrink-0 items-center gap-1.5 pr-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
              </div>
              {['All', 'Suspect', 'Crime', 'Location', 'Phone', 'Vehicle'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedTypeFilter(type)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    selectedTypeFilter === type
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search entity name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none focus:border-blue-400 focus:bg-white"
              />
            </div>
          </div>
        </section>

        {/* Workspace Canvas */}
        <div
          className="grid min-h-[650px] grid-cols-1 gap-4 lg:grid-cols-12"
          onMouseMove={handleMouseMove}
        >
          <section
            ref={containerRef}
            onMouseDown={handleMouseDownCanvas}
            className={`relative min-h-[650px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${
              selectedNode ? 'lg:col-span-9' : 'lg:col-span-12'
            }`}
          >
            {/* Top Canvas Bar with Search */}
            <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Network className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Entity Card Topology</p>
                  <p className="text-[10px] text-slate-500">Drag cards or search connections</p>
                </div>
              </div>

              {/* Graph Search Input */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Find node & relations..."
                  value={graphSearchQuery}
                  onChange={(e) => setGraphSearchQuery(e.target.value)}
                  className="w-48 rounded-lg border border-slate-200 bg-slate-50 py-1 pl-8 pr-3 text-[11px] text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                />
                {graphSearchQuery && (
                  <button onClick={() => setGraphSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            {loading ? (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80">
                <RefreshCw className="mb-3 h-7 w-7 animate-spin text-blue-600" />
                <p className="text-xs font-semibold text-slate-700">Loading network graph...</p>
              </div>
            ) : (
              <div
                className="absolute left-0 top-0 h-[2000px] w-[2000px] transition-transform duration-75"
                style={{
                  transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
              >
                {/* SVG Connections */}
                <svg className="pointer-events-auto absolute inset-0 z-0 h-[2000px] w-[2000px]" viewBox="0 0 2000 2000">
                  {graphData.links.map((link, idx) => {
                    const sourceNode = graphData.nodes.find((n) => n.id === link.source);
                    const targetNode = graphData.nodes.find((n) => n.id === link.target);
                    if (!sourceNode || !targetNode) return null;

                    const x1 = (sourceNode.x || 100) + 110;
                    const y1 = (sourceNode.y || 100) + 40;
                    const x2 = (targetNode.x || 100) + 110;
                    const y2 = (targetNode.y || 100) + 40;
                    const dx = Math.abs(x2 - x1) * 0.4;
                    const pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

                    const isHighlighted = associatedNodeIds === null || (associatedNodeIds.has(link.source) && associatedNodeIds.has(link.target));

                    return (
                      <g key={`${link.source}-${link.target}-${idx}`}>
                        <path
                          d={pathData}
                          fill="none"
                          stroke={isHighlighted ? '#3b82f6' : '#cbd5e1'}
                          strokeWidth={isHighlighted ? '2.5' : '1.5'}
                          strokeOpacity={isHighlighted ? '0.85' : '0.25'}
                          className="cursor-pointer transition hover:stroke-blue-700"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Dashboard-style Entity Cards */}
                {filteredNodes.map((node) => {
                  const config = getNodeConfig(node.type);
                  const Icon = config.icon;
                  const isSelected = selectedNode?.id === node.id;
                  const isHighlighted = associatedNodeIds === null || associatedNodeIds.has(node.id);

                  return (
                    <div
                      key={node.id}
                      onMouseDown={(e) => handleNodeMouseDown(e, node)}
                      style={{
                        left: `${node.x || 100}px`,
                        top: `${node.y || 100}px`,
                        width: '220px',
                      }}
                      className={`absolute z-10 cursor-move rounded-xl border bg-white p-3.5 shadow-md transition ${
                        isSelected
                          ? 'border-blue-600 ring-4 ring-blue-100 shadow-xl'
                          : `${config.border} hover:shadow-lg`
                      } ${!isHighlighted ? 'opacity-30' : 'opacity-100'}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${config.iconBg} ${config.border} ${config.text}`}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-mono text-slate-400">{node.id}</p>
                            <h4 className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{node.label}</h4>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100">
                        <div className="bg-slate-50 p-1.5 rounded text-center">
                          <p className="text-[9px] uppercase tracking-wider text-slate-400">Type</p>
                          <p className={`text-xs font-semibold truncate ${config.text}`}>{node.type}</p>
                        </div>
                        <div className={`p-1.5 rounded text-center border ${getRiskBg(node.riskScore)}`}>
                          <p className="text-[9px] uppercase tracking-wider text-slate-400">Risk</p>
                          <p className={`text-xs font-bold ${getRiskClass(node.riskScore)}`}>{node.riskScore}%</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 z-40 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <button onClick={() => setZoomLevel((p) => Math.min(p + 0.15, 1.8))} className="border-b border-slate-100 p-2.5 text-slate-600 hover:bg-slate-50">
                <ZoomIn className="h-4 w-4" />
              </button>
              <button onClick={() => setZoomLevel((p) => Math.max(p - 0.15, 0.5))} className="border-b border-slate-100 p-2.5 text-slate-600 hover:bg-slate-50">
                <ZoomOut className="h-4 w-4" />
              </button>
              <button onClick={() => { setZoomLevel(1); setPanPosition({ x: 0, y: 0 }); }} className="p-2.5 text-slate-600 hover:bg-slate-50">
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* Inspector Panel */}
          {selectedNode && (
            <aside className="flex min-h-[650px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <p className="text-xs font-bold text-slate-900">Entity Inspector</p>
                <button onClick={() => setSelectedNode(null)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedNode.label}</h3>
                  <p className="font-mono text-[10px] text-slate-400">{selectedNode.id}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] uppercase text-slate-400 font-semibold">Risk Score</p>
                  <p className={`text-lg font-bold ${getRiskClass(selectedNode.riskScore)}`}>{selectedNode.riskScore}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">Properties</p>
                  {selectedNode.details && Object.entries(selectedNode.details).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs py-1 border-b border-slate-100">
                      <span className="text-slate-400">{k}</span>
                      <span className="font-medium text-slate-700">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-200 p-4">
                <button
                  onClick={() => {
                    const id = selectedNode.id;
                    setGraphData((prev) => ({
                      nodes: prev.nodes.filter((n) => n.id !== id),
                      links: prev.links.filter((l) => l.source !== id && l.target !== id),
                    }));
                    setSelectedNode(null);
                    triggerToast('Entity removed.');
                  }}
                  className="w-full rounded-lg border border-red-200 bg-red-50 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                >
                  Remove From Graph
                </button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, tone = 'blue' }) {
  const tones = {
    red: 'bg-red-50 text-red-600',
    violet: 'bg-violet-50 text-violet-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">{value}</span>
      </div>
      <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  );
}