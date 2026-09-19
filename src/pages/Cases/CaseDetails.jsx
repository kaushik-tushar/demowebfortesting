import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Briefcase,
  ShieldAlert,
  Users,
  GitFork,
  Clock,
  FileCheck2,
  Phone,
  CreditCard,
  MapPin,
  AlertTriangle,
  Bot,
  FileSpreadsheet,
  ArrowLeft,
  Share2,
  Lock,
  Download,
  Plus,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Search,
  Zap,
  Activity,
  Send,
  Eye,
  Shield,
  Layers,
  BarChart3,
  CalendarDays,
  Building2,
  UserCheck,
  Network,
  Database,
  Fingerprint,
  X
} from 'lucide-react';

import NetworkGraph from '../../components/NetworkGraph';

export default function CaseDetails() {
  const { caseId = '26189-042' } = useParams();

  const [activeTab, setActiveTab] = useState('Overview');
  const [aiQuery, setAiQuery] = useState('');

  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text:
        'Case #26189-042 analysis loaded. I have indexed 126 evidence files and identified 24 primary entities. How can I assist your investigation?',
      citation: 'System Auto-Ingest Engine'
    }
  ]);

  const caseMeta = {
    id: `CASE #${caseId}`,
    firNo: 'FIR-2026-NCRB-9021',
    title: 'Interstate Cyber Exploitation & Trafficking Syndicate',
    category: 'Organized Crime / Cyber Fraud',
    riskScore: 87,
    status: 'ACTIVE INVESTIGATION',
    assignedOfficer: 'Senior Investigator V. Kumar',
    leadAgency: 'NCRB Women Safety Cell',
    dateOpened: '12 Jan 2026',
    entitiesCount: 48,
    relationshipsCount: 384,
    evidenceCount: 126,
    alertsCount: 14
  };

  const tabs = [
    { name: 'Overview', icon: Briefcase },
    { name: 'Entities', icon: Users, count: '48' },
    { name: 'Network', icon: GitFork, count: '384' },
    { name: 'Timeline', icon: Clock },
    { name: 'Evidence', icon: FileCheck2, count: '126' },
    { name: 'Communications', icon: Phone, count: '31' },
    { name: 'Financial', icon: CreditCard },
    { name: 'Locations', icon: MapPin },
    { name: 'Alerts', icon: AlertTriangle, count: '14' },
    { name: 'AI Assistant', icon: Bot },
    { name: 'Audit', icon: FileSpreadsheet }
  ];

  const handleAiSearch = (e) => {
    e.preventDefault();

    if (!aiQuery.trim()) return;

    const userText = aiQuery.trim();

    setAiQuery('');

    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userText
      },
      {
        sender: 'ai',
        text: `Analysis generated for "${userText}": Cross-referencing 47 CDR logs and UPI transfer records. Person-001 (Rajesh Sharma) transferred ₹42,00,000 to Shell Account #8841 within 30 minutes of 14 calls made to Burner SIM +91 98765 43210.`,
        citation:
          'Source: Evidence #EV-0231 (CDR Log) & #EV-0412 (Bank Statement)'
      }
    ]);
  };

  const getRiskConfig = (score) => {
    if (score >= 85) {
      return {
        label: 'Critical',
        text: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
        bar: 'bg-red-500'
      };
    }

    if (score >= 70) {
      return {
        label: 'High',
        text: 'text-orange-700',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        bar: 'bg-orange-500'
      };
    }

    return {
      label: 'Moderate',
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      bar: 'bg-amber-500'
    };
  };

  const risk = getRiskConfig(caseMeta.riskScore);

  const getStatusBadge = () => {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-700">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        {caseMeta.status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-800 font-sans">
      <div className="mx-auto max-w-[1600px] space-y-6 p-4 md:p-6">

        {/* =========================================================
            HEADER
        ========================================================== */}
        <header className="border-b border-slate-200 pb-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                <Link
                  to="/cases"
                  className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 transition hover:bg-white hover:text-blue-700"
                >
                  <ArrowLeft size={13} />
                  All Cases
                </Link>

                <ChevronRight size={13} className="text-slate-300" />

                <span className="font-mono font-semibold text-blue-700">
                  {caseMeta.id}
                </span>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <h1 className="max-w-4xl text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {caseMeta.title}
                </h1>

                {getStatusBadge()}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <FileText size={13} />
                  <span className="font-mono text-slate-700">
                    {caseMeta.firNo}
                  </span>
                </span>

                <span className="hidden text-slate-300 sm:inline">•</span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={13} />
                  Opened {caseMeta.dateOpened}
                </span>

                <span className="hidden text-slate-300 sm:inline">•</span>

                <span className="inline-flex items-center gap-1.5">
                  <UserCheck size={13} />
                  Lead Officer:
                  <span className="font-semibold text-slate-700">
                    {caseMeta.assignedOfficer}
                  </span>
                </span>
              </div>
            </div>

            {/* Header actions */}
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                <Download size={14} />
                Export Brief
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
              >
                <Plus size={15} />
                Add Evidence / Entity
              </button>
            </div>
          </div>
        </header>

        {/* =========================================================
            CASE INFORMATION STRIP
        ========================================================== */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <InfoStrip
            icon={Building2}
            label="Lead Agency"
            value={caseMeta.leadAgency}
          />

          <InfoStrip
            icon={Fingerprint}
            label="Case Classification"
            value={caseMeta.category}
          />

          <InfoStrip
            icon={Activity}
            label="Investigation State"
            value="Active Investigation"
          />

          <InfoStrip
            icon={Database}
            label="Repository Record"
            value={`CASE-${caseId}`}
            mono
          />

        </section>

        {/* =========================================================
            TABS
        ========================================================== */}
        <div className="overflow-x-auto">
          <nav className="flex min-w-max items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => setActiveTab(tab.name)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <Icon
                    size={14}
                    className={
                      isActive ? 'text-white' : 'text-slate-400'
                    }
                  />

                  <span>{tab.name}</span>

                  {tab.count && (
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[9px] font-mono ${
                        isActive
                          ? 'bg-white/10 text-slate-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

          </nav>
        </div>

        {/* =========================================================
            OVERVIEW
        ========================================================== */}
        {activeTab === 'Overview' && (
          <div className="space-y-6">

            {/* Metrics */}
            <section className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">

              <MetricCard
                label="Risk Assessment"
                value={`${caseMeta.riskScore}/100`}
                icon={ShieldAlert}
                valueClass={risk.text}
                subtle={`${risk.label} risk`}
              />

              <MetricCard
                label="Persons"
                value="24"
                icon={Users}
                valueClass="text-slate-900"
              />

              <MetricCard
                label="Vehicles"
                value="08"
                icon={Briefcase}
                valueClass="text-slate-900"
              />

              <MetricCard
                label="Burner Phones"
                value="31"
                icon={Phone}
                valueClass="text-blue-700"
              />

              <MetricCard
                label="Safehouses"
                value="13"
                icon={MapPin}
                valueClass="text-emerald-700"
              />

              <MetricCard
                label="Shell Organizations"
                value="04"
                icon={Building2}
                valueClass="text-violet-700"
              />

              <MetricCard
                label="Evidence Vault"
                value={caseMeta.evidenceCount}
                icon={FileCheck2}
                valueClass="text-slate-900"
              />

            </section>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

              {/* Main content */}
              <div className="space-y-6 xl:col-span-2">

                {/* Executive Brief */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                        <Sparkles size={17} className="text-blue-700" />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-slate-900">
                          Intelligence Brief
                        </h2>
                        <p className="text-[11px] text-slate-500">
                          Automated analysis from indexed case records
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                      <CheckCircle2 size={12} />
                      Analysis confidence: 94%
                    </span>

                  </div>

                  <div className="space-y-4 p-5">

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-600">

                      <p>
                        <strong className="text-slate-900">
                          Primary Allegation:
                        </strong>{' '}
                        Operation of a multi-state illegal financial laundering
                        and recruitment network targeting victims across four
                        union territories.
                      </p>

                      <p className="mt-3">
                        <strong className="text-slate-900">
                          Key Analytical Finding:
                        </strong>{' '}
                        Person{' '}
                        <span className="font-semibold text-red-700">
                          Rajesh "Raju" Sharma (ENT-9021)
                        </span>{' '}
                        exhibits a 96% PageRank centrality score. Communication
                        patterns indicate coordination of financial transfers
                        with{' '}
                        <span className="font-semibold text-violet-700">
                          Apex Logistics (ENT-3390)
                        </span>{' '}
                        through four rotating burner numbers.
                      </p>

                    </div>

                    {/* Action notice */}
                    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">

                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white">
                        <AlertTriangle size={15} className="text-amber-700" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-amber-900">
                          Investigation Flag
                        </p>

                        <p className="mt-1 text-[11px] leading-5 text-amber-800">
                          Vehicle DL-01-AB-9012 was identified near the Sector
                          62 safehouse according to the indexed location
                          records. Review the underlying evidence before taking
                          operational action.
                        </p>
                      </div>

                    </div>

                    {/* Network preview */}
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700">
                            Network Sub-graph
                          </h3>
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Relationship preview for this investigation
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActiveTab('Network')}
                          className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 hover:text-blue-800"
                        >
                          Open Network
                          <ExternalLink size={11} />
                        </button>
                      </div>

                      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                        <NetworkGraph selectedCaseId={caseId} />
                      </div>
                    </div>

                  </div>
                </section>

                {/* Investigation Metrics */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-100 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                        <BarChart3 size={17} className="text-slate-700" />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-slate-900">
                          Investigation Coverage
                        </h2>
                        <p className="text-[11px] text-slate-500">
                          Indexed records currently associated with this case
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                    <CoverageItem
                      label="Entities"
                      value={caseMeta.entitiesCount}
                      description="Known entities"
                      icon={Users}
                    />

                    <CoverageItem
                      label="Relationships"
                      value={caseMeta.relationshipsCount}
                      description="Graph connections"
                      icon={GitFork}
                    />

                    <CoverageItem
                      label="Evidence"
                      value={caseMeta.evidenceCount}
                      description="Indexed records"
                      icon={FileCheck2}
                    />

                  </div>
                </section>

              </div>

              {/* Right column */}
              <aside className="space-y-6">

                {/* Risk Card */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Case Risk Assessment
                      </p>

                      <p className={`mt-1 text-3xl font-black ${risk.text}`}>
                        {caseMeta.riskScore}
                        <span className="text-sm font-semibold text-slate-400">
                          /100
                        </span>
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${risk.bg} ${risk.border} ${risk.text}`}
                    >
                      {risk.label}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${risk.bar}`}
                        style={{ width: `${caseMeta.riskScore}%` }}
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-slate-500">
                    Risk score is an analytical indicator generated from
                    indexed case signals and should be reviewed alongside
                    source evidence.
                  </p>

                </section>

                {/* Key suspects */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                  <div className="border-b border-slate-100 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-bold text-slate-900">
                          Primary Entities
                        </h2>
                        <p className="mt-0.5 text-[10px] text-slate-500">
                          High-relevance persons in the current case index
                        </p>
                      </div>

                      <Users size={17} className="text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-3 p-4">

                    <EntitySummary
                      name={'Rajesh "Raju" Sharma'}
                      id="ENT-9021"
                      role="Kingpin"
                      risk="94"
                      riskClass="text-red-700 bg-red-50 border-red-200"
                    />

                    <EntitySummary
                      name="Vikram Choudhury"
                      id="ENT-4412"
                      role="Operator"
                      risk="89"
                      riskClass="text-orange-700 bg-orange-50 border-orange-200"
                    />

                    <EntitySummary
                      name="Apex Logistics"
                      id="ENT-3390"
                      role="Organization"
                      risk="82"
                      riskClass="text-orange-700 bg-orange-50 border-orange-200"
                    />

                  </div>

                  <div className="border-t border-slate-100 p-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab('Entities')}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View All Entities
                      <ChevronRight size={13} />
                    </button>
                  </div>

                </section>

                {/* Evidence integrity */}
                <section className="rounded-2xl border border-emerald-200 bg-white shadow-sm">

                  <div className="p-5">

                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                        <Shield size={17} className="text-emerald-700" />
                      </div>

                      <div>
                        <h2 className="text-sm font-bold text-slate-900">
                          Evidence Integrity
                        </h2>
                        <p className="text-[10px] text-slate-500">
                          Repository verification status
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3.5">

                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                        <CheckCircle2 size={14} />
                        Evidence chain verified
                      </div>

                      <p className="mt-2 text-[11px] leading-5 text-emerald-700">
                        {caseMeta.evidenceCount} indexed evidence records have
                        associated integrity metadata in the case repository.
                      </p>

                    </div>

                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Evidence records</span>
                      <span className="font-mono font-semibold text-slate-700">
                        {caseMeta.evidenceCount}
                      </span>
                    </div>

                  </div>

                </section>

                {/* Case metadata */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Case Metadata
                  </h2>

                  <div className="mt-4 space-y-3">

                    <MetadataRow
                      label="Case ID"
                      value={caseId}
                      mono
                    />

                    <MetadataRow
                      label="FIR Reference"
                      value={caseMeta.firNo}
                      mono
                    />

                    <MetadataRow
                      label="Lead Agency"
                      value={caseMeta.leadAgency}
                    />

                    <MetadataRow
                      label="Opened"
                      value={caseMeta.dateOpened}
                    />

                  </div>

                </section>

              </aside>
            </div>
          </div>
        )}

        {/* =========================================================
            NETWORK
        ========================================================== */}
        {activeTab === 'Network' && (
          <div className="space-y-4">

            <PageSectionHeader
              icon={Network}
              title="Criminal Network Graph"
              description="Interactive relationship graph for the selected investigation."
              action={
                <span className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
                  {caseMeta.relationshipsCount} RELATIONSHIPS
                </span>
              }
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <NetworkGraph selectedCaseId={caseId} />
            </div>

          </div>
        )}

        {/* =========================================================
            AI ASSISTANT
        ========================================================== */}
        {activeTab === 'AI Assistant' && (
          <div className="mx-auto max-w-5xl">

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-100 p-5">

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                    <Bot size={19} className="text-blue-700" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Case Investigation Assistant
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Query indexed case records and analytical outputs
                    </p>
                  </div>
                </div>

                <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-500 sm:inline-flex">
                  Case scoped
                </span>

              </div>

              <div className="p-5">

                <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 px-3.5 py-2.5 text-[11px] text-blue-800">
                  <span className="font-semibold">Data scope:</span>{' '}
                  Case #{caseId} and its indexed evidence, entities,
                  relationships, communications, and financial records.
                </div>

                <div className="h-[420px] overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <div className="space-y-4">

                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          msg.sender === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >

                        <div
                          className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-5 ${
                            msg.sender === 'user'
                              ? 'bg-slate-900 text-white'
                              : 'border border-slate-200 bg-white text-slate-700 shadow-sm'
                          }`}
                        >

                          <p>{msg.text}</p>

                          {msg.citation && (
                            <div className="mt-3 border-t border-slate-100 pt-2.5">
                              <p className="flex items-center gap-1.5 text-[10px] font-mono text-blue-700">
                                <FileCheck2 size={11} />
                                {msg.citation}
                              </p>
                            </div>
                          )}

                        </div>

                      </div>
                    ))}

                  </div>

                </div>

                {/* Suggested queries */}
                <div className="mt-4 flex flex-wrap gap-2">

                  <SuggestedQuery
                    text="Show high-risk entities"
                    onClick={() =>
                      setAiQuery('Show high-risk entities')
                    }
                  />

                  <SuggestedQuery
                    text="Find unusual CDR activity"
                    onClick={() =>
                      setAiQuery('Find unusual CDR activity')
                    }
                  />

                  <SuggestedQuery
                    text="Trace financial relationships"
                    onClick={() =>
                      setAiQuery('Trace financial relationships')
                    }
                  />

                </div>

                <form
                  onSubmit={handleAiSearch}
                  className="mt-3 flex flex-col gap-2 sm:flex-row"
                >
                  <div className="relative flex-1">

                    <Search
                      size={15}
                      className="absolute left-3.5 top-3.5 text-slate-400"
                    />

                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Ask about entities, relationships, evidence or activity..."
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-800"
                  >
                    <Send size={14} />
                    Ask Assistant
                  </button>
                </form>

              </div>
            </section>

          </div>
        )}

        {/* =========================================================
            FALLBACK TABS
        ========================================================== */}
        {[
          'Entities',
          'Timeline',
          'Evidence',
          'Communications',
          'Financial',
          'Locations',
          'Alerts',
          'Audit'
        ].includes(activeTab) && (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">

            <div className="mx-auto max-w-xl text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                <Layers size={21} className="text-slate-600" />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900">
                {activeTab} Workspace
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                This workspace is scoped to Case #{caseId}. The interface is
                ready to consume indexed {activeTab.toLowerCase()} records
                from the case repository.
              </p>

              <div className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5 text-[10px] font-medium text-blue-700">
                <Database size={13} />
                Case repository connection ready
              </div>

            </div>

          </section>
        )}

        {/* =========================================================
            FOOTER
        ========================================================== */}
        <footer className="flex flex-col gap-2 border-t border-slate-200 pt-4 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <Lock size={12} />
            <span>Restricted investigation workspace</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Case #{caseId}</span>
            <span className="text-slate-300">•</span>
            <span>{caseMeta.evidenceCount} evidence records</span>
            <span className="text-slate-300">•</span>
            <span>{caseMeta.entitiesCount} entities</span>
          </div>

        </footer>

      </div>
    </div>
  );
}

/* ================================================================
   REUSABLE COMPONENTS
================================================================ */

function InfoStrip({ icon: Icon, label, value, mono = false }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50">
        <Icon size={15} className="text-slate-600" />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p
          className={`mt-0.5 truncate text-xs font-semibold text-slate-700 ${
            mono ? 'font-mono' : ''
          }`}
        >
          {value}
        </p>
      </div>

    </div>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
  valueClass = 'text-slate-900',
  subtle
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">

      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <Icon size={14} className="text-slate-300" />
      </div>

      <p className={`mt-2 text-xl font-black ${valueClass}`}>
        {value}
      </p>

      {subtle && (
        <p className="mt-0.5 text-[9px] font-medium text-slate-400">
          {subtle}
        </p>
      )}

    </div>
  );
}

function CoverageItem({
  label,
  value,
  description,
  icon: Icon
}) {
  return (
    <div className="flex items-center gap-3 p-5">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50">
        <Icon size={16} className="text-slate-600" />
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 text-lg font-black text-slate-900">
          {value}
        </p>

        <p className="text-[10px] text-slate-400">
          {description}
        </p>
      </div>

    </div>
  );
}

function EntitySummary({
  name,
  id,
  role,
  risk,
  riskClass
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">

      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-slate-800">
          {name}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-500">
          <span className="font-mono">{id}</span>
          <span className="mx-1.5 text-slate-300">•</span>
          {role}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full border px-2 py-1 text-[9px] font-bold ${riskClass}`}
      >
        Risk {risk}
      </span>

    </div>
  );
}

function MetadataRow({
  label,
  value,
  mono = false
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-xs">

      <span className="text-slate-400">
        {label}
      </span>

      <span
        className={`max-w-[65%] text-right font-semibold text-slate-700 ${
          mono ? 'font-mono text-[10px]' : ''
        }`}
      >
        {value}
      </span>

    </div>
  );
}

function PageSectionHeader({
  icon: Icon,
  title,
  description,
  action
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
          <Icon size={17} className="text-slate-700" />
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-0.5 text-[11px] text-slate-500">
            {description}
          </p>
        </div>

      </div>

      {action}

    </div>
  );
}

function SuggestedQuery({
  text,
  onClick
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      {text}
    </button>
  );
}