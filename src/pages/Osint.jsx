import React, { useMemo, useState } from 'react';
import {
  Globe,
  Search,
  Download,
  RefreshCw,
  Share2,
  MapPin,
  Camera,
  AlertTriangle,
  UserCheck,
  Hash,
  Link as LinkIcon,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Activity,
  Database,
  ChevronRight,
  CheckCircle2,
  Clock3,
  Users,
  Radio,
  Eye,
} from 'lucide-react';

/*
 * CrimeGraph AI
 * OSINT & Social Media Intelligence
 *
 * All records below are fictional demo data for SIH presentation/testing.
 */

const mockOsintEntries = [
  {
    id: 'OSINT-001',
    name: 'Vikram Raja',
    alias: 'Raja',
    entityId: 'ENT-801',
    caseId: 'CASE-2026-042',
    risk: 'HIGH',
    confidence: 94,
    location: 'New Delhi',
    lastSeen: '24 Sep 2026',
    status: 'ACTIVE',
    summary:
      'Cross-platform identity correlation detected across multiple public social profiles.',
    socialHandles: [
      {
        platform: 'Instagram',
        handle: '@vikram_raja26',
        status: 'ACTIVE',
        followers: '8.4K',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@raja_vikram',
        status: 'ACTIVE',
        followers: '2.1K',
        verified: false,
      },
      {
        platform: 'Facebook',
        handle: 'Vikram.Raja.26',
        status: 'ACTIVE',
        followers: '3.7K',
        verified: false,
      },
      {
        platform: 'Telegram',
        handle: '@vikram_r26',
        status: 'PRIVATE',
        followers: '—',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Meeting moved to the usual location tonight.',
        platform: 'X',
        timestamp: '23 Sep 2026 • 22:14',
        risk: 'HIGH',
      },
      {
        text: 'New route confirmed. Avoid the main road.',
        platform: 'Instagram',
        timestamp: '22 Sep 2026 • 20:42',
        risk: 'MEDIUM',
      },
    ],
  },

  {
    id: 'OSINT-002',
    name: 'Amit Verma',
    alias: 'AV88',
    entityId: 'ENT-802',
    caseId: 'CASE-2026-042',
    risk: 'MEDIUM',
    confidence: 88,
    location: 'Noida',
    lastSeen: '23 Sep 2026',
    status: 'ACTIVE',
    summary:
      'Matching usernames, profile metadata and interaction patterns found across public accounts.',
    socialHandles: [
      {
        platform: 'Instagram',
        handle: '@amit_verma88',
        status: 'ACTIVE',
        followers: '5.8K',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@amitv_88',
        status: 'ACTIVE',
        followers: '1.4K',
        verified: false,
      },
      {
        platform: 'Facebook',
        handle: 'Amit.Verma88',
        status: 'ACTIVE',
        followers: '2.9K',
        verified: false,
      },
      {
        platform: 'Telegram',
        handle: '@amit_v88',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
      {
        platform: 'LinkedIn',
        handle: 'amit-verma-88',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Project update shared with connected accounts.',
        platform: 'LinkedIn',
        timestamp: '23 Sep 2026 • 16:20',
        risk: 'LOW',
      },
    ],
  },

  {
    id: 'OSINT-003',
    name: 'Unknown Operator',
    alias: 'Shadow-47',
    entityId: 'ENT-805',
    caseId: 'CASE-2026-057',
    risk: 'CRITICAL',
    confidence: 97,
    location: 'Unknown',
    lastSeen: '25 Sep 2026',
    status: 'MONITORED',
    summary:
      'Anonymous identity cluster linked through recurring usernames and public-channel activity.',
    socialHandles: [
      {
        platform: 'Telegram',
        handle: '@shadow_ops47',
        status: 'ACTIVE',
        followers: '1.9K',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@shadow47_ops',
        status: 'SUSPENDED',
        followers: '640',
        verified: false,
      },
      {
        platform: 'Forum',
        handle: 'shadow47',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Channel activity spike detected during restricted hours.',
        platform: 'Telegram',
        timestamp: '25 Sep 2026 • 02:11',
        risk: 'CRITICAL',
      },
    ],
  },

  {
    id: 'OSINT-004',
    name: 'Rahul Malhotra',
    alias: 'RM47',
    entityId: 'ENT-803',
    caseId: 'CASE-2026-057',
    risk: 'HIGH',
    confidence: 91,
    location: 'Gurugram',
    lastSeen: '24 Sep 2026',
    status: 'ACTIVE',
    summary:
      'Multiple public profiles show strong username and profile-image similarity.',
    socialHandles: [
      {
        platform: 'Instagram',
        handle: '@rahul_m47',
        status: 'ACTIVE',
        followers: '7.1K',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@rahul_mal',
        status: 'ACTIVE',
        followers: '2.8K',
        verified: false,
      },
      {
        platform: 'Facebook',
        handle: 'Rahul.Malhotra47',
        status: 'ACTIVE',
        followers: '4.1K',
        verified: false,
      },
      {
        platform: 'Telegram',
        handle: '@rm47_official',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Location metadata overlaps with another monitored account.',
        platform: 'Instagram',
        timestamp: '24 Sep 2026 • 19:31',
        risk: 'HIGH',
      },
    ],
  },

  {
    id: 'OSINT-005',
    name: 'Neha Sharma',
    alias: 'NS21',
    entityId: 'ENT-806',
    caseId: 'CASE-2026-061',
    risk: 'LOW',
    confidence: 82,
    location: 'Ghaziabad',
    lastSeen: '21 Sep 2026',
    status: 'ACTIVE',
    summary:
      'Public profile association detected with moderate identity confidence.',
    socialHandles: [
      {
        platform: 'Instagram',
        handle: '@neha_sharma21',
        status: 'ACTIVE',
        followers: '9.2K',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@neha_s21',
        status: 'ACTIVE',
        followers: '1.2K',
        verified: false,
      },
      {
        platform: 'Facebook',
        handle: 'Neha.Sharma21',
        status: 'ACTIVE',
        followers: '5.4K',
        verified: false,
      },
      {
        platform: 'LinkedIn',
        handle: 'neha-sharma-21',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Public post references a monitored location.',
        platform: 'Instagram',
        timestamp: '21 Sep 2026 • 14:08',
        risk: 'LOW',
      },
    ],
  },

  {
    id: 'OSINT-006',
    name: 'Apex Shell Corp',
    alias: 'ASC',
    entityId: 'ENT-807',
    caseId: 'CASE-2026-057',
    risk: 'HIGH',
    confidence: 89,
    location: 'Mumbai',
    lastSeen: '25 Sep 2026',
    status: 'MONITORED',
    summary:
      'Corporate identity appears across website and multiple social profiles.',
    socialHandles: [
      {
        platform: 'Instagram',
        handle: '@apexshellcorp',
        status: 'ACTIVE',
        followers: '3.2K',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@apex_shell',
        status: 'ACTIVE',
        followers: '1.7K',
        verified: false,
      },
      {
        platform: 'Facebook',
        handle: 'Apex Shell Corp',
        status: 'ACTIVE',
        followers: '2.4K',
        verified: false,
      },
      {
        platform: 'LinkedIn',
        handle: 'apex-shell-corp',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
      {
        platform: 'Website',
        handle: 'apexshell.example',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Corporate announcement overlaps with transaction timeline.',
        platform: 'LinkedIn',
        timestamp: '25 Sep 2026 • 11:52',
        risk: 'HIGH',
      },
    ],
  },

  {
    id: 'OSINT-007',
    name: 'Sanjay Rao',
    alias: 'SR09',
    entityId: 'ENT-808',
    caseId: 'CASE-2026-063',
    risk: 'MEDIUM',
    confidence: 79,
    location: 'Jaipur',
    lastSeen: '20 Sep 2026',
    status: 'ACTIVE',
    summary:
      'Possible cross-platform account ownership based on username similarity.',
    socialHandles: [
      {
        platform: 'Instagram',
        handle: '@sanjay_rao09',
        status: 'ACTIVE',
        followers: '3.9K',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@srao_09',
        status: 'ACTIVE',
        followers: '980',
        verified: false,
      },
      {
        platform: 'Facebook',
        handle: 'Sanjay.Rao09',
        status: 'ACTIVE',
        followers: '2.1K',
        verified: false,
      },
      {
        platform: 'Telegram',
        handle: '@srao09',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Public profile shows repeated references to the same city.',
        platform: 'X',
        timestamp: '20 Sep 2026 • 09:46',
        risk: 'MEDIUM',
      },
    ],
  },

  {
    id: 'OSINT-008',
    name: 'DarkMarket Alias',
    alias: 'DM-47',
    entityId: 'ENT-809',
    caseId: 'CASE-2026-042',
    risk: 'CRITICAL',
    confidence: 96,
    location: 'Unknown',
    lastSeen: '25 Sep 2026',
    status: 'MONITORED',
    summary:
      'Alias observed across forum and encrypted messaging references.',
    socialHandles: [
      {
        platform: 'Forum',
        handle: 'dm_alias47',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
      {
        platform: 'Telegram',
        handle: '@dm_vendor47',
        status: 'ACTIVE',
        followers: '870',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@dm_alias47',
        status: 'SUSPENDED',
        followers: '310',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Alias referenced in multiple public forum discussions.',
        platform: 'Forum',
        timestamp: '25 Sep 2026 • 01:38',
        risk: 'CRITICAL',
      },
    ],
  },

  {
    id: 'OSINT-009',
    name: 'Karan Singh',
    alias: 'KS77',
    entityId: 'ENT-810',
    caseId: 'CASE-2026-068',
    risk: 'HIGH',
    confidence: 90,
    location: 'Faridabad',
    lastSeen: '23 Sep 2026',
    status: 'ACTIVE',
    summary:
      'High similarity score across messaging and public social accounts.',
    socialHandles: [
      {
        platform: 'Instagram',
        handle: '@karan_singh77',
        status: 'ACTIVE',
        followers: '6.7K',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@ksingh77',
        status: 'ACTIVE',
        followers: '1.8K',
        verified: false,
      },
      {
        platform: 'Facebook',
        handle: 'Karan.Singh77',
        status: 'ACTIVE',
        followers: '3.6K',
        verified: false,
      },
      {
        platform: 'Telegram',
        handle: '@karan_ops',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
      {
        platform: 'YouTube',
        handle: '@KaranSingh77',
        status: 'ACTIVE',
        followers: '1.1K',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Video metadata shares location indicators with monitored activity.',
        platform: 'YouTube',
        timestamp: '23 Sep 2026 • 17:26',
        risk: 'HIGH',
      },
    ],
  },

  {
    id: 'OSINT-010',
    name: 'Priya Kapoor',
    alias: 'PK23',
    entityId: 'ENT-811',
    caseId: 'CASE-2026-071',
    risk: 'LOW',
    confidence: 76,
    location: 'Bhopal',
    lastSeen: '19 Sep 2026',
    status: 'ACTIVE',
    summary:
      'Low-risk public profile cluster identified through shared identifiers.',
    socialHandles: [
      {
        platform: 'Instagram',
        handle: '@priya_k23',
        status: 'ACTIVE',
        followers: '4.8K',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@priya_kapoor',
        status: 'ACTIVE',
        followers: '1.1K',
        verified: false,
      },
      {
        platform: 'Facebook',
        handle: 'Priya.Kapoor23',
        status: 'ACTIVE',
        followers: '3.2K',
        verified: false,
      },
      {
        platform: 'LinkedIn',
        handle: 'priya-kapoor-23',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Public post matched against a known geographic indicator.',
        platform: 'Instagram',
        timestamp: '19 Sep 2026 • 13:16',
        risk: 'LOW',
      },
    ],
  },

  {
    id: 'OSINT-011',
    name: 'Unknown Financial Handle',
    alias: 'FIN-91',
    entityId: 'ENT-812',
    caseId: 'CASE-2026-057',
    risk: 'CRITICAL',
    confidence: 98,
    location: 'Mumbai',
    lastSeen: '25 Sep 2026',
    status: 'MONITORED',
    summary:
      'Anonymous financial alias linked through repeated public-channel references.',
    socialHandles: [
      {
        platform: 'Telegram',
        handle: '@fintrace_91',
        status: 'ACTIVE',
        followers: '2.3K',
        verified: false,
      },
      {
        platform: 'Forum',
        handle: 'fintrace91',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@fintrace_91',
        status: 'SUSPENDED',
        followers: '490',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Financial keyword cluster detected in public-channel activity.',
        platform: 'Telegram',
        timestamp: '25 Sep 2026 • 03:07',
        risk: 'CRITICAL',
      },
    ],
  },

  {
    id: 'OSINT-012',
    name: 'Mohit Bansal',
    alias: 'MB19',
    entityId: 'ENT-813',
    caseId: 'CASE-2026-074',
    risk: 'MEDIUM',
    confidence: 84,
    location: 'Lucknow',
    lastSeen: '18 Sep 2026',
    status: 'ACTIVE',
    summary:
      'Multiple public accounts correlate through usernames and profile metadata.',
    socialHandles: [
      {
        platform: 'Instagram',
        handle: '@mohit_b19',
        status: 'ACTIVE',
        followers: '4.1K',
        verified: false,
      },
      {
        platform: 'X',
        handle: '@mbansal19',
        status: 'ACTIVE',
        followers: '1.3K',
        verified: false,
      },
      {
        platform: 'Facebook',
        handle: 'Mohit.Bansal19',
        status: 'ACTIVE',
        followers: '2.7K',
        verified: false,
      },
      {
        platform: 'Telegram',
        handle: '@mohit_b19',
        status: 'ACTIVE',
        followers: '—',
        verified: false,
      },
    ],
    posts: [
      {
        text: 'Account activity matches previously observed username patterns.',
        platform: 'Facebook',
        timestamp: '18 Sep 2026 • 18:43',
        risk: 'MEDIUM',
      },
    ],
  },
];

const platformConfig = {
  Instagram: {
    icon: Instagram,
    label: 'Instagram',
    className: 'text-pink-600 bg-pink-50 border-pink-100',
  },
  X: {
    icon: Hash,
    label: 'X',
    className: 'text-slate-800 bg-slate-100 border-slate-200',
  },
  Facebook: {
    icon: Facebook,
    label: 'Facebook',
    className: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  Telegram: {
    icon: MessageCircle,
    label: 'Telegram',
    className: 'text-sky-600 bg-sky-50 border-sky-100',
  },
  LinkedIn: {
    icon: Linkedin,
    label: 'LinkedIn',
    className: 'text-blue-700 bg-blue-50 border-blue-100',
  },
  YouTube: {
    icon: Youtube,
    label: 'YouTube',
    className: 'text-red-600 bg-red-50 border-red-100',
  },
  Forum: {
    icon: Globe,
    label: 'Forum',
    className: 'text-violet-600 bg-violet-50 border-violet-100',
  },
  Website: {
    icon: Globe,
    label: 'Website',
    className: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
};

const riskConfig = {
  CRITICAL: {
    className: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
  },
  HIGH: {
    className: 'bg-orange-50 text-orange-700 border-orange-200',
    dot: 'bg-orange-500',
  },
  MEDIUM: {
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  LOW: {
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
};

const getRiskBadge = (risk) => {
  const config = riskConfig[risk] || riskConfig.MEDIUM;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold tracking-wide ${config.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {risk}
    </span>
  );
};

const getPlatformIcon = (platform, size = 15) => {
  const config = platformConfig[platform] || platformConfig.Website;
  const Icon = config.icon;
  return <Icon size={size} />;
};

function Osint() {
  const [searchTarget, setSearchTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [activeTab, setActiveTab] = useState('Footprint');
  const [selectedEntity, setSelectedEntity] = useState(mockOsintEntries[0]);

  const handleScan = () => {
    if (!searchTarget.trim()) {
      alert('Enter a target name, username, phone number or identifier.');
      return;
    }

    setIsScanning(true);
    setHasResults(false);

    setTimeout(() => {
      const normalized = searchTarget.trim().toLowerCase();

      const matched =
        mockOsintEntries.find(
          (entry) =>
            entry.name.toLowerCase().includes(normalized) ||
            entry.alias.toLowerCase().includes(normalized) ||
            entry.entityId.toLowerCase().includes(normalized) ||
            entry.caseId.toLowerCase().includes(normalized) ||
            entry.socialHandles.some((account) =>
              account.handle.toLowerCase().includes(normalized)
            )
        ) || mockOsintEntries[0];

      setSelectedEntity(matched);
      setHasResults(true);
      setIsScanning(false);
    }, 1800);
  };

  const handleExport = () => {
    const rows = mockOsintEntries.flatMap((entry) =>
      entry.socialHandles.map((account) => ({
        Record_ID: entry.id,
        Entity: entry.name,
        Alias: entry.alias,
        Entity_ID: entry.entityId,
        Case_ID: entry.caseId,
        Platform: account.platform,
        Handle: account.handle,
        Account_Status: account.status,
        Followers: account.followers,
        Risk: entry.risk,
        Confidence: `${entry.confidence}%`,
        Location: entry.location,
      }))
    );

    const headers = Object.keys(rows[0]);

    const csv = [
      headers.join(','),
      ...rows.map((row) =>
        headers
          .map((header) => `"${String(row[header]).replace(/"/g, '""')}"`)
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'crimegraph_osint_social_identities.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setSearchTarget('');
    setHasResults(false);
    setIsScanning(false);
    setActiveTab('Footprint');
    setSelectedEntity(mockOsintEntries[0]);
  };

  const filteredEntries = useMemo(() => {
    const query = searchTarget.trim().toLowerCase();

    if (!query) {
      return mockOsintEntries;
    }

    const filtered = mockOsintEntries.filter((entry) => {
      const searchableText = [
        entry.id,
        entry.name,
        entry.alias,
        entry.entityId,
        entry.caseId,
        entry.location,
        entry.risk,
        ...entry.socialHandles.flatMap((account) => [
          account.platform,
          account.handle,
          account.status,
        ]),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });

    return filtered.length ? filtered : mockOsintEntries;
  }, [searchTarget]);

  const metrics = useMemo(() => {
    const totalHandles = mockOsintEntries.reduce(
      (sum, entry) => sum + entry.socialHandles.length,
      0
    );

    const locations = new Set(
      mockOsintEntries
        .map((entry) => entry.location)
        .filter((location) => location !== 'Unknown')
    );

    const critical = mockOsintEntries.filter(
      (entry) => entry.risk === 'CRITICAL'
    ).length;

    const high = mockOsintEntries.filter(
      (entry) => entry.risk === 'HIGH'
    ).length;

    const platforms = new Set(
      mockOsintEntries.flatMap((entry) =>
        entry.socialHandles.map((account) => account.platform)
      )
    );

    return {
      entities: mockOsintEntries.length,
      handles: totalHandles,
      locations: locations.size,
      critical,
      high,
      platforms: platforms.size,
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-5">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Globe size={17} className="text-blue-600" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
                  OSINT MODULE
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                OSINT & Social Media Intelligence
              </h1>

              <p className="text-xs text-slate-500 mt-1">
                Cross-platform identity discovery, public-source correlation
                and digital footprint analysis.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 transition"
              >
                <RefreshCw size={14} />
                Reset
              </button>

              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
              >
                <Download size={14} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Search */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Search size={15} className="text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800">
              Digital Footprint Search
            </h2>
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchTarget}
                onChange={(e) => setSearchTarget(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleScan();
                  }
                }}
                placeholder="Search person, alias, username, Entity ID or Case ID..."
                className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <button
              onClick={handleScan}
              disabled={isScanning}
              className="min-w-[130px] h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition"
            >
              {isScanning ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search size={14} />
                  Run OSINT Scan
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {[
              'Vikram Raja',
              'Amit Verma',
              'OSINT-003',
              'CASE-2026-057',
              '@karan_singh77',
            ].map((target) => (
              <button
                key={target}
                onClick={() => setSearchTarget(target)}
                className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-medium text-slate-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition"
              >
                {target}
              </button>
            ))}
          </div>
        </div>

        {/* Scanning */}
        {isScanning && (
          <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Globe size={19} className="text-blue-600 animate-pulse" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-slate-800">
                    OSINT correlation engine running
                  </p>

                  <span className="text-[10px] font-mono text-blue-600">
                    ANALYZING
                  </span>
                </div>

                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[72%] animate-pulse" />
                </div>

                <p className="text-[10px] text-slate-400 mt-2">
                  Enumerating public profiles • matching usernames • comparing
                  metadata • resolving identities
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          <MetricCard
            label="Entities"
            value={metrics.entities}
            icon={Users}
          />

          <MetricCard
            label="Social Handles"
            value={metrics.handles}
            icon={Globe}
          />

          <MetricCard
            label="Platforms"
            value={metrics.platforms}
            icon={Radio}
          />

          <MetricCard
            label="Geo Locations"
            value={metrics.locations}
            icon={MapPin}
          />

          <MetricCard
            label="High Risk"
            value={metrics.high}
            icon={AlertTriangle}
          />

          <MetricCard
            label="Critical Flags"
            value={metrics.critical}
            icon={ShieldCheck}
            critical
          />
        </div>

        {/* Main intelligence workspace */}
        <div className="grid grid-cols-1 xl:grid-cols-[330px_1fr] gap-5">
          {/* Entity list */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold text-slate-800">
                  Discovered Identities
                </h2>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {filteredEntries.length} records
                </p>
              </div>

              <Database size={15} className="text-slate-400" />
            </div>

            <div className="max-h-[610px] overflow-y-auto">
              {filteredEntries.map((entry) => {
                const isSelected = selectedEntity.id === entry.id;

                return (
                  <button
                    key={entry.id}
                    onClick={() => {
                      setSelectedEntity(entry);
                      setHasResults(true);
                    }}
                    className={`w-full text-left px-4 py-3 border-b border-slate-100 transition ${
                      isSelected
                        ? 'bg-blue-50 border-l-2 border-l-blue-600'
                        : 'hover:bg-slate-50 border-l-2 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">
                          {entry.name}
                        </p>

                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {entry.alias} • {entry.entityId}
                        </p>
                      </div>

                      {getRiskBadge(entry.risk)}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="inline-flex items-center gap-1 text-[9px] text-slate-400">
                        <MapPin size={10} />
                        {entry.location}
                      </span>

                      <span className="inline-flex items-center gap-1 text-[9px] text-blue-600 font-semibold">
                        <Globe size={10} />
                        {entry.socialHandles.length} handles
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intelligence detail */}
          <div className="space-y-5">
            {!hasResults ? (
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm min-h-[610px] flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                    <Globe size={25} className="text-blue-600" />
                  </div>

                  <h2 className="text-base font-bold text-slate-800">
                    Start an OSINT investigation
                  </h2>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Search a target to correlate public digital identities,
                    social-media handles, locations, posts and network
                    relationships.
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-5 text-left">
                    <InfoMini
                      icon={Globe}
                      title="Multi-platform"
                      text="Correlate multiple social handles"
                    />
                    <InfoMini
                      icon={MapPin}
                      title="Geo Signals"
                      text="Extract public location indicators"
                    />
                    <InfoMini
                      icon={Hash}
                      title="Identity Match"
                      text="Username and metadata correlation"
                    />
                    <InfoMini
                      icon={Activity}
                      title="Risk Analysis"
                      text="Flag suspicious activity patterns"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Selected entity header */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <UserCheck size={22} className="text-blue-600" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-lg font-bold text-slate-900">
                            {selectedEntity.name}
                          </h2>

                          {getRiskBadge(selectedEntity.risk)}
                        </div>

                        <div className="flex items-center gap-3 flex-wrap mt-1">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {selectedEntity.entityId}
                          </span>

                          <span className="text-[10px] text-slate-400">
                            Case: {selectedEntity.caseId}
                          </span>

                          <span className="inline-flex items-center gap-1 text-[10px] text-slate-500">
                            <MapPin size={10} />
                            {selectedEntity.location}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-3 max-w-2xl">
                          {selectedEntity.summary}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-[9px] uppercase tracking-wider text-slate-400">
                        Identity Confidence
                      </p>

                      <p className="text-2xl font-bold text-blue-600 mt-0.5">
                        {selectedEntity.confidence}%
                      </p>

                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${selectedEntity.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="border-b border-slate-200 px-4">
                    <div className="flex items-center gap-5">
                      {['Footprint', 'Extracted Media', 'Network Ties'].map(
                        (tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative py-3 text-xs font-semibold transition ${
                              activeTab === tab
                                ? 'text-blue-600'
                                : 'text-slate-400 hover:text-slate-700'
                            }`}
                          >
                            {tab}

                            {activeTab === tab && (
                              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-blue-600 rounded-full" />
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    {activeTab === 'Footprint' && (
                      <FootprintTab entity={selectedEntity} />
                    )}

                    {activeTab === 'Extracted Media' && (
                      <MediaTab entity={selectedEntity} />
                    )}

                    {activeTab === 'Network Ties' && (
                      <NetworkTab entity={selectedEntity} />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* All discovered handles */}
        {hasResults && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-800">
                  Cross-Platform Identity Correlation
                </h2>

                <p className="text-[10px] text-slate-400 mt-1">
                  Multiple public handles associated with each discovered
                  entity.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-bold">
                <LinkIcon size={11} />
                {metrics.handles} HANDLE LINKS
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider font-bold text-slate-400">
                      Entity
                    </th>
                    <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider font-bold text-slate-400">
                      Platform
                    </th>
                    <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider font-bold text-slate-400">
                      Handle
                    </th>
                    <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider font-bold text-slate-400">
                      Account
                    </th>
                    <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider font-bold text-slate-400">
                      Risk
                    </th>
                    <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider font-bold text-slate-400">
                      Confidence
                    </th>
                    <th className="text-left px-4 py-3 text-[9px] uppercase tracking-wider font-bold text-slate-400">
                      Case
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {mockOsintEntries.flatMap((entry) =>
                    entry.socialHandles.map((account, index) => {
                      const platform =
                        platformConfig[account.platform] ||
                        platformConfig.Website;

                      return (
                        <tr
                          key={`${entry.id}-${account.platform}-${index}`}
                          className="border-b border-slate-100 hover:bg-slate-50 transition"
                        >
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {
                                setSelectedEntity(entry);
                                setHasResults(true);
                                setActiveTab('Footprint');
                              }}
                              className="text-left"
                            >
                              <p className="text-xs font-semibold text-slate-800 hover:text-blue-600">
                                {entry.name}
                              </p>
                              <p className="text-[9px] text-slate-400 font-mono">
                                {entry.entityId}
                              </p>
                            </button>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-semibold ${platform.className}`}
                            >
                              {getPlatformIcon(account.platform, 12)}
                              {account.platform}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span className="text-xs font-mono font-semibold text-slate-700">
                              {account.handle}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 text-[9px] font-bold ${
                                account.status === 'ACTIVE'
                                  ? 'text-emerald-600'
                                  : account.status === 'PRIVATE'
                                    ? 'text-amber-600'
                                    : 'text-red-600'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  account.status === 'ACTIVE'
                                    ? 'bg-emerald-500'
                                    : account.status === 'PRIVATE'
                                      ? 'bg-amber-500'
                                      : 'bg-red-500'
                                }`}
                              />

                              {account.status}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            {getRiskBadge(entry.risk)}
                          </td>

                          <td className="px-4 py-3">
                            <span className="text-xs font-bold text-blue-600">
                              {entry.confidence}%
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <span className="text-[10px] font-mono text-slate-500">
                              {entry.caseId}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Demo notice */}
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-100">
          <AlertTriangle
            size={14}
            className="text-amber-600 mt-0.5 shrink-0"
          />

          <p className="text-[10px] text-amber-700 leading-relaxed">
            <strong>Demo Environment:</strong> All identities, usernames,
            locations, cases and social-media records displayed in this module
            are fictional mock data intended for demonstration and system
            testing.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Metric Card                                                                */
/* -------------------------------------------------------------------------- */

function MetricCard({
  label,
  value,
  icon: Icon,
  critical = false,
}) {
  return (
    <div
      className={`bg-white border rounded-xl p-4 shadow-sm ${
        critical ? 'border-red-100' : 'border-slate-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            critical
              ? 'bg-red-50 text-red-600'
              : 'bg-slate-50 text-slate-500'
          }`}
        >
          <Icon size={16} />
        </div>

        <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
          OSINT
        </span>
      </div>

      <p className="text-xl font-bold text-slate-900 mt-3">{value}</p>

      <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Footprint Tab                                                              */
/* -------------------------------------------------------------------------- */

function FootprintTab({ entity }) {
  return (
    <div className="space-y-5">
      {/* Multi-platform identity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-800">
              Multi-Platform Social Identity
            </h3>

            <p className="text-[10px] text-slate-400 mt-0.5">
              Correlated public handles for the selected entity
            </p>
          </div>

          <span className="text-[10px] font-bold text-blue-600">
            {entity.socialHandles.length} PLATFORMS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {entity.socialHandles.map((account, index) => {
            const platform =
              platformConfig[account.platform] || platformConfig.Website;

            return (
              <div
                key={`${account.platform}-${index}`}
                className="border border-slate-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center ${platform.className}`}
                    >
                      {getPlatformIcon(account.platform, 17)}
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {account.platform}
                      </p>

                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Public account
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-bold ${
                      account.status === 'ACTIVE'
                        ? 'text-emerald-600'
                        : account.status === 'PRIVATE'
                          ? 'text-amber-600'
                          : 'text-red-600'
                    }`}
                  >
                    {account.status}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-mono font-semibold text-slate-700 truncate">
                    {account.handle}
                  </span>

                  {account.handle && (
                    <button
                      onClick={() =>
                        alert(
                          `Demo action: Open ${account.platform} profile ${account.handle}`
                        )
                      }
                      className="inline-flex items-center gap-1 text-[9px] font-bold text-blue-600 hover:text-blue-700 shrink-0"
                    >
                      Open
                      <ExternalLink size={10} />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[9px] text-slate-400">
                    Followers / Reach
                  </span>

                  <span className="text-[10px] font-semibold text-slate-600">
                    {account.followers}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Correlation signal */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white border border-blue-100 flex items-center justify-center">
            <LinkIcon size={15} className="text-blue-600" />
          </div>

          <div>
            <p className="text-xs font-bold text-blue-900">
              Cross-platform correlation detected
            </p>

            <p className="text-[10px] text-blue-700 mt-1 leading-relaxed">
              Matching usernames, profile metadata and public activity signals
              indicate that the listed handles may belong to the same digital
              identity cluster. Correlation confidence:{' '}
              <strong>{entity.confidence}%</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Flagged posts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-800">
            Flagged Public Activity
          </h3>

          <span className="text-[9px] text-slate-400">
            {entity.posts.length} signals
          </span>
        </div>

        <div className="space-y-2">
          {entity.posts.map((post, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg p-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Activity size={13} className="text-slate-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold text-slate-700">
                      {post.platform}
                    </span>

                    {getRiskBadge(post.risk)}
                  </div>

                  <p className="text-xs text-slate-600 mt-1">
                    {post.text}
                  </p>

                  <div className="flex items-center gap-1 mt-2 text-[9px] text-slate-400">
                    <Clock3 size={10} />
                    {post.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Media Tab                                                                  */
/* -------------------------------------------------------------------------- */

function MediaTab({ entity }) {
  const mediaItems = [
    {
      type: 'Image',
      source:
        entity.socialHandles.find(
          (account) => account.platform === 'Instagram'
        )?.platform || 'Social Media',
      label: 'Profile / public image',
      signal: 'Metadata available',
    },
    {
      type: 'Video',
      source:
        entity.socialHandles.find(
          (account) => account.platform === 'YouTube'
        )?.platform || 'Public Source',
      label: 'Public video reference',
      signal: 'Frame analysis available',
    },
    {
      type: 'Location',
      source: 'Geo Metadata',
      label: entity.location,
      signal: 'Location correlation',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl p-4"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center mb-3">
              {item.type === 'Image' ? (
                <Camera size={17} className="text-slate-500" />
              ) : item.type === 'Video' ? (
                <Youtube size={17} className="text-red-500" />
              ) : (
                <MapPin size={17} className="text-blue-500" />
              )}
            </div>

            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
              {item.type}
            </p>

            <p className="text-xs font-bold text-slate-800 mt-1">
              {item.label}
            </p>

            <p className="text-[10px] text-slate-400 mt-1">
              Source: {item.source}
            </p>

            <div className="flex items-center gap-1 mt-3 text-[9px] font-semibold text-emerald-600">
              <CheckCircle2 size={11} />
              {item.signal}
            </div>
          </div>
        ))}
      </div>

      <div className="border border-slate-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Eye size={14} className="text-blue-600" />
          <h3 className="text-xs font-bold text-slate-800">
            Media Intelligence
          </h3>
        </div>

        <p className="text-[10px] text-slate-500 leading-relaxed">
          Public media references can be correlated with timestamps,
          locations, profile identifiers and other investigation entities.
          This demo view represents the media-analysis layer of CrimeGraph AI.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Network Tab                                                                */
/* -------------------------------------------------------------------------- */

function NetworkTab({ entity }) {
  const connections = [
    {
      name: 'Amit Verma',
      entity: 'ENT-802',
      relation: 'Social Interaction',
      confidence: '88%',
    },
    {
      name: 'Apex Shell Corp',
      entity: 'ENT-807',
      relation: 'Organizational Link',
      confidence: '81%',
    },
    {
      name: 'Unknown Operator',
      entity: 'ENT-805',
      relation: 'Shared Identifier',
      confidence: '76%',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <NetworkMetric
          label="Direct Ties"
          value="08"
        />
        <NetworkMetric
          label="2nd Degree"
          value="17"
        />
        <NetworkMetric
          label="Shared Signals"
          value="12"
        />
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
          <h3 className="text-xs font-bold text-slate-800">
            Related Investigation Entities
          </h3>
        </div>

        <div>
          {connections.map((connection, index) => (
            <div
              key={index}
              className="px-4 py-3 border-b border-slate-100 last:border-b-0 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Users size={14} className="text-blue-600" />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-800">
                  {connection.name}
                </p>

                <p className="text-[9px] text-slate-400 mt-0.5">
                  {connection.entity} • {connection.relation}
                </p>
              </div>

              <span className="text-[10px] font-bold text-blue-600">
                {connection.confidence}
              </span>

              <ChevronRight size={14} className="text-slate-300" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <Share2 size={14} className="text-slate-600" />

          <p className="text-xs font-bold text-slate-700">
            Graph relationship ready
          </p>
        </div>

        <p className="text-[10px] text-slate-500 mt-1">
          {entity.name} can be linked to the CrimeGraph entity network using
          the discovered handles, cases and public-source relationships.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Small Components                                                           */
/* -------------------------------------------------------------------------- */

function InfoMini({ icon: Icon, title, text }) {
  return (
    <div className="border border-slate-200 rounded-lg p-3 bg-white">
      <Icon size={14} className="text-blue-600" />

      <p className="text-[10px] font-bold text-slate-700 mt-2">
        {title}
      </p>

      <p className="text-[9px] text-slate-400 mt-0.5">
        {text}
      </p>
    </div>
  );
}

function NetworkMetric({ label, value }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
      <p className="text-lg font-bold text-slate-800">{value}</p>

      <p className="text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">
        {label}
      </p>
    </div>
  );
}

export default Osint;