import React, { useMemo, useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  ShieldCheck,
  ShieldAlert,
  LockKeyhole,
  Building2,
  Clock3,
  KeyRound,
  UserX,
  UserCheck,
  X,
  CheckCircle2,
  AlertTriangle,
  Mail,
  BadgeCheck,
  RefreshCw
} from 'lucide-react';

export default function UserManagement() {
  // ---------------------------------------------------------------------------
  // Demo users
  // These accounts are aligned with the hardcoded accounts used by Login.jsx.
  // ---------------------------------------------------------------------------
  const [users, setUsers] = useState([
    // Login.jsx — Admin
    {
      id: 'USR-ADMIN-001',
      badgeId: 'NCRB-ADMIN-001',
      name: 'System Administrator',
      email: 'admin@crimegraph.ai',
      role: 'Super Admin',
      precinct: 'Headquarters',
      status: 'Active',
      lastActive: 'Just now',
      accountType: 'Demo Login Account',
      password: 'AdminPassword2027!'
    },

    // Login.jsx — Officer
    {
      id: 'USR-OFFICER-8021',
      badgeId: 'NCRB-OFFICER-8021',
      name: 'Investigation Officer',
      email: 'officer@crimegraph.ai',
      role: 'Investigator',
      precinct: 'North Precinct',
      status: 'Active',
      lastActive: '12 mins ago',
      accountType: 'Demo Login Account',
      password: 'OfficerPassword2027!'
    },

    // Login.jsx — Analyst
    {
      id: 'USR-ANALYST-404',
      badgeId: 'NCRB-ANALYST-404',
      name: 'Intelligence Analyst',
      email: 'analyst@crimegraph.ai',
      role: 'Lead Analyst',
      precinct: 'Headquarters',
      status: 'Active',
      lastActive: '1 hour ago',
      accountType: 'Demo Login Account',
      password: 'AnalystPassword2027!'
    },

    // Login.jsx — Viewer
    {
      id: 'USR-VIEWER-999',
      badgeId: 'NCRB-VIEWER-999',
      name: 'Audit Viewer',
      email: 'viewer@crimegraph.ai',
      role: 'Viewer / Auditor',
      precinct: 'Headquarters',
      status: 'Active',
      lastActive: 'Yesterday',
      accountType: 'Demo Login Account',
      password: 'ViewerPassword2027!'
    },

    // Existing personnel
    {
      id: 'USR-005',
      badgeId: 'NCRB-OPS-005',
      name: 'Tushar Kaushik',
      email: 'tushar@crimegraph.ai',
      role: 'Super Admin',
      precinct: 'Headquarters',
      status: 'Active',
      lastActive: 'Just now',
      accountType: 'Personnel',
      password: 'EncryptedPassword@1'
    },
    {
      id: 'USR-006',
      badgeId: 'NCRB-OPS-006',
      name: 'Vikram Singh',
      email: 'vikram.s@police.gov.in',
      role: 'Lead Analyst',
      precinct: 'North Precinct',
      status: 'Active',
      lastActive: '12 mins ago',
      accountType: 'Personnel',
      password: 'EncryptedPassword@2'
    },
    {
      id: 'USR-007',
      badgeId: 'NCRB-OPS-007',
      name: 'Priya Sharma',
      email: 'priya.sharma@crimegraph.ai',
      role: 'Field Agent',
      precinct: 'East Precinct',
      status: 'Active',
      lastActive: '1 hour ago',
      accountType: 'Personnel',
      password: 'EncryptedPassword@3'
    },
    {
      id: 'USR-008',
      badgeId: 'NCRB-OPS-008',
      name: 'Ankit Verma',
      email: 'ankit.v@police.gov.in',
      role: 'Investigator',
      precinct: 'North Precinct',
      status: 'Suspended',
      lastActive: '3 days ago',
      accountType: 'Personnel',
      password: 'EncryptedPassword@4'
    },
    {
      id: 'USR-009',
      badgeId: 'NCRB-OPS-009',
      name: 'Neha Gupta',
      email: 'neha.g@crimegraph.ai',
      role: 'Viewer / Auditor',
      precinct: 'Headquarters',
      status: 'Active',
      lastActive: 'Yesterday',
      accountType: 'Personnel',
      password: 'EncryptedPassword@5'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState('');

  // New user form
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('Field Agent');
  const [newPrecinct, setNewPrecinct] = useState('North Precinct');

  // Password reset
  const [updatedPassword, setUpdatedPassword] = useState('');

  const showToast = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  // ---------------------------------------------------------------------------
  // Create user
  // ---------------------------------------------------------------------------
  const handleCreateUser = (e) => {
    e.preventDefault();

    if (
      !newName.trim() ||
      !newEmail.trim() ||
      !newPassword.trim()
    ) {
      showToast('Please complete all required fields.');
      return;
    }

    const newUser = {
      id: `USR-${String(Date.now()).slice(-6)}`,
      badgeId: `NCRB-OPS-${String(users.length + 1).padStart(3, '0')}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      precinct: newPrecinct,
      status: 'Active',
      lastActive: 'Never',
      accountType: 'Personnel',
      password: newPassword
    };

    setUsers((current) => [...current, newUser]);

    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewRole('Field Agent');
    setNewPrecinct('North Precinct');

    setIsModalOpen(false);

    showToast(`${newUser.name} was added to the personnel directory.`);
  };

  // ---------------------------------------------------------------------------
  // Activate / suspend
  // ---------------------------------------------------------------------------
  const handleToggleStatus = (id) => {
    setUsers((current) =>
      current.map((user) => {
        if (user.id !== id) return user;

        const nextStatus =
          user.status === 'Active' ? 'Suspended' : 'Active';

        showToast(
          `${user.name} is now ${nextStatus.toLowerCase()}.`
        );

        return {
          ...user,
          status: nextStatus
        };
      })
    );
  };

  // ---------------------------------------------------------------------------
  // Revoke
  // ---------------------------------------------------------------------------
  const handleDeleteUser = (id) => {
    const targetUser = users.find((user) => user.id === id);

    if (!targetUser) return;

    const confirmed = window.confirm(
      `Revoke access for ${targetUser.name}?`
    );

    if (!confirmed) return;

    setUsers((current) =>
      current.filter((user) => user.id !== id)
    );

    showToast(`${targetUser.name}'s access was revoked.`);
  };

  // ---------------------------------------------------------------------------
  // Password reset
  // ---------------------------------------------------------------------------
  const openResetModal = (user) => {
    setSelectedUser(user);
    setUpdatedPassword('');
    setIsResetModalOpen(true);
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();

    if (!updatedPassword.trim()) {
      showToast('Enter a new password.');
      return;
    }

    if (!selectedUser) return;

    setUsers((current) =>
      current.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              password: updatedPassword
            }
          : user
      )
    );

    setIsResetModalOpen(false);
    setUpdatedPassword('');

    showToast(
      `Password reset completed for ${selectedUser.name}.`
    );
  };

  // ---------------------------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------------------------
  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.precinct.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query) ||
        user.badgeId.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === 'ALL' || user.role === roleFilter;

      const matchesStatus =
        statusFilter === 'ALL' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const activeUsers = users.filter(
    (user) => user.status === 'Active'
  ).length;

  const suspendedUsers = users.filter(
    (user) => user.status === 'Suspended'
  ).length;

  const demoUsers = users.filter(
    (user) => user.accountType === 'Demo Login Account'
  ).length;

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans p-4 md:p-6">

      {/* ------------------------------------------------------------------ */}
      {/* Header                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-5 py-4 border-b border-slate-200">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">

            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-cyan-700">
                <ShieldCheck size={15} />
                Access Control Workspace
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                User & Access Management
              </h1>

              <p className="text-xs text-slate-500 mt-1">
                Manage personnel accounts, roles, precinct assignments,
                and access status.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition shadow-sm"
            >
              <UserPlus size={15} />
              Add New User
            </button>

          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">

          <SummaryItem
            icon={Users}
            label="Total Personnel"
            value={users.length}
          />

          <SummaryItem
            icon={UserCheck}
            label="Active"
            value={activeUsers}
            accent="emerald"
          />

          <SummaryItem
            icon={UserX}
            label="Suspended"
            value={suspendedUsers}
            accent="red"
          />

          <SummaryItem
            icon={BadgeCheck}
            label="Login Accounts"
            value={demoUsers}
            accent="cyan"
          />

        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Directory                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="mt-4 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Personnel Directory
              </h2>

              <p className="text-[11px] text-slate-500 mt-0.5">
                Search and manage system identities and assigned access.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">

              {/* Search */}
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-2.5 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search name, email, role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 h-9 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400"
                />
              </div>

              {/* Role */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-cyan-400"
              >
                <option value="ALL">All Roles</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Lead Analyst">Lead Analyst</option>
                <option value="Field Agent">Field Agent</option>
                <option value="Investigator">Investigator</option>
                <option value="Viewer / Auditor">Viewer / Auditor</option>
              </select>

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-cyan-400"
              >
                <option value="ALL">All Status</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>

            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
            <span>
              Showing{' '}
              <strong className="text-slate-600">
                {filteredUsers.length}
              </strong>{' '}
              of {users.length} accounts
            </span>

            {(searchTerm ||
              roleFilter !== 'ALL' ||
              statusFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('ALL');
                  setStatusFilter('ALL');
                }}
                className="inline-flex items-center gap-1 text-cyan-700 hover:text-cyan-800 font-semibold"
              >
                <RefreshCw size={11} />
                Reset filters
              </button>
            )}
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px] text-left border-collapse">

            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">

                <th className={thClass}>
                  Identity
                </th>

                <th className={thClass}>
                  Email
                </th>

                <th className={thClass}>
                  Role / Access
                </th>

                <th className={thClass}>
                  Precinct
                </th>

                <th className={thClass}>
                  Status
                </th>

                <th className={thClass}>
                  Last Active
                </th>

                <th className={`${thClass} text-right`}>
                  Actions
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/80 transition"
                >

                  {/* Identity */}
                  <td className="px-4 py-3">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        <Users
                          size={16}
                          className="text-slate-500"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">

                          <span className="font-semibold text-xs text-slate-900">
                            {user.name}
                          </span>

                          {user.accountType ===
                            'Demo Login Account' && (
                            <span className="px-1.5 py-0.5 rounded bg-cyan-50 border border-cyan-200 text-[9px] font-bold text-cyan-700">
                              LOGIN
                            </span>
                          )}

                        </div>

                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-[9px] text-slate-400">
                            {user.id}
                          </span>

                          <span className="text-slate-300">
                            •
                          </span>

                          <span className="font-mono text-[9px] text-slate-400">
                            {user.badgeId}
                          </span>
                        </div>
                      </div>

                    </div>

                  </td>

                  {/* Email */}
                  <td className="px-4 py-3">

                    <div className="flex items-center gap-2">
                      <Mail
                        size={13}
                        className="text-slate-400"
                      />

                      <span className="font-mono text-[11px] text-slate-600">
                        {user.email}
                      </span>
                    </div>

                  </td>

                  {/* Role */}
                  <td className="px-4 py-3">

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-700">
                      <LockKeyhole
                        size={11}
                        className="text-cyan-600"
                      />
                      {user.role}
                    </span>

                  </td>

                  {/* Precinct */}
                  <td className="px-4 py-3">

                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Building2
                        size={13}
                        className="text-slate-400"
                      />
                      {user.precinct}
                    </div>

                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">

                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-bold ${
                        user.status === 'Active'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-red-50 border-red-200 text-red-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'Active'
                            ? 'bg-emerald-500'
                            : 'bg-red-500'
                        }`}
                      />
                      {user.status}
                    </span>

                  </td>

                  {/* Last Active */}
                  <td className="px-4 py-3">

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Clock3 size={12} />
                      {user.lastActive}
                    </div>

                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">

                    <div className="flex items-center justify-end gap-1.5">

                      <button
                        onClick={() => openResetModal(user)}
                        title="Reset password"
                        className="px-2.5 py-1.5 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 text-[10px] font-semibold text-amber-700 transition"
                      >
                        Reset
                      </button>

                      <button
                        onClick={() =>
                          handleToggleStatus(user.id)
                        }
                        title={
                          user.status === 'Active'
                            ? 'Suspend user'
                            : 'Activate user'
                        }
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-semibold text-slate-600 transition"
                      >
                        {user.status === 'Active'
                          ? 'Suspend'
                          : 'Activate'}
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteUser(user.id)
                        }
                        title="Revoke access"
                        className="px-2.5 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-[10px] font-semibold text-red-700 transition"
                      >
                        Revoke
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-14 text-center"
                  >
                    <Search
                      size={22}
                      className="mx-auto text-slate-300"
                    />

                    <p className="text-sm font-semibold text-slate-700 mt-3">
                      No matching users
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Try changing the search or filter criteria.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>
          </table>

        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Add User Modal                                                     */}
      {/* ------------------------------------------------------------------ */}
      {isModalOpen && (
        <ModalOverlay onClose={() => setIsModalOpen(false)}>

          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">

            <ModalHeader
              icon={UserPlus}
              title="Provision New User"
              subtitle="Create a personnel account and assign initial access."
              onClose={() => setIsModalOpen(false)}
            />

            <form
              onSubmit={handleCreateUser}
              className="p-5 space-y-4"
            >

              <FormField label="Full Name" required>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Inspector Rajesh Kumar"
                  className={inputClass}
                />
              </FormField>

              <FormField label="Official Email" required>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@crimegraph.ai"
                  className={inputClass}
                />
              </FormField>

              <FormField label="Initial Password" required>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  placeholder="Set temporary password"
                  className={`${inputClass} font-mono`}
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <FormField label="Access Role">
                  <select
                    value={newRole}
                    onChange={(e) =>
                      setNewRole(e.target.value)
                    }
                    className={inputClass}
                  >
                    <option>Super Admin</option>
                    <option>Lead Analyst</option>
                    <option>Field Agent</option>
                    <option>Investigator</option>
                    <option>Viewer / Auditor</option>
                  </select>
                </FormField>

                <FormField label="Assigned Precinct">
                  <select
                    value={newPrecinct}
                    onChange={(e) =>
                      setNewPrecinct(e.target.value)
                    }
                    className={inputClass}
                  >
                    <option>Headquarters</option>
                    <option>North Precinct</option>
                    <option>East Precinct</option>
                    <option>South Zone</option>
                  </select>
                </FormField>

              </div>

              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3 flex gap-2.5">
                <ShieldCheck
                  size={16}
                  className="text-cyan-700 shrink-0 mt-0.5"
                />

                <p className="text-[10px] leading-5 text-cyan-900">
                  This frontend currently stores demo account state locally.
                  Connect account provisioning to your FastAPI authentication
                  and RBAC service for production use.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-1">

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                >
                  <UserPlus size={14} />
                  Provision User
                </button>

              </div>

            </form>
          </div>

        </ModalOverlay>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Reset Password Modal                                               */}
      {/* ------------------------------------------------------------------ */}
      {isResetModalOpen && selectedUser && (
        <ModalOverlay
          onClose={() => setIsResetModalOpen(false)}
        >

          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">

            <ModalHeader
              icon={KeyRound}
              title="Reset User Password"
              subtitle={selectedUser.name}
              onClose={() => setIsResetModalOpen(false)}
            />

            <form
              onSubmit={handleResetPasswordSubmit}
              className="p-5 space-y-4"
            >

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  Account
                </p>

                <p className="text-xs font-semibold text-slate-800 mt-1">
                  {selectedUser.email}
                </p>

                <p className="font-mono text-[10px] text-slate-400 mt-0.5">
                  {selectedUser.badgeId}
                </p>
              </div>

              <FormField label="New Password" required>
                <input
                  type="password"
                  required
                  autoFocus
                  value={updatedPassword}
                  onChange={(e) =>
                    setUpdatedPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  className={`${inputClass} font-mono`}
                />
              </FormField>

              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <AlertTriangle
                  size={15}
                  className="text-amber-600 mt-0.5 shrink-0"
                />

                <p className="text-[10px] text-amber-800 leading-5">
                  Password changes are simulated in this frontend. A
                  production implementation should update the password
                  through the backend authentication service.
                </p>
              </div>

              <div className="flex justify-end gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setIsResetModalOpen(false)
                  }
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
                >
                  <KeyRound size={14} />
                  Update Password
                </button>

              </div>

            </form>
          </div>

        </ModalOverlay>
      )}

      {/* Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-[80] max-w-sm bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-start gap-2.5">
          <CheckCircle2
            size={16}
            className="text-emerald-400 mt-0.5 shrink-0"
          />

          <span className="text-xs font-medium leading-5">
            {notification}
          </span>
        </div>
      )}

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable UI                                                                */
/* -------------------------------------------------------------------------- */

const thClass =
  'px-4 py-3 text-[9px] uppercase tracking-wider font-bold text-slate-400 whitespace-nowrap';

const inputClass =
  'w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400 transition';

function SummaryItem({
  icon: Icon,
  label,
  value,
  accent = 'slate'
}) {
  const accents = {
    slate: 'bg-slate-100 text-slate-600',
    cyan: 'bg-cyan-50 text-cyan-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    red: 'bg-red-50 text-red-700'
  };

  return (
    <div className="px-4 py-3.5 flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${accents[accent]}`}
      >
        <Icon size={16} />
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
          {label}
        </p>

        <p className="text-lg font-bold text-slate-900 mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );
}

function FormField({ label, required, children }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5">
        {label}
        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {children}
    </div>
  );
}

function ModalHeader({
  icon: Icon,
  title,
  subtitle,
  onClose
}) {
  return (
    <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between">

      <div className="flex items-start gap-3">

        <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
          <Icon size={17} className="text-cyan-700" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {title}
          </h3>

          <p className="text-[11px] text-slate-500 mt-0.5">
            {subtitle}
          </p>
        </div>

      </div>

      <button
        onClick={onClose}
        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
      >
        <X size={17} />
      </button>

    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}