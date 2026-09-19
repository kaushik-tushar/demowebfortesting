import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  ShieldCheck,
  Lock,
  Key,
  Database,
  Bell,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  HardDrive,
  FileCode,
  Smartphone,
  Save,
  Radio,
  Terminal,
  Activity,
  Network,
  Clock3,
  Globe2,
  Fingerprint,
  ChevronRight,
  Info,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('SECURITY');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Security
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('15');
  const [ipWhitelisting, setIpWhitelisting] = useState(true);
  const [securityClearance, setSecurityClearance] =
    useState('TOP_SECRET_LEVEL_3');

  // API / Node
  const [cdrParserNode, setCdrParserNode] = useState(
    'https://node-delhi-04.ncrb.gov.in/api/v2/cdr'
  );

  const [fiuBankingNode, setFiuBankingNode] = useState(
    'https://fiu-gateway.fin.gov.in/v1/ledger'
  );

  const [ledgerAnchorNode, setLedgerAnchorNode] = useState(
    '0x9041...c821b (Mainnet Relay Node 2)'
  );

  const [autoVerifyHash, setAutoVerifyHash] = useState(true);

  // Notifications
  const [notifyHighPriorityCase, setNotifyHighPriorityCase] =
    useState(true);

  const [notifyHashTamperAlert, setNotifyHashTamperAlert] =
    useState(true);

  const [notifyCdrCompletion, setNotifyCdrCompletion] =
    useState(false);

  // Diagnostics
  const [isFlushingCache, setIsFlushingCache] =
    useState(false);

  const [isTestingNodes, setIsTestingNodes] =
    useState(false);

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveSettings = (e) => {
    e?.preventDefault();

    setIsSaving(true);
    setIsSaved(false);

    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);

      showToast(
        'Configuration changes saved to the current workspace.'
      );

      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }, 1200);
  };

  const handleFlushCache = () => {
    setIsFlushingCache(true);

    setTimeout(() => {
      setIsFlushingCache(false);

      showToast(
        'Temporary application cache and session artifacts cleared.'
      );
    }, 1500);
  };

  const handleTestConnections = () => {
    setIsTestingNodes(true);

    setTimeout(() => {
      setIsTestingNodes(false);

      showToast(
        'Configured endpoint connectivity check completed successfully.'
      );
    }, 1800);
  };

  const toggleSetting = (
    setter,
    currentValue,
    enabledMessage,
    disabledMessage
  ) => {
    const nextValue = !currentValue;
    setter(nextValue);

    showToast(
      nextValue
        ? enabledMessage
        : disabledMessage
    );
  };

  const tabs = [
    {
      id: 'SECURITY',
      label: 'Security & Authorization',
      icon: Lock,
    },
    {
      id: 'NODES',
      label: 'API & Node Integration',
      icon: Server,
    },
    {
      id: 'NOTIFICATIONS',
      label: 'Alerts & Notifications',
      icon: Bell,
    },
    {
      id: 'SYSTEM',
      label: 'System & Audit',
      icon: Cpu,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[100] max-w-md">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xl px-4 py-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2
                size={16}
                className="text-emerald-600"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900">
                Settings Updated
              </p>

              <p className="text-xs text-slate-500 mt-0.5 leading-5">
                {toastMessage}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      <main className="max-w-[1500px] mx-auto p-4 md:p-6 space-y-6">
        {/* Page Header */}
        <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
              <SettingsIcon size={15} />
              <span>System Administration</span>

              <ChevronRight size={13} />

              <span className="text-slate-700">
                Settings
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Portal Administration Settings
            </h1>

            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Manage workspace security, connected intelligence
              endpoints, notification preferences, and system
              diagnostics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isSaved && (
              <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <CheckCircle2 size={14} />
                Configuration Saved
              </div>
            )}

            <button
              type="button"
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition disabled:opacity-60 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw
                    size={15}
                    className="animate-spin"
                  />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save All Settings
                </>
              )}
            </button>
          </div>
        </section>

        {/* Environment Status */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatusCard
            icon={ShieldCheck}
            label="Security Posture"
            value="Protected"
            detail="2FA enabled"
            accent="emerald"
          />

          <StatusCard
            icon={Network}
            label="Node Integration"
            value="Configured"
            detail="3 endpoints"
            accent="blue"
          />

          <StatusCard
            icon={Database}
            label="Evidence Integrity"
            value="Enabled"
            detail="Hash verification"
            accent="violet"
          />

          <StatusCard
            icon={Activity}
            label="System Health"
            value="Operational"
            detail="Workspace diagnostics"
            accent="emerald"
          />
        </section>

        {/* Navigation */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-2">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        <form
          onSubmit={handleSaveSettings}
          className="space-y-6"
        >
          {/* =====================================================
              SECURITY
          ====================================================== */}
          {activeTab === 'SECURITY' && (
            <>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {/* Clearance */}
                <SettingsCard
                  icon={ShieldCheck}
                  title="Officer Security Clearance"
                  description="Configure the access tier assigned to the current workspace."
                >
                  <Field label="Assigned Clearance Tier">
                    <select
                      value={securityClearance}
                      onChange={(e) => {
                        setSecurityClearance(e.target.value);

                        showToast(
                          `Clearance tier changed to ${e.target.value}.`
                        );
                      }}
                      className={inputClass}
                    >
                      <option value="TOP_SECRET_LEVEL_3">
                        Level 3 — Top Secret
                      </option>

                      <option value="SECRET_LEVEL_2">
                        Level 2 — Secret
                      </option>

                      <option value="RESTRICTED_LEVEL_1">
                        Level 1 — Restricted
                      </option>
                    </select>

                    <FieldHint>
                      Clearance selection controls the access profile
                      presented by the workspace.
                    </FieldHint>
                  </Field>

                  <Field label="Inactivity Auto-Lock Timeout">
                    <select
                      value={sessionTimeout}
                      onChange={(e) => {
                        setSessionTimeout(e.target.value);

                        showToast(
                          `Session timeout set to ${e.target.value} minutes.`
                        );
                      }}
                      className={inputClass}
                    >
                      <option value="5">
                        5 Minutes — High Security
                      </option>

                      <option value="15">
                        15 Minutes — Recommended
                      </option>

                      <option value="30">
                        30 Minutes
                      </option>

                      <option value="60">
                        60 Minutes
                      </option>
                    </select>
                  </Field>
                </SettingsCard>

                {/* Authentication */}
                <SettingsCard
                  icon={Key}
                  title="Authentication Controls"
                  description="Configure additional login and network access controls."
                >
                  <ToggleRow
                    title="Hardware Token 2FA"
                    description="Require an additional authentication factor during login."
                    checked={twoFactorAuth}
                    onChange={() =>
                      toggleSetting(
                        setTwoFactorAuth,
                        twoFactorAuth,
                        'Two-factor authentication enabled.',
                        'Two-factor authentication disabled.'
                      )
                    }
                  />

                  <ToggleRow
                    title="Intranet IP Allowlisting"
                    description="Restrict workspace access to configured trusted network ranges."
                    checked={ipWhitelisting}
                    onChange={() =>
                      toggleSetting(
                        setIpWhitelisting,
                        ipWhitelisting,
                        'IP allowlisting enabled.',
                        'IP allowlisting disabled.'
                      )
                    }
                  />

                  <InfoBox
                    icon={Info}
                    title="Access control"
                    text="Production deployments should enforce these controls through the backend identity and authorization layer."
                  />
                </SettingsCard>
              </div>

              {/* Security Policy */}
              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <SectionHeader
                  icon={Fingerprint}
                  title="Security Policy Summary"
                  description="Current workspace authentication configuration."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200">
                  <PolicyItem
                    label="Multi-factor authentication"
                    value={twoFactorAuth ? 'Enabled' : 'Disabled'}
                    active={twoFactorAuth}
                  />

                  <PolicyItem
                    label="Session auto-lock"
                    value={`${sessionTimeout} minutes`}
                    active
                  />

                  <PolicyItem
                    label="Network restriction"
                    value={
                      ipWhitelisting
                        ? 'Allowlisted'
                        : 'Open'
                    }
                    active={ipWhitelisting}
                  />
                </div>
              </section>
            </>
          )}

          {/* =====================================================
              NODES
          ====================================================== */}
          {activeTab === 'NODES' && (
            <>
              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <SectionHeader
                  icon={Server}
                  title="API & Node Integration"
                  description="Configure external intelligence and data-processing endpoints."
                  action={
                    <button
                      type="button"
                      onClick={handleTestConnections}
                      disabled={isTestingNodes}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer disabled:opacity-60"
                    >
                      {isTestingNodes ? (
                        <RefreshCw
                          size={13}
                          className="animate-spin"
                        />
                      ) : (
                        <Radio size={13} />
                      )}

                      {isTestingNodes
                        ? 'Testing...'
                        : 'Test Connections'}
                    </button>
                  }
                />

                <div className="p-5 space-y-5">
                  <EndpointField
                    icon={Radio}
                    label="Telecom Tower Dump / CDR Parsing Service"
                    value={cdrParserNode}
                    onChange={setCdrParserNode}
                    status="Configured"
                  />

                  <EndpointField
                    icon={Database}
                    label="Financial Intelligence Banking Feed"
                    value={fiuBankingNode}
                    onChange={setFiuBankingNode}
                    status="Configured"
                  />

                  <EndpointField
                    icon={ShieldCheck}
                    label="Evidence Integrity / Ledger Relay"
                    value={ledgerAnchorNode}
                    onChange={setLedgerAnchorNode}
                    status="Configured"
                  />

                  <ToggleRow
                    title="Automatic Hash Verification"
                    description="Enable application-level verification of evidence hashes during ingestion."
                    checked={autoVerifyHash}
                    onChange={() =>
                      toggleSetting(
                        setAutoVerifyHash,
                        autoVerifyHash,
                        'Automatic hash verification enabled.',
                        'Automatic hash verification disabled.'
                      )
                    }
                  />
                </div>
              </section>

              {/* Endpoint Information */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <EndpointStatus
                  icon={Radio}
                  title="CDR Parser"
                  status="Configured"
                  detail="Telecom processing endpoint"
                />

                <EndpointStatus
                  icon={Database}
                  title="Financial Feed"
                  status="Configured"
                  detail="Financial intelligence endpoint"
                />

                <EndpointStatus
                  icon={ShieldCheck}
                  title="Integrity Relay"
                  status="Configured"
                  detail="Hash / audit integration"
                />
              </section>
            </>
          )}

          {/* =====================================================
              NOTIFICATIONS
          ====================================================== */}
          {activeTab === 'NOTIFICATIONS' && (
            <>
              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <SectionHeader
                  icon={Bell}
                  title="Alerts & Notifications"
                  description="Choose which investigation events should generate workspace notifications."
                />

                <div className="p-5 space-y-3">
                  <ToggleRow
                    title="High Priority Case Activity"
                    description="Notify when new evidence or investigation notes are added to assigned cases."
                    checked={notifyHighPriorityCase}
                    onChange={() =>
                      toggleSetting(
                        setNotifyHighPriorityCase,
                        notifyHighPriorityCase,
                        'High priority case notifications enabled.',
                        'High priority case notifications disabled.'
                      )
                    }
                  />

                  <ToggleRow
                    title="Evidence Integrity Alerts"
                    description="Notify when an evidence hash verification event requires attention."
                    checked={notifyHashTamperAlert}
                    onChange={() =>
                      toggleSetting(
                        setNotifyHashTamperAlert,
                        notifyHashTamperAlert,
                        'Evidence integrity alerts enabled.',
                        'Evidence integrity alerts disabled.'
                      )
                    }
                  />

                  <ToggleRow
                    title="CDR Processing Completion"
                    description="Notify when an automated telecom analysis job completes."
                    checked={notifyCdrCompletion}
                    onChange={() =>
                      toggleSetting(
                        setNotifyCdrCompletion,
                        notifyCdrCompletion,
                        'CDR completion notifications enabled.',
                        'CDR completion notifications disabled.'
                      )
                    }
                  />
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <NotificationStatus
                  title="Case Activity"
                  enabled={notifyHighPriorityCase}
                />

                <NotificationStatus
                  title="Evidence Integrity"
                  enabled={notifyHashTamperAlert}
                />

                <NotificationStatus
                  title="CDR Processing"
                  enabled={notifyCdrCompletion}
                />
              </section>
            </>
          )}

          {/* =====================================================
              SYSTEM
          ====================================================== */}
          {activeTab === 'SYSTEM' && (
            <>
              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <SectionHeader
                  icon={Cpu}
                  title="System Diagnostics"
                  description="Review workspace infrastructure status and maintenance controls."
                  action={
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        OPERATIONAL
                      </span>

                      <button
                        type="button"
                        onClick={handleFlushCache}
                        disabled={isFlushingCache}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 text-xs font-bold transition cursor-pointer disabled:opacity-60"
                      >
                        {isFlushingCache ? (
                          <RefreshCw
                            size={12}
                            className="animate-spin"
                          />
                        ) : (
                          <Terminal size={12} />
                        )}

                        {isFlushingCache
                          ? 'Clearing...'
                          : 'Clear Cache'}
                      </button>
                    </div>
                  }
                />

                <div className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                    <DiagnosticCard
                      icon={Server}
                      label="Active Cluster"
                      value="DELHI-NCRB-NODE-04"
                      detail="Application node"
                    />

                    <DiagnosticCard
                      icon={HardDrive}
                      label="Storage"
                      value="14.2 TB / 50 TB"
                      detail="28.4% utilized"
                    />

                    <DiagnosticCard
                      icon={Activity}
                      label="Application Health"
                      value="100%"
                      detail="Diagnostic status"
                    />

                    <DiagnosticCard
                      icon={Clock3}
                      label="Response Target"
                      value="< 50 ms"
                      detail="Workspace target"
                    />
                  </div>
                </div>
              </section>

              {/* Audit / Runtime */}
              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <SectionHeader
                  icon={FileCode}
                  title="Runtime & Audit Configuration"
                  description="Application-level configuration information."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                  <RuntimeItem
                    label="Audit Logging"
                    value="Enabled"
                    icon={FileCode}
                  />

                  <RuntimeItem
                    label="Application Environment"
                    value="Investigation Workspace"
                    icon={SettingsIcon}
                  />

                  <RuntimeItem
                    label="Evidence Verification"
                    value={
                      autoVerifyHash
                        ? 'Automatic'
                        : 'Manual'
                    }
                    icon={ShieldCheck}
                  />

                  <RuntimeItem
                    label="Notification Engine"
                    value="Configured"
                    icon={Bell}
                  />
                </div>
              </section>

              <InfoBox
                icon={AlertTriangle}
                title="Administrative maintenance"
                text="Cache clearing and diagnostic actions shown here are frontend workspace simulations until connected to the production infrastructure service."
                warning
              />
            </>
          )}

          {/* Save Bar */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <SlidersHorizontal size={14} />

              <span>
                Changes are applied to the current workspace configuration.
              </span>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition disabled:opacity-60 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw
                    size={14}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={14} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-1 pb-4 text-[10px] text-slate-400">
          <span className="font-mono">
            CRIMEGRAPH AI / ADMINISTRATION
          </span>

          <span>
            Configuration interface • Investigation Workspace
          </span>
        </footer>
      </main>
    </div>
  );
}

/* =========================================================
   Reusable Components
========================================================= */

function StatusCard({
  icon: Icon,
  label,
  value,
  detail,
  accent = 'slate',
}) {
  const styles = {
    slate: 'bg-slate-100 text-slate-700',
    blue: 'bg-blue-50 text-blue-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    violet: 'bg-violet-50 text-violet-700',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            styles[accent] || styles.slate
          }`}
        >
          <Icon size={17} />
        </div>

        <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
          System
        </span>
      </div>

      <p className="text-[11px] font-semibold text-slate-500 mt-4">
        {label}
      </p>

      <p className="text-sm font-bold text-slate-900 mt-0.5">
        {value}
      </p>

      <p className="text-[10px] text-slate-400 mt-1">
        {detail}
      </p>
    </div>
  );
}

function SettingsCard({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <Icon
              size={17}
              className="text-slate-700"
            />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {title}
            </h2>

            <p className="text-[11px] text-slate-500 mt-1 leading-5">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {children}
      </div>
    </section>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
          <Icon
            size={17}
            className="text-slate-700"
          />
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900">
            {title}
          </h2>

          <p className="text-[11px] text-slate-500 mt-1">
            {description}
          </p>
        </div>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
        {label}
      </label>

      {children}
    </div>
  );
}

function FieldHint({ children }) {
  return (
    <p className="text-[10px] text-slate-400 mt-1.5 leading-4">
      {children}
    </p>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="w-full flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition text-left cursor-pointer"
    >
      <div className="min-w-0">
        <span className="text-xs font-bold text-slate-800 block">
          {title}
        </span>

        <span className="text-[10px] text-slate-500 block mt-1 leading-4">
          {description}
        </span>
      </div>

      <span
        className={`relative shrink-0 w-10 h-5.5 rounded-full transition ${
          checked
            ? 'bg-blue-700'
            : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition ${
            checked
              ? 'left-[21px]'
              : 'left-0.5'
          }`}
        />
      </span>
    </button>
  );
}

function InfoBox({
  icon: Icon,
  title,
  text,
  warning = false,
}) {
  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${
        warning
          ? 'bg-amber-50 border-amber-200'
          : 'bg-blue-50 border-blue-100'
      }`}
    >
      <Icon
        size={16}
        className={`mt-0.5 shrink-0 ${
          warning
            ? 'text-amber-700'
            : 'text-blue-700'
        }`}
      />

      <div>
        <p
          className={`text-xs font-bold ${
            warning
              ? 'text-amber-900'
              : 'text-blue-900'
          }`}
        >
          {title}
        </p>

        <p
          className={`text-[10px] mt-1 leading-5 ${
            warning
              ? 'text-amber-800/80'
              : 'text-blue-800/80'
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

function PolicyItem({
  label,
  value,
  active,
}) {
  return (
    <div className="bg-white p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="flex items-center gap-2 mt-2">
        <span
          className={`w-2 h-2 rounded-full ${
            active
              ? 'bg-emerald-500'
              : 'bg-slate-300'
          }`}
        />

        <span className="text-xs font-bold text-slate-800">
          {value}
        </span>
      </div>
    </div>
  );
}

function EndpointField({
  icon: Icon,
  label,
  value,
  onChange,
  status,
}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
        <label className="text-[11px] font-bold text-slate-600">
          {label}
        </label>

        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {status}
        </span>
      </div>

      <div className="relative">
        <Icon
          size={14}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="text"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>
    </div>
  );
}

function EndpointStatus({
  icon: Icon,
  title,
  status,
  detail,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
          <Icon
            size={15}
            className="text-slate-700"
          />
        </div>

        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {status}
        </span>
      </div>

      <p className="text-xs font-bold text-slate-800 mt-3">
        {title}
      </p>

      <p className="text-[10px] text-slate-400 mt-1">
        {detail}
      </p>
    </div>
  );
}

function NotificationStatus({
  title,
  enabled,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Bell
          size={14}
          className={
            enabled
              ? 'text-blue-700'
              : 'text-slate-400'
          }
        />

        <span className="text-xs font-bold text-slate-800">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span
          className={`w-2 h-2 rounded-full ${
            enabled
              ? 'bg-emerald-500'
              : 'bg-slate-300'
          }`}
        />

        <span className="text-[10px] font-semibold text-slate-500">
          {enabled ? 'Notifications enabled' : 'Notifications disabled'}
        </span>
      </div>
    </div>
  );
}

function DiagnosticCard({
  icon: Icon,
  label,
  value,
  detail,
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
      <div className="flex items-center gap-2">
        <Icon
          size={15}
          className="text-slate-500"
        />

        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          {label}
        </span>
      </div>

      <p className="text-sm font-bold text-slate-800 font-mono mt-3">
        {value}
      </p>

      <p className="text-[10px] text-slate-400 mt-1">
        {detail}
      </p>
    </div>
  );
}

function RuntimeItem({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
          <Icon
            size={14}
            className="text-slate-600"
          />
        </div>

        <span className="text-xs font-semibold text-slate-600">
          {label}
        </span>
      </div>

      <span className="text-xs font-bold text-slate-900">
        {value}
      </span>
    </div>
  );
}

const inputClass =
  'w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer';