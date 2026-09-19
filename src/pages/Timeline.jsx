import React, { useMemo, useState } from 'react';
import {
  Clock,
  Search,
  Filter,
  Phone,
  CreditCard,
  Film,
  FileCheck2,
  MapPin,
  Download,
  CheckCircle2,
  User,
  X,
  Eye,
  Trash2,
  Plus,
  ArrowUpDown,
  ShieldCheck,
  Activity,
  CalendarDays,
  AlertTriangle,
  FileText,
  RotateCcw
} from 'lucide-react';

export default function Timeline() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [caseFilter, setCaseFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('DESC');

  const [toastMessage, setToastMessage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventCategory, setNewEventCategory] = useState('TELECOM_CDR');
  const [newEventActor, setNewEventActor] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventThreat, setNewEventThreat] = useState('HIGH');

  const [events, setEvents] = useState([
    {
      id: 'EVT-9081',
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      timestamp: '12 Jan 2026, 02:14:22 IST',
      category: 'TELECOM_CDR',
      title: 'Peak Inter-Suspect Call Duration (184 Seconds)',
      description:
        'Burner SIM (+91 98210-XXXXX) initiated an encrypted cellular link with Kingpin node (+91 98112-XXXXX) connected to Sector 62 Tower.',
      location: 'Noida Sector 62 Tower Dump Node',
      actor: 'Vikram "Raja" Malhotra',
      threatLevel: 'HIGH',
      hashSignature: 'SHA256: e3b0c...852b855'
    },
    {
      id: 'EVT-9078',
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      timestamp: '12 Jan 2026, 02:45:10 IST',
      category: 'FINANCIAL',
      title: 'RTGS Electronic Funds Transfer (₹45,00,000)',
      description:
        'Mule Account #9041 transferred funds to Apex Horizon Shell Corp offshore account via Axis Bank API gateway.',
      location: 'Axis Bank Corp Gateway, Mumbai',
      actor: 'Anand "Micro" Verma',
      threatLevel: 'CRITICAL',
      hashSignature: 'SHA256: 7f83b...126d9069'
    },
    {
      id: 'EVT-9065',
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      timestamp: '12 Jan 2026, 03:10:00 IST',
      category: 'CCTV_SIGHTING',
      title: 'ATM Counter Facial Identification Match',
      description:
        'CCTV Counter #4 captured suspect Anand Verma withdrawing cash using cloned card.',
      location: 'Axis Bank ATM, Connaught Place, New Delhi',
      actor: 'Anand "Micro" Verma',
      threatLevel: 'MEDIUM',
      hashSignature: 'SHA256: a1b2c...56789abc'
    },
    {
      id: 'EVT-9012',
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      timestamp: '12 Jan 2026, 14:22:00 IST',
      category: 'EVIDENCE_INGEST',
      title: 'Tower Dump CDR & CCTV Drive Vaulted',
      description:
        'Inspector R. Deshmukh ingested forensic drive dumps into the evidence repository with SHA-256 integrity metadata.',
      location: 'NCRB Cyber Cell Vault, New Delhi',
      actor: 'Inspector R. Deshmukh',
      threatLevel: 'INFO',
      hashSignature: 'SHA256: cb56d...0077e23d'
    }
  ]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportLog = () => {
    const payload = JSON.stringify(events, null, 2);
    const file = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(file);

    const element = document.createElement('a');
    element.href = url;
    element.download = `Case_Timeline_${Date.now()}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);

    showToast('Timeline event log exported successfully.');
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();

    if (!newEventTitle.trim() || !newEventActor.trim()) {
      showToast('Event title and key actor are required.');
      return;
    }

    const newEvt = {
      id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      caseId: '26189-042',
      firNo: 'FIR-2026-NCRB-9021',
      timestamp: 'Just Now',
      category: newEventCategory,
      title: newEventTitle.trim(),
      description:
        newEventDescription.trim() ||
        'Manual operational event marker added to the case timeline.',
      location: newEventLocation.trim() || 'Cyber Crime Division HQ',
      actor: newEventActor.trim(),
      threatLevel: newEventThreat,
      hashSignature: `SHA256: ${Math.random()
        .toString(36)
        .substring(2, 8)}...${Math.random()
        .toString(36)
        .substring(2, 7)}`
    };

    setEvents((current) => [newEvt, ...current]);

    setIsAddModalOpen(false);
    setNewEventTitle('');
    setNewEventDescription('');
    setNewEventActor('');
    setNewEventLocation('');
    setNewEventCategory('TELECOM_CDR');
    setNewEventThreat('HIGH');

    showToast(`Event ${newEvt.id} added to the timeline.`);
  };

  const handleDeleteEvent = (id) => {
    setEvents((current) => current.filter((event) => event.id !== id));
    setSelectedEventModal(null);
    showToast(`Event ${id} removed from the timeline.`);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('ALL');
    setCaseFilter('ALL');
    setSortOrder('DESC');
  };

  const getCategoryConfig = (category) => {
    switch (category) {
      case 'TELECOM_CDR':
        return {
          label: 'CDR Call Link',
          icon: Phone,
          className: 'bg-amber-50 text-amber-700 border-amber-200'
        };

      case 'FINANCIAL':
        return {
          label: 'Financial Wire',
          icon: CreditCard,
          className: 'bg-cyan-50 text-cyan-700 border-cyan-200'
        };

      case 'CCTV_SIGHTING':
        return {
          label: 'CCTV Sighting',
          icon: Film,
          className: 'bg-violet-50 text-violet-700 border-violet-200'
        };

      default:
        return {
          label: 'Evidence Ingest',
          icon: FileCheck2,
          className: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
    }
  };

  const getThreatConfig = (level) => {
    switch (level) {
      case 'CRITICAL':
        return {
          label: 'Critical',
          dot: 'bg-red-500',
          text: 'text-red-700',
          border: 'border-l-red-500',
          bg: 'bg-red-50/60'
        };

      case 'HIGH':
        return {
          label: 'High',
          dot: 'bg-amber-500',
          text: 'text-amber-700',
          border: 'border-l-amber-500',
          bg: 'bg-amber-50/50'
        };

      case 'MEDIUM':
        return {
          label: 'Medium',
          dot: 'bg-cyan-500',
          text: 'text-cyan-700',
          border: 'border-l-cyan-500',
          bg: 'bg-cyan-50/40'
        };

      default:
        return {
          label: 'Info',
          dot: 'bg-emerald-500',
          text: 'text-emerald-700',
          border: 'border-l-emerald-500',
          bg: 'bg-emerald-50/40'
        };
    }
  };

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return events
      .filter((event) => {
        const matchesSearch =
          !query ||
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.actor.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.id.toLowerCase().includes(query) ||
          event.firNo.toLowerCase().includes(query);

        const matchesCategory =
          categoryFilter === 'ALL' || event.category === categoryFilter;

        const matchesCase =
          caseFilter === 'ALL' || event.caseId === caseFilter;

        return matchesSearch && matchesCategory && matchesCase;
      })
      .sort((a, b) => {
        // Existing mock timestamps are displayed strings. Keep the
        // chronological order stable for the supplied dataset.
        const order = events.indexOf(a) - events.indexOf(b);
        return sortOrder === 'DESC' ? order : -order;
      });
  }, [events, searchQuery, categoryFilter, caseFilter, sortOrder]);

  const summary = useMemo(
    () => ({
      total: events.length,
      critical: events.filter((e) => e.threatLevel === 'CRITICAL').length,
      high: events.filter((e) => e.threatLevel === 'HIGH').length,
      evidence: events.filter((e) => e.category === 'EVIDENCE_INGEST').length
    }),
    [events]
  );

  const hasActiveFilters =
    searchQuery || categoryFilter !== 'ALL' || caseFilter !== 'ALL';

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900 font-sans p-4 md:p-6 space-y-5">

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[70] max-w-sm bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-start gap-3 border border-slate-700">
          <CheckCircle2 size={17} className="text-emerald-400 mt-0.5 shrink-0" />
          <span className="text-xs font-medium leading-5">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border border-slate-200 rounded-2xl px-5 py-5 shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">

          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-cyan-700 uppercase mb-2">
              <Clock size={15} />
              Chronological Case Reconstruction
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Case Timeline & Sequence
            </h1>

            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              Review calls, financial activity, sightings, and evidence events
              in chronological context across authorized investigations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportLog}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
            >
              <Download size={15} />
              Export Event Log
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition shadow-sm"
            >
              <Plus size={15} />
              Add Event Marker
            </button>
          </div>
        </div>
      </header>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <SummaryCard
          icon={Activity}
          label="Timeline Events"
          value={summary.total}
          detail="Recorded markers"
        />

        <SummaryCard
          icon={AlertTriangle}
          label="Critical Events"
          value={summary.critical}
          detail="Require review"
          accent="red"
        />

        <SummaryCard
          icon={Clock}
          label="High Priority"
          value={summary.high}
          detail="Elevated activity"
          accent="amber"
        />

        <SummaryCard
          icon={FileCheck2}
          label="Evidence Events"
          value={summary.evidence}
          detail="Repository activity"
          accent="emerald"
        />
      </div>

      {/* Filters */}
      <section className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2.5">

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-3 text-slate-400"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, actors, FIRs..."
              className="w-full h-10 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-9 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Category */}
          <FilterSelect
            icon={Filter}
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={[
              ['ALL', 'Category: All Events'],
              ['TELECOM_CDR', 'Telecom CDR Links'],
              ['FINANCIAL', 'Financial Transfers'],
              ['CCTV_SIGHTING', 'CCTV Sightings'],
              ['EVIDENCE_INGEST', 'Evidence Ingestions']
            ]}
          />

          {/* Case */}
          <FilterSelect
            icon={FileText}
            value={caseFilter}
            onChange={setCaseFilter}
            options={[
              ['ALL', 'Case: All Active FIRs'],
              ['26189-042', 'FIR-2026-NCRB-9021'],
              ['26189-088', 'FIR-2026-DL-4410']
            ]}
          />

          {/* Sort */}
          <button
            onClick={() =>
              setSortOrder((current) =>
                current === 'DESC' ? 'ASC' : 'DESC'
              )
            }
            className="h-10 flex items-center justify-between px-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition text-xs font-semibold text-slate-700"
          >
            <span className="flex items-center gap-2">
              <ArrowUpDown size={15} className="text-cyan-600" />
              {sortOrder === 'DESC' ? 'Newest First' : 'Oldest First'}
            </span>
          </button>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-2.5 px-1">
            <span className="text-[11px] text-slate-500">
              Showing {filteredEvents.length} of {events.length} timeline events
            </span>

            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 hover:text-cyan-700"
            >
              <RotateCcw size={12} />
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Timeline */}
      <section className="relative">

        {filteredEvents.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="mx-auto w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center">
              <Search size={19} className="text-slate-400" />
            </div>

            <h3 className="text-sm font-bold text-slate-800 mt-3">
              No matching events
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Adjust the search or filter criteria to view other timeline
              records.
            </p>
          </div>
        ) : (
          <div className="relative pl-7 md:pl-10 space-y-4">

            {/* Timeline rail */}
            <div className="absolute left-[11px] md:left-[15px] top-4 bottom-4 w-px bg-slate-200" />

            {filteredEvents.map((evt) => {
              const category = getCategoryConfig(evt.category);
              const threat = getThreatConfig(evt.threatLevel);
              const CategoryIcon = category.icon;

              return (
                <article key={evt.id} className="relative">

                  {/* Marker */}
                  <div className="absolute -left-[25px] md:-left-[34px] top-6 w-4 h-4 rounded-full bg-white border-[3px] border-cyan-500 z-10 shadow-sm" />

                  <div
                    className={`bg-white border border-slate-200 border-l-4 ${threat.border} rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden`}
                  >

                    {/* Top row */}
                    <div className="px-4 md:px-5 py-3 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3">

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold ${category.className}`}
                        >
                          <CategoryIcon size={12} />
                          {category.label}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                          <Clock size={12} />
                          {evt.timestamp}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md ${threat.bg} ${threat.text} text-[10px] font-bold`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${threat.dot}`}
                          />
                          {threat.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">
                          {evt.id}
                        </span>

                        <span className="hidden sm:block w-px h-3 bg-slate-200" />

                        <span className="text-[10px] font-mono font-semibold text-cyan-700">
                          {evt.firNo}
                        </span>

                        <button
                          onClick={() => setSelectedEventModal(evt)}
                          title="View event details"
                          className="ml-1 p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-cyan-700 hover:bg-cyan-50 transition"
                        >
                          <Eye size={13} />
                        </button>

                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          title="Delete event marker"
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="px-4 md:px-5 py-4">

                      <h3 className="text-sm md:text-base font-bold text-slate-900">
                        {evt.title}
                      </h3>

                      <p className="text-xs md:text-sm text-slate-500 leading-6 mt-1.5 max-w-5xl">
                        {evt.description}
                      </p>

                      {/* Meta */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3">

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">

                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                            <User size={13} className="text-slate-400" />
                            <span className="text-slate-400">Actor</span>
                            <strong className="text-slate-800">
                              {evt.actor}
                            </strong>
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin size={13} className="text-slate-400" />
                            {evt.location}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 self-start lg:self-auto px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                          <ShieldCheck
                            size={13}
                            className="text-emerald-600"
                          />

                          <span className="text-[10px] font-mono text-slate-500">
                            {evt.hashSignature}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <ModalOverlay onClose={() => setIsAddModalOpen(false)}>
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-cyan-700 text-[10px] font-bold uppercase tracking-wider">
                  <CalendarDays size={14} />
                  Timeline Workspace
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Add Event Marker
                </h3>

                <p className="text-xs text-slate-500 mt-0.5">
                  Add a manual event record to the current case timeline.
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddEventSubmit} className="p-5 space-y-4">

              <FormField label="Event Title" required>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Encrypted PGP key broadcast detected"
                  className={inputClass}
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <FormField label="Category">
                  <select
                    value={newEventCategory}
                    onChange={(e) => setNewEventCategory(e.target.value)}
                    className={inputClass}
                  >
                    <option value="TELECOM_CDR">Telecom CDR Link</option>
                    <option value="FINANCIAL">Financial Transfer</option>
                    <option value="CCTV_SIGHTING">CCTV Sighting</option>
                    <option value="EVIDENCE_INGEST">Evidence Ingestion</option>
                  </select>
                </FormField>

                <FormField label="Threat Level">
                  <select
                    value={newEventThreat}
                    onChange={(e) => setNewEventThreat(e.target.value)}
                    className={inputClass}
                  >
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="INFO">Info</option>
                  </select>
                </FormField>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <FormField label="Key Actor / Subject" required>
                  <input
                    type="text"
                    required
                    value={newEventActor}
                    onChange={(e) => setNewEventActor(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Location">
                  <input
                    type="text"
                    value={newEventLocation}
                    onChange={(e) => setNewEventLocation(e.target.value)}
                    placeholder="e.g. Delhi Cyber Hub"
                    className={inputClass}
                  />
                </FormField>

              </div>

              <FormField label="Detailed Description">
                <textarea
                  rows={4}
                  value={newEventDescription}
                  onChange={(e) => setNewEventDescription(e.target.value)}
                  placeholder="Provide concise investigative notes..."
                  className={`${inputClass} resize-none`}
                />
              </FormField>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-start gap-2.5">
                <ShieldCheck
                  size={16}
                  className="text-emerald-600 mt-0.5 shrink-0"
                />

                <p className="text-[11px] leading-5 text-slate-500">
                  A demo integrity signature will be generated for the event
                  record. Connect this workflow to the backend evidence
                  service for authoritative integrity verification.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                >
                  Add Event Marker
                </button>
              </div>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* Event Details Modal */}
      {selectedEventModal && (
        <ModalOverlay onClose={() => setSelectedEventModal(null)}>
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

            <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} />
                  Event Record
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-1 pr-8">
                  {selectedEventModal.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1">
                  {selectedEventModal.firNo} · {selectedEventModal.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedEventModal(null)}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DetailItem
                  label="Timestamp"
                  value={selectedEventModal.timestamp}
                  icon={Clock}
                />

                <DetailItem
                  label="Threat Level"
                  value={selectedEventModal.threatLevel}
                  icon={AlertTriangle}
                />

                <DetailItem
                  label="Key Actor"
                  value={selectedEventModal.actor}
                  icon={User}
                />

                <DetailItem
                  label="Location"
                  value={selectedEventModal.location}
                  icon={MapPin}
                />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Event Description
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 leading-5">
                  {selectedEventModal.description}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" />

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Integrity Metadata
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <p className="text-[10px] text-slate-400 mb-1">
                    SHA-256 field
                  </p>

                  <p className="font-mono text-[11px] text-slate-700 break-all">
                    {selectedEventModal.hashSignature}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() =>
                    handleDeleteEvent(selectedEventModal.id)
                  }
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold"
                >
                  <Trash2 size={14} />
                  Remove Marker
                </button>

                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </ModalOverlay>
      )}

    </div>
  );
}

/* ----------------------------- Components ----------------------------- */

const inputClass =
  'w-full h-10 bg-white border border-slate-200 rounded-xl px-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400 transition';

function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
  accent = 'cyan'
}) {
  const accentMap = {
    cyan: 'bg-cyan-50 text-cyan-700',
    red: 'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
    emerald: 'bg-emerald-50 text-emerald-700'
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
            {label}
          </p>

          <p className="text-2xl font-bold text-slate-900 mt-1">
            {value}
          </p>

          <p className="text-[11px] text-slate-400 mt-0.5">
            {detail}
          </p>
        </div>

        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${accentMap[accent]}`}
        >
          <Icon size={17} />
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ icon: Icon, value, onChange, options }) {
  return (
    <div className="h-10 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3">
      <Icon size={15} className="text-slate-400 shrink-0" />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
      >
        {options.map(([optionValue, label]) => (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FormField({ label, required = false, children }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function DetailItem({ label, value, icon: Icon }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-slate-400">
        <Icon size={12} />
        {label}
      </div>

      <p className="text-xs font-semibold text-slate-800 mt-1.5 break-words">
        {value}
      </p>
    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
}