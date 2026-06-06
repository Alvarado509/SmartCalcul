/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Scale, Plus, Search, Check } from "lucide-react";
import { Language, HistoryItem, CustomConversionItem } from "../types";
import { BASELINE_DISTANCES } from "../data/baselineData";

interface DistanceConverterProps {
  lang: Language;
  onAddHistory: (item: Omit<HistoryItem, "id" | "timestamp">) => void;
}

export default function DistanceConverter({ lang, onAddHistory }: DistanceConverterProps) {
  const [customDistanceUnits, setCustomDistanceUnits] = useState<CustomConversionItem[]>(() => {
    try {
      const stored = localStorage.getItem("smartcalcul_custom_distances");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [fromQuery, setFromQuery] = useState("m");
  const [toQuery, setToQuery] = useState("ft");
  const [inputValue, setInputValue] = useState<number | "">(10);

  // Selector states
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Close when tapping outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setFromDropdownOpen(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setToDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Modal creators
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newFactor, setNewFactor] = useState<number | "">("");

  // Aggregate option items
  const options = useMemo(() => {
    const list = BASELINE_DISTANCES.map((d) => ({
      id: d.id,
      label: lang === 'fr' ? d.labelFr : lang === 'es' ? d.labelEs : d.labelEn,
      factor: d.factor
    }));

    customDistanceUnits.forEach((cd) => {
      list.push({
        id: cd.symbol || cd.name.toLowerCase().replace(/\s+/g, "_"),
        label: `${cd.name} (${cd.symbol})`,
        factor: cd.factor
      });
    });

    return list;
  }, [lang, customDistanceUnits]);

  // Filters for input auto-completes
  const filteredFromOptions = useMemo(() => {
    const q = fromQuery.toLowerCase().trim();
    if (!q) return options;
    return options.filter(o => o.id.includes(q) || o.label.toLowerCase().includes(q));
  }, [fromQuery, options]);

  const filteredToOptions = useMemo(() => {
    const q = toQuery.toLowerCase().trim();
    if (!q) return options;
    return options.filter(o => o.id.includes(q) || o.label.toLowerCase().includes(q));
  }, [toQuery, options]);

  // Determine active unit code securely
  const resolvedFromUnit = useMemo(() => {
    const q = fromQuery.trim().toLowerCase();
    const found = options.find(o => o.id === q || o.label.toLowerCase().includes(q));
    return found ? found.id : q || "m";
  }, [fromQuery, options]);

  const resolvedToUnit = useMemo(() => {
    const q = toQuery.trim().toLowerCase();
    const found = options.find(o => o.id === q || o.label.toLowerCase().includes(q));
    return found ? found.id : q || "ft";
  }, [toQuery, options]);

  // Conversions math
  const distanceResult = useMemo(() => {
    const val = inputValue === "" ? 0 : inputValue;
    const fromObj = options.find(o => o.id === resolvedFromUnit);
    const toObj = options.find(o => o.id === resolvedToUnit);

    if (!fromObj || !toObj) {
      if (fromObj) return Number((val * fromObj.factor).toFixed(6));
      return val;
    }

    const valueInMeters = val * fromObj.factor;
    const outValue = valueInMeters / toObj.factor;

    return Number(outValue.toFixed(6));
  }, [inputValue, resolvedFromUnit, resolvedToUnit, options]);

  // History trigger updates
  const triggerHistoryPost = () => {
    if (inputValue !== "") {
      onAddHistory({
        module: "distance",
        moduleLabel: lang === 'fr' ? "Distances" : lang === 'es' ? "Distancias" : "Distances",
        expression: `${inputValue} ${resolvedFromUnit} = ${distanceResult} ${resolvedToUnit}`,
        details: ""
      });
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      triggerHistoryPost();
    }, 1500);
    return () => clearTimeout(handler);
  }, [inputValue, resolvedFromUnit, resolvedToUnit, distanceResult]);

  const handleSaveDistanceUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCode || !newFactor) return;

    const newItem: CustomConversionItem = {
      id: `custom_dist_${Date.now()}`,
      category: 'distance',
      name: newName,
      symbol: newCode.toLowerCase(),
      factor: Number(newFactor),
      baseUnit: "m"
    };

    const updated = [...customDistanceUnits, newItem];
    setCustomDistanceUnits(updated);
    localStorage.setItem("smartcalcul_custom_distances", JSON.stringify(updated));

    setToQuery(newItem.symbol!);
    setNewName("");
    setNewCode("");
    setNewFactor("");
    setShowModal(false);
  };

  const t = lang === 'fr' ? {
    cardTitle: "Convertisseur de distances & mesures physiques",
    fromLabel: "Unité de départ",
    toLabel: "Unité de destination/cible",
    valLabel: "Distance / valeur",
    addBtn: "Enregistrer une unité de mesure à la volée",
    addTitle: "Saisir unité de distance",
    placeholderLabel: "Nom, ex: Toise",
    placeholderCode: "Symbole, ex: toise",
    placeholderFactor: "Équivalent en Mètres (m)",
    cancel: "Annuler",
    save: "Enregistrer à la volée",
    placeholderInput: "Saisissez ou recherchez n'importe quelle unité...",
    resultLabel: "RÉSULTAT DE CONVERSION",
  } : lang === 'es' ? {
    cardTitle: "Convertidor de distancias & física",
    fromLabel: "Unidad origen",
    toLabel: "Unidad objetivo",
    valLabel: "Dimensión",
    addBtn: "Añadir unidad métrica personalizada",
    addTitle: "Registrar dimensión",
    placeholderLabel: "Nombre, ej: Legua",
    placeholderCode: "Código, ej: lg",
    placeholderFactor: "Equivalente en Metros (m)",
    cancel: "Cancelar",
    save: "Guardar",
    placeholderInput: "Escriba o filtre...",
    resultLabel: "VALOR CALCULADO",
  } : {
    cardTitle: "Distance & Physical Metric Converter",
    fromLabel: "Source Measurement Unit",
    toLabel: "Target Measurement Unit",
    valLabel: "Metrology distance index",
    addBtn: "Register custom distance unit",
    addTitle: "Add Metrology unit",
    placeholderLabel: "Name, e.g. Royal Yard",
    placeholderCode: "Symbol, e.g. yard",
    placeholderFactor: "Value in Meters (m)",
    cancel: "Cancel",
    save: "Save",
    placeholderInput: "Type or match distances...",
    resultLabel: "CONVERSION APPLIED",
  };

  return (
    <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 sm:p-10 flex flex-col gap-6 max-w-4xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] transition-all duration-300">
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-gray-150 pb-4">
        <Scale className="w-6 h-6 text-[#FF3B30]" />
        <h3 className="text-xl font-bold text-[#0A0A0A] tracking-tight uppercase">
          {t.cardTitle}
        </h3>
      </div>

      {/* CORE WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        {/* Left Inputs panel */}
        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* From Input with Autocomplete search */}
            <div className="space-y-1" ref={fromRef}>
              <label className="text-xs font-semibold text-black uppercase tracking-wider block">
                {t.fromLabel}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fromQuery}
                  onChange={(e) => {
                    setFromQuery(e.target.value);
                    setFromDropdownOpen(true);
                  }}
                  onFocus={() => setFromDropdownOpen(true)}
                  placeholder={t.placeholderInput}
                  className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-md text-sm font-medium text-black focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] transition-colors"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                
                {fromDropdownOpen && (
                  <div className="absolute left-0 right-0 top-12 z-50 bg-white border border-[#E6E6E6] rounded-md max-h-52 overflow-y-auto shadow-lg">
                    {filteredFromOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setFromQuery(opt.id);
                          setFromDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#FF3B30]/5 text-xs font-semibold text-black flex items-center justify-between border-b border-gray-50 last:border-0 cursor-pointer"
                      >
                        <span>{opt.label} ({opt.id})</span>
                        {resolvedFromUnit === opt.id && <Check className="w-3.5 h-3.5 text-[#FF3B30]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* To Input with Autocomplete search */}
            <div className="space-y-1" ref={toRef}>
              <label className="text-xs font-semibold text-black uppercase tracking-wider block">
                {t.toLabel}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={toQuery}
                  onChange={(e) => {
                    setToQuery(e.target.value);
                    setToDropdownOpen(true);
                  }}
                  onFocus={() => setToDropdownOpen(true)}
                  placeholder={t.placeholderInput}
                  className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-md text-sm font-medium text-black focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] transition-colors"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />

                {toDropdownOpen && (
                  <div className="absolute left-0 right-0 top-12 z-50 bg-white border border-[#E6E6E6] rounded-md max-h-52 overflow-y-auto shadow-lg">
                    {filteredToOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setToQuery(opt.id);
                          setToDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#FF3B30]/5 text-xs font-semibold text-black flex items-center justify-between border-b border-gray-55 last:border-0 cursor-pointer"
                      >
                        <span>{opt.label} ({opt.id})</span>
                        {resolvedToUnit === opt.id && <Check className="w-3.5 h-3.5 text-[#FF3B30]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-black uppercase tracking-wider block">
              {t.valLabel}
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="10"
              className="w-full h-11 px-4 bg-white border border-gray-200 rounded-md text-black text-sm font-semibold focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] font-mono transition-colors"
            />
          </div>

          {/* Discrete + Ajouter button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-xs font-bold text-[#FF3B30] hover:text-[#E02D22] flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95 duration-100"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addBtn}</span>
            </button>
          </div>

        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between min-h-[180px] hover:border-[#FF3B30] transition-all shadow-xs duration-300">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 block mb-1">
              {t.resultLabel}
            </span>
            <div className="text-4xl font-extrabold text-[#0A0A0A] font-mono tracking-tight break-all">
              {distanceResult.toLocaleString()}
              <span className="text-[#FF3B30] font-bold text-2.5xl uppercase ml-1 block sm:inline-block">
                {resolvedToUnit}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-150 pt-4 mt-4 text-xs font-bold text-[#0A0A0A] font-mono flex justify-between">
            <span>{fromQuery} &rarr; {toQuery}</span>
            <span className="text-gray-450 text-[10px] uppercase font-normal">{lang === 'fr' ? "Physique SI" : lang === 'es' ? "Metrología SI" : "SI Metrology"}</span>
          </div>
        </div>

      </div>

      {/* COMPACT DIALOG */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/3.5 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveDistanceUnit}
            className="bg-white border border-[#E6E6E6] rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#FF3B30]" />
                {t.addTitle}
              </h4>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={t.placeholderLabel}
                className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-black focus:outline-none focus:border-[#FF3B30]"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder={t.placeholderCode}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm uppercase text-black font-mono focus:outline-none focus:border-[#FF3B30]"
                />

                <input
                  type="number"
                  required
                  step="any"
                  value={newFactor}
                  onChange={(e) => setNewFactor(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder={t.placeholderFactor}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-black font-mono focus:outline-none focus:border-[#FF3B30]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-black transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF3B30] hover:bg-[#E02D22] rounded-md text-xs font-bold text-white uppercase tracking-wider transition-colors cursor-pointer active:scale-95 duration-150"
              >
                {t.save}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
