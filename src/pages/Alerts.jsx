import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Car,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  Filter,
  MapPin,
  Radio,
  Search,
  ShieldAlert,
  Smartphone,
  UserCheck,
  XCircle,
} from 'lucide-react';

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [ackStateFilter, setAckStateFilter] = useState('UNACKNOWLEDGED');

  const [alerts, setAlerts] = useState([
    {
      id: 'ALT-2026-9011',
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      title: 'High-Velocity Hawala UPI Transfer Detected',
      category: 'Financial Anomaly',
      severity: 'CRITICAL',
      score: 96,
      timestamp: '2 mins ago',
      location: 'Noida Sector 62, UP',
      source: 'NPCI / FIU Automated Stream',
      description:
        'Multiple structured micro-transactions totaling ₹42,000,000 executed across 18 mule bank accounts within 120 seconds.',
      entitiesInvolved: [
        'ACC-9921-X',
        'ACC-8831-Y',
        'Rahul Verma (Suspect)',
      ],
      acknowledged: false,
      tags: ['Hawala', 'UPI Mule', 'Real-time FIU'],
    },
    {
      id: 'ALT-2026-8942',
      caseId: '26189-088',
      firNo: 'FIR-2026-DL-4410',
      title: 'Burner IMEI Active on Tower Dump Boundary',
      category: 'Telecom Intelligence',
      severity: 'HIGH',
      score: 84,
      timestamp: '14 mins ago',
      location: 'Connaught Place Outer Ring, Delhi',
      source: 'SDR / CDR Live Feed',
      description:
        'Target IMEI #864192040182741 registered activity on Sector-4 Cell Tower following 14 days of radio silence.',
      entitiesInvolved: ['IMEI-864192040182741', '+91 98100-XXXXX'],
      acknowledged: false,
      tags: ['Tower Dump', 'Burner SIM', 'Cell ID'],
    },
    {
      id: 'ALT-2026-8890',
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      title: 'ANPR Camera Match for Wanted Syndicate Vehicle',
      category: 'Vehicle Tracking',
      severity: 'HIGH',
      score: 81,
      timestamp: '45 mins ago',
      location: 'Delhi-Gurugram Expressway Toll Gate 3',
      source: 'National ANPR Camera Mesh',
      description:
        'License plate DL-01-AB-9921 flagged on toll camera heading Westbound. Vehicle linked to suspect transport operations.',
      entitiesInvolved: ['DL-01-AB-9921 (SUV)', 'Toll-Gate-3-Cam'],
      acknowledged: true,
      acknowledgedBy: 'DySP S. Pattnaik',
      tags: ['ANPR', 'Vehicle Intercept', 'Live Camera'],
    },
    {
      id: 'ALT-2026-8712',
      caseId: '26189-102',
      firNo: 'FIR-2026-MH-1102',
      title: 'Crypto Wallet Mixing Activity Detected',
      category: 'Cyber / Crypto',
      severity: 'MEDIUM',
      score: 68,
      timestamp: '3 hours ago',
      location: 'Decentralized Blockchain Network',
      source: 'On-Chain Ledger Observer',
      description:
        '14.2 BTC transferred into Tornado Cash-style mixer from wallet previously tagged in ransom extortion scheme.',
      entitiesInvolved: ['0x71C...4f2', 'Mixer Smart Contract'],
      acknowledged: true,
      acknowledgedBy: 'Inspector R. Deshmukh',
      tags: ['Blockchain', 'Crypto Mixer', 'Ransomware'],
    },
  ]);

  const handleAcknowledge = (id) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              acknowledged: true,
              acknowledgedBy: 'Current Officer (You)',
            }
          : alert
      )
    );
  };

  const filteredAlerts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return alerts.filter((alert) => {
      const matchesSearch =
        !query ||
        alert.title.toLowerCase().includes(query) ||
        alert.id.toLowerCase().includes(query) ||
        alert.firNo.toLowerCase().includes(query) ||
        alert.description.toLowerCase().includes(query) ||
        alert.location.toLowerCase().includes(query) ||
        alert.entitiesInvolved.some((entity) =>
          entity.toLowerCase().includes(query)
        );

      const matchesSeverity =
        severityFilter === 'ALL' || alert.severity === severityFilter;

      const matchesCategory =
        categoryFilter === 'ALL' || alert.category === categoryFilter;

      const matchesAck =
        ackStateFilter === 'ALL' ||
        (ackStateFilter === 'UNACKNOWLEDGED' && !alert.acknowledged) ||
        (ackStateFilter === 'ACKNOWLEDGED' && alert.acknowledged);

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesCategory &&
        matchesAck
      );
    });
  }, [
    alerts,
    searchQuery,
    severityFilter,
    categoryFilter,
    ackStateFilter,
  ]);

  const stats = useMemo(() => {
    return {
      total: alerts.length,
      unacknowledged: alerts.filter((alert) => !alert.acknowledged).length,
      critical: alerts.filter(
        (alert) => alert.severity === 'CRITICAL'
      ).length,
      acknowledged: alerts.filter((alert) => alert.acknowledged).length,
    };
  }, [alerts]);

  const resetFilters = () => {
    setSearchQuery('');
    setSeverityFilter('ALL');
    setCategoryFilter('ALL');
    setAckStateFilter('UNACKNOWLEDGED');
  };

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          badge: 'bg-red-50 text-red-700 border-red-200',
          dot: 'bg-red-500',
          border: 'border-l-red-500',
          score: 'text-red-700',
        };

      case 'HIGH':
        return {
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
          dot: 'bg-amber-500',
          border: 'border-l-amber-500',
          score: 'text-amber-700',
        };

      case 'MEDIUM':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500',
          border: 'border-l-blue-500',
          score: 'text-blue-700',
        };

      default:
        return {
          badge: 'bg-slate-50 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
          border: 'border-l-slate-400',
          score: 'text-slate-700',
        };
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Financial Anomaly':
        return <CreditCard size={17} />;

      case 'Telecom Intelligence':
        return <Smartphone size={17} />;

      case 'Vehicle Tracking':
        return <Car size={17} />;

      default:
        return <Radio size={17} />;
    }
  };

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'Financial Anomaly':
        return 'bg-cyan-50 text-cyan-700 border-cyan-100';

      case 'Telecom Intelligence':
        return 'bg-violet-50 text-violet-700 border-violet-100';

      case 'Vehicle Tracking':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';

      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900 font-sans">
      <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8 space-y-6">

        {/* -------------------------------------------------------
            HEADER
        ------------------------------------------------------- */}
        <header className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="px-5 py-5 sm:px-6">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-600">
                    Threat Intelligence
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    Active Alerts
                  </h1>

                  {stats.unacknowledged > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-700">
                      <AlertTriangle size={12} />
                      {stats.unacknowledged} action required
                    </span>
                  )}
                </div>

                <p className="mt-1.5 max-w-3xl text-sm text-slate-500">
                  Monitor automated anomalies across financial activity,
                  telecom intelligence, vehicle tracking, and cyber feeds.
                </p>
              </div>

              {/* Workspace Status */}
              <div className="flex items-center gap-3 self-start xl:self-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200">
                  <Radio size={17} className="text-emerald-600" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-800">
                      Monitoring Workspace
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Sample intelligence feed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Summary strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-slate-200">
            <SummaryItem
              icon={<Bell size={15} />}
              label="Total Alerts"
              value={stats.total}
            />

            <SummaryItem
              icon={<AlertTriangle size={15} />}
              label="Action Required"
              value={stats.unacknowledged}
              valueClass="text-red-600"
            />

            <SummaryItem
              icon={<ShieldAlert size={15} />}
              label="Critical"
              value={stats.critical}
              valueClass="text-red-600"
            />

            <SummaryItem
              icon={<CheckCircle2 size={15} />}
              label="Acknowledged"
              value={stats.acknowledged}
              valueClass="text-emerald-600"
            />
          </div>
        </header>

        {/* -------------------------------------------------------
            FILTER BAR
        ------------------------------------------------------- */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-slate-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Alert Filters
              </span>
            </div>

            {(searchQuery ||
              severityFilter !== 'ALL' ||
              categoryFilter !== 'ALL' ||
              ackStateFilter !== 'UNACKNOWLEDGED') && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FIR, alert, entity..."
                className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <FilterSelect
              icon={<Bell size={15} />}
              value={ackStateFilter}
              onChange={setAckStateFilter}
              options={[
                ['UNACKNOWLEDGED', 'Action: Unacknowledged'],
                ['ACKNOWLEDGED', 'Action: Acknowledged'],
                ['ALL', 'Action: All Statuses'],
              ]}
            />

            <FilterSelect
              icon={<ShieldAlert size={15} />}
              value={severityFilter}
              onChange={setSeverityFilter}
              options={[
                ['ALL', 'Severity: All Tiers'],
                ['CRITICAL', 'Severity: Critical'],
                ['HIGH', 'Severity: High'],
                ['MEDIUM', 'Severity: Medium'],
              ]}
            />

            <FilterSelect
              icon={<Filter size={15} />}
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[
                ['ALL', 'Category: All Feeds'],
                ['Financial Anomaly', 'Financial Anomaly'],
                ['Telecom Intelligence', 'Telecom Intelligence'],
                ['Vehicle Tracking', 'Vehicle Tracking'],
                ['Cyber / Crypto', 'Cyber / Crypto'],
              ]}
            />
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-500">
              Showing{' '}
              <span className="font-semibold text-slate-700">
                {filteredAlerts.length}
              </span>{' '}
              of {alerts.length} alerts
            </span>

            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              Filtered intelligence view
            </span>
          </div>
        </section>

        {/* -------------------------------------------------------
            ALERT FEED
        ------------------------------------------------------- */}
        <section className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
                <CheckCircle2 size={27} className="text-emerald-600" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-800">
                No Matching Alerts
              </h3>

              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                No alerts match the current search and filter criteria.
              </p>

              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const severity = getSeverityConfig(alert.severity);

              return (
                <article
                  key={alert.id}
                  className={`bg-white border border-slate-200 border-l-4 ${severity.border} rounded-2xl shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="p-5 sm:p-6">

                    {/* Alert top section */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                      <div className="flex gap-3.5 min-w-0">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${getCategoryStyle(
                            alert.category
                          )}`}
                        >
                          {getCategoryIcon(alert.category)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold font-mono text-blue-700">
                              {alert.id}
                            </span>

                            <span className="text-slate-300">•</span>

                            <Link
                              to={`/cases/${alert.caseId}`}
                              className="text-[10px] font-mono font-medium text-slate-500 hover:text-blue-600 transition underline underline-offset-2"
                            >
                              {alert.firNo}
                            </Link>
                          </div>

                          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                            {alert.title}
                          </h2>

                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${getCategoryStyle(
                                alert.category
                              )}`}
                            >
                              {getCategoryIcon(alert.category)}
                              {alert.category}
                            </span>

                            {alert.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-slate-50 border border-slate-200 px-2 py-1 text-[9px] font-medium text-slate-500"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Severity / Time */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${severity.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${severity.dot}`}
                          />
                          {alert.severity}
                        </span>

                        <span
                          className={`rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold font-mono ${severity.score}`}
                        >
                          {alert.score}/100
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-400">
                          <Clock3 size={12} />
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mt-5">
                      <p className="text-xs sm:text-sm leading-6 text-slate-600 max-w-5xl">
                        {alert.description}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
                      <InfoBox
                        icon={<MapPin size={14} />}
                        label="Location"
                        value={alert.location}
                        iconClass="text-red-500"
                      />

                      <InfoBox
                        icon={<Radio size={14} />}
                        label="Source Stream"
                        value={alert.source}
                        iconClass="text-blue-600"
                      />
                    </div>

                    {/* Entities */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-1">
                          Entities Flagged
                        </span>

                        <div className="flex flex-wrap gap-1.5">
                          {alert.entitiesInvolved.map((entity) => (
                            <span
                              key={entity}
                              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-mono text-slate-700"
                            >
                              {entity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer / Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                      <div>
                        {alert.acknowledged ? (
                          <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-700">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
                              <UserCheck size={13} />
                            </span>

                            <span>
                              Acknowledged by{' '}
                              <strong>{alert.acknowledgedBy}</strong>
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-700">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 border border-amber-100">
                              <AlertTriangle size={13} />
                            </span>

                            Requires officer acknowledgment
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        {!alert.acknowledged && (
                          <button
                            onClick={() => handleAcknowledge(alert.id)}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
                          >
                            <CheckCircle2 size={14} />
                            Acknowledge
                          </button>
                        )}

                        <Link
                          to={`/cases/${alert.caseId}`}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-[11px] font-bold text-white hover:bg-slate-800 transition"
                        >
                          Investigate in Workspace
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
}

/* ============================================================
   SMALL REUSABLE UI COMPONENTS
============================================================ */

function SummaryItem({
  icon,
  label,
  value,
  valueClass = 'text-slate-900',
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 border-r border-slate-200 last:border-r-0">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500">
        {icon}
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <p className={`text-lg font-bold leading-none mt-1 ${valueClass}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

function FilterSelect({ icon, value, onChange, options }) {
  return (
    <div className="relative">
      <div className="flex items-center h-10 rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
        <span className="text-slate-400 mr-2 shrink-0">{icon}</span>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-transparent w-full pr-7 text-xs font-semibold text-slate-700 outline-none cursor-pointer"
        >
          {options.map(([optionValue, label]) => (
            <option key={optionValue} value={optionValue}>
              {label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="absolute right-3.5 pointer-events-none text-slate-400"
        />
      </div>
    </div>
  );
}

function InfoBox({ icon, label, value, iconClass }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
      <div className={`shrink-0 ${iconClass}`}>{icon}</div>

      <div className="min-w-0">
        <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>

        <span className="block mt-0.5 truncate text-[11px] font-semibold text-slate-700">
          {value}
        </span>
      </div>
    </div>
  );
}