import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EntityIntelligence from './pages/Entities/Entities';
import LinkAnalysis from './pages/LinkAnalysis';
import CaseManagement from './pages/Cases/Cases';
import AIIntelligence from './pages/Intelligence';
import CdrAnalysis from './pages/CdrAnalysis';
import DigitalEvidenceVault from './pages/Evidence';
import Reports from './pages/Reports';
import Timeline from './pages/Timeline';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import VehicleManagement from './pages/VehicleManagement';

// RBAC Protected Route Wrapper Component
function ProtectedRoute({ children, allowedRoles }) {
  const userRole = localStorage.getItem('userRole') || 'viewer';

  // Admin has access to everything by default
  if (userRole === 'admin') {
    return children;
  }

  // Check if the current user's role is permitted for this route
  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl flex items-center justify-center mb-4 text-xl font-bold">
          🚫
        </div>
        <h2 className="text-lg font-bold text-white mb-1">Access Restricted</h2>
        <p className="text-xs text-slate-400 max-w-sm mb-4">
          Your role (<span className="text-cyan-400 uppercase font-mono">{userRole}</span>) does not have clearance to access this module under NCRB security protocols.
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

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Main Layout Wrapping Protected Modules */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Dashboard: Accessible to All */}
        <Route path="dashboard" element={
          <ProtectedRoute allowedRoles={['admin', 'officer', 'analyst', 'viewer']}>
            <Dashboard />
          </ProtectedRoute>
        } />

{/* Network Intelligence */}
<Route path="network" element={
  <ProtectedRoute allowedRoles={['admin', 'analyst']}>
    <LinkAnalysis />
  </ProtectedRoute>
} />
        {/* Entity Intelligence: Admin & Analyst */}
        <Route path="entities" element={
          <ProtectedRoute allowedRoles={['admin', 'analyst']}>
            <EntityIntelligence />
          </ProtectedRoute>
        } />

        {/* Link Analysis: Admin & Analyst */}
        <Route path="link-analysis" element={
          <ProtectedRoute allowedRoles={['admin', 'analyst']}>
            <LinkAnalysis />
          </ProtectedRoute>
        } />

        {/* Cases: Admin & Investigation Officer */}
        <Route path="cases" element={
          <ProtectedRoute allowedRoles={['admin', 'officer']}>
            <CaseManagement />
          </ProtectedRoute>
        } />

        {/* AI Intelligence Hub: Admin & Analyst */}
        <Route path="intelligence" element={
          <ProtectedRoute allowedRoles={['admin', 'analyst']}>
            <AIIntelligence />
          </ProtectedRoute>
        } />

        {/* CDR Analysis: Admin, Officer & Analyst */}
        <Route path="cdr-analysis" element={
          <ProtectedRoute allowedRoles={['admin', 'officer', 'analyst']}>
            <CdrAnalysis />
          </ProtectedRoute>
        } />

        {/* Evidence Vault: Admin & Investigation Officer */}
        <Route path="evidence" element={
          <ProtectedRoute allowedRoles={['admin', 'officer']}>
            <DigitalEvidenceVault />
          </ProtectedRoute>
        } />

        {/* Reports: Admin, Analyst & Viewer */}
        <Route path="reports" element={
          <ProtectedRoute allowedRoles={['admin', 'analyst', 'viewer']}>
            <Reports />
          </ProtectedRoute>
        } />

        {/* Timeline: Admin & Investigation Officer */}
        <Route path="timeline" element={
          <ProtectedRoute allowedRoles={['admin', 'officer']}>
            <Timeline />
          </ProtectedRoute>
        } />

        {/* User Management: Admin Only */}
        <Route path="usermanagement" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserManagement />
          </ProtectedRoute>
        } />

        {/* Settings: Admin & Officer */}
        <Route path="settings" element={
          <ProtectedRoute allowedRoles={['admin', 'officer']}>
            <Settings />
          </ProtectedRoute>
        } />

        {/* Vehicle Management: Admin & Officer */}
        <Route path="vehicles" element={
          <ProtectedRoute allowedRoles={['admin', 'officer']}>
            <VehicleManagement />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}