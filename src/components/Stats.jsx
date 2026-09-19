import React from 'react';
import {
  Users,
  Activity,
  AlertTriangle,
  FileCheck2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const statsData = [
  {
    id: 1,
    name: 'Total Entities',
    value: '12,345',
    change: '+12%',
    isPositive: true,
    icon: Users,
    description: 'Indexed investigation entities',
    iconClass: 'bg-blue-50 text-blue-600',
  },
  {
    id: 2,
    name: 'Active Sessions',
    value: '1,234',
    change: '+5%',
    isPositive: true,
    icon: Activity,
    description: 'Current workspace activity',
    iconClass: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 3,
    name: 'Open Alerts',
    value: '38',
    change: '-4.0%',
    isPositive: true,
    icon: AlertTriangle,
    description: 'Alerts requiring review',
    iconClass: 'bg-amber-50 text-amber-600',
  },
  {
    id: 4,
    name: 'Evidence Records',
    value: '45,678',
    change: '+18%',
    isPositive: true,
    icon: FileCheck2,
    description: 'Indexed evidence records',
    iconClass: 'bg-violet-50 text-violet-600',
  },
];

export default function Stats() {
  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Investigation Overview
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Current workspace activity and indexed intelligence
          </p>
        </div>

        <span
          className="
            hidden
            sm:inline-flex
            items-center
            gap-1.5
            px-2.5
            py-1.5
            rounded-lg
            bg-slate-50
            border
            border-slate-200
            text-[10px]
            font-semibold
            text-slate-500
          "
        >
          Workspace Summary
        </span>
      </div>

      {/* Statistics Grid */}
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statsData.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="
                relative
                overflow-hidden
                rounded-xl
                bg-white
                border
                border-slate-200
                px-5
                py-4
                shadow-sm
                hover:shadow-md
                hover:border-slate-300
                transition-all
                duration-200
              "
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <dt className="min-w-0">
                  <p
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-slate-500
                      truncate
                    "
                  >
                    {item.name}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {item.description}
                  </p>
                </dt>

                {/* Icon */}
                <div
                  className={`
                    w-9
                    h-9
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    shrink-0
                    ${item.iconClass}
                  `}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* Value + Change */}
              <dd className="mt-5 flex items-end justify-between gap-3">
                <span
                  className="
                    text-2xl
                    sm:text-3xl
                    font-bold
                    tracking-tight
                    text-slate-900
                  "
                >
                  {item.value}
                </span>

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1
                    px-2
                    py-1
                    rounded-md
                    text-[10px]
                    font-semibold
                    border
                    ${
                      item.isPositive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }
                  `}
                >
                  {item.isPositive ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}

                  {item.change}
                </span>
              </dd>

              {/* Bottom Accent */}
              <div
                className="
                  absolute
                  bottom-0
                  left-5
                  right-5
                  h-px
                  bg-slate-100
                "
              />
            </div>
          );
        })}
      </dl>
    </section>
  );
}