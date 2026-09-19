import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Clock3,
  Filter,
  MapPin,
  Phone,
  PhoneCall,
  PhoneMissed,
  Plus,
  Radio,
  RotateCcw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

const INITIAL_CDR_RECORDS = [
  {
    id: "CDR-101",
    caller: "+91-98765-43210",
    recipient: "+91-91234-56789",
    type: "Outgoing",
    duration: "04m 12s",
    timestamp: "2026-06-06 14:32:10",
    towerId: "TOWER-IND-402",
    location: "Vijayawada Central",
  },
  {
    id: "CDR-102",
    caller: "+91-91234-56789",
    recipient: "+91-98765-43210",
    type: "Incoming",
    duration: "01m 45s",
    timestamp: "2026-06-06 14:40:05",
    towerId: "TOWER-IND-405",
    location: "Vijayawada North",
  },
  {
    id: "CDR-103",
    caller: "+91-88888-11111",
    recipient: "+91-98765-43210",
    type: "Missed",
    duration: "00m 00s",
    timestamp: "2026-06-06 16:15:22",
    towerId: "TOWER-GNT-101",
    location: "Guntur Highway",
  },
  {
    id: "CDR-104",
    caller: "+91-98765-43210",
    recipient: "+91-77777-22222",
    type: "Outgoing",
    duration: "12m 30s",
    timestamp: "2026-06-07 09:11:40",
    towerId: "TOWER-TRP-303",
    location: "Tirupati Junction",
  },
  {
    id: "CDR-105",
    caller: "+91-55555-44444",
    recipient: "+91-91234-56789",
    type: "Outgoing",
    duration: "03m 55s",
    timestamp: "2026-06-07 11:20:15",
    towerId: "TOWER-IND-402",
    location: "Vijayawada Central",
  },
];

const getTypeConfig = (type) => {
  switch (type) {
    case "Incoming":
      return {
        icon: ArrowDownLeft,
        badge:
          "bg-emerald-50 text-emerald-700 border-emerald-200",
        iconBg: "bg-emerald-100 text-emerald-700",
      };

    case "Outgoing":
      return {
        icon: ArrowUpRight,
        badge: "bg-blue-50 text-blue-700 border-blue-200",
        iconBg: "bg-blue-100 text-blue-700",
      };

    case "Missed":
      return {
        icon: PhoneMissed,
        badge: "bg-red-50 text-red-700 border-red-200",
        iconBg: "bg-red-100 text-red-700",
      };

    default:
      return {
        icon: PhoneCall,
        badge: "bg-slate-50 text-slate-700 border-slate-200",
        iconBg: "bg-slate-100 text-slate-700",
      };
  }
};

const getCurrentTimestamp = () => {
  const now = new Date();

  const pad = (value) => String(value).padStart(2, "0");

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
    now.getSeconds()
  )}`;
};

export default function CdrAnalysis() {
  const [cdrRecords, setCdrRecords] = useState(INITIAL_CDR_RECORDS);

  // Filters
  const [globalSearch, setGlobalSearch] = useState("");
  const [filterCaller, setFilterCaller] = useState("");
  const [filterRecipient, setFilterRecipient] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterTower, setFilterTower] = useState("");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toast
  const [notification, setNotification] = useState("");

  // New CDR
  const [newCaller, setNewCaller] = useState("");
  const [newRecipient, setNewRecipient] = useState("");
  const [newType, setNewType] = useState("Outgoing");
  const [newDuration, setNewDuration] = useState("02m 00s");
  const [newTower, setNewTower] = useState("TOWER-IND-001");
  const [newLocation, setNewLocation] = useState("Indore HQ");

  const showToast = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const filteredRecords = useMemo(() => {
    const search = globalSearch.trim().toLowerCase();
    const callerSearch = filterCaller.trim().toLowerCase();
    const recipientSearch = filterRecipient.trim().toLowerCase();
    const towerSearch = filterTower.trim().toLowerCase();

    return cdrRecords.filter((record) => {
      const matchesGlobal =
        !search ||
        record.id.toLowerCase().includes(search) ||
        record.caller.toLowerCase().includes(search) ||
        record.recipient.toLowerCase().includes(search) ||
        record.type.toLowerCase().includes(search) ||
        record.towerId.toLowerCase().includes(search) ||
        record.location.toLowerCase().includes(search);

      const matchesCaller =
        !callerSearch ||
        record.caller.toLowerCase().includes(callerSearch);

      const matchesRecipient =
        !recipientSearch ||
        record.recipient.toLowerCase().includes(recipientSearch);

      const matchesType =
        filterType === "All" || record.type === filterType;

      const matchesTower =
        !towerSearch ||
        record.towerId.toLowerCase().includes(towerSearch);

      return (
        matchesGlobal &&
        matchesCaller &&
        matchesRecipient &&
        matchesType &&
        matchesTower
      );
    });
  }, [
    cdrRecords,
    globalSearch,
    filterCaller,
    filterRecipient,
    filterType,
    filterTower,
  ]);

  const outgoingCount = cdrRecords.filter(
    (record) => record.type === "Outgoing"
  ).length;

  const incomingCount = cdrRecords.filter(
    (record) => record.type === "Incoming"
  ).length;

  const uniqueTowers = new Set(
    cdrRecords.map((record) => record.towerId)
  ).size;

  const resetFilters = () => {
    setGlobalSearch("");
    setFilterCaller("");
    setFilterRecipient("");
    setFilterType("All");
    setFilterTower("");
  };

  const handleCreateCdr = (event) => {
    event.preventDefault();

    if (!newCaller.trim() || !newRecipient.trim()) {
      showToast("Caller and recipient numbers are required.");
      return;
    }

    const numericIds = cdrRecords
      .map((record) => Number(record.id.replace("CDR-", "")))
      .filter((number) => !Number.isNaN(number));

    const nextId =
      numericIds.length > 0 ? Math.max(...numericIds) + 1 : 101;

    const newRecord = {
      id: `CDR-${nextId}`,
      caller: newCaller.trim(),
      recipient: newRecipient.trim(),
      type: newType,
      duration: newDuration.trim() || "00m 00s",
      timestamp: getCurrentTimestamp(),
      towerId: newTower.trim() || "TOWER-UNKNOWN",
      location: newLocation.trim() || "Unknown Location",
    };

    setCdrRecords((previous) => [newRecord, ...previous]);

    setNewCaller("");
    setNewRecipient("");
    setNewType("Outgoing");
    setNewDuration("02m 00s");
    setNewTower("TOWER-IND-001");
    setNewLocation("Indore HQ");

    setIsModalOpen(false);

    showToast(`${newRecord.id} successfully added to CDR records.`);
  };

  const handleDeleteRecord = (id) => {
    setCdrRecords((previous) =>
      previous.filter((record) => record.id !== id)
    );

    showToast(`${id} removed from the current workspace.`);
  };

  const hasActiveFilters =
    globalSearch ||
    filterCaller ||
    filterRecipient ||
    filterType !== "All" ||
    filterTower;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans text-sm">
      {/* =========================================================
          HEADER
      ========================================================== */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex min-h-[68px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Radio size={20} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                  CDR Analysis
                </h1>

                <span className="hidden rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700 sm:inline-flex">
                  Telephony Intelligence
                </span>
              </div>

              <p className="mt-0.5 truncate text-xs text-slate-500">
                Call detail records and telephony relationship analysis
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-4"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add CDR Log</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================== */}
      <main className="mx-auto w-full max-w-[1800px] space-y-5 p-4 sm:p-6 lg:p-8">
        {/* Page intro */}
        <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
              <span>CrimeGraph AI</span>
              <span>/</span>
              <span>Investigations</span>
              <span>/</span>
              <span className="text-slate-700">CDR Analysis</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Call Detail Records
            </h2>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Search, filter, and review telephony records across callers,
              recipients, towers, and locations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm lg:self-auto">
            <Activity size={15} className="text-emerald-600" />
            <span>Analysis workspace</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
        </section>

        {/* =========================================================
            STAT CARDS
        ========================================================== */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Total Logs
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {cdrRecords.length}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Phone size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Filtered Results
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {filteredRecords.length}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Filter size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Outgoing Calls
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {outgoingCount}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Unique Towers
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {uniqueTowers}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Radio size={18} />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            FILTER PANEL
        ========================================================== */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Filter size={16} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Search & Filters
                </h3>
                <p className="text-[11px] text-slate-500">
                  Narrow records using multiple fields
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              className="inline-flex items-center gap-1.5 self-start text-xs font-medium text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-300 sm:self-auto"
            >
              <RotateCcw size={13} />
              Reset filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Global */}
            <div className="lg:col-span-1">
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Global Search
              </label>

              <div className="relative">
                <Search
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Search all fields..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Caller */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Caller Number
              </label>

              <input
                type="text"
                value={filterCaller}
                onChange={(e) => setFilterCaller(e.target.value)}
                placeholder="+91-..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Recipient */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Recipient Number
              </label>

              <input
                type="text"
                value={filterRecipient}
                onChange={(e) => setFilterRecipient(e.target.value)}
                placeholder="+91-..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Type */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Call Type
              </label>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Types</option>
                <option value="Incoming">Incoming</option>
                <option value="Outgoing">Outgoing</option>
                <option value="Missed">Missed</option>
              </select>
            </div>

            {/* Tower */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Tower ID
              </label>

              <input
                type="text"
                value={filterTower}
                onChange={(e) => setFilterTower(e.target.value)}
                placeholder="TOWER-..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5">
              <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {filteredRecords.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-800">
                  {cdrRecords.length}
                </span>{" "}
                records
              </p>
            </div>
          )}
        </section>

        {/* =========================================================
            CDR TABLE
        ========================================================== */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                CDR Records
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                Detailed call activity and tower association
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Users size={14} />
              <span>{incomingCount} incoming</span>
              <span className="text-slate-300">•</span>
              <span>{outgoingCount} outgoing</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Log ID
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Caller
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Recipient
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Type
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Duration
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Timestamp
                  </th>

                  <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Tower / Location
                  </th>

                  <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((record) => {
                  const config = getTypeConfig(record.type);
                  const TypeIcon = config.icon;

                  return (
                    <tr
                      key={record.id}
                      className="group transition hover:bg-slate-50"
                    >
                      {/* ID */}
                      <td className="px-4 py-4">
                        <span className="font-mono text-xs font-semibold text-blue-600">
                          {record.id}
                        </span>
                      </td>

                      {/* Caller */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                            <Phone size={13} />
                          </div>

                          <span className="font-mono text-xs font-medium text-slate-800">
                            {record.caller}
                          </span>
                        </div>
                      </td>

                      {/* Recipient */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                            <PhoneCall size={13} />
                          </div>

                          <span className="font-mono text-xs font-medium text-slate-800">
                            {record.recipient}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${config.badge}`}
                        >
                          <TypeIcon size={12} />
                          {record.type}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                          <Clock3 size={14} className="text-slate-400" />
                          {record.duration}
                        </div>
                      </td>

                      {/* Timestamp */}
                      <td className="px-4 py-4">
                        <span className="font-mono text-[11px] text-slate-500">
                          {record.timestamp}
                        </span>
                      </td>

                      {/* Tower */}
                      <td className="px-4 py-4">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                            <MapPin size={13} />
                          </div>

                          <div>
                            <div className="font-mono text-xs font-semibold text-slate-800">
                              {record.towerId}
                            </div>

                            <div className="mt-0.5 text-[11px] text-slate-500">
                              {record.location}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteRecord(record.id)}
                          title={`Delete ${record.id}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <Search size={20} />
                        </div>

                        <h4 className="mt-4 text-sm font-semibold text-slate-800">
                          No CDR records found
                        </h4>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          No records match the current search and filter
                          parameters.
                        </p>

                        <button
                          type="button"
                          onClick={resetFilters}
                          className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Displaying{" "}
              <strong className="font-semibold text-slate-700">
                {filteredRecords.length}
              </strong>{" "}
              record{filteredRecords.length !== 1 ? "s" : ""}
            </span>

            <span className="font-mono text-[10px] text-slate-400">
              CDR WORKSPACE
            </span>
          </div>
        </section>
      </main>

      {/* =========================================================
          ADD CDR MODAL
      ========================================================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <PhoneCall size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Add CDR Record
                  </h3>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Create a new call detail record
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                <X size={17} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateCdr}>
              <div className="space-y-4 p-5">
                {/* Caller */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Caller Number
                  </label>

                  <input
                    type="text"
                    required
                    value={newCaller}
                    onChange={(e) => setNewCaller(e.target.value)}
                    placeholder="+91-98765-XXXXX"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Recipient */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Recipient Number
                  </label>

                  <input
                    type="text"
                    required
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    placeholder="+91-91234-XXXXX"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Type + Duration */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Call Type
                    </label>

                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Incoming">Incoming</option>
                      <option value="Outgoing">Outgoing</option>
                      <option value="Missed">Missed</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Duration
                    </label>

                    <input
                      type="text"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      placeholder="02m 30s"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Tower + Location */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Tower ID
                    </label>

                    <input
                      type="text"
                      value={newTower}
                      onChange={(e) => setNewTower(e.target.value)}
                      placeholder="TOWER-IND-001"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Location
                    </label>

                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="Location node"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5">
                  <p className="text-[11px] leading-5 text-blue-700">
                    The record will be added to the current CDR workspace with
                    an automatically generated Log ID and timestamp.
                  </p>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Plus size={14} />
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          TOAST
      ========================================================== */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-[60] flex max-w-sm items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Activity size={14} />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-900">
              CDR Workspace
            </p>

            <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
              {notification}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotification("")}
            className="ml-2 text-slate-400 hover:text-slate-600"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}