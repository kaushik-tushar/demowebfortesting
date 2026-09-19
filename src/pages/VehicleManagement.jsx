import React, { useMemo, useState } from 'react';
import {
  Car,
  Search,
  Plus,
  FileText,
  Calendar,
  User,
  Tag,
  Edit2,
  Trash2,
  X,
  ShieldCheck,
  Database,
  Hash,
  MapPin,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  LayoutGrid,
  List,
} from 'lucide-react';

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([
    {
      id: 'V-001',
      rcNumber: 'MP09AB1234',
      date: '2026-06-10',
      ownerName: 'Rajesh Sharma',
      associatedCase: 'FIR #412/2026 (Cyber Heist)',
      chasisNumber: 'MA3EY6S100012345',
      color: 'Matte Black',
      vehicleType: 'SUV',
    },
    {
      id: 'V-002',
      rcNumber: 'DL4CXY9876',
      date: '2026-05-22',
      ownerName: 'Vikram Singh',
      associatedCase: 'FIR #389/2026 (Extortion)',
      chasisNumber: 'MALC8F5KH98129384',
      color: 'Pearl White',
      vehicleType: 'Sedan',
    },
    {
      id: 'V-003',
      rcNumber: 'MH02EE5544',
      date: '2026-04-15',
      ownerName: 'Amit Verma',
      associatedCase: 'FIR #210/2026 (Smuggling)',
      chasisNumber: 'MZ7FB2C110098234',
      color: 'Midnight Blue',
      vehicleType: 'Motorcycle',
    },
    {
      id: 'V-004',
      rcNumber: 'UP32ZZ7788',
      date: '2026-06-01',
      ownerName: 'Manoj Tiwari',
      associatedCase: 'FIR #115/2026 (Arms Act)',
      chasisNumber: 'MBH5541200987654',
      color: 'Army Green',
      vehicleType: 'Commercial',
    },
    {
      id: 'V-005',
      rcNumber: 'KA01HH9900',
      date: '2026-03-12',
      ownerName: 'Sanjay Kumar',
      associatedCase: 'FIR #092/2026 (Fraud)',
      chasisNumber: 'MA3ER2S188834211',
      color: 'Silver Grey',
      vehicleType: 'Hatchback',
    },
    {
      id: 'V-006',
      rcNumber: 'GJ01XY4433',
      date: '2026-05-18',
      ownerName: 'Jignesh Patel',
      associatedCase: 'FIR #304/2026 (Hawala)',
      chasisNumber: 'MALC7F4JJ55123908',
      color: 'Glossy Red',
      vehicleType: 'SUV',
    },
    {
      id: 'V-007',
      rcNumber: 'RJ14CP1122',
      date: '2026-02-28',
      ownerName: 'Kuldeep Rathore',
      associatedCase: 'FIR #045/2026 (Narcotics)',
      chasisNumber: 'MZ8FB9K332211009',
      color: 'Desert Sand',
      vehicleType: 'SUV',
    },
    {
      id: 'V-008',
      rcNumber: 'HR26DK5566',
      date: '2026-06-05',
      ownerName: 'Rohit Ahlawat',
      associatedCase: 'FIR #401/2026 (Kidnapping)',
      chasisNumber: 'MA3EW8L100099887',
      color: 'Graphite Grey',
      vehicleType: 'Sedan',
    },
    {
      id: 'V-009',
      rcNumber: 'WB02QW3344',
      date: '2026-04-10',
      ownerName: 'Subrata Sen',
      associatedCase: 'FIR #188/2026 (Extortion)',
      chasisNumber: 'MALC1A2BB33445566',
      color: 'Midnight Blue',
      vehicleType: 'Hatchback',
    },
    {
      id: 'V-010',
      rcNumber: 'TN07AC7788',
      date: '2026-01-19',
      ownerName: 'Karthik Raja',
      associatedCase: 'FIR #012/2026 (Cyber Crime)',
      chasisNumber: 'MZ5CC4D5566778899',
      color: 'Pearl White',
      vehicleType: 'Sedan',
    },
    {
      id: 'V-011',
      rcNumber: 'PB08EF1234',
      date: '2026-05-11',
      ownerName: 'Gurpreet Singh',
      associatedCase: 'FIR #275/2026 (Arms Act)',
      chasisNumber: 'MA3EE9X1122334455',
      color: 'Matte Black',
      vehicleType: 'SUV',
    },
    {
      id: 'V-012',
      rcNumber: 'AP31GH5678',
      date: '2026-03-30',
      ownerName: 'Ramesh Naidu',
      associatedCase: 'FIR #150/2026 (Smuggling)',
      chasisNumber: 'MALC4Y8ZZ99887766',
      color: 'Wine Red',
      vehicleType: 'Commercial',
    },
    {
      id: 'V-013',
      rcNumber: 'TS08JK9012',
      date: '2026-06-08',
      ownerName: 'Sumanth Reddy',
      associatedCase: 'FIR #410/2026 (Fraud)',
      chasisNumber: 'MZ2AA1B2233445566',
      color: 'Silver Grey',
      vehicleType: 'Hatchback',
    },
    {
      id: 'V-014',
      rcNumber: 'KL07LM3456',
      date: '2026-02-14',
      ownerName: 'Anish Joseph',
      associatedCase: 'FIR #067/2026 (Financial Scam)',
      chasisNumber: 'MA3FF3C4455667788',
      color: 'Forest Green',
      vehicleType: 'Sedan',
    },
    {
      id: 'V-015',
      rcNumber: 'BR01NP7890',
      date: '2026-04-25',
      ownerName: 'Alok Kumar Jha',
      associatedCase: 'FIR #230/2026 (Murder Investigation)',
      chasisNumber: 'MALC9D8EE11223344',
      color: 'Dark Blue',
      vehicleType: 'SUV',
    },
    {
      id: 'V-016',
      rcNumber: 'JH01QR1122',
      date: '2026-05-02',
      ownerName: 'Deepak Munda',
      associatedCase: 'FIR #290/2026 (Illegal Mining)',
      chasisNumber: 'MZ9GG7H8899001122',
      color: 'Yellow',
      vehicleType: 'Commercial',
    },
    {
      id: 'V-017',
      rcNumber: 'CG04ST3344',
      date: '2026-01-05',
      ownerName: 'Pawan Sahu',
      associatedCase: 'FIR #004/2026 (Naxal Link)',
      chasisNumber: 'MA3JJ1K2233445566',
      color: 'Olive Green',
      vehicleType: 'Motorcycle',
    },
    {
      id: 'V-018',
      rcNumber: 'UK07UV5566',
      date: '2026-03-21',
      ownerName: 'Navneet Rawat',
      associatedCase: 'FIR #145/2026 (Land Grab)',
      chasisNumber: 'MALC5L6MM77889900',
      color: 'Sky Blue',
      vehicleType: 'SUV',
    },
    {
      id: 'V-019',
      rcNumber: 'OD02WX7788',
      date: '2026-06-03',
      ownerName: 'Bikash Mohanty',
      associatedCase: 'FIR #395/2026 (Corruption)',
      chasisNumber: 'MZ3NN2P4455667788',
      color: 'Grey',
      vehicleType: 'Sedan',
    },
    {
      id: 'V-020',
      rcNumber: 'CH01YZ9012',
      date: '2026-05-29',
      ownerName: 'Harshvardhan',
      associatedCase: 'FIR #360/2026 (Cyber Heist)',
      chasisNumber: 'MA3QQ9R1122334455',
      color: 'Matte Black',
      vehicleType: 'SUV',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState('table');

  const [formData, setFormData] = useState({
    rcNumber: '',
    date: new Date().toISOString().split('T')[0],
    ownerName: '',
    associatedCase: '',
    chasisNumber: '',
    color: '',
    vehicleType: 'Sedan',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      rcNumber: '',
      date: new Date().toISOString().split('T')[0],
      ownerName: '',
      associatedCase: '',
      chasisNumber: '',
      color: '',
      vehicleType: 'Sedan',
    });
  };

  const openAddModal = () => {
    setEditingId(null);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle) => {
    setEditingId(vehicle.id);

    setFormData({
      rcNumber: vehicle.rcNumber,
      date: vehicle.date,
      ownerName: vehicle.ownerName,
      associatedCase: vehicle.associatedCase,
      chasisNumber: vehicle.chasisNumber,
      color: vehicle.color,
      vehicleType: vehicle.vehicleType,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    resetForm();
  };

  const handleSaveVehicle = (e) => {
    e.preventDefault();

    if (!formData.rcNumber || !formData.chasisNumber) return;

    if (editingId) {
      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id === editingId
            ? {
                ...vehicle,
                ...formData,
              }
            : vehicle
        )
      );
    } else {
      const nextNumber =
        Math.max(
          ...vehicles.map((vehicle) => {
            const numericPart = Number(vehicle.id.replace('V-', ''));
            return Number.isFinite(numericPart) ? numericPart : 0;
          })
        ) + 1;

      const newEntry = {
        id: `V-${String(nextNumber).padStart(3, '0')}`,
        ...formData,
      };

      setVehicles((prev) => [newEntry, ...prev]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this vehicle record?'
    );

    if (!confirmed) return;

    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
  };

  const filteredVehicles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return vehicles;

    return vehicles.filter((vehicle) =>
      [
        vehicle.rcNumber,
        vehicle.ownerName,
        vehicle.chasisNumber,
        vehicle.associatedCase,
        vehicle.vehicleType,
        vehicle.color,
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [vehicles, searchTerm]);

  const vehicleTypeCount = useMemo(() => {
    return vehicles.reduce((acc, vehicle) => {
      acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
      return acc;
    }, {});
  }, [vehicles]);

  const getTypeBadge = (type) => {
    const styles = {
      SUV: 'bg-blue-50 text-blue-700 border-blue-200',
      Sedan: 'bg-slate-50 text-slate-700 border-slate-200',
      Hatchback: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      Motorcycle: 'bg-amber-50 text-amber-700 border-amber-200',
      Commercial: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };

    return styles[type] || 'bg-slate-50 text-slate-700 border-slate-200';
  };

  return (
    <div className="min-h-full bg-[#f6f8fb] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-slate-500">
              <span>CrimeGraph AI</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span>Registry</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-700">Vehicles</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-600 shadow-sm">
                <Car className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                  Vehicle Intelligence & Registry
                </h1>

                <p className="mt-0.5 text-sm text-slate-500">
                  Manage vehicle records, registration details, ownership and
                  case associations.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Add Vehicle Record
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total Vehicles
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {vehicles.length}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                <Car className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Registered intelligence records
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Active Search
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {filteredVehicles.length}
                </p>
              </div>

              <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                <Search className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Records matching current query
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  SUV Records
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {vehicleTypeCount.SUV || 0}
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 p-2.5 text-amber-600">
                <LayoutGrid className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Classified SUV entries
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Registry Status
                </p>

                <p className="mt-2 flex items-center gap-1.5 text-lg font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Available
                </p>
              </div>

              <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600">
                <Database className="h-5 w-5" />
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Local prototype registry
            </p>
          </div>
        </div>

        {/* Search / Controls */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search RC number, owner, chassis, case, vehicle type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center justify-between gap-4 lg:justify-end">
              <div className="text-sm text-slate-500">
                Showing{' '}
                <span className="font-semibold text-slate-800">
                  {filteredVehicles.length}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-slate-800">
                  {vehicles.length}
                </span>{' '}
                records
              </div>

              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`rounded-md p-2 transition ${
                    viewMode === 'table'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Table view"
                >
                  <List className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setViewMode('cards')}
                  className={`rounded-md p-2 transition ${
                    viewMode === 'cards'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  title="Card view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Vehicle Registry
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Vehicle-level intelligence records associated with
                    investigations.
                  </p>
                </div>

                <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Controlled workspace
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-white text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-3">Registration</th>
                    <th className="px-5 py-3">Vehicle</th>
                    <th className="px-5 py-3">Chassis Number</th>
                    <th className="px-5 py-3">Registered Owner</th>
                    <th className="px-5 py-3">Associated Case</th>
                    <th className="px-5 py-3">Logged</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                      <tr
                        key={vehicle.id}
                        className="group transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                              <Tag className="h-3.5 w-3.5" />
                            </div>

                            <div>
                              <p className="font-mono text-sm font-semibold text-slate-900">
                                {vehicle.rcNumber}
                              </p>
                              <p className="mt-0.5 text-[11px] text-slate-400">
                                {vehicle.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="space-y-1.5">
                            <span
                              className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${getTypeBadge(
                                vehicle.vehicleType
                              )}`}
                            >
                              {vehicle.vehicleType}
                            </span>

                            <p className="text-xs text-slate-500">
                              {vehicle.color}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Hash className="h-3.5 w-3.5 text-slate-400" />
                            <span className="font-mono text-xs tracking-wide text-slate-600">
                              {vehicle.chasisNumber}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                              <User className="h-3.5 w-3.5" />
                            </div>

                            <span className="text-sm font-medium text-slate-800">
                              {vehicle.ownerName}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="max-w-[230px]">
                            <div className="flex items-start gap-2">
                              <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />

                              <span className="text-xs leading-5 text-slate-600">
                                {vehicle.associatedCase}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            {vehicle.date}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEditModal(vehicle)}
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                              title="Edit record"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() => handleDelete(vehicle.id)}
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                              title="Delete record"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-5 py-14 text-center">
                        <div className="mx-auto flex max-w-sm flex-col items-center">
                          <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400">
                            <Search className="h-5 w-5" />
                          </div>

                          <p className="text-sm font-semibold text-slate-700">
                            No vehicle records found
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Try adjusting the registration, owner, chassis or
                            case search.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Card View */}
        {viewMode === 'cards' && (
          <>
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Car className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-mono text-sm font-bold text-slate-900">
                            {vehicle.rcNumber}
                          </p>

                          <p className="text-xs text-slate-400">
                            {vehicle.id}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`rounded-md border px-2 py-1 text-[11px] font-medium ${getTypeBadge(
                          vehicle.vehicleType
                        )}`}
                      >
                        {vehicle.vehicleType}
                      </span>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="mt-0.5 h-4 w-4 text-slate-400" />

                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-400">
                            Registered Owner
                          </p>
                          <p className="mt-0.5 text-sm font-medium text-slate-800">
                            {vehicle.ownerName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Hash className="mt-0.5 h-4 w-4 text-slate-400" />

                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-400">
                            Chassis Number
                          </p>
                          <p className="mt-0.5 break-all font-mono text-xs text-slate-600">
                            {vehicle.chasisNumber}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FileText className="mt-0.5 h-4 w-4 text-slate-400" />

                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-400">
                            Associated Case
                          </p>
                          <p className="mt-0.5 text-xs leading-5 text-slate-600">
                            {vehicle.associatedCase}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-slate-400" />

                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-400">
                            Color Profile
                          </p>
                          <p className="mt-0.5 text-xs text-slate-600">
                            {vehicle.color}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-slate-400" />

                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-400">
                            Date Logged
                          </p>
                          <p className="mt-0.5 text-xs text-slate-600">
                            {vehicle.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                      <button
                        onClick={() => openEditModal(vehicle)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto mb-3 w-fit rounded-full bg-slate-100 p-3 text-slate-400">
                  <Search className="h-5 w-5" />
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  No vehicle records found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try adjusting your search query.
                </p>
              </div>
            )}
          </>
        )}

        {/* Registry Note */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <div className="mt-0.5 rounded-lg bg-white p-2 text-blue-600 shadow-sm">
            <AlertCircle className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-800">
              Vehicle intelligence workspace
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-600">
              These records are maintained as part of the CrimeGraph AI
              prototype workspace. Production deployment should connect this
              registry to the authoritative case and evidence database with
              appropriate access controls and audit logging.
            </p>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Car className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    {editingId
                      ? 'Edit Vehicle Record'
                      : 'Register Vehicle Record'}
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {editingId
                      ? `Updating ${editingId}`
                      : 'Add a vehicle to the investigation registry'}
                  </p>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveVehicle}>
              <div className="space-y-5 px-6 py-6">
                <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />

                    <p className="text-xs font-medium text-slate-700">
                      Registry fields marked with * are required.
                    </p>
                  </div>
                </div>

                {/* Registration + Chassis */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      RC Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="rcNumber"
                      required
                      placeholder="e.g. MP09XY1234"
                      value={formData.rcNumber}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Chassis Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      name="chasisNumber"
                      required
                      placeholder="17-character chassis number"
                      value={formData.chasisNumber}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Owner + Case */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Registered Owner
                    </label>

                    <input
                      type="text"
                      name="ownerName"
                      placeholder="Full legal name"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Associated Case / FIR
                    </label>

                    <input
                      type="text"
                      name="associatedCase"
                      placeholder="e.g. FIR #412/2026"
                      value={formData.associatedCase}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Type + Color + Date */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Vehicle Type
                    </label>

                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Color
                    </label>

                    <input
                      type="text"
                      name="color"
                      placeholder="e.g. Matte Black"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700">
                      Date Logged
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
                <p className="hidden text-xs text-slate-400 sm:block">
                  Vehicle ID is generated automatically.
                </p>

                <div className="flex w-full justify-end gap-3 sm:w-auto">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {editingId ? 'Update Record' : 'Save Record'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}