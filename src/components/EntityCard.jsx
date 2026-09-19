import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Phone,
  Building2,
  CreditCard,
  ChevronRight,
  ExternalLink,
  Lock,
  Radio,
  ShieldAlert,
} from 'lucide-react';

/**
 * EntityCard Props
 *
 * @param {Object} entity - Intelligence entity data object
 * @param {Function} [onSelect] - Optional click handler
 */
export default function EntityCard({ entity, onSelect }) {
  if (!entity) return null;

  const {
    id = 'ENT-801',
    name = 'Vikram "Raja" Malhotra',
    type = 'SUSPECT',
    role = 'Primary Kingpin / Syndicate Operative',
    firNo = 'FIR-2026-NCRB-9021',
    caseId = '26189-042',
    riskScore = 92,
    connectionsCount = 12,
    status = 'UNDER_SURVEILLANCE',
    primaryIdentifier = 'AADHAAR: XXXX-XXXX-9012',
    lastSeen = 'Sector 62, Noida',
  } = entity;

  /* -------------------------------------------------------
     Entity Type Configuration
  ------------------------------------------------------- */

  const getTypeConfig = () => {
    switch (type) {
      case 'SUSPECT':
        return {
          label: 'Suspect',
          icon: User,
          iconClasses: 'bg-red-50 text-red-600 border-red-200',
        };

      case 'PHONE':
        return {
          label: 'Phone',
          icon: Phone,
          iconClasses: 'bg-amber-50 text-amber-600 border-amber-200',
        };

      case 'ENTITY':
        return {
          label: 'Organization',
          icon: Building2,
          iconClasses: 'bg-violet-50 text-violet-600 border-violet-200',
        };

      case 'FINANCIAL':
        return {
          label: 'Financial',
          icon: CreditCard,
          iconClasses: 'bg-cyan-50 text-cyan-700 border-cyan-200',
        };

      default:
        return {
          label: 'Entity',
          icon: User,
          iconClasses: 'bg-slate-50 text-slate-600 border-slate-200',
        };
    }
  };

  /* -------------------------------------------------------
     Status Configuration
  ------------------------------------------------------- */

  const getStatusConfig = () => {
    switch (status) {
      case 'UNDER_SURVEILLANCE':
        return {
          label: 'Under Surveillance',
          icon: Radio,
          classes:
            'bg-red-50 text-red-700 border-red-200',
        };

      case 'FROZEN':
        return {
          label: 'Frozen',
          icon: Lock,
          classes:
            'bg-violet-50 text-violet-700 border-violet-200',
        };

      case 'DETAINED':
        return {
          label: 'Detained',
          icon: ShieldAlert,
          classes:
            'bg-amber-50 text-amber-700 border-amber-200',
        };

      default:
        return {
          label: 'Investigating',
          icon: ShieldAlert,
          classes:
            'bg-blue-50 text-blue-700 border-blue-200',
        };
    }
  };

  /* -------------------------------------------------------
     Risk Configuration
  ------------------------------------------------------- */

  const getRiskConfig = () => {
    if (riskScore >= 85) {
      return {
        label: 'High',
        text: 'text-red-700',
        bar: 'bg-red-500',
      };
    }

    if (riskScore >= 65) {
      return {
        label: 'Moderate',
        text: 'text-amber-700',
        bar: 'bg-amber-500',
      };
    }

    return {
      label: 'Low',
      text: 'text-emerald-700',
      bar: 'bg-emerald-500',
    };
  };

  const typeConfig = getTypeConfig();
  const statusConfig = getStatusConfig();
  const riskConfig = getRiskConfig();

  const TypeIcon = typeConfig.icon;
  const StatusIcon = statusConfig.icon;

  return (
    <article
      onClick={() => onSelect && onSelect(entity)}
      className={`
        group
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
        ${onSelect ? 'cursor-pointer' : ''}
      `}
    >
      {/* ---------------------------------------------------
          Header
      --------------------------------------------------- */}

      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* Entity Icon */}
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
                ${typeConfig.iconClasses}
              `}
            >
              <TypeIcon size={18} strokeWidth={2} />
            </div>

            {/* Entity Identity */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-semibold tracking-wide text-blue-700">
                  {id}
                </span>

                <span className="text-[10px] text-slate-400">
                  {typeConfig.label}
                </span>
              </div>

              <h3
                className="
                  text-sm
                  font-bold
                  text-slate-900
                  leading-5
                  tracking-tight
                  truncate
                "
                title={name}
              >
                {name}
              </h3>
            </div>
          </div>

          {/* Status */}
          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              px-2
              py-1
              rounded-md
              border
              text-[9px]
              font-semibold
              uppercase
              tracking-wide
              whitespace-nowrap
              ${statusConfig.classes}
            `}
          >
            <StatusIcon size={10} />
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* ---------------------------------------------------
          Entity Details
      --------------------------------------------------- */}

      <div className="px-5 space-y-3">
        {/* Role */}
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
            Role / Classification
          </p>

          <p className="text-xs font-medium text-slate-700 leading-5">
            {role}
          </p>
        </div>

        {/* Primary Identifier */}
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
          <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
            Primary Identification
          </p>

          <p
            className="
              mt-1
              text-[11px]
              font-semibold
              font-mono
              text-slate-700
              break-all
            "
          >
            {primaryIdentifier}
          </p>
        </div>

        {/* Risk + Connections */}
        <div className="grid grid-cols-2 gap-3">
          {/* Risk */}
          <div
            className="
              border
              border-slate-200
              rounded-xl
              px-3
              py-2.5
              bg-white
            "
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-medium text-slate-500">
                Risk Score
              </span>

              <span
                className={`text-[10px] font-semibold ${riskConfig.text}`}
              >
                {riskConfig.label}
              </span>
            </div>

            <div className="flex items-end gap-1 mt-1">
              <span
                className={`text-base font-bold font-mono ${riskConfig.text}`}
              >
                {riskScore}
              </span>

              <span className="text-[10px] text-slate-400 mb-0.5">
                / 100
              </span>
            </div>

            <div className="h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${riskConfig.bar}`}
                style={{
                  width: `${Math.min(Math.max(riskScore, 0), 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Network */}
          <div
            className="
              border
              border-slate-200
              rounded-xl
              px-3
              py-2.5
              bg-white
            "
          >
            <span className="text-[10px] font-medium text-slate-500">
              Graph Links
            </span>

            <div className="flex items-end gap-1 mt-1">
              <span className="text-base font-bold font-mono text-slate-800">
                {connectionsCount}
              </span>

              <span className="text-[10px] text-slate-400 mb-0.5">
                connections
              </span>
            </div>

            <div className="text-[10px] text-slate-400 mt-2">
              Related entities
            </div>
          </div>
        </div>

        {/* Case Context */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <div>
            <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
              Case
            </p>

            <p className="text-[11px] font-semibold text-slate-700 mt-1">
              {caseId}
            </p>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
              FIR
            </p>

            <p
              className="text-[11px] font-semibold text-slate-700 mt-1 truncate"
              title={firNo}
            >
              {firNo}
            </p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------
          Footer
      --------------------------------------------------- */}

      <div
        className="
          mt-auto
          border-t
          border-slate-100
          px-5
          py-3
          bg-slate-50/60
        "
      >
        {/* Last Seen */}
        {lastSeen && (
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="text-[10px] text-slate-400">
              Last observed
            </span>

            <span
              className="
                text-[10px]
                font-medium
                text-slate-600
                truncate
                text-right
              "
              title={lastSeen}
            >
              {lastSeen}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <Link
            to={`/entities/${id}`}
            onClick={(event) => event.stopPropagation()}
            className="
              inline-flex
              items-center
              gap-1.5
              text-[11px]
              font-semibold
              text-slate-600
              hover:text-blue-700
              transition-colors
            "
          >
            View Dossier
            <ExternalLink size={12} />
          </Link>

          <Link
            to={`/network?node=${id}`}
            onClick={(event) => event.stopPropagation()}
            className="
              inline-flex
              items-center
              gap-1
              px-2.5
              py-1.5
              rounded-lg
              bg-blue-600
              hover:bg-blue-700
              text-white
              text-[10px]
              font-semibold
              transition-colors
            "
          >
            Inspect Graph
            <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}