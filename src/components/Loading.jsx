import React from 'react';
import { ShieldCheck, Radio } from 'lucide-react';

/**
 * Loading Spinner & Data Processing Component
 *
 * @param {Object} props
 * @param {string} [props.message="Loading workspace..."]
 * @param {string} [props.subMessage="Preparing investigation data"]
 * @param {boolean} [props.fullScreen=false]
 * @param {string} [props.size="md"] - 'sm' | 'md' | 'lg'
 */
export default function Loading({
  message = 'Loading workspace...',
  subMessage = 'Preparing investigation data',
  fullScreen = false,
  size = 'md',
}) {
  /* -------------------------------------------------------
     Size Configuration
  ------------------------------------------------------- */

  const sizeConfig = {
    sm: {
      container: 'p-5',
      ring: 'w-9 h-9',
      icon: 17,
      text: 'text-xs',
      gap: 'space-y-3',
    },

    md: {
      container: 'p-8',
      ring: 'w-14 h-14',
      icon: 24,
      text: 'text-sm',
      gap: 'space-y-4',
    },

    lg: {
      container: 'p-12',
      ring: 'w-20 h-20',
      icon: 32,
      text: 'text-base',
      gap: 'space-y-5',
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  /* -------------------------------------------------------
     Loading Content
  ------------------------------------------------------- */

  const loadingContent = (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        text-center
        ${currentSize.container}
        ${currentSize.gap}
      `}
    >
      {/* Loading Indicator */}
      <div className="relative flex items-center justify-center">
        {/* Subtle outer ring */}
        <div
          className={`
            absolute
            ${currentSize.ring}
            rounded-full
            border
            border-blue-100
          `}
        />

        {/* Progress ring */}
        <div
          className={`
            ${currentSize.ring}
            rounded-full
            border-2
            border-slate-200
            border-t-blue-600
            animate-spin
          `}
        />

        {/* Center icon */}
        <div
          className="
            absolute
            w-8
            h-8
            rounded-full
            bg-blue-50
            text-blue-700
            flex
            items-center
            justify-center
          "
        >
          <ShieldCheck
            size={currentSize.icon}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Loading Message */}
      <div className="space-y-1 max-w-xs">
        <h3
          className={`
            ${currentSize.text}
            font-semibold
            text-slate-800
            tracking-tight
          `}
        >
          {message}
        </h3>

        {subMessage && (
          <p
            className="
              text-[11px]
              text-slate-500
              flex
              items-center
              justify-center
              gap-1.5
              leading-4
            "
          >
            <Radio
              size={11}
              className="text-blue-600"
            />

            <span>{subMessage}</span>
          </p>
        )}
      </div>

      {/* Status Indicator */}
      <div className="flex items-center gap-2">
        <span
          className="
            w-1.5
            h-1.5
            rounded-full
            bg-blue-600
            animate-pulse
          "
        />

        <span
          className="
            text-[9px]
            font-medium
            text-slate-400
            uppercase
            tracking-wider
          "
        >
          Please wait
        </span>
      </div>
    </div>
  );

  /* -------------------------------------------------------
     Full Screen Mode
  ------------------------------------------------------- */

  if (fullScreen) {
    return (
      <div
        className="
          fixed
          inset-0
          z-50
          bg-slate-50/95
          backdrop-blur-sm
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-2xl
            shadow-lg
            max-w-sm
            w-full
            mx-4
            overflow-hidden
          "
        >
          {/* Top Accent */}
          <div className="h-1 bg-blue-600" />

          {loadingContent}
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------
     Inline Mode
  ------------------------------------------------------- */

  return (
    <div
      className="
        w-full
        min-h-[180px]
        flex
        items-center
        justify-center
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-sm
        my-4
      "
    >
      {loadingContent}
    </div>
  );
}