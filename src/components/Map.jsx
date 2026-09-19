import React, { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  Radio,
  Layers,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Navigation,
  ShieldAlert,
  Compass,
  Filter,
  X,
} from 'lucide-react';

/**
 * Map Component
 * Interactive geospatial and investigation marker visualizer.
 *
 * @param {Object} props
 * @param {Array} [props.markers=[]]
 * @param {Object} [props.center={ lat: 28.627, lng: 77.372 }]
 * @param {number} [props.zoom=13]
 * @param {Function} [props.onMarkerClick]
 * @param {string} [props.className=""]
 */
export default function Map({
  markers = [
    {
      id: 'LOC-101',
      title: 'Sector 62 CDR Cell Tower Dump Node',
      lat: 28.627,
      lng: 77.372,
      type: 'TOWER',
      riskScore: 92,
      details: 'Peak density: 412 calls in 10-minute window',
    },
    {
      id: 'LOC-102',
      title: 'Primary Suspect Geo-Ping (Burner SIM)',
      lat: 28.631,
      lng: 77.378,
      type: 'SUSPECT',
      riskScore: 88,
      details: '+91 98210-XXXXX active near ATM Kiosk',
    },
    {
      id: 'LOC-103',
      title: 'Mule Account Cash Withdrawal Node',
      lat: 28.621,
      lng: 77.365,
      type: 'ATM',
      riskScore: 65,
      details: 'Axis Bank ATM #4012 - ₹4,50,000 withdrawn',
    },
  ],
  center = { lat: 28.627, lng: 77.372 },
  zoom = 13,
  onMarkerClick,
  className = '',
}) {
  const [selectedMarker, setSelectedMarker] = useState(
    markers[0] || null
  );

  const [currentZoom, setCurrentZoom] = useState(zoom);

  const [layerMode, setLayerMode] = useState('VECTOR');

  const [showDetails, setShowDetails] = useState(true);

  const mapRef = useRef(null);

  /* -------------------------------------------------------
     Keep selected marker valid when marker data changes
  ------------------------------------------------------- */

  useEffect(() => {
    if (!markers.length) {
      setSelectedMarker(null);
      return;
    }

    setSelectedMarker((current) => {
      const stillExists = markers.find(
        (marker) => marker.id === current?.id
      );

      return stillExists || markers[0];
    });
  }, [markers]);

  /* -------------------------------------------------------
     Zoom Controls
  ------------------------------------------------------- */

  const handleZoomIn = () => {
    setCurrentZoom((prev) => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setCurrentZoom((prev) => Math.max(prev - 1, 3));
  };

  const handleReset = () => {
    setCurrentZoom(zoom);
    setSelectedMarker(markers[0] || null);
  };

  /* -------------------------------------------------------
     Marker Type Configuration
  ------------------------------------------------------- */

  const getMarkerConfig = (type) => {
    switch (type) {
      case 'TOWER':
        return {
          label: 'Cell Tower',
          icon: Radio,
          iconClasses:
            'bg-amber-50 text-amber-700 border-amber-200',
        };

      case 'SUSPECT':
        return {
          label: 'Suspect',
          icon: ShieldAlert,
          iconClasses:
            'bg-red-50 text-red-700 border-red-200',
        };

      case 'ATM':
        return {
          label: 'Financial Location',
          icon: MapPin,
          iconClasses:
            'bg-cyan-50 text-cyan-700 border-cyan-200',
        };

      default:
        return {
          label: 'Location',
          icon: MapPin,
          iconClasses:
            'bg-slate-50 text-slate-600 border-slate-200',
        };
    }
  };

  /* -------------------------------------------------------
     Risk Configuration
  ------------------------------------------------------- */

  const getRiskConfig = (score = 0) => {
    if (score >= 85) {
      return {
        label: 'High',
        text: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
        bar: 'bg-red-500',
      };
    }

    if (score >= 65) {
      return {
        label: 'Moderate',
        text: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        bar: 'bg-amber-500',
      };
    }

    return {
      label: 'Low',
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      bar: 'bg-emerald-500',
    };
  };

  /* -------------------------------------------------------
     Map Background
  ------------------------------------------------------- */

  const mapBackground =
    layerMode === 'HEATMAP'
      ? `
        radial-gradient(
          circle at 50% 45%,
          rgba(245,158,11,0.14),
          transparent 24%
        ),
        radial-gradient(
          circle at 32% 65%,
          rgba(239,68,68,0.10),
          transparent 20%
        ),
        linear-gradient(
          135deg,
          #f8fafc 0%,
          #eef2f7 50%,
          #f8fafc 100%
        )
      `
      : `
        linear-gradient(
          135deg,
          #f8fafc 0%,
          #eef2f7 50%,
          #f1f5f9 100%
        )
      `;

  /* -------------------------------------------------------
     Marker Count
  ------------------------------------------------------- */

  const towerCount = markers.filter(
    (marker) => marker.type === 'TOWER'
  ).length;

  const suspectCount = markers.filter(
    (marker) => marker.type === 'SUSPECT'
  ).length;

  const locationCount = markers.filter(
    (marker) =>
      marker.type === 'ATM' ||
      marker.type === 'LOCATION'
  ).length;

  return (
    <div
      ref={mapRef}
      className={`
        relative
        bg-white
        border
        border-slate-200
        rounded-2xl
        overflow-hidden
        shadow-sm
        flex
        flex-col
        h-[480px]
        w-full
        font-sans
        ${className}
      `}
    >
      {/* =====================================================
          TOP CONTROL BAR
      ====================================================== */}

      <div
        className="
          absolute
          top-3
          left-3
          right-3
          z-20
          flex
          flex-col
          sm:flex-row
          items-start
          sm:items-center
          justify-between
          gap-2
          pointer-events-none
        "
      >
        {/* Layer Selector */}
        <div
          className="
            bg-white/95
            backdrop-blur-sm
            border
            border-slate-200
            rounded-xl
            p-1
            flex
            items-center
            gap-1
            shadow-sm
            pointer-events-auto
          "
        >
          <button
            type="button"
            onClick={() => setLayerMode('VECTOR')}
            className={`
              inline-flex
              items-center
              gap-1.5
              px-3
              py-1.5
              rounded-lg
              text-[10px]
              font-semibold
              transition-colors
              ${
                layerMode === 'VECTOR'
                  ? 'bg-blue-50 text-blue-700 border border-blue-100'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }
            `}
          >
            <Layers size={12} />
            Vector View
          </button>

          <button
            type="button"
            onClick={() => setLayerMode('HEATMAP')}
            className={`
              inline-flex
              items-center
              gap-1.5
              px-3
              py-1.5
              rounded-lg
              text-[10px]
              font-semibold
              transition-colors
              ${
                layerMode === 'HEATMAP'
                  ? 'bg-amber-50 text-amber-700 border border-amber-100'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }
            `}
          >
            <Radio size={12} />
            Density View
          </button>
        </div>

        {/* Coordinates */}
        <div
          className="
            bg-white/95
            backdrop-blur-sm
            border
            border-slate-200
            px-3
            py-1.5
            rounded-xl
            text-[9px]
            font-mono
            text-slate-500
            flex
            items-center
            gap-2
            shadow-sm
            pointer-events-auto
          "
        >
          <Compass
            size={12}
            className="text-blue-600"
          />

          <span>
            LAT {center.lat.toFixed(4)}° N
          </span>

          <span className="text-slate-300">
            |
          </span>

          <span>
            LNG {center.lng.toFixed(4)}° E
          </span>

          <span className="text-slate-300">
            |
          </span>

          <span className="text-blue-700 font-semibold">
            Z{currentZoom}
          </span>
        </div>
      </div>

      {/* =====================================================
          MAP CANVAS
      ====================================================== */}

      <div
        className="
          relative
          w-full
          h-full
          overflow-hidden
          flex
          items-center
          justify-center
        "
        style={{
          background: mapBackground,
        }}
      >
        {/* Map Grid */}
        <div
          className="
            absolute
            inset-0
            pointer-events-none
            opacity-60
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(148,163,184,0.12) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(148,163,184,0.12) 1px,
                transparent 1px
              )
            `,
            backgroundSize: `${Math.max(
              18,
              24 * (currentZoom / 13)
            )}px ${Math.max(
              18,
              24 * (currentZoom / 13)
            )}px`,
          }}
        />

        {/* Subtle map zones */}
        <div
          className="
            absolute
            w-72
            h-48
            rounded-full
            border
            border-slate-300/50
            bg-white/20
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            w-40
            h-40
            rounded-full
            border
            border-blue-200/50
            pointer-events-none
          "
        />

        {/* =================================================
            MARKERS
        ================================================== */}

        <div className="absolute inset-0 flex items-center justify-center">
          {markers.map((marker, idx) => {
            const isSelected =
              selectedMarker?.id === marker.id;

            const markerConfig =
              getMarkerConfig(marker.type);

            const MarkerIcon = markerConfig.icon;

            const riskConfig = getRiskConfig(
              marker.riskScore
            );

            /*
             * Demo placement relative to supplied center.
             * Replace with a real map library when geographic
             * tile rendering is connected to the backend.
             */
            const offsetX =
              (marker.lng - center.lng) *
              8000 *
              (currentZoom / 13);

            const offsetY =
              (center.lat - marker.lat) *
              8000 *
              (currentZoom / 13);

            return (
              <div
                key={marker.id || idx}
                onClick={() => {
                  setSelectedMarker(marker);

                  if (onMarkerClick) {
                    onMarkerClick(marker);
                  }
                }}
                style={{
                  transform: `translate(${offsetX}px, ${offsetY}px)`,
                }}
                className="
                  absolute
                  cursor-pointer
                  group
                  transition-transform
                  duration-200
                  hover:scale-110
                  z-10
                "
              >
                {/* Marker */}
                <div className="relative flex items-center justify-center">

                  {isSelected && (
                    <div
                      className="
                        absolute
                        -inset-2
                        rounded-full
                        border
                        border-blue-300
                        bg-blue-50/40
                      "
                    />
                  )}

                  <div
                    className={`
                      relative
                      w-9
                      h-9
                      rounded-xl
                      border
                      flex
                      items-center
                      justify-center
                      shadow-sm
                      transition-all
                      ${
                        isSelected
                          ? 'bg-white border-blue-500 ring-2 ring-blue-100'
                          : 'bg-white border-slate-300 group-hover:border-blue-300'
                      }
                    `}
                  >
                    <MarkerIcon size={16} className={isSelected ? 'text-blue-700' : undefined} />
                  </div>
                </div>

                {/* Hover Label */}
                <div
                  className="
                    absolute
                    bottom-full
                    left-1/2
                    -translate-x-1/2
                    mb-2
                    hidden
                    group-hover:block
                    pointer-events-none
                    z-30
                  "
                >
                  <div
                    className="
                      bg-white
                      border
                      border-slate-200
                      px-2.5
                      py-1.5
                      rounded-lg
                      text-[10px]
                      font-semibold
                      text-slate-700
                      whitespace-nowrap
                      shadow-md
                    "
                  >
                    {marker.title}
                  </div>
                </div>

                {/* Risk Dot */}
                <span
                  className={`
                    absolute
                    -top-1
                    -right-1
                    w-2.5
                    h-2.5
                    rounded-full
                    border-2
                    border-white
                    ${riskConfig.bar}
                  `}
                />
              </div>
            );
          })}
        </div>

        {/* =================================================
            SELECTED MARKER PANEL
        ================================================== */}

        {selectedMarker && showDetails && (
          <div
            className="
              absolute
              bottom-3
              left-3
              z-20
              max-w-sm
              w-[calc(100%-5rem)]
              sm:w-full
              bg-white/95
              backdrop-blur-sm
              border
              border-slate-200
              rounded-2xl
              p-4
              shadow-lg
            "
          >
            <div className="flex items-start justify-between gap-3">

              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={`
                    w-9
                    h-9
                    rounded-lg
                    border
                    flex
                    items-center
                    justify-center
                    shrink-0
                    ${
                      getMarkerConfig(
                        selectedMarker.type
                      ).iconClasses
                    }
                  `}
                >
                  {React.createElement(
                    getMarkerConfig(
                      selectedMarker.type
                    ).icon,
                    { size: 16 }
                  )}
                </div>

                <div className="min-w-0">
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      font-mono
                      text-blue-700
                      block
                    "
                  >
                    {selectedMarker.id}
                  </span>

                  <h4
                    className="
                      text-xs
                      font-bold
                      text-slate-900
                      leading-4
                      mt-0.5
                    "
                  >
                    {selectedMarker.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span
                  className={`
                    px-2
                    py-1
                    rounded-md
                    border
                    text-[9px]
                    font-semibold
                    whitespace-nowrap
                    ${getRiskConfig(
                      selectedMarker.riskScore
                    ).bg}
                    ${getRiskConfig(
                      selectedMarker.riskScore
                    ).border}
                    ${getRiskConfig(
                      selectedMarker.riskScore
                    ).text}
                  `}
                >
                  Risk {selectedMarker.riskScore}
                </span>

                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  className="
                    p-1
                    rounded-md
                    text-slate-400
                    hover:text-slate-700
                    hover:bg-slate-100
                  "
                  title="Close details"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            <p
              className="
                text-[10px]
                text-slate-600
                leading-4
                mt-3
              "
            >
              {selectedMarker.details}
            </p>

            <div
              className="
                mt-3
                pt-2.5
                border-t
                border-slate-100
                flex
                flex-wrap
                items-center
                justify-between
                gap-2
                text-[9px]
                font-mono
                text-slate-400
              "
            >
              <span>
                LAT {selectedMarker.lat}° N
              </span>

              <span>
                LNG {selectedMarker.lng}° E
              </span>

              <span className="text-slate-500">
                {getMarkerConfig(
                  selectedMarker.type
                ).label}
              </span>
            </div>
          </div>
        )}

        {/* Re-open details */}
        {selectedMarker && !showDetails && (
          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="
              absolute
              bottom-3
              left-3
              z-20
              inline-flex
              items-center
              gap-1.5
              px-3
              py-2
              rounded-lg
              bg-white
              border
              border-slate-200
              text-[10px]
              font-semibold
              text-slate-600
              hover:text-blue-700
              hover:border-blue-200
              shadow-sm
            "
          >
            <Filter size={12} />
            Show Location Details
          </button>
        )}
      </div>

      {/* =====================================================
          RIGHT MAP CONTROLS
      ====================================================== */}

      <div
        className="
          absolute
          bottom-3
          right-3
          z-20
          flex
          flex-col
          gap-1
          bg-white/95
          backdrop-blur-sm
          border
          border-slate-200
          p-1
          rounded-xl
          shadow-sm
        "
      >
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom In"
          className="
            p-2
            rounded-lg
            text-slate-500
            hover:text-blue-700
            hover:bg-blue-50
            transition-colors
          "
        >
          <ZoomIn size={15} />
        </button>

        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom Out"
          className="
            p-2
            rounded-lg
            text-slate-500
            hover:text-blue-700
            hover:bg-blue-50
            transition-colors
          "
        >
          <ZoomOut size={15} />
        </button>

        <div className="h-px bg-slate-200 mx-1" />

        <button
          type="button"
          onClick={handleReset}
          title="Reset Map Focus"
          className="
            p-2
            rounded-lg
            text-slate-500
            hover:text-blue-700
            hover:bg-blue-50
            transition-colors
          "
        >
          <Navigation size={15} />
        </button>

        <button
          type="button"
          onClick={() => {
            if (mapRef.current?.requestFullscreen) {
              mapRef.current.requestFullscreen();
            }
          }}
          title="Fullscreen"
          className="
            p-2
            rounded-lg
            text-slate-500
            hover:text-blue-700
            hover:bg-blue-50
            transition-colors
          "
        >
          <Maximize2 size={15} />
        </button>
      </div>

      {/* =====================================================
          MAP SUMMARY
      ====================================================== */}

      <div
        className="
          absolute
          top-16
          left-3
          z-10
          hidden
          lg:flex
          items-center
          gap-1.5
        "
      >
        <div
          className="
            bg-white/90
            backdrop-blur-sm
            border
            border-slate-200
            rounded-lg
            px-2.5
            py-1.5
            shadow-sm
            text-[9px]
            text-slate-500
          "
        >
          <span className="font-semibold text-slate-700">
            {markers.length}
          </span>{' '}
          mapped entities
        </div>

        {towerCount > 0 && (
          <div
            className="
              bg-white/90
              border
              border-slate-200
              rounded-lg
              px-2
              py-1.5
              shadow-sm
              text-[9px]
              text-slate-500
            "
          >
            Towers {towerCount}
          </div>
        )}

        {suspectCount > 0 && (
          <div
            className="
              bg-white/90
              border
              border-slate-200
              rounded-lg
              px-2
              py-1.5
              shadow-sm
              text-[9px]
              text-slate-500
            "
          >
            Suspects {suspectCount}
          </div>
        )}

        {locationCount > 0 && (
          <div
            className="
              bg-white/90
              border
              border-slate-200
              rounded-lg
              px-2
              py-1.5
              shadow-sm
              text-[9px]
              text-slate-500
            "
          >
            Locations {locationCount}
          </div>
        )}
      </div>

    </div>
  );
}