/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { Percent } from "lucide-react";
import { Language, HistoryItem } from "../types";

interface PercentConverterProps {
  lang: Language;
  onAddHistory: (item: Omit<HistoryItem, "id" | "timestamp">) => void;
}

export default function PercentConverter({ lang, onAddHistory }: PercentConverterProps) {
  // Mode selection: 
  // 'amount'   : Calculate portion (Calculer le montant)
  // 'discount' : Apply discount (Appliquer une remise)
  // 'addition' : Add percent (Ajouter un montant)
  const [mode, setMode] = useState<'amount' | 'discount' | 'addition'>('amount');

  const [montant, setMontant] = useState<number | "">(500);
  const [pourcentage, setPourcentage] = useState<number | "">(20);

  const currencySymbol = useMemo(() => {
    if (lang === 'fr' || lang === 'es') return '€';
    return '$';
  }, [lang]);

  const isValid = montant !== "" && pourcentage !== "" && !isNaN(Number(montant)) && !isNaN(Number(pourcentage));

  const resultDetails = useMemo(() => {
    if (!isValid) {
      return {
        main: "—",
        explanation: lang === 'fr' 
          ? "Saisissez un montant et un pourcentage pour commencer le calcul." 
          : lang === 'es' 
          ? "Introduzca un monto y un porcentaje para iniciar le cálculo." 
          : "Enter an amount and percentage to begin calculation."
      };
    }

    const m = Number(montant);
    const p = Number(pourcentage);

    if (mode === 'amount') {
      const computed = Number(((p / 100) * m).toFixed(4));
      return {
        main: lang === 'fr'
          ? `Cela représente ${computed.toLocaleString()} ${currencySymbol}`
          : lang === 'es'
          ? `Esto representa ${computed.toLocaleString()} ${currencySymbol}`
          : `This represents ${currencySymbol}${computed.toLocaleString()}`,
        explanation: lang === 'fr'
          ? `Calcul de ${p}% de ${m} ${currencySymbol}`
          : lang === 'es'
          ? `Cálculo de ${p}% de ${m} ${currencySymbol}`
          : `Calculation of ${p}% of ${currencySymbol}${m}`
      };
    } else if (mode === 'discount') {
      const discountVal = (p / 100) * m;
      const computed = Number((m - discountVal).toFixed(4));
      return {
        main: lang === 'fr'
          ? `Nouveau montant après remise : ${computed.toLocaleString()} ${currencySymbol}`
          : lang === 'es'
          ? `Nuevo monto tras descuento: ${computed.toLocaleString()} ${currencySymbol}`
          : `New amount after discount: ${currencySymbol}${computed.toLocaleString()}`,
        explanation: lang === 'fr'
          ? `Montant initial de ${m} ${currencySymbol} réduit de ${p}% (${discountVal.toLocaleString()} ${currencySymbol} de remise)`
          : lang === 'es'
          ? `Monto inicial de ${m} ${currencySymbol} menos ${p}% (${discountVal.toLocaleString()} ${currencySymbol} de descuento)`
          : `Initial amount of ${currencySymbol}${m} reduced by ${p}% (${currencySymbol}${discountVal.toLocaleString()} discount)`
      };
    } else { // addition
      const additionVal = (p / 100) * m;
      const computed = Number((m + additionVal).toFixed(4));
      return {
        main: lang === 'fr'
          ? `Nouveau montant après ajout : ${computed.toLocaleString()} ${currencySymbol}`
          : lang === 'es'
          ? `Nuevo monto tras adición: ${computed.toLocaleString()} ${currencySymbol}`
          : `New amount after addition: ${currencySymbol}${computed.toLocaleString()}`,
        explanation: lang === 'fr'
          ? `Montant initial de ${m} ${currencySymbol} augmenté de ${p}% (${additionVal.toLocaleString()} ${currencySymbol} d'ajout)`
          : lang === 'es'
          ? `Monto inicial de ${m} ${currencySymbol} más ${p}% (${additionVal.toLocaleString()} ${currencySymbol} de adición)`
          : `Initial amount of ${currencySymbol}${m} increased by ${p}% (${currencySymbol}${additionVal.toLocaleString()} addition)`
      };
    }
  }, [montant, pourcentage, mode, lang, isValid, currencySymbol]);

  const triggerHistoryPost = () => {
    if (isValid) {
      const m = Number(montant);
      const p = Number(pourcentage);
      let expression = "";
      if (mode === 'amount') {
        const computed = Number(((p / 100) * m).toFixed(4));
        expression = lang === 'en'
          ? `${p}% of ${currencySymbol}${m} = ${currencySymbol}${computed}`
          : `${p}% de ${m} ${currencySymbol} = ${computed} ${currencySymbol}`;
      } else if (mode === 'discount') {
        const discountVal = (p / 100) * m;
        const computed = Number((m - discountVal).toFixed(4));
        expression = lang === 'en'
          ? `${currencySymbol}${m} - ${p}% = ${currencySymbol}${computed}`
          : `${m} ${currencySymbol} - ${p}% = ${computed} ${currencySymbol}`;
      } else {
        const additionVal = (p / 100) * m;
        const computed = Number((m + additionVal).toFixed(4));
        expression = lang === 'en'
          ? `${currencySymbol}${m} + ${p}% = ${currencySymbol}${computed}`
          : `${m} ${currencySymbol} + ${p}% = ${computed} ${currencySymbol}`;
      }

      onAddHistory({
        module: 'percent',
        moduleLabel: lang === 'fr' ? 'Analyse Pourcentages' : lang === 'es' ? 'Análisis Porcentajes' : 'Percentage Analysis',
        expression,
        details: ""
      });
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      triggerHistoryPost();
    }, 1500);
    return () => clearTimeout(handler);
  }, [montant, pourcentage, mode]);

  const t = lang === 'fr' ? {
    cardTitle: "Analyse Pourcentages",
    modeAmount: "Calculer le montant",
    modeDiscount: "Appliquer une remise (-%)",
    modeAddition: "Ajouter un montant (+%)",
    montantLabel: "Montant de base",
    pourcentageLabel: "Pourcentage",
    montantPlaceholder: "Ex: 500",
    pourcentagePlaceholder: "Ex: 20",
    resultLabel: "RÉSULTAT",
  } : lang === 'es' ? {
    cardTitle: "Análisis Porcentajes",
    modeAmount: "Calcular el monto",
    modeDiscount: "Appliquer une remise (-%)", // keeping it standard or translating nicely:
    modeDiscountFull: "Aplicar descuento (-%)",
    modeAddition: "Añadir un monto (+%)",
    montantLabel: "Monto de base",
    pourcentageLabel: "Porcentaje",
    montantPlaceholder: "Ej: 500",
    pourcentagePlaceholder: "Ej: 20",
    resultLabel: "RÉSULTAT",
  } : {
    cardTitle: "Percentage Analysis",
    modeAmount: "Calculate amount",
    modeDiscountFull: "Apply discount (-%)",
    modeAddition: "Add amount (+%)",
    montantLabel: "Base amount",
    pourcentageLabel: "Percentage",
    montantPlaceholder: "Ex: 500",
    pourcentagePlaceholder: "Ex: 20",
    resultLabel: "RESULT",
  };

  const activeDiscountLabel = lang === 'fr' ? t.modeDiscount : (lang === 'es' ? t.modeDiscountFull : t.modeDiscountFull);

  return (
    <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 sm:p-10 flex flex-col gap-6 max-w-4xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] transition-all duration-300">
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-gray-150 pb-4 border-gray-100">
        <Percent className="w-6 h-6 text-[#FF3B30]" />
        <h3 className="text-xl font-bold text-[#0A0A0A] tracking-tight uppercase">
          {t.cardTitle}
        </h3>
      </div>

      {/* Tabs switch (Elegant minimalist border layout, pure white) */}
      <div className="flex flex-col sm:flex-row gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
        <button
          type="button"
          onClick={() => setMode('amount')}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer active:scale-95 duration-150 text-center ${
            mode === 'amount' ? 'bg-[#FF3B30] text-white shadow-sm' : 'text-black hover:bg-gray-100'
          }`}
        >
          {t.modeAmount}
        </button>
        <button
          type="button"
          onClick={() => setMode('discount')}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer active:scale-95 duration-150 text-center ${
            mode === 'discount' ? 'bg-[#FF3B30] text-white shadow-sm' : 'text-black hover:bg-gray-100'
          }`}
        >
          {activeDiscountLabel}
        </button>
        <button
          type="button"
          onClick={() => setMode('addition')}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer active:scale-95 duration-150 text-center ${
            mode === 'addition' ? 'bg-[#FF3B30] text-white shadow-sm' : 'text-black hover:bg-gray-100'
          }`}
        >
          {t.modeAddition}
        </button>
      </div>

      {/* Core Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch pt-2">
        {/* Left Inputs block */}
        <div className="md:col-span-7 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider block">
              {t.montantLabel}
            </label>
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder={t.montantPlaceholder}
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-md text-black text-sm font-semibold focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] font-mono transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-black uppercase tracking-wider block">
              {t.pourcentageLabel}
            </label>
            <input
              type="number"
              value={pourcentage}
              onChange={(e) => setPourcentage(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder={t.pourcentagePlaceholder}
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-md text-black text-sm font-semibold focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] font-mono transition-colors"
            />
          </div>
        </div>

        {/* Right Output layout presentation */}
        <div className="md:col-span-5 bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between min-h-[180px] hover:border-[#FF3B30] transition-all shadow-sm duration-300">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 block mb-1">
              {t.resultLabel}
            </span>
            <div className={`font-mono tracking-tight break-words text-[#0A0A0A] ${
              isValid 
                ? 'text-lg sm:text-lg font-bold leading-relaxed border-l-4 border-[#FF3B30] pl-3 py-1.5 bg-gray-50 rounded-r-md' 
                : 'text-3xl font-extrabold'
            }`}>
              {resultDetails.main}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mt-4 text-xs font-semibold text-gray-400 leading-snug font-mono">
            {resultDetails.explanation}
          </div>
        </div>

      </div>

    </div>
  );
}
