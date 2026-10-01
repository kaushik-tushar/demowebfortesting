import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import neo4j from "neo4j-driver";

if (!cytoscape.prototype.hasInitialisedFcose) {
  cytoscape.use(fcose);
  cytoscape.prototype.hasInitialisedFcose = true;
}

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
    NEO4J CONFIG
   ========================================================= */

const NEO4J_URI = "neo4j+s://8616ba23.databases.neo4j.io";
const NEO4J_USERNAME = "8616ba23";
const NEO4J_PASSWORD = "o_QA1eS_XZg2g_SZDABowvtNmMj0-q3BkyfvdtgGF-c";
const NEO4J_DATABASE = "8616ba23";

let neo4jDriver = null;


/* =========================================================
    STATIC FALLBACK GRAPH
   ========================================================= */

const fallbackGraphNodes = [
  { id: "ENT-9021", name: "Rajesh Sharma", alias: "Raju / Shadow", type: "Person", risk: 94 },
  { id: "ENT-4412", name: "Vikram Choudhury", alias: "Vicky", type: "Person", risk: 89 },
  { id: "ENT-1108", name: "Burner SIM-09", alias: "+91 98765 43210", type: "Phone", risk: 87 },
  { id: "ENT-3390", name: "Apex Logistics", alias: "Front Organization", type: "Organization", risk: 84 },
  { id: "ENT-5501", name: "Account-AX91", alias: "Bank Account", type: "Account", risk: 76 },
  { id: "ENT-5502", name: "Shell Account-02", alias: "Financial Entity", type: "Account", risk: 71 },
  { id: "ENT-7701", name: "Sector 62 Safehouse", alias: "Location", type: "Location", risk: 82 },
  { id: "ENT-6601", name: "MH-04 Transport Van", alias: "Vehicle", type: "Vehicle", risk: 69 },
];

const fallbackGraphEdges = [
  { source: "ENT-9021", target: "ENT-1108", label: "CALLED" },
  { source: "ENT-1108", target: "ENT-4412", label: "CONNECTED_TO" },
  { source: "ENT-9021", target: "ENT-3390", label: "TRANSFERRED" },
  { source: "ENT-3390", target: "ENT-6601", label: "OWNS" },
  { source: "ENT-4412", target: "ENT-5501", label: "TRANSFERRED" },
  { source: "ENT-5501", target: "ENT-5502", label: "TRANSFERRED" },
  { source: "ENT-5502", target: "ENT-9021", label: "LINKED_TO" },
  { source: "ENT-9021", target: "ENT-7701", label: "VISITED" },
  { source: "ENT-1108", target: "ENT-7701", label: "LOCATED_AT" },
];


/* =========================================================
    ENTITY CONFIG
   ========================================================= */

const entityConfig = {
  Person: { icon: UserRound, shape: "ellipse", bg: "#eff6ff", border: "#2563eb", text: "#1d4ed8" },
  Phone: { icon: Phone, shape: "round-rectangle", bg: "#fdf2f8", border: "#db2777", text: "#be185d" },
  Organization: { icon: Building2, shape: "hexagon", bg: "#f5f3ff", border: "#7c3aed", text: "#6d28d9" },
  Account: { icon: CreditCard, shape: "rectangle", bg: "#ecfeff", border: "#0891b2", text: "#0e7490" },
  Location: { icon: MapPinned, shape: "diamond", bg: "#f0fdf4", border: "#16a34a", text: "#15803d" },
  Vehicle: { icon: Car, shape: "barrel", bg: "#fffbeb", border: "#d97706", text: "#b45309" },
  Unknown: { icon: CircleDot, shape: "ellipse", bg: "#f8fafc", border: "#64748b", text: "#475569" },
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
  if (risk >= 90) return "bg-red-500/10 border-red-500/20";
  if (risk >= 80) return "bg-orange-500/10 border-orange-500/20";
  if (risk >= 70) return "bg-yellow-500/10 border-yellow-500/20";
  return "bg-emerald-500/10 border-emerald-500/20";
}

function normalizeNeo4jValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
  if (typeof value === "object" && typeof value.toNumber === "function") {
    try { return value.toNumber(); } catch { return value.toString(); }
  }
  if (typeof value === "object") {
    try { return JSON.parse(JSON.stringify(value)); } catch { return String(value); }
  }
  return String(value);
}

function getNeo4jDriver() {
  if (!neo4jDriver) {
    neo4jDriver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));
  }
  return neo4jDriver;
}


/* =========================================================
    NEO4J GRAPH FETCH (LIMITED TO RECENT 50)
   ========================================================= */

async function fetchNeo4jGraph() {
  const driver = getNeo4jDriver();

  const result = await driver.executeQuery(
    `
      MATCH (n)-[r]->(m)
      RETURN n, r, m
      ORDER BY elementId(n) DESC
      LIMIT 50
    `,
    {},
    { database: NEO4J_DATABASE, routing: "READ" }
  );

  const nodesMap = new Map();
  const edgesMap = new Map();

  result.records.forEach((record) => {
    const n = record.get("n");
    const r = record.get("r");
    const m = record.get("m");

    if (!n || !m || !r) return;

    const processNode = (node) => {
      const props = node.properties || {};
      const labels = node.labels || [];
      const primaryLabel = labels.length > 0 ? labels[0] : "Unknown";

      const rawId = props.id ?? props.entityId ?? props.entity_id ?? props.uuid ?? props._id ?? node.elementId;
      const id = String(rawId);

      const name = props.name ?? props.fullName ?? props.full_name ?? props.title ?? props.phone ?? props.number ?? id;
      const alias = props.alias ?? props.identifier ?? props.email ?? props.phone ?? primaryLabel;
      const rawRisk = props.risk ?? props.riskScore ?? props.risk_score ?? props.score ?? 0;
      const riskNumber = Number(normalizeNeo4jValue(rawRisk)) || 0;

      if (!nodesMap.has(id)) {
        nodesMap.set(id, {
          id,
          name: String(name),
          alias: String(alias),
          type: primaryLabel,
          risk: Math.max(0, Math.min(100, riskNumber)),
          labels,
          properties: Object.fromEntries(
            Object.entries(props).map(([key, value]) => [key, normalizeNeo4jValue(value)])
          ),
        });
      }
    };

    processNode(n);
    processNode(m);

    const source = String(n.elementId);
    const target = String(m.elementId);
    const relationshipId = r.elementId || `${source}-${target}-${r.type}`;

    if (!edgesMap.has(relationshipId)) {
      edgesMap.set(relationshipId, {
        id: String(relationshipId),
        source,
        target,
        label: r.type || "RELATED_TO",
        properties: Object.fromEntries(
          Object.entries(r.properties || {}).map(([key, value]) => [key, normalizeNeo4jValue(value)])
        ),
      });
    }
  });

  const rawRecords = result.records;
  const elementToDisplayId = new Map();

  rawRecords.forEach((record) => {
    ["n", "m"].forEach((key) => {
      const node = record.get(key);
      if (!node) return;
      const props = node.properties || {};
      const rawId = props.id ?? props.entityId ?? props.entity_id ?? props.uuid ?? props._id ?? node.elementId;
      elementToDisplayId.set(String(node.elementId), String(rawId));
    });
  });

  const finalEdges = [];
  edgesMap.forEach((edge) => {
    const mappedSource = elementToDisplayId.get(edge.source) || edge.source;
    const mappedTarget = elementToDisplayId.get(edge.target) || edge.target;

    if (nodesMap.has(mappedSource) && nodesMap.has(mappedTarget)) {
      finalEdges.push({ ...edge, source: mappedSource, target: mappedTarget });
    }
  });

  return {
    nodes: Array.from(nodesMap.values()),
    edges: finalEdges,
  };
}


/* =========================================================
    CYTOSCAPE GRAPH COMPONENT (WITH ENTITY SEARCH)
   ========================================================= */

function CytoscapeGraph({
  fullScreen = false,
  onNodeSelect,
  selectedNode,
  graphNodes,
  graphEdges,
}) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!containerRef.current || !graphNodes?.length) return;

    const elements = [
      ...graphNodes.map((node) => ({
        data: {
          id: node.id,
          label: node.name,
          name: node.name,
          alias: node.alias,
          type: node.type,
          risk: node.risk,
          labels: node.labels || [],
          properties: node.properties || {},
        },
      })),
      ...graphEdges.map((edge, index) => ({
        data: {
          id: edge.id || `EDGE-${index}`,
          source: edge.source,
          target: edge.target,
          label: edge.label,
          properties: edge.properties || {},
        },
      })),
    ];

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      layout: {
        name: "fcose",
        quality: "default",
        animate: true,
        fit: true,
        padding: fullScreen ? 80 : 30,
        randomize: true,
        nodeSeparation: 80,
      },
      minZoom: 0.2,
      maxZoom: 3,
      wheelSensitivity: 0.15,
      boxSelectionEnabled: false,
      style: [
        {
          selector: "node",
          style: {
            "background-color": (ele) => entityConfig[ele.data("type")]?.bg || "#ffffff",
            "border-color": (ele) => entityConfig[ele.data("type")]?.border || "#64748b",
            "border-width": 2,
            color: "#0f172a",
            label: "data(label)",
            "font-size": fullScreen ? 12 : 9,
            "font-weight": 700,
            "text-wrap": "wrap",
            "text-max-width": fullScreen ? 110 : 80,
            "text-valign": "center",
            "text-halign": "center",
            "overlay-opacity": 0,
            width: fullScreen ? 65 : 50,
            height: fullScreen ? 65 : 50,
            shape: (ele) => entityConfig[ele.data("type")]?.shape || "ellipse",
            "shadow-blur": 15,
            "shadow-opacity": 0.2,
            "shadow-color": (ele) => entityConfig[ele.data("type")]?.border || "#64748b",
          },
        },
        {
          selector: "node:selected",
          style: {
            "border-color": "#1d4ed8",
            "border-width": 4,
            "shadow-blur": 25,
            "shadow-opacity": 0.7,
            "shadow-color": "#2563eb",
          },
        },
        {
          selector: "node.highlighted",
          style: {
            "border-color": "#1d4ed8",
            "border-width": 4,
            "shadow-blur": 30,
            "shadow-opacity": 0.9,
            opacity: 1,
          },
        },
        {
          selector: "node.dimmed",
          style: { opacity: 0.2 },
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
          style: { opacity: 0.12 },
        },
      ],
    });

    cyRef.current = cy;

    cy.on("tap", "node", (event) => {
      const node = event.target;
      const nodeData = {
        id: node.data("id"),
        name: node.data("name"),
        alias: node.data("alias"),
        type: node.data("type"),
        risk: node.data("risk"),
        labels: node.data("labels"),
        properties: node.data("properties"),
      };
      if (onNodeSelect) onNodeSelect(nodeData);
    });

    let lastTap = 0;
    cy.on("tap", "node", (event) => {
      const now = Date.now();
      if (now - lastTap < 350) {
        const node = event.target;
        cy.elements().removeClass("highlighted").removeClass("dimmed");
        const neighborhood = node.closedNeighborhood();
        cy.elements().addClass("dimmed");
        neighborhood.removeClass("dimmed");
        neighborhood.nodes().addClass("highlighted");
        neighborhood.edges().addClass("highlighted");
      }
      lastTap = now;
    });

    cy.on("tap", (event) => {
      if (event.target === cy) {
        cy.elements().removeClass("highlighted").removeClass("dimmed");
        if (onNodeSelect) onNodeSelect(null);
      }
    });

    return () => {
      cy.destroy();
      cyRef.current = null;
    };
  }, [fullScreen, graphNodes, graphEdges, onNodeSelect]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;
    cy.elements().removeClass("highlighted").removeClass("dimmed");
    if (!selectedNode) return;
    const node = cy.getElementById(selectedNode.id);
    if (!node || node.empty()) return;
    const neighborhood = node.closedNeighborhood();
    cy.elements().addClass("dimmed");
    neighborhood.removeClass("dimmed");
    node.addClass("highlighted");
    neighborhood.edges().addClass("highlighted");
  }, [selectedNode]);

  // Search filter handler for graph entities & associations
  const handleGraphSearch = (e) => {
    e.preventDefault();
    const cy = cyRef.current;
    if (!cy) return;

    cy.elements().removeClass("highlighted").removeClass("dimmed");

    if (!searchTerm.trim()) return;

    const matchedNodes = cy.nodes().filter((node) => {
      const name = (node.data("name") || "").toLowerCase();
      const alias = (node.data("alias") || "").toLowerCase();
      const id = (node.data("id") || "").toLowerCase();
      const query = searchTerm.toLowerCase();
      return name.includes(query) || alias.includes(query) || id.includes(query);
    });

    if (matchedNodes.empty()) {
      alert("No matching entity found in graph.");
      return;
    }

    // Gather neighborhood for all matched nodes
    let network = matchedNodes.closedNeighborhood();
    cy.elements().addClass("dimmed");
    network.removeClass("dimmed");
    network.nodes().addClass("highlighted");
    network.edges().addClass("highlighted");

    // Center/Fit view on matched elements
    cy.fit(network, 60);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    const cy = cyRef.current;
    if (!cy) return;
    cy.elements().removeClass("highlighted").removeClass("dimmed");
    cy.fit(undefined, fullScreen ? 80 : 30);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Graph Search Bar Overlay */}
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 bg-white/95 p-2 rounded-md border border-slate-200 shadow-sm">
        <form onSubmit={handleGraphSearch} className="flex items-center gap-2">
          <Search size={15} className="text-slate-400 ml-1" />
          <input
            type="text"
            placeholder="Search entity & relations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs bg-transparent outline-none w-44 text-slate-700 placeholder:text-slate-400"
          />
          {searchTerm && (
            <button type="button" onClick={handleClearSearch} className="text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          )}
          <button type="submit" className="bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-md font-semibold hover:bg-blue-700">
            Find
          </button>
        </form>
      </div>

      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
        <button onClick={() => cyRef.current?.zoom(cyRef.current.zoom() * 1.25)} className="rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-100" title="Zoom In"><ZoomIn size={17} /></button>
        <button onClick={() => cyRef.current?.zoom(cyRef.current.zoom() / 1.25)} className="rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-100" title="Zoom Out"><ZoomOut size={17} /></button>
        <button onClick={() => cyRef.current?.fit(undefined, fullScreen ? 80 : 30)} className="rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-100" title="Fit Graph"><Maximize2 size={17} /></button>
      </div>
    </div>
  );
}


/* =========================================================
    ENTITY DETAILS & KPI COMPONENTS
   ========================================================= */

function EntityDetails({ entity, onClose }) {
  if (!entity) return null;
  const config = entityConfig[entity.type] || entityConfig.Unknown;
  const Icon = config.icon;

  return (
    <div className="absolute bottom-4 left-4 z-30 w-[330px] rounded-md border border-slate-200 bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md border" style={{ backgroundColor: config.bg, borderColor: config.border, color: config.text }}>
            <Icon size={21} />
          </div>
          <div>
            <p className="text-xs text-slate-500">{entity.id}</p>
            <h3 className="text-sm font-bold text-slate-900">{entity.name}</h3>
          </div>
        </div>
        <button onClick={onClose} className="rounded-md p-1 text-slate-500 hover:bg-slate-100"><X size={16} /></button>
      </div>
      <div className="mb-4">
        <p className="text-xs text-slate-500">Alias / Identifier</p>
        <p className="text-sm text-slate-700">{entity.alias}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Entity Type</p>
          <p className="mt-1 text-sm font-semibold" style={{ color: config.text }}>{entity.type}</p>
        </div>
        <div className={`rounded-md border p-3 ${getRiskBg(entity.risk)}`}>
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Risk Score</p>
          <p className={`mt-1 text-lg font-bold ${getRiskClass(entity.risk)}`}>{entity.risk}%</p>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, change, icon: Icon, positive = true }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
          <div className={`mt-2 flex items-center gap-1 text-xs ${positive ? "text-emerald-600" : "text-red-600"}`}>
            {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
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
    MAIN DASHBOARD COMPONENT
   ========================================================= */

export default function Dashboard() {
  const [graphModalOpen, setGraphModalOpen] = useState(false);
  const [selectedGraphNode, setSelectedGraphNode] = useState(null);
  
  const [selectedEntityModal, setSelectedEntityModal] = useState(null);
  const [selectedAlertModal, setSelectedAlertModal] = useState(null);
  const [selectedHotspotModal, setSelectedHotspotModal] = useState(null);
  const [allAlertsModalOpen, setAllAlertsModalOpen] = useState(false);

  const [neo4jNodes, setNeo4jNodes] = useState(fallbackGraphNodes);
  const [neo4jEdges, setNeo4jEdges] = useState(fallbackGraphEdges);
  const [neo4jLoading, setNeo4jLoading] = useState(true);
  const [neo4jConnected, setNeo4jConnected] = useState(false);
  const [neo4jError, setNeo4jError] = useState("");

  const loadNeo4jGraph = useCallback(async () => {
    setNeo4jLoading(true);
    setNeo4jError("");
    try {
      const driver = getNeo4jDriver();
      await driver.verifyConnectivity();
      const graph = await fetchNeo4jGraph();

      if (graph.nodes.length > 0) {
        setNeo4jNodes(graph.nodes);
        setNeo4jEdges(graph.edges);
      } else {
        setNeo4jNodes(fallbackGraphNodes);
        setNeo4jEdges(fallbackGraphEdges);
      }
      setNeo4jConnected(true);
    } catch (error) {
      console.error("Neo4j connection error:", error);
      setNeo4jConnected(false);
      setNeo4jError(error?.message || "Unable to connect to Neo4j");
      setNeo4jNodes(fallbackGraphNodes);
      setNeo4jEdges(fallbackGraphEdges);
    } finally {
      setNeo4jLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNeo4jGraph();
  }, [loadNeo4jGraph]);

  const kpis = [
    { title: "Active Cases", value: "142", change: "+12%", icon: Target, positive: true },
    { title: "High-Risk Entities", value: "38", change: "+5", icon: ShieldAlert, positive: false },
    { title: "Detected Networks", value: "19", change: "+2", icon: Network, positive: true },
    { title: "Critical Alerts", value: "07", change: "-3", icon: AlertTriangle, positive: true },
    { title: "Evidence Logs", value: "1,842", change: "+124", icon: Database, positive: true },
  ];

  const highRiskEntities = [
    { id: "ENT-9021", name: "Rajesh “Raju” Sharma", alias: "Shadow", risk: 94, centrality: "96%", connections: 42, type: "Person", threat: "Human Trafficking Syndicate" },
    { id: "ENT-4412", name: "Vikram Choudhury", alias: "Vicky", risk: 89, centrality: "91%", connections: 31, type: "Person", threat: "Financial Fraud / Laundering" },
    { id: "ENT-1108", name: "+91 98765 43210", alias: "Burner SIM-09", risk: 87, centrality: "88%", connections: 56, type: "Phone", threat: "Extortion Network" },
    { id: "ENT-3390", name: "Apex Logistics Pvt Ltd", alias: "Front Org", risk: 84, centrality: "82%", connections: 24, type: "Organization", threat: "Illegal Transport" },
  ];

  const criticalAlerts = [
    { id: "ALT-882", title: "Sudden Communication Burst", description: "47 calls between Person-001 & Burner-09 in 2 hrs", time: "14 mins ago", severity: "HIGH", category: "CDR Anomaly" },
    { id: "ALT-881", title: "Circular Financial Transaction", description: "₹42,00,000 looped across 4 shell accounts in 30 min", time: "1 hr ago", severity: "CRITICAL", category: "Financial" },
    { id: "ALT-879", title: "Location Co-location Detected", description: "3 high-risk entities at Sector 62 Safehouse", time: "3 hrs ago", severity: "HIGH", category: "Geographic" },
  ];

  const geographicHotspots = [
    { name: "Sector 62", score: 87, zone: "NCR Zone - District 04", incidents: 42, status: "High Surveillance" },
    { name: "District 04", score: 72, zone: "Northern Sector", incidents: 28, status: "Active Investigation" },
    { name: "Western Corridor", score: 61, zone: "Transit Route B", incidents: 19, status: "Monitoring" },
    { name: "Eastern Financial Hub", score: 48, zone: "Commercial District", incidents: 12, status: "Routine Audit" },
  ];

  const activities = [
    { id: "ACT-102", text: "FIR-2026-901 parsed & connected to Case #26189-042", source: "AI Ingestion Engine", time: "10m ago" },
    { id: "ACT-101", text: "SHA-256 Blockchain Hash generated for Evidence #EV-4419", source: "Officer V. Kumar", time: "25m ago" },
    { id: "ACT-100", text: "New edge added: ENT-9021 → TRANSFERRED → ENT-3390", source: "Graph Analytics System", time: "1h ago" },
    { id: "ACT-099", text: "Intelligence Brief generated for NCRB Women Safety Cell", source: "Senior Analyst R. Roy", time: "2h ago" },
  ];

  const graphStatusText = neo4jLoading
    ? "Connecting to Neo4j..."
    : neo4jConnected
      ? `Live Neo4j graph • Recent ${neo4jNodes.length} entities • ${neo4jEdges.length} relationships`
      : "Neo4j unavailable • fallback graph active";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <main className="mx-auto max-w-[1800px] px-5 py-5">
        <section className="grid grid-cols-2 gap-3 xl:grid-cols-5">
          {kpis.map((kpi) => <KpiCard key={kpi.title} {...kpi} />)}
        </section>

        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="space-y-5 xl:col-span-2">
            <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Network size={16} className="text-blue-600" />
                    <h2 className="text-sm font-bold text-slate-900">Active Criminal Networks Overview (Recent 50)</h2>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Entity relationship intelligence graph</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`hidden items-center gap-2 rounded-md border px-3 py-2 text-[10px] md:flex ${neo4jConnected ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
                    <span className={`h-2 w-2 rounded-full ${neo4jConnected ? "bg-emerald-500" : "bg-red-500"}`} />
                    {neo4jConnected ? "Neo4j Live" : "Offline"}
                  </div>
                  <button onClick={() => loadNeo4jGraph(true)} disabled={neo4jLoading} className="rounded-md border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50" title="Refresh">
                    <RefreshCw size={15} className={neo4jLoading ? "animate-spin" : ""} />
                  </button>
                  <button onClick={() => setGraphModalOpen(true)} className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100">
                    <Maximize2 size={14} /> Open Full Graph
                  </button>
                </div>
              </div>

              <div className="relative h-[460px]">
                <CytoscapeGraph graphNodes={neo4jNodes} graphEdges={neo4jEdges} />
                <div className="pointer-events-none absolute bottom-4 left-4 rounded-md border border-slate-200 bg-white/95 px-3 py-2 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Network Status</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-700">
                    <span className={`h-2 w-2 rounded-full ${neo4jConnected ? "bg-emerald-400" : "bg-red-400"}`} />
                    {graphStatusText}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">High-Risk Entity Watchlist</h2>
                  <p className="mt-1 text-xs text-slate-500">Highest priority entities detected by graph analytics</p>
                </div>
                <Search size={17} className="text-slate-500" />
              </div>
              <div className="divide-y divide-slate-100">
                {highRiskEntities.map((entity) => {
                  const config = entityConfig[entity.type] || entityConfig.Unknown;
                  const Icon = config.icon;
                  return (
                    <button key={entity.id} onClick={() => setSelectedEntityModal(entity)} className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md border" style={{ backgroundColor: config.bg, borderColor: config.border, color: config.text }}>
                          <Icon size={17} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{entity.name}</p>
                          <p className="text-[10px] text-slate-500">{entity.alias} • {entity.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden text-right sm:block">
                          <p className="text-[10px] text-slate-500">Connections</p>
                          <p className="text-xs font-semibold text-slate-700">{entity.connections}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-500">Risk</p>
                          <p className={`text-sm font-bold ${getRiskClass(entity.risk)}`}>{entity.risk}%</p>
                        </div>
                        <ChevronRight size={15} className="text-slate-500" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {/* Critical Anomaly Alerts Card */}
            <div className="rounded-md border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Critical Anomaly Alerts</h2>
                  <p className="mt-1 text-xs text-slate-500">AI-generated intelligence alerts</p>
                </div>
                <ShieldAlert size={17} className="text-red-600" />
              </div>
              <div className="divide-y divide-slate-100">
                {criticalAlerts.map((alert) => (
                  <button key={alert.id} onClick={() => setSelectedAlertModal(alert)} className="w-full px-4 py-4 text-left transition hover:bg-slate-50">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          <p className="text-xs font-semibold text-slate-900">{alert.title}</p>
                        </div>
                        <p className="mt-2 text-[11px] leading-5 text-slate-500">{alert.description}</p>
                        <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
                          <Clock3 size={11} /> {alert.time} <span>•</span> {alert.category}
                        </div>
                      </div>
                      <span className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[9px] font-bold text-red-600">{alert.severity}</span>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setAllAlertsModalOpen(true)} className="w-full border-t border-slate-200 px-4 py-3 text-center text-xs font-semibold text-blue-600 hover:bg-slate-50">
                View All Alerts
              </button>
            </div>

            {/* Geographic Hotspots Card */}
            <div className="rounded-md border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Globe2 size={16} className="text-emerald-600" />
                  <h2 className="text-sm font-bold text-slate-900">Geographic Hotspots</h2>
                </div>
                <p className="mt-1 text-xs text-slate-500">High-risk activity concentration</p>
              </div>
              <div className="space-y-3 p-4">
                {geographicHotspots.map((hotspot) => (
                  <button 
                    key={hotspot.name} 
                    onClick={() => setSelectedHotspotModal(hotspot)}
                    className="w-full text-left transition hover:opacity-80"
                  >
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">{hotspot.name}</span>
                      <span className="font-semibold text-slate-700">{hotspot.score}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-blue-600" style={{ width: `${hotspot.score}%` }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* System Audit Stream */}
            <div className="rounded-md border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">System Audit & Integrity Stream</h2>
                  <p className="mt-1 text-xs text-slate-500">Immutable system activity</p>
                </div>
                <Fingerprint size={17} className="text-violet-600" />
              </div>
              <div className="divide-y divide-slate-100">
                {activities.map((activity) => (
                  <div key={activity.id} className="px-4 py-3">
                    <div className="flex gap-3">
                      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                      <div className="min-w-0">
                        <p className="text-[11px] leading-5 text-slate-700">{activity.text}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                          <span>{activity.source}</span> <span>•</span> <span>{activity.time}</span>
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
          MODAL: HIGH-RISK ENTITY DETAILS
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
                  <p className="text-[10px] text-slate-500">{selectedEntityModal.id}</p>
                  <h3 className="text-lg font-bold text-slate-900">{selectedEntityModal.name}</h3>
                  <p className="text-xs text-slate-500">{selectedEntityModal.alias}</p>
                </div>
              </div>
              <button onClick={() => setSelectedEntityModal(null)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100"><X size={17} /></button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Risk Score</p>
                <p className={`mt-1 text-2xl font-bold ${getRiskClass(selectedEntityModal.risk)}`}>{selectedEntityModal.risk}%</p>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Centrality</p>
                <p className="mt-1 text-2xl font-bold text-blue-700">{selectedEntityModal.centrality}</p>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Connections</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{selectedEntityModal.connections}</p>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Entity Type</p>
                <p className="mt-1 text-sm font-bold text-violet-700">{selectedEntityModal.type}</p>
              </div>
            </div>
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Threat Classification</p>
              <p className="mt-1 text-sm font-semibold text-red-600">{selectedEntityModal.threat}</p>
            </div>
            <button onClick={() => setSelectedEntityModal(null)} className="mt-5 w-full rounded-md border border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL: CRITICAL ANOMALY ALERT DETAILS
          ===================================================== */}
      {selectedAlertModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/30 p-4">
          <div className="w-full max-w-lg rounded-md border border-slate-200 bg-white p-5 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-600" />
                  <span className="text-[10px] font-bold text-red-600">{selectedAlertModal.id}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{selectedAlertModal.title}</h3>
              </div>
              <button onClick={() => setSelectedAlertModal(null)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100"><X size={17} /></button>
            </div>
            <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm leading-6 text-slate-700">{selectedAlertModal.description}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] text-slate-500">Severity</p>
                <p className="mt-1 text-sm font-bold text-red-600">{selectedAlertModal.severity}</p>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] text-slate-500">Category</p>
                <p className="mt-1 text-sm font-bold text-blue-700">{selectedAlertModal.category}</p>
              </div>
            </div>
            <button onClick={() => setSelectedAlertModal(null)} className="mt-5 w-full rounded-md border border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              Close Investigation
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL: GEOGRAPHIC HOTSPOT DETAILS
          ===================================================== */}
      {selectedHotspotModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/30 p-4">
          <div className="w-full max-w-md rounded-md border border-slate-200 bg-white p-5 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-600">
                  <Globe2 size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedHotspotModal.name}</h3>
                  <p className="text-xs text-slate-500">{selectedHotspotModal.zone}</p>
                </div>
              </div>
              <button onClick={() => setSelectedHotspotModal(null)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100"><X size={17} /></button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] uppercase text-slate-500">Risk Concentration</p>
                <p className="mt-1 text-xl font-bold text-blue-600">{selectedHotspotModal.score}%</p>
              </div>
              <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
                <p className="text-[10px] uppercase text-slate-500">Recorded Incidents</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{selectedHotspotModal.incidents}</p>
              </div>
            </div>
            <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Surveillance Status</p>
              <p className="mt-1 text-sm font-semibold text-emerald-700">{selectedHotspotModal.status}</p>
            </div>
            <button onClick={() => setSelectedHotspotModal(null)} className="mt-5 w-full rounded-md border border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              Close Hotspot View
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          FULL GRAPH MODAL
          ===================================================== */}
      {graphModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
            <h2 className="text-base font-bold text-slate-900">Criminal Network Graph (Recent 50 Nodes)</h2>
            <button onClick={() => setGraphModalOpen(false)} className="rounded-md border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"><X size={18} /></button>
          </div>
          <div className="relative flex-1">
            <CytoscapeGraph fullScreen={true} onNodeSelect={setSelectedGraphNode} selectedNode={selectedGraphNode} graphNodes={neo4jNodes} graphEdges={neo4jEdges} />
            <EntityDetails entity={selectedGraphNode} onClose={() => setSelectedGraphNode(null)} />
          </div>
        </div>
      )}
    </div>
  );
}