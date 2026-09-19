import React, { useState } from 'react';
import {
  Search,
  Bell,
  Shield,
  ChevronDown,
  Sparkles,
  Lock,
  Terminal,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function Navbar({ onSearchClick }) {
  const [showAlerts, setShowAlerts] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Prototype notification feed.
  // Replace with backend/API data when the alert service is connected.
  const topAlerts = [
    {
      id: 1,
      text: 'Circular Money Flow detected: ₹42L looped in Case #26189',
      time: '12m ago',
      level: 'CRITICAL',
    },
    {
      id: 2,
      text: '47 calls in 2h detected for High-Risk SIM +91 98765 43210',
      time: '45m ago',
      level: 'HIGH',
    },
    {
      id: 3,
      text: 'New FIR Document EV-9021 marked for integrity verification',
      time: '1h ago',
      level: 'INFO',
    },
  ];

  const getAlertClasses = (level) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-50 text-red-700 border-red-200';

      case 'HIGH':
        return 'bg-amber-50 text-amber-700 border-amber-200';

      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-16
        bg-white/95
        backdrop-blur-sm
        border-b
        border-slate-200
        px-4
        sm:px-6
        flex
        items-center
        justify-between
        gap-4
        font-sans
      "
    >
      {/* =====================================================
          LEFT — GLOBAL SEARCH
      ====================================================== */}

      <div className="flex items-center gap-4 flex-1 max-w-2xl min-w-0">
        <button
          type="button"
          onClick={onSearchClick}
          className="
            w-full
            flex
            items-center
            gap-3
            bg-slate-50
            border
            border-slate-200
            hover:border-blue-300
            hover:bg-white
            px-3.5
            py-2
            rounded-xl
            text-xs
            text-slate-500
            text-left
            cursor-pointer
            transition-colors
            shadow-sm
            group
          "
          aria-label="Open global search"
        >
          <Search
            size={16}
            className="
              text-slate-400
              group-hover:text-blue-600
              transition-colors
              shrink-0
            "
          />

          <span className="flex-1 truncate">
            Search entities, CDRs, phone numbers, FIRs or ask AI:{' '}
            <span className="text-slate-400 italic">
              "Find associates of Person A"
            </span>
          </span>

          <div
            className="
              hidden
              sm:flex
              items-center
              gap-1
              bg-white
              border
              border-slate-200
              px-1.5
              py-0.5
              rounded-md
              text-[9px]
              font-mono
              text-slate-400
              shrink-0
            "
          >
            <span>Ctrl</span>
            <span>K</span>
          </div>
        </button>
      </div>

      {/* =====================================================
          RIGHT — STATUS / ALERTS / AI / PROFILE
      ====================================================== */}

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">

        {/* ---------------------------------------------------
            Workspace Status
        --------------------------------------------------- */}

        <div
          className="
            hidden
            xl:flex
            items-center
            gap-2
            bg-slate-50
            border
            border-slate-200
            px-3
            py-1.5
            rounded-lg
            text-[10px]
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-emerald-500
              shrink-0
            "
          />

          <span className="text-slate-500 font-medium">
            Investigation Workspace
          </span>

          <span className="text-slate-300">
            |
          </span>

          <span className="text-emerald-700 font-semibold">
            READY
          </span>
        </div>

        {/* ---------------------------------------------------
            Alerts
        --------------------------------------------------- */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowAlerts((prev) => !prev);
              setShowProfileMenu(false);
            }}
            className="
              relative
              w-9
              h-9
              rounded-lg
              bg-white
              border
              border-slate-200
              flex
              items-center
              justify-center
              text-slate-500
              hover:text-blue-700
              hover:border-blue-200
              hover:bg-blue-50
              transition-colors
            "
            title="Investigation alerts"
            aria-label="Open investigation alerts"
            aria-expanded={showAlerts}
          >
            <Bell size={17} />

            <span
              className="
                absolute
                -top-1
                -right-1
                min-w-4
                h-4
                px-1
                rounded-full
                bg-red-600
                text-white
                font-bold
                text-[8px]
                flex
                items-center
                justify-center
                border-2
                border-white
              "
            >
              3
            </span>
          </button>

          {/* Alerts Dropdown */}
          {showAlerts && (
            <div
              className="
                absolute
                right-0
                mt-2
                w-[min(20rem,calc(100vw-2rem))]
                bg-white
                border
                border-slate-200
                rounded-xl
                shadow-xl
                z-50
                overflow-hidden
              "
            >
              {/* Header */}
              <div
                className="
                  px-3.5
                  py-3
                  border-b
                  border-slate-200
                  bg-slate-50
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >
                <div className="flex items-center gap-2">
                  <div
                    className="
                      w-7
                      h-7
                      rounded-lg
                      bg-amber-50
                      border
                      border-amber-200
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <AlertTriangle
                      size={14}
                      className="text-amber-700"
                    />
                  </div>

                  <div>
                    <p
                      className="
                        text-[10px]
                        font-bold
                        text-slate-800
                        uppercase
                        tracking-wide
                      "
                    >
                      Unreviewed Alerts
                    </p>

                    <p className="text-[9px] text-slate-400 mt-0.5">
                      Investigation notification feed
                    </p>
                  </div>
                </div>

                <a
                  href="/alerts"
                  className="
                    text-[10px]
                    font-semibold
                    text-blue-700
                    hover:text-blue-800
                    hover:underline
                    shrink-0
                  "
                >
                  View All
                </a>
              </div>

              {/* Alert List */}
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {topAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="
                      px-3.5
                      py-3
                      hover:bg-slate-50
                      transition-colors
                    "
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`
                          text-[8px]
                          font-bold
                          px-1.5
                          py-0.5
                          rounded-md
                          border
                          ${getAlertClasses(alert.level)}
                        `}
                      >
                        {alert.level}
                      </span>

                      <span className="text-[9px] text-slate-400">
                        {alert.time}
                      </span>
                    </div>

                    <p
                      className="
                        text-[11px]
                        text-slate-700
                        leading-4
                      "
                    >
                      {alert.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="
                  px-3
                  py-2.5
                  border-t
                  border-slate-200
                  bg-slate-50
                  flex
                  items-center
                  justify-center
                  gap-1.5
                "
              >
                <CheckCircle2
                  size={11}
                  className="text-emerald-600"
                />

                <span className="text-[9px] text-slate-500">
                  Prototype notification feed
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ---------------------------------------------------
            AI Copilot
        --------------------------------------------------- */}

        <a
          href="/intelligence"
          className="
            hidden
            sm:flex
            items-center
            gap-1.5
            bg-blue-600
            hover:bg-blue-700
            border
            border-blue-600
            px-3
            py-1.5
            rounded-lg
            text-[11px]
            font-semibold
            text-white
            transition-colors
            shadow-sm
          "
        >
          <Sparkles size={13} />
          <span>AI Copilot</span>
        </a>

        {/* ---------------------------------------------------
            User Profile
        --------------------------------------------------- */}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfileMenu((prev) => !prev);
              setShowAlerts(false);
            }}
            className="
              flex
              items-center
              gap-2
              bg-white
              border
              border-slate-200
              hover:border-slate-300
              hover:bg-slate-50
              pl-1.5
              pr-2.5
              py-1.5
              rounded-xl
              transition-colors
            "
            aria-label="Open officer profile"
            aria-expanded={showProfileMenu}
          >
            {/* Avatar */}
            <div
              className="
                h-7
                w-7
                rounded-lg
                bg-blue-50
                border
                border-blue-100
                flex
                items-center
                justify-center
                font-bold
                text-[10px]
                text-blue-700
              "
            >
              VK
            </div>

            {/* Identity */}
            <div className="text-left hidden md:block">
              <p
                className="
                  text-[11px]
                  font-bold
                  text-slate-800
                  leading-none
                "
              >
                Officer V. Kumar
              </p>

              <p
                className="
                  text-[9px]
                  text-slate-500
                  mt-1
                  leading-none
                "
              >
                Investigation Officer
              </p>
            </div>

            <ChevronDown
              size={13}
              className="
                text-slate-400
                ml-0.5
              "
            />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div
              className="
                absolute
                right-0
                mt-2
                w-60
                bg-white
                border
                border-slate-200
                rounded-xl
                shadow-xl
                z-50
                p-2
                text-xs
              "
            >
              {/* Profile Header */}
              <div
                className="
                  p-3
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-lg
                  mb-1
                "
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      h-9
                      w-9
                      rounded-lg
                      bg-blue-50
                      border
                      border-blue-100
                      flex
                      items-center
                      justify-center
                      text-blue-700
                      font-bold
                      text-xs
                    "
                  >
                    VK
                  </div>

                  <div>
                    <p className="font-bold text-slate-800">
                      Officer V. Kumar
                    </p>

                    <p className="text-[9px] text-slate-500 mt-0.5">
                      Senior Cyber Crime Analyst
                    </p>
                  </div>
                </div>

                <div
                  className="
                    mt-3
                    pt-2
                    border-t
                    border-slate-200
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span className="text-[9px] text-slate-400">
                    Officer ID
                  </span>

                  <span
                    className="
                      text-[9px]
                      font-mono
                      font-semibold
                      text-slate-600
                    "
                  >
                    NCRB-INV-2026-904
                  </span>
                </div>
              </div>

              {/* Security */}
              <a
                href="/settings"
                className="
                  flex
                  items-center
                  gap-2.5
                  px-3
                  py-2.5
                  rounded-lg
                  text-slate-600
                  hover:text-blue-700
                  hover:bg-blue-50
                  transition-colors
                "
              >
                <Shield
                  size={14}
                  className="text-blue-600"
                />

                <span>Security Credentials</span>
              </a>

              {/* Audit */}
              <a
                href="/reports"
                className="
                  flex
                  items-center
                  gap-2.5
                  px-3
                  py-2.5
                  rounded-lg
                  text-slate-600
                  hover:text-blue-700
                  hover:bg-blue-50
                  transition-colors
                "
              >
                <Terminal
                  size={14}
                  className="text-indigo-600"
                />

                <span>Audit Logs & Activity</span>
              </a>

              {/* Logout */}
              <div
                className="
                  border-t
                  border-slate-200
                  pt-1
                  mt-1
                "
              >
                <a
                  href="/login"
                  className="
                    flex
                    items-center
                    gap-2.5
                    px-3
                    py-2.5
                    rounded-lg
                    text-red-600
                    hover:bg-red-50
                    transition-colors
                    font-semibold
                  "
                >
                  <Lock size={14} />
                  <span>Lock / Logout Session</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}