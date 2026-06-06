/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, Check } from "lucide-react";
import { Language } from "../types";

interface AutocompleteOption {
  id: string;
  label: string;
  sublabel?: string;
  sourceObject?: any;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  selectedValue: string;
  onSelect: (value: string, sourceObj?: any) => void;
  placeholder: string;
  lang: Language;
  allowCustomCreation?: boolean;
  onCreateCustom?: (query: string) => void;
  customButtonLabel?: string;
}

export default function Autocomplete({
  options,
  selectedValue,
  onSelect,
  placeholder,
  lang,
  allowCustomCreation = true,
  onCreateCustom,
  customButtonLabel
}: AutocompleteProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync query with external selection changes
  useEffect(() => {
    const selectedOption = options.find((opt) => opt.id === selectedValue);
    if (selectedOption) {
      setQuery(selectedOption.label);
    } else {
      setQuery(selectedValue);
    }
  }, [selectedValue, options]);

  // Click outside close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset query back to selected option's label if user clicks away
        const selectedOption = options.find((opt) => opt.id === selectedValue);
        setQuery(selectedOption ? selectedOption.label : selectedValue);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedValue, options]);

  // Filter matched results
  const filteredOptions = query.trim() === "" 
    ? options 
    : options.filter((opt) => 
        opt.label.toLowerCase().includes(query.toLowerCase()) || 
        opt.id.toLowerCase().includes(query.toLowerCase()) ||
        (opt.sublabel && opt.sublabel.toLowerCase().includes(query.toLowerCase()))
      );

  const exactMatchExists = options.some(
    (opt) => opt.label.toLowerCase() === query.toLowerCase() || opt.id.toLowerCase() === query.toLowerCase()
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (opt: AutocompleteOption) => {
    onSelect(opt.id, opt.sourceObject);
    setQuery(opt.label);
    setIsOpen(false);
  };

  const handleCreateClick = () => {
    if (onCreateCustom && query.trim() !== "") {
      onCreateCustom(query);
      setIsOpen(false);
    }
  };

  const isFrench = lang === 'fr';
  const isSpanish = lang === 'es';
  const defaultCreateLabel = isFrench 
    ? `Créer l'élément "${query}"`
    : isSpanish 
      ? `Crear el elemento "${query}"` 
      : `Create item "${query}"`;

  return (
    <div className="relative w-full" ref={containerRef} id={`autocomplete-container-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm font-medium focus:outline-hidden focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all shadow-xs"
        />
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1.5 duration-150">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => {
              const isActive = opt.id === selectedValue;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-2 text-sm ${
                    isActive ? "bg-red-50/50 font-semibold text-red-600" : "text-slate-700"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="truncate">{opt.label}</span>
                    {opt.sublabel && (
                      <span className="text-[10px] text-slate-400 font-mono tracking-tight uppercase">
                        {opt.sublabel}
                      </span>
                    )}
                  </div>
                  {isActive && <Check className="w-4 h-4 text-red-500 shrink-0" />}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-3 text-xs text-slate-500 font-light">
              {isFrench 
                ? "Aucun élément pré-référencé trouvé" 
                : isSpanish 
                  ? "Ningún elemento preconfigurado encontrado" 
                  : "No pre-referenced items found"}
            </div>
          )}

          {allowCustomCreation && query.trim() !== "" && !exactMatchExists && (
            <button
              type="button"
              onClick={handleCreateClick}
              className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-150 transition-colors flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 shrink-0 text-red-500" />
              <span className="truncate">{customButtonLabel || defaultCreateLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
