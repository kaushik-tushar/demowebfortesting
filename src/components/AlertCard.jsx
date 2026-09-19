import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ShieldAlert,
  Phone,
  CreditCard,
  Radio,
  FileCheck2,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  MapPin,
  Lock,
} from 'lucide-react';

/**
 * AlertCard
 *
 * Displays a single investigation alert in the case workspace.
 *
 * @param {Object} alert - Threat / anomaly alert object
 * @param {Function} onAcknowledge - Callback when alert is reviewed
 * @param {Function} onDismiss - Callback when alert is dismissed
 */
export default function AlertCard({
  alert,
  onAcknowledge,
  onDismiss,
}) {
  if (!alert) return null;

  const {
    id = 'ALT-2026-001',
    type = 'CDR_SPIKE',
    severity = 'HIGH',
    title = 'Suspicious CDR Call Pattern Detected',
    description =
      'Burner SIM (+91 98210-XXXXX) initiated 14 consecutive calls to a monitored node during midnight hours.',
    timestamp = '12 Jan 2026, 02:14:22 IST',
    location = 'Sector 62 Tower Dump Node, Noida',
    firNo = 'FIR-2026-NCRB-9021',
    caseId = '26189-042',
    acknowledged = false,
  } = alert;

  /* -------------------------------------------------------
     Alert Type Configuration
  ------------------------------------------------------- */

  const getAlertTypeConfig = () => {
    switch (type) {
      case 'CDR_SPIKE':
        return {
          label: 'CDR Anomaly',
          icon: Phone,
          iconClasses: 'bg-amber-50 text-amber-700 border-amber-200',
        };

      case 'FINANCIAL_WIRE':
        return {
          label: 'Financial Activity',
          icon: CreditCard,
          iconClasses: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        };

      case 'TOWER_DUMP':
        return {
          label: 'Tower Intelligence',
          icon: Radio,
          iconClasses: 'bg-violet-50 text-violet-700 border-violet-200',
        };

      case 'UNAUTHORIZED_ACCESS':
        return {
          label: 'Access Anomaly',
          icon: Lock,
          iconClasses: 'bg-red-50 text-red-700 border-red-200',
        };

      default:
        return {
          label: 'Investigation Alert',
          icon: AlertTriangle,
          iconClasses: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  /* -------------------------------------------------------
     Severity Configuration
  ------------------------------------------------------- */

  const getSeverityConfig = () => {
    switch (severity) {
      case 'CRITICAL':
        return {
          label: 'Critical',
          icon: ShieldAlert,
          badgeClasses:
            'bg-red-50 text-red-700 border-red-200',
          accent: 'border-l-red-500',
        };

      case 'HIGH':
        return {
          label: 'High',
          icon: AlertTriangle,
          badgeClasses:
            'bg-amber-50 text-amber-700 border-amber-200',
          accent: 'border-l-amber-500',
        };

      case 'MEDIUM':
        return {
          label: 'Medium',
          icon: AlertTriangle,
          badgeClasses:
            'bg-blue-50 text-blue-700 border-blue-200',
          accent: 'border-l-blue-500',
        };

      default:
        return {
          label: 'Informational',
          icon: CheckCircle2,
          badgeClasses:
            'bg-slate-50 text-slate-600 border-slate-200',
          accent: 'border-l-slate-400',
        };
    }
  };

  const typeConfig = getAlertTypeConfig();
  const severityConfig = getSeverityConfig();

  const TypeIcon = typeConfig.icon;
  const SeverityIcon = severityConfig.icon;

  return (
    <article
      className={`
        bg-white
        border border-slate-200
        border-l-4 ${severityConfig.accent}
        rounded-2xl
        shadow-sm
        hover:shadow-md
        hover:border-slate-300
        transition-all duration-200
        overflow-hidden
      `}
    >
      {/* ---------------------------------------------------
          Header
      --------------------------------------------------- */}

      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            {/* Alert Type Icon */}
            <div
              className={`
                w-10 h-10
                rounded-xl
                border
                flex items-center justify-center
                shrink-0
                ${typeConfig.iconClasses}
              `}
            >
              <TypeIcon size={18} />
            </div>

            {/* Title + Metadata */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-mono text-[10px] font-bold text-slate-500">
                  {id}
                </span>

                <span className="text-slate-300">
                  •
                </span>

                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock size={11} />
                  {timestamp}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-5">
                {title}
              </h3>
            </div>
          </div>

          {/* Severity */}
          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              px-2.5
              py-1
              rounded-lg
              border
              text-[10px]
              font-bold
              uppercase
              tracking-wide
              whitespace-nowrap
              self-start
              ${severityConfig.badgeClasses}
            `}
          >
            <SeverityIcon size={12} />
            {severityConfig.label}
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------
          Body
      --------------------------------------------------- */}

      <div className="px-5 py-4">
        <p className="text-xs text-slate-600 leading-5 max-w-4xl">
          {description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
          {location && (
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
              <MapPin
                size={13}
                className="text-slate-400 shrink-0"
              />

              <span>{location}</span>
            </div>
          )}

          {firNo && (
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-600">
              <FileCheck2
                size={13}
                className="text-blue-600 shrink-0"
              />

              <span className="font-mono font-semibold">
                {firNo}
              </span>
            </div>
          )}

          {caseId && (
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="text-slate-300">
                |
              </span>

              <span>
                Case{' '}
                <span className="font-mono font-semibold text-slate-700">
                  #{caseId}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ---------------------------------------------------
          Footer
      --------------------------------------------------- */}

      <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Review State / Actions */}
          <div>
            {acknowledged ? (
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <CheckCircle2 size={14} />

                <span>
                  Reviewed by Duty Officer
                </span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onAcknowledge &&
                    onAcknowledge(id)
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    px-3
                    py-1.5
                    rounded-lg
                    bg-white
                    border border-slate-200
                    text-slate-700
                    hover:bg-slate-100
                    hover:border-slate-300
                    text-[11px]
                    font-semibold
                    transition
                    cursor-pointer
                  "
                >
                  <CheckCircle2
                    size={13}
                    className="text-emerald-600"
                  />

                  Mark Reviewed
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onDismiss &&
                    onDismiss(id)
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    px-2.5
                    py-1.5
                    rounded-lg
                    text-slate-500
                    hover:text-red-600
                    hover:bg-red-50
                    text-[11px]
                    font-semibold
                    transition
                    cursor-pointer
                  "
                >
                  <XCircle size={13} />

                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* Case Navigation */}
          <Link
            to={`/cases/${caseId}`}
            className="
              inline-flex
              items-center
              justify-center
              gap-1.5
              px-3
              py-1.5
              rounded-lg
              bg-blue-50
              border border-blue-100
              text-blue-700
              hover:bg-blue-100
              hover:border-blue-200
              text-[11px]
              font-bold
              transition
              whitespace-nowrap
            "
          >
            Inspect Case File

            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}