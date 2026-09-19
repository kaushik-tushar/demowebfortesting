import React from 'react';
import { Shield } from 'lucide-react';

/**
 * Modular Enterprise Card Component
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card body content
 * @param {string} [props.title] - Card header title
 * @param {string} [props.subtitle] - Card header subtitle
 * @param {React.ReactNode} [props.icon] - Header icon
 * @param {React.ReactNode} [props.badge] - Status / badge element
 * @param {React.ReactNode} [props.footer] - Optional footer content
 * @param {string} [props.borderAccent] - Accent: red | amber | cyan | purple | emerald | blue
 * @param {string} [props.className] - Additional Tailwind classes
 * @param {Function} [props.onClick] - Optional click handler
 */
export default function Card({
  children,
  title,
  subtitle,
  icon,
  badge,
  footer,
  borderAccent,
  className = '',
  onClick,
}) {
  /* -------------------------------------------------------
     Accent Configuration
  ------------------------------------------------------- */

  const accentClasses = {
    red: 'border-l-4 border-l-red-500',
    amber: 'border-l-4 border-l-amber-500',
    cyan: 'border-l-4 border-l-cyan-500',
    purple: 'border-l-4 border-l-violet-500',
    emerald: 'border-l-4 border-l-emerald-500',
    blue: 'border-l-4 border-l-blue-500',
  };

  const accentClass =
    accentClasses[borderAccent] || '';

  const interactiveClass = onClick
    ? `
      cursor-pointer
      hover:border-slate-300
      hover:shadow-md
      hover:-translate-y-[1px]
      active:translate-y-0
    `
    : '';

  return (
    <section
      onClick={onClick}
      className={`
        bg-white
        border border-slate-200
        rounded-2xl
        p-5
        shadow-sm
        transition-all
        duration-200
        ${accentClass}
        ${interactiveClass}
        ${className}
      `}
    >
      {/* ---------------------------------------------------
          Card Header
      --------------------------------------------------- */}

      {(title || subtitle || icon || badge) && (
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
            border-b
            border-slate-100
            pb-3.5
            mb-4
          "
        >
          <div className="flex items-start gap-3 min-w-0">
            {/* Header Icon */}
            {icon && (
              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-slate-50
                  border
                  border-slate-200
                  text-slate-600
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                {icon}
              </div>
            )}

            {/* Header Text */}
            <div className="min-w-0">
              {title && (
                <h3
                  className="
                    text-sm
                    font-bold
                    text-slate-900
                    leading-5
                    tracking-tight
                  "
                >
                  {title}
                </h3>
              )}

              {subtitle && (
                <p
                  className="
                    text-[11px]
                    text-slate-500
                    mt-0.5
                    leading-4
                  "
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Badge */}
          {badge && (
            <div className="shrink-0">
              {badge}
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------
          Main Content
      --------------------------------------------------- */}

      <div className="space-y-3">
        {children}
      </div>

      {/* ---------------------------------------------------
          Footer
      --------------------------------------------------- */}

      {footer && (
        <div
          className="
            pt-3.5
            mt-4
            border-t
            border-slate-100
            text-xs
            text-slate-500
            flex
            items-center
            justify-between
            gap-3
          "
        >
          {footer}
        </div>
      )}
    </section>
  );
}