import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

import {
  Shield,
  LayoutDashboard,
  Network,
  FolderArchive,
  FileText,
  LogOut,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Database,
  Users,
  Bot,
  Car,
  Clock,
  Settings,
  FileCheck2
} from 'lucide-react';

import { useAppStore } from '../store/appStore';

/**
 * Main application layout.
 *
 * Provides:
 * - Collapsible navigation sidebar
 * - Persistent officer session information
 * - Nested route rendering through <Outlet />
 *
 * Top investigation/status header intentionally removed.
 */
export default function MainLayout() {
  const navigate = useNavigate();

  const {
    officer,
    setOfficer,
    sidebarCollapsed,
    toggleSidebar
  } = useAppStore();

  /* ---------------------------------------------------------
     Logout
  --------------------------------------------------------- */

  const handleLogout = () => {
    setOfficer(null);

    localStorage.removeItem('tactical_auth_token');
    localStorage.removeItem('tactical_auth_user');

    // Also clear the RBAC session used by ProtectedRoute/Login.
    localStorage.removeItem('userRole');
    localStorage.removeItem('userBadge');

    navigate('/login');
  };

  /* ---------------------------------------------------------
     Navigation
  --------------------------------------------------------- */

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Entity Intelligence',
      path: '/entities',
      icon: Users
    },
    {
      label: 'Network Intelligence',
      path: '/network',
      icon: Network
    },
    {
      label: 'Case Management',
      path: '/cases',
      icon: FolderArchive
    },
    {
      label: 'User Management',
      path: '/usermanagement',
      icon: Users
    },
    {
      label: 'Intelligence & AI',
      path: '/intelligence',
      icon: Bot
    },
    {
      label: 'CDR Analysis',
      path: '/cdr-analysis',
      icon: Database
    },
    {
      label: 'Vehicle Management',
      path: '/vehicles',
      icon: Car
    },
    {
      label: 'Digital Evidence',
      path: '/evidence',
      icon: FileCheck2
    },
    {
      label: 'Reports & Audit',
      path: '/reports',
      icon: FileText
    },
    {
      label: 'Timeline',
      path: '/timeline',
      icon: Clock
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: Settings
    }
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f6f8fb] text-slate-900">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          relative
          z-30
          flex
          h-full
          shrink-0
          flex-col
          bg-white
          border-r
          border-slate-200
          shadow-[1px_0_8px_rgba(15,23,42,0.03)]
          transition-all
          duration-300
          ${
            sidebarCollapsed
              ? 'w-16'
              : 'w-64'
          }
        `}
      >

        {/* ---------------------------------------------------
            Brand Header
        ---------------------------------------------------- */}

        <div
          className={`
            flex
            h-16
            shrink-0
            items-center
            border-b
            border-slate-200
            ${
              sidebarCollapsed
                ? 'justify-center px-2'
                : 'justify-between px-4'
            }
          `}
        >
          <div className="flex items-center gap-3 min-w-0">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-blue-600
                shadow-sm
              "
            >
              <Shield
                className="text-white"
                size={19}
                strokeWidth={1.9}
              />
            </div>

            {!sidebarCollapsed && (
              <div className="min-w-0">
                <h1
                  className="
                    text-sm
                    font-bold
                    tracking-tight
                    text-slate-900
                  "
                >
                  CrimeGraph
                  <span className="text-blue-600">
                    {' '}AI
                  </span>
                </h1>

                <p
                  className="
                    mt-0.5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  Investigation Workspace
                </p>
              </div>
            )}
          </div>

          {/* Collapse Button */}

          <button
            type="button"
            onClick={toggleSidebar}
            className="
              hidden
              lg:flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              text-slate-400
              hover:bg-slate-100
              hover:text-slate-700
              transition
            "
            title={
              sidebarCollapsed
                ? 'Expand Sidebar'
                : 'Collapse Sidebar'
            }
            aria-label={
              sidebarCollapsed
                ? 'Expand Sidebar'
                : 'Collapse Sidebar'
            }
          >
            {sidebarCollapsed ? (
              <ChevronRight size={15} />
            ) : (
              <ChevronLeft size={15} />
            )}
          </button>
        </div>

        {/* ---------------------------------------------------
            Navigation
        ---------------------------------------------------- */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-2
            py-4
            custom-scrollbar
          "
          aria-label="Main navigation"
        >
          {!sidebarCollapsed && (
            <p
              className="
                px-3
                pb-2
                text-[9px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-slate-400
              "
            >
              Modules
            </p>
          )}

          <div className="space-y-0.5">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  title={
                    sidebarCollapsed
                      ? item.label
                      : undefined
                  }
                  className={({ isActive }) =>
                    `
                      group
                      relative
                      flex
                      items-center
                      rounded-lg
                      transition-all
                      duration-150

                      ${
                        sidebarCollapsed
                          ? 'justify-center px-2.5 py-3'
                          : 'gap-3 px-3 py-2.5'
                      }

                      ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}

                      {isActive && (
                        <span
                          className="
                            absolute
                            left-0
                            top-2
                            bottom-2
                            w-0.5
                            rounded-r-full
                            bg-blue-600
                          "
                        />
                      )}

                      <div
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          ${
                            isActive
                              ? 'bg-white border border-blue-100'
                              : 'group-hover:bg-white'
                          }
                        `}
                      >
                        <Icon
                          size={17}
                          strokeWidth={
                            isActive ? 2 : 1.8
                          }
                          className={
                            isActive
                              ? 'text-blue-600'
                              : 'text-slate-400 group-hover:text-slate-600'
                          }
                        />
                      </div>

                      {!sidebarCollapsed && (
                        <span
                          className={`
                            truncate
                            text-xs
                            ${
                              isActive
                                ? 'font-semibold'
                                : 'font-medium'
                            }
                          `}
                        >
                          {item.label}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}

          </div>
        </nav>

        {/* ---------------------------------------------------
            Officer Session
        ---------------------------------------------------- */}

        <div
          className="
            shrink-0
            border-t
            border-slate-200
            bg-slate-50/70
            p-3
          "
        >
          {!sidebarCollapsed ? (
            <div className="flex items-center justify-between gap-2">

              <div className="flex items-center gap-2.5 min-w-0">

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-blue-100
                    bg-blue-50
                  "
                >
                  <UserCheck
                    size={15}
                    className="text-blue-600"
                  />
                </div>

                <div className="min-w-0">

                  <p
                    className="
                      truncate
                      text-[11px]
                      font-semibold
                      text-slate-800
                    "
                  >
                    {officer?.name || 'Officer'}
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[9px]
                      font-mono
                      text-slate-400
                    "
                  >
                    {officer?.badgeNumber || 'Session active'}
                  </p>

                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                title="Logout Session"
                aria-label="Logout Session"
                className="
                  rounded-lg
                  p-1.5
                  text-slate-400
                  hover:bg-red-50
                  hover:text-red-600
                  transition
                "
              >
                <LogOut size={15} />
              </button>

            </div>
          ) : (

            <button
              type="button"
              onClick={handleLogout}
              title="Logout Session"
              aria-label="Logout Session"
              className="
                flex
                w-full
                justify-center
                rounded-lg
                p-2
                text-slate-400
                hover:bg-red-50
                hover:text-red-600
                transition
              "
            >
              <LogOut size={16} />
            </button>

          )}
        </div>

      </aside>

      {/* =====================================================
          MAIN WORKSPACE
      ====================================================== */}

      <main
        className="
          min-w-0
          flex-1
          h-full
          overflow-y-auto
          bg-[#f6f8fb]
          p-4
          sm:p-5
          lg:p-6
        "
      >
        <div className="mx-auto w-full max-w-[1800px]">
          <Outlet />
        </div>
      </main>

    </div>
  );
}