import React, { useMemo, useState } from 'react';
import {
  FileText,
  Download,
  Filter,
  Search,
  Plus,
  Calendar,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  FileSpreadsheet,
  FileCheck2,
  Printer,
  BarChart3,
  Scale,
  RefreshCw,
  X,
  Eye,
  Trash2,
  ChevronRight,
  Database,
  Hash,
  User,
  Briefcase,
  SlidersHorizontal,
  LockKeyhole,
  AlertCircle,
} from 'lucide-react';

import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

/* =========================================================
   REPORT CONFIGURATION
========================================================= */

const REPORT_TEMPLATES = {
  LEGAL_AFFIDAVIT: {
    title: 'Section 65B / BSA Electronic Evidence Certificate',
    format: 'PDF',
    label: 'Legal / Evidence',
  },

  CDR_ANALYSIS: {
    title: 'Comprehensive Telecom CDR & Tower Dump Analysis',
    format: 'PDF',
    label: 'Telecom CDR',
  },

  FINANCIAL_TRAIL: {
    title: 'Financial Flow & Mule Account Audit Trail',
    format: 'EXCEL',
    label: 'Financial Trail',
  },

  DOSSIER: {
    title: 'Suspect & Network Master Dossier',
    format: 'PDF',
    label: 'Master Dossier',
  },
};

const CASES = {
  '26189-042': {
    firNo: 'FIR-2026-NCRB-9021',
    name: 'Noida Cyber Heist',
  },

  '26189-088': {
    firNo: 'FIR-2026-DL-4410',
    name: 'Shell Banking Laundering',
  },

  '26189-102': {
    firNo: 'FIR-2026-MH-1102',
    name: 'Burner Phone Network',
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [selectedCase, setSelectedCase] = useState('26189-042');
  const [selectedTemplate, setSelectedTemplate] =
    useState('LEGAL_AFFIDAVIT');

  const [isGenerating, setIsGenerating] = useState(false);
  const [modalReport, setModalReport] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  const [reportsList, setReportsList] = useState([
    {
      id: 'RPT-2026-9011',
      title:
        'Section 65B Electronic Evidence Affidavit & Hash Certificate',
      type: 'LEGAL_AFFIDAVIT',
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      generatedBy: 'Inspector R. Deshmukh',
      generatedAt: '12 Jan 2026, 16:40 IST',
      status: 'READY',
      size: '2.4 MB',
      format: 'PDF',
      hashSignature: 'SHA256: 9f8a0...c418e',
    },

    {
      id: 'RPT-2026-8842',
      title:
        'Comprehensive Telecom CDR & Tower Dump Frequency Analysis',
      type: 'CDR_ANALYSIS',
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      generatedBy: 'DySP S. Pattnaik',
      generatedAt: '18 Jan 2026, 11:15 IST',
      status: 'READY',
      size: '14.8 MB',
      format: 'PDF',
      hashSignature: 'SHA256: a14c8...e901b',
    },

    {
      id: 'RPT-2026-8710',
      title:
        'Multi-Layer Shell Account Money Laundering Trail (FIU Dump)',
      type: 'FINANCIAL_TRAIL',
      caseId: '26189-088',
      firNo: 'FIR-2026-DL-4410',
      generatedBy: 'Senior Investigator V. Kumar',
      generatedAt: '05 Feb 2026, 09:30 IST',
      status: 'READY',
      size: '8.2 MB',
      format: 'EXCEL',
      hashSignature: 'SHA256: e8812...a0421',
    },

    {
      id: 'RPT-2026-8501',
      title:
        'Master Syndicate Linkage & Inter-Suspect Network Dossier',
      type: 'DOSSIER',
      caseId: '26189-102',
      firNo: 'FIR-2026-MH-1102',
      generatedBy: 'Forensic Expert A. Mehta',
      generatedAt: '22 Feb 2026, 14:05 IST',
      status: 'PROCESSING',
      size: 'Calculating...',
      format: 'PDF',
      hashSignature: 'PENDING',
    },
  ]);

  /* =========================================================
     TOAST
  ========================================================= */

  const showToast = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);

    window.setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  /* =========================================================
     GENERATE REPORT
  ========================================================= */

  const handleGenerateReport = (event) => {
    event?.preventDefault();

    if (isGenerating) return;

    setIsGenerating(true);

    const template =
      REPORT_TEMPLATES[selectedTemplate];

    const caseInfo =
      CASES[selectedCase];

    window.setTimeout(() => {
      const randomId =
        Math.floor(1000 + Math.random() * 9000);

      const randomHash =
        Math.random()
          .toString(36)
          .substring(2, 10);

      const randomHashEnd =
        Math.random()
          .toString(36)
          .substring(2, 8);

      const newReport = {
        id: `RPT-2026-${randomId}`,

        title: template.title,

        type: selectedTemplate,

        caseId: selectedCase,

        firNo: caseInfo.firNo,

        generatedBy: 'Tushar Kaushik',

        generatedAt: 'Just Now',

        status: 'READY',

        size:
          template.format === 'EXCEL'
            ? '1.8 MB'
            : '2.1 MB',

        format: template.format,

        hashSignature:
          `SHA256: ${randomHash}...${randomHashEnd}`,
      };

      setReportsList((previous) => [
        newReport,
        ...previous,
      ]);

      setIsGenerating(false);

      showToast(
        `${newReport.id} generated successfully.`
      );
    }, 1200);
  };

  /* =========================================================
     PDF EXPORT
  ========================================================= */

  const exportPDF = (report) => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth =
      pdf.internal.pageSize.getWidth();

    const pageHeight =
      pdf.internal.pageSize.getHeight();

    const margin = 18;

    let y = 20;

    /* Header */

    pdf.setTextColor(25, 35, 50);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(17);

    pdf.text(
      'CRIMEGRAPH AI',
      margin,
      y
    );

    y += 6;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);

    pdf.setTextColor(100, 110, 120);

    pdf.text(
      'INVESTIGATIVE REPORT REPOSITORY',
      margin,
      y
    );

    y += 9;

    pdf.setDrawColor(210, 215, 222);

    pdf.line(
      margin,
      y,
      pageWidth - margin,
      y
    );

    y += 12;

    /* Report title */

    pdf.setTextColor(25, 35, 50);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);

    const titleLines =
      pdf.splitTextToSize(
        report.title,
        pageWidth - margin * 2
      );

    pdf.text(
      titleLines,
      margin,
      y
    );

    y +=
      titleLines.length * 6 +
      8;

    /* Metadata helper */

    const addField = (
      label,
      value
    ) => {
      const labelWidth = 40;

      pdf.setFont(
        'helvetica',
        'bold'
      );

      pdf.setFontSize(8.5);

      pdf.setTextColor(
        80,
        90,
        100
      );

      pdf.text(
        `${label}`,
        margin,
        y
      );

      pdf.setFont(
        'helvetica',
        'normal'
      );

      pdf.setTextColor(
        35,
        45,
        55
      );

      const lines =
        pdf.splitTextToSize(
          String(value || 'N/A'),
          pageWidth -
            margin * 2 -
            labelWidth
        );

      pdf.text(
        lines,
        margin + labelWidth,
        y
      );

      y += Math.max(
        6,
        lines.length * 5
      );
    };

    addField(
      'Report ID',
      report.id
    );

    addField(
      'Report Type',
      getReadableType(report.type)
    );

    addField(
      'Case ID',
      report.caseId
    );

    addField(
      'FIR Number',
      report.firNo
    );

    addField(
      'Generated By',
      report.generatedBy
    );

    addField(
      'Generated At',
      report.generatedAt
    );

    addField(
      'Status',
      report.status
    );

    addField(
      'Output Format',
      report.format
    );

    y += 6;

    /* Evidence section */

    pdf.setDrawColor(
      210,
      215,
      222
    );

    pdf.line(
      margin,
      y,
      pageWidth - margin,
      y
    );

    y += 9;

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(11);

    pdf.setTextColor(
      25,
      35,
      50
    );

    pdf.text(
      'Evidence Integrity',
      margin,
      y
    );

    y += 8;

    addField(
      'Hash Algorithm',
      'SHA-256'
    );

    addField(
      'Hash Record',
      report.hashSignature
    );

    addField(
      'Case Link',
      report.caseId
    );

    addField(
      'Evidence Link',
      'Case-linked evidence repository'
    );

    y += 8;

    /* Notice box */

    const boxHeight = 29;

    pdf.setFillColor(
      247,
      249,
      251
    );

    pdf.setDrawColor(
      220,
      225,
      230
    );

    pdf.roundedRect(
      margin,
      y,
      pageWidth - margin * 2,
      boxHeight,
      2,
      2,
      'FD'
    );

    y += 7;

    pdf.setFont(
      'helvetica',
      'bold'
    );

    pdf.setFontSize(9);

    pdf.setTextColor(
      45,
      55,
      65
    );

    pdf.text(
      'Repository Integrity Notice',
      margin + 5,
      y
    );

    y += 5;

    pdf.setFont(
      'helvetica',
      'normal'
    );

    pdf.setFontSize(7.8);

    const notice =
      'This report record is associated with the originating investigation case and evidence references. The SHA-256 value is maintained as the cryptographic integrity record for the report artifact.';

    const noticeLines =
      pdf.splitTextToSize(
        notice,
        pageWidth -
          margin * 2 -
          10
      );

    pdf.text(
      noticeLines,
      margin + 5,
      y
    );

    /* Footer */

    pdf.setDrawColor(
      210,
      215,
      222
    );

    pdf.line(
      margin,
      pageHeight - 17,
      pageWidth - margin,
      pageHeight - 17
    );

    pdf.setFontSize(7);

    pdf.setTextColor(
      120,
      125,
      130
    );

    pdf.text(
      `CrimeGraph AI | ${report.id}`,
      margin,
      pageHeight - 10
    );

    pdf.text(
      'Investigative Report Repository',
      pageWidth - margin,
      pageHeight - 10,
      {
        align: 'right',
      }
    );

    pdf.save(
      `${report.id}_${report.type}.pdf`
    );
  };

  /* =========================================================
     EXCEL EXPORT
  ========================================================= */

  const exportExcel = (report) => {
    const workbook =
      XLSX.utils.book_new();

    /* Report Summary */

    const summaryData = [
      ['CRIMEGRAPH AI'],
      ['Investigative Report Repository'],
      [],
      ['REPORT INFORMATION', ''],
      ['Report ID', report.id],
      ['Title', report.title],
      [
        'Report Type',
        getReadableType(report.type),
      ],
      ['Case ID', report.caseId],
      ['FIR Number', report.firNo],
      ['Generated By', report.generatedBy],
      ['Generated At', report.generatedAt],
      ['Status', report.status],
      ['Output Format', report.format],
      ['Repository Size', report.size],
      [],
      ['EVIDENCE INTEGRITY', ''],
      ['Hash Algorithm', 'SHA-256'],
      ['Hash Record', report.hashSignature],
      [
        'Case Link',
        report.caseId,
      ],
      [
        'Evidence Link',
        'Case-linked evidence repository',
      ],
      [
        'Audit Reference',
        'CrimeGraph AI Report Repository',
      ],
    ];

    const worksheet =
      XLSX.utils.aoa_to_sheet(
        summaryData
      );

    worksheet['!cols'] = [
      {
        wch: 25,
      },
      {
        wch: 75,
      },
    ];

    /* Freeze top rows */

    worksheet['!freeze'] = {
      xSplit: 0,
      ySplit: 3,
    };

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Report Summary'
    );

    /* Investigation Data Sheet */

    const investigationData = [
      [
        'Case ID',
        report.caseId,
      ],
      [
        'FIR Number',
        report.firNo,
      ],
      [
        'Report ID',
        report.id,
      ],
      [
        'Report Type',
        getReadableType(report.type),
      ],
      [
        'Generated By',
        report.generatedBy,
      ],
      [
        'Generated At',
        report.generatedAt,
      ],
      [
        'Status',
        report.status,
      ],
      [
        'Hash',
        report.hashSignature,
      ],
    ];

    const investigationSheet =
      XLSX.utils.aoa_to_sheet(
        investigationData
      );

    investigationSheet['!cols'] = [
      {
        wch: 25,
      },
      {
        wch: 65,
      },
    ];

    XLSX.utils.book_append_sheet(
      workbook,
      investigationSheet,
      'Investigation'
    );

    XLSX.writeFile(
      workbook,
      `${report.id}_${report.type}.xlsx`
    );
  };

  /* =========================================================
     EXPORT HANDLER
  ========================================================= */

  const handleDownload = (report) => {
    if (!report) return;

    if (report.status !== 'READY') {
      showToast(
        'This report is still processing.',
        'error'
      );

      return;
    }

    try {
      if (report.format === 'EXCEL') {
        exportExcel(report);

        showToast(
          `${report.id}.xlsx exported successfully.`
        );

        return;
      }

      exportPDF(report);

      showToast(
        `${report.id}.pdf exported successfully.`
      );
    } catch (error) {
      console.error(
        'Report export error:',
        error
      );

      showToast(
        'Export failed. Please try again.',
        'error'
      );
    }
  };

  /* =========================================================
     PRINT
  ========================================================= */

  const handleBatchPrint = () => {
    const readyReports =
      reportsList.filter(
        (report) =>
          report.status === 'READY'
      );

    if (!readyReports.length) {
      showToast(
        'No ready reports available for printing.',
        'error'
      );

      return;
    }

    showToast(
      `Preparing ${readyReports.length} ready report(s) for printing.`
    );

    window.setTimeout(() => {
      window.print();
    }, 250);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDeleteReport = (id) => {
    const confirmed =
      window.confirm(
        `Remove report ${id} from the repository?`
      );

    if (!confirmed) return;

    setReportsList(
      (previous) =>
        previous.filter(
          (report) =>
            report.id !== id
        )
    );

    if (
      modalReport?.id === id
    ) {
      setModalReport(null);
    }

    showToast(
      `Report ${id} removed from the repository.`
    );
  };

  /* =========================================================
     FILTERING
  ========================================================= */

  const filteredReports =
    useMemo(() => {
      const query =
        searchQuery
          .trim()
          .toLowerCase();

      return reportsList.filter(
        (report) => {
          const searchableText = [
            report.title,
            report.id,
            report.firNo,
            report.caseId,
            report.generatedBy,
            report.type,
            report.status,
          ]
            .join(' ')
            .toLowerCase();

          const matchesSearch =
            !query ||
            searchableText.includes(
              query
            );

          const matchesType =
            typeFilter === 'ALL' ||
            report.type === typeFilter;

          const matchesStatus =
            statusFilter === 'ALL' ||
            report.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus
          );
        }
      );
    }, [
      reportsList,
      searchQuery,
      typeFilter,
      statusFilter,
    ]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const readyCount =
    reportsList.filter(
      (report) =>
        report.status === 'READY'
    ).length;

  const processingCount =
    reportsList.filter(
      (report) =>
        report.status ===
        'PROCESSING'
    ).length;

  const totalSize =
    reportsList
      .filter(
        (report) =>
          report.status ===
          'READY'
      )
      .reduce(
        (total, report) => {
          const value =
            parseFloat(
              report.size
            );

          return (
            total +
            (Number.isNaN(value)
              ? 0
              : value)
          );
        },
        0
      );

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans">

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toastMessage && (
        <div className="fixed top-5 right-5 z-[100] w-[360px] max-w-[calc(100vw-2rem)]">

          <div
            className={`bg-white border shadow-lg rounded-xl px-4 py-3 flex items-start gap-3 ${
              toastType === 'error'
                ? 'border-red-200'
                : 'border-emerald-200'
            }`}
          >

            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                toastType === 'error'
                  ? 'bg-red-50'
                  : 'bg-emerald-50'
              }`}
            >
              {toastType === 'error' ? (
                <AlertCircle
                  size={17}
                  className="text-red-600"
                />
              ) : (
                <CheckCircle2
                  size={17}
                  className="text-emerald-600"
                />
              )}
            </div>

            <div className="min-w-0 flex-1 pt-0.5">

              <p className="text-xs font-bold text-slate-900">
                Report Repository
              </p>

              <p className="text-xs text-slate-600 mt-0.5 leading-5">
                {toastMessage}
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setToastMessage(null)
              }
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={15} />
            </button>

          </div>
        </div>
      )}

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 space-y-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">

          <div>

            <div className="flex items-center gap-2 text-[11px] font-bold tracking-wide text-slate-500 uppercase">

              <FileText size={15} />

              <span>
                Investigation Workspace
              </span>

              <ChevronRight size={13} />

              <span className="text-slate-700">
                Reports & Certifications
              </span>

            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Investigative Reports
            </h1>

            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Generate, review and export
              structured investigation reports,
              forensic analysis documents and
              case dossiers.
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-2">

            <button
              type="button"
              onClick={handleBatchPrint}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition"
            >
              <Printer size={15} />
              Batch Print
            </button>

            <button
              type="button"
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition disabled:opacity-60"
            >
              {isGenerating ? (
                <>
                  <RefreshCw
                    size={15}
                    className="animate-spin"
                  />

                  Compiling...
                </>
              ) : (
                <>
                  <Plus size={16} />

                  Generate Report
                </>
              )}
            </button>

          </div>

        </section>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="grid grid-cols-2 xl:grid-cols-4 gap-3">

          <SummaryCard
            icon={FileText}
            label="Total Reports"
            value={
              reportsList.length
            }
            description="Repository entries"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Ready"
            value={readyCount}
            description="Available for export"
            accent="emerald"
          />

          <SummaryCard
            icon={Clock3}
            label="Processing"
            value={processingCount}
            description="Compilation in progress"
            accent="amber"
          />

          <SummaryCard
            icon={Database}
            label="Indexed Output"
            value={`${totalSize.toFixed(
              1
            )} MB`}
            description="Ready report volume"
            accent="blue"
          />

        </section>

        {/* =================================================
            REPORT BUILDER
        ================================================= */}

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="px-5 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                <FileCheck2
                  size={18}
                  className="text-blue-700"
                />
              </div>

              <div>

                <h2 className="text-sm font-bold text-slate-900">
                  Report Builder
                </h2>

                <p className="text-[11px] text-slate-500 mt-0.5">
                  Select a case and output
                  template to create a report.
                </p>

              </div>

            </div>

            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
              <ShieldCheck size={13} />
              Evidence integrity workflow
            </span>

          </div>

          <form
            onSubmit={
              handleGenerateReport
            }
            className="p-5"
          >

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

              <FormField label="Target Case / FIR">

                <select
                  value={selectedCase}
                  onChange={(event) =>
                    setSelectedCase(
                      event.target.value
                    )
                  }
                  className={selectClass}
                >

                  <option value="26189-042">
                    FIR-2026-NCRB-9021 — Noida Cyber Heist
                  </option>

                  <option value="26189-088">
                    FIR-2026-DL-4410 — Shell Banking Laundering
                  </option>

                  <option value="26189-102">
                    FIR-2026-MH-1102 — Burner Phone Network
                  </option>

                </select>

              </FormField>

              <FormField label="Report Template">

                <select
                  value={
                    selectedTemplate
                  }
                  onChange={(event) =>
                    setSelectedTemplate(
                      event.target.value
                    )
                  }
                  className={selectClass}
                >

                  <option value="LEGAL_AFFIDAVIT">
                    Section 65B / BSA Evidence Certificate
                  </option>

                  <option value="CDR_ANALYSIS">
                    Tower Dump & Call Frequency Analysis
                  </option>

                  <option value="FINANCIAL_TRAIL">
                    Financial Flow & Mule Audit Trail
                  </option>

                  <option value="DOSSIER">
                    Suspect & Network Master Dossier
                  </option>

                </select>

              </FormField>

              <FormField label="Integrity Record">

                <div className="h-[42px] px-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs font-semibold text-slate-700">

                  <Hash
                    size={15}
                    className="text-emerald-600"
                  />

                  SHA-256 hash field

                  <LockKeyhole
                    size={13}
                    className="ml-auto text-slate-400"
                  />

                </div>

              </FormField>

              <div className="flex items-end">

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full h-[42px] rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition disabled:opacity-60"
                >

                  {isGenerating ? (
                    <>
                      <RefreshCw
                        size={15}
                        className="animate-spin"
                      />

                      Building Output
                    </>
                  ) : (
                    <>
                      <FileCheck2
                        size={15}
                      />

                      Generate Report
                    </>
                  )}

                </button>

              </div>

            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-slate-500">

              <span className="inline-flex items-center gap-1.5">
                <Briefcase size={13} />
                Case-linked output
              </span>

              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={13} />
                Evidence reference support
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Hash size={13} />
                Cryptographic hash field
              </span>

            </div>

          </form>

        </section>

        {/* =================================================
            FILTERS
        ================================================= */}

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-3">

          <div className="flex flex-col lg:flex-row gap-3">

            <div className="relative flex-1">

              <Search
                size={16}
                className="absolute left-3.5 top-3 text-slate-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                placeholder="Search report title, ID, FIR, case, or author..."
                className="w-full h-10 pl-10 pr-10 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() =>
                    setSearchQuery('')
                  }
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                >
                  <X size={15} />
                </button>
              )}

            </div>

            <div className="flex flex-wrap items-center gap-2">

              <div className="h-10 min-w-[205px] flex items-center gap-2 px-3 rounded-lg border border-slate-200 bg-slate-50">

                <Filter
                  size={14}
                  className="text-slate-400"
                />

                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(
                      event.target.value
                    )
                  }
                  className="bg-transparent w-full text-xs font-semibold text-slate-700 focus:outline-none"
                >

                  <option value="ALL">
                    All report types
                  </option>

                  <option value="LEGAL_AFFIDAVIT">
                    Legal / Evidence
                  </option>

                  <option value="CDR_ANALYSIS">
                    Telecom CDR
                  </option>

                  <option value="FINANCIAL_TRAIL">
                    Financial Trail
                  </option>

                  <option value="DOSSIER">
                    Master Dossier
                  </option>

                </select>

              </div>

              <div className="h-10 min-w-[180px] flex items-center gap-2 px-3 rounded-lg border border-slate-200 bg-slate-50">

                <Clock3
                  size={14}
                  className="text-slate-400"
                />

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value
                    )
                  }
                  className="bg-transparent w-full text-xs font-semibold text-slate-700 focus:outline-none"
                >

                  <option value="ALL">
                    All statuses
                  </option>

                  <option value="READY">
                    Ready for export
                  </option>

                  <option value="PROCESSING">
                    Processing
                  </option>

                </select>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            REPOSITORY
        ================================================= */}

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">

            <div>

              <h2 className="text-sm font-bold text-slate-900">
                Report Repository
              </h2>

              <p className="text-[11px] text-slate-500 mt-0.5">

                {filteredReports.length}{' '}
                report
                {filteredReports.length !==
                1
                  ? 's'
                  : ''}{' '}
                matching current filters

              </p>

            </div>

            <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-500">

              <SlidersHorizontal
                size={13}
              />

              <span>
                Case-linked records
              </span>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left border-collapse">

              <thead>

                <tr className="bg-slate-50 border-b border-slate-200">

                  <th
                    className={
                      tableHeadClass
                    }
                  >
                    Report Details
                  </th>

                  <th
                    className={
                      tableHeadClass
                    }
                  >
                    Category
                  </th>

                  <th
                    className={
                      tableHeadClass
                    }
                  >
                    Case Reference
                  </th>

                  <th
                    className={
                      tableHeadClass
                    }
                  >
                    Generated By
                  </th>

                  <th
                    className={
                      tableHeadClass
                    }
                  >
                    Status
                  </th>

                  <th
                    className={`${tableHeadClass} text-right`}
                  >
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredReports.length ===
                0 ? (
                  <tr>

                    <td
                      colSpan={6}
                      className="py-16 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">

                          <Search
                            size={19}
                            className="text-slate-400"
                          />

                        </div>

                        <p className="text-sm font-semibold text-slate-700 mt-3">
                          No reports found
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          Adjust your search or
                          filter criteria.
                        </p>

                      </div>

                    </td>

                  </tr>
                ) : (
                  filteredReports.map(
                    (report) => {
                      const typeConfig =
                        getReportTypeConfig(
                          report.type
                        );

                      const statusConfig =
                        getStatusConfig(
                          report.status
                        );

                      const TypeIcon =
                        typeConfig.icon;

                      const StatusIcon =
                        statusConfig.icon;

                      return (
                        <tr
                          key={report.id}
                          className="hover:bg-slate-50/80 transition"
                        >

                          {/* REPORT */}

                          <td className="px-5 py-4 min-w-[340px]">

                            <div className="flex items-start gap-3">

                              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">

                                {report.format ===
                                'EXCEL' ? (
                                  <FileSpreadsheet
                                    size={18}
                                    className="text-blue-700"
                                  />
                                ) : (
                                  <FileText
                                    size={18}
                                    className="text-blue-700"
                                  />
                                )}

                              </div>

                              <div className="min-w-0">

                                <div className="flex items-center gap-2 mb-1">

                                  <span className="font-mono text-[10px] font-bold text-slate-500">
                                    {report.id}
                                  </span>

                                  <span className="text-[10px] text-slate-400">
                                    •
                                  </span>

                                  <span className="text-[10px] font-semibold text-slate-400">
                                    {report.format}
                                    {' · '}
                                    {report.size}
                                  </span>

                                </div>

                                <p className="text-xs font-bold text-slate-900 leading-5 max-w-[410px]">
                                  {report.title}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* CATEGORY */}

                          <td className="px-5 py-4">

                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold whitespace-nowrap ${typeConfig.classes}`}
                            >

                              <TypeIcon
                                size={12}
                              />

                              {
                                typeConfig.label
                              }

                            </span>

                          </td>

                          {/* CASE */}

                          <td className="px-5 py-4 whitespace-nowrap">

                            <div className="flex items-center gap-2">

                              <Briefcase
                                size={13}
                                className="text-slate-400"
                              />

                              <div>

                                <p className="font-mono text-[11px] font-bold text-blue-700">
                                  {report.firNo}
                                </p>

                                <p className="text-[10px] text-slate-500 mt-0.5">
                                  Case #
                                  {
                                    report.caseId
                                  }
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* GENERATED BY */}

                          <td className="px-5 py-4 min-w-[190px]">

                            <div className="flex items-start gap-2">

                              <User
                                size={13}
                                className="text-slate-400 mt-0.5"
                              />

                              <div>

                                <p className="text-[11px] font-semibold text-slate-700">
                                  {
                                    report.generatedBy
                                  }
                                </p>

                                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">

                                  <Calendar
                                    size={10}
                                  />

                                  {
                                    report.generatedAt
                                  }

                                </p>

                              </div>

                            </div>

                          </td>

                          {/* STATUS */}

                          <td className="px-5 py-4 min-w-[170px]">

                            <span
                              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold ${statusConfig.classes}`}
                            >

                              <StatusIcon
                                size={11}
                                className={
                                  report.status ===
                                  'PROCESSING'
                                    ? 'animate-spin'
                                    : ''
                                }
                              />

                              {
                                statusConfig.label
                              }

                            </span>

                            <p className="font-mono text-[9px] text-slate-400 mt-1.5 max-w-[145px] truncate">
                              {
                                report.hashSignature
                              }
                            </p>

                          </td>

                          {/* ACTIONS */}

                          <td className="px-5 py-4">

                            <div className="flex items-center justify-end gap-1.5">

                              {report.status ===
                              'READY' ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setModalReport(
                                        report
                                      )
                                    }
                                    title="View report details"
                                    className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 inline-flex items-center justify-center transition"
                                  >
                                    <Eye
                                      size={14}
                                    />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDownload(
                                        report
                                      )
                                    }
                                    title={`Export as ${report.format}`}
                                    className="h-8 px-2.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100 inline-flex items-center gap-1.5 text-[10px] font-bold transition"
                                  >

                                    <Download
                                      size={13}
                                    />

                                    Export
                                    <span className="hidden xl:inline">
                                      {report.format ===
                                      'EXCEL'
                                        ? ' XLSX'
                                        : ' PDF'}
                                    </span>

                                  </button>
                                </>
                              ) : (
                                <span className="h-8 px-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 inline-flex items-center gap-1.5 text-[10px] font-semibold">
                                  <Clock3
                                    size={12}
                                  />
                                  Waiting
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteReport(
                                    report.id
                                  )
                                }
                                title="Remove report"
                                className="w-8 h-8 rounded-lg border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 inline-flex items-center justify-center transition"
                              >
                                <Trash2
                                  size={13}
                                />
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* =================================================
            FOOTER NOTE
        ================================================= */}

        <section className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-1 pb-4">

          <div className="flex items-center gap-2 text-[11px] text-slate-500">

            <ShieldCheck
              size={14}
              className="text-emerald-600"
            />

            <span>
              Report records remain linked
              to their originating case and
              evidence references.
            </span>

          </div>

          <span className="font-mono text-[10px] text-slate-400">
            CRIMEGRAPH / REPORT-REPOSITORY
          </span>

        </section>

      </main>

      {/* =====================================================
          QUICK VIEW MODAL
      ===================================================== */}

      {modalReport && (
        <div
          className="fixed inset-0 z-[90] bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setModalReport(null);
            }
          }}
        >

          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}

            <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between gap-4">

              <div className="flex items-start gap-3">

                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">

                  <FileCheck2
                    size={19}
                    className="text-emerald-700"
                  />

                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                      Report Record
                    </span>

                    <span className="w-1 h-1 rounded-full bg-slate-300" />

                    <span className="font-mono text-[10px] text-slate-400">
                      {modalReport.id}
                    </span>

                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-1 max-w-xl">
                    {modalReport.title}
                  </h3>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setModalReport(null)
                }
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center"
              >
                <X size={17} />
              </button>

            </div>

            {/* BODY */}

            <div className="p-5 space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <DetailItem
                  icon={Briefcase}
                  label="Case Reference"
                  value={`Case #${modalReport.caseId}`}
                />

                <DetailItem
                  icon={FileText}
                  label="FIR Number"
                  value={
                    modalReport.firNo
                  }
                  mono
                />

                <DetailItem
                  icon={User}
                  label="Generated By"
                  value={
                    modalReport.generatedBy
                  }
                />

                <DetailItem
                  icon={Calendar}
                  label="Generated At"
                  value={
                    modalReport.generatedAt
                  }
                />

                <DetailItem
                  icon={
                    modalReport.format ===
                    'EXCEL'
                      ? FileSpreadsheet
                      : FileText
                  }
                  label="Format & Size"
                  value={`${modalReport.format} (${modalReport.size})`}
                />

                <DetailItem
                  icon={CheckCircle2}
                  label="Repository Status"
                  value={
                    modalReport.status
                  }
                />

              </div>

              {/* HASH */}

              <div className="border border-slate-200 rounded-xl overflow-hidden">

                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <Hash
                      size={14}
                      className="text-slate-500"
                    />

                    <span className="text-[11px] font-bold text-slate-700">
                      Cryptographic Hash Record
                    </span>

                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                    SHA-256
                  </span>

                </div>

                <div className="p-3">

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-[11px] text-slate-700 break-all">
                    {
                      modalReport.hashSignature
                    }
                  </div>

                </div>

              </div>

              {/* INTEGRITY */}

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50 border border-blue-100">

                <ShieldCheck
                  size={17}
                  className="text-blue-700 mt-0.5 shrink-0"
                />

                <div>

                  <p className="text-xs font-bold text-blue-900">
                    Evidence integrity workflow
                  </p>

                  <p className="text-[11px] text-blue-800/80 mt-1 leading-5">
                    The report record contains
                    a cryptographic hash field
                    associated with the finalized
                    evidence artifact and audit
                    trail.
                  </p>

                </div>

              </div>

            </div>

            {/* FOOTER */}

            <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">

              <button
                type="button"
                onClick={() =>
                  setModalReport(null)
                }
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  handleDownload(
                    modalReport
                  );

                  setModalReport(null);
                }}
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-2"
              >

                <Download size={14} />

                Export{' '}
                {modalReport.format ===
                'EXCEL'
                  ? 'XLSX'
                  : 'PDF'}

              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          PRINT STYLES
      ===================================================== */}

      <style>{`

        @media print {

          body {
            background: white !important;
          }

          aside,
          nav,
          button,
          select,
          input,
          .no-print {
            display: none !important;
          }

          main {
            max-width: none !important;
            padding: 0 !important;
          }

          section {
            box-shadow: none !important;
          }

          @page {
            margin: 12mm;
          }
        }

      `}</style>

    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  accent = 'slate',
}) {
  const accentClasses = {
    slate: {
      icon: 'bg-slate-100 text-slate-700',
      value: 'text-slate-900',
    },

    emerald: {
      icon: 'bg-emerald-50 text-emerald-700',
      value: 'text-emerald-700',
    },

    amber: {
      icon: 'bg-amber-50 text-amber-700',
      value: 'text-amber-700',
    },

    blue: {
      icon: 'bg-blue-50 text-blue-700',
      value: 'text-blue-700',
    },
  };

  const config =
    accentClasses[accent] ||
    accentClasses.slate;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">

      <div className="flex items-center justify-between gap-3">

        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${config.icon}`}
        >
          <Icon size={17} />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          Registry
        </span>

      </div>

      <div className="mt-4">

        <p className="text-[11px] font-semibold text-slate-500">
          {label}
        </p>

        <p
          className={`text-xl font-bold tracking-tight mt-0.5 ${config.value}`}
        >
          {value}
        </p>

        <p className="text-[10px] text-slate-400 mt-1">
          {description}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  children,
}) {
  return (
    <div>

      <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
        {label}
      </label>

      {children}

    </div>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  icon: Icon,
  label,
  value,
  mono = false,
}) {
  return (
    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">

      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">

        <Icon size={12} />

        {label}

      </div>

      <p
        className={`mt-2 text-xs font-semibold text-slate-800 break-words ${
          mono
            ? 'font-mono'
            : ''
        }`}
      >
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   REPORT TYPE CONFIG
========================================================= */

function getReportTypeConfig(
  type
) {
  switch (type) {
    case 'LEGAL_AFFIDAVIT':
      return {
        label: 'Legal / Evidence',
        icon: Scale,
        classes:
          'bg-violet-50 text-violet-700 border-violet-200',
      };

    case 'CDR_ANALYSIS':
      return {
        label: 'Telecom CDR',
        icon: BarChart3,
        classes:
          'bg-amber-50 text-amber-700 border-amber-200',
      };

    case 'FINANCIAL_TRAIL':
      return {
        label: 'Financial Trail',
        icon: FileSpreadsheet,
        classes:
          'bg-cyan-50 text-cyan-700 border-cyan-200',
      };

    case 'DOSSIER':
      return {
        label: 'Master Dossier',
        icon: FileCheck2,
        classes:
          'bg-emerald-50 text-emerald-700 border-emerald-200',
      };

    default:
      return {
        label: 'Report',
        icon: FileText,
        classes:
          'bg-slate-50 text-slate-700 border-slate-200',
      };
  }
}

/* =========================================================
   STATUS CONFIG
========================================================= */

function getStatusConfig(
  status
) {
  if (status === 'READY') {
    return {
      label: 'Ready',
      classes:
        'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
    };
  }

  return {
    label: 'Processing',
    classes:
      'bg-amber-50 text-amber-700 border-amber-200',
    icon: RefreshCw,
  };
}

/* =========================================================
   READABLE TYPE
========================================================= */

function getReadableType(
  type
) {
  return (
    getReportTypeConfig(type)
      ?.label || type
  );
}

/* =========================================================
   COMMON CLASSES
========================================================= */

const selectClass =
  'w-full h-[42px] px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer';

const tableHeadClass =
  'px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-500 whitespace-nowrap';