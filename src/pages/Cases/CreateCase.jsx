import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  ArrowLeft,
  ChevronRight,
  Plus,
  Trash2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  FileText,
  Building2,
  Users,
  Lock,
  Calendar,
  MapPin,
  Tag,
  User,
  Phone,
  Car,
  CreditCard,
  Landmark,
  Network,
  ClipboardCheck,
} from 'lucide-react';

export default function CreateCase() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firNo:
      'FIR-2026-NCRB-' +
      Math.floor(1000 + Math.random() * 9000),

    title: '',
    category: 'Organized Crime / Cyber Fraud',
    classification: 'CONFIDENTIAL',
    incidentDate: '2026-09-01',
    jurisdiction: 'Delhi NCR / Interstate',
    leadAgency: 'NCRB Women Safety Cell',
    leadOfficer: 'Senior Investigator V. Kumar',
    description: '',

    initialEntities: [
      {
        name: '',
        type: 'Person',
        identifier: '',
        role: 'Suspect',
      },
    ],

    uploadedFiles: [],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEntityChange = (index, field, value) => {
    const updated = [...formData.initialEntities];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      initialEntities: updated,
    }));
  };

  const addEntityRow = () => {
    setFormData((prev) => ({
      ...prev,
      initialEntities: [
        ...prev.initialEntities,
        {
          name: '',
          type: 'Person',
          identifier: '',
          role: 'Suspect',
        },
      ],
    }));
  };

  const removeEntityRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      initialEntities: prev.initialEntities.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmitCase = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      const newCaseId =
        '26189-' +
        Math.floor(100 + Math.random() * 900);

      const newCaseData = {
        id: newCaseId,
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'Active Investigation',
      };

      const existingCases = JSON.parse(
        localStorage.getItem('ncrb_cases') || '[]'
      );

      localStorage.setItem(
        'ncrb_cases',
        JSON.stringify([
          newCaseData,
          ...existingCases,
        ])
      );

      setIsSubmitting(false);

      navigate(`/cases/${newCaseId}`);
    }, 1200);
  };

  const stepData = [
    {
      step: 1,
      title: 'FIR & Metadata',
      description: 'Case identity and incident details',
      icon: FileText,
    },
    {
      step: 2,
      title: 'Agency & Jurisdiction',
      description: 'Assignment and classification',
      icon: Building2,
    },
    {
      step: 3,
      title: 'Initial Entities',
      description: 'Known persons and identifiers',
      icon: Users,
    },
    {
      step: 4,
      title: 'Review & Initialize',
      description: 'Verify and create workspace',
      icon: ClipboardCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans p-4 md:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto space-y-6">

        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                to="/cases"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-blue-600 transition"
              >
                <ArrowLeft size={13} />
                Case Registry
              </Link>

              <ChevronRight
                size={12}
                className="text-slate-300"
              />

              <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-600">
                New Case
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Briefcase
                  size={19}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950">
                  Register New Investigation
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Create an FIR-linked investigation workspace and
                  register its initial intelligence entities.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200">
            <Lock
              size={14}
              className="text-slate-400"
            />

            <div>
              <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
                Classification
              </p>

              <p className="text-[10px] font-semibold text-slate-700">
                Controlled Investigation Workspace
              </p>
            </div>
          </div>
        </header>

        {/* =========================================================
            STEP PROGRESS
        ========================================================= */}
        <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {stepData.map((item) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isCompleted = currentStep > item.step;

              return (
                <button
                  type="button"
                  key={item.step}
                  onClick={() => setCurrentStep(item.step)}
                  className={`text-left rounded-lg border p-3 transition ${
                    isActive
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : isCompleted
                      ? 'bg-emerald-50 border-emerald-100'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`h-7 w-7 rounded-md flex items-center justify-center ${
                        isActive
                          ? 'bg-white/10'
                          : isCompleted
                          ? 'bg-emerald-100'
                          : 'bg-slate-50'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2
                          size={15}
                          className="text-emerald-600"
                        />
                      ) : (
                        <Icon
                          size={15}
                          className={
                            isActive
                              ? 'text-white'
                              : 'text-slate-500'
                          }
                        />
                      )}
                    </div>

                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider ${
                        isActive
                          ? 'text-slate-400'
                          : isCompleted
                          ? 'text-emerald-600'
                          : 'text-slate-400'
                      }`}
                    >
                      Step {item.step}
                    </span>
                  </div>

                  <p
                    className={`text-xs font-semibold mt-2 ${
                      isActive
                        ? 'text-white'
                        : isCompleted
                        ? 'text-emerald-800'
                        : 'text-slate-700'
                    }`}
                  >
                    {item.title}
                  </p>

                  <p
                    className={`text-[10px] mt-0.5 ${
                      isActive
                        ? 'text-slate-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            MAIN FORM
        ========================================================= */}
        <form
          onSubmit={handleSubmitCase}
          className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
        >
          {/* =======================================================
              STEP 1
          ======================================================= */}
          {currentStep === 1 && (
            <div className="p-5 md:p-7 space-y-6">

              <SectionHeading
                icon={FileText}
                title="Core FIR Metadata"
                description="Define the legal and investigative identity of the case."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <FormField label="FIR Reference Number" required>
                  <input
                    type="text"
                    value={formData.firNo}
                    onChange={(e) =>
                      handleInputChange(
                        'firNo',
                        e.target.value
                      )
                    }
                    className={inputClass}
                    required
                  />

                  <FieldHint>
                    Generated reference. Editable for authorized
                    registration workflows.
                  </FieldHint>
                </FormField>

                <FormField label="Offence Category" required>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange(
                        'category',
                        e.target.value
                      )
                    }
                    className={inputClass}
                  >
                    <option>
                      Organized Crime / Cyber Fraud
                    </option>
                    <option>
                      Financial Crime / Hawala
                    </option>
                    <option>
                      Human Trafficking / Women Safety
                    </option>
                    <option>
                      Counter-Terrorism & Telecom Cyber Ops
                    </option>
                    <option>
                      Narcotic Syndicate & Smuggling
                    </option>
                  </select>
                </FormField>

                <FormField
                  label="Case / FIR Title"
                  required
                  className="md:col-span-2"
                >
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      handleInputChange(
                        'title',
                        e.target.value
                      )
                    }
                    placeholder="e.g. Interstate Cyber Fraud & Mule Account Investigation"
                    className={inputClass}
                    required
                  />
                </FormField>

                <FormField
                  label="Incident Date"
                  required
                >
                  <div className="relative">
                    <Calendar
                      size={15}
                      className="absolute left-3 top-3 text-slate-400 pointer-events-none"
                    />

                    <input
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) =>
                        handleInputChange(
                          'incidentDate',
                          e.target.value
                        )
                      }
                      className={`${inputClass} pl-9`}
                      required
                    />
                  </div>
                </FormField>

                <FormField label="Security Classification">
                  <select
                    value={formData.classification}
                    onChange={(e) =>
                      handleInputChange(
                        'classification',
                        e.target.value
                      )
                    }
                    className={inputClass}
                  >
                    <option>CONFIDENTIAL</option>
                    <option>RESTRICTED</option>
                    <option>
                      TOP SECRET / SENSITIVE
                    </option>
                  </select>
                </FormField>
              </div>

              <FormField
                label="Incident Brief & Allegation Summary"
                className="w-full"
              >
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange(
                      'description',
                      e.target.value
                    )
                  }
                  placeholder="Record the initial complaint, known modus operandi, incident context, and primary allegations..."
                  className={`${inputClass} resize-none leading-relaxed`}
                />
              </FormField>

              <InfoNotice
                icon={ShieldCheck}
                title="Evidence-aware registration"
                text="Case metadata will be stored with the investigation record and can later be linked to evidence, entities, network relationships, and audit events."
              />
            </div>
          )}

          {/* =======================================================
              STEP 2
          ======================================================= */}
          {currentStep === 2 && (
            <div className="p-5 md:p-7 space-y-6">

              <SectionHeading
                icon={Building2}
                title="Agency & Officer Assignment"
                description="Configure the operational ownership and jurisdiction of this investigation."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <FormField
                  label="Lead Investigating Agency"
                  required
                >
                  <select
                    value={formData.leadAgency}
                    onChange={(e) =>
                      handleInputChange(
                        'leadAgency',
                        e.target.value
                      )
                    }
                    className={inputClass}
                  >
                    <option>
                      NCRB Women Safety Cell
                    </option>
                    <option>
                      Economic Offences Wing (EOW)
                    </option>
                    <option>
                      Special Cell - Cyber Ops
                    </option>
                    <option>
                      State Crime Branch
                    </option>
                    <option>
                      Central Intelligence Bureau (IB)
                    </option>
                  </select>
                </FormField>

                <FormField
                  label="Lead Investigating Officer"
                  required
                >
                  <div className="relative">
                    <User
                      size={15}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="text"
                      value={formData.leadOfficer}
                      onChange={(e) =>
                        handleInputChange(
                          'leadOfficer',
                          e.target.value
                        )
                      }
                      className={`${inputClass} pl-9`}
                      required
                    />
                  </div>
                </FormField>

                <FormField
                  label="Primary Jurisdiction"
                  required
                >
                  <div className="relative">
                    <MapPin
                      size={15}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <input
                      type="text"
                      value={formData.jurisdiction}
                      onChange={(e) =>
                        handleInputChange(
                          'jurisdiction',
                          e.target.value
                        )
                      }
                      className={`${inputClass} pl-9`}
                      required
                    />
                  </div>
                </FormField>

                <FormField
                  label="Security Classification Level"
                  required
                >
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3 top-3 text-slate-400"
                    />

                    <select
                      value={formData.classification}
                      onChange={(e) =>
                        handleInputChange(
                          'classification',
                          e.target.value
                        )
                      }
                      className={`${inputClass} pl-9`}
                    >
                      <option>CONFIDENTIAL</option>
                      <option>RESTRICTED</option>
                      <option>
                        TOP SECRET / SENSITIVE
                      </option>
                    </select>
                  </div>
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <AssignmentCard
                  icon={Building2}
                  label="Lead Agency"
                  value={formData.leadAgency}
                />

                <AssignmentCard
                  icon={User}
                  label="Lead Officer"
                  value={formData.leadOfficer}
                />

                <AssignmentCard
                  icon={MapPin}
                  label="Jurisdiction"
                  value={formData.jurisdiction}
                />
              </div>

              <InfoNotice
                icon={Lock}
                title="Access-controlled workspace"
                text="The selected classification is carried into the case record and should be enforced by your backend RBAC/ABAC layer in production."
              />
            </div>
          )}

          {/* =======================================================
              STEP 3
          ======================================================= */}
          {currentStep === 3 && (
            <div className="p-5 md:p-7 space-y-6">

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <SectionHeading
                  icon={Users}
                  title="Initial Entities"
                  description="Register known persons, phones, vehicles, accounts, and organizations."
                />

                <button
                  type="button"
                  onClick={addEntityRow}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shrink-0"
                >
                  <Plus size={14} />
                  Add Entity
                </button>
              </div>

              <div className="rounded-lg border border-blue-100 bg-blue-50 p-3.5 flex items-start gap-3">
                <Network
                  size={17}
                  className="text-blue-600 mt-0.5 shrink-0"
                />

                <div>
                  <p className="text-xs font-semibold text-blue-900">
                    Graph initialization
                  </p>

                  <p className="text-[11px] text-blue-700 mt-0.5 leading-relaxed">
                    These records form the initial nodes for the
                    investigation graph. Additional entities can be
                    linked later from CDR, financial, evidence, and
                    intelligence sources.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {formData.initialEntities.map(
                  (ent, idx) => (
                    <EntityRow
                      key={idx}
                      entity={ent}
                      index={idx}
                      canRemove={
                        formData.initialEntities.length > 1
                      }
                      onChange={handleEntityChange}
                      onRemove={removeEntityRow}
                    />
                  )
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>
                  {formData.initialEntities.length} entity
                  record
                  {formData.initialEntities.length !== 1
                    ? 's'
                    : ''}{' '}
                  prepared
                </span>

                <span>
                  Empty rows can be completed before submission.
                </span>
              </div>
            </div>
          )}

          {/* =======================================================
              STEP 4
          ======================================================= */}
          {currentStep === 4 && (
            <div className="p-5 md:p-7 space-y-6">

              <SectionHeading
                icon={ClipboardCheck}
                title="Review & Initialize Investigation"
                description="Verify the registration details before creating the case workspace."
              />

              {/* Case identity */}
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
                  <p className="text-xs font-semibold text-slate-800">
                    Case Registration Summary
                  </p>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <ReviewItem
                    label="FIR Reference"
                    value={formData.firNo}
                    mono
                  />

                  <ReviewItem
                    label="Case Title"
                    value={
                      formData.title || 'Not specified'
                    }
                  />

                  <ReviewItem
                    label="Offence Category"
                    value={formData.category}
                  />

                  <ReviewItem
                    label="Incident Date"
                    value={formData.incidentDate}
                  />

                  <ReviewItem
                    label="Lead Agency"
                    value={formData.leadAgency}
                  />

                  <ReviewItem
                    label="Lead Officer"
                    value={formData.leadOfficer}
                  />

                  <ReviewItem
                    label="Jurisdiction"
                    value={formData.jurisdiction}
                  />

                  <ReviewItem
                    label="Classification"
                    value={formData.classification}
                  />
                </div>
              </div>

              {/* Entity summary */}
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Initial Entity Records
                    </p>

                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {formData.initialEntities.length}{' '}
                      record
                      {formData.initialEntities.length !== 1
                        ? 's'
                        : ''}{' '}
                      prepared for registration
                    </p>
                  </div>

                  <Users
                    size={15}
                    className="text-slate-400"
                  />
                </div>

                <div className="divide-y divide-slate-100">
                  {formData.initialEntities.map(
                    (entity, index) => (
                      <div
                        key={index}
                        className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3"
                      >
                        <ReviewItem
                          label="Name / Label"
                          value={
                            entity.name || 'Not specified'
                          }
                        />

                        <ReviewItem
                          label="Entity Type"
                          value={entity.type}
                        />

                        <ReviewItem
                          label="Identifier"
                          value={
                            entity.identifier ||
                            'Not specified'
                          }
                          mono
                        />

                        <ReviewItem
                          label="Role"
                          value={entity.role}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Security notice */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-white border border-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldCheck
                    size={18}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-emerald-900">
                    Registration ready
                  </p>

                  <p className="text-[11px] text-emerald-700 mt-1 leading-relaxed">
                    The case record will be assigned a unique
                    investigation ID and stored in the local case
                    registry. Your production backend can additionally
                    attach audit events, evidence hashes, and access
                    controls.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex items-center gap-2.5">
                <Sparkles
                  size={16}
                  className="text-blue-600 shrink-0"
                />

                <p className="text-[11px] text-slate-600">
                  AI analysis can be initialized after the case
                  workspace is created and the required evidence/data
                  sources are available.
                </p>
              </div>
            </div>
          )}

          {/* =======================================================
              FORM FOOTER
          ======================================================= */}
          <div className="px-5 md:px-7 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <div>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentStep(currentStep - 1)
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 hover:border-slate-300 transition"
                >
                  <ArrowLeft size={14} />
                  Previous
                </button>
              ) : (
                <Link
                  to="/cases"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 transition"
                >
                  <ArrowLeft size={14} />
                  Cancel
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-[10px] text-slate-400 mr-1">
                Step {currentStep} of 4
              </span>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentStep(currentStep + 1)
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
                >
                  Continue
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Case...
                    </>
                  ) : (
                    <>
                      <Briefcase size={14} />
                      Create Investigation
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* =========================================================
            FOOTER
        ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-[10px] text-slate-400">
            CrimeGraph AI • Investigation Case Registration
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck size={12} />
            <span>Controlled investigation workflow</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   REUSABLE COMPONENTS
============================================================= */

function SectionHeading({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
      <div className="h-9 w-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
        <Icon size={17} className="text-blue-600" />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-900">
          {title}
        </h2>

        <p className="text-[11px] text-slate-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}

function FormField({
  label,
  required = false,
  children,
  className = '',
}) {
  return (
    <div className={className}>
      <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {children}
    </div>
  );
}

function FieldHint({ children }) {
  return (
    <p className="text-[9px] text-slate-400 mt-1.5">
      {children}
    </p>
  );
}

function InfoNotice({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 flex items-start gap-3">
      <Icon
        size={17}
        className="text-slate-500 mt-0.5 shrink-0"
      />

      <div>
        <p className="text-xs font-semibold text-slate-800">
          {title}
        </p>

        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

function AssignmentCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-2">
        <Icon
          size={14}
          className="text-slate-400"
        />

        <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
          {label}
        </span>
      </div>

      <p className="text-[11px] font-semibold text-slate-700 mt-2 leading-relaxed">
        {value}
      </p>
    </div>
  );
}

function ReviewItem({
  label,
  value,
  mono = false,
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
        {label}
      </p>

      <p
        className={`text-[11px] font-semibold text-slate-700 mt-1 break-words ${
          mono ? 'font-mono' : ''
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function EntityRow({
  entity,
  index,
  canRemove,
  onChange,
  onRemove,
}) {
  const getEntityIcon = () => {
    switch (entity.type) {
      case 'Person':
        return User;

      case 'Phone':
        return Phone;

      case 'Vehicle':
        return Car;

      case 'Account':
        return CreditCard;

      case 'Organization':
        return Landmark;

      default:
        return Users;
    }
  };

  const EntityIcon = getEntityIcon();

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Row header */}
      <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-white border border-slate-200 flex items-center justify-center">
            <EntityIcon
              size={14}
              className="text-slate-500"
            />
          </div>

          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Entity {index + 1}
          </span>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
            title="Remove entity"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Fields */}
      <div className="p-3.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <FormField label="Name / Entity Label">
          <input
            type="text"
            placeholder="e.g. Vikram Malhotra"
            value={entity.name}
            onChange={(e) =>
              onChange(
                index,
                'name',
                e.target.value
              )
            }
            className={smallInputClass}
          />
        </FormField>

        <FormField label="Entity Type">
          <select
            value={entity.type}
            onChange={(e) =>
              onChange(
                index,
                'type',
                e.target.value
              )
            }
            className={smallInputClass}
          >
            <option>Person</option>
            <option>Phone</option>
            <option>Vehicle</option>
            <option>Account</option>
            <option>Organization</option>
          </select>
        </FormField>

        <FormField label="Identifier">
          <input
            type="text"
            placeholder="Phone / Account / Vehicle No."
            value={entity.identifier}
            onChange={(e) =>
              onChange(
                index,
                'identifier',
                e.target.value
              )
            }
            className={`${smallInputClass} font-mono`}
          />
        </FormField>

        <FormField label="Relationship / Role">
          <select
            value={entity.role}
            onChange={(e) =>
              onChange(
                index,
                'role',
                e.target.value
              )
            }
            className={smallInputClass}
          >
            <option>Suspect</option>
            <option>Primary Suspect</option>
            <option>Associate</option>
            <option>Mule Account</option>
            <option>Burner SIM</option>
            <option>Victim</option>
          </select>
        </FormField>
      </div>
    </div>
  );
}

/* =============================================================
   SHARED INPUT STYLES
============================================================= */

const inputClass =
  'w-full h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition';

const smallInputClass =
  'w-full h-9 bg-slate-50 border border-slate-200 rounded-lg px-2.5 text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition';