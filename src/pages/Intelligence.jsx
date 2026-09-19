import React, { useState } from 'react';
import {
  BrainCircuit,
  Search,
  Zap,
  ShieldAlert,
  Filter,
  FileSearch,
  PhoneCall,
  MapPin,
  GitFork,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bot,
  BarChart3,
  ChevronRight,
  Download,
  Share2,
  RefreshCw,
  Eye,
  X,
  Database,
  Link2,
  Activity,
  FileText,
} from 'lucide-react';

export default function Intelligence() {
  const [activeAnalysisType, setActiveAnalysisType] = useState('ALL');
  const [naturalLanguagePrompt, setNaturalLanguagePrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [notificationToast, setNotificationToast] = useState('');
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedSubGraphItem, setSelectedSubGraphItem] = useState(null);
  const [hypothesisModalOpen, setHypothesisModalOpen] = useState(false);

  const [intelligenceResults, setIntelligenceResults] = useState([
    {
      id: 'INT-2026-8801',
      title: 'High-frequency CDR and UPI activity detected',
      type: 'Pattern Mining',
      confidence: 96,
      caseId: '26189-042',
      timestamp: '10 min ago',
      severity: 'CRITICAL',
      summary:
        '47 short-duration calls were identified between a burner SIM and the target number. The activity was followed by three high-value UPI transfers totaling ₹42,00,000 to a linked HDFC account.',
      entitiesInvolved: [
        'Rajesh "Raju" Sharma',
        '+91 98765 43210',
        'HDFC A/C ••••9041',
      ],
      recommendedAction:
        'Review the linked account transactions and supporting financial records.',
    },
    {
      id: 'INT-2026-8802',
      title: 'Potential cross-case identity match',
      type: 'Cross-Case Link',
      confidence: 91,
      caseId: '26189-088',
      timestamp: '1 hour ago',
      severity: 'HIGH',
      summary:
        'A phone record associated with the current investigation matches an entity already present in another case. A common location was also identified in Sector 62.',
      entitiesInvolved: [
        'Vikram Choudhury',
        'Safehouse — Sector 62',
      ],
      recommendedAction:
        'Review the related case records and verify the identity match before linking cases.',
    },
    {
      id: 'INT-2026-8803',
      title: 'Vehicle and tower-dump co-location detected',
      type: 'Geospatial Hotspot',
      confidence: 88,
      caseId: '26189-102',
      timestamp: '3 hours ago',
      severity: 'MEDIUM',
      summary:
        'Vehicle DL-01-AB-9012 was recorded near Toll Plaza 14 during a period in which the associated SIM appeared in the same tower-dump dataset.',
      entitiesInvolved: [
        'DL-01-AB-9012',
        '+91 98765 43210',
        'Toll Plaza 14',
      ],
      recommendedAction:
        'Obtain and review ANPR or CCTV records for the relevant time window.',
    },
  ]);

  const triggerToast = (message) => {
    setNotificationToast(message);

    setTimeout(() => {
      setNotificationToast('');
    }, 3000);
  };

  /* ---------------------------------------------------------
     AI QUERY
  --------------------------------------------------------- */

  const handleRunAiAnalysis = async (event) => {
    event.preventDefault();

    if (!naturalLanguagePrompt.trim()) {
      triggerToast('Enter a query first.');
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: naturalLanguagePrompt,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        const aiResult = data.data;

        const newReport = {
          id: `INT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          title: 'Investigator query result',
          type: 'Custom Query',
          confidence: 95,
          caseId: '26189-042',
          timestamp: 'Just now',
          severity: 'HIGH',
          summary: aiResult.answer,
          entitiesInvolved:
            aiResult.sources && aiResult.sources.length > 0
              ? aiResult.sources
              : ['Retrieved investigation records'],
          recommendedAction:
            'Review the cited source records and verify the result against the original evidence.',
        };

        setIntelligenceResults((previous) => [
          newReport,
          ...previous,
        ]);

        triggerToast('Query completed successfully.');
      } else {
        triggerToast('The intelligence service returned an error.');
      }
    } catch (error) {
      console.error('API Error:', error);
      triggerToast('Unable to connect to the intelligence service.');
    } finally {
      setIsAnalyzing(false);
      setNaturalLanguagePrompt('');
    }
  };

  /* ---------------------------------------------------------
     GLOBAL SCAN
  --------------------------------------------------------- */

  const handleGlobalScan = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      triggerToast(
        'Scan completed. 2 new records require review.'
      );
    }, 1500);
  };

  /* ---------------------------------------------------------
     HELPERS
  --------------------------------------------------------- */

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'border-red-200 bg-red-50 text-red-700';

      case 'HIGH':
        return 'border-amber-200 bg-amber-50 text-amber-700';

      default:
        return 'border-blue-200 bg-blue-50 text-blue-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Pattern Mining':
        return Activity;

      case 'Cross-Case Link':
        return Link2;

      case 'Geospatial Hotspot':
        return MapPin;

      case 'CDR Anomaly':
        return PhoneCall;

      default:
        return FileSearch;
    }
  };

  const filteredResults = intelligenceResults.filter(
    (item) =>
      activeAnalysisType === 'ALL' ||
      item.type === activeAnalysisType
  );

  /* ---------------------------------------------------------
     PRESETS
  --------------------------------------------------------- */

  const presets = [
    {
      label: 'Accused & directors',
      query:
        'What are the names of the accused persons and directors mentioned in the Om Shivao Infracons Limited FIR case?',
    },
    {
      label: 'Tower co-location',
      query: 'Find potential tower-dump co-location events.',
    },
    {
      label: 'CDR anomalies',
      query: 'Identify unusual CDR bursts and nighttime activity.',
    },
    {
      label: 'SIM rotation',
      query: 'Identify possible burner SIM rotation patterns.',
    },
  ];

  return (
    <div className="min-h-full bg-[#f6f8fb] text-slate-800">

      {/* =====================================================
          TOAST
      ====================================================== */}

      {notificationToast && (
        <div className="fixed right-5 top-5 z-[100]">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-700 shadow-lg">
            <CheckCircle2
              size={16}
              className="text-emerald-600"
            />
            {notificationToast}
          </div>
        </div>
      )}

      <div className="space-y-5">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <section className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div className="min-w-0">

              <div className="mb-1 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
                  <BrainCircuit
                    size={15}
                    className="text-blue-600"
                  />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600">
                  Intelligence Workspace
                </span>
              </div>

              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Intelligence & Analysis
              </h1>

              <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500">
                Review patterns, relationships and anomalies identified
                across investigation records.
              </p>

            </div>

            <div className="flex shrink-0 items-center gap-2">

              <button
                type="button"
                onClick={() => setExportModalOpen(true)}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-slate-700
                  transition
                  hover:border-slate-300
                  hover:bg-slate-50
                  active:scale-[0.98]
                "
              >
                <Share2 size={14} />
                Export Brief
              </button>

              <button
                type="button"
                onClick={handleGlobalScan}
                disabled={isAnalyzing}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-blue-600
                  px-3.5
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-blue-700
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  active:scale-[0.98]
                "
              >
                <RefreshCw
                  size={14}
                  className={
                    isAnalyzing
                      ? 'animate-spin'
                      : ''
                  }
                />

                {isAnalyzing
                  ? 'Scanning...'
                  : 'Run Analysis'}
              </button>

            </div>
          </div>
        </section>

        {/* =====================================================
            QUERY SECTION
        ====================================================== */}

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-5 py-4">

            <div className="flex items-start gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Bot
                  size={16}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Investigation Assistant
                </h2>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Ask a question using the records available to
                  the intelligence service.
                </p>
              </div>

            </div>

          </div>

          <div className="p-5">

            <form
              onSubmit={handleRunAiAnalysis}
              className="flex flex-col gap-2 lg:flex-row"
            >

              <div className="relative flex-1">

                <Search
                  size={16}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  value={naturalLanguagePrompt}
                  onChange={(event) =>
                    setNaturalLanguagePrompt(
                      event.target.value
                    )
                  }
                  placeholder="Ask about people, records, locations, transactions or relationships..."
                  className="
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-slate-50
                    pl-10
                    pr-4
                    text-xs
                    text-slate-800
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/5
                  "
                />

              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-slate-900
                  px-5
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-slate-800
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw
                      size={14}
                      className="animate-spin"
                    />
                    Processing
                  </>
                ) : (
                  <>
                    <Zap size={14} />
                    Run Query
                  </>
                )}
              </button>

            </form>

            {/* Presets */}

            <div className="mt-3 flex flex-wrap items-center gap-2">

              <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Examples
              </span>

              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setNaturalLanguagePrompt(
                      preset.query
                    );

                    triggerToast(
                      `Loaded: ${preset.label}`
                    );
                  }}
                  className="
                    rounded-md
                    border
                    border-slate-200
                    bg-white
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-medium
                    text-slate-600
                    transition
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-700
                  "
                >
                  {preset.label}
                </button>
              ))}

            </div>

          </div>
        </section>

        {/* =====================================================
            FILTER BAR
        ====================================================== */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <Filter
              size={15}
              className="text-slate-400"
            />

            <span className="text-xs font-semibold text-slate-700">
              Findings
            </span>

            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
              {filteredResults.length}
            </span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto">

            {[
              {
                label: 'All',
                value: 'ALL',
              },
              {
                label: 'Pattern Mining',
                value: 'Pattern Mining',
              },
              {
                label: 'Cross-Case',
                value: 'Cross-Case Link',
              },
              {
                label: 'Geospatial',
                value: 'Geospatial Hotspot',
              },
              {
                label: 'CDR',
                value: 'CDR Anomaly',
              },
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  setActiveAnalysisType(type.value)
                }
                className={`
                  whitespace-nowrap
                  rounded-lg
                  border
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  transition
                  ${
                    activeAnalysisType === type.value
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                  }
                `}
              >
                {type.label}
              </button>
            ))}

          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">

          {/* =================================================
              FINDINGS
          ================================================== */}

          <div className="space-y-3">

            {filteredResults.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                <FileSearch
                  size={28}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No findings in this category
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Try another analysis category.
                </p>
              </div>
            )}

            {filteredResults.map((item) => {
              const TypeIcon = getTypeIcon(item.type);

              return (
                <article
                  key={item.id}
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    transition
                    hover:border-slate-300
                    hover:shadow-md
                  "
                >

                  {/* Card header */}

                  <div className="border-b border-slate-100 px-5 py-3.5">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex min-w-0 items-center gap-2">

                        <span
                          className={`
                            shrink-0
                            rounded-md
                            border
                            px-2
                            py-1
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-wide
                            ${getSeverityStyles(
                              item.severity
                            )}
                          `}
                        >
                          {item.severity}
                        </span>

                        <span className="hidden text-slate-300 sm:block">
                          /
                        </span>

                        <span className="truncate font-mono text-[10px] font-semibold text-slate-500">
                          {item.id}
                        </span>

                      </div>

                      <div className="flex shrink-0 items-center gap-3 text-[10px] text-slate-400">

                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {item.timestamp}
                        </span>

                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono font-semibold text-slate-600">
                          {item.confidence}% confidence
                        </span>

                      </div>

                    </div>
                  </div>

                  {/* Card body */}

                  <div className="space-y-4 px-5 py-4">

                    <div className="flex gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                        <TypeIcon
                          size={17}
                          className="text-slate-500"
                        />
                      </div>

                      <div className="min-w-0">

                        <h3 className="text-sm font-bold text-slate-900">
                          {item.title}
                        </h3>

                        <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                          <span>
                            {item.type}
                          </span>

                          <span>•</span>

                          <span>
                            Case #{item.caseId}
                          </span>
                        </div>

                      </div>

                    </div>

                    <p className="text-xs leading-6 text-slate-600">
                      {item.summary}
                    </p>

                    {/* Entities */}

                    <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">

                      <div className="mb-2 flex items-center gap-2">
                        <Database
                          size={13}
                          className="text-slate-400"
                        />

                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Related Records
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">

                        {item.entitiesInvolved.map(
                          (entity, index) => (
                            <span
                              key={index}
                              className="
                                rounded-md
                                border
                                border-slate-200
                                bg-white
                                px-2
                                py-1
                                text-[10px]
                                font-medium
                                text-slate-600
                              "
                            >
                              {entity}
                            </span>
                          )
                        )}

                      </div>
                    </div>

                    {/* Recommended action */}

                    <div className="flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50/60 p-3">

                      <ShieldAlert
                        size={15}
                        className="mt-0.5 shrink-0 text-blue-600"
                      />

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                          Suggested Review
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {item.recommendedAction}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Footer */}

                  <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">

                    <a
                      href={`/cases/${item.caseId}`}
                      className="
                        inline-flex
                        items-center
                        gap-1
                        text-[11px]
                        font-semibold
                        text-blue-600
                        transition
                        hover:text-blue-700
                      "
                    >
                      Open case
                      <ChevronRight size={13} />
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedSubGraphItem(item)
                      }
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        text-[11px]
                        font-semibold
                        text-slate-500
                        transition
                        hover:text-slate-800
                      "
                    >
                      <GitFork size={13} />
                      View relationships
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-4">

            {/* Engine status */}

            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">

                <div className="flex items-center gap-2">
                  <BarChart3
                    size={15}
                    className="text-slate-500"
                  />

                  <h2 className="text-xs font-bold text-slate-800">
                    Analysis Overview
                  </h2>
                </div>

                <span className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Operational
                </span>

              </div>

              <div className="divide-y divide-slate-100">

                <MetricRow
                  label="CDR records indexed"
                  value="4.81M"
                />

                <MetricRow
                  label="Financial records"
                  value="₹142.8 Cr"
                />

                <MetricRow
                  label="Cross-case matches"
                  value="98.4%"
                />

                <MetricRow
                  label="Open anomalies"
                  value="14"
                  valueClass="text-red-600"
                />

              </div>

            </section>

            {/* Analysis summary */}

            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <Activity
                    size={15}
                    className="text-slate-500"
                  />

                  <h2 className="text-xs font-bold text-slate-800">
                    Current Analysis
                  </h2>
                </div>
              </div>

              <div className="space-y-3 p-4">

                <SummaryItem
                  label="Findings reviewed"
                  value={intelligenceResults.length}
                />

                <SummaryItem
                  label="Critical"
                  value={
                    intelligenceResults.filter(
                      (item) =>
                        item.severity === 'CRITICAL'
                    ).length
                  }
                  valueClass="text-red-600"
                />

                <SummaryItem
                  label="High priority"
                  value={
                    intelligenceResults.filter(
                      (item) =>
                        item.severity === 'HIGH'
                    ).length
                  }
                  valueClass="text-amber-600"
                />

                <SummaryItem
                  label="Custom queries"
                  value={
                    intelligenceResults.filter(
                      (item) =>
                        item.type === 'Custom Query'
                    ).length
                  }
                />

              </div>

            </section>

            {/* Review note */}

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">

              <div className="flex gap-2.5">

                <FileText
                  size={15}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <div>
                  <p className="text-[11px] font-bold text-slate-700">
                    Investigator review
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-slate-500">
                    Automated findings should be checked against
                    the underlying source records before being used
                    as investigative evidence.
                  </p>
                </div>

              </div>

            </section>

            {/* Hypothesis */}

            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-4 py-3.5">

                <div className="flex items-center gap-2">
                  <Bot
                    size={15}
                    className="text-slate-500"
                  />

                  <h2 className="text-xs font-bold text-slate-800">
                    Pattern Review
                  </h2>
                </div>

              </div>

              <div className="p-4">

                <p className="text-xs leading-5 text-slate-600">
                  A recurring SIM-rotation pattern has been
                  identified in the current analysis set.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setHypothesisModalOpen(true)
                  }
                  className="
                    mt-3
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2
                    text-[10px]
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-slate-50
                  "
                >
                  Review Pattern
                </button>

              </div>

            </section>

          </aside>
        </div>
      </div>

      {/* =====================================================
          EXPORT MODAL
      ====================================================== */}

      {exportModalOpen && (
        <ModalOverlay
          onClose={() => setExportModalOpen(false)}
        >
          <ModalHeader
            icon={Share2}
            title="Export Intelligence Brief"
            onClose={() => setExportModalOpen(false)}
          />

          <div className="space-y-3 px-5 py-4">

            <p className="text-xs leading-5 text-slate-600">
              Prepare the currently visible intelligence findings
              for review or case documentation.
            </p>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">

              <div className="flex items-center gap-2">
                <Download
                  size={14}
                  className="text-slate-500"
                />

                <div>
                  <p className="text-[10px] font-semibold text-slate-700">
                    Intelligence brief
                  </p>

                  <p className="mt-0.5 text-[9px] text-slate-400">
                    Findings, related records and analysis metadata
                  </p>
                </div>
              </div>

            </div>

          </div>

          <ModalFooter>
            <button
              type="button"
              onClick={() => setExportModalOpen(false)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => {
                setExportModalOpen(false);
                triggerToast(
                  'Intelligence brief prepared successfully.'
                );
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              <Download size={13} />
              Prepare Export
            </button>
          </ModalFooter>
        </ModalOverlay>
      )}

      {/* =====================================================
          RELATIONSHIP MODAL
      ====================================================== */}

      {selectedSubGraphItem && (
        <ModalOverlay
          onClose={() => setSelectedSubGraphItem(null)}
        >
          <ModalHeader
            icon={GitFork}
            title="Relationship View"
            onClose={() => setSelectedSubGraphItem(null)}
          />

          <div className="space-y-4 px-5 py-4">

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Finding
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selectedSubGraphItem.title}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">

              <div className="flex flex-wrap items-center justify-center gap-2">

                {selectedSubGraphItem.entitiesInvolved.map(
                  (entity, index) => (
                    <React.Fragment key={entity}>

                      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold text-slate-700 shadow-sm">
                        {entity}
                      </div>

                      {index <
                        selectedSubGraphItem.entitiesInvolved
                          .length -
                          1 && (
                        <Link2
                          size={14}
                          className="text-slate-300"
                        />
                      )}

                    </React.Fragment>
                  )
                )}

              </div>

            </div>

            <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3">

              <Eye
                size={14}
                className="mt-0.5 text-slate-400"
              />

              <p className="text-[10px] leading-5 text-slate-500">
                Relationship confidence:{" "}
                <span className="font-semibold text-slate-700">
                  {selectedSubGraphItem.confidence}%
                </span>
                . Verify the relationship against source records
                before establishing a formal case link.
              </p>

            </div>

          </div>

          <ModalFooter>
            <button
              type="button"
              onClick={() => setSelectedSubGraphItem(null)}
              className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Close
            </button>
          </ModalFooter>
        </ModalOverlay>
      )}

      {/* =====================================================
          PATTERN REVIEW MODAL
      ====================================================== */}

      {hypothesisModalOpen && (
        <ModalOverlay
          onClose={() => setHypothesisModalOpen(false)}
        >
          <ModalHeader
            icon={Bot}
            title="Pattern Review"
            onClose={() => setHypothesisModalOpen(false)}
          />

          <div className="space-y-4 px-5 py-4">

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">

              <div className="flex items-start gap-2.5">

                <AlertTriangle
                  size={16}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <div>
                  <p className="text-xs font-bold text-amber-800">
                    Recurring SIM activity
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-amber-700">
                    The current records contain a pattern consistent
                    with repeated SIM changes. This is an analytical
                    observation and requires verification against
                    source data.
                  </p>
                </div>

              </div>

            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  Records supporting pattern
                </span>

                <span className="font-mono text-xs font-bold text-slate-700">
                  18
                </span>
              </div>

            </div>

          </div>

          <ModalFooter>
            <button
              type="button"
              onClick={() => {
                setHypothesisModalOpen(false);
                triggerToast(
                  'Pattern marked for investigator review.'
                );
              }}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Mark for Review
            </button>
          </ModalFooter>
        </ModalOverlay>
      )}

    </div>
  );
}

/* ============================================================
   SMALL COMPONENTS
============================================================ */

function MetricRow({
  label,
  value,
  valueClass = 'text-slate-800',
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <span className="text-[10px] text-slate-500">
        {label}
      </span>

      <span
        className={`font-mono text-[11px] font-bold ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  valueClass = 'text-slate-800',
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-slate-500">
        {label}
      </span>

      <span
        className={`font-mono text-xs font-bold ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[90]
        flex
        items-center
        justify-center
        bg-slate-900/30
        p-4
        backdrop-blur-[2px]
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
        {children}
      </div>
    </div>
  );
}

function ModalHeader({
  icon: Icon,
  title,
  onClose,
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

      <div className="flex items-center gap-2.5">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
          <Icon
            size={15}
            className="text-blue-600"
          />
        </div>

        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

      </div>

      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label="Close"
      >
        <X size={16} />
      </button>

    </div>
  );
}

function ModalFooter({ children }) {
  return (
    <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3">
      {children}
    </div>
  );
}