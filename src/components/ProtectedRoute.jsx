import React from 'react';
import { Navigate } from 'react-router-dom';

// Define exact permissions map matching the matrix
const ROLE_PERMISSIONS = {
  admin: ['*'], // Full access
  officer: ['/dashboard', '/cases', '/evidence', '/alerts', '/timeline', '/chat'],
  analyst: ['/dashboard', '/network', '/intelligence', '/entities', '/alerts', '/reports', '/chat'],
  viewer: ['/dashboard', '/alerts', '/reports']
};

export default function ProtectedRoute({ children, allowedRoutes }) {
  const userRole = localStorage.getItem('userRole') || 'viewer';

  // If admin, allow everything
  if (userRole === 'admin') {
    return children;
  }

  // Check if current user role has access
  const allowedList = ROLE_PERMISSIONS[userRole] || [];
  const hasAccess = allowedList.some(route => window.location.pathname.startsWith(route));

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl flex items-center justify-center mb-4 text-2xl font-bold">
          🚫
        </div>
        <h1 className="text-xl font-black text-white mb-2">Access Denied (RBAC Restricted)</h1>
        <p className="text-xs text-slate-400 max-w-md mb-6">
          Your current role (<span className="text-cyan-400 uppercase font-mono">{userRole}</span>) does not have security clearance to view this module under NCRB guidelines.
        </p>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return children;
}