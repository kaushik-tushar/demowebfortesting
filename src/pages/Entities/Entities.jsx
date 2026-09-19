import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  User,
  Phone,
  Building2,
  CreditCard,
  ChevronRight,
  ShieldAlert,
  Plus,
  Download,
  ArrowUpDown,
  Activity,
  MapPin,
  FileText,
  Network,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export default function Entities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState('riskScore');

  // Master Entity Registry Data
  const [entities] = useState([
    {
      id: 'ENT-801',
      name: 'Vikram "Raja" Malhotra',
      type: 'SUSPECT',
      role: 'Primary Kingpin / Syndicate Operative',
      linkedCases: ['26189-042', '26189-088'],
      firNo: 'FIR-2026-NCRB-9021',
      riskScore: 92,
      connectionsCount: 12,
      status: 'UNDER_SURVEILLANCE',
      lastSeen: '12 Jan 2026 - Noida Sector 62',
      primaryIdentifier: 'AADHAAR: XXXX-XXXX-9012',
    },
    {
      id: 'ENT-802',
      name: '+91 98210-XXXXX',
      type: 'PHONE',
      role: 'Burner SIM Line (Tower Dump Link)',
      linkedCases: ['26189-042'],
      firNo: 'FIR-2026-NCRB-9021',
      riskScore: 78,
      connectionsCount: 5,
      status: 'FLAGGED',
      lastSeen: '12 Jan 2026 - CDR Call Peak',
      primaryIdentifier: 'IMSI: 4044509128XXXXX',
    },
    {
      id: 'ENT-803',
      name: 'Apex Horizon Shell Corp Ltd.',
      type: 'ENTITY',
      role: 'Offshore Financial Proxy Company',
      linkedCases: ['26189-088'],
      firNo: 'FIR-2026-DL-4410',
      riskScore: 88,
      connectionsCount: 8,
      status: 'FROZEN',
      lastSeen: '05 Feb 2026 - Wire Transfer',
      primaryIdentifier: 'CIN: U72200DL2024PTC9021',
    },
    {
      id: 'ENT-804',
      name: 'Axis Bank Mule Acct #9041',
      type: 'FINANCIAL',
      role: 'Mule Account (Money Laundering)',
      linkedCases: ['26189-042', '26189-088'],
      firNo: 'FIR-2026-NCRB-9021',
      riskScore: 65,
      connectionsCount: 4,
      status: 'INVESTIGATING',
      lastSeen: '15 Jan 2026 - ATM Withdrawal',
      primaryIdentifier: 'IFSC: UTIB0000102',
    },
    {
      id: 'ENT-805',
      name: 'Anand "Micro" Verma',
      type: 'SUSPECT',
      role: 'Technical Conduit / Mule Recruiter',
      linkedCases: ['26189-102'],
      firNo: 'FIR-2026-MH-1102',
      riskScore: 71,
      connectionsCount: 6,
      status: 'DETAINED',
      lastSeen: '20 Feb 2026 - In Custody',
      primaryIdentifier: 'PAN: BKPPR9021K',
    },
  ]);

  const getTypeConfig = (type) => {
    switch (type) {
      case 'SUSPECT':
        return {
          label: 'Individual / Suspect',
          icon: User,
          iconClass: 'text-red-600',
          bgClass: 'bg-red-50',
          borderClass: 'border-red-100',
        };

      case 'PHONE':
        return {
          label: 'CDR Phone Line',
          icon: Phone,
          iconClass: 'text-amber-600',
          bgClass: 'bg-amber-50',
          borderClass: 'border-amber-100',
        };

      case 'ENTITY':
        return {
          label: 'Corporate Entity',
          icon: Building2,
          iconClass: 'text-indigo-600',
          bgClass: 'bg-indigo-50',
          borderClass: 'border-indigo-100',
        };

      case 'FINANCIAL':
        return {
          label: 'Financial Account',
          icon: CreditCard,
          iconClass: 'text-cyan-600',
          bgClass: 'bg-cyan-50',
          borderClass: 'border-cyan-100',
        };

      default:
        return {
          label: 'Entity',
          icon: Users,
          iconClass: 'text-slate-500',
          bgClass: 'bg-slate-50',
          borderClass: 'border-slate-200',
        };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'UNDER_SURVEILLANCE':
        return {
          label: 'Under Surveillance',
          className: 'bg-red-50 text-red-700 border-red-200',
        };

      case 'FROZEN':
        return {
          label: 'Frozen',
          className: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        };

      case 'DETAINED':
        return {
          label: 'Detained',
          className: 'bg-amber-50 text-amber-700 border-amber-200',
        };

      case 'FLAGGED':
        return {
          label: 'Flagged',
          className: 'bg-orange-50 text-orange-700 border-orange-200',
        };

      case 'INVESTIGATING':
        return {
          label: 'Investigating',
          className: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        };

      default:
        return {
          label: status,
          className: 'bg-slate-50 text-slate-600 border-slate-200',
        };
    }
  };

  const getRiskConfig = (score) => {
    if (score >= 85) {
      return {
        label: 'Critical',
        text: 'text-red-600',
        bar: 'bg-red-500',
        track: 'bg-red-100',
      };
    }

    if (score >= 70) {
      return {
        label: 'High',
        text: 'text-orange-600',
        bar: 'bg-orange-500',
        track: 'bg-orange-100',
      };
    }

    return {
      label: 'Moderate',
      text: 'text-amber-600',
      bar: 'bg-amber-500',
      track: 'bg-amber-100',
    };
  };

  const filteredEntities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return [...entities]
      .filter((item) => {
        const matchesSearch =
          !query ||
          item.name.toLowerCase().includes(query) ||
          item.role.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          item.primaryIdentifier.toLowerCase().includes(query) ||
          item.firNo.toLowerCase().includes(query) ||
          item.lastSeen.toLowerCase().includes(query);

        const matchesType =
          typeFilter === 'ALL' || item.type === typeFilter;

        const matchesStatus =
          statusFilter === 'ALL' || item.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
      })
      .sort((a, b) => {
        if (sortField === 'riskScore') {
          return b.riskScore - a.riskScore;
        }

        if (sortField === 'connectionsCount') {
          return b.connectionsCount - a.connectionsCount;
        }

        if (sortField === 'name') {
          return a.name.localeCompare(b.name);
        }

        return 0;
      });
  }, [
    entities,
    searchQuery,
    typeFilter,
    statusFilter,
    sortField,
  ]);

  const summary = useMemo(() => {
    return {
      total: entities.length,
      suspects: entities.filter((e) => e.type === 'SUSPECT').length,
      highRisk: entities.filter((e) => e.riskScore >= 85).length,
      monitored: entities.filter(
        (e) =>
          e.status === 'UNDER_SURVEILLANCE' ||
          e.status === 'FLAGGED'
      ).length,
    };
  }, [entities]);

  const resetFilters = () => {
    setSearchQuery('');
    setTypeFilter('ALL');
    setStatusFilter('ALL');
    setSortField('riskScore');
  };

  const hasActiveFilters =
    searchQuery ||
    typeFilter !== 'ALL' ||
    statusFilter !== 'ALL';

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <header className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Users size={15} className="text-blue-600" />
              </div>

              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-blue-700">
                Entity Intelligence Registry
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950">
              Target & Suspect Directory
            </h1>

            <p className="text-sm text-slate-500 mt-1.5 max-w-3xl">
              Central registry for persons, communication identifiers,
              corporate entities, and financial accounts linked to active
              investigations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-slate-300 hover:bg-slate-50 transition"
            >
              <Download size={14} />
              Export Registry
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
            >
              <Plus size={15} />
              Register Entity
            </button>
          </div>
        </header>

        {/* =========================================================
            SUMMARY STRIP
        ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <SummaryCard
            label="Total Entities"
            value={summary.total}
            icon={Users}
            description="Registry records"
          />

          <SummaryCard
            label="Individuals"
            value={summary.suspects}
            icon={User}
            description="Suspect profiles"
          />

          <SummaryCard
            label="High Risk"
            value={summary.highRisk}
            icon={ShieldAlert}
            description="Score ≥ 85"
            valueClass="text-red-600"
          />

          <SummaryCard
            label="Monitored"
            value={summary.monitored}
            icon={Activity}
            description="Surveillance / flagged"
            valueClass="text-orange-600"
          />
        </div>

        {/* =========================================================
            FILTER PANEL
        ========================================================= */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="px-4 py-3.5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-slate-500" />

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Registry Filters
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Narrow the entity index using identity, category, or status.
                </p>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition"
              >
                <X size={13} />
                Clear filters
              </button>
            )}
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-3">
            {/* Search */}
            <div className="lg:col-span-5 relative">
              <Search
                size={15}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, ID, FIR, identifier, role..."
                className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
              />
            </div>

            {/* Category */}
            <div className="lg:col-span-3 relative">
              <Filter
                size={14}
                className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"
              />

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full h-10 appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer"
              >
                <option value="ALL">All Entity Categories</option>
                <option value="SUSPECT">Individuals / Suspects</option>
                <option value="PHONE">CDR Phone Lines</option>
                <option value="ENTITY">Corporate Entities</option>
                <option value="FINANCIAL">Financial Accounts</option>
              </select>
            </div>

            {/* Status */}
            <div className="lg:col-span-2 relative">
              <ShieldAlert
                size={14}
                className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="UNDER_SURVEILLANCE">
                  Under Surveillance
                </option>
                <option value="FLAGGED">Flagged</option>
                <option value="FROZEN">Frozen</option>
                <option value="DETAINED">Detained</option>
                <option value="INVESTIGATING">Investigating</option>
              </select>
            </div>

            {/* Sort */}
            <div className="lg:col-span-2 relative">
              <ArrowUpDown
                size={14}
                className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"
              />

              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="w-full h-10 appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer"
              >
                <option value="riskScore">Sort: Risk Score</option>
                <option value="connectionsCount">
                  Sort: Connections
                </option>
                <option value="name">Sort: Name</option>
              </select>
            </div>
          </div>
        </section>

        {/* =========================================================
            RESULT HEADER
        ========================================================= */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Entity Records
            </p>

            <p className="text-[11px] text-slate-400 mt-0.5">
              Showing {filteredEntities.length} of {entities.length} registry
              records
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Registry synchronized
          </div>
        </div>

        {/* =========================================================
            ENTITY GRID
        ========================================================= */}
        {filteredEntities.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
            <div className="mx-auto h-11 w-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
              <Search size={18} className="text-slate-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-800">
              No matching entities
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Try changing your search terms or clearing one of the filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredEntities.map((item) => {
              const typeConfig = getTypeConfig(item.type);
              const statusConfig = getStatusConfig(item.status);
              const riskConfig = getRiskConfig(item.riskScore);
              const TypeIcon = typeConfig.icon;

              return (
                <article
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden"
                >
                  {/* Top risk indicator */}
                  <div className={`h-1 w-full ${riskConfig.bar}`} />

                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`h-10 w-10 rounded-lg border ${typeConfig.borderClass} ${typeConfig.bgClass} flex items-center justify-center shrink-0`}
                        >
                          <TypeIcon
                            size={18}
                            className={typeConfig.iconClass}
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono font-bold tracking-wide text-blue-600">
                              {item.id}
                            </span>
                          </div>

                          <h3 className="text-sm font-semibold text-slate-900 leading-snug break-words">
                            {item.name}
                          </h3>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 px-2 py-1 rounded-md border text-[9px] uppercase tracking-wide font-bold ${statusConfig.className}`}
                      >
                        {statusConfig.label}
                      </span>
                    </div>

                    {/* Type / Role */}
                    <div className="mt-4">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        Entity Role
                      </span>

                      <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                        {item.role}
                      </p>
                    </div>

                    {/* Identifier */}
                    <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                          Primary Identifier
                        </span>

                        <FileText
                          size={13}
                          className="text-slate-400"
                        />
                      </div>

                      <p className="mt-1.5 font-mono text-[10px] font-semibold text-slate-700 break-all">
                        {item.primaryIdentifier}
                      </p>
                    </div>

                    {/* Risk + connections */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-slate-200 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                            Risk Score
                          </span>

                          <span
                            className={`text-[9px] font-bold ${riskConfig.text}`}
                          >
                            {riskConfig.label}
                          </span>
                        </div>

                        <div className="flex items-end gap-1.5 mt-1">
                          <span
                            className={`text-xl font-bold font-mono ${riskConfig.text}`}
                          >
                            {item.riskScore}
                          </span>

                          <span className="text-[10px] text-slate-400 mb-1">
                            / 100
                          </span>
                        </div>

                        <div
                          className={`h-1.5 rounded-full ${riskConfig.track} mt-2 overflow-hidden`}
                        >
                          <div
                            className={`h-full rounded-full ${riskConfig.bar}`}
                            style={{ width: `${item.riskScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-200 p-3">
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                          Graph Links
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="h-7 w-7 rounded-md bg-blue-50 flex items-center justify-center">
                            <Network
                              size={14}
                              className="text-blue-600"
                            />
                          </div>

                          <div>
                            <span className="text-lg font-bold font-mono text-slate-900">
                              {item.connectionsCount}
                            </span>

                            <span className="text-[10px] text-slate-400 ml-1">
                              nodes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Last seen */}
                    <div className="mt-4 flex items-start gap-2.5">
                      <MapPin
                        size={14}
                        className="text-slate-400 mt-0.5 shrink-0"
                      />

                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                          Last Recorded Activity
                        </span>

                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          {item.lastSeen}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 block">
                          Anchor FIR
                        </span>

                        <span className="text-[10px] font-mono text-slate-600 truncate block max-w-[150px]">
                          {item.firNo}
                        </span>
                      </div>

                      <Link
                        to={`/network?node=${item.id}`}
                        className="inline-flex items-center gap-1.5 shrink-0 px-2.5 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 text-[10px] font-semibold transition"
                      >
                        Inspect Graph
                        <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* =========================================================
            FOOTER CONTEXT
        ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-1">
          <p className="text-[10px] text-slate-400">
            Entity records are displayed according to the currently selected
            registry filters and investigation scope.
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span>CrimeGraph AI</span>
            <span>•</span>
            <span>Entity Intelligence</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   SUMMARY CARD
============================================================= */

function SummaryCard({
  label,
  value,
  icon: Icon,
  description,
  valueClass = 'text-slate-900',
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
            {label}
          </p>

          <p className={`text-2xl font-bold mt-1 ${valueClass}`}>
            {value}
          </p>

          <p className="text-[10px] text-slate-400 mt-0.5">
            {description}
          </p>
        </div>

        <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
          <Icon size={15} className="text-slate-500" />
        </div>
      </div>
    </div>
  );
}