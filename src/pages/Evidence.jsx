import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck2,
  Lock,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Upload,
  Clock,
  HardDrive,
  FileCode,
  Film,
  FileSpreadsheet,
  CheckCircle2,
  Copy,
  Eye,
  FileText,
  Image as ImageIcon,
  X,
  Database,
  Fingerprint,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

export default function Evidence() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [caseFilter, setCaseFilter] = useState('ALL');
  const [copiedHash, setCopiedHash] = useState(null);

  const [notificationToast, setNotificationToast] = useState('');
  const [ingestModalOpen, setIngestModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [selectedAuditItem, setSelectedAuditItem] = useState(null);
  const [selectedExportItem, setSelectedExportItem] = useState(null);

  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('TELECOM_CDR');
  const [newCaseId, setNewCaseId] = useState('26189-042');
  const [attachedFile, setAttachedFile] = useState(null);

  const [evidenceList, setEvidenceList] = useState([
    {
      id: 'EVD-2026-9041',
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      title: 'Tower Dump CDR Extraction - Noida Sector 62',
      type: 'TELECOM_CDR',
      size: '142.8 MB',
      sha256:
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      ledgerTx: '0x9481a...c821b',
      uploadedBy: 'Inspector R. Deshmukh',
      timestamp: '12 Jan 2026, 14:22 IST',
      verificationStatus: 'VERIFIED_ON_CHAIN',
      downloadsCount: 14,
      accessLevel: 'CONFIDENTIAL',
    },
    {
      id: 'EVD-2026-8812',
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      title: 'CCTV Footage - Axis Bank ATM Counter #4',
      type: 'VIDEO_RECORDING',
      size: '1.84 GB',
      sha256:
        'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
      ledgerTx: '0x8812f...a4102',
      uploadedBy: 'DySP S. Pattnaik',
      timestamp: '15 Jan 2026, 09:10 IST',
      verificationStatus: 'VERIFIED_ON_CHAIN',
      downloadsCount: 8,
      accessLevel: 'RESTRICTED',
    },
    {
      id: 'EVD-2026-8790',
      caseId: '26189-088',
      firNo: 'FIR-2026-DL-4410',
      title: 'Shell Company FIU Banking Ledger (CSV Dump)',
      type: 'CSV_FILE',
      size: '18.4 MB',
      sha256:
        '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      ledgerTx: '0x12a90...b9981',
      uploadedBy: 'Senior Investigator V. Kumar',
      timestamp: '04 Feb 2026, 18:45 IST',
      verificationStatus: 'VERIFIED_ON_CHAIN',
      downloadsCount: 22,
      accessLevel: 'CONFIDENTIAL',
    },
    {
      id: 'EVD-2026-8411',
      caseId: '26189-102',
      firNo: 'FIR-2026-MH-1102',
      title: 'Forensic Image Dump (128GB Burner Phone Drive)',
      type: 'DRIVE_IMAGE',
      size: '42.1 GB',
      sha256:
        'cb56d08f330591b779b744069f210582239a269290e2d1701b27d72d0077e23d',
      ledgerTx: '0x4421c...e8810',
      uploadedBy: 'Forensic Expert A. Mehta',
      timestamp: '20 Feb 2026, 11:30 IST',
      verificationStatus: 'VERIFIED_ON_CHAIN',
      downloadsCount: 5,
      accessLevel: 'TOP_SECRET',
    },
  ]);

  const triggerToast = (message) => {
    setNotificationToast(message);

    setTimeout(() => {
      setNotificationToast('');
    }, 3000);
  };

  const copyToClipboard = async (hash, id) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedHash(id);
      triggerToast('SHA-256 hash copied to clipboard');

      setTimeout(() => {
        setCopiedHash(null);
      }, 2000);
    } catch {
      triggerToast('Unable to copy hash');
    }
  };

  const getEvidenceIcon = (type) => {
    const iconClass = 'h-5 w-5';

    switch (type) {
      case 'TELECOM_CDR':
        return <FileCode className={`${iconClass} text-amber-600`} />;

      case 'VIDEO_RECORDING':
        return <Film className={`${iconClass} text-violet-600`} />;

      case 'CSV_FILE':
        return <FileSpreadsheet className={`${iconClass} text-emerald-600`} />;

      case 'EXCEL_SHEET':
        return <FileSpreadsheet className={`${iconClass} text-green-600`} />;

      case 'CAMERA_IMAGE':
        return <ImageIcon className={`${iconClass} text-pink-600`} />;

      case 'PDF_DOC':
        return <FileText className={`${iconClass} text-red-600`} />;

      default:
        return <HardDrive className={`${iconClass} text-slate-500`} />;
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      TELECOM_CDR: 'Telecom CDR',
      VIDEO_RECORDING: 'Video Recording',
      CSV_FILE: 'CSV File',
      EXCEL_SHEET: 'Excel Sheet',
      CAMERA_IMAGE: 'Image',
      PDF_DOC: 'PDF Document',
      DRIVE_IMAGE: 'Drive Image',
    };

    return labels[type] || 'Digital Evidence';
  };

  const getAccessBadge = (level) => {
    const styles = {
      CONFIDENTIAL:
        'bg-amber-50 text-amber-700 border-amber-200',
      RESTRICTED:
        'bg-orange-50 text-orange-700 border-orange-200',
      TOP_SECRET:
        'bg-red-50 text-red-700 border-red-200',
    };

    return (
      <span
        className={`inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-bold tracking-wide ${
          styles[level] || 'bg-slate-50 text-slate-600 border-slate-200'
        }`}
      >
        {level.replace('_', ' ')}
      </span>
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAttachedFile(file);

    if (!newTitle) {
      const extensionIndex = file.name.lastIndexOf('.');
      setNewTitle(
        extensionIndex > 0
          ? file.name.substring(0, extensionIndex)
          : file.name
      );
    }

    const ext = file.name.split('.').pop().toLowerCase();

    if (ext === 'csv') {
      setNewType('CSV_FILE');
    } else if (['xlsx', 'xls'].includes(ext)) {
      setNewType('EXCEL_SHEET');
    } else if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      setNewType('CAMERA_IMAGE');
    } else if (ext === 'pdf') {
      setNewType('PDF_DOC');
    } else if (['mp4', 'mov', 'avi'].includes(ext)) {
      setNewType('VIDEO_RECORDING');
    } else {
      setNewType('TELECOM_CDR');
    }
  };

  const resetIngestForm = () => {
    setNewTitle('');
    setNewType('TELECOM_CDR');
    setNewCaseId('26189-042');
    setAttachedFile(null);
  };

  const handleIngestSubmit = (e) => {
    e.preventDefault();

    if (!newTitle.trim()) return;

    const formattedSize = attachedFile
      ? `${(attachedFile.size / (1024 * 1024)).toFixed(2)} MB`
      : '12.4 MB';

    const newRecord = {
      id: `EVD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      caseId: newCaseId,
      firNo:
        newCaseId === '26189-042'
          ? 'FIR-2026-NCRB-9021'
          : newCaseId === '26189-088'
          ? 'FIR-2026-DL-4410'
          : 'FIR-2026-MH-1102',
      title: newTitle.trim(),
      type: newType,
      size: formattedSize,
      sha256:
        '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      ledgerTx: `0x${Math.random()
        .toString(16)
        .substring(2, 8)}...${Math.random()
        .toString(16)
        .substring(2, 6)}`,
      uploadedBy: 'Current Officer (You)',
      timestamp: 'Just now',
      verificationStatus: 'VERIFIED_ON_CHAIN',
      downloadsCount: 0,
      accessLevel: 'CONFIDENTIAL',
    };

    setEvidenceList((previous) => [newRecord, ...previous]);

    setIngestModalOpen(false);
    resetIngestForm();

    triggerToast(
      'Evidence uploaded and SHA-256 ledger record created'
    );
  };

  const filteredEvidence = evidenceList.filter((e) => {
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !query ||
      e.title.toLowerCase().includes(query) ||
      e.id.toLowerCase().includes(query) ||
      e.firNo.toLowerCase().includes(query) ||
      e.sha256.toLowerCase().includes(query);

    const matchesType =
      typeFilter === 'ALL' || e.type === typeFilter;

    const matchesCase =
      caseFilter === 'ALL' || e.caseId === caseFilter;

    return matchesSearch && matchesType && matchesCase;
  });

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-800 font-sans">
      {/* Toast */}
      {notificationToast && (
        <div className="fixed right-6 top-6 z-[100]">
          <div className="flex max-w-sm items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-xl">
            <div className="mt-0.5 rounded-full bg-emerald-50 p-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800">
                Action completed
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                {notificationToast}
              </p>
            </div>

            <button
              onClick={() => setNotificationToast('')}
              className="ml-2 text-slate-400 hover:text-slate-700"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 py-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                <Lock size={14} />
                Evidence & Integrity
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Evidence Repository
              </h1>

              <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">
                Centralized repository for digital evidence, chain-of-custody
                records and cryptographic integrity verification.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setVerifyModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]"
              >
                <ShieldCheck size={15} className="text-emerald-600" />
                Verify Integrity
              </button>

              <button
                onClick={() => setIngestModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
              >
                <Upload size={15} />
                Add Evidence
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1600px] space-y-5 px-6 py-6">
        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Total artifacts
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {evidenceList.length}
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 p-2.5">
                <Database className="h-5 w-5 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Verified
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">
                  {evidenceList.filter(
                    (e) => e.verificationStatus === 'VERIFIED_ON_CHAIN'
                  ).length}
                </p>
              </div>

              <div className="rounded-lg bg-emerald-50 p-2.5">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Linked cases
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {new Set(evidenceList.map((e) => e.caseId)).size}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-2.5">
                <FileCheck2 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Ledger status
                </p>
                <p className="mt-1 text-sm font-bold text-emerald-700">
                  Operational
                </p>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-700">
                  ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search / Filters */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Evidence records
              </h2>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Search and filter registered forensic artifacts.
              </p>
            </div>

            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
              {filteredEvidence.length} RECORD
              {filteredEvidence.length === 1 ? '' : 'S'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="relative lg:col-span-6">
              <Search
                size={16}
                className="absolute left-3.5 top-3 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, evidence ID, FIR number or SHA-256..."
                className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="relative lg:col-span-3">
              <Filter
                size={15}
                className="absolute left-3.5 top-3 text-slate-400"
              />

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-10 pr-8 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="ALL">All evidence formats</option>
                <option value="CSV_FILE">CSV spreadsheets</option>
                <option value="EXCEL_SHEET">Excel files</option>
                <option value="CAMERA_IMAGE">Images</option>
                <option value="PDF_DOC">PDF documents</option>
                <option value="TELECOM_CDR">Telecom CDR</option>
                <option value="VIDEO_RECORDING">Video / CCTV</option>
                <option value="DRIVE_IMAGE">Drive images</option>
              </select>
            </div>

            <div className="relative lg:col-span-3">
              <FileCheck2
                size={15}
                className="absolute left-3.5 top-3 text-slate-400"
              />

              <select
                value={caseFilter}
                onChange={(e) => setCaseFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-10 pr-8 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="ALL">All linked cases</option>
                <option value="26189-042">
                  FIR-2026-NCRB-9021
                </option>
                <option value="26189-088">
                  FIR-2026-DL-4410
                </option>
                <option value="26189-102">
                  FIR-2026-MH-1102
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* Evidence table */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Registered evidence
                </h2>
                <p className="text-[11px] text-slate-500">
                  Each record contains its integrity hash and ledger reference.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">
                <Fingerprint size={13} />
                SHA-256 integrity enabled
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5">Artifact</th>
                  <th className="px-5 py-3.5">Case / FIR</th>
                  <th className="px-5 py-3.5">Integrity</th>
                  <th className="px-5 py-3.5">Ingestion</th>
                  <th className="px-5 py-3.5">Access</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredEvidence.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-16 text-center"
                    >
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="rounded-full bg-slate-100 p-3">
                          <Search className="h-5 w-5 text-slate-400" />
                        </div>

                        <p className="mt-3 text-sm font-bold text-slate-700">
                          No matching evidence
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Try changing the search term or filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEvidence.map((evidence) => (
                    <tr
                      key={evidence.id}
                      className="group transition hover:bg-slate-50/80"
                    >
                      {/* Artifact */}
                      <td className="px-5 py-4">
                        <div className="flex min-w-[310px] items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                            {getEvidenceIcon(evidence.type)}
                          </div>

                          <div className="min-w-0">
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-slate-500">
                                {evidence.id}
                              </span>

                              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500">
                                {getTypeLabel(evidence.type)}
                              </span>
                            </div>

                            <p className="max-w-[360px] truncate text-sm font-bold text-slate-800">
                              {evidence.title}
                            </p>

                            <p className="mt-1 text-[10px] text-slate-400">
                              {evidence.size} · {evidence.downloadsCount}{' '}
                              downloads
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Case */}
                      <td className="px-5 py-4">
                        <Link
                          to={`/cases/${evidence.caseId}`}
                          className="font-mono text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                        >
                          {evidence.firNo}
                        </Link>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Case #{evidence.caseId}
                        </p>
                      </td>

                      {/* Integrity */}
                      <td className="px-5 py-4">
                        <div className="flex max-w-[280px] items-center gap-2">
                          <div className="min-w-0 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5">
                            <p className="truncate font-mono text-[10px] text-slate-600">
                              {evidence.sha256}
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              copyToClipboard(
                                evidence.sha256,
                                evidence.id
                              )
                            }
                            title="Copy SHA-256 hash"
                            className="shrink-0 rounded-md p-1.5 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            {copiedHash === evidence.id ? (
                              <CheckCircle2
                                size={14}
                                className="text-emerald-600"
                              />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>

                        <p className="mt-1.5 flex items-center gap-1 font-mono text-[9px] text-slate-400">
                          <span>Ledger:</span>
                          {evidence.ledgerTx}
                        </p>
                      </td>

                      {/* Ingestion */}
                      <td className="px-5 py-4">
                        <p className="whitespace-nowrap text-xs font-semibold text-slate-700">
                          {evidence.uploadedBy}
                        </p>

                        <p className="mt-1 flex items-center gap-1 whitespace-nowrap text-[10px] text-slate-400">
                          <Clock size={11} />
                          {evidence.timestamp}
                        </p>
                      </td>

                      {/* Access */}
                      <td className="px-5 py-4">
                        {getAccessBadge(evidence.accessLevel)}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          ANCHORED
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              setSelectedAuditItem(evidence)
                            }
                            title="View chain-of-custody logs"
                            className="rounded-md border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            onClick={() =>
                              setSelectedExportItem(evidence)
                            }
                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-2 text-[10px] font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                          >
                            <Download size={13} />
                            65B Export
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer note */}
        <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-[10px] text-slate-500 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={13} className="text-slate-400" />
            Evidence records shown here are linked to their registered case.
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <Fingerprint size={12} />
            SHA-256
            <span className="text-slate-300">•</span>
            Immutable ledger reference
          </div>
        </div>
      </main>

      {/* =========================================================
          INGEST EVIDENCE MODAL
      ========================================================= */}
      {ingestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Upload size={16} className="text-emerald-600" />
                  Add Evidence
                </h3>

                <p className="mt-1 text-[11px] text-slate-500">
                  Register a new digital evidence artifact.
                </p>
              </div>

              <button
                onClick={() => {
                  setIngestModalOpen(false);
                  resetIngestForm();
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            <form
              onSubmit={handleIngestSubmit}
              className="space-y-5 p-6"
            >
              {/* Upload */}
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  Evidence file
                </label>

                <div className="relative rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-emerald-400 hover:bg-emerald-50/30">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".csv,.xlsx,.xls,.jpg,.jpeg,.png,.webp,.pdf,.mp4,.mov,.avi,.txt"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />

                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="rounded-xl bg-white p-3 shadow-sm">
                      <Upload className="h-5 w-5 text-emerald-600" />
                    </div>

                    {attachedFile ? (
                      <>
                        <p className="mt-3 max-w-full truncate text-xs font-bold text-slate-800">
                          {attachedFile.name}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                          {(attachedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="mt-3 text-xs font-bold text-slate-700">
                          Choose a file or drag it here
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          CSV, Excel, images, PDF, video and text files
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">
                  Evidence title
                </label>

                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Seized financial transaction sheet"
                  className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Type + Case */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Evidence format
                  </label>

                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="CSV_FILE">CSV Spreadsheet</option>
                    <option value="EXCEL_SHEET">
                      Excel (.xlsx / .xls)
                    </option>
                    <option value="CAMERA_IMAGE">
                      Camera / Image
                    </option>
                    <option value="PDF_DOC">PDF Document</option>
                    <option value="TELECOM_CDR">
                      Telecom CDR Data
                    </option>
                    <option value="VIDEO_RECORDING">
                      Video Recording
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-700">
                    Linked FIR case
                  </label>

                  <select
                    value={newCaseId}
                    onChange={(e) => setNewCaseId(e.target.value)}
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="26189-042">
                      FIR-2026-NCRB-9021
                    </option>
                    <option value="26189-088">
                      FIR-2026-DL-4410
                    </option>
                    <option value="26189-102">
                      FIR-2026-MH-1102
                    </option>
                  </select>
                </div>
              </div>

              {/* Integrity info */}
              <div className="flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <Fingerprint className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                <div>
                  <p className="text-xs font-bold text-emerald-800">
                    Integrity record
                  </p>

                  <p className="mt-0.5 text-[10px] leading-5 text-emerald-700">
                    The evidence record will receive a SHA-256 integrity
                    hash and a ledger transaction reference.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIngestModalOpen(false);
                    resetIngestForm();
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  <ShieldCheck size={14} />
                  Register Evidence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          VERIFY MODAL
      ========================================================= */}
      {verifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-600"
                  />
                  Integrity Verification
                </h3>

                <p className="mt-1 text-[11px] text-slate-500">
                  Review the current evidence integrity state.
                </p>
              </div>

              <button
                onClick={() => setVerifyModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-white p-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      Verification completed
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-emerald-700">
                      All currently registered evidence records report a
                      verified ledger status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Records checked
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {evidenceList.length}
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Verified records
                  </p>

                  <p className="mt-1 text-xl font-bold text-emerald-700">
                    {
                      evidenceList.filter(
                        (e) =>
                          e.verificationStatus ===
                          'VERIFIED_ON_CHAIN'
                      ).length
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3">
                <RefreshCw className="mt-0.5 h-4 w-4 text-slate-400" />

                <p className="text-[10px] leading-5 text-slate-500">
                  This interface represents the current application
                  verification state. Backend ledger verification should
                  be used for production integrity validation.
                </p>
              </div>

              <div className="flex justify-end border-t border-slate-200 pt-4">
                <button
                  onClick={() => {
                    setVerifyModalOpen(false);
                    triggerToast(
                      'Integrity verification review completed'
                    );
                  }}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          AUDIT LOG MODAL
      ========================================================= */}
      {selectedAuditItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Eye size={16} className="text-blue-600" />
                  Chain of Custody
                </h3>

                <p className="mt-1 text-[11px] text-slate-500">
                  Audit history for the selected evidence record.
                </p>
              </div>

              <button
                onClick={() => setSelectedAuditItem(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Artifact
                </p>

                <p className="mt-1 text-sm font-bold text-slate-800">
                  {selectedAuditItem.title}
                </p>

                <p className="mt-1 font-mono text-[10px] text-slate-400">
                  {selectedAuditItem.id}
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Audit events
                  </p>
                </div>

                <div className="divide-y divide-slate-100">
                  <div className="flex gap-3 px-4 py-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />

                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        Evidence ingested
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        {selectedAuditItem.uploadedBy} ·{' '}
                        {selectedAuditItem.timestamp}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 px-4 py-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />

                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        SHA-256 integrity hash calculated
                      </p>

                      <p className="mt-1 break-all font-mono text-[10px] text-slate-400">
                        {selectedAuditItem.sha256}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 px-4 py-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-violet-500" />

                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        Ledger transaction registered
                      </p>

                      <p className="mt-1 font-mono text-[10px] text-slate-400">
                        {selectedAuditItem.ledgerTx}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-200 pt-4">
                <button
                  onClick={() => setSelectedAuditItem(null)}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          65B EXPORT MODAL
      ========================================================= */}
      {selectedExportItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Download size={16} className="text-emerald-600" />
                  Evidence Export
                </h3>

                <p className="mt-1 text-[11px] text-slate-500">
                  Prepare an electronic evidence certificate.
                </p>
              </div>

              <button
                onClick={() => setSelectedExportItem(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Selected artifact
                </p>

                <p className="mt-2 text-sm font-bold leading-5 text-slate-800">
                  {selectedExportItem.title}
                </p>

                <p className="mt-1 font-mono text-[10px] text-slate-400">
                  {selectedExportItem.id}
                </p>
              </div>

              <div className="space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
                  <span>Integrity hash</span>
                  <span className="font-semibold text-emerald-700">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
                  <span>Ledger reference</span>
                  <span className="font-mono text-slate-700">
                    {selectedExportItem.ledgerTx}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
                  <span>Evidence access</span>
                  {getAccessBadge(selectedExportItem.accessLevel)}
                </div>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <p className="text-[10px] leading-5 text-blue-700">
                  The export action is currently represented by this
                  interface. A production implementation should generate
                  and sign the certificate using the backend evidence
                  service.
                </p>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
                <button
                  onClick={() => setSelectedExportItem(null)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    triggerToast(
                      `Certificate export prepared for ${selectedExportItem.id}`
                    );
                    setSelectedExportItem(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  <Download size={13} />
                  Generate Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

