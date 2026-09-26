import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  GitFork,
  FileCheck2,
  Clock,
  AlertTriangle,
  Bot,
  FileSpreadsheet,
  Settings,
  Shield,
  LogOut,
  Radio,
  FileText,
  LineChart,
  Globe,
  Map
} from 'lucide-react';

export default function Sidebar({
  collapsed = false,
  setCollapsed
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Case Management',
      path: '/cases',
      icon: Briefcase,
      badge: '142',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      name: 'Entity Intelligence',
      path: '/entities',
      icon: Users
    },
    {
      name: 'Network Intelligence',
      path: '/network',
      icon: GitFork,
      badge: 'Graph',
      badgeColor: 'bg-violet-50 text-violet-700 border-violet-200'
    },
    {
      name: 'Evidence & Vault',
      path: '/evidence',
      icon: FileCheck2,
      badge: 'Integrity',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      name: 'Timeline & Events',
      path: '/timeline',
      icon: Clock
    },
    {
      name: 'Alerts & Anomalies',
      path: '/alerts',
      icon: AlertTriangle,
      badge: '07',
      badgeColor: 'bg-red-50 text-red-700 border-red-200'
    },
    {
      name: 'Intelligence & AI',
      path: '/intelligence',
      icon: Bot,
      badge: 'AI',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },

    // --- SIH 26189 MODULES ---
    {
      name: 'Document Processor',
      path: '/document-processor',
      icon: FileText,
      badge: 'NEW',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      name: 'Financial Intel',
      path: '/financial-intelligence',
      icon: LineChart,
      badge: 'NEW',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      name: 'OSINT & Social',
      path: '/osint',
      icon: Globe,
      badge: 'NEW',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      name: 'Geospatial Intel',
      path: '/geospatial',
      icon: Map,
      badge: 'NEW',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    // -------------------------

    {
      name: 'Reports & Audit',
      path: '/reports',
      icon: FileSpreadsheet
    }
  ];

  const isRouteActive = (path) => {
    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userBadge');
    navigate('/login');
  };

  return (
    <aside
      className={`
        fixed
        top-0
        left-0
        z-40
        h-screen
        flex
        flex-col
        bg-white
        border-r
        border-slate-200
        shadow-[1px_0_8px_rgba(15,23,42,0.03)]
        transition-all
        duration-300
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >

      {/* =====================================================
          BRAND
      ====================================================== */}
      <div
        className={`
          h-[68px]
          shrink-0
          border-b
          border-slate-200
          flex
          items-center
          ${collapsed ? 'justify-center px-3' : 'px-4'}
        `}
      >
        <div className="flex items-center gap-3 min-w-0">

          {/* Brand Mark */}
          <div
            className="
              h-9
              w-9
              shrink-0
              rounded-lg
              bg-blue-600
              flex
              items-center
              justify-center
              shadow-sm
            "
          >
            <Shield
              size={19}
              strokeWidth={1.9}
              className="text-white"
            />
          </div>

          {!collapsed && (
            <div className="min-w-0">

              <div className="flex items-center gap-1.5">
                <span
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  MHA · NCRB
                </span>

                <span
                  className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-emerald-500
                  "
                />
              </div>

              <h2
                className="
                  text-[14px]
                  font-bold
                  tracking-tight
                  text-slate-900
                  leading-tight
                "
              >
                CrimeGraph{' '}
                <span className="text-blue-600">
                  AI
                </span>
              </h2>

              <p
                className="
                  text-[8px]
                  text-slate-400
                  mt-0.5
                  truncate
                "
              >
                Women Safety Division
              </p>

            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="flex flex-col flex-1 min-h-0">

        {/* Workspace Context */}
        {!collapsed && (
          <div className="px-3 pt-2.5">

            <div
              className="
                flex
                items-center
                justify-between
                gap-2
                px-3
                py-2
                rounded-lg
                bg-slate-50
                border
                border-slate-200
              "
            >
              <div className="flex items-center gap-2 min-w-0">

                <Radio
                  size={13}
                  className="text-emerald-600 shrink-0"
                />

                <div className="min-w-0">

                  <p
                    className="
                      text-[9px]
                      font-semibold
                      text-slate-700
                      leading-none
                    "
                  >
                    Workspace Context
                  </p>

                  <p
                    className="
                      text-[8px]
                      text-slate-400
                      mt-1
                      truncate
                    "
                  >
                    Investigation workspace
                  </p>

                </div>
              </div>

              <span
                className="
                  shrink-0
                  px-1.5
                  py-0.5
                  rounded
                  bg-white
                  border
                  border-slate-200
                  text-[8px]
                  font-mono
                  font-semibold
                  text-slate-600
                "
              >
                26189
              </span>

            </div>
          </div>
        )}

        {/* Collapsed Context Indicator */}
        {collapsed && (
          <div className="flex justify-center pt-2.5">
            <div
              title="Investigation workspace · Case 26189"
              className="
                w-8
                h-8
                rounded-lg
                bg-slate-50
                border
                border-slate-200
                flex
                items-center
                justify-center
              "
            >
              <Radio
                size={14}
                className="text-emerald-600"
              />
            </div>
          </div>
        )}

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <nav
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-2.5
            py-2.5
            space-y-0.5
            custom-scrollbar
          "
          aria-label="Primary navigation"
        >

          {!collapsed && (
            <p
              className="
                px-2
                pb-1.5
                text-[8px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-slate-400
              "
            >
              Investigation
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isRouteActive(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                title={collapsed ? item.name : undefined}
                className={`
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  gap-2
                  rounded-lg
                  transition-all
                  duration-150

                  ${
                    collapsed
                      ? 'px-2.5 py-2 justify-center'
                      : 'px-2.5 py-1.5'
                  }

                  ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }
                `}
              >

                {/* Active Indicator */}
                {isActive && (
                  <span
                    className="
                      absolute
                      left-0
                      top-1.5
                      bottom-1.5
                      w-0.5
                      rounded-r-full
                      bg-blue-600
                    "
                  />
                )}

                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    min-w-0
                  "
                >

                  {/* Icon */}
                  <div
                    className={`
                      w-7
                      h-7
                      rounded-md
                      flex
                      items-center
                      justify-center
                      shrink-0
                      transition

                      ${
                        isActive
                          ? 'bg-white border border-blue-100'
                          : 'bg-transparent group-hover:bg-white'
                      }
                    `}
                  >
                    <Icon
                      size={15}
                      strokeWidth={isActive ? 2 : 1.8}
                      className={
                        isActive
                          ? 'text-blue-600'
                          : 'text-slate-400 group-hover:text-slate-600'
                      }
                    />
                  </div>

                  {/* Label */}
                  {!collapsed && (
                    <span
                      className={`
                        truncate
                        text-[11px]
                        leading-none

                        ${
                          isActive
                            ? 'font-semibold'
                            : 'font-medium'
                        }
                      `}
                    >
                      {item.name}
                    </span>
                  )}

                </div>

                {/* Badge */}
                {!collapsed && item.badge && (
                  <span
                    className={`
                      shrink-0
                      text-[8px]
                      px-1.5
                      py-0.5
                      rounded
                      border
                      font-semibold
                      leading-none
                      ${item.badgeColor}
                    `}
                  >
                    {item.badge}
                  </span>
                )}

              </NavLink>
            );
          })}

        </nav>

        {/* =====================================================
            FOOTER / SETTINGS
        ====================================================== */}
        <div
          className="
            shrink-0
            p-2.5
            border-t
            border-slate-200
            bg-slate-50/70
          "
        >

          {/* Settings */}
          <NavLink
            to="/settings"
            title={collapsed ? 'System Settings' : undefined}
            className={({ isActive }) =>
              `
                flex
                items-center
                gap-2.5
                rounded-lg
                text-[11px]
                transition

                ${
                  collapsed
                    ? 'justify-center px-2.5 py-2'
                    : 'px-2.5 py-1.5'
                }

                ${
                  isActive
                    ? 'bg-white border border-slate-200 text-blue-700 shadow-sm'
                    : 'text-slate-500 hover:bg-white hover:text-slate-800'
                }
              `
            }
          >

            <Settings
              size={15}
              className="text-slate-500 shrink-0"
            />

            {!collapsed && (
              <span className="font-medium">
                System Settings
              </span>
            )}

          </NavLink>

          {/* User Profile */}
          <div
            className="
              mt-1.5
              pt-2
              border-t
              border-slate-200
              flex
              items-center
              justify-between
              gap-2
            "
          >

            <div
              className={`
                flex
                items-center
                gap-2
                min-w-0
                ${collapsed ? 'justify-center w-full' : ''}
              `}
            >

              {/* Avatar */}
              <div
                className="
                  h-7
                  w-7
                  rounded-full
                  bg-blue-50
                  border
                  border-blue-100
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <span
                  className="
                    text-[9px]
                    font-bold
                    text-blue-700
                  "
                >
                  INV
                </span>
              </div>

              {!collapsed && (
                <div className="min-w-0">

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      text-slate-800
                      truncate
                    "
                  >
                    Officer V. Kumar
                  </p>

                  <p
                    className="
                      text-[8px]
                      text-slate-400
                      truncate
                      mt-0.5
                    "
                  >
                    Senior Investigator · Level 4
                  </p>

                </div>
              )}

            </div>

            {!collapsed && (
              <button
                type="button"
                title="Logout Session"
                aria-label="Logout Session"
                onClick={handleLogout}
                className="
                  p-1.5
                  rounded-lg
                  text-slate-400
                  hover:text-red-600
                  hover:bg-red-50
                  transition
                  shrink-0
                "
              >
                <LogOut size={14} />
              </button>
            )}

          </div>
        </div>

      </div>
    </aside>
  );
}