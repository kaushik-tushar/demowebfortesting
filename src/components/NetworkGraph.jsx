import React, { useMemo, useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Sliders,
  Layers,
  Search,
  Users,
  Phone,
  Car,
  MapPin,
  Building2,
  CreditCard,
  GitFork,
  Activity,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Eye,
  RefreshCw,
  Zap,
  X,
  CheckCircle2,
} from 'lucide-react';

export default function NetworkGraph({
  selectedCaseId = '26189-042',
  onSelectEntity,
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('ALL');
  const [hopDepth, setHopDepth] = useState('2-hop');
  const [timeFilter, setTimeFilter] = useState(100);
  const [highlightSuspicious, setHighlightSuspicious] =
    useState(true);
  const [shortestPathMode, setShortestPathMode] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  /* =========================================================
     MOCK GRAPH DATA
  ========================================================== */

  const initialNodes = [
    {
      id: 'ENT-9021',
      name: 'Rajesh "Raju" Sharma',
      type: 'Person',
      riskScore: 94,
      centrality: 0.96,
      connections: 18,
      x: 280,
      y: 180,
      isKey: true,
    },
    {
      id: 'ENT-4412',
      name: 'Vikram Choudhury',
      type: 'Person',
      riskScore: 89,
      centrality: 0.88,
      connections: 12,
      x: 520,
      y: 140,
      isKey: false,
    },
    {
      id: 'ENT-1108',
      name: '+91 98765 43210',
      type: 'Phone',
      riskScore: 91,
      centrality: 0.92,
      connections: 24,
      x: 380,
      y: 310,
      isKey: true,
    },
    {
      id: 'ENT-3390',
      name: 'Apex Logistics Pvt Ltd',
      type: 'Organization',
      riskScore: 84,
      centrality: 0.79,
      connections: 9,
      x: 620,
      y: 280,
      isKey: false,
    },
    {
      id: 'ENT-7701',
      name: 'Safehouse - Sector 62',
      type: 'Location',
      riskScore: 78,
      centrality: 0.65,
      connections: 8,
      x: 180,
      y: 340,
      isKey: false,
    },
    {
      id: 'ENT-2204',
      name: 'DL-01-AB-9012 (SUV)',
      type: 'Vehicle',
      riskScore: 72,
      centrality: 0.58,
      connections: 5,
      x: 120,
      y: 190,
      isKey: false,
    },
    {
      id: 'ENT-8841',
      name: 'HDFC Ac #...9041',
      type: 'Account',
      riskScore: 88,
      centrality: 0.83,
      connections: 11,
      x: 470,
      y: 410,
      isKey: true,
    },
  ];

  const initialEdges = [
    {
      source: 'ENT-9021',
      target: 'ENT-1108',
      label: 'OWNS_SIM',
      weight: 'High',
      type: 'Communication',
    },
    {
      source: 'ENT-9021',
      target: 'ENT-2204',
      label: 'DRIVES',
      weight: 'Med',
      type: 'Ownership',
    },
    {
      source: 'ENT-9021',
      target: 'ENT-7701',
      label: 'VISITED_14X',
      weight: 'High',
      type: 'Geographic',
    },
    {
      source: 'ENT-1108',
      target: 'ENT-4412',
      label: '47_CALLS_2HR',
      weight: 'Critical',
      type: 'Communication',
      anomalous: true,
    },
    {
      source: 'ENT-4412',
      target: 'ENT-3390',
      label: 'DIRECTOR',
      weight: 'High',
      type: 'Corporate',
    },
    {
      source: 'ENT-1108',
      target: 'ENT-8841',
      label: 'UPI_LINKED',
      weight: 'High',
      type: 'Financial',
    },
    {
      source: 'ENT-8841',
      target: 'ENT-3390',
      label: 'TRANSFERRED_₹42L',
      weight: 'Critical',
      type: 'Financial',
      anomalous: true,
    },
    {
      source: 'ENT-7701',
      target: 'ENT-2204',
      label: 'PARKED_AT',
      weight: 'Med',
      type: 'Geographic',
    },
  ];

  /* =========================================================
     ICONS
  ========================================================== */

  const getNodeIcon = (type, size = 16) => {
    switch (type) {
      case 'Person':
        return (
          <Users
            size={size}
            className="text-red-600"
          />
        );

      case 'Phone':
        return (
          <Phone
            size={size}
            className="text-blue-600"
          />
        );

      case 'Vehicle':
        return (
          <Car
            size={size}
            className="text-amber-600"
          />
        );

      case 'Location':
        return (
          <MapPin
            size={size}
            className="text-emerald-600"
          />
        );

      case 'Organization':
        return (
          <Building2
            size={size}
            className="text-indigo-600"
          />
        );

      case 'Account':
        return (
          <CreditCard
            size={size}
            className="text-cyan-700"
          />
        );

      default:
        return (
          <GitFork
            size={size}
            className="text-slate-500"
          />
        );
    }
  };

  /* =========================================================
     NODE STYLE
  ========================================================== */

  const getNodeStyle = (node, isSelected) => {
    if (isSelected) {
      return {
        fill: '#ffffff',
        stroke: '#2563eb',
        strokeWidth: 3,
      };
    }

    if (node.isKey && highlightSuspicious) {
      return {
        fill: '#fff7f7',
        stroke: '#dc2626',
        strokeWidth: 2.5,
      };
    }

    return {
      fill: '#ffffff',
      stroke: '#94a3b8',
      strokeWidth: 2,
    };
  };

  /* =========================================================
     RISK CONFIG
  ========================================================== */

  const getRiskConfig = (score) => {
    if (score >= 85) {
      return {
        label: 'High',
        text: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
        bar: 'bg-red-500',
      };
    }

    if (score >= 65) {
      return {
        label: 'Moderate',
        text: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        bar: 'bg-amber-500',
      };
    }

    return {
      label: 'Low',
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      bar: 'bg-emerald-500',
    };
  };

  /* =========================================================
     FILTERED NODES
  ========================================================== */

  const filteredNodes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return initialNodes.filter((node) => {
      const matchesType =
        filterType === 'ALL' ||
        node.type === filterType;

      const matchesSearch =
        !query ||
        node.name.toLowerCase().includes(query) ||
        node.id.toLowerCase().includes(query) ||
        node.type.toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }, [filterType, searchTerm]);

  const visibleNodeIds = useMemo(
    () => new Set(filteredNodes.map((node) => node.id)),
    [filteredNodes]
  );

  /* =========================================================
     FILTERED EDGES
  ========================================================== */

  const visibleEdges = useMemo(() => {
    return initialEdges.filter(
      (edge) =>
        visibleNodeIds.has(edge.source) &&
        visibleNodeIds.has(edge.target)
    );
  }, [visibleNodeIds]);

  /* =========================================================
     SUMMARY
  ========================================================== */

  const highRiskCount = filteredNodes.filter(
    (node) => node.riskScore >= 85
  ).length;

  const anomalyCount = initialEdges.filter(
    (edge) => edge.anomalous
  ).length;

  /* =========================================================
     NODE SELECTION
  ========================================================== */

  const handleNodeSelect = (node) => {
    setSelectedNode(node);

    if (onSelectEntity) {
      onSelectEntity(node);
    }
  };

  /* =========================================================
     RENDER
  ========================================================== */

  return (
    <div
      className="
        relative
        w-full
        h-[680px]
        bg-white
        border
        border-slate-200
        rounded-2xl
        overflow-hidden
        font-sans
        select-none
        flex
        flex-col
        shadow-sm
      "
    >
      {/* =====================================================
          TOP TOOLBAR
      ====================================================== */}

      <div
        className="
          z-10
          px-4
          py-3
          bg-white
          border-b
          border-slate-200
          flex
          flex-wrap
          items-center
          justify-between
          gap-3
        "
      >
        {/* Left Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter Type */}
          <div
            className="
              flex
              items-center
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              p-1
              text-[10px]
            "
          >
            {[
              'ALL',
              'Person',
              'Phone',
              'Location',
              'Account',
            ].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`
                  px-2.5
                  py-1.5
                  rounded-lg
                  font-semibold
                  transition-colors
                  ${
                    filterType === type
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white'
                  }
                `}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Hop Depth */}
          <div
            className="
              flex
              items-center
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              p-1
              text-[10px]
            "
          >
            {['1-hop', '2-hop', '3-hop'].map((hop) => (
              <button
                key={hop}
                type="button"
                onClick={() => setHopDepth(hop)}
                className={`
                  px-2.5
                  py-1.5
                  rounded-lg
                  font-mono
                  font-semibold
                  transition-colors
                  ${
                    hopDepth === hop
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white'
                  }
                `}
              >
                {hop}
              </button>
            ))}
          </div>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setHighlightSuspicious(
                (prev) => !prev
              )
            }
            className={`
              flex
              items-center
              gap-1.5
              px-3
              py-1.5
              rounded-lg
              border
              text-[10px]
              font-semibold
              transition-colors
              ${
                highlightSuspicious
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-white text-slate-500 border-slate-200'
              }
            `}
          >
            <ShieldAlert size={13} />
            Anomalies
          </button>

          <button
            type="button"
            onClick={() =>
              setShortestPathMode(
                (prev) => !prev
              )
            }
            className={`
              flex
              items-center
              gap-1.5
              px-3
              py-1.5
              rounded-lg
              border
              text-[10px]
              font-semibold
              transition-colors
              ${
                shortestPathMode
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-slate-500 border-slate-200'
              }
            `}
          >
            <Zap size={13} />
            Path Tracer
          </button>
        </div>

        {/* Zoom */}
        <div
          className="
            flex
            items-center
            gap-1
            bg-slate-50
            border
            border-slate-200
            rounded-xl
            p-1
          "
        >
          <button
            type="button"
            onClick={() =>
              setZoomLevel((prev) =>
                Math.min(prev + 0.15, 2)
              )
            }
            className="
              p-1.5
              hover:bg-white
              text-slate-500
              hover:text-blue-700
              rounded-lg
              transition-colors
            "
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>

          <span
            className="
              text-[9px]
              font-mono
              font-bold
              text-slate-600
              px-1
            "
          >
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            type="button"
            onClick={() =>
              setZoomLevel((prev) =>
                Math.max(prev - 0.15, 0.6)
              )
            }
            className="
              p-1.5
              hover:bg-white
              text-slate-500
              hover:text-blue-700
              rounded-lg
              transition-colors
            "
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>

          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="
              p-1.5
              hover:bg-white
              text-slate-500
              hover:text-blue-700
              rounded-lg
              transition-colors
            "
            title="Reset Graph"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>

      {/* =====================================================
          GRAPH WORKSPACE
      ====================================================== */}

      <div
        className="
          relative
          flex-1
          bg-slate-50
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >
        {/* Background grid */}
        <div
          className="
            absolute
            inset-0
            pointer-events-none
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(148,163,184,0.10) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(148,163,184,0.10) 1px,
                transparent 1px
              )
            `,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Workspace label */}
        <div
          className="
            absolute
            top-3
            left-3
            z-10
            flex
            items-center
            gap-2
            bg-white
            border
            border-slate-200
            rounded-lg
            px-2.5
            py-1.5
            shadow-sm
          "
        >
          <GitFork
            size={13}
            className="text-blue-600"
          />

          <span
            className="
              text-[9px]
              font-semibold
              text-slate-600
            "
          >
            Case {selectedCaseId}
          </span>

          <span className="text-slate-300">
            /
          </span>

          <span
            className="
              text-[9px]
              text-slate-400
            "
          >
            {hopDepth}
          </span>
        </div>

        {/* Search */}
        <div
          className="
            absolute
            top-3
            right-3
            z-10
            w-52
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              bg-white
              border
              border-slate-200
              rounded-lg
              px-2.5
              py-1.5
              shadow-sm
            "
          >
            <Search
              size={13}
              className="text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Find entity..."
              className="
                w-full
                bg-transparent
                outline-none
                text-[10px]
                text-slate-700
                placeholder:text-slate-400
              "
            />
          </div>
        </div>

        {/* =================================================
            SVG GRAPH
        ================================================== */}

        <svg
          className="
            w-full
            h-full
            transition-transform
            duration-200
            cursor-grab
            active:cursor-grabbing
          "
          style={{
            transform: `scale(${zoomLevel})`,
          }}
          viewBox="0 0 760 540"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Standard edge */}
            <marker
              id="network-arrow"
              markerWidth="8"
              markerHeight="6"
              refX="20"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 8 3, 0 6"
                fill="#94a3b8"
              />
            </marker>

            {/* Anomaly edge */}
            <marker
              id="network-arrow-danger"
              markerWidth="8"
              markerHeight="6"
              refX="20"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 8 3, 0 6"
                fill="#dc2626"
              />
            </marker>
          </defs>

          {/* =================================================
              EDGES
          ================================================== */}

          {visibleEdges.map((edge, index) => {
            const sourceNode = initialNodes.find(
              (node) => node.id === edge.source
            );

            const targetNode = initialNodes.find(
              (node) => node.id === edge.target
            );

            if (!sourceNode || !targetNode) {
              return null;
            }

            const isAnomalous =
              edge.anomalous &&
              highlightSuspicious;

            const isPathEdge =
              shortestPathMode &&
              (edge.anomalous ||
                edge.weight === 'Critical');

            const midX =
              (sourceNode.x + targetNode.x) / 2;

            const midY =
              (sourceNode.y + targetNode.y) / 2;

            return (
              <g key={`${edge.source}-${edge.target}-${index}`}>
                {/* Edge */}
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={
                    isAnomalous || isPathEdge
                      ? '#dc2626'
                      : '#cbd5e1'
                  }
                  strokeWidth={
                    isAnomalous || isPathEdge
                      ? 2.5
                      : 1.5
                  }
                  strokeDasharray={
                    isAnomalous
                      ? '6 4'
                      : undefined
                  }
                  markerEnd={
                    isAnomalous || isPathEdge
                      ? 'url(#network-arrow-danger)'
                      : 'url(#network-arrow)'
                  }
                />

                {/* Relationship label */}
                <rect
                  x={midX - 38}
                  y={midY - 10}
                  width="76"
                  height="17"
                  rx="5"
                  fill="#ffffff"
                  stroke={
                    isAnomalous
                      ? '#fecaca'
                      : '#e2e8f0'
                  }
                  strokeWidth="1"
                />

                <text
                  x={midX}
                  y={midY + 2}
                  textAnchor="middle"
                  className="
                    text-[8px]
                    font-mono
                    font-semibold
                  "
                  fill={
                    isAnomalous
                      ? '#b91c1c'
                      : '#64748b'
                  }
                >
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* =================================================
              NODES
          ================================================== */}

          {filteredNodes.map((node) => {
            const isSelected =
              selectedNode?.id === node.id;

            const nodeStyle = getNodeStyle(
              node,
              isSelected
            );

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() =>
                  handleNodeSelect(node)
                }
                className="cursor-pointer"
              >
                {/* Key entity ring */}
                {node.isKey &&
                  highlightSuspicious && (
                    <circle
                      r="27"
                      fill="#fef2f2"
                      stroke="#fecaca"
                      strokeWidth="1"
                    />
                  )}

                {/* Selected ring */}
                {isSelected && (
                  <circle
                    r="26"
                    fill="none"
                    stroke="#bfdbfe"
                    strokeWidth="2"
                  />
                )}

                {/* Node */}
                <circle
                  r="20"
                  fill={nodeStyle.fill}
                  stroke={nodeStyle.stroke}
                  strokeWidth={nodeStyle.strokeWidth}
                />

                {/* Inner indicator */}
                <circle
                  r="4"
                  fill={
                    node.riskScore >= 85
                      ? '#dc2626'
                      : node.riskScore >= 65
                      ? '#d97706'
                      : '#059669'
                  }
                />

                {/* Name */}
                <text
                  y="36"
                  textAnchor="middle"
                  className="
                    text-[10px]
                    font-bold
                    fill-slate-700
                  "
                >
                  {node.name.length > 24
                    ? `${node.name.slice(0, 23)}…`
                    : node.name}
                </text>

                {/* Metadata */}
                <text
                  y="49"
                  textAnchor="middle"
                  className="
                    text-[8px]
                    font-mono
                    fill-slate-400
                  "
                >
                  {node.id} · Risk {node.riskScore}
                </text>
              </g>
            );
          })}
        </svg>

        {/* =================================================
            EMPTY STATE
        ================================================== */}

        {filteredNodes.length === 0 && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-xl
                px-6
                py-5
                text-center
                shadow-sm
              "
            >
              <Search
                size={22}
                className="
                  mx-auto
                  text-slate-300
                  mb-2
                "
              />

              <p
                className="
                  text-sm
                  font-semibold
                  text-slate-700
                "
              >
                No entities found
              </p>

              <p
                className="
                  text-[10px]
                  text-slate-400
                  mt-1
                "
              >
                Adjust the entity filter or search term.
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            GRAPH LEGEND
        ================================================== */}

        <div
          className="
            absolute
            bottom-3
            left-3
            bg-white/95
            border
            border-slate-200
            rounded-lg
            px-3
            py-2
            shadow-sm
            flex
            items-center
            gap-3
            text-[9px]
          "
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-slate-500">
              High Risk
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-slate-500">
              Moderate
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-500">
              Low
            </span>
          </div>
        </div>

        {/* =================================================
            SELECTED ENTITY DRAWER
        ================================================== */}

        {selectedNode && (
          <div
            className="
              absolute
              right-3
              top-14
              bottom-3
              w-[290px]
              bg-white
              border
              border-slate-200
              rounded-xl
              shadow-xl
              z-20
              flex
              flex-col
              overflow-hidden
            "
          >
            {/* Drawer Header */}
            <div
              className="
                px-4
                py-3.5
                border-b
                border-slate-200
                bg-slate-50
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    className="
                      w-9
                      h-9
                      rounded-lg
                      bg-white
                      border
                      border-slate-200
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    {getNodeIcon(
                      selectedNode.type,
                      16
                    )}
                  </div>

                  <div className="min-w-0">
                    <span
                      className="
                        text-[8px]
                        uppercase
                        font-bold
                        text-slate-400
                        tracking-wider
                      "
                    >
                      {selectedNode.type} Entity
                    </span>

                    <h3
                      className="
                        text-xs
                        font-bold
                        text-slate-900
                        leading-4
                        mt-0.5
                      "
                    >
                      {selectedNode.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedNode(null)
                  }
                  className="
                    w-7
                    h-7
                    rounded-lg
                    bg-white
                    border
                    border-slate-200
                    flex
                    items-center
                    justify-center
                    text-slate-400
                    hover:text-slate-700
                    hover:bg-slate-100
                    shrink-0
                  "
                  aria-label="Close entity details"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Risk / Centrality */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div
                  className="
                    p-2.5
                    bg-slate-50
                    rounded-lg
                    border
                    border-slate-200
                  "
                >
                  <span
                    className="
                      text-[9px]
                      text-slate-400
                      block
                    "
                  >
                    Risk Score
                  </span>

                  <div
                    className={`
                      text-base
                      font-bold
                      mt-0.5
                      ${
                        getRiskConfig(
                          selectedNode.riskScore
                        ).text
                      }
                    `}
                  >
                    {selectedNode.riskScore}
                    <span className="text-[9px] font-medium text-slate-400">
                      /100
                    </span>
                  </div>
                </div>

                <div
                  className="
                    p-2.5
                    bg-slate-50
                    rounded-lg
                    border
                    border-slate-200
                  "
                >
                  <span
                    className="
                      text-[9px]
                      text-slate-400
                      block
                    "
                  >
                    Centrality
                  </span>

                  <div className="text-base font-bold text-blue-700 mt-0.5">
                    {Math.round(
                      selectedNode.centrality * 100
                    )}
                    %
                  </div>
                </div>
              </div>

              {/* Risk bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-medium text-slate-500">
                    Risk assessment
                  </span>

                  <span
                    className={`
                      text-[8px]
                      font-semibold
                      px-1.5
                      py-0.5
                      rounded
                      border
                      ${
                        getRiskConfig(
                          selectedNode.riskScore
                        ).bg
                      }
                      ${
                        getRiskConfig(
                          selectedNode.riskScore
                        ).border
                      }
                      ${
                        getRiskConfig(
                          selectedNode.riskScore
                        ).text
                      }
                    `}
                  >
                    {
                      getRiskConfig(
                        selectedNode.riskScore
                      ).label
                    }
                  </span>
                </div>

                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`
                      h-full
                      rounded-full
                      ${
                        getRiskConfig(
                          selectedNode.riskScore
                        ).bar
                      }
                    `}
                    style={{
                      width: `${Math.min(
                        selectedNode.riskScore,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Entity metadata */}
              <div className="space-y-0">
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    py-2.5
                    border-b
                    border-slate-100
                  "
                >
                  <span className="text-[9px] text-slate-400">
                    Entity ID
                  </span>

                  <span className="text-[9px] font-mono font-semibold text-slate-600">
                    {selectedNode.id}
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    py-2.5
                    border-b
                    border-slate-100
                  "
                >
                  <span className="text-[9px] text-slate-400">
                    Graph Degree
                  </span>

                  <span className="text-[9px] font-semibold text-slate-700">
                    {selectedNode.connections}
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    py-2.5
                    border-b
                    border-slate-100
                  "
                >
                  <span className="text-[9px] text-slate-400">
                    Entity Type
                  </span>

                  <span className="text-[9px] font-semibold text-slate-700">
                    {selectedNode.type}
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    py-2.5
                    border-b
                    border-slate-100
                  "
                >
                  <span className="text-[9px] text-slate-400">
                    Investigation Case
                  </span>

                  <span className="text-[9px] font-mono font-semibold text-blue-700">
                    {selectedCaseId}
                  </span>
                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    py-2.5
                    border-b
                    border-slate-100
                  "
                >
                  <span className="text-[9px] text-slate-400">
                    References
                  </span>

                  <span className="text-[9px] font-semibold text-slate-700">
                    Graph linked
                  </span>
                </div>
              </div>

              {/* Graph status */}
              <div
                className="
                  mt-4
                  p-2.5
                  rounded-lg
                  bg-blue-50
                  border
                  border-blue-100
                  flex
                  items-start
                  gap-2
                "
              >
                <CheckCircle2
                  size={13}
                  className="
                    text-blue-600
                    mt-0.5
                    shrink-0
                  "
                />

                <div>
                  <p className="text-[9px] font-semibold text-blue-800">
                    Entity loaded in graph
                  </p>

                  <p className="text-[8px] text-blue-600 mt-0.5 leading-3.5">
                    Relationships shown are from the current
                    prototype graph dataset.
                  </p>
                </div>
              </div>
            </div>

            {/* Drawer Actions */}
            <div
              className="
                p-3
                border-t
                border-slate-200
                bg-slate-50
                space-y-2
              "
            >
              <a
                href={`/entities/${selectedNode.id}`}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-semibold
                  py-2
                  rounded-lg
                  text-[10px]
                  transition-colors
                  shadow-sm
                "
              >
                <Eye size={13} />
                Open Entity Profile
              </a>

              <button
                type="button"
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-white
                  hover:bg-slate-100
                  text-slate-600
                  font-semibold
                  py-2
                  rounded-lg
                  text-[10px]
                  border
                  border-slate-200
                  transition-colors
                "
              >
                <RefreshCw size={12} />
                Expand 1-Hop Neighborhood
              </button>
            </div>
          </div>
        )}

        {/* =================================================
            STATUS SUMMARY
        ================================================== */}

        <div
          className="
            absolute
            bottom-3
            right-3
            z-10
            hidden
            lg:flex
            items-center
            gap-1.5
          "
        >
          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-lg
              px-2.5
              py-1.5
              shadow-sm
              flex
              items-center
              gap-1.5
            "
          >
            <Activity
              size={11}
              className="text-blue-600"
            />

            <span className="text-[9px] text-slate-500">
              {filteredNodes.length} entities
            </span>
          </div>

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-lg
              px-2.5
              py-1.5
              shadow-sm
              flex
              items-center
              gap-1.5
            "
          >
            <GitFork
              size={11}
              className="text-indigo-600"
            />

            <span className="text-[9px] text-slate-500">
              {visibleEdges.length} relationships
            </span>
          </div>

          {highlightSuspicious && (
            <div
              className="
                bg-red-50
                border
                border-red-200
                rounded-lg
                px-2.5
                py-1.5
                shadow-sm
                flex
                items-center
                gap-1.5
              "
            >
              <ShieldAlert
                size={11}
                className="text-red-600"
              />

              <span className="text-[9px] text-red-700">
                {anomalyCount} anomalies
              </span>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          TEMPORAL CONTROL
      ====================================================== */}

      <div
        className="
          px-4
          py-3
          bg-white
          border-t
          border-slate-200
          flex
          items-center
          gap-4
          text-xs
        "
      >
        <div className="flex items-center gap-2 shrink-0">
          <Layers
            size={13}
            className="text-slate-500"
          />

          <span className="text-[10px] text-slate-600 font-semibold">
            Temporal Sequence
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={timeFilter}
          onChange={(event) =>
            setTimeFilter(
              Number(event.target.value)
            )
          }
          className="
            w-full
            h-1.5
            accent-blue-600
            bg-slate-200
            rounded-lg
            cursor-pointer
          "
          aria-label="Temporal sequence filter"
        />

        <span
          className="
            text-[9px]
            font-mono
            font-semibold
            text-slate-500
            shrink-0
          "
        >
          Jan 2026 — Present
        </span>

        <span
          className="
            hidden
            sm:inline
            text-[9px]
            font-mono
            text-slate-400
            shrink-0
          "
        >
          {timeFilter}%
        </span>
      </div>
    </div>
  );
}