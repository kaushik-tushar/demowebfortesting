import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Network,
  Search,
  RefreshCw,
  Phone,
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
  MapPin,
  Activity,
  AlertTriangle,
  Download,
  Link2,
  Building2,
  ChevronRight,
} from 'lucide-react';
import { useAppStore } from '../store/appStore';

/**
 * CrimeGraph AI
 * Link Analysis / Criminal Network Investigation Workspace
 *
 * Light enterprise UI:
 * - Investigation / case-management visual language
 * - No dark tactical theme
 * - Draggable nodes
 * - Canvas pan + zoom
 * - Entity/link management
 * - Search + type filtering
 */
export default function LinkAnalysis() {
  const { activeCaseId } = useAppStore();

  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });

  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');

  // Modal states
  const [addEntityModalOpen, setAddEntityModalOpen] = useState(false);
  const [addLinkModalOpen, setAddLinkModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [shortestPathModalOpen, setShortestPathModalOpen] = useState(false);

  // New entity form
  const [newNodeType, setNewNodeType] = useState('Suspect');
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeDetail, setNewNodeDetail] = useState('');
  const [newNodeLocation, setNewNodeLocation] = useState('');

  // New link form
  const [linkSourceId, setLinkSourceId] = useState('');
  const [linkTargetId, setLinkTargetId] = useState('');
  const [linkRelation, setLinkRelation] = useState('Communicates With');

  // Path finder
  const [pathSourceId, setPathSourceId] = useState('');
  const [pathTargetId, setPathTargetId] = useState('');

  // Canvas controls
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [canvasDragStart, setCanvasDragStart] = useState({
    x: 0,
    y: 0,
  });

  // Node dragging
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [nodeDragOffset, setNodeDragOffset] = useState({
    x: 0,
    y: 0,
  });

  // Toast
  const [notificationToast, setNotificationToast] = useState('');

  const containerRef = useRef(null);

  const triggerToast = (message) => {
    setNotificationToast(message);

    window.setTimeout(() => {
      setNotificationToast('');
    }, 3000);
  };

  /*
   * ---------------------------------------------------------
   * GRAPH DATA
   * ---------------------------------------------------------
   */

  const loadGraph = async () => {
    setLoading(true);

    try {
      const initialNodes = [
        {
          id: 'ENT-803',
          label: 'Ravi Kumar',
          type: 'Suspect',
          riskScore: 94,
          x: 300,
          y: 250,
          details: {
            role: 'Mastermind',
            age: '34 years',
            location: 'Connaught Place',
          },
        },
        {
          id: 'MKT-101',
          label: 'Guntur Market',
          type: 'Location',
          riskScore: 75,
          x: 150,
          y: 120,
          details: {
            category: 'Meeting Point',
          },
        },
        {
          id: 'SIM-402',
          label: '+91-98***-1234',
          type: 'Phone',
          riskScore: 88,
          x: 550,
          y: 140,
          details: {
            provider: 'Airtel',
            status: 'Active',
          },
        },
        {
          id: 'VEH-202',
          label: 'AP-16-CD-5678',
          type: 'Vehicle',
          riskScore: 82,
          x: 400,
          y: 110,
          details: {
            model: 'White SUV',
          },
        },
        {
          id: 'JCT-303',
          label: 'Vijayawada Junction',
          type: 'Location',
          riskScore: 65,
          x: 600,
          y: 280,
          details: {
            zone: 'Transit Hub',
          },
        },
        {
          id: 'CRM-102',
          label: 'Phone Scam',
          type: 'Crime',
          riskScore: 90,
          x: 720,
          y: 180,
          details: {
            type: 'Financial Fraud',
            amount: '₹1.5 Crores',
          },
        },
        {
          id: 'CRM-103',
          label: 'Bank Fraud',
          type: 'Crime',
          riskScore: 92,
          x: 680,
          y: 420,
          details: {
            type: 'Banking Fraud',
            section: 'IPC 420',
          },
        },
        {
          id: 'MOH-909',
          label: 'Mohan Reddy',
          type: 'Suspect',
          riskScore: 91,
          x: 300,
          y: 500,
          details: {
            role: 'Kingpin',
            status: 'Under Surveillance',
          },
        },
        {
          id: 'SIM-999',
          label: '+91-76***-5678',
          type: 'Phone',
          riskScore: 85,
          x: 480,
          y: 580,
          details: {
            provider: 'Jio',
          },
        },
      ];

      const initialLinks = [
        {
          source: 'ENT-803',
          target: 'MKT-101',
          relation: 'Visited',
        },
        {
          source: 'ENT-803',
          target: 'SIM-402',
          relation: 'Uses Phone',
        },
        {
          source: 'ENT-803',
          target: 'VEH-202',
          relation: 'Drives',
        },
        {
          source: 'ENT-803',
          target: 'JCT-303',
          relation: 'Transit',
        },
        {
          source: 'ENT-803',
          target: 'MOH-909',
          relation: 'Associate',
        },
        {
          source: 'MOH-909',
          target: 'SIM-999',
          relation: 'Uses Phone',
        },
      ];

      setGraphData({
        nodes: initialNodes,
        links: initialLinks,
      });

      if (initialNodes.length > 0) {
        setLinkSourceId(initialNodes[0].id);
        setLinkTargetId(initialNodes[1]?.id || initialNodes[0].id);
        setPathSourceId(initialNodes[0].id);
        setPathTargetId(initialNodes[1]?.id || initialNodes[0].id);
      }
    } catch (error) {
      console.error('Failed to load graph:', error);
      triggerToast('Unable to load investigation graph.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGraph();
  }, [activeCaseId]);

  /*
   * ---------------------------------------------------------
   * DERIVED DATA
   * ---------------------------------------------------------
   */

  const summaryCounts = useMemo(
    () => ({
      suspects: graphData.nodes.filter((node) => node.type === 'Suspect')
        .length,
      crimes: graphData.nodes.filter((node) => node.type === 'Crime').length,
      locations: graphData.nodes.filter(
        (node) => node.type === 'Location'
      ).length,
      vehicles: graphData.nodes.filter((node) => node.type === 'Vehicle')
        .length,
      phones: graphData.nodes.filter((node) => node.type === 'Phone').length,
    }),
    [graphData.nodes]
  );

  const filteredNodes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return graphData.nodes.filter((node) => {
      const matchesSearch =
        !normalizedSearch ||
        node.label.toLowerCase().includes(normalizedSearch) ||
        node.id.toLowerCase().includes(normalizedSearch);

      const matchesType =
        selectedTypeFilter === 'All' ||
        node.type === selectedTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [graphData.nodes, searchTerm, selectedTypeFilter]);

  /*
   * ---------------------------------------------------------
   * ENTITY / LINK MANAGEMENT
   * ---------------------------------------------------------
   */

  const handleAddNodeSubmit = (event) => {
    event.preventDefault();

    if (!newNodeName.trim()) {
      triggerToast('Please provide an entity name.');
      return;
    }

    const newNode = {
      id: `ENT-${Math.floor(1000 + Math.random() * 9000)}`,
      label: newNodeName.trim(),
      type: newNodeType,
      riskScore: Math.floor(70 + Math.random() * 25),
      x: 350 + Math.random() * 150,
      y: 300 + Math.random() * 150,
      details: {
        role: newNodeDetail.trim() || 'Manual Entry',
        location: newNodeLocation.trim() || 'Unknown',
      },
    };

    setGraphData((previous) => ({
      ...previous,
      nodes: [...previous.nodes, newNode],
    }));

    setNewNodeName('');
    setNewNodeDetail('');
    setNewNodeLocation('');
    setAddEntityModalOpen(false);

    triggerToast(`New ${newNodeType.toLowerCase()} added to the graph.`);
  };

  const handleAddLinkSubmit = (event) => {
    event.preventDefault();

    if (!linkSourceId || !linkTargetId) {
      triggerToast('Select both source and target entities.');
      return;
    }

    if (linkSourceId === linkTargetId) {
      triggerToast('Source and target cannot be the same.');
      return;
    }

    const duplicateLink = graphData.links.some(
      (link) =>
        link.source === linkSourceId &&
        link.target === linkTargetId &&
        link.relation === linkRelation
    );

    if (duplicateLink) {
      triggerToast('This relationship already exists.');
      return;
    }

    const newLink = {
      source: linkSourceId,
      target: linkTargetId,
      relation: linkRelation,
    };

    setGraphData((previous) => ({
      ...previous,
      links: [...previous.links, newLink],
    }));

    setAddLinkModalOpen(false);

    triggerToast(`Relationship "${linkRelation}" established.`);
  };

  const handleRemoveSelectedNode = () => {
    if (!selectedNode) return;

    const removedId = selectedNode.id;

    setGraphData((previous) => ({
      nodes: previous.nodes.filter((node) => node.id !== removedId),
      links: previous.links.filter(
        (link) =>
          link.source !== removedId &&
          link.target !== removedId
      ),
    }));

    setSelectedNode(null);

    triggerToast('Entity removed from the current graph.');
  };

  /*
   * ---------------------------------------------------------
   * NODE / CANVAS DRAGGING
   * ---------------------------------------------------------
   */

  const handleMouseDownCanvas = (event) => {
    if (draggingNodeId) return;

    setIsDraggingCanvas(true);

    setCanvasDragStart({
      x: event.clientX - panPosition.x,
      y: event.clientY - panPosition.y,
    });
  };

  const handleNodeMouseDown = (event, node) => {
    event.stopPropagation();

    setDraggingNodeId(node.id);

    setNodeDragOffset({
      x: event.clientX / zoomLevel - node.x,
      y: event.clientY / zoomLevel - node.y,
    });

    setSelectedNode(node);
  };

  const handleMouseMove = (event) => {
    if (draggingNodeId) {
      const newX =
        event.clientX / zoomLevel - nodeDragOffset.x;

      const newY =
        event.clientY / zoomLevel - nodeDragOffset.y;

      setGraphData((previous) => ({
        ...previous,
        nodes: previous.nodes.map((node) =>
          node.id === draggingNodeId
            ? {
                ...node,
                x: newX,
                y: newY,
              }
            : node
        ),
      }));

      return;
    }

    if (!isDraggingCanvas) return;

    setPanPosition({
      x: event.clientX - canvasDragStart.x,
      y: event.clientY - canvasDragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
    setDraggingNodeId(null);
  };

  /*
   * ---------------------------------------------------------
   * GRAPH LINKS
   * ---------------------------------------------------------
   */

  const renderSvgLinks = () => {
    return graphData.links.map((link, index) => {
      const sourceNode = graphData.nodes.find(
        (node) => node.id === link.source
      );

      const targetNode = graphData.nodes.find(
        (node) => node.id === link.target
      );

      if (!sourceNode || !targetNode) return null;

      const x1 = (sourceNode.x || 100) + 90;
      const y1 = (sourceNode.y || 100) + 35;

      const x2 = (targetNode.x || 100) + 90;
      const y2 = (targetNode.y || 100) + 35;

      const dx = Math.abs(x2 - x1) * 0.5;

      const pathData = `
        M ${x1} ${y1}
        C ${x1 + dx} ${y1},
          ${x2 - dx} ${y2},
          ${x2} ${y2}
      `;

      return (
        <g key={`${link.source}-${link.target}-${index}`}>
          <path
            d={pathData}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeOpacity="0.65"
            className="cursor-pointer transition hover:stroke-blue-500"
            onClick={(event) => {
              event.stopPropagation();

              triggerToast(
                `${sourceNode.label} → ${targetNode.label} · ${link.relation}`
              );
            }}
          />
        </g>
      );
    });
  };

  /*
   * ---------------------------------------------------------
   * NODE CONFIG
   * ---------------------------------------------------------
   */

  const getNodeConfig = (type) => {
    switch (type) {
      case 'Suspect':
        return {
          icon: User,
          iconClass: 'text-red-600',
          iconBg: 'bg-red-50',
          border: 'border-red-200',
          label: 'text-red-700',
          dot: 'bg-red-500',
        };

      case 'Crime':
        return {
          icon: ShieldAlert,
          iconClass: 'text-violet-600',
          iconBg: 'bg-violet-50',
          border: 'border-violet-200',
          label: 'text-violet-700',
          dot: 'bg-violet-500',
        };

      case 'Location':
        return {
          icon: MapPin,
          iconClass: 'text-emerald-600',
          iconBg: 'bg-emerald-50',
          border: 'border-emerald-200',
          label: 'text-emerald-700',
          dot: 'bg-emerald-500',
        };

      case 'Phone':
        return {
          icon: Phone,
          iconClass: 'text-amber-600',
          iconBg: 'bg-amber-50',
          border: 'border-amber-200',
          label: 'text-amber-700',
          dot: 'bg-amber-500',
        };

      case 'Vehicle':
        return {
          icon: Car,
          iconClass: 'text-blue-600',
          iconBg: 'bg-blue-50',
          border: 'border-blue-200',
          label: 'text-blue-700',
          dot: 'bg-blue-500',
        };

      default:
        return {
          icon: Network,
          iconClass: 'text-slate-600',
          iconBg: 'bg-slate-100',
          border: 'border-slate-200',
          label: 'text-slate-700',
          dot: 'bg-slate-500',
        };
    }
  };

  const getRiskConfig = (score) => {
    if (score >= 90) {
      return {
        label: 'Critical',
        className: 'bg-red-50 text-red-700 border-red-200',
        bar: 'bg-red-500',
      };
    }

    if (score >= 80) {
      return {
        label: 'High',
        className: 'bg-orange-50 text-orange-700 border-orange-200',
        bar: 'bg-orange-500',
      };
    }

    if (score >= 70) {
      return {
        label: 'Elevated',
        className: 'bg-amber-50 text-amber-700 border-amber-200',
        bar: 'bg-amber-500',
      };
    }

    return {
      label: 'Moderate',
      className: 'bg-slate-50 text-slate-700 border-slate-200',
      bar: 'bg-slate-500',
    };
  };

  /*
   * ---------------------------------------------------------
   * MODAL HELPERS
   * ---------------------------------------------------------
   */

  const closeAllModals = () => {
    setAddEntityModalOpen(false);
    setAddLinkModalOpen(false);
    setExportModalOpen(false);
    setShortestPathModalOpen(false);
  };

  /*
   * ---------------------------------------------------------
   * UI
   * ---------------------------------------------------------
   */

  return (
    <div
      className="min-h-full bg-[#f6f8fb] text-slate-900 p-4 md:p-6 font-sans"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Toast */}
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

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  Criminal Network Analysis
                </h1>

                <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                  Case #{activeCaseId || '—'}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Investigative relationship graph for people, devices,
                locations, vehicles and associated incidents.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setAddEntityModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                <PlusCircle className="h-4 w-4" />
                Add Entity
              </button>

              <button
                onClick={() => setAddLinkModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                <Link2 className="h-4 w-4" />
                Add Link
              </button>

              <button
                onClick={() => setShortestPathModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
              >
                <GitFork className="h-4 w-4" />
                Path Finder
              </button>

              <button
                onClick={() => setExportModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                <Download className="h-4 w-4" />
                Export
              </button>

              <button
                onClick={loadGraph}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    loading ? 'animate-spin' : ''
                  }`}
                />
                Reset
              </button>
            </div>
          </div>
        </header>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <SummaryCard
            icon={User}
            label="Suspects"
            value={summaryCounts.suspects}
            tone="red"
          />

          <SummaryCard
            icon={ShieldAlert}
            label="Crimes"
            value={summaryCounts.crimes}
            tone="violet"
          />

          <SummaryCard
            icon={MapPin}
            label="Locations"
            value={summaryCounts.locations}
            tone="emerald"
          />

          <SummaryCard
            icon={Phone}
            label="Phones"
            value={summaryCounts.phones}
            tone="amber"
          />

          <SummaryCard
            icon={Car}
            label="Vehicles"
            value={summaryCounts.vehicles}
            tone="blue"
          />
        </div>

        {/* Filters */}
        <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto">
              <div className="flex shrink-0 items-center gap-1.5 pr-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filter
              </div>

              {[
                'All',
                'Suspect',
                'Crime',
                'Location',
                'Phone',
                'Vehicle',
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedTypeFilter(type)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    selectedTypeFilter === type
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
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
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </section>

        {/* Workspace */}
        <div
          className="grid min-h-[650px] grid-cols-1 gap-4 lg:grid-cols-12"
          onMouseMove={handleMouseMove}
        >
          {/* Canvas */}
          <section
            ref={containerRef}
            onMouseDown={handleMouseDownCanvas}
            className={`relative min-h-[650px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${
              selectedNode
                ? 'lg:col-span-9'
                : 'lg:col-span-12'
            }`}
          >
            {/* Canvas header */}
            <div className="absolute left-4 right-4 top-4 z-30 flex items-center justify-between rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Network className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Investigation Network
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Drag nodes to inspect relationships
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">
                  {filteredNodes.length} visible nodes
                </span>

                <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">
                  {graphData.links.length} relationships
                </span>
              </div>
            </div>

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            {/* Loading */}
            {loading ? (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80">
                <RefreshCw className="mb-3 h-7 w-7 animate-spin text-blue-600" />

                <p className="text-xs font-semibold text-slate-700">
                  Loading network topology
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Preparing investigation graph...
                </p>
              </div>
            ) : (
              <div
                className="absolute left-0 top-0 h-[1400px] w-[1400px] transition-transform duration-75"
                style={{
                  transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                }}
              >
                {/* Links */}
                <svg
                  className="pointer-events-auto absolute inset-0 z-0 h-[1400px] w-[1400px]"
                  viewBox="0 0 1400 1400"
                >
                  {renderSvgLinks()}
                </svg>

                {/* Nodes */}
                {filteredNodes.map((node) => {
                  const config = getNodeConfig(node.type);
                  const Icon = config.icon;
                  const risk = getRiskConfig(node.riskScore);

                  const isSelected =
                    selectedNode?.id === node.id;

                  return (
                    <div
                      key={node.id}
                      onMouseDown={(event) =>
                        handleNodeMouseDown(event, node)
                      }
                      style={{
                        left: `${node.x || 150}px`,
                        top: `${node.y || 150}px`,
                        width: '180px',
                      }}
                      className={`absolute z-10 cursor-move rounded-xl border bg-white p-3 shadow-md transition ${
                        isSelected
                          ? 'border-blue-500 ring-4 ring-blue-100'
                          : `${config.border} hover:-translate-y-0.5 hover:shadow-lg`
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-lg ${config.iconBg}`}
                        >
                          <Icon
                            className={`h-4 w-4 ${config.iconClass}`}
                          />
                        </div>

                        <span
                          className={`rounded-md border px-1.5 py-0.5 text-[9px] font-bold ${risk.className}`}
                        >
                          {node.riskScore}
                        </span>
                      </div>

                      <p className="truncate text-xs font-bold text-slate-900">
                        {node.label}
                      </p>

                      <p className="mt-0.5 truncate font-mono text-[9px] text-slate-400">
                        {node.id}
                      </p>

                      <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                        <span
                          className={`text-[9px] font-bold uppercase ${config.label}`}
                        >
                          {node.type}
                        </span>

                        <span className="flex items-center gap-1 text-[9px] font-medium text-slate-400">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
                          />
                          Active
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Empty filtered state */}
            {!loading && filteredNodes.length === 0 && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80">
                <div className="text-center">
                  <Search className="mx-auto mb-3 h-7 w-7 text-slate-300" />

                  <p className="text-sm font-semibold text-slate-700">
                    No entities found
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Try another search term or entity type.
                  </p>
                </div>
              </div>
            )}

            {/* Zoom */}
            <div className="absolute bottom-4 right-4 z-40 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <button
                onClick={() =>
                  setZoomLevel((previous) =>
                    Math.min(previous + 0.15, 1.8)
                  )
                }
                className="border-b border-slate-100 p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                title="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              <button
                onClick={() =>
                  setZoomLevel((previous) =>
                    Math.max(previous - 0.15, 0.5)
                  )
                }
                className="border-b border-slate-100 p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                title="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  setZoomLevel(1);
                  setPanPosition({
                    x: 0,
                    y: 0,
                  });
                }}
                className="p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                title="Reset view"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-40 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-md sm:block">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Entity Legend
              </p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <LegendItem color="bg-red-500" label="Suspect" />
                <LegendItem color="bg-violet-500" label="Crime" />
                <LegendItem color="bg-emerald-500" label="Location" />
                <LegendItem color="bg-amber-500" label="Phone" />
                <LegendItem color="bg-blue-500" label="Vehicle" />
              </div>
            </div>
          </section>

          {/* Inspector */}
          {selectedNode && (
            <aside className="flex min-h-[650px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Entity Inspector
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Selected graph node
                  </p>
                </div>

                <button
                  onClick={() => setSelectedNode(null)}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  title="Close inspector"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {(() => {
                  const config = getNodeConfig(
                    selectedNode.type
                  );
                  const Icon = config.icon;
                  const risk = getRiskConfig(
                    selectedNode.riskScore
                  );

                  return (
                    <div className="space-y-5">
                      <div>
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.iconBg}`}
                          >
                            <Icon
                              className={`h-5 w-5 ${config.iconClass}`}
                            />
                          </div>

                          <span
                            className={`rounded-lg border px-2 py-1 text-[10px] font-bold ${risk.className}`}
                          >
                            {risk.label} · {selectedNode.riskScore}%
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900">
                          {selectedNode.label}
                        </h3>

                        <p className="mt-1 font-mono text-[10px] text-slate-400">
                          {selectedNode.id}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          Risk Assessment
                        </p>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${risk.bar}`}
                            style={{
                              width: `${selectedNode.riskScore}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          Entity Details
                        </p>

                        <div className="space-y-2.5">
                          <DetailRow
                            label="Type"
                            value={selectedNode.type}
                          />

                          {selectedNode.details &&
                            Object.entries(
                              selectedNode.details
                            ).map(([key, value]) => (
                              <DetailRow
                                key={key}
                                label={key}
                                value={value}
                              />
                            ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          Graph Connections
                        </p>

                        <div className="rounded-xl bg-slate-50 p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              Direct relationships
                            </span>

                            <span className="text-sm font-bold text-slate-900">
                              {
                                graphData.links.filter(
                                  (link) =>
                                    link.source ===
                                      selectedNode.id ||
                                    link.target ===
                                      selectedNode.id
                                ).length
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="border-t border-slate-200 p-4">
                <button
                  onClick={handleRemoveSelectedNode}
                  className="w-full rounded-lg border border-red-200 bg-red-50 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Remove From Graph
                </button>

                <button
                  onClick={() => setSelectedNode(null)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Close Inspector
                </button>
              </div>
            </aside>
          )}
        </div>

        {/* Footer context */}
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[10px] text-slate-500 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-blue-600" />
            <span>
              Graph workspace contains{' '}
              <strong className="text-slate-700">
                {graphData.nodes.length}
              </strong>{' '}
              entities and{' '}
              <strong className="text-slate-700">
                {graphData.links.length}
              </strong>{' '}
              relationships.
            </span>
          </div>

          <span className="font-mono text-slate-400">
            Case: {activeCaseId || 'UNASSIGNED'}
          </span>
        </div>
      </div>

      {/* =====================================================
          ADD ENTITY MODAL
      ===================================================== */}
      {addEntityModalOpen && (
        <ModalOverlay onClose={() => setAddEntityModalOpen(false)}>
          <ModalHeader
            icon={PlusCircle}
            title="Add Entity"
            subtitle="Create a new node in the investigation graph."
            onClose={() => setAddEntityModalOpen(false)}
          />

          <form
            onSubmit={handleAddNodeSubmit}
            className="space-y-4 p-5"
          >
            <FormField label="Entity Type">
              <select
                value={newNodeType}
                onChange={(event) =>
                  setNewNodeType(event.target.value)
                }
                className="form-input"
              >
                <option value="Suspect">Suspect</option>
                <option value="Crime">Crime</option>
                <option value="Location">Location</option>
                <option value="Phone">Phone / Device</option>
                <option value="Vehicle">Vehicle</option>
              </select>
            </FormField>

            <FormField label="Name / Label" required>
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                value={newNodeName}
                onChange={(event) =>
                  setNewNodeName(event.target.value)
                }
                className="form-input"
                autoFocus
              />
            </FormField>

            <FormField label="Role / Detail">
              <input
                type="text"
                placeholder="e.g. Accomplice / Associate"
                value={newNodeDetail}
                onChange={(event) =>
                  setNewNodeDetail(event.target.value)
                }
                className="form-input"
              />
            </FormField>

            <FormField label="Location">
              <input
                type="text"
                placeholder="e.g. Guntur Market"
                value={newNodeLocation}
                onChange={(event) =>
                  setNewNodeLocation(event.target.value)
                }
                className="form-input"
              />
            </FormField>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() =>
                  setAddEntityModalOpen(false)
                }
                className="modal-secondary"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="modal-primary"
              >
                <PlusCircle className="h-4 w-4" />
                Add Entity
              </button>
            </div>
          </form>
        </ModalOverlay>
      )}

      {/* =====================================================
          ADD LINK MODAL
      ===================================================== */}
      {addLinkModalOpen && (
        <ModalOverlay onClose={() => setAddLinkModalOpen(false)}>
          <ModalHeader
            icon={Link2}
            title="Establish Relationship"
            subtitle="Connect two entities in the investigation graph."
            onClose={() => setAddLinkModalOpen(false)}
          />

          <form
            onSubmit={handleAddLinkSubmit}
            className="space-y-4 p-5"
          >
            <FormField label="Source Entity">
              <select
                value={linkSourceId}
                onChange={(event) =>
                  setLinkSourceId(event.target.value)
                }
                className="form-input"
              >
                {graphData.nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.label} · {node.id}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Target Entity">
              <select
                value={linkTargetId}
                onChange={(event) =>
                  setLinkTargetId(event.target.value)
                }
                className="form-input"
              >
                {graphData.nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.label} · {node.id}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Relationship Type">
              <select
                value={linkRelation}
                onChange={(event) =>
                  setLinkRelation(event.target.value)
                }
                className="form-input"
              >
                <option value="Communicates With">
                  Communicates With
                </option>
                <option value="Associate">
                  Associate / Accomplice
                </option>
                <option value="Visited">
                  Visited Location
                </option>
                <option value="Drives">
                  Drives Vehicle
                </option>
                <option value="Financial Transfer">
                  Financial Transfer
                </option>
                <option value="Family Relation">
                  Family Relation
                </option>
              </select>
            </FormField>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
              <div className="flex gap-2">
                <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                <div>
                  <p className="text-xs font-semibold text-blue-900">
                    Relationship preview
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-blue-700">
                    The selected source and target will be
                    connected using the specified relationship.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() =>
                  setAddLinkModalOpen(false)
                }
                className="modal-secondary"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="modal-primary"
              >
                <Link2 className="h-4 w-4" />
                Connect Entities
              </button>
            </div>
          </form>
        </ModalOverlay>
      )}

      {/* =====================================================
          EXPORT MODAL
      ===================================================== */}
      {exportModalOpen && (
        <ModalOverlay onClose={() => setExportModalOpen(false)}>
          <ModalHeader
            icon={Download}
            title="Export Network"
            subtitle="Prepare the current investigation topology for export."
            onClose={() => setExportModalOpen(false)}
          />

          <div className="space-y-4 p-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="grid grid-cols-2 gap-4">
                <StatMini
                  label="Entities"
                  value={graphData.nodes.length}
                />

                <StatMini
                  label="Relationships"
                  value={graphData.links.length}
                />

                <StatMini
                  label="Case"
                  value={activeCaseId || '—'}
                />

                <StatMini
                  label="Visible"
                  value={filteredNodes.length}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Export formats
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] text-slate-600">
                  JSON
                </span>

                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] text-slate-600">
                  PNG Snapshot
                </span>

                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] text-slate-600">
                  Graph Matrix
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                onClick={() => setExportModalOpen(false)}
                className="modal-secondary"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setExportModalOpen(false);
                  triggerToast(
                    'Network export prepared successfully.'
                  );
                }}
                className="modal-primary"
              >
                <Download className="h-4 w-4" />
                Confirm Export
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* =====================================================
          PATH FINDER MODAL
      ===================================================== */}
      {shortestPathModalOpen && (
        <ModalOverlay
          onClose={() => setShortestPathModalOpen(false)}
        >
          <ModalHeader
            icon={GitFork}
            title="Path Finder"
            subtitle="Inspect the relationship path between two entities."
            onClose={() =>
              setShortestPathModalOpen(false)
            }
          />

          <div className="space-y-4 p-5">
            <FormField label="Source Entity">
              <select
                value={pathSourceId}
                onChange={(event) =>
                  setPathSourceId(event.target.value)
                }
                className="form-input"
              >
                {graphData.nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.label} · {node.id}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Target Entity">
              <select
                value={pathTargetId}
                onChange={(event) =>
                  setPathTargetId(event.target.value)
                }
                className="form-input"
              >
                {graphData.nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.label} · {node.id}
                  </option>
                ))}
              </select>
            </FormField>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
              <div className="flex gap-2">
                <GitFork className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                <div>
                  <p className="text-xs font-semibold text-amber-900">
                    Network path analysis
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-amber-700">
                    The analysis will inspect the current graph
                    relationships between the selected entities.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                onClick={() =>
                  setShortestPathModalOpen(false)
                }
                className="modal-secondary"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (
                    !pathSourceId ||
                    !pathTargetId
                  ) {
                    triggerToast(
                      'Select both source and target entities.'
                    );
                    return;
                  }

                  if (pathSourceId === pathTargetId) {
                    triggerToast(
                      'Source and target cannot be the same.'
                    );
                    return;
                  }

                  setShortestPathModalOpen(false);

                  triggerToast(
                    'Relationship path computed successfully.'
                  );
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-amber-600"
              >
                <GitFork className="h-4 w-4" />
                Compute Path
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

/*
 * ============================================================
 * REUSABLE COMPONENTS
 * ============================================================
 */

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone = 'blue',
}) {
  const tones = {
    red: {
      icon: 'bg-red-50 text-red-600',
    },
    violet: {
      icon: 'bg-violet-50 text-violet-600',
    },
    emerald: {
      icon: 'bg-emerald-50 text-emerald-600',
    },
    amber: {
      icon: 'bg-amber-50 text-amber-600',
    },
    blue: {
      icon: 'bg-blue-50 text-blue-600',
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone].icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <span className="text-xl font-bold tracking-tight text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-medium text-slate-600">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 text-xs">
      <span className="shrink-0 text-slate-400">
        {String(label)
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (char) => char.toUpperCase())}
      </span>

      <span className="text-right font-medium text-slate-700">
        {String(value)}
      </span>
    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
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
    <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
      <div className="flex gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function FormField({ label, required, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {children}
    </div>
  );
}

function StatMini({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}