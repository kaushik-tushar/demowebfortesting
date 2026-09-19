import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  Lock,
  Cpu,
  Radio,
  FileCheck2,
  Terminal,
  Activity,
  Database,
  ClipboardCheck,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-white border-t border-slate-200 text-slate-500 text-xs font-sans">

      {/* =====================================================
          SECURITY / WORKSPACE STATUS
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-6 py-4 border-b border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

          {/* Access Classification */}
          <div className="flex items-center gap-3">
            <div className="
              w-9 h-9
              rounded-lg
              bg-blue-50
              border border-blue-100
              text-blue-700
              flex items-center justify-center
              shrink-0
            ">
              <ShieldCheck size={18} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-slate-800">
                  RESTRICTED INVESTIGATION WORKSPACE
                </span>

                <span className="
                  px-1.5 py-0.5
                  rounded
                  bg-red-50
                  border border-red-200
                  text-red-700
                  text-[8px]
                  font-semibold
                  tracking-wide
                ">
                  AUTHORIZED USE
                </span>
              </div>

              <p className="text-[10px] text-slate-400 mt-0.5">
                Access should be limited to authorized investigation personnel.
              </p>
            </div>
          </div>

          {/* Workspace Status */}
          <div className="flex items-center justify-start md:justify-center">
            <div className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-lg
              bg-slate-50
              border border-slate-200
              text-[10px]
            ">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              <span className="font-semibold text-emerald-700">
                WORKSPACE READY
              </span>

              <span className="text-slate-300">
                |
              </span>

              <span className="text-slate-500">
                Local Prototype
              </span>
            </div>
          </div>

          {/* Evidence Integrity */}
          <div className="
            flex
            items-center
            justify-start
            md:justify-end
            gap-2
            text-[10px]
          ">
            <Lock size={13} className="text-blue-600" />

            <span className="text-slate-400">
              EVIDENCE INTEGRITY:
            </span>

            <span className="
              inline-flex
              items-center
              gap-1
              px-2
              py-0.5
              rounded
              bg-slate-50
              border border-slate-200
              text-slate-600
              font-semibold
            ">
              <ClipboardCheck size={11} />
              HASH WORKFLOW
            </span>
          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN FOOTER DIRECTORY
      ====================================================== */}

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-7
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-7
      ">

        {/* Platform */}
        <div className="space-y-2">
          <div className="
            flex
            items-center
            gap-2
            text-slate-900
            font-bold
            text-sm
            tracking-tight
          ">
            <div className="
              w-7 h-7
              rounded-md
              bg-blue-50
              border border-blue-100
              text-blue-700
              flex items-center justify-center
            ">
              <Shield size={15} />
            </div>

            <span>CRIMEGRAPH AI</span>
          </div>

          <p className="
            text-[10px]
            text-slate-400
            leading-relaxed
            max-w-xs
          ">
            Investigation workspace for connecting case records,
            digital evidence, communications data, financial activity,
            and entity relationships.
          </p>
        </div>

        {/* Core Modules */}
        <div>
          <span className="
            text-[9px]
            font-semibold
            text-slate-400
            uppercase
            tracking-wider
            block
            mb-3
          ">
            Investigation Modules
          </span>

          <ul className="space-y-2 text-[10px]">

            <li>
              <Link
                to="/cases"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-slate-500
                  hover:text-blue-700
                  transition-colors
                "
              >
                <FileCheck2
                  size={13}
                  className="text-slate-400 group-hover:text-blue-600"
                />
                Case & FIR Directory
              </Link>
            </li>

            <li>
              <Link
                to="/entities"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-slate-500
                  hover:text-blue-700
                  transition-colors
                "
              >
                <Terminal
                  size={13}
                  className="text-slate-400 group-hover:text-blue-600"
                />
                Entity Registry
              </Link>
            </li>

            <li>
              <Link
                to="/network"
                className="
                  group
                  flex
                  items-center
                  gap-2
                  text-slate-500
                  hover:text-blue-700
                  transition-colors
                "
              >
                <Activity
                  size={13}
                  className="text-slate-400 group-hover:text-blue-600"
                />
                Network Analysis
              </Link>
            </li>

          </ul>
        </div>

        {/* Forensic Utilities */}
        <div>
          <span className="
            text-[9px]
            font-semibold
            text-slate-400
            uppercase
            tracking-wider
            block
            mb-3
          ">
            Forensic Utilities
          </span>

          <ul className="space-y-2 text-[10px]">

            <li>
              <div className="
                flex
                items-center
                gap-2
                text-slate-500
              ">
                <Radio size={13} className="text-slate-400" />
                CDR & Tower Data
              </div>
            </li>

            <li>
              <div className="
                flex
                items-center
                gap-2
                text-slate-500
              ">
                <Cpu size={13} className="text-slate-400" />
                Financial Analysis
              </div>
            </li>

            <li>
              <div className="
                flex
                items-center
                gap-2
                text-slate-500
              ">
                <Database size={13} className="text-slate-400" />
                Evidence Repository
              </div>
            </li>

          </ul>
        </div>

        {/* Governance */}
        <div>
          <span className="
            text-[9px]
            font-semibold
            text-slate-400
            uppercase
            tracking-wider
            block
            mb-3
          ">
            Governance & Audit
          </span>

          <p className="
            text-[10px]
            text-slate-400
            leading-relaxed
          ">
            Investigation activity and evidence operations can be
            associated with audit records according to the configured
            access-control and integrity workflow.
          </p>

          <div className="
            mt-3
            inline-flex
            items-center
            gap-1.5
            px-2
            py-1
            rounded-md
            bg-slate-50
            border border-slate-200
            text-[9px]
            text-slate-500
            font-mono
          ">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            CrimeGraph AI · Prototype
          </div>
        </div>

      </div>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}

      <div className="
        border-t
        border-slate-100
        bg-slate-50/70
        px-6
        py-3.5
      ">
        <div className="
          max-w-7xl
          mx-auto
          flex
          flex-col
          sm:flex-row
          items-center
          justify-between
          gap-2
          text-[9px]
          text-slate-400
        ">

          <div>
            © {currentYear} CrimeGraph AI · Investigation Intelligence Workspace
          </div>

          <div className="
            flex
            items-center
            gap-3
            flex-wrap
            justify-center
          ">
            <span className="hover:text-slate-700 transition-colors cursor-pointer">
              Security Controls
            </span>

            <span className="text-slate-300">•</span>

            <span className="hover:text-slate-700 transition-colors cursor-pointer">
              Audit Records
            </span>

            <span className="text-slate-300">•</span>

            <span className="hover:text-slate-700 transition-colors cursor-pointer">
              Support
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
}