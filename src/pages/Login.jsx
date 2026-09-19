import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  User,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  CheckCircle2,
  Fingerprint,
  Radio,
  UserCog,
  ChevronDown,
  Info,
  KeyRound,
} from 'lucide-react';

// -----------------------------------------------------------------------------
// Prototype role accounts
// NOTE: These credentials are intentionally hardcoded for prototype/demo use.
// Replace this with backend authentication before production deployment.
// -----------------------------------------------------------------------------

const ROLE_ACCOUNTS = {
  admin: {
    title: 'Admin',
    badgeId: 'NCRB-ADMIN-001',
    password: 'AdminPassword2027!',
    twoFactorCode: '123456',
  },
  officer: {
    title: 'Investigation Officer',
    badgeId: 'NCRB-OFFICER-8021',
    password: 'OfficerPassword2027!',
    twoFactorCode: '892014',
  },
  analyst: {
    title: 'Analyst',
    badgeId: 'NCRB-ANALYST-404',
    password: 'AnalystPassword2027!',
    twoFactorCode: '654321',
  },
  viewer: {
    title: 'Viewer',
    badgeId: 'NCRB-VIEWER-999',
    password: 'ViewerPassword2027!',
    twoFactorCode: '111222',
  },
};

const ROLE_OPTIONS = [
  {
    value: 'admin',
    label: 'Admin',
    description: 'Full system control',
  },
  {
    value: 'officer',
    label: 'Investigation Officer',
    description: 'Case & evidence operations',
  },
  {
    value: 'analyst',
    label: 'Analyst',
    description: 'AI, network & intelligence',
  },
  {
    value: 'viewer',
    label: 'Viewer',
    description: 'Read-only dashboards',
  },
];

export default function Login() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('officer');
  const [badgeId, setBadgeId] = useState(
    ROLE_ACCOUNTS.officer.badgeId
  );
  const [password, setPassword] = useState(
    ROLE_ACCOUNTS.officer.password
  );

  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // ---------------------------------------------------------------------------
  // Role selection
  // ---------------------------------------------------------------------------

  const handleRoleChange = (e) => {
    const roleKey = e.target.value;

    setSelectedRole(roleKey);
    setErrorMsg('');
    setTwoFactorCode('');

    const account = ROLE_ACCOUNTS[roleKey];

    if (account) {
      setBadgeId(account.badgeId);
      setPassword(account.password);
    }
  };

  // ---------------------------------------------------------------------------
  // Step 1 — Credentials
  // ---------------------------------------------------------------------------

  const handleCredentialSubmit = (e) => {
    e.preventDefault();

    if (!badgeId.trim() || !password.trim()) {
      setErrorMsg('Please enter both Badge ID and Password.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    // Prototype authentication simulation
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 900);
  };

  // ---------------------------------------------------------------------------
  // Step 2 — 2FA
  // ---------------------------------------------------------------------------

  const handle2FASubmit = (e) => {
    e.preventDefault();

    const expectedCode = ROLE_ACCOUNTS[selectedRole].twoFactorCode;

    if (twoFactorCode !== expectedCode) {
      setErrorMsg(
        `Invalid 2FA token. For the 2027 prototype, use code: ${expectedCode}`
      );
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    // Prototype session storage
    setTimeout(() => {
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('userBadge', badgeId);

      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  // ---------------------------------------------------------------------------
  // Back to credentials
  // ---------------------------------------------------------------------------

  const handleBack = () => {
    setErrorMsg('');
    setTwoFactorCode('');
    setStep(1);
  };

  const currentRole = ROLE_ACCOUNTS[selectedRole];

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans flex flex-col">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
                <ShieldCheck size={19} className="text-white" />
              </div>

              <div className="min-w-0">
                <div className="text-sm font-bold tracking-tight text-slate-900">
                  CrimeGraph AI
                </div>

                <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500 font-semibold truncate">
                  Investigative Intelligence Platform
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />

              <span className="text-[11px] font-semibold text-slate-500">
                Secure Access Gateway
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main                                                               */}
      {/* ------------------------------------------------------------------ */}

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[480px]">
          {/* Government / portal identification */}
          <div className="mb-5">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Building2 size={16} className="text-slate-500" />

              <span className="text-[10px] uppercase tracking-[0.16em] font-bold text-slate-500">
                Government Investigation Workspace
              </span>
            </div>

            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-red-200 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                <Lock size={11} />
                Restricted Access
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Login Card                                                       */}
          {/* ---------------------------------------------------------------- */}

          <section className="bg-white border border-slate-200 rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.07)] overflow-hidden">
            {/* Card header */}
            <div className="px-6 sm:px-8 pt-7 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
                  {step === 1 ? (
                    <KeyRound size={21} className="text-slate-700" />
                  ) : (
                    <Fingerprint size={21} className="text-slate-700" />
                  )}
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    {step === 1
                      ? 'Investigative Portal Login'
                      : 'Verify Your Identity'}
                  </h1>

                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    {step === 1
                      ? 'Sign in to access the CrimeGraph investigation workspace.'
                      : 'Complete the second authentication factor to continue.'}
                  </p>
                </div>
              </div>

              {/* Step indicator */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                <StepIndicator
                  number="01"
                  label="Credentials"
                  active={step === 1}
                  completed={step > 1}
                />

                <StepIndicator
                  number="02"
                  label="2FA Verification"
                  active={step === 2}
                  completed={false}
                />
              </div>
            </div>

            {/* Card body */}
            <div className="px-6 sm:px-8 py-6">
              {/* Error */}
              {errorMsg && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 flex items-start gap-2.5">
                  <ShieldAlert
                    size={16}
                    className="text-red-600 shrink-0 mt-0.5"
                  />

                  <div>
                    <p className="text-xs font-semibold text-red-800">
                      Authentication error
                    </p>

                    <p className="mt-0.5 text-[11px] leading-4 text-red-700">
                      {errorMsg}
                    </p>
                  </div>
                </div>
              )}

              {/* ============================================================ */}
              {/* STEP 1                                                        */}
              {/* ============================================================ */}

              {step === 1 && (
                <form
                  onSubmit={handleCredentialSubmit}
                  className="space-y-5"
                >
                  {/* Role */}
                  <div>
                    <FieldLabel
                      label="Access Role"
                      description="Select the role used for this prototype session."
                    />

                    <div className="relative">
                      <UserCog
                        size={16}
                        className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none"
                      />

                      <select
                        value={selectedRole}
                        onChange={handleRoleChange}
                        className="appearance-none w-full h-11 rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 cursor-pointer"
                      >
                        {ROLE_OPTIONS.map((role) => (
                          <option
                            key={role.value}
                            value={role.value}
                          >
                            {role.label} — {role.description}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Badge ID */}
                  <div>
                    <FieldLabel
                      label="Officer Badge ID / Service Number"
                      description="Prototype identity identifier."
                    />

                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3.5 top-3.5 text-slate-400"
                      />

                      <input
                        type="text"
                        value={badgeId}
                        onChange={(e) => setBadgeId(e.target.value)}
                        placeholder="Enter Badge ID"
                        autoComplete="username"
                        className="w-full h-11 rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm font-mono text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <FieldLabel
                      label="Portal Access Password"
                      description="Prototype password for the selected role."
                    />

                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3.5 top-3.5 text-slate-400"
                      />

                      <input
                        type={
                          showPassword ? 'text' : 'password'
                        }
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        placeholder="Enter password"
                        autoComplete="current-password"
                        className="w-full h-11 rounded-lg border border-slate-200 bg-white pl-10 pr-11 text-sm font-mono text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-2.5 w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-700 transition"
                        aria-label={
                          showPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Prototype notice */}
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3 flex gap-2.5">
                    <Info
                      size={15}
                      className="text-amber-600 shrink-0 mt-0.5"
                    />

                    <p className="text-[11px] leading-4 text-amber-800">
                      This login uses hardcoded credentials for the
                      2027 prototype demonstration. Production
                      authentication should be handled by the backend.
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-sm font-semibold transition flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Radio
                          size={16}
                          className="animate-spin"
                        />
                        Validating credentials...
                      </>
                    ) : (
                      <>
                        Continue to verification
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* ============================================================ */}
              {/* STEP 2                                                        */}
              {/* ============================================================ */}

              {step === 2 && (
                <form
                  onSubmit={handle2FASubmit}
                  className="space-y-5"
                >
                  {/* Validated identity */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                        <CheckCircle2
                          size={17}
                          className="text-emerald-600"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-emerald-900">
                          Credentials validated
                        </p>

                        <p className="mt-0.5 text-[11px] text-emerald-800">
                          Access role:{' '}
                          <span className="font-semibold">
                            {currentRole.title}
                          </span>
                        </p>

                        <p className="mt-0.5 text-[10px] font-mono text-emerald-700">
                          {badgeId}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2FA input */}
                  <div>
                    <FieldLabel
                      label="Two-Factor Authentication Token"
                      description="Enter the 6-digit prototype verification code."
                    />

                    <div className="relative">
                      <Fingerprint
                        size={17}
                        className="absolute left-3.5 top-3.5 text-slate-400"
                      />

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={twoFactorCode}
                        onChange={(e) => {
                          setTwoFactorCode(
                            e.target.value
                              .replace(/\D/g, '')
                              .slice(0, 6)
                          );
                          setErrorMsg('');
                        }}
                        placeholder="000000"
                        autoFocus
                        autoComplete="one-time-code"
                        className="w-full h-12 rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-center tracking-[0.45em] font-mono text-lg font-bold text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        required
                      />
                    </div>
                  </div>

                  {/* Prototype code */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          Prototype 2FA Code
                        </p>

                        <p className="mt-1 font-mono text-sm font-bold text-slate-800">
                          {currentRole.twoFactorCode}
                        </p>
                      </div>

                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                        <Fingerprint
                          size={16}
                          className="text-slate-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-1/3 h-11 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-11 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-sm font-semibold transition flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Radio
                            size={16}
                            className="animate-spin"
                          />
                          Authenticating...
                        </>
                      ) : (
                        <>
                          Authorize access
                          <ShieldCheck size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Security footer                                                  */}
            {/* ---------------------------------------------------------------- */}

            <div className="border-t border-slate-100 bg-slate-50 px-6 sm:px-8 py-4">
              <div className="flex items-start gap-2.5">
                <ShieldCheck
                  size={14}
                  className="text-slate-500 shrink-0 mt-0.5"
                />

                <p className="text-[10px] leading-4 text-slate-500">
                  Authorized personnel only. Authentication events
                  are recorded for security and audit purposes. This
                  interface is a prototype and should not be used as
                  a production authentication system.
                </p>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------------------- */}
          {/* System information                                                */}
          {/* ---------------------------------------------------------------- */}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-slate-400">
            <span>
              System Node:{' '}
              <span className="font-mono text-slate-500">
                DELHI-NCRB-NODE-04
              </span>
            </span>

            <span className="hidden sm:inline text-slate-300">
              •
            </span>

            <span>
              Session:{' '}
              <span className="font-mono text-slate-500">
                AES-256-GCM
              </span>
            </span>

            <span className="hidden sm:inline text-slate-300">
              •
            </span>

            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Gateway Operational
            </span>
          </div>
        </div>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom footer                                                       */}
      {/* ------------------------------------------------------------------ */}

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[10px] text-slate-400">
            CrimeGraph AI • Investigative Intelligence Platform
          </span>

          <span className="text-[10px] text-slate-400">
            2027 Prototype Environment
          </span>
        </div>
      </footer>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Reusable Components
// -----------------------------------------------------------------------------

function FieldLabel({ label, description }) {
  return (
    <div className="mb-2">
      <label className="block text-xs font-semibold text-slate-700">
        {label}
      </label>

      {description && (
        <p className="mt-0.5 text-[10px] text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}

function StepIndicator({
  number,
  label,
  active,
  completed,
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 flex items-center gap-2.5 transition ${
        active
          ? 'border-slate-300 bg-slate-50'
          : completed
            ? 'border-emerald-200 bg-emerald-50'
            : 'border-slate-200 bg-white'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold font-mono ${
          active
            ? 'bg-slate-900 text-white'
            : completed
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-100 text-slate-400'
        }`}
      >
        {completed ? (
          <CheckCircle2 size={13} />
        ) : (
          number
        )}
      </div>

      <div className="min-w-0">
        <p
          className={`text-[10px] font-bold truncate ${
            active
              ? 'text-slate-800'
              : completed
                ? 'text-emerald-800'
                : 'text-slate-400'
          }`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}