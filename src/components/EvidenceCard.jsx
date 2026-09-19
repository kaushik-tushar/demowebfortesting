import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  ExternalLink,
  ShieldCheck,
  FileText,
  Phone,
  HardDrive,
  Database,
  Hash,
  Clock,
  Download,
  Shield,
} from 'lucide-react';

/**
 * EvidenceCard Props
 *
 * @param {Object} evidence - Digital evidence item
 * @param {Function} [onVerify] - Callback for integrity verification
 * @param {Function} [onDownload] - Callback for secure download
 */
export default function EvidenceCard({
  evidence,
  onVerify,
  onDownload,
}) {
  const [copied, setCopied] = useState(false);

  if (!evidence) return null;

  const {
    id = 'EVT-9081',
    title = 'Inter-Suspect CDR Tower Call Dump (184s)',
    type = 'CDR_LOG',
    hash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    timestamp = '12 Jan 2026, 02:14:22 IST',
    sourceDevice = 'Cell Tower Node #402 (Sector 62 Noida)',
    fileSize = '42.8 MB',
    caseId = '26189-042',
    firNo = 'FIR-2026-NCRB-9021',
    verified = true,
    investigator = 'Inspector R. Sharma (Cyber Cell)',
  } = evidence;

  /* -------------------------------------------------------
     Evidence Type Configuration
  ------------------------------------------------------- */

  const getTypeConfig = () => {
    switch (type) {
      case 'CDR_LOG':
        return {
          label: 'CDR / Telecom',
          icon: Phone,
          classes:
            'bg-amber-50 text-amber-700 border-amber-200',
        };

      case 'WIRE_TRANSFER':
        return {
          label: 'Financial Record',
          icon: Database,
          classes:
            'bg-cyan-50 text-cyan-700 border-cyan-200',
        };

      case 'DISK_FORENSICS':
        return {
          label: 'Disk Forensics',
          icon: HardDrive,
          classes:
            'bg-violet-50 text-violet-700 border-violet-200',
        };

      case 'DATABASE_RECORD':
        return {
          label: 'Database Record',
          icon: Database,
          classes:
            'bg-blue-50 text-blue-700 border-blue-200',
        };

      default:
        return {
          label: 'Digital Evidence',
          icon: FileText,
          classes:
            'bg-slate-50 text-slate-600 border-slate-200',
        };
    }
  };

  const typeConfig = getTypeConfig();
  const TypeIcon = typeConfig.icon;

  /* -------------------------------------------------------
     Integrity Configuration
  ------------------------------------------------------- */

  const integrityConfig = verified
    ? {
        label: 'Verified',
        icon: ShieldCheck,
        classes:
          'bg-emerald-50 text-emerald-700 border-emerald-200',
      }
    : {
        label: 'Unverified',
        icon: AlertTriangle,
        classes:
          'bg-amber-50 text-amber-700 border-amber-200',
      };

  const IntegrityIcon = integrityConfig.icon;

  /* -------------------------------------------------------
     Copy Hash
  ------------------------------------------------------- */

  const handleCopyHash = async () => {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(hash);
      }

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Unable to copy evidence hash:', error);
    }
  };

  /* -------------------------------------------------------
     Hash Display
  ------------------------------------------------------- */

  const truncatedHash =
    hash.length > 24
      ? `${hash.slice(0, 12)}...${hash.slice(-12)}`
      : hash;

  return (
    <article
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        hover:shadow-md
        hover:border-slate-300
        transition-all
        duration-200
        overflow-hidden
        flex
        flex-col
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          {/* Evidence Identity */}
          <div className="flex items-start gap-3 min-w-0">
            <div
              className={`
                w-10
                h-10
                rounded-xl
                border
                flex
                items-center
                justify-center
                shrink-0
                ${typeConfig.classes}
              `}
            >
              <TypeIcon size={18} strokeWidth={2} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="
                    text-[10px]
                    font-semibold
                    font-mono
                    text-blue-700
                  "
                >
                  {id}
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span className="text-[10px] text-slate-500">
                  {fileSize}
                </span>
              </div>

              <h3
                className="
                  text-sm
                  font-bold
                  text-slate-900
                  leading-5
                  tracking-tight
                "
              >
                {title}
              </h3>
            </div>
          </div>

          {/* Integrity Status */}
          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              px-2.5
              py-1
              rounded-md
              border
              text-[9px]
              font-semibold
              uppercase
              tracking-wide
              whitespace-nowrap
              shrink-0
              ${integrityConfig.classes}
            `}
          >
            <IntegrityIcon size={11} />
            {integrityConfig.label}
          </span>
        </div>
      </div>

      {/* =====================================================
          EVIDENCE DETAILS
      ====================================================== */}

      <div className="px-5 space-y-3">
        {/* Timestamp */}
        <div
          className="
            flex
            items-center
            gap-2
            text-[11px]
            text-slate-600
          "
        >
          <Clock
            size={13}
            className="text-slate-400 shrink-0"
          />

          <span className="font-mono">
            {timestamp}
          </span>
        </div>

        {/* Source */}
        <div
          className="
            flex
            items-start
            gap-2
            text-[11px]
            text-slate-600
          "
        >
          <HardDrive
            size={13}
            className="text-slate-400 shrink-0 mt-0.5"
          />

          <div>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 block mb-0.5">
              Source
            </span>

            <span className="font-medium">
              {sourceDevice}
            </span>
          </div>
        </div>

        {/* Evidence Classification */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              px-3
              py-2.5
            "
          >
            <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
              Evidence Type
            </span>

            <p className="text-[11px] font-semibold text-slate-700 mt-1">
              {typeConfig.label}
            </p>
          </div>

          <div
            className="
              bg-slate-50
              border
              border-slate-200
              rounded-xl
              px-3
              py-2.5
            "
          >
            <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
              Case Reference
            </span>

            <p className="text-[11px] font-semibold text-slate-700 mt-1">
              {caseId}
            </p>
          </div>
        </div>

        {/* Investigator */}
        <div>
          <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
            Recorded By
          </span>

          <p className="text-[11px] font-medium text-slate-700 mt-1">
            {investigator}
          </p>
        </div>

        {/* ===================================================
            SHA-256 HASH
        ==================================================== */}

        <div
          className="
            bg-slate-50
            border
            border-slate-200
            rounded-xl
            p-3
          "
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className="
                flex
                items-center
                gap-1.5
                text-[9px]
                uppercase
                tracking-wider
                font-semibold
                text-slate-500
              "
            >
              <Hash size={12} className="text-blue-600" />
              SHA-256 Checksum
            </span>

            <button
              type="button"
              onClick={handleCopyHash}
              className="
                inline-flex
                items-center
                gap-1
                text-[10px]
                font-semibold
                text-slate-500
                hover:text-blue-700
                transition-colors
              "
              title="Copy full SHA-256 hash"
            >
              {copied ? (
                <>
                  <CheckCircle2
                    size={11}
                    className="text-emerald-600"
                  />
                  <span className="text-emerald-700">
                    Copied
                  </span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  Copy
                </>
              )}
            </button>
          </div>

          <p
            className="
              mt-2
              font-mono
              text-[10px]
              font-semibold
              text-slate-700
              tracking-wide
              break-all
            "
            title={hash}
          >
            {truncatedHash}
          </p>
        </div>

        {/* FIR Reference */}
        <div className="pb-4">
          <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
            FIR Reference
          </span>

          <p className="text-[11px] font-semibold text-slate-700 mt-1">
            {firNo}
          </p>
        </div>
      </div>

      {/* =====================================================
          FOOTER ACTIONS
      ====================================================== */}

      <div
        className="
          mt-auto
          border-t
          border-slate-100
          bg-slate-50/60
          px-5
          py-3
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div className="flex items-center gap-2">
          {/* Download */}
          <button
            type="button"
            onClick={() =>
              onDownload && onDownload(id)
            }
            className="
              inline-flex
              items-center
              gap-1.5
              px-3
              py-1.5
              rounded-lg
              bg-white
              border
              border-slate-200
              text-slate-700
              hover:border-blue-300
              hover:text-blue-700
              text-[10px]
              font-semibold
              transition-colors
            "
          >
            <Download size={12} />
            Download
          </button>

          {/* Verify */}
          {onVerify && (
            <button
              type="button"
              onClick={() => onVerify(id)}
              className="
                inline-flex
                items-center
                gap-1
                px-2
                py-1.5
                rounded-lg
                text-[10px]
                font-semibold
                text-slate-500
                hover:text-blue-700
                hover:bg-blue-50
                transition-colors
              "
            >
              <Shield size={12} />
              Verify
            </button>
          )}
        </div>

        {/* Case File */}
        <Link
          to={`/cases/${caseId}`}
          className="
            inline-flex
            items-center
            gap-1
            text-[10px]
            font-semibold
            text-blue-700
            hover:text-blue-800
            transition-colors
            whitespace-nowrap
          "
        >
          Case File
          <ExternalLink size={11} />
        </Link>
      </div>
    </article>
  );
}