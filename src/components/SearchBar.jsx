import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  X,
  Phone,
  User,
  FileCheck2,
  CreditCard,
  ArrowRight
} from 'lucide-react';

/**
 * SearchBar
 *
 * Global investigation search component.
 *
 * @param {Object} props
 * @param {string} [props.placeholder]
 * @param {Function} [props.onSearch]
 * @param {string} [props.className]
 */
export default function SearchBar({
  placeholder = 'Search suspect, phone, FIR case, or financial record...',
  onSearch,
  className = ''
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ALL');
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  /*
   * Prototype search index.
   * Replace this with an API-backed search request when
   * the investigation search service is connected.
   */
  const suggestions = [
    {
      type: 'SUSPECT',
      id: 'ENT-801',
      title: 'Vikram "Raja" Malhotra',
      meta: 'Aadhaar: XXXX-XXXX-9012'
    },
    {
      type: 'PHONE',
      id: 'SIM-902',
      title: '+91 98210-XXXXX',
      meta: 'Burner SIM · Sector 62, Noida'
    },
    {
      type: 'FIR',
      id: '26189-042',
      title: 'FIR-2026-NCRB-9021',
      meta: 'Cyber wire hijack & money laundering'
    },
    {
      type: 'FINANCIAL',
      id: 'TXN-401',
      title: 'Axis Bank Account #9041',
      meta: 'Mule account · ₹45,00,000 volume'
    }
  ];

  const normalizedQuery = query.trim().toLowerCase();

  const filteredSuggestions = suggestions.filter((item) => {
    const matchesQuery =
      !normalizedQuery ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.meta.toLowerCase().includes(normalizedQuery) ||
      item.id.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      category === 'ALL' || item.type === category;

    return matchesQuery && matchesCategory;
  });

  // Close suggestions when clicking outside the component.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setIsOpen(false);
      return;
    }

    if (typeof onSearch === 'function') {
      onSearch(trimmedQuery, category);
    } else {
      navigate(
        `/entities?search=${encodeURIComponent(
          trimmedQuery
        )}&type=${encodeURIComponent(category)}`
      );
    }

    setIsOpen(false);
  };

  const handleSuggestionSelect = (item) => {
    setQuery(item.title);
    setIsOpen(false);

    if (item.type === 'FIR') {
      navigate(`/cases/${item.id}`);
    } else {
      navigate(`/entities/${item.id}`);
    }
  };

  const getItemIcon = (type) => {
    const iconProps = {
      size: 16,
      strokeWidth: 1.8
    };

    switch (type) {
      case 'SUSPECT':
        return (
          <User
            {...iconProps}
            className="text-red-600"
          />
        );

      case 'PHONE':
        return (
          <Phone
            {...iconProps}
            className="text-amber-600"
          />
        );

      case 'FIR':
        return (
          <FileCheck2
            {...iconProps}
            className="text-blue-600"
          />
        );

      case 'FINANCIAL':
        return (
          <CreditCard
            {...iconProps}
            className="text-violet-600"
          />
        );

      default:
        return (
          <Search
            {...iconProps}
            className="text-slate-500"
          />
        );
    }
  };

  return (
    <div
      ref={searchRef}
      className={`relative w-full ${className}`}
    >
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="
          relative
          flex
          items-center
          w-full
          min-h-[52px]
          bg-white
          border
          border-slate-200
          rounded-xl
          shadow-sm
          hover:border-slate-300
          focus-within:border-blue-400
          focus-within:ring-4
          focus-within:ring-blue-500/5
          transition-all
          duration-200
          overflow-hidden
        "
      >
        {/* Category Selector */}
        <div
          className="
            hidden
            sm:flex
            items-center
            gap-2
            h-10
            px-3
            ml-1
            border-r
            border-slate-200
            shrink-0
          "
        >
          <Filter
            size={14}
            className="text-slate-500"
          />

          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setIsOpen(Boolean(query.trim()));
            }}
            aria-label="Search category"
            className="
              bg-transparent
              text-[11px]
              font-semibold
              text-slate-600
              focus:outline-none
              cursor-pointer
              pr-1
            "
          >
            <option value="ALL">
              All Targets
            </option>

            <option value="SUSPECT">
              Suspects
            </option>

            <option value="PHONE">
              Phone / CDR
            </option>

            <option value="FIR">
              FIR Cases
            </option>

            <option value="FINANCIAL">
              Financial
            </option>
          </select>
        </div>

        {/* Search Icon */}
        <div className="pl-4 shrink-0">
          <Search
            size={18}
            strokeWidth={1.8}
            className="text-slate-400"
          />
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          aria-label="Investigation search"
          autoComplete="off"
          className="
            w-full
            min-w-0
            bg-transparent
            px-3
            py-3.5
            text-sm
            text-slate-800
            placeholder:text-slate-400
            focus:outline-none
          "
        />

        {/* Clear */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            aria-label="Clear search"
            className="
              p-1.5
              mr-1
              rounded-lg
              text-slate-400
              hover:text-slate-700
              hover:bg-slate-100
              transition
              shrink-0
            "
          >
            <X size={16} />
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="
            m-1.5
            px-4
            py-2.5
            rounded-lg
            bg-blue-600
            hover:bg-blue-700
            text-white
            text-xs
            font-semibold
            transition
            inline-flex
            items-center
            justify-center
            gap-1.5
            shrink-0
            shadow-sm
          "
        >
          <span className="hidden sm:inline">
            Search
          </span>

          <ArrowRight size={14} />
        </button>
      </form>

      {/* Search Suggestions */}
      {isOpen && query.trim().length > 0 && (
        <div
          className="
            absolute
            top-full
            left-0
            right-0
            mt-2
            bg-white
            border
            border-slate-200
            rounded-xl
            shadow-xl
            z-50
            overflow-hidden
          "
        >
          {/* Dropdown Header */}
          <div
            className="
              px-3
              py-2.5
              bg-slate-50
              border-b
              border-slate-200
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <div className="flex items-center gap-2">
              <Search
                size={13}
                className="text-blue-600"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Matching Records
              </span>
            </div>

            <span className="text-[10px] font-medium text-slate-400">
              {filteredSuggestions.length}{' '}
              {filteredSuggestions.length === 1
                ? 'result'
                : 'results'}
            </span>
          </div>

          {/* Results */}
          <div className="max-h-72 overflow-y-auto">
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleSuggestionSelect(item)
                  }
                  className="
                    w-full
                    text-left
                    px-3
                    py-3
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-slate-100
                    last:border-b-0
                    hover:bg-slate-50
                    transition
                    group
                  "
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Type Icon */}
                    <div
                      className="
                        w-9
                        h-9
                        rounded-lg
                        bg-slate-50
                        border
                        border-slate-200
                        flex
                        items-center
                        justify-center
                        shrink-0
                        group-hover:bg-white
                      "
                    >
                      {getItemIcon(item.type)}
                    </div>

                    {/* Record Information */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="
                            text-[10px]
                            font-mono
                            font-semibold
                            text-blue-600
                          "
                        >
                          {item.id}
                        </span>

                        <span
                          className="
                            text-[9px]
                            px-1.5
                            py-0.5
                            rounded
                            bg-slate-100
                            border
                            border-slate-200
                            text-slate-500
                            font-medium
                          "
                        >
                          {item.type}
                        </span>
                      </div>

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-slate-800
                          group-hover:text-blue-700
                          truncate
                        "
                      >
                        {item.title}
                      </p>

                      <p
                        className="
                          text-[11px]
                          text-slate-500
                          truncate
                          mt-0.5
                        "
                      >
                        {item.meta}
                      </p>
                    </div>
                  </div>

                  {/* Navigate Arrow */}
                  <ArrowRight
                    size={15}
                    className="
                      text-slate-300
                      group-hover:text-blue-600
                      transition
                      shrink-0
                    "
                  />
                </button>
              ))
            ) : (
              <div className="px-5 py-8 text-center">
                <div
                  className="
                    mx-auto
                    w-10
                    h-10
                    rounded-xl
                    bg-slate-50
                    border
                    border-slate-200
                    flex
                    items-center
                    justify-center
                    mb-3
                  "
                >
                  <Search
                    size={18}
                    className="text-slate-400"
                  />
                </div>

                <p className="text-sm font-semibold text-slate-700">
                  No matching records
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  No indexed record matches "
                  <span className="font-medium text-slate-500">
                    {query}
                  </span>
                  ".
                </p>
              </div>
            )}
          </div>

          {/* Dropdown Footer */}
          <div
            className="
              px-3
              py-2
              bg-slate-50
              border-t
              border-slate-200
              text-[10px]
              text-slate-400
            "
          >
            Search is scoped to the selected investigation category.
          </div>
        </div>
      )}
    </div>
  );
}