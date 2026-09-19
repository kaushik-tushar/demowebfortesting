import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  ShieldAlert,
  Users,
  FileCheck2,
  ChevronRight,
  Download,
  AlertTriangle,
  Eye,
  X,
  ExternalLink,
  Pencil,
  Save,
  Building2,
  Clock3,
  CalendarDays,
  Tag,
  UserRound,
  Layers3,
  ArrowUpRight,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

export default function Cases() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [riskFilter, setRiskFilter] = useState('ALL');

  // Modal States
  const [selectedCase, setSelectedCase] = useState(null);
  const [editingCase, setEditingCase] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // New Case Form State
  const [newCaseData, setNewCaseData] = useState({
    title: '',
    firNo: '',
    category: '',
    agency: '',
    assignedOfficer: '',
    riskScore: 50,
    status: 'ACTIVE',
    tags: '',
  });

  // Mock NCRB Case Index Data
  const [casesData, setCasesData] = useState([
    {
      id: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      title: 'Interstate Cyber Exploitation & Trafficking Syndicate',
      category: 'Organized Crime / Cyber Fraud',
      riskScore: 94,
      status: 'ACTIVE',
      assignedOfficer: 'Senior Investigator V. Kumar',
      agency: 'NCRB Women Safety Cell',
      dateOpened: '12 Jan 2026',
      entitiesCount: 48,
      evidenceCount: 126,
      alertsCount: 14,
      lastActivity: '10 mins ago',
      tags: ['Cyber Fraud', 'Interstate', 'UPI Scam'],
    },
    {
      id: '26189-088',
      firNo: 'FIR-2026-DL-4410',
      title: 'Hawala Money Laundering & Shell Corp Network',
      category: 'Financial Crime',
      riskScore: 89,
      status: 'ACTIVE',
      assignedOfficer: 'Inspector R. Deshmukh',
      agency: 'Economic Offences Wing (EOW)',
      dateOpened: '03 Feb 2026',
      entitiesCount: 32,
      evidenceCount: 84,
      alertsCount: 8,
      lastActivity: '2 hours ago',
      tags: ['Hawala', 'Shell Companies', 'Crypto'],
    },
    {
      id: '26189-102',
      firNo: 'FIR-2026-MH-1102',
      title: 'Cross-Border Telecom Tower Dump & Burner SIM Ring',
      category: 'Telecom & Counter-Terror',
      riskScore: 78,
      status: 'UNDER REVIEW',
      assignedOfficer: 'DySP S. Pattnaik',
      agency: 'Special Cell - Cyber Ops',
      dateOpened: '18 Feb 2026',
      entitiesCount: 19,
      evidenceCount: 42,
      alertsCount: 5,
      lastActivity: '1 day ago',
      tags: ['Burner SIM', 'Tower Dump', 'SDR/CDR'],
    },
    {
      id: '26189-144',
      firNo: 'FIR-2025-UP-8801',
      title: 'Commercial Cargo Theft & Vehicle Spoofing Ring',
      category: 'Vehicle Theft / Smuggling',
      riskScore: 62,
      status: 'ARCHIVED',
      assignedOfficer: 'Inspector A. Khan',
      agency: 'State Crime Branch',
      dateOpened: '10 Nov 2025',
      entitiesCount: 14,
      evidenceCount: 31,
      alertsCount: 0,
      lastActivity: '2 weeks ago',
      tags: ['GPS Spoofing', 'ANPR Match'],
    },
  ]);

  // -----------------------------
  // Helpers
  // -----------------------------

  const getStatusConfig = (status) => {
    switch (status) {
      case 'ACTIVE':
        return {
          label: 'Active',
          className:
            'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
        };

      case 'UNDER REVIEW':
        return {
          label: 'Under Review',
          className:
            'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
        };

      case 'ARCHIVED':
        return {
          label: 'Archived',
          className:
            'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
        };

      default:
        return {
          label: status,
          className:
            'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
        };
    }
  };

  const getRiskConfig = (score) => {
    if (score >= 85) {
      return {
        label: 'Critical',
        text: 'text-rose-700',
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        bar: 'bg-rose-500',
      };
    }

    if (score >= 70) {
      return {
        label: 'High',
        text: 'text-orange-700',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        bar: 'bg-orange-500',
      };
    }

    if (score >= 60) {
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
      text: 'text-slate-600',
      bg: 'bg-slate-100',
      border: 'border-slate-200',
      bar: 'bg-slate-400',
    };
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('ALL');
    setRiskFilter('ALL');
  };

  // -----------------------------
  // Create Case
  // -----------------------------

  const handleCreateCase = (e) => {
    e.preventDefault();

    const randomId = Math.floor(10000 + Math.random() * 90000);

    const currentDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const processedTags = newCaseData.tags
      ? newCaseData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : ['General'];

    const newCase = {
      id: `26${String(randomId).slice(-5)}`,
      firNo:
        newCaseData.firNo ||
        `FIR-2026-NCRB-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newCaseData.title,
      category:
        newCaseData.category || 'General Investigation',
      riskScore: Number(newCaseData.riskScore),
      status: newCaseData.status,
      assignedOfficer:
        newCaseData.assignedOfficer ||
        'Unassigned Investigator',
      agency:
        newCaseData.agency || 'NCRB Special Unit',
      dateOpened: currentDate,
      entitiesCount: 1,
      evidenceCount: 2,
      alertsCount: 1,
      lastActivity: 'Just now',
      tags: processedTags,
    };

    setCasesData((prev) => [newCase, ...prev]);

    setIsCreating(false);

    setNewCaseData({
      title: '',
      firNo: '',
      category: '',
      agency: '',
      assignedOfficer: '',
      riskScore: 50,
      status: 'ACTIVE',
      tags: '',
    });
  };

  // -----------------------------
  // Edit Case
  // -----------------------------

  const handleSaveEdit = (e) => {
    e.preventDefault();

    setCasesData((prev) =>
      prev.map((c) =>
        c.id === editingCase.id
          ? {
              ...editingCase,
              riskScore: Number(editingCase.riskScore),
            }
          : c
      )
    );

    setEditingCase(null);
  };

  // -----------------------------
  // Filtering
  // -----------------------------

  const filteredCases = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return casesData.filter((c) => {
      const matchesSearch =
        !query ||
        c.title.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query) ||
        c.firNo.toLowerCase().includes(query) ||
        c.assignedOfficer.toLowerCase().includes(query) ||
        c.agency.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query) ||
        c.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

      const matchesStatus =
        statusFilter === 'ALL' ||
        c.status === statusFilter;

      const matchesRisk =
        riskFilter === 'ALL' ||
        (riskFilter === 'HIGH' && c.riskScore >= 80) ||
        (riskFilter === 'MED' &&
          c.riskScore >= 60 &&
          c.riskScore < 80) ||
        (riskFilter === 'LOW' && c.riskScore < 60);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRisk
      );
    });
  }, [casesData, searchQuery, statusFilter, riskFilter]);

  const summary = useMemo(() => {
    return {
      total: casesData.length,
      active: casesData.filter(
        (c) => c.status === 'ACTIVE'
      ).length,
      highRisk: casesData.filter(
        (c) => c.riskScore >= 80
      ).length,
      review: casesData.filter(
        (c) => c.status === 'UNDER REVIEW'
      ).length,
      entities: casesData.reduce(
        (sum, c) => sum + c.entitiesCount,
        0
      ),
      evidence: casesData.reduce(
        (sum, c) => sum + c.evidenceCount,
        0
      ),
    };
  }, [casesData]);

  const hasActiveFilters =
    searchQuery ||
    statusFilter !== 'ALL' ||
    riskFilter !== 'ALL';

  // -----------------------------
  // Shared classes
  // -----------------------------

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

  const selectClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer';

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-800 font-sans">
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 space-y-5">

        {/* =========================================
            PAGE HEADER
        ========================================= */}
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700">
              <Briefcase size={15} />
              <span>Crime Investigation Management Workspace</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Central Case Repository
            </h1>

            <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">
              Centralized index for investigation cases, FIR
              records, entity relationships, evidence activity,
              and multi-agency intelligence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Download size={14} className="text-slate-500" />
              Export Summary
            </button>

            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Plus size={16} />
              Register New Case
            </button>
          </div>
        </header>

        {/* =========================================
            SUMMARY STRIP
        ========================================= */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <SummaryCard
            label="Total Cases"
            value={summary.total}
            icon={Briefcase}
            iconClass="bg-blue-50 text-blue-700"
          />

          <SummaryCard
            label="Active"
            value={summary.active}
            icon={Layers3}
            iconClass="bg-emerald-50 text-emerald-700"
          />

          <SummaryCard
            label="High Risk"
            value={summary.highRisk}
            icon={ShieldAlert}
            iconClass="bg-rose-50 text-rose-700"
          />

          <SummaryCard
            label="Under Review"
            value={summary.review}
            icon={Clock3}
            iconClass="bg-amber-50 text-amber-700"
          />

          <SummaryCard
            label="Linked Entities"
            value={summary.entities}
            icon={Users}
            iconClass="bg-violet-50 text-violet-700"
          />

          <SummaryCard
            label="Evidence Records"
            value={summary.evidence}
            icon={FileCheck2}
            iconClass="bg-cyan-50 text-cyan-700"
          />
        </section>

        {/* =========================================
            SEARCH + FILTERS
        ========================================= */}
        <section className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Search case ID, FIR number, title, category, agency, officer or tag..."
                className={`${inputClass} pl-10`}
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 xl:w-56">
              <Filter
                size={15}
                className="hidden text-slate-400 xl:block"
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className={selectClass}
              >
                <option value="ALL">
                  Status: All Cases
                </option>
                <option value="ACTIVE">
                  Status: Active
                </option>
                <option value="UNDER REVIEW">
                  Status: Under Review
                </option>
                <option value="ARCHIVED">
                  Status: Archived
                </option>
              </select>
            </div>

            {/* Risk */}
            <div className="flex items-center gap-2 xl:w-56">
              <ShieldAlert
                size={15}
                className="hidden text-slate-400 xl:block"
              />

              <select
                value={riskFilter}
                onChange={(e) =>
                  setRiskFilter(e.target.value)
                }
                className={selectClass}
              >
                <option value="ALL">
                  Risk: All Tiers
                </option>
                <option value="HIGH">
                  Risk: High (80+)
                </option>
                <option value="MED">
                  Risk: Moderate (60–79)
                </option>
                <option value="LOW">
                  Risk: Low (&lt;60)
                </option>
              </select>
            </div>

            {/* Reset */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <SlidersHorizontal size={13} />
              <span>
                Showing{' '}
                <strong className="text-slate-700">
                  {filteredCases.length}
                </strong>{' '}
                of{' '}
                <strong className="text-slate-700">
                  {casesData.length}
                </strong>{' '}
                cases
              </span>
            </div>

            <span className="hidden text-[11px] text-slate-400 sm:block">
              Repository view
            </span>
          </div>
        </section>

        {/* =========================================
            CASE TABLE
        ========================================= */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Investigation Cases
              </h2>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Structured case registry and investigation status
              </p>
            </div>

            <div className="hidden items-center gap-2 text-[11px] text-slate-400 sm:flex">
              <ArrowUpRight size={13} />
              Select a case to inspect
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3.5">
                    Case / FIR
                  </th>

                  <th className="px-4 py-3.5">
                    Investigation
                  </th>

                  <th className="px-4 py-3.5">
                    Assignment
                  </th>

                  <th className="px-4 py-3.5">
                    Risk
                  </th>

                  <th className="px-4 py-3.5">
                    Status
                  </th>

                  <th className="px-4 py-3.5">
                    Metrics
                  </th>

                  <th className="px-4 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredCases.length > 0 ? (
                  filteredCases.map((c) => {
                    const status =
                      getStatusConfig(c.status);

                    const risk =
                      getRiskConfig(c.riskScore);

                    return (
                      <tr
                        key={c.id}
                        onClick={() =>
                          setSelectedCase(c)
                        }
                        className="group cursor-pointer transition hover:bg-slate-50"
                      >
                        {/* Case / FIR */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-700">
                              <Briefcase size={16} />
                            </div>

                            <div>
                              <div className="font-mono text-xs font-bold text-blue-700">
                                #{c.id}
                              </div>

                              <div className="mt-1 font-mono text-[10px] text-slate-400">
                                {c.firNo}
                              </div>

                              <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                                <CalendarDays size={11} />
                                {c.dateOpened}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Investigation */}
                        <td className="max-w-[330px] px-4 py-4 align-top">
                          <div className="font-semibold leading-5 text-slate-800 transition group-hover:text-blue-700">
                            {c.title}
                          </div>

                          <div className="mt-1 text-[11px] text-slate-500">
                            {c.category}
                          </div>

                          <div className="mt-2 flex flex-wrap gap-1">
                            {c.tags.slice(0, 3).map(
                              (tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[9px] font-medium text-slate-500"
                                >
                                  <Tag size={9} />
                                  {tag}
                                </span>
                              )
                            )}
                          </div>
                        </td>

                        {/* Assignment */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex items-start gap-2">
                            <UserRound
                              size={14}
                              className="mt-0.5 shrink-0 text-slate-400"
                            />

                            <div>
                              <div className="text-xs font-semibold text-slate-700">
                                {c.assignedOfficer}
                              </div>

                              <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                                <Building2 size={11} />
                                {c.agency}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Risk */}
                        <td className="px-4 py-4 align-top">
                          <div className="min-w-[115px]">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-sm font-bold ${risk.text}`}
                              >
                                {c.riskScore}
                              </span>

                              <span className="text-[9px] text-slate-400">
                                /100
                              </span>
                            </div>

                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full rounded-full ${risk.bar}`}
                                style={{
                                  width: `${Math.min(
                                    c.riskScore,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>

                            <span
                              className={`mt-1.5 inline-block rounded-md border px-1.5 py-0.5 text-[9px] font-bold ${risk.bg} ${risk.border} ${risk.text}`}
                            >
                              {risk.label}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4 align-top">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${status.className}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                            />
                            {status.label}
                          </span>

                          <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                            <Clock3 size={10} />
                            {c.lastActivity}
                          </div>
                        </td>

                        {/* Metrics */}
                        <td className="px-4 py-4 align-top">
                          <div className="flex items-center gap-3">
                            <Metric
                              icon={Users}
                              value={c.entitiesCount}
                              label="Entities"
                              iconClass="text-violet-600"
                            />

                            <Metric
                              icon={FileCheck2}
                              value={c.evidenceCount}
                              label="Evidence"
                              iconClass="text-emerald-600"
                            />

                            <Metric
                              icon={AlertTriangle}
                              value={c.alertsCount}
                              label="Alerts"
                              iconClass="text-amber-600"
                            />
                          </div>
                        </td>

                        {/* Actions */}
                        <td
                          className="px-4 py-4 text-right align-top"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                setEditingCase(c)
                              }
                              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                              title="Edit Case"
                            >
                              <Pencil size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedCase(c)
                              }
                              className="rounded-lg border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>

                            <Link
                              to={`/cases/${c.id}`}
                              className="flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-[10px] font-bold text-white transition hover:bg-slate-800"
                            >
                              Workspace
                              <ChevronRight size={12} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-16 text-center"
                    >
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400">
                          <Search size={20} />
                        </div>

                        <h3 className="mt-4 text-sm font-bold text-slate-800">
                          No matching cases
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          No investigation records match the
                          current search and filter criteria.
                        </p>

                        <button
                          type="button"
                          onClick={resetFilters}
                          className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
                        >
                          <RotateCcw size={13} />
                          Clear Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================
            FOOTER
        ========================================= */}
        <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>
            CrimeGraph AI · Central Investigation Registry
          </span>

          <span className="font-mono">
            CASE INDEX · {casesData.length} RECORDS
          </span>
        </div>
      </div>

      {/* =========================================
          CREATE CASE MODAL
      ========================================= */}
      {isCreating && (
        <ModalOverlay>
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

            <ModalHeader
              eyebrow="CASE REGISTRATION"
              title="Register New FIR / Case"
              description="Create a new investigation record in the central repository."
              onClose={() => setIsCreating(false)}
            />

            <form
              onSubmit={handleCreateCase}
              className="space-y-5 p-5"
            >
              <FormField
                label="Case Title / Incident Subject"
                required
              >
                <input
                  type="text"
                  placeholder="e.g. Cyber Extortion & Crypto Syndicate"
                  value={newCaseData.title}
                  onChange={(e) =>
                    setNewCaseData({
                      ...newCaseData,
                      title: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />
              </FormField>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="FIR Number">
                  <input
                    type="text"
                    placeholder="FIR-2026-DEL-8991"
                    value={newCaseData.firNo}
                    onChange={(e) =>
                      setNewCaseData({
                        ...newCaseData,
                        firNo: e.target.value,
                      })
                    }
                    className={`${inputClass} font-mono text-xs`}
                  />
                </FormField>

                <FormField
                  label="Crime Category"
                  required
                >
                  <input
                    type="text"
                    placeholder="Financial Cyber Crime"
                    value={newCaseData.category}
                    onChange={(e) =>
                      setNewCaseData({
                        ...newCaseData,
                        category: e.target.value,
                      })
                    }
                    className={inputClass}
                    required
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  label="Lead Agency"
                  required
                >
                  <input
                    type="text"
                    placeholder="Cyber Cell Delhi"
                    value={newCaseData.agency}
                    onChange={(e) =>
                      setNewCaseData({
                        ...newCaseData,
                        agency: e.target.value,
                      })
                    }
                    className={inputClass}
                    required
                  />
                </FormField>

                <FormField
                  label="Assigned Officer"
                  required
                >
                  <input
                    type="text"
                    placeholder="Inspector A. Sharma"
                    value={
                      newCaseData.assignedOfficer
                    }
                    onChange={(e) =>
                      setNewCaseData({
                        ...newCaseData,
                        assignedOfficer: e.target.value,
                      })
                    }
                    className={inputClass}
                    required
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Initial Status">
                  <select
                    value={newCaseData.status}
                    onChange={(e) =>
                      setNewCaseData({
                        ...newCaseData,
                        status: e.target.value,
                      })
                    }
                    className={selectClass}
                  >
                    <option value="ACTIVE">
                      ACTIVE
                    </option>
                    <option value="UNDER REVIEW">
                      UNDER REVIEW
                    </option>
                    <option value="ARCHIVED">
                      ARCHIVED
                    </option>
                  </select>
                </FormField>

                <FormField label="Initial Risk Score">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newCaseData.riskScore}
                    onChange={(e) =>
                      setNewCaseData({
                        ...newCaseData,
                        riskScore: Number(
                          e.target.value
                        ),
                      })
                    }
                    className={`${inputClass} font-mono`}
                    required
                  />
                </FormField>
              </div>

              <FormField label="Investigation Tags">
                <input
                  type="text"
                  placeholder="Phishing, Crypto, Ransomware"
                  value={newCaseData.tags}
                  onChange={(e) =>
                    setNewCaseData({
                      ...newCaseData,
                      tags: e.target.value,
                    })
                  }
                  className={inputClass}
                />

                <p className="mt-1.5 text-[10px] text-slate-400">
                  Separate multiple tags with commas.
                </p>
              </FormField>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                >
                  <Plus size={14} />
                  Register Case
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* =========================================
          CASE DETAILS MODAL
      ========================================= */}
      {selectedCase && (
        <ModalOverlay>
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

            <ModalHeader
              eyebrow={`CASE #${selectedCase.id}`}
              title={selectedCase.title}
              description={selectedCase.firNo}
              status={selectedCase.status}
              onClose={() => setSelectedCase(null)}
            />

            <div className="space-y-5 p-5">

              {/* Overview */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoCard
                  label="Crime Category"
                  value={selectedCase.category}
                  icon={Layers3}
                />

                <InfoCard
                  label="Lead Agency"
                  value={selectedCase.agency}
                  icon={Building2}
                />

                <InfoCard
                  label="Lead Officer"
                  value={selectedCase.assignedOfficer}
                  icon={UserRound}
                />

                <InfoCard
                  label="Date Opened"
                  value={selectedCase.dateOpened}
                  icon={CalendarDays}
                />
              </div>

              {/* Risk */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Investigation Risk
                    </span>

                    <div className="mt-1 flex items-baseline gap-1">
                      <span
                        className={`text-2xl font-bold ${
                          getRiskConfig(
                            selectedCase.riskScore
                          ).text
                        }`}
                      >
                        {selectedCase.riskScore}
                      </span>

                      <span className="text-xs text-slate-400">
                        /100
                      </span>
                    </div>
                  </div>

                  <RiskBadge
                    score={selectedCase.riskScore}
                  />
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className={`h-full rounded-full ${
                      getRiskConfig(
                        selectedCase.riskScore
                      ).bar
                    }`}
                    style={{
                      width: `${selectedCase.riskScore}%`,
                    }}
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <DetailMetric
                  icon={Users}
                  label="Entities"
                  value={selectedCase.entitiesCount}
                  className="text-violet-700 bg-violet-50"
                />

                <DetailMetric
                  icon={FileCheck2}
                  label="Evidence"
                  value={selectedCase.evidenceCount}
                  className="text-emerald-700 bg-emerald-50"
                />

                <DetailMetric
                  icon={AlertTriangle}
                  label="Alerts"
                  value={selectedCase.alertsCount}
                  className="text-amber-700 bg-amber-50"
                />
              </div>

              {/* Tags */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Tag size={13} className="text-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Investigation Tags
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Clock3 size={13} />
                  Last activity
                </div>

                <span className="text-xs font-semibold text-slate-700">
                  {selectedCase.lastActivity}
                </span>
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const current = selectedCase;
                    setSelectedCase(null);
                    setEditingCase(current);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                >
                  <Pencil size={13} />
                  Edit Case
                </button>

                <Link
                  to={`/cases/${selectedCase.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                >
                  Open Investigation Workspace
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* =========================================
          EDIT CASE MODAL
      ========================================= */}
      {editingCase && (
        <ModalOverlay>
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

            <ModalHeader
              eyebrow={`EDITING CASE #${editingCase.id}`}
              title="Update Case Information"
              description={editingCase.firNo}
              onClose={() => setEditingCase(null)}
            />

            <form
              onSubmit={handleSaveEdit}
              className="space-y-5 p-5"
            >
              <FormField label="Case Title" required>
                <input
                  type="text"
                  value={editingCase.title}
                  onChange={(e) =>
                    setEditingCase({
                      ...editingCase,
                      title: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />
              </FormField>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  label="Crime Category"
                  required
                >
                  <input
                    type="text"
                    value={editingCase.category}
                    onChange={(e) =>
                      setEditingCase({
                        ...editingCase,
                        category: e.target.value,
                      })
                    }
                    className={inputClass}
                    required
                  />
                </FormField>

                <FormField label="Status">
                  <select
                    value={editingCase.status}
                    onChange={(e) =>
                      setEditingCase({
                        ...editingCase,
                        status: e.target.value,
                      })
                    }
                    className={selectClass}
                  >
                    <option value="ACTIVE">
                      ACTIVE
                    </option>
                    <option value="UNDER REVIEW">
                      UNDER REVIEW
                    </option>
                    <option value="ARCHIVED">
                      ARCHIVED
                    </option>
                  </select>
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  label="Lead Officer"
                  required
                >
                  <input
                    type="text"
                    value={editingCase.assignedOfficer}
                    onChange={(e) =>
                      setEditingCase({
                        ...editingCase,
                        assignedOfficer: e.target.value,
                      })
                    }
                    className={inputClass}
                    required
                  />
                </FormField>

                <FormField label="Risk Score">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingCase.riskScore}
                    onChange={(e) =>
                      setEditingCase({
                        ...editingCase,
                        riskScore: Number(
                          e.target.value
                        ),
                      })
                    }
                    className={`${inputClass} font-mono`}
                    required
                  />
                </FormField>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start gap-2">
                  <ShieldAlert
                    size={14}
                    className="mt-0.5 text-slate-500"
                  />

                  <div>
                    <p className="text-[11px] font-semibold text-slate-700">
                      Case registry update
                    </p>

                    <p className="mt-0.5 text-[10px] leading-5 text-slate-500">
                      Changes are applied to the current
                      client-side investigation registry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    setEditingCase(null)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                >
                  <Save size={14} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

/* =====================================================
   REUSABLE COMPONENTS
===================================================== */

function SummaryCard({
  label,
  value,
  icon: Icon,
  iconClass,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}
        >
          <Icon size={15} />
        </div>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  value,
  label,
  iconClass,
}) {
  return (
    <div
      className="flex items-center gap-1.5"
      title={label}
    >
      <Icon size={13} className={iconClass} />
      <span className="text-xs font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}

function DetailMetric({
  icon: Icon,
  label,
  value,
  className,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-center">
      <div
        className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg ${className}`}
      >
        <Icon size={15} />
      </div>

      <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-0.5 text-base font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function RiskBadge({ score }) {
  let config;

  if (score >= 85) {
    config = {
      label: 'Critical',
      className:
        'bg-rose-50 text-rose-700 border-rose-200',
    };
  } else if (score >= 70) {
    config = {
      label: 'High',
      className:
        'bg-orange-50 text-orange-700 border-orange-200',
    };
  } else if (score >= 60) {
    config = {
      label: 'Moderate',
      className:
        'bg-amber-50 text-amber-700 border-amber-200',
    };
  } else {
    config = {
      label: 'Low',
      className:
        'bg-slate-100 text-slate-600 border-slate-200',
    };
  }

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function InfoCard({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
      <div className="flex items-start gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
          <Icon size={14} />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-xs font-semibold leading-5 text-slate-700">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  required = false,
  children,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-bold text-slate-600">
        {label}
        {required && (
          <span className="ml-1 text-rose-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

function ModalOverlay({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-[3px]">
      <div className="max-h-[92vh] w-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

function ModalHeader({
  eyebrow,
  title,
  description,
  status,
  onClose,
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-700">
            {eyebrow}
          </span>

          {status && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-bold uppercase text-slate-500">
              {status}
            </span>
          )}
        </div>

        <h2 className="mt-1 text-base font-bold leading-6 text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-0.5 font-mono text-[10px] text-slate-400">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="shrink-0 rounded-lg border border-slate-200 bg-white p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
        aria-label="Close"
      >
        <X size={15} />
      </button>
    </div>
  );
}