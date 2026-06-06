/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import { ChefHat, Plus, Search, Check, Utensils } from "lucide-react";
import { Language, HistoryItem, CustomConversionItem } from "../types";
import { KITCHEN_UNITS } from "../data/baselineData";

interface KitchenConverterProps {
  lang: Language;
  onAddHistory: (item: Omit<HistoryItem, "id" | "timestamp">) => void;
}

const INGREDIENT_DENSITIES = [
  {
    key: "coco_oil",
    names: ["coco", "coconut"],
    density: 0.93,
    displayFr: "Huile (coco)",
    displayEs: "Aceite de coco",
    displayEn: "Coconut Oil"
  },
  {
    key: "sucre_glace",
    names: ["glace", "icing", "powder", "glass"],
    density: 0.50,
    displayFr: "Sucre (glace)",
    displayEs: "Azúcar glass",
    displayEn: "Icing Sugar"
  },
  {
    key: "eau",
    names: ["eau", "water", "agua"],
    density: 1.00,
    displayFr: "Eau",
    displayEs: "Agua",
    displayEn: "Water"
  },
  {
    key: "lait",
    names: ["lait", "milk", "leche"],
    density: 1.03,
    displayFr: "Lait",
    displayEs: "Leche",
    displayEn: "Milk"
  },
  {
    key: "farine",
    names: ["farine", "flour", "harina"],
    density: 0.53,
    displayFr: "Farine",
    displayEs: "Harina",
    displayEn: "Flour"
  },
  {
    key: "sucre_blanc",
    names: ["sucre", "sugar", "azúcar", "azucar"],
    density: 0.85,
    displayFr: "Sucre (blanc)",
    displayEs: "Azúcar (blanco)",
    displayEn: "White Sugar"
  },
  {
    key: "beurre_fondu",
    names: ["beurre", "butter", "mantequilla", "manteca"],
    density: 0.91,
    displayFr: "Beurre (fondu)",
    displayEs: "Mantequilla (derretida)",
    displayEn: "Melted Butter"
  },
  {
    key: "miel",
    names: ["miel", "honey"],
    density: 1.42,
    displayFr: "Miel",
    displayEs: "Miel",
    displayEn: "Honey"
  },
  {
    key: "huile_olive_vegetale",
    names: ["huile", "oil", "aceite"],
    density: 0.92,
    displayFr: "Huile (olive/végétale)",
    displayEs: "Aceite (oliva/vegetal)",
    displayEn: "Olive/Vegetable Oil"
  },
  {
    key: "cacao_poudre",
    names: ["cacao", "cocoa"],
    density: 0.45,
    displayFr: "Cacao en poudre",
    displayEs: "Cacao en polvo",
    displayEn: "Cocoa Powder"
  },
  {
    key: "sel",
    names: ["sel", "salt", "sal"],
    density: 1.20,
    displayFr: "Sel",
    displayEs: "Sal",
    displayEn: "Salt"
  },
  {
    key: "riz_cru",
    names: ["riz", "rice", "arroz"],
    density: 0.80,
    displayFr: "Riz (cru)",
    displayEs: "Arroz (crudo)",
    displayEn: "Raw Rice"
  },
  {
    key: "cafe_moulu",
    names: ["café", "cafe", "coffee"],
    density: 0.35,
    displayFr: "Café (moulu)",
    displayEs: "Café molido",
    displayEn: "Ground Coffee"
  }
];

export default function KitchenConverter({ lang, onAddHistory }: KitchenConverterProps) {
  const [customUnits, setCustomUnits] = useState<CustomConversionItem[]>(() => {
    try {
      const stored = localStorage.getItem("smartcalcul_custom_kitchen_units");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [ingredientName, setIngredientName] = useState(lang === "fr" ? "Farine de blé" : lang === "es" ? "Harina de trigo" : "Wheat Flour");
  const [fromQuery, setFromQuery] = useState("g");
  const [toQuery, setToQuery] = useState(lang === "fr" ? "tasses" : lang === "es" ? "tazas" : "cups");
  const [inputValue, setInputValue] = useState<number | "">(100);

  // Helper to translate unit display symbol names
  const getUnitLabelForDisplay = (unitId: string, currentLang: Language) => {
    switch (unitId.toLowerCase()) {
      case "g": return "g";
      case "kg": return "kg";
      case "oz": return "oz";
      case "lb": return "lb";
      case "ml": return "ml";
      case "l": return "L";
      case "cups": return currentLang === "fr" ? "tasses" : currentLang === "es" ? "tazas" : "cups";
      case "tbsp": return currentLang === "fr" ? "c. à soupe" : currentLang === "es" ? "cucharas" : "tbsp";
      case "tsp": return currentLang === "fr" ? "c. à café" : currentLang === "es" ? "cucharaditas" : "tsp";
      case "floz": return "fl oz";
      default: return unitId;
    }
  };

  // Focus states
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  // Reference hooks
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Close search panels
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

  // Custom culinary metric modal state triggers
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState<'weight' | 'volume'>('volume');
  const [newFactor, setNewFactor] = useState<number | "">("");

  // Density lookup list containing English, French, Spanish tokens
  const resolvedIngredient = useMemo(() => {
    const text = ingredientName.toLowerCase().trim();
    if (!text) {
      return { density: 1.00, isDefault: true, name: "" };
    }

    // Find first item that matches one of its name keywords as a substring
    const found = INGREDIENT_DENSITIES.find((item) => {
      return item.names.some((keyword) => text.includes(keyword));
    });

    if (found) {
      const displayName = lang === "fr" ? found.displayFr : lang === "es" ? found.displayEs : found.displayEn;
      return { density: found.density, isDefault: false, name: displayName, item: found };
    }

    return { density: 1.00, isDefault: true, name: ingredientName };
  }, [ingredientName, lang]);

  const appliedDensity = resolvedIngredient.density;

  // Aggregate cooking units options
  const unitOptions = useMemo(() => {
    const list = KITCHEN_UNITS.map((u) => ({
      id: u.id,
      label: lang === 'fr' ? u.labelFr : lang === 'es' ? u.labelEs : u.labelEn,
      type: u.type as 'weight' | 'volume',
      factor: u.factor
    }));

    customUnits.forEach((cu) => {
      list.push({
        id: cu.symbol || cu.name.toLowerCase().replace(/\s+/g, "_"),
        label: `${cu.name} (${cu.symbol})`,
        type: (cu.baseUnit as 'weight' | 'volume') || 'volume',
        factor: cu.factor
      });
    });

    return list;
  }, [lang, customUnits]);

  // Search filter options
  const filteredFromOptions = useMemo(() => {
    const q = fromQuery.toLowerCase().trim();
    if (!q) return unitOptions;
    return unitOptions.filter(o => o.id.includes(q) || o.label.toLowerCase().includes(q));
  }, [fromQuery, unitOptions]);

  const filteredToOptions = useMemo(() => {
    const q = toQuery.toLowerCase().trim();
    if (!q) return unitOptions;
    return unitOptions.filter(o => o.id.includes(q) || o.label.toLowerCase().includes(q));
  }, [toQuery, unitOptions]);

  // Analyze inputted text to determine units safely without crashes
  const resolvedFromUnit = useMemo(() => {
    const q = fromQuery.trim().toLowerCase();
    const found = unitOptions.find(o => o.id === q || o.label.toLowerCase().includes(q));
    return found ? found.id : q || "g";
  }, [fromQuery, unitOptions]);

  const resolvedToUnit = useMemo(() => {
    const q = toQuery.trim().toLowerCase();
    const found = unitOptions.find(o => o.id === q || o.label.toLowerCase().includes(q));
    return found ? found.id : q || "cups";
  }, [toQuery, unitOptions]);

  // Compute conversion bridge safely
  const currentResult = useMemo(() => {
    const rawVal = inputValue === "" ? 0 : inputValue;
    const fromInfo = unitOptions.find(u => u.id === resolvedFromUnit);
    const toInfo = unitOptions.find(u => u.id === resolvedToUnit);

    // If unit typed is arbitrary and does not match standard configs, return the value unmodified cleanly
    if (!fromInfo || !toInfo) {
      if (fromInfo) {
        return Number((rawVal * fromInfo.factor).toFixed(4));
      }
      return rawVal;
    }

    // Convert to common base quantity (ML for volumes, G for weights)
    const baseQuantity = rawVal * fromInfo.factor;
    let standardMl = 0;

    if (fromInfo.type === 'weight') {
      standardMl = baseQuantity / appliedDensity;
    } else {
      standardMl = baseQuantity;
    }

    let outVal = 0;
    if (toInfo.type === 'weight') {
      const gEquivalent = standardMl * appliedDensity;
      outVal = gEquivalent / toInfo.factor;
    } else {
      outVal = standardMl / toInfo.factor;
    }

    return Number(outVal.toFixed(4));
  }, [inputValue, resolvedFromUnit, resolvedToUnit, appliedDensity, unitOptions]);

  // Sync to history cache
  const triggerHistoryPost = () => {
    if (inputValue !== "") {
      onAddHistory({
        module: 'kitchen',
        moduleLabel: lang === 'fr' ? 'Cuisine' : lang === 'es' ? 'Cocina' : 'Kitchen',
        expression: `${inputValue} ${resolvedFromUnit} [${ingredientName}] = ${currentResult} ${resolvedToUnit}`,
        details: `${lang === "fr" ? "Densité" : "Density"}: ${appliedDensity} g/ml`
      });
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      triggerHistoryPost();
    }, 1500);
    return () => clearTimeout(handler);
  }, [inputValue, resolvedFromUnit, resolvedToUnit, appliedDensity, ingredientName]);

  const handleSaveCustomUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newCode || !newFactor) return;

    const newItem: CustomConversionItem = {
      id: `custom_uni_${Date.now()}`,
      category: 'kitchen',
      name: newLabel,
      symbol: newCode.toLowerCase(),
      factor: Number(newFactor),
      baseUnit: newType
    };

    const updated = [...customUnits, newItem];
    setCustomUnits(updated);
    localStorage.setItem("smartcalcul_custom_kitchen_units", JSON.stringify(updated));

    setToQuery(newItem.symbol!);
    setNewLabel("");
    setNewCode("");
    setNewFactor("");
    setShowAddModal(false);
  };

  const t = lang === 'fr' ? {
    title: "Convertisseur Culinaires",
    ingredientLabel: "Ingrédient (Recherche libre)",
    fromLabel: "Unité d'origine",
    toLabel: "Unité cible",
    valueLabel: "Quantité ou dose",
    addBtn: "Ajouter une mesure personnalisée",
    addTitle: "Saisir unité de cuisine",
    placeholderLabel: "Nom, ex: Verre à moutarde",
    placeholderCode: "Symbole, ex: verre",
    placeholderFactor: "Contenu",
    cancel: "Annuler",
    save: "Enregistrer",
    typeVolume: "Volume (ml)",
    typeWeight: "Masse (g)",
    explainSuggest: "Ingrédients communs :",
    placeholderInput: "Saisissez ou recherchez...",
    resultLabel: "RÉSULTAT",
    densityLabel: "Densité appliquée :",
    placeholderIngredient: "ex: Farine de blé, Sucre blanc, Miel..."
  } : lang === 'es' ? {
    title: "Convertidor de Cocina",
    ingredientLabel: "Ingrediente (Búsqueda libre)",
    fromLabel: "Unidad inicial",
    toLabel: "Unidad destino",
    valueLabel: "Cantidad",
    addBtn: "Registrar medida culinaria a la medida",
    addTitle: "Insertar medida",
    placeholderLabel: "Nombre, ej: Pocillo",
    placeholderCode: "Código, ej: poc",
    placeholderFactor: "Contenido",
    cancel: "Cancelar",
    save: "Guardar",
    typeVolume: "Volumen (ml)",
    typeWeight: "Peso (g)",
    explainSuggest: "Sugerencias rápidas:",
    placeholderInput: "Escriba o filtre...",
    resultLabel: "RESULTADO DEL MAPPING",
    densityLabel: "Factor de densidad aplicado:",
    placeholderIngredient: "ej: Harina de trigo, Azúcar blanco, Miel..."
  } : {
    title: "Culinary & Kitchen Converter",
    ingredientLabel: "Liquid or Dry Ingredient",
    fromLabel: "Source Measurement Unit",
    toLabel: "Target Measurement Unit",
    valueLabel: "Standard Quantity",
    addBtn: "Add new generic cooking unit",
    addTitle: "Create custom kitchen unit",
    placeholderLabel: "Name, e.g. Small Spoon",
    placeholderCode: "Code, e.g. spoon",
    placeholderFactor: "Value equivalent",
    cancel: "Cancel",
    save: "Save",
    typeVolume: "Volumetric (ml)",
    typeWeight: "Weight index (g)",
    explainSuggest: "Quick Ingredients:",
    placeholderInput: "Type or match units...",
    resultLabel: "CATERING OUTPUT",
    densityLabel: "Density Factor applied:",
    placeholderIngredient: "e.g. Wheat Flour, White Sugar, Honey..."
  };

  return (
    <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 sm:p-10 flex flex-col gap-6 max-w-4xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] transition-all duration-300">
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-gray-150 pb-4">
        <ChefHat className="w-6 h-6 text-[#FF3B30]" />
        <h3 className="text-xl font-bold text-[#0A0A0A] tracking-tight uppercase">
          {t.title}
        </h3>
      </div>

      {/* Workspace Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        {/* Left Inputs panel */}
        <div className="lg:col-span-7 space-y-5">
          {/* Ingredient Free Text Search Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-black uppercase tracking-wider block">
              {t.ingredientLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
                placeholder={t.placeholderIngredient}
                className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-md text-sm font-semibold text-black focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30]"
              />
              <Utensils className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
            </div>

            {/* Premium quick filter tags */}
            <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-bold">
              <span className="text-gray-400 mr-1 self-center">{t.explainSuggest}</span>
              <button
                type="button"
                onClick={() => setIngredientName(lang === "fr" ? "Farine" : lang === "es" ? "Harina" : "Flour")}
                className="px-2.5 py-1 bg-white border border-gray-200 hover:border-[#FF3B30] text-black hover:text-[#FF3B30] rounded transition-colors cursor-pointer"
              >
                {lang === 'fr' ? "Farine (0.53)" : lang === 'es' ? "Harina (0.53)" : "Flour (0.53)"}
              </button>
              <button
                type="button"
                onClick={() => setIngredientName(lang === "fr" ? "Sucre (blanc)" : lang === "es" ? "Azúcar (blanco)" : "White Sugar")}
                className="px-2.5 py-1 bg-white border border-gray-200 hover:border-[#FF3B30] text-black hover:text-[#FF3B30] rounded transition-colors cursor-pointer"
              >
                {lang === 'fr' ? "Sucre (0.85)" : lang === 'es' ? "Azúcar (0.85)" : "Sugar (0.85)"}
              </button>
              <button
                type="button"
                onClick={() => setIngredientName(lang === "fr" ? "Huile (coco)" : lang === "es" ? "Aceite de coco" : "Coconut Oil")}
                className="px-2.5 py-1 bg-white border border-gray-200 hover:border-[#FF3B30] text-black hover:text-[#FF3B30] rounded transition-colors cursor-pointer"
              >
                {lang === 'fr' ? "Huile coco (0.93)" : lang === 'es' ? "Aceite de coco (0.93)" : "Coconut Oil (0.93)"}
              </button>
              <button
                type="button"
                onClick={() => setIngredientName(lang === "fr" ? "Miel" : lang === "es" ? "Miel" : "Honey")}
                className="px-2.5 py-1 bg-white border border-gray-200 hover:border-[#FF3B30] text-black hover:text-[#FF3B30] rounded transition-colors cursor-pointer"
              >
                {lang === 'fr' ? "Miel (1.42)" : lang === 'es' ? "Miel (1.42)" : "Honey (1.42)"}
              </button>
              <button
                type="button"
                onClick={() => setIngredientName(lang === "fr" ? "Café (moulu)" : lang === "es" ? "Café molido" : "Ground Coffee")}
                className="px-2.5 py-1 bg-white border border-gray-200 hover:border-[#FF3B30] text-black hover:text-[#FF3B30] rounded transition-colors cursor-pointer"
              >
                {lang === 'fr' ? "Café (0.35)" : lang === 'es' ? "Café (0.35)" : "Coffee (0.35)"}
              </button>
            </div>
          </div>

          {/* Autocomplete Units Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* From unit search */}
            <div className="space-y-1.5" ref={fromRef}>
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
                    {filteredFromOptions.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => {
                          setFromQuery(o.id);
                          setFromDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#FF3B30]/5 text-xs font-semibold text-black flex items-center justify-between border-b border-gray-50 last:border-0 cursor-pointer"
                      >
                        <span>{o.label} ({o.id})</span>
                        {resolvedFromUnit === o.id && <Check className="w-3.5 h-3.5 text-[#FF3B30]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* To unit search */}
            <div className="space-y-1.5" ref={toRef}>
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
                    {filteredToOptions.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => {
                          setToQuery(o.id);
                          setToDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#FF3B30]/5 text-xs font-semibold text-black flex items-center justify-between border-b border-gray-50 last:border-0 cursor-pointer"
                      >
                        <span>{o.label} ({o.id})</span>
                        {resolvedToUnit === o.id && <Check className="w-3.5 h-3.5 text-[#FF3B30]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Numeric Val */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-black uppercase tracking-wider block">
              {t.valueLabel}
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="e.g. 100"
              className="w-full h-11 px-4 bg-white border border-gray-200 rounded-md text-black text-sm font-semibold focus:outline-none focus:border-[#FF3B30] font-mono transition-colors"
            />
          </div>

          {/* Modal triggering button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="text-xs font-bold text-[#FF3B30] hover:text-[#E02D22] flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95 duration-100"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addBtn}</span>
            </button>
          </div>
        </div>

        {/* Right Preview Output Panel */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between min-h-[180px] hover:border-[#FF3B30] transition-all shadow-xs duration-300">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 block mb-1">
              {t.resultLabel}
            </span>
            <div className="text-4xl font-extrabold text-[#0A0A0A] font-mono tracking-tight break-all">
              {currentResult.toLocaleString()}{' '}
              <span className="text-[#FF3B30] font-bold text-2.5xl uppercase ml-1 block sm:inline-block">
                {getUnitLabelForDisplay(resolvedToUnit, lang)}
              </span>
            </div>

            {resolvedIngredient.isDefault && (
              <div className="mt-4 p-3 bg-red-50 border border-[#FF3B30]/20 rounded-lg text-xs text-[#FF3B30] font-bold flex items-start gap-1.5 leading-snug animate-in fade-in duration-200">
                <span className="mt-0.5">⚠️</span>
                <span>
                  {lang === 'fr' 
                    ? "Avertissement : Densité standard (1.00) utilisée pour cet ingrédient" 
                    : lang === 'es' 
                    ? "Advertencia: Densidad estándar (1.00) utilizada para este ingrediente" 
                    : "Warning: Standard density (1.00) used for this ingredient"}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-150 pt-4 mt-4 text-xs font-semibold text-[#0A0A0A] space-y-1">
            <p className="font-sans leading-none text-gray-500">
              {t.densityLabel}
            </p>
            <p className="font-mono text-[14px]">
              <strong>{ingredientName}</strong> &rarr; <span className="text-[#FF3B30]">{appliedDensity} g / ml</span>
            </p>
          </div>
        </div>

      </div>

      {/* POPUP SIZED DIALOG */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveCustomUnit}
            className="bg-white border border-[#E6E6E6] rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-[#FF3B30]" />
                {t.addTitle}
              </h4>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                required
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
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

                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as 'weight' | 'volume')}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-black bg-white focus:outline-none"
                >
                  <option value="volume">{t.typeVolume}</option>
                  <option value="weight">{t.typeWeight}</option>
                </select>
              </div>

              <input
                type="number"
                required
                step="any"
                value={newFactor}
                onChange={(e) => setNewFactor(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder={newType === 'volume' ? `${t.placeholderFactor} (ml)` : `${t.placeholderFactor} (g)`}
                className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-black font-mono focus:outline-none focus:border-[#FF3B30]"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
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
