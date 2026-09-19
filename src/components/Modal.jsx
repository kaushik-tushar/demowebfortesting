import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Enterprise Modal Dialog Component
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback triggered when closing
 * @param {string} [props.title] - Modal header title
 * @param {string} [props.subtitle] - Modal header subtitle/context
 * @param {React.ReactNode} [props.icon] - Header icon element
 * @param {React.ReactNode} props.children - Modal body content
 * @param {React.ReactNode} [props.footer] - Optional footer actions
 * @param {string} [props.maxWidth="max-w-lg"] - Tailwind max-width class
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  footer,
  maxWidth = 'max-w-lg',
}) {
  /* -------------------------------------------------------
     Prevent background scrolling while modal is open
  ------------------------------------------------------- */

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* -------------------------------------------------------
     ESC key support
  ------------------------------------------------------- */

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
        sm:p-6
        overflow-y-auto
      "
    >
      {/* =====================================================
          BACKDROP
      ====================================================== */}

      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="
          fixed
          inset-0
          w-full
          h-full
          bg-slate-900/40
          backdrop-blur-[2px]
          cursor-default
        "
      />

      {/* =====================================================
          MODAL
      ====================================================== */}

      <div
        className={`
          relative
          z-10
          w-full
          ${maxWidth}
          bg-white
          border
          border-slate-200
          rounded-2xl
          shadow-xl
          overflow-hidden
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={
          subtitle ? 'modal-subtitle' : undefined
        }
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
            px-5
            py-4
            border-b
            border-slate-200
            bg-slate-50/70
          "
        >
          <div className="flex items-start gap-3 min-w-0">
            {icon && (
              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-white
                  border
                  border-slate-200
                  text-blue-700
                  flex
                  items-center
                  justify-center
                  shrink-0
                  shadow-sm
                "
              >
                {icon}
              </div>
            )}

            <div className="min-w-0">
              {title && (
                <h3
                  id="modal-title"
                  className="
                    text-sm
                    font-bold
                    text-slate-900
                    tracking-tight
                    leading-5
                  "
                >
                  {title}
                </h3>
              )}

              {subtitle && (
                <p
                  id="modal-subtitle"
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

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="
              w-8
              h-8
              rounded-lg
              border
              border-slate-200
              bg-white
              text-slate-400
              flex
              items-center
              justify-center
              hover:text-slate-700
              hover:border-slate-300
              hover:bg-slate-50
              transition-colors
              shrink-0
            "
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* =================================================
            BODY
        ================================================== */}

        <div
          className="
            px-5
            py-5
            max-h-[75vh]
            overflow-y-auto
            text-xs
            text-slate-600
            font-sans
          "
        >
          {children}
        </div>

        {/* =================================================
            FOOTER
        ================================================== */}

        {footer && (
          <div
            className="
              px-5
              py-3.5
              border-t
              border-slate-200
              bg-slate-50/70
              flex
              flex-col-reverse
              sm:flex-row
              sm:items-center
              sm:justify-end
              gap-2
              text-xs
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}