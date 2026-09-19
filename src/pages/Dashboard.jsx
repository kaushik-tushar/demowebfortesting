import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";

import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Building2,
  Car,
  ChevronRight,
  CircleDot,
  Clock3,
  CreditCard,
  Database,
  FileSearch,
  Fingerprint,
  Globe2,
  MapPin,
  MapPinned,
  Maximize2,
  Network,
  Phone,
  RefreshCw,
  Search,
  ShieldAlert,
  Target,
  UserRound,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

/* =========================================================
   CRIMEGRAPH AI
   Dashboard.jsx

   NOTE:
   The "ACTIVE INVESTIGATION" / case-switcher header has
   been completely removed.
   ========================================================= */


/* =========================================================
   GRAPH DATA
   ========================================================= */

const graphNodes = [
  {
    id: "ENT-9021",
    name: "Rajesh Sharma",
    alias: "Raju / Shadow",
    type: "Person",
    risk: 94,
    x: 450,
    y: 170,
  },
  {
    id: "ENT-4412",
    name: "Vikram Choudhury",
    alias: "Vicky",
    type: "Person",
    risk: 89,
    x: 235,
    y: 95,
  },
  {
    id: "ENT-1108",
    name: "Burner SIM-09",
    alias: "+91 98765 43210",
    type: "Phone",
    risk: 87,
    x: 235,
    y: 250,
  },
  {
    id: "ENT-3390",
    name: "Apex Logistics",
    alias: "Front Organization",
    type: "Organization",
    risk: 84,
    x: 665,
    y: 95,
  },
  {
    id: "ENT-5501",
    name: "Account-AX91",
    alias: "Bank Account",
    type: "Account",
    risk: 76,
    x: 665,
    y: 250,
  },
  {
    id: "ENT-5502",
    name: "Shell Account-02",
    alias: "Financial Entity",
    type: "Account",
    risk: 71,
    x: 805,
    y: 170,
  },
  {
    id: "ENT-7701",
    name: "Sector 62 Safehouse",
    alias: "Location",
    type: "Location",
    risk: 82,
    x: 450,
    y: 325,
  },
  {
    id: "ENT-6601",
    name: "MH-04 Transport Van",
    alias: "Vehicle",
    type: "Vehicle",
    risk: 69,
    x: 805,
    y: 325,
  },
];

const graphEdges = [
  {
    source: "ENT-9021",
    target: "ENT-1108",
    label: "CALLED",
  },
  {
    source: "ENT-1108",
    target: "ENT-4412",
    label: "CONNECTED_TO",
  },
  {
    source: "ENT-9021",
    target: "ENT-3390",
    label: "TRANSFERRED",
  },
  {
    source: "ENT-3390",
    target: "ENT-6601",
    label: "OWNS",
  },
  {
    source: "ENT-4412",
    target: "ENT-5501",
    label: "TRANSFERRED",
  },
  {
    source: "ENT-5501",
    target: "ENT-5502",
    label: "TRANSFERRED",
  },
  {
    source: "ENT-5502",
    target: "ENT-9021",
    label: "LINKED_TO",
  },
  {
    source: "ENT-9021",
    target: "ENT-7701",
    label: "VISITED",
  },
  {
    source: "ENT-1108",
    target: "ENT-7701",
    label: "LOCATED_AT",
  },
];


/* =========================================================
   ENTITY CONFIG
   ========================================================= */

const entityConfig = {
  Person: {
    icon: UserRound,
    shape: "ellipse",
    bg: "#eff6ff",
    border: "#2563eb",
    text: "#1d4ed8",
  },

  Phone: {
    icon: Phone,
    shape: "round-rectangle",
    bg: "#fdf2f8",
    border: "#db2777",
    text: "#be185d",
  },

  Organization: {
    icon: Building2,
    shape: "hexagon",
    bg: "#f5f3ff",
    border: "#7c3aed",
    text: "#6d28d9",
  },

  Account: {
    icon: CreditCard,
    shape: "rectangle",
    bg: "#ecfeff",
    border: "#0891b2",
    text: "#0e7490",
  },

  Location: {
    icon: MapPinned,
    shape: "diamond",
    bg: "#f0fdf4",
    border: "#16a34a",
    text: "#15803d",
  },

  Vehicle: {
    icon: Car,
    shape: "barrel",
    bg: "#fffbeb",
    border: "#d97706",
    text: "#b45309",
  },
};


/* =========================================================
   HELPERS
   ========================================================= */

function getRiskClass(risk) {
  if (risk >= 90) return "text-red-600";
  if (risk >= 80) return "text-orange-600";
  if (risk >= 70) return "text-amber-600";
  return "text-emerald-600";
}

function getRiskBg(risk) {
  if (risk >= 90) {
    return "bg-red-500/10 border-red-500/20";
  }

  if (risk >= 80) {
    return "bg-orange-500/10 border-orange-500/20";
  }

  if (risk >= 70) {
    return "bg-yellow-500/10 border-yellow-500/20";
  }

  return "bg-emerald-500/10 border-emerald-500/20";
}


/* =========================================================
   CYTOSCAPE GRAPH
   ========================================================= */

function CytoscapeGraph({
  fullScreen = false,
  onNodeSelect,
  selectedNode,
}) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  const originalPositions = useRef(
    graphNodes.reduce((acc, node) => {
      acc[node.id] = {
        x: node.x,
        y: node.y,
      };

      return acc;
    }, {})
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = [
      ...graphNodes.map((node) => ({
        data: {
          id: node.id,
          label: node.name,
          name: node.name,
          alias: node.alias,
          type: node.type,
          risk: node.risk,
        },

        position: {
          x: node.x,
          y: node.y,
        },
      })),

      ...graphEdges.map((edge, index) => ({
        data: {
          id: `EDGE-${index}`,
          source: edge.source,
          target: edge.target,
          label: edge.label,
        },
      })),
    ];

    const cy = cytoscape({
      container: containerRef.current,
      elements,

      layout: {
        name: "preset",
        fit: true,
        padding: fullScreen ? 100 : 40,
      },

      minZoom: 0.25,
      maxZoom: 3,
      wheelSensitivity: 0.15,
      boxSelectionEnabled: false,

      style: [
        {
          selector: "node",

          style: {
            "background-color": (ele) =>
              entityConfig[ele.data("type")]?.bg || "#ffffff",

            "border-color": (ele) =>
              entityConfig[ele.data("type")]?.border || "#64748b",

            "border-width": 2,

            color: "#0f172a",

            label: "data(label)",

            "font-size": fullScreen ? 13 : 10,
            "font-weight": 700,

            "text-wrap": "wrap",
            "text-max-width": fullScreen ? 120 : 90,

            "text-valign": "center",
            "text-halign": "center",

            "overlay-opacity": 0,

            width: fullScreen ? 70 : 55,
            height: fullScreen ? 70 : 55,

            shape: (ele) =>
              entityConfig[ele.data("type")]?.shape || "ellipse",

            "shadow-blur": 18,
            "shadow-opacity": 0.2,

            "shadow-color": (ele) =>
              entityConfig[ele.data("type")]?.border || "#64748b",

            "shadow-offset-x": 0,
            "shadow-offset-y": 0,
          },
        },

        {
          selector: "node:selected",

          style: {
            "border-color": "#1d4ed8",
            "border-width": 4,
            "shadow-blur": 30,
            "shadow-opacity": 0.7,
            "shadow-color": "#2563eb",
          },
        },

        {
          selector: "node.highlighted",

          style: {
            "border-color": "#1d4ed8",
            "border-width": 4,
            "shadow-blur": 35,
            "shadow-opacity": 0.9,

            "shadow-color": (ele) =>
              entityConfig[ele.data("type")]?.border || "#2563eb",

            opacity: 1,
          },
        },

        {
          selector: "node.dimmed",

          style: {
            opacity: 0.2,
          },
        },

        {
          selector: "edge",

          style: {
            width: 1.5,

            "line-color": "#94a3b8",

            "target-arrow-color": "#64748b",

            "target-arrow-shape": "triangle",

            "curve-style": "bezier",

            "arrow-scale": 0.8,

            label: "data(label)",

            color: "#475569",

            "font-size": fullScreen ? 10 : 8,
            "font-weight": 600,

            "text-rotation": "autorotate",

            "text-background-color": "#ffffff",

            "text-background-opacity": 0.95,

            "text-background-padding": 3,

            "text-border-color": "#e2e8f0",

            "text-border-width": 1,

            "text-border-opacity": 0.8,

            opacity: 0.85,
          },
        },

        {
          selector: "edge.highlighted",

          style: {
            width: 3,
            "line-color": "#2563eb",
            "target-arrow-color": "#2563eb",
            opacity: 1,
          },
        },

        {
          selector: "edge.dimmed",

          style: {
            opacity: 0.12,
          },
        },
      ],
    });

    cyRef.current = cy;

    /* NODE CLICK */

    cy.on("tap", "node", (event) => {
      const node = event.target;

      const nodeData = {
        id: node.data("id"),
        name: node.data("name"),
        alias: node.data("alias"),
        type: node.data("type"),
        risk: node.data("risk"),
      };

      if (onNodeSelect) {
        onNodeSelect(nodeData);
      }
    });

    /* DOUBLE CLICK */

    let lastTap = 0;

    cy.on("tap", "node", (event) => {
      const now = Date.now();

      if (now - lastTap < 350) {
        const node = event.target;

        cy.elements().removeClass("highlighted");
        cy.elements().removeClass("dimmed");

        const neighborhood = node.closedNeighborhood();

        cy.elements().addClass("dimmed");

        neighborhood.removeClass("dimmed");
        neighborhood.nodes().addClass("highlighted");
        neighborhood.edges().addClass("highlighted");
      }

      lastTap = now;
    });

    /* BACKGROUND CLICK */

    cy.on("tap", (event) => {
      if (event.target === cy) {
        cy.elements().removeClass("highlighted");
        cy.elements().removeClass("dimmed");

        if (onNodeSelect) {
          onNodeSelect(null);
        }
      }
    });

    return () => {
      cy.destroy();
      cyRef.current = null;
    };
  }, [fullScreen, onNodeSelect]);

  /* SELECTED NODE */

  useEffect(() => {
    const cy = cyRef.current;

    if (!cy) return;

    cy.elements().removeClass("highlighted");
    cy.elements().removeClass("dimmed");

    if (!selectedNode) return;

    const node = cy.getElementById(selectedNode.id);

    if (!node || node.empty()) return;

    const neighborhood = node.closedNeighborhood();

    cy.elements().addClass("dimmed");

    neighborhood.removeClass("dimmed");

    node.addClass("highlighted");

    neighborhood.edges().addClass("highlighted");
  }, [selectedNode]);

  /* CONTROLS */

  const zoomIn = () => {
    const cy = cyRef.current;

    if (!cy) return;

    cy.zoom({
      level: Math.min(cy.zoom() * 1.25, 3),

      renderedPosition: {
        x: cy.width() / 2,
        y: cy.height() / 2,
      },
    });
  };

  const zoomOut = () => {
    const cy = cyRef.current;

    if (!cy) return;

    cy.zoom({
      level: Math.max(cy.zoom() / 1.25, 0.25),

      renderedPosition: {
        x: cy.width() / 2,
        y: cy.height() / 2,
      },
    });
  };

  const fitGraph = () => {
    const cy = cyRef.current;

    if (!cy) return;

    cy.fit(undefined, fullScreen ? 100 : 40);
  };

  const resetPositions = () => {
    const cy = cyRef.current;

    if (!cy) return;

    cy.batch(() => {
      graphNodes.forEach((node) => {
        cy.getElementById(node.id).position({
          x: originalPositions.current[node.id].x,
          y: originalPositions.current[node.id].y,
        });
      });
    });

    cy.fit(undefined, fullScreen ? 100 : 40);

    cy.elements().removeClass("highlighted");
    cy.elements().removeClass("dimmed");
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        ref={containerRef}
        className="absolute inset-0"
      />

      {/* GRAPH CONTROLS */}

      <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-100"
          title="Zoom In"
        >
          <ZoomIn size={17} />
        </button>

        <button
          onClick={zoomOut}
          className="rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-100"
          title="Zoom Out"
        >
          <ZoomOut size={17} />
        </button>

        <button
          onClick={fitGraph}
          className="rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-100"
          title="Fit Graph"
        >
          <Maximize2 size={17} />
        </button>

        <button
          onClick={resetPositions}
          className="rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-100"
          title="Reset Positions"
        >
          <RefreshCw size={17} />
        </button>
      </div>

      {fullScreen && (
        <div className="absolute bottom-4 left-4 z-20 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
          <span className="text-slate-700">
            Drag
          </span>{" "}
          entities to reposition them • Scroll to zoom •
          Drag empty space to pan
        </div>
      )}
    </div>
  );
}


/* =========================================================
   ENTITY DETAILS
   ========================================================= */

function EntityDetails({ entity, onClose }) {
  if (!entity) return null;

  const config =
    entityConfig[entity.type] || entityConfig.Person;

  const Icon = config.icon;

  return (
    <div className="absolute bottom-4 left-4 z-30 w-[330px] rounded-md border border-slate-200 bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-md border"
            style={{
              backgroundColor: config.bg,
              borderColor: config.border,
              color: config.text,
            }}
          >
            <Icon size={21} />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              {entity.id}
            </p>

            <h3 className="text-sm font-bold text-slate-900">
              {entity.name}
            </h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-xs text-slate-500">
          Alias / Identifier
        </p>

        <p className="text-sm text-slate-700">
          {entity.alias}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Entity Type
          </p>

          <p
            className="mt-1 text-sm font-semibold"
            style={{ color: config.text }}
          >
            {entity.type}
          </p>
        </div>

        <div
          className={`rounded-md border p-3 ${getRiskBg(
            entity.risk
          )}`}
        >
          <p className="text-[10px] uppercase tracking-wider text-slate-500">
            Risk Score
          </p>

          <p
            className={`mt-1 text-lg font-bold ${getRiskClass(
              entity.risk
            )}`}
          >
            {entity.risk}%
          </p>
        </div>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-blue-200 bg-blue-50 py-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-100">
        <FileSearch size={15} />
        Open Entity Dossier
      </button>
    </div>
  );
}


/* =========================================================
   KPI CARD
   ========================================================= */

function KpiCard({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          <div
            className={`mt-2 flex items-center gap-1 text-xs ${
              positive
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {positive ? (
              <ArrowUpRight size={13} />
            ) : (
              <ArrowDownRight size={13} />
            )}

            {change}
          </div>
        </div>

        <div className="rounded-md border border-blue-100 bg-blue-50 p-2.5 text-blue-600">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   DASHBOARD
   ========================================================= */

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] =
    useState("All");

  const [regionModalOpen, setRegionModalOpen] =
    useState(false);

  const [graphModalOpen, setGraphModalOpen] =
    useState(false);

  const [selectedGraphNode, setSelectedGraphNode] =
    useState(null);

  const [selectedEntityModal, setSelectedEntityModal] =
    useState(null);

  const [selectedAlertModal, setSelectedAlertModal] =
    useState(null);

  const [allAlertsModalOpen, setAllAlertsModalOpen] =
    useState(false);

  const [notificationToast, setNotificationToast] =
    useState(false);

  /* =======================================================
     TOAST
     ======================================================= */

  const triggerToast = () => {
    setNotificationToast(true);

    setTimeout(() => {
      setNotificationToast(false);
    }, 2500);
  };


  /* =======================================================
     DATA
     ======================================================= */

  const kpis = [
    {
      title: "Active Cases",
      value: "142",
      change: "+12%",
      icon: Target,
      positive: true,
    },
    {
      title: "High-Risk Entities",
      value: "38",
      change: "+5",
      icon: ShieldAlert,
      positive: false,
    },
    {
      title: "Detected Networks",
      value: "19",
      change: "+2",
      icon: Network,
      positive: true,
    },
    {
      title: "Critical Alerts",
      value: "07",
      change: "-3",
      icon: AlertTriangle,
      positive: true,
    },
    {
      title: "Evidence Logs",
      value: "1,842",
      change: "+124",
      icon: Database,
      positive: true,
    },
  ];

  const highRiskEntities = [
    {
      id: "ENT-9021",
      name: "Rajesh “Raju” Sharma",
      alias: "Shadow",
      risk: 94,
      centrality: "96%",
      connections: 42,
      type: "Person",
      threat: "Human Trafficking Syndicate",
    },
    {
      id: "ENT-4412",
      name: "Vikram Choudhury",
      alias: "Vicky",
      risk: 89,
      centrality: "91%",
      connections: 31,
      type: "Person",
      threat: "Financial Fraud / Laundering",
    },
    {
      id: "ENT-1108",
      name: "+91 98765 43210",
      alias: "Burner SIM-09",
      risk: 87,
      centrality: "88%",
      connections: 56,
      type: "Phone",
      threat: "Extortion Network",
    },
    {
      id: "ENT-3390",
      name: "Apex Logistics Pvt Ltd",
      alias: "Front Org",
      risk: 84,
      centrality: "82%",
      connections: 24,
      type: "Organization",
      threat: "Illegal Transport",
    },
  ];

  const criticalAlerts = [
    {
      id: "ALT-882",
      title: "Sudden Communication Burst",
      description:
        "47 calls between Person-001 & Burner-09 in 2 hrs",
      time: "14 mins ago",
      severity: "HIGH",
      category: "CDR Anomaly",
    },
    {
      id: "ALT-881",
      title: "Circular Financial Transaction",
      description:
        "₹42,00,000 looped across 4 shell accounts in 30 min",
      time: "1 hr ago",
      severity: "CRITICAL",
      category: "Financial",
    },
    {
      id: "ALT-879",
      title: "Location Co-location Detected",
      description:
        "3 high-risk entities at Sector 62 Safehouse",
      time: "3 hrs ago",
      severity: "HIGH",
      category: "Geographic",
    },
  ];

  const activities = [
    {
      id: "ACT-102",
      text:
        "FIR-2026-901 parsed & connected to Case #26189-042",
      source: "AI Ingestion Engine",
      time: "10m ago",
    },
    {
      id: "ACT-101",
      text:
        "SHA-256 Blockchain Hash generated for Evidence #EV-4419",
      source: "Officer V. Kumar",
      time: "25m ago",
    },
    {
      id: "ACT-100",
      text:
        "New edge added: ENT-9021 → TRANSFERRED → ENT-3390",
      source: "Graph Analytics System",
      time: "1h ago",
    },
    {
      id: "ACT-099",
      text:
        "Intelligence Brief generated for NCRB Women Safety Cell",
      source: "Senior Analyst R. Roy",
      time: "2h ago",
    },
  ];

  const regions = [
    "All",
    "NCR Zone - District 04",
    "Western Corridor",
    "Eastern Financial Hub",
  ];


  /* =======================================================
     UI
     ======================================================= */

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">

      {/* =================================================
          CONTENT
          ================================================= */}

      <main className="mx-auto max-w-[1800px] px-5 py-5">

        {/* =================================================
            KPI
            ================================================= */}

        <section className="grid grid-cols-2 gap-3 xl:grid-cols-5">
          {kpis.map((kpi) => (
            <KpiCard
              key={kpi.title}
              {...kpi}
            />
          ))}
        </section>


        {/* =================================================
            MAIN GRID
            ================================================= */}

        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* =================================================
              LEFT COLUMN
              ================================================= */}

          <div className="space-y-5 xl:col-span-2">

            {/* =================================================
                NETWORK GRAPH
                ================================================= */}

            <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

                <div>
                  <div className="flex items-center gap-2">
                    <Network
                      size={16}
                      className="text-blue-600"
                    />

                    <h2 className="text-sm font-bold text-slate-900">
                      Active Criminal Networks Overview
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Entity relationship intelligence graph
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedGraphNode(null);
                    setGraphModalOpen(true);
                  }}
                  className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                >
                  <Maximize2 size={14} />
                  Open Full Graph
                </button>
              </div>

              <div className="relative h-[460px]">

                <CytoscapeGraph
                  fullScreen={false}
                  onNodeSelect={() => {}}
                  selectedNode={null}
                />

                <div className="pointer-events-none absolute bottom-4 left-4 rounded-md border border-slate-200 bg-white/95 px-3 py-2 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Network Status
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />

                    Live graph intelligence
                  </div>
                </div>
              </div>
            </div>


            {/* =================================================
                HIGH RISK ENTITY WATCHLIST
                ================================================= */}

            <div className="rounded-md border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    High-Risk Entity Watchlist
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Highest priority entities detected by graph analytics
                  </p>
                </div>

                <Search
                  size={17}
                  className="text-slate-500"
                />
              </div>

              <div className="divide-y divide-slate-100">

                {highRiskEntities.map((entity) => {
                  const config =
                    entityConfig[entity.type] ||
                    entityConfig.Person;

                  const Icon = config.icon;

                  return (
                    <button
                      key={entity.id}
                      onClick={() =>
                        setSelectedEntityModal(entity)
                      }
                      className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex min-w-0 items-center gap-3">

                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border"
                          style={{
                            backgroundColor: config.bg,
                            borderColor: config.border,
                            color: config.text,
                          }}
                        >
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-slate-900">
                            {entity.name}
                          </p>

                          <p className="truncate text-[10px] text-slate-500">
                            {entity.alias} • {entity.type}
                          </p>
                        </div>
                      </div>

                      <div className="ml-3 flex shrink-0 items-center gap-4">

                        <div className="hidden text-right sm:block">
                          <p className="text-[10px] text-slate-500">
                            Connections
                          </p>

                          <p className="text-xs font-semibold text-slate-700">
                            {entity.connections}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[10px] text-slate-500">
                            Risk
                          </p>

                          <p
                            className={`text-sm font-bold ${getRiskClass(
                              entity.risk
                            )}`}
                          >
                            {entity.risk}%
                          </p>
                        </div>

                        <ChevronRight
                          size={15}
                          className="text-slate-500"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>


          {/* =================================================
              RIGHT COLUMN
              ================================================= */}

          <div className="space-y-5">

            {/* =================================================
                ALERTS
                ================================================= */}

            <div className="rounded-md border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Critical Anomaly Alerts
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    AI-generated intelligence alerts
                  </p>
                </div>

                <ShieldAlert
                  size={17}
                  className="text-red-600"
                />
              </div>

              <div className="divide-y divide-slate-100">

                {criticalAlerts.map((alert) => (
                  <button
                    key={alert.id}
                    onClick={() =>
                      setSelectedAlertModal(alert)
                    }
                    className="w-full px-4 py-4 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-red-400" />

                          <p className="text-xs font-semibold text-slate-900">
                            {alert.title}
                          </p>
                        </div>

                        <p className="mt-2 text-[11px] leading-5 text-slate-500">
                          {alert.description}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
                          <Clock3 size={11} />

                          {alert.time}

                          <span>•</span>

                          {alert.category}
                        </div>
                      </div>

                      <span className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[9px] font-bold text-red-600">
                        {alert.severity}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setAllAlertsModalOpen(true)}
                className="w-full border-t border-slate-200 px-4 py-3 text-center text-xs font-semibold text-blue-600 hover:bg-slate-50"
              >
                View All Alerts
              </button>
            </div>


            {/* =================================================
                GEOGRAPHIC HOTSPOTS
                ================================================= */}

            <div className="rounded-md border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-200 px-4 py-3">

                <div className="flex items-center gap-2">
                  <Globe2
                    size={16}
                    className="text-emerald-600"
                  />

                  <h2 className="text-sm font-bold text-slate-900">
                    Geographic Hotspots
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  High-risk activity concentration
                </p>
              </div>

              <div className="space-y-3 p-4">

                {[
                  ["Sector 62", 87],
                  ["District 04", 72],
                  ["Western Corridor", 61],
                  ["Eastern Financial Hub", 48],
                ].map(([name, score]) => (
                  <div key={name}>

                    <div className="mb-1.5 flex justify-between text-xs">

                      <span className="text-slate-500">
                        {name}
                      </span>

                      <span className="font-semibold text-slate-700">
                        {score}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${score}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* =================================================
                AUDIT STREAM
                ================================================= */}

            <div className="rounded-md border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    System Audit & Integrity Stream
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Immutable system activity
                  </p>
                </div>

                <Fingerprint
                  size={17}
                  className="text-violet-600"
                />
              </div>

              <div className="divide-y divide-slate-100">

                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="px-4 py-3"
                  >
                    <div className="flex gap-3">

                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />

                      <div className="min-w-0">

                        <p className="text-[11px] leading-5 text-slate-700">
                          {activity.text}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-slate-500">

                          <span>
                            {activity.source}
                          </span>

                          <span>•</span>

                          <span>
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>


      {/* =====================================================
          FULL GRAPH MODAL
          ===================================================== */}

      {graphModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-50">

          <div className="flex h-full flex-col">

            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">

              <div>
                <div className="flex items-center gap-2">

                  <Network
                    size={19}
                    className="text-blue-600"
                  />

                  <h2 className="text-base font-bold text-slate-900">
                    Criminal Network Graph
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Interactive entity relationship intelligence
                </p>
              </div>

              <div className="flex items-center gap-2">

                <div className="hidden items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] text-slate-500 md:flex">

                  <CircleDot
                    size={12}
                    className="text-emerald-600"
                  />

                  {graphNodes.length} Entities

                  <span className="text-slate-700">
                    •
                  </span>

                  {graphEdges.length} Relationships
                </div>

                <button
                  onClick={() => {
                    setGraphModalOpen(false);
                    setSelectedGraphNode(null);
                  }}
                  className="rounded-md border border-slate-200 bg-slate-50 p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative flex-1">

              <CytoscapeGraph
                fullScreen={true}
                onNodeSelect={setSelectedGraphNode}
                selectedNode={selectedGraphNode}
              />

              {/* ENTITY LEGEND */}

              <div className="absolute left-4 top-4 z-30 rounded-md border border-slate-200 bg-white p-3 shadow-sm">

                <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  Entity Types
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">

                  {Object.entries(entityConfig).map(
                    ([type, config]) => {
                      const Icon = config.icon;

                      return (
                        <div
                          key={type}
                          className="flex items-center gap-2"
                        >
                          <div
                            className="flex h-5 w-5 items-center justify-center rounded-md border"
                            style={{
                              backgroundColor: config.bg,
                              borderColor: config.border,
                              color: config.text,
                            }}
                          >
                            <Icon size={11} />
                          </div>

                          <span className="text-[10px] text-slate-500">
                            {type}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <EntityDetails
                entity={selectedGraphNode}
                onClose={() =>
                  setSelectedGraphNode(null)
                }
              />
            </div>
          </div>
        </div>
      )}


      {/* =====================================================
          REGION MODAL
          ===================================================== */}

      {regionModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/30 p-4">

          <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-5 shadow-lg">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h3 className="font-bold text-slate-900">
                  Select Region
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Filter intelligence by operational region
                </p>
              </div>

              <button
                onClick={() =>
                  setRegionModalOpen(false)
                }
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-2">

              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region);
                    setRegionModalOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm transition ${
                    selectedRegion === region
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {region}

                  {selectedRegion === region && (
                    <CircleDot
                      size={14}
                      className="text-blue-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* =====================================================
          ENTITY MODAL
          ===================================================== */}

      {selectedEntityModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/30 p-4">

          <div className="w-full max-w-lg rounded-md border border-slate-200 bg-white p-5 shadow-lg">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-blue-200 bg-blue-50 text-blue-600">
                  <UserRound size={22} />
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">
                    {selectedEntityModal.id}
                  </p>

                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedEntityModal.name}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {selectedEntityModal.alias}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setSelectedEntityModal(null)
                }
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={17} />
              </button>
            </div>


            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Risk Score
                </p>

                <p
                  className={`mt-1 text-2xl font-bold ${getRiskClass(
                    selectedEntityModal.risk
                  )}`}
                >
                  {selectedEntityModal.risk}%
                </p>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Centrality
                </p>

                <p className="mt-1 text-2xl font-bold text-blue-700">
                  {selectedEntityModal.centrality}
                </p>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Connections
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {selectedEntityModal.connections}
                </p>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">
                  Entity Type
                </p>

                <p className="mt-1 text-sm font-bold text-violet-700">
                  {selectedEntityModal.type}
                </p>
              </div>
            </div>


            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">

              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Threat Classification
              </p>

              <p className="mt-1 text-sm font-semibold text-red-600">
                {selectedEntityModal.threat}
              </p>
            </div>


            <div className="mt-5 flex gap-2">

              <button
                onClick={() => {
                  const entity = selectedEntityModal;

                  setSelectedEntityModal(null);

                  setSelectedGraphNode(
                    graphNodes.find(
                      (n) => n.id === entity.id
                    )
                  );

                  setGraphModalOpen(true);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-50 py-3 text-xs font-bold text-blue-700 hover:bg-blue-100"
              >
                <Network size={15} />
                View in Graph
              </button>

              <button
                onClick={() =>
                  setSelectedEntityModal(null)
                }
                className="rounded-md border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* =====================================================
          ALERT MODAL
          ===================================================== */}

      {selectedAlertModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/30 p-4">

          <div className="w-full max-w-lg rounded-md border border-slate-200 bg-white p-5 shadow-lg">

            <div className="flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <AlertTriangle
                    size={18}
                    className="text-red-600"
                  />

                  <span className="text-[10px] font-bold text-red-600">
                    {selectedAlertModal.id}
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  {selectedAlertModal.title}
                </h3>
              </div>

              <button
                onClick={() =>
                  setSelectedAlertModal(null)
                }
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={17} />
              </button>
            </div>


            <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-4">

              <p className="text-sm leading-6 text-slate-700">
                {selectedAlertModal.description}
              </p>
            </div>


            <div className="mt-4 grid grid-cols-2 gap-3">

              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">

                <p className="text-[10px] text-slate-500">
                  Severity
                </p>

                <p className="mt-1 text-sm font-bold text-red-600">
                  {selectedAlertModal.severity}
                </p>
              </div>

              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">

                <p className="text-[10px] text-slate-500">
                  Category
                </p>

                <p className="mt-1 text-sm font-bold text-blue-700">
                  {selectedAlertModal.category}
                </p>
              </div>
            </div>


            <button
              onClick={() =>
                setSelectedAlertModal(null)
              }
              className="mt-5 w-full rounded-md border border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Close Investigation
            </button>
          </div>
        </div>
      )}


      {/* =====================================================
          ALL ALERTS MODAL
          ===================================================== */}

      {allAlertsModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/30 p-4">

          <div className="max-h-[80vh] w-full max-w-2xl overflow-auto rounded-md border border-slate-200 bg-white shadow-lg">

            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">

              <div>

                <h3 className="font-bold text-slate-900">
                  Intelligence Alert Center
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  All active anomaly detections
                </p>
              </div>

              <button
                onClick={() =>
                  setAllAlertsModalOpen(false)
                }
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={17} />
              </button>
            </div>


            <div className="divide-y divide-slate-100">

              {[
                ...criticalAlerts,

                {
                  id: "ALT-875",
                  title: "Suspicious Vehicle Movement",
                  description:
                    "MH-04 Transport Van detected across 4 locations.",
                  time: "5 hrs ago",
                  severity: "MEDIUM",
                  category: "Vehicle",
                },

                {
                  id: "ALT-870",
                  title: "New High Centrality Entity",
                  description:
                    "New entity crossed network centrality threshold.",
                  time: "8 hrs ago",
                  severity: "HIGH",
                  category: "Graph Analytics",
                },
              ].map((alert) => (
                <div
                  key={alert.id}
                  className="px-5 py-4"
                >

                  <div className="flex justify-between gap-4">

                    <div>

                      <p className="text-sm font-semibold text-slate-900">
                        {alert.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {alert.description}
                      </p>

                      <p className="mt-2 text-[10px] text-slate-500">
                        {alert.id} • {alert.time} •{" "}
                        {alert.category}
                      </p>
                    </div>

                    <span className="h-fit rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[9px] font-bold text-red-600">
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* =====================================================
          TOAST
          ===================================================== */}

      {notificationToast && (
        <div className="fixed bottom-5 right-5 z-[200] flex items-center gap-3 rounded-md border border-blue-200 bg-white px-4 py-3 shadow-lg">

          <div className="rounded-md bg-blue-50 p-2 text-blue-600">
            <Bell size={15} />
          </div>

          <div>

            <p className="text-xs font-semibold text-slate-900">
              Intelligence feed synchronized
            </p>

            <p className="text-[10px] text-slate-500">
              Latest graph and anomaly data loaded.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}