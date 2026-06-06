/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coins, Percent, Calendar, ShieldCheck, Calculator } from "lucide-react";
import { Language } from "../types";

interface LoanConverterProps {
  lang: Language;
}

export default function LoanConverter({ lang }: LoanConverterProps) {
  // States for input parameters
  const [amount, setAmount] = useState<number>(100000); // Principal in EUR / USD / $
  const [rate, setRate] = useState<number>(3.5); // Annual interest rate in %
  const [years, setYears] = useState<number>(15); // Loan duration in years

  // Output result
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Internationalized dictionaries
  const t = {
    fr: {
      title: "Calculateur de Prêt Immobilier & Personnel",
      description: "Estimez rapidement vos mensualités de remboursement d'emprunt d'après des barèmes amortissables exacts.",
      amountLabel: "Montant du capital payé (Emprunt)",
      rateLabel: "Taux d'intérêt annuel",
      yearsLabel: "Durée du remboursement",
      btnCalculate: "Calculer ma mensualité",
      resultLeading: "Mensualité :",
      currencySymbol: "€",
      months: "mois",
      totalRepayment: "Montant total remboursé :",
      totalInterest: "Total des intérêts payés :",
      loanNotice: "Ce calcul est généré en local d'après la formule standard d'amortissement de prêt. Renseignez-vous auprès de votre banque pour l'offre exacte.",
    },
    en: {
      title: "Mortgage & Personal Loan Calculator",
      description: "Quickly calculate monthly loan payments and amortization costs locally.",
      amountLabel: "Principal Loan Amount",
      rateLabel: "Annual Interest Rate",
      yearsLabel: "Loan Term Duration",
      btnCalculate: "Calculate Monthly Payment",
      resultLeading: "Monthly Payment:",
      currencySymbol: "$",
      months: "months",
      totalRepayment: "Total payments:",
      totalInterest: "Total interest costs:",
      loanNotice: "These projections are processed offline using standard amortization matrices. Check details with an advisor for exact values.",
    },
    es: {
      title: "Calculadora de Préstamo e Hipoteca",
      description: "Estime de manera exacta las cuotas de devolución amortizables en cualquier momento.",
      amountLabel: "Capital de Préstamo (Monto)",
      rateLabel: "Tasa de Interés Anual",
      yearsLabel: "Plazo de Amortización",
      btnCalculate: "Calcular Cuota Mensual",
      resultLeading: "Mensualidad:",
      currencySymbol: "€",
      months: "meses",
      totalRepayment: "Total reembolsado:",
      totalInterest: "Total intereses pagados:",
      loanNotice: "Cálculo local libre de API correspondiente a la fórmula convencional de cuotas decrecientes.",
    }
  }[lang] || {
    title: "Calculateur de Prêt Immobilier & Personnel",
    description: "Estimez rapidement vos mensualités de remboursement d'emprunt d'après des barèmes amortissables exacts.",
    amountLabel: "Montant du capital payé (Emprunt)",
    rateLabel: "Taux d'intérêt annuel",
    yearsLabel: "Durée du remboursement",
    btnCalculate: "Calculer ma mensualité",
    resultLeading: "Mensualité :",
    currencySymbol: "€",
    months: "mois",
    totalRepayment: "Montant total remboursé :",
    totalInterest: "Total des intérêts payés :",
    loanNotice: "Ce calcul est généré en local d'après la formule standard d'amortissement de prêt. Renseignez-vous auprès de votre banque pour l'offre exacte.",
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Monthly interest rate calculation
    const r = (rate / 100) / 12;
    // Total number of payment periods
    const n = years * 12;

    let payment = 0;
    if (r === 0) {
      payment = amount / n;
    } else {
      // Amortization Formula: P * [ r * (1 + r)^n ] / [ (1 + r)^n - 1 ]
      const factor = Math.pow(1 + r, n);
      payment = amount * (r * factor) / (factor - 1);
    }

    setMonthlyPayment(Math.round(payment * 100) / 100);
    setShowResult(true);
  };

  // Intermediate values for optional credit card look depth
  const totalRepaidVal = monthlyPayment ? monthlyPayment * years * 12 : 0;
  const totalInterestPaidVal = monthlyPayment ? totalRepaidVal - amount : 0;

  return (
    <div className="space-y-6" id="loan-module-wrapper">
      
      {/* Sleek Loan Calculator Area */}
      <section className="bg-white border border-[#E6E6E6] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
        
        {/* Loan Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
          <div className="w-12 h-12 bg-[#FF3B30]/5 text-[#FF3B30] border border-[#FF3B30]/20 rounded-xl flex items-center justify-center shrink-0">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-[#0A0A0A] tracking-tight uppercase">
              {t.title}
            </h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {t.description}
            </p>
          </div>
        </div>

        {/* Form with Sliders */}
        <form onSubmit={handleCalculate} className="p-6 md:p-8 space-y-6">
          
          <div className="grid grid-cols-1 gap-6">
            
            {/* 1. PRINCIPAL LOAN AMOUNT SLIDER */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="amount-slider" className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-gray-400" />
                  {t.amountLabel}
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(1000, Math.min(2000000, Number(e.target.value) || 0)))}
                    className="w-24 text-center py-1 border border-gray-200 rounded text-xs font-bold font-mono focus:outline-none focus:border-[#FF3B30]"
                    step="1000"
                  />
                  <span className="text-xs font-semibold text-gray-400">{t.currencySymbol}</span>
                </div>
              </div>
              <input
                id="amount-slider"
                type="range"
                min="1000"
                max="1000000"
                step="5000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF3B30]"
              />
              <div className="flex justify-between text-[10px] text-gray-450 font-mono font-medium">
                <span>1 000 {t.currencySymbol}</span>
                <span>500 000 {t.currencySymbol}</span>
                <span>1 000 000 {t.currencySymbol}</span>
              </div>
            </div>

            {/* 2. INTEREST RATE SLIDER */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="rate-slider" className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-gray-400" />
                  {t.rateLabel}
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Math.max(0, Math.min(30, Number(e.target.value) || 0)))}
                    className="w-16 text-center py-1 border border-gray-200 rounded text-xs font-bold font-mono focus:outline-none focus:border-[#FF3B30]"
                    step="0.1"
                  />
                  <span className="text-xs font-semibold text-gray-400">%</span>
                </div>
              </div>
              <input
                id="rate-slider"
                type="range"
                min="0"
                max="25"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF3B30]"
              />
              <div className="flex justify-between text-[10px] text-gray-450 font-mono font-medium">
                <span>0 %</span>
                <span>12.5 %</span>
                <span>25 %</span>
              </div>
            </div>

            {/* 3. DURATION IN YEARS SLIDER */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="years-slider" className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {t.yearsLabel}
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Math.max(1, Math.min(50, Number(e.target.value) || 0)))}
                    className="w-14 text-center py-1 border border-gray-200 rounded text-xs font-bold font-mono focus:outline-none focus:border-[#FF3B30]"
                  />
                  <span className="text-xs font-semibold text-gray-400">ans</span>
                </div>
              </div>
              <input
                id="years-slider"
                type="range"
                min="1"
                max="40"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF3B30]"
              />
              <div className="flex justify-between text-[10px] text-gray-450 font-mono font-medium">
                <span>1 an</span>
                <span>20 ans</span>
                <span>40 ans</span>
              </div>
            </div>

          </div>

          {/* Calculate Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full h-12 bg-[#FF3B30] hover:bg-[#E02D22] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md cursor-pointer transition-all duration-150 active:scale-98 flex items-center justify-center"
            >
              <span>{t.btnCalculate}</span>
            </button>
          </div>

        </form>

        {/* Monthly payment output displayed elegantly with fade animation */}
        <AnimatePresence>
          {showResult && monthlyPayment !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="border-t border-gray-150 bg-gray-50/10"
              id="loan-calculation-result"
            >
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Result Block: 'Mensualité : [Valeur]' */}
                <div className="bg-white border-2 border-[#FF3B30]/30 rounded-2xl p-6 text-center space-y-1 shadow-sm">
                  <span className="text-xs font-black text-[#0A0A0A] uppercase tracking-widest block">
                    {t.resultLeading}
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-[#FF3B30] font-mono tracking-tighter">
                    {monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {t.currencySymbol}
                    <span className="text-xs font-bold text-[#0A0A0A] uppercase ml-1 block sm:inline-block">/ {t.months}</span>
                  </div>
                </div>

                {/* Optional Financial Summary Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
                      {t.totalRepayment}
                    </span>
                    <span className="text-lg font-extrabold text-[#0A0A0A] font-mono">
                      {totalRepaidVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {t.currencySymbol}
                    </span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">
                      {t.totalInterest}
                    </span>
                    <span className="text-lg font-extrabold text-[#0A0A0A] font-mono">
                      {totalInterestPaidVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {t.currencySymbol}
                    </span>
                  </div>
                </div>

                {/* Standards physical advice note */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 shadow-xs">
                  <div className="w-5 h-5 text-gray-450 shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {t.loanNotice}
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

    </div>
  );
}
