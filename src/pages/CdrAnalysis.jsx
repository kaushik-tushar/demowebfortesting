import React, { useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Clock3,
  Download,
  FileSpreadsheet,
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
  Upload,
  Users,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";

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
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
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

/* -------------------------------------------------------
   Normalize Excel column names
------------------------------------------------------- */
const normalizeKey = (key) => {
  return String(key || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
};

/* -------------------------------------------------------
   Get value from Excel row using multiple possible headers
------------------------------------------------------- */
const getExcelValue = (row, possibleKeys) => {
  const normalizedRow = {};

  Object.keys(row).forEach((key) => {
    normalizedRow[normalizeKey(key)] = row[key];
  });

  for (const key of possibleKeys) {
    const value = normalizedRow[normalizeKey(key)];

    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }

  return "";
};

/* -------------------------------------------------------
   Format Excel date values
------------------------------------------------------- */
const normalizeTimestamp = (value) => {
  if (!value) {
    return getCurrentTimestamp();
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const pad = (n) => String(n).padStart(2, "0");

    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(
      value.getDate()
    )} ${pad(value.getHours())}:${pad(value.getMinutes())}:${pad(
      value.getSeconds()
    )}`;
  }

  if (typeof value === "number") {
    try {
      const date = XLSX.SSF.parse_date_code(value);

      if (date) {
        const pad = (n) => String(n).padStart(2, "0");

        return `${date.y}-${pad(date.m)}-${pad(date.d)} ${pad(
          date.H || 0
        )}:${pad(date.M || 0)}:${pad(date.S || 0)}`;
      }
    } catch {
      // fallback below
    }
  }

  return String(value).trim();
};

/* -------------------------------------------------------
   Normalize call type
------------------------------------------------------- */
const normalizeCallType = (value) => {
  const type = String(value || "")
    .trim()
    .toLowerCase();

  if (
    type.includes("incoming") ||
    type === "in" ||
    type === "received" ||
    type === "receive"
  ) {
    return "Incoming";
  }

  if (
    type.includes("missed") ||
    type === "miss" ||
    type === "no answer"
  ) {
    return "Missed";
  }

  return "Outgoing";
};

/* -------------------------------------------------------
   Generate next CDR ID
------------------------------------------------------- */
const getNextCdrId = (records, usedIds = []) => {
  const numericIds = [
    ...records.map((record) =>
      Number(String(record.id || "").replace("CDR-", ""))
    ),
    ...usedIds.map((id) =>
      Number(String(id || "").replace("CDR-", ""))
    ),
  ].filter((number) => !Number.isNaN(number));

  const nextNumber =
    numericIds.length > 0 ? Math.max(...numericIds) + 1 : 101;

  return `CDR-${nextNumber}`;
};

/* -------------------------------------------------------
   Excel template download
------------------------------------------------------- */
const downloadCdrTemplate = () => {
  const rows = [
    {
      "Log ID": "CDR-201",
      Caller: "+91-98765-11111",
      Recipient: "+91-91234-22222",
      Type: "Outgoing",
      Duration: "05m 20s",
      Timestamp: "2026-06-08 10:30:00",
      "Tower ID": "TOWER-IND-001",
      Location: "Indore HQ",
    },
    {
      "Log ID": "CDR-202",
      Caller: "+91-98765-33333",
      Recipient: "+91-91234-44444",
      Type: "Incoming",
      Duration: "02m 15s",
      Timestamp: "2026-06-08 11:45:00",
      "Tower ID": "TOWER-IND-002",
      Location: "Indore Central",
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(rows);

  worksheet["!cols"] = [
    { wch: 14 },
    { wch: 20 },
    { wch: 20 },
    { wch: 14 },
    { wch: 14 },
    { wch: 23 },
    { wch: 20 },
    { wch: 25 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "CDR Records");

  XLSX.writeFile(workbook, "CrimeGraph_CDR_Template.xlsx");
};

/* -------------------------------------------------------
   Export currently filtered records
------------------------------------------------------- */
const exportCdrRecords = (records) => {
  if (!records.length) {
    return false;
  }

  const exportRows = records.map((record) => ({
    "Log ID": record.id,
    Caller: record.caller,
    Recipient: record.recipient,
    Type: record.type,
    Duration: record.duration,
    Timestamp: record.timestamp,
    "Tower ID": record.towerId,
    Location: record.location,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportRows);

  worksheet["!cols"] = [
    { wch: 14 },
    { wch: 20 },
    { wch: 20 },
    { wch: 14 },
    { wch: 14 },
    { wch: 23 },
    { wch: 20 },
    { wch: 25 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "CDR Records");

  XLSX.writeFile(workbook, "CrimeGraph_CDR_Records.xlsx");

  return true;
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

  // Import modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importFileName, setImportFileName] = useState("");

  // Toast
  const [notification, setNotification] = useState("");

  // New CDR
  const [newCaller, setNewCaller] = useState("");
  const [newRecipient, setNewRecipient] = useState("");
  const [newType, setNewType] = useState("Outgoing");
  const [newDuration, setNewDuration] = useState("02m 00s");
  const [newTower, setNewTower] = useState("TOWER-IND-001");
  const [newLocation, setNewLocation] = useState("Indore HQ");

  const fileInputRef = useRef(null);

  const showToast = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 3500);
  };

  /* -------------------------------------------------------
     Filter records
  ------------------------------------------------------- */
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

  const missedCount = cdrRecords.filter(
    (record) => record.type === "Missed"
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

  /* -------------------------------------------------------
     Create manual CDR
  ------------------------------------------------------- */
  const handleCreateCdr = (event) => {
    event.preventDefault();

    if (!newCaller.trim() || !newRecipient.trim()) {
      showToast("Caller and recipient numbers are required.");
      return;
    }

    const newRecord = {
      id: getNextCdrId(cdrRecords),
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

  /* -------------------------------------------------------
     Delete
  ------------------------------------------------------- */
  const handleDeleteRecord = (id) => {
    const confirmed = window.confirm(
      `Delete ${id} from the current CDR workspace?`
    );

    if (!confirmed) return;

    setCdrRecords((previous) =>
      previous.filter((record) => record.id !== id)
    );

    showToast(`${id} removed from the current workspace.`);
  };

  /* -------------------------------------------------------
     Open import picker
  ------------------------------------------------------- */
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  /* -------------------------------------------------------
     Import Excel / CSV
  ------------------------------------------------------- */
  const handleFileImport = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImportFileName(file.name);
    setIsImporting(true);

    try {
      const allowedExtensions = [".xlsx", ".xls", ".csv"];
      const extension = file.name
        .toLowerCase()
        .slice(file.name.lastIndexOf("."));

      if (!allowedExtensions.includes(extension)) {
        throw new Error(
          "Unsupported file. Please upload XLSX, XLS, or CSV."
        );
      }

      const buffer = await file.arrayBuffer();

      const workbook = XLSX.read(buffer, {
        type: "array",
        cellDates: true,
      });

      if (!workbook.SheetNames.length) {
        throw new Error("The uploaded file does not contain a worksheet.");
      }

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
        raw: true,
      });

      if (!rows.length) {
        throw new Error("The uploaded worksheet is empty.");
      }

      const importedRecords = [];
      const existingKeys = new Set(
        cdrRecords.map(
          (record) =>
            `${record.caller}|${record.recipient}|${record.timestamp}`
        )
      );

      let duplicateCount = 0;

      for (const row of rows) {
        const caller = String(
          getExcelValue(row, [
            "Caller",
            "Caller Number",
            "CallerNumber",
            "Calling Number",
            "A Number",
            "A-Number",
            "A",
          ])
        ).trim();

        const recipient = String(
          getExcelValue(row, [
            "Recipient",
            "Recipient Number",
            "RecipientNumber",
            "Receiver",
            "Receiver Number",
            "Called Number",
            "B Number",
            "B-Number",
            "B",
          ])
        ).trim();

        if (!caller || !recipient) {
          continue;
        }

        const type = normalizeCallType(
          getExcelValue(row, [
            "Type",
            "Call Type",
            "CallType",
            "Direction",
            "Call Direction",
          ])
        );

        const durationValue = getExcelValue(row, [
          "Duration",
          "Call Duration",
          "CallDuration",
        ]);

        const timestampValue = getExcelValue(row, [
          "Timestamp",
          "Date Time",
          "DateTime",
          "Date",
          "Time",
          "Call Date",
          "Call Time",
        ]);

        const towerId = String(
          getExcelValue(row, [
            "Tower ID",
            "TowerID",
            "Tower",
            "Cell ID",
            "CellID",
            "Cell Tower",
          ])
        ).trim();

        const location = String(
          getExcelValue(row, [
            "Location",
            "Tower Location",
            "Site",
            "Site Location",
          ])
        ).trim();

        const timestamp = normalizeTimestamp(timestampValue);

        const duplicateKey = `${caller}|${recipient}|${timestamp}`;

        if (existingKeys.has(duplicateKey)) {
          duplicateCount += 1;
          continue;
        }

        existingKeys.add(duplicateKey);

        importedRecords.push({
          id: "",
          caller,
          recipient,
          type,
          duration: String(durationValue || "00m 00s").trim(),
          timestamp,
          towerId: towerId || "TOWER-UNKNOWN",
          location: location || "Unknown Location",
        });
      }

      if (!importedRecords.length) {
        throw new Error(
          "No valid CDR rows found. Check the column names and data."
        );
      }

      let nextRecords = [...cdrRecords];
      const generatedIds = [];

      const finalizedRecords = importedRecords.map((record) => {
        const id = getNextCdrId(nextRecords, generatedIds);

        generatedIds.push(id);

        return {
          ...record,
          id,
        };
      });

      nextRecords = [...finalizedRecords, ...nextRecords];

      setCdrRecords(nextRecords);

      setIsImportModalOpen(false);

      const duplicateMessage =
        duplicateCount > 0
          ? ` ${duplicateCount} duplicate row${
              duplicateCount !== 1 ? "s" : ""
            } skipped.`
          : "";

      showToast(
        `${finalizedRecords.length} CDR record${
          finalizedRecords.length !== 1 ? "s" : ""
        } imported successfully.${duplicateMessage}`
      );
    } catch (error) {
      console.error("CDR import error:", error);

      showToast(
        error?.message ||
          "Unable to import the selected CDR file."
      );
    } finally {
      setIsImporting(false);
      setImportFileName("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  /* -------------------------------------------------------
     Export current filtered data
  ------------------------------------------------------- */
  const handleExport = () => {
    const success = exportCdrRecords(filteredRecords);

    if (!success) {
      showToast("There are no CDR records available to export.");
      return;
    }

    showToast(
      `${filteredRecords.length} CDR record${
        filteredRecords.length !== 1 ? "s" : ""
      } exported to Excel.`
    );
  };

  const hasActiveFilters =
    globalSearch ||
    filterCaller ||
    filterRecipient ||
    filterType !== "All" ||
    filterTower;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-sm text-slate-800">
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

          <div className="flex items-center gap-2">
            {/* Import */}
            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-4"
            >
              <Upload size={15} />
              <span className="hidden sm:inline">
                Import CDR
              </span>
              <span className="sm:hidden">Import</span>
            </button>

            {/* Add */}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-4"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">
                Add CDR Log
              </span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN
      ========================================================== */}
      <main className="mx-auto w-full max-w-[1800px] space-y-5 p-4 sm:p-6 lg:p-8">
        {/* Intro */}
        <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
              <span>CrimeGraph AI</span>
              <span>/</span>
              <span>Investigations</span>
              <span>/</span>
              <span className="text-slate-700">
                CDR Analysis
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Call Detail Records
            </h2>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Search, filter, import, and review telephony records
              across callers, recipients, towers, and locations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm lg:self-auto">
            <Activity
              size={15}
              className="text-emerald-600"
            />
            <span>Analysis workspace</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
        </section>

        {/* =========================================================
            STAT CARDS
        ========================================================== */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Total Logs
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {cdrRecords.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Filtered Results
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {filteredRecords.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Outgoing Calls
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {outgoingCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Incoming Calls
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {incomingCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Unique Towers
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {uniqueTowers}
            </p>
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
            <div>
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
                  onChange={(e) =>
                    setGlobalSearch(e.target.value)
                  }
                  placeholder="Search all fields..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Caller Number
              </label>

              <input
                type="text"
                value={filterCaller}
                onChange={(e) =>
                  setFilterCaller(e.target.value)
                }
                placeholder="+91-..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Recipient Number
              </label>

              <input
                type="text"
                value={filterRecipient}
                onChange={(e) =>
                  setFilterRecipient(e.target.value)
                }
                placeholder="+91-..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Call Type
              </label>

              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Types</option>
                <option value="Incoming">Incoming</option>
                <option value="Outgoing">Outgoing</option>
                <option value="Missed">Missed</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Tower ID
              </label>

              <input
                type="text"
                value={filterTower}
                onChange={(e) =>
                  setFilterTower(e.target.value)
                }
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
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                CDR Records
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                Detailed call activity and tower association
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleExport}
                disabled={!filteredRecords.length}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Download size={14} />
                Export Excel
              </button>

              <div className="hidden items-center gap-2 text-xs text-slate-500 xl:flex">
                <Users size={14} />
                <span>{incomingCount} incoming</span>
                <span className="text-slate-300">•</span>
                <span>{outgoingCount} outgoing</span>
                <span className="text-slate-300">•</span>
                <span>{missedCount} missed</span>
              </div>
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
                      <td className="px-4 py-4">
                        <span className="font-mono text-xs font-semibold text-blue-600">
                          {record.id}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-md ${config.iconBg}`}
                          >
                            <Phone size={13} />
                          </div>

                          <span className="font-mono text-xs font-medium text-slate-800">
                            {record.caller}
                          </span>
                        </div>
                      </td>

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

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${config.badge}`}
                        >
                          <TypeIcon size={12} />
                          {record.type}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                          <Clock3
                            size={14}
                            className="text-slate-400"
                          />
                          {record.duration}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="font-mono text-[11px] text-slate-500">
                          {record.timestamp}
                        </span>
                      </td>

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

                      <td className="px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteRecord(record.id)
                          }
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
                          No records match the current search and
                          filter parameters.
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

          <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Displaying{" "}
              <strong className="font-semibold text-slate-700">
                {filteredRecords.length}
              </strong>{" "}
              record
              {filteredRecords.length !== 1 ? "s" : ""}
            </span>

            <span className="font-mono text-[10px] text-slate-400">
              CDR WORKSPACE
            </span>
          </div>
        </section>
      </main>

      {/* =========================================================
          IMPORT MODAL
      ========================================================== */}
      {isImportModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              if (!isImporting) {
                setIsImportModalOpen(false);
              }
            }
          }}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <FileSpreadsheet size={18} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Import CDR Data
                  </h3>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Upload an Excel or CSV file containing call records
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={isImporting}
                onClick={() => setIsImportModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
                aria-label="Close import modal"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileImport}
                className="hidden"
              />

              {/* Upload area */}
              <button
                type="button"
                disabled={isImporting}
                onClick={openFilePicker}
                className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center transition hover:border-blue-300 hover:bg-blue-50/40 disabled:cursor-wait disabled:opacity-60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200">
                  {isImporting ? (
                    <Activity
                      size={22}
                      className="animate-pulse"
                    />
                  ) : (
                    <Upload size={22} />
                  )}
                </div>

                <h4 className="mt-4 text-sm font-semibold text-slate-900">
                  {isImporting
                    ? "Processing CDR file..."
                    : "Choose CDR file"}
                </h4>

                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                  Supported formats: XLSX, XLS and CSV. The first
                  worksheet will be imported.
                </p>

                {importFileName && (
                  <span className="mt-3 rounded-md bg-white px-3 py-1.5 font-mono text-[11px] text-slate-600 ring-1 ring-slate-200">
                    {importFileName}
                  </span>
                )}
              </button>

              {/* Supported columns */}
              <div className="rounded-lg border border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-4 py-3">
                  <p className="text-xs font-semibold text-slate-800">
                    Supported columns
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-3 text-[11px] sm:grid-cols-4">
                  <span className="text-slate-500">
                    Caller
                  </span>

                  <span className="text-slate-500">
                    Recipient
                  </span>

                  <span className="text-slate-500">
                    Type
                  </span>

                  <span className="text-slate-500">
                    Duration
                  </span>

                  <span className="text-slate-500">
                    Timestamp
                  </span>

                  <span className="text-slate-500">
                    Tower ID
                  </span>

                  <span className="text-slate-500">
                    Location
                  </span>

                  <span className="font-medium text-blue-600">
                    Log ID optional
                  </span>
                </div>
              </div>

              {/* Import behavior */}
              <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="text-[11px] leading-5 text-blue-700">
                  Log IDs are generated automatically if they are
                  missing. Existing records with the same caller,
                  recipient, and timestamp are skipped as duplicates.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={downloadCdrTemplate}
                disabled={isImporting}
                className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 transition hover:text-blue-700 disabled:opacity-40"
              >
                <Download size={14} />
                Download Excel Template
              </button>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  disabled={isImporting}
                  onClick={() => setIsImportModalOpen(false)}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isImporting}
                  onClick={openFilePicker}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-50"
                >
                  <Upload size={14} />
                  Select File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

            <form onSubmit={handleCreateCdr}>
              <div className="space-y-4 p-5">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Caller Number
                  </label>

                  <input
                    type="text"
                    required
                    value={newCaller}
                    onChange={(e) =>
                      setNewCaller(e.target.value)
                    }
                    placeholder="+91-98765-XXXXX"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                    Recipient Number
                  </label>

                  <input
                    type="text"
                    required
                    value={newRecipient}
                    onChange={(e) =>
                      setNewRecipient(e.target.value)
                    }
                    placeholder="+91-91234-XXXXX"
                    className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Call Type
                    </label>

                    <select
                      value={newType}
                      onChange={(e) =>
                        setNewType(e.target.value)
                      }
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Incoming">
                        Incoming
                      </option>
                      <option value="Outgoing">
                        Outgoing
                      </option>
                      <option value="Missed">
                        Missed
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Duration
                    </label>

                    <input
                      type="text"
                      value={newDuration}
                      onChange={(e) =>
                        setNewDuration(e.target.value)
                      }
                      placeholder="02m 30s"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Tower ID
                    </label>

                    <input
                      type="text"
                      value={newTower}
                      onChange={(e) =>
                        setNewTower(e.target.value)
                      }
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
                      onChange={(e) =>
                        setNewLocation(e.target.value)
                      }
                      placeholder="Location node"
                      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5">
                  <p className="text-[11px] leading-5 text-blue-700">
                    The record will be added to the current CDR
                    workspace with an automatically generated Log ID
                    and timestamp.
                  </p>
                </div>
              </div>

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