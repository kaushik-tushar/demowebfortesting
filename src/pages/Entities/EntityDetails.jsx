import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Download,
  ExternalLink,
  FileCheck2,
  Fingerprint,
  KeyRound,
  Lock,
  MapPin,
  Maximize2,
  Network,
  Phone,
  Radio,
  ShieldAlert,
  Smartphone,
  User,
  UserCheck,
} from 'lucide-react';

export default function EntityDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('DOSSIER');

  /*
   * Simulated Entity Profile Data
   * In production, fetch this using the route `id`.
   */
  const entity = {
    id: id || 'ENT-801',
    name: 'Vikram "Raja" Malhotra',
    type: 'SUSPECT',
    role: 'Primary Kingpin / Syndicate Operative',
    status: 'UNDER_SURVEILLANCE',
    riskScore: 92,

    primaryIdentifier: 'AADHAAR: XXXX-XXXX-9012',

    alternateIdentifiers: [
      {
        label: 'PAN Card',
        value: 'ABCDE1234F',
      },
      {
        label: 'Passport',
        value: 'Z-8041920',
      },
      {
        label: 'Primary IMEI',
        value: '869402049182391',
      },
    ],

    primaryFIR: 'FIR-2026-NCRB-9021',
    caseId: '26189-042',

    registeredAddress:
      'House No. 42, Block C, Sector 62, Noida, UP - 201301',

    lastKnownLocation:
      'Tower Dump Sector 62, Noida (12 Jan 2026, 02:14:22 IST)',

    linkedCases: [
      {
        caseId: '26189-042',
        firNo: 'FIR-2026-NCRB-9021',
        title: 'Cyber Financial Fraud & Wire Hijack',
        role: 'Key Accused',
      },
      {
        caseId: '26189-088',
        firNo: 'FIR-2026-DL-4410',
        title: 'Offshore Shell Account Money Laundering',
        role: 'Co-Conspirator',
      },
    ],

    linkedDevices: [
      {
        type: 'Phone SIM',
        value: '+91 98210-XXXXX',
        label: 'Burner SIM (Airtel NCR)',
      },
      {
        type: 'Phone SIM',
        value: '+91 98112-XXXXX',
        label: 'Primary Encrypted Line',
      },
      {
        type: 'Bank Acct',
        value: 'Axis Bank - Acct #9041',
        label: 'Mule Receiver Node',
      },
    ],

    evidenceLog: [
      {
        id: 'EVT-9081',
        timestamp: '12 Jan 2026, 02:14:22 IST',
        title: 'Inter-Suspect Tower Call (184s)',
        hash: 'SHA256: e3b0c...852b855',
      },
      {
        id: 'EVT-9078',
        timestamp: '12 Jan 2026, 02:45:10 IST',
        title: 'RTGS Wire Transfer (₹45,00,000)',
        hash: 'SHA256: 7f83b...126d9069',
      },
    ],
  };

  const riskLabel = useMemo(() => {
    if (entity.riskScore >= 90) return 'Critical';
    if (entity.riskScore >= 75) return 'High';
    if (entity.riskScore >= 50) return 'Moderate';
    return 'Low';
  }, [entity.riskScore]);

  const getRiskStyles = () => {
    if (entity.riskScore >= 90) {
      return {
        text: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
        bar: 'bg-red-500',
      };
    }

    if (entity.riskScore >= 75) {
      return {
        text: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        bar: 'bg-amber-500',
      };
    }

    return {
      text: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      bar: 'bg-blue-500',
    };
  };

  const riskStyles = getRiskStyles();

  const getStatusBadge = () => {
    switch (entity.status) {
      case 'UNDER_SURVEILLANCE':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-red-700">
            <Radio size={13} />
            Surveillance Active
          </span>
        );

      case 'FROZEN':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-violet-700">
            <Lock size={13} />
            Account Frozen
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
            <Activity size={13} />
            Under Investigation
          </span>
        );
    }
  };

  const tabs = [
    {
      id: 'DOSSIER',
      label: 'Profile & Identifiers',
      icon: <User size={15} />,
    },
    {
      id: 'CASES',
      label: 'Linked FIR Cases',
      icon: <FileCheck2 size={15} />,
    },
    {
      id: 'EVIDENCE',
      label: 'Evidence Logs',
      icon: <Clock3 size={15} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900 font-sans">
      <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8 space-y-6">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <header className="bg-white border border-slate-200 rounded-2xl shadow-sm">

          <div className="p-5 sm:p-6">
            <Link
              to="/entities"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition mb-5"
            >
              <ArrowLeft size={14} />
              Back to Master Entity Directory
            </Link>

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

              {/* Identity */}
              <div className="flex items-start gap-4 min-w-0">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700">
                  <User size={26} />
                </div>

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-1 text-[10px] font-bold font-mono text-slate-600">
                      {entity.id}
                    </span>

                    <span className="text-slate-300">•</span>

                    <span className="text-[10px] font-mono text-slate-500">
                      {entity.primaryIdentifier}
                    </span>

                    <span className="text-slate-300">•</span>

                    <span className="text-[10px] font-bold uppercase tracking-wide text-red-600">
                      {entity.type}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    {entity.name}
                  </h1>

                  <p className="mt-1 text-xs sm:text-sm text-slate-500">
                    {entity.role}
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

                {/* Risk Score */}
                <div
                  className={`min-w-[180px] rounded-xl border ${riskStyles.border} ${riskStyles.bg} px-4 py-3`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span
                        className={`block text-[9px] font-bold uppercase tracking-[0.14em] ${riskStyles.text}`}
                      >
                        Risk Score
                      </span>

                      <div className="flex items-end gap-1.5 mt-0.5">
                        <span
                          className={`text-2xl leading-none font-bold font-mono ${riskStyles.text}`}
                        >
                          {entity.riskScore}
                        </span>

                        <span className="text-[10px] font-medium text-slate-400 mb-0.5">
                          / 100
                        </span>
                      </div>
                    </div>

                    <ShieldAlert
                      size={22}
                      className={riskStyles.text}
                    />
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/80">
                    <div
                      className={`h-full rounded-full ${riskStyles.bar}`}
                      style={{ width: `${entity.riskScore}%` }}
                    />
                  </div>

                  <div className="mt-1.5 flex justify-between">
                    <span
                      className={`text-[9px] font-bold uppercase ${riskStyles.text}`}
                    >
                      {riskLabel}
                    </span>

                    <span className="text-[9px] text-slate-400">
                      Entity Risk
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
                >
                  <Download size={15} />
                  Export Dossier
                </button>
              </div>
            </div>
          </div>

          {/* Header metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-200">

            <HeaderMeta
              icon={<FileCheck2 size={15} />}
              label="Primary FIR"
              value={entity.primaryFIR}
              link={`/cases/${entity.caseId}`}
            />

            <HeaderMeta
              icon={<Activity size={15} />}
              label="Investigation Status"
              value={entity.status.replaceAll('_', ' ')}
            />

            <HeaderMeta
              icon={<Calendar size={15} />}
              label="Entity Record"
              value="Active Investigation Profile"
            />
          </div>
        </header>

        {/* =====================================================
            TAB NAVIGATION
        ===================================================== */}
        <nav className="bg-white border border-slate-200 rounded-xl shadow-sm p-1.5 flex flex-col sm:flex-row gap-1">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* =====================================================
            DOSSIER TAB
        ===================================================== */}
        {activeTab === 'DOSSIER' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Main Dossier */}
            <section className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm">

              <SectionHeader
                icon={<User size={16} />}
                title="Entity Intelligence Summary"
                description="Identity, role, location and associated identifiers"
                right={getStatusBadge()}
              />

              <div className="p-5 sm:p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  <DataCard
                    icon={<ShieldAlert size={15} />}
                    label="Primary Role"
                    value={entity.role}
                  />

                  <DataCard
                    icon={<FileCheck2 size={15} />}
                    label="Anchor FIR Reference"
                    value={entity.primaryFIR}
                    link={`/cases/${entity.caseId}`}
                  />

                  <DataCard
                    icon={<MapPin size={15} />}
                    label="Registered Physical Address"
                    value={entity.registeredAddress}
                    full
                  />

                  <DataCard
                    icon={<Radio size={15} />}
                    label="Last Known Geolocation"
                    value={entity.lastKnownLocation}
                    full
                    valueClass="text-amber-700"
                  />
                </div>

                {/* Identity credentials */}
                <div className="mt-7">

                  <div className="flex items-center gap-2 mb-3">
                    <Fingerprint
                      size={15}
                      className="text-blue-600"
                    />

                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Secondary Identity Credentials
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {entity.alternateIdentifiers.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-3.5"
                      >
                        <div className="flex items-center gap-2">
                          <KeyRound
                            size={13}
                            className="text-slate-400"
                          />

                          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            {item.label}
                          </span>
                        </div>

                        <span className="block mt-2 text-xs font-mono font-bold text-slate-700 break-all">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Right column */}
            <div className="space-y-6">

              {/* Linked devices */}
              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

                <SectionHeader
                  icon={<Network size={16} />}
                  title="Linked Devices & Accounts"
                  description="Known identifiers connected to this entity"
                />

                <div className="p-4 space-y-2.5">
                  {entity.linkedDevices.map((device) => (
                    <div
                      key={`${device.type}-${device.value}`}
                      className="group rounded-xl border border-slate-200 bg-white p-3 hover:border-blue-200 hover:bg-blue-50/30 transition"
                    >
                      <div className="flex items-start gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500">
                          {device.type === 'Bank Acct' ? (
                            <CreditCard size={15} />
                          ) : (
                            <Smartphone size={15} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="block text-[10px] font-semibold text-slate-500">
                            {device.label}
                          </span>

                          <span className="block mt-0.5 text-xs font-mono font-bold text-slate-800 break-all">
                            {device.value}
                          </span>
                        </div>

                        <span className="shrink-0 rounded-md bg-slate-100 border border-slate-200 px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-slate-500">
                          {device.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Graph shortcut */}
              <section className="bg-slate-900 rounded-2xl p-5 text-white shadow-sm">

                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 border border-white/10">
                    <Network size={18} className="text-blue-300" />
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Network Analysis
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-bold">
                  Syndicate Link Graph
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                  Inspect relationships across calls, devices, accounts,
                  locations and financial trails.
                </p>

                <Link
                  to={`/network?node=${entity.id}`}
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-slate-900 hover:bg-slate-100 transition"
                >
                  <Maximize2 size={14} />
                  Open Graph Visualizer
                  <ArrowUpRight size={13} />
                </Link>
              </section>
            </div>
          </div>
        )}

        {/* =====================================================
            CASES TAB
        ===================================================== */}
        {activeTab === 'CASES' && (
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

            <SectionHeader
              icon={<FileCheck2 size={16} />}
              title="Associated FIR Cases"
              description={`${entity.linkedCases.length} linked investigation records`}
            />

            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {entity.linkedCases.map((caseItem) => (
                  <div
                    key={caseItem.caseId}
                    className="group rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-200 hover:shadow-sm transition"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-[10px] font-bold font-mono text-blue-700">
                        {caseItem.firNo}
                      </span>

                      <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-red-700">
                        {caseItem.role}
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-slate-900">
                      {caseItem.title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">

                      <span className="text-[10px] text-slate-400 font-mono">
                        Case ID: {caseItem.caseId}
                      </span>

                      <Link
                        to={`/cases/${caseItem.caseId}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View case
                        <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            EVIDENCE TAB
        ===================================================== */}
        {activeTab === 'EVIDENCE' && (
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm">

            <SectionHeader
              icon={<Clock3 size={16} />}
              title="Evidence Chain Ingestions"
              description={`${entity.evidenceLog.length} evidence records associated with this entity`}
            />

            <div className="p-5 sm:p-6 space-y-3">

              {entity.evidenceLog.map((log, index) => (
                <div
                  key={log.id}
                  className="relative rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-200 hover:shadow-sm transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
                        <CheckCircle2
                          size={16}
                          className="text-emerald-600"
                        />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold font-mono text-blue-700">
                            {log.id}
                          </span>

                          <span className="text-slate-300">•</span>

                          <span className="text-[10px] font-mono text-slate-400">
                            {log.timestamp}
                          </span>
                        </div>

                        <h4 className="mt-1.5 text-sm font-bold text-slate-800">
                          {log.title}
                        </h4>

                        <span className="mt-1 block text-[10px] text-emerald-600 font-medium">
                          Evidence integrity verified
                        </span>
                      </div>
                    </div>

                    <div className="lg:max-w-[360px]">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                        <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Evidence Hash
                        </span>

                        <span className="block text-[10px] font-mono font-semibold text-slate-600 break-all">
                          {log.hash}
                        </span>
                      </div>
                    </div>

                  </div>

                  {index < entity.evidenceLog.length - 1 && (
                    <div className="hidden lg:block absolute left-[31px] top-[58px] w-px h-5 bg-slate-200" />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* =====================================================
          FOOTER CONTEXT
      ===================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-1 pb-2">
        <span className="text-[10px] text-slate-400">
          Entity record: {entity.id}
        </span>

        <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <Lock size={11} />
          Investigation workspace
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   REUSABLE COMPONENTS
============================================================ */

function SectionHeader({
  icon,
  title,
  description,
  right = null,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-slate-200">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-blue-600">
          {icon}
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900">
            {title}
          </h2>

          {description && (
            <p className="mt-0.5 text-[10px] text-slate-400">
              {description}
            </p>
          )}
        </div>
      </div>

      {right}
    </div>
  );
}

function HeaderMeta({
  icon,
  label,
  value,
  link,
}) {
  const content = (
    <div className="flex items-center gap-2.5">
      <span className="text-slate-400">{icon}</span>

      <div>
        <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>

        <span className="block mt-0.5 text-[11px] font-semibold text-slate-700">
          {value}
        </span>
      </div>
    </div>
  );

  return (
    <div className="px-5 py-3.5 border-r border-slate-200 last:border-r-0">
      {link ? (
        <Link
          to={link}
          className="block hover:bg-slate-50 rounded-lg -m-1 p-1 transition"
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}

function DataCard({
  icon,
  label,
  value,
  link,
  full = false,
  valueClass = 'text-slate-700',
}) {
  const content = (
    <div
      className={`rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 ${
        full ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-slate-400">{icon}</span>

        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>

      <span
        className={`block text-xs font-semibold leading-5 ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );

  if (link) {
    return (
      <Link
        to={link}
        className={`block ${
          full ? 'md:col-span-2' : ''
        } hover:border-blue-200 transition`}
      >
        {content}
      </Link>
    );
  }

  return content;
}