/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Info, Trophy, Heart, Users, Compass } from "lucide-react";
import { Language } from "../types";

interface PerformanceConverterProps {
  lang: Language;
}

export default function PerformanceConverter({ lang }: PerformanceConverterProps) {
  // States for input
  const [weight, setWeight] = useState<number>(70); // in kg
  const [height, setHeight] = useState<number>(175); // in cm
  const [age, setAge] = useState<number>(30); // in years
  const [gender, setGender] = useState<"homme" | "femme" | "autre">("homme");
  const [activity, setActivity] = useState<string>("moderate");

  // Output results
  const [calculatedImc, setCalculatedImc] = useState<number | null>(null);
  const [calculatedTdee, setCalculatedTdee] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Localization dictionaries
  const t = {
    fr: {
      title: "Calculateur de Performance & Métabolisme",
      description: "Optimisez vos apports et analysez vos facteurs de santé avec une précision d'atelier technique.",
      ageLabel: "Votre Âge",
      ageUnit: "ans",
      weightLabel: "Votre Poids",
      weightUnit: "kg",
      heightLabel: "Votre Taille",
      heightUnit: "cm",
      genderLabel: "Sexe Biologique / Profil",
      genderMale: "Homme",
      genderFemale: "Femme",
      genderOther: "Neutre / Autre",
      activityLabel: "Niveau d'activité physique globale",
      actSed: "Sédentaire (Pas d'exercice)",
      actLight: "Légèrement actif (Exercice 1-3j/semaine)",
      actMod: "Modérément actif (Exercice 3-5j/semaine)",
      actHigh: "Très actif (Exercice intense 6-7j/semaine)",
      actExt: "Extrêmement actif (Métier physique & sport intense)",
      btnCalculate: "Calculer mon métabolisme",
      imcTitle: "Indice de Masse Corporelle (IMC)",
      tdeeTitle: "Dépense Énergétique Totale (TDEE)",
      tdeeSub: "Besoin de maintien calorique par jour",
      underweight: "Insuffisance pondérale",
      normal: "Poids normal / Optimal",
      overweight: "Surpoids",
      obese: "Obésité",
      scientificNotice: "Ces résultats sont basés sur des standards scientifiques (Mifflin-St Jeor & IMC OMS) et sont destinés à un usage informatif.",
      credibilityBand: "Utilisé quotidiennement par plus d'1 million de personnes à travers le monde.",
      
      // SEO Content
      seoTitle: "Comprendre vos besoins caloriques",
      seoPara1: "Le métabolisme de base (BMR) correspond à l'énergie que votre corps dépense au repos complet pour maintenir ses fonctions vitales actives. Calculer votre Dépense Énergétique Totale (TDEE) vous permet de calibrer précisément votre balance énergétique afin de prendre de la masse musculaire, perdre de la graisse ou garantir une excellente tenue métabolique au quotidien.",
      seoPara2: "L'indice de masse corporelle (IMC) reste un standard diagnostique mondial validé par l'Organisation Mondiale de la Santé (OMS). En croisant vos mensurations physiques avec des multiplicateurs d'activité étalonnés, notre outil local vous fournit des repères d'ajustement fiables et indépendants.",
      seoBullet1Title: "Ajustez d'après vos objectifs :",
      seoBullet1Point1: "Sécurisez un déficit calorique modéré (entre -10% et -15% du TDEE) pour perdre du tissu adipeux sans ralentir votre métabolisme.",
      seoBullet1Point2: "Établissez un léger surplus calorique (+200 à +500 kcal par jour) conjugué à un entraînement de force pour rebâtir la masse.",
      seoBullet1Point3: "Veillez à un apport protéique suffisant d'environ 1.6g à 2.2g par kilogramme de masse corporelle."
    },
    en: {
      title: "Performance & Metabolism Calculator",
      description: "Optimize your food intake and analyze your core health metrics with scientific precision.",
      ageLabel: "Your Age",
      ageUnit: "years",
      weightLabel: "Your Weight",
      weightUnit: "kg",
      heightLabel: "Your Height",
      heightUnit: "cm",
      genderLabel: "Biological Sex / Profile",
      genderMale: "Male",
      genderFemale: "Female",
      genderOther: "Unisex / Neutral",
      activityLabel: "Overall Daily Activity Level",
      actSed: "Sedentary (Little or no exercise)",
      actLight: "Lightly active (Exercise 1-3 days/week)",
      actMod: "Moderately active (Exercise 3-5 days/week)",
      actHigh: "Very active (Intense training 6-7 days/week)",
      actExt: "Extrêmement active (Physical job & intense sport)",
      btnCalculate: "Calculate Metabolism Parameters",
      imcTitle: "Body Mass Index (BMI)",
      tdeeTitle: "Total Daily Energy Expenditure (TDEE)",
      tdeeSub: "Caloric maintenance required per day",
      underweight: "Underweight",
      normal: "Optimal / Normal weight",
      overweight: "Overweight",
      obese: "Obesity",
      scientificNotice: "These results are calculated using proven clinical equations (Mifflin-St Jeor & WHO BMI rules) and are for informational purposes only.",
      credibilityBand: "Trusted and used daily by more than 1 million people globally.",
      
      // SEO Content
      seoTitle: "Understanding Your Caloric Requirements",
      seoPara1: "The Basal Metabolic Rate (BMR) represents the energy your body requires at absolute rest to maintain vital functions. Calculating your Total Daily Energy Expenditure (TDEE) allows you to calibrate your energy balance, enabling you to build lean muscle mass, release fat safely, or sustain premium energy levels.",
      seoPara2: "The Body Mass Index (BMI) is a global standard validated by the World Health Organization (WHO). By crossing your physical dimensions with verified activity multi-pliers, our offline module renders dependable health signals.",
      seoBullet1Title: "Calibrating your nutritional plan:",
      seoBullet1Point1: "Establish a controlled deficit (-10% to -15% of your TDEE) to trigger selective fat burning.",
      seoBullet1Point2: "Incorporate a minor surplus (+200 to +500 kcal per day) paired with progressive training to build strength.",
      seoBullet1Point3: "Sustain structured macronutrient distributions, emphasizing protein synthesis."
    },
    es: {
      title: "Calculadora de Rendimiento y Metabolismo",
      description: "Optimice su nutrición diaria y analice sus métricas corporales con rigor clínico.",
      ageLabel: "Su Edad",
      ageUnit: "años",
      weightLabel: "Su Peso",
      weightUnit: "kg",
      heightLabel: "Su Altura",
      heightUnit: "cm",
      genderLabel: "Sexo Biológico / Perfil",
      genderMale: "Hombre",
      genderFemale: "Mujer",
      genderOther: "Neutral / Otro",
      activityLabel: "Nivel de Actividad Diaria",
      actSed: "Sedentario (Sin ejercicio / Oficina)",
      actLight: "Ligeramente activo (Entrenamiento 1-3d/semana)",
      actMod: "Moderadamente activo (Entrenamiento 3-5d/semana)",
      actHigh: "Muy activo (Deporte duro 6-7d/semana)",
      actExt: "Extremadamente activo (Trabajo físico pesado)",
      btnCalculate: "Calcular Parámetros Metabólicos",
      imcTitle: "Índice de Masa Corporal (IMC)",
      tdeeTitle: "Gasto Energético Diario Total (TDEE)",
      tdeeSub: "Mantenimiento calórico diario",
      underweight: "Bajo peso",
      normal: "Peso normal / Óptimo",
      overweight: "Sobrepeso",
      obese: "Obesidad",
      scientificNotice: "Estos resultados se basan en estándares científicos oficiales (Mifflin-St Jeor e IMC de la OMS) y están destinados exclusivamente a fines informativos.",
      credibilityBand: "Utilizado a diario por más de 1 millón de usuarios en todo el mundo.",
      
      // SEO Content
      seoTitle: "Comprenda sus necesidades calóricas reales",
      seoPara1: "La Tasa Metabólica Basal (BMR) es el gasto energético mínimo para sustentar las necesidades fisiológicas del cuerpo humano en reposo. Evaluar su Gasto Energético Total (TDEE) es fundamental para regular su peso corporal de manera inteligente.",
      seoPara2: "El Índice de Masa Corporal (IMC) sigue sirviendo como referencia de composición validada por la OMS. Use variables precisas sobre su nivel de actividad para ajustar su ritmo diario.",
      seoBullet1Title: "Estrategias nutricionales eficientes:",
      seoBullet1Point1: "Establezca un déficit leve para promover la quema de reservas de grasa corporal de forma segura.",
      seoBullet1Point2: "Cree un superávit progresivo controlado si su objetivo actual es incrementar la potencia muscular.",
      seoBullet1Point3: "Ajuste el volumen proteico para consolidar la recomposición corporal total."
    }
  }[lang] || {
    title: "Calculateur de Performance & Métabolisme",
    description: "Optimisez vos apports et analysez vos facteurs de santé avec une précision d'atelier technique.",
    ageLabel: "Votre Âge",
    ageUnit: "ans",
    weightLabel: "Votre Poids",
    weightUnit: "kg",
    heightLabel: "Votre Taille",
    heightUnit: "cm",
    genderLabel: "Sexe Biologique / Profil",
    genderMale: "Homme",
    genderFemale: "Femme",
    genderOther: "Neutre / Autre",
    activityLabel: "Niveau d'activité physique globale",
    actSed: "Sédentaire (Pas d'exercice)",
    actLight: "Légèrement actif (Exercice 1-3j/semaine)",
    actMod: "Modérément actif (Exercice 3-5j/semaine)",
    actHigh: "Très actif (Exercice intense 6-7j/semaine)",
    actExt: "Extrêmement actif (Métier physique & sport intense)",
    btnCalculate: "Calculer mon métabolisme",
    imcTitle: "Indice de Masse Corporelle (IMC)",
    tdeeTitle: "Dépense Énergétique Totale (TDEE)",
    tdeeSub: "Besoin de maintien calorique par jour",
    underweight: "Insuffisance pondérale",
    normal: "Poids normal / Optimal",
    overweight: "Surpoids",
    obese: "Obésité",
    scientificNotice: "Ces résultats sont basés sur des standards scientifiques (Mifflin-St Jeor & IMC OMS) et sont destinés à un usage informatif.",
    credibilityBand: "Utilisé quotidiennement par plus d'1 million de personnes à travers le monde.",
    
    // SEO Content
    seoTitle: "Comprendre vos besoins caloriques",
    seoPara1: "Le métabolisme de base (BMR) correspond à l'énergie que votre corps dépense au repos complet pour maintenir ses fonctions vitales actives. Calculer votre Dépense Énergétique Totale (TDEE) vous permet de calibrer précisément votre balance énergétique afin de prendre de la masse musculaire, perdre de la graisse ou garantir une excellente tenue métabolique au quotidien.",
    seoPara2: "L'indice de masse corporelle (IMC) reste un standard diagnostique mondial validé par l'Organisation Mondiale de la Santé (OMS). En croisant vos mensurations physiques avec des multiplicateurs d'activité étalonnés, notre outil local vous fournit des repères d'ajustement fiables et indépendants.",
    seoBullet1Title: "Ajustez d'après vos objectifs :",
    seoBullet1Point1: "Sécurisez un déficit calorique modéré (entre -10% et -15% du TDEE) pour perdre du tissu adipeux sans ralentir votre métabolisme.",
    seoBullet1Point2: "Établissez un léger surplus calorique (+200 à +500 kcal par jour) conjugué à un entraînement de force pour rebâtir la masse.",
    seoBullet1Point3: "Veillez à un apport protéique suffisant d'environ 1.6g à 2.2g par kilogramme de masse corporelle."
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate BMI (Weight in kg / Height in m squared)
    const heightInMeters = height / 100;
    const imc = weight / (heightInMeters * heightInMeters);

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === "homme") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "femme") {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      // "autre" uses unisex average
      bmr = 10 * weight + 6.25 * height - 5 * age - 78;
    }

    // Apply activity multipliers
    let activityMultiplier = 1.2;
    if (activity === "light") activityMultiplier = 1.375;
    if (activity === "moderate") activityMultiplier = 1.55;
    if (activity === "high") activityMultiplier = 1.725;
    if (activity === "extreme") activityMultiplier = 1.9;

    const tdee = bmr * activityMultiplier;

    setCalculatedImc(Math.round(imc * 10) / 10);
    setCalculatedTdee(Math.round(tdee));
    setShowResults(true);
  };

  // Classify BMI (IMC)
  const getImcClass = (val: number) => {
    if (val < 18.5) return { label: t.underweight, color: "text-amber-500" };
    if (val < 25) return { label: t.normal, color: "text-[#FF3B30] font-black" };
    if (val < 30) return { label: t.overweight, color: "text-amber-600" };
    return { label: t.obese, color: "text-rose-700" };
  };

  return (
    <div className="space-y-12" id="performance-module-wrapper">
      
      {/* Principal computation card mimicking the sleek white layout with crimson accents */}
      <section className="bg-white border border-[#E6E6E6] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
        
        {/* Module Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
          <div className="w-12 h-12 bg-[#FF3B30]/5 text-[#FF3B30] border border-[#FF3B30]/20 rounded-xl flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
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

        {/* Dynamic Tactile Input Form */}
        <form onSubmit={handleCalculate} className="p-6 md:p-8 space-y-6">
          
          {/* Sliders and Inputs Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Column 1: Sliders with precise digital view and tactile feel */}
            <div className="space-y-6">
              
              {/* AGE SLIDER */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="age-slider" className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider">
                    {t.ageLabel}
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Math.max(1, Math.min(120, Number(e.target.value) || 0)))}
                      className="w-12 text-center py-0.5 border border-gray-200 rounded text-xs font-bold font-mono focus:outline-none focus:border-[#FF3B30]"
                    />
                    <span className="text-xs font-semibold text-gray-400">{t.ageUnit}</span>
                  </div>
                </div>
                <input
                  id="age-slider"
                  type="range"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF3B30]"
                />
              </div>

              {/* WEIGHT SLIDER */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="weight-slider" className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider">
                    {t.weightLabel}
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Math.max(10, Math.min(300, Number(e.target.value) || 0)))}
                      className="w-14 text-center py-0.5 border border-gray-200 rounded text-xs font-bold font-mono focus:outline-none focus:border-[#FF3B30]"
                    />
                    <span className="text-xs font-semibold text-gray-400">{t.weightUnit}</span>
                  </div>
                </div>
                <input
                  id="weight-slider"
                  type="range"
                  min="10"
                  max="300"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF3B30]"
                />
              </div>

              {/* HEIGHT INPUT / SLIDER */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="height-slider" className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider">
                    {t.heightLabel}
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Math.max(50, Math.min(270, Number(e.target.value) || 0)))}
                      className="w-14 text-center py-0.5 border border-gray-200 rounded text-xs font-bold font-mono focus:outline-none focus:border-[#FF3B30]"
                    />
                    <span className="text-xs font-semibold text-gray-400">{t.heightUnit}</span>
                  </div>
                </div>
                <input
                  id="height-slider"
                  type="range"
                  min="50"
                  max="270"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF3B30]"
                />
              </div>

            </div>

            {/* Column 2: Profiles & Settings */}
            <div className="space-y-6">
              
              {/* SEX SELECTION */}
              <div className="space-y-2">
                <span className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider block">
                  {t.genderLabel}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("homme")}
                    className={`py-2 text-xs font-bold uppercase tracking-wider border rounded-lg transition-all duration-150 active:scale-95 cursor-pointer ${
                      gender === "homme"
                        ? "border-[#FF3B30] bg-[#FF3B30]/5 text-[#FF3B30]"
                        : "border-gray-200 bg-white text-[#0A0A0A] hover:bg-gray-50"
                    }`}
                  >
                    {t.genderMale}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("femme")}
                    className={`py-2 text-xs font-bold uppercase tracking-wider border rounded-lg transition-all duration-150 active:scale-95 cursor-pointer ${
                      gender === "femme"
                        ? "border-[#FF3B30] bg-[#FF3B30]/5 text-[#FF3B30]"
                        : "border-gray-200 bg-white text-[#0A0A0A] hover:bg-gray-50"
                    }`}
                  >
                    {t.genderFemale}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("autre")}
                    className={`py-2 text-xs font-bold uppercase tracking-wider border rounded-lg transition-all duration-150 active:scale-95 cursor-pointer ${
                      gender === "autre"
                        ? "border-[#FF3B30] bg-[#FF3B30]/5 text-[#FF3B30]"
                        : "border-gray-200 bg-white text-[#0A0A0A] hover:bg-gray-50"
                    }`}
                  >
                    {t.genderOther}
                  </button>
                </div>
              </div>

              {/* ACTIVITY LEVEL DROPDOWN */}
              <div className="space-y-2">
                <label htmlFor="activity-level-select" className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider block">
                  {t.activityLabel}
                </label>
                <div className="relative">
                  <select
                    id="activity-level-select"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full p-2.5 text-xs font-bold border border-gray-200 rounded-lg bg-white text-black tracking-wide appearance-none focus:outline-none focus:border-[#FF3B30] cursor-pointer"
                  >
                    <option value="sedentary">{t.actSed}</option>
                    <option value="light">{t.actLight}</option>
                    <option value="moderate">{t.actMod}</option>
                    <option value="high">{t.actHigh}</option>
                    <option value="extreme">{t.actExt}</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Calculate Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full h-12 bg-[#FF3B30] hover:bg-[#E02D22] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md cursor-pointer transition-all duration-150 active:scale-98 flex items-center justify-center gap-2"
            >
              <span>{t.btnCalculate}</span>
            </button>
          </div>

        </form>

        {/* Mathematical Output Section with beautiful fade-in */}
        <AnimatePresence>
          {showResults && calculatedImc !== null && calculatedTdee !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-150 bg-gray-50/20 overflow-hidden"
              id="metabolism-results-panel"
            >
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Result Cards Display Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Result Item 1: BMI */}
                  <div className="bg-white border border-[#E6E6E6] rounded-xl p-5 space-y-2 relative shadow-xs">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      {t.imcTitle}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-[#0A0A0A] font-mono tracking-tight">
                        {calculatedImc.toFixed(1)}
                      </span>
                      <span className={`text-xs font-extrabold uppercase tracking-wide px-2 py-0.5 bg-gray-50 border border-gray-100 rounded ${getImcClass(calculatedImc).color}`}>
                        {getImcClass(calculatedImc).label}
                      </span>
                    </div>
                  </div>

                  {/* Result Item 2: TDEE */}
                  <div className="bg-white border border-[#E6E6E6] rounded-xl p-5 space-y-2 relative shadow-xs">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      {t.tdeeTitle}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-[#FF3B30] font-mono tracking-tight">
                        {calculatedTdee.toLocaleString()}
                      </span>
                      <span className="text-xs font-black text-[#0A0A0A] uppercase tracking-wide ml-1">
                        kcal / jour
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {t.tdeeSub}
                    </p>
                  </div>

                </div>

                {/* Scientifical Advisory Notice Block */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3 shadow-xs">
                  <div className="p-1 px-1.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-black uppercase tracking-wider shrink-0">
                    INFO
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {t.scientificNotice}
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Credibility Banner Segment */}
        <div className="py-4 px-6 md:px-8 border-t border-gray-100 bg-gray-50 text-center flex items-center justify-center gap-2 text-xs font-medium text-gray-400">
          <Users className="w-4 h-4 text-[#FF3B30]" />
          <span>{t.credibilityBand}</span>
        </div>

      </section>

      {/* SEO Section: "Comprendre vos besoins caloriques" to boost page length and visibility */}
      <section className="bg-white border border-gray-200 p-8 rounded-2xl shadow-xs space-y-6" id="caloric-needs-seo-block">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <h3 className="text-lg md:text-xl font-black text-[#0A0A0A] tracking-tight uppercase">
            {t.seoTitle}
          </h3>
        </div>
        
        <div className="text-xs text-gray-500 font-medium leading-relaxed space-y-4">
          <p>{t.seoPara1}</p>
          <p>{t.seoPara2}</p>
          
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <span className="text-xs font-black text-[#0A0A0A] uppercase tracking-wider block">
              {t.seoBullet1Title}
            </span>
            <ul className="space-y-2 pl-4 list-disc marker:text-[#FF3B30] text-[11px]">
              <li>{t.seoBullet1Point1}</li>
              <li>{t.seoBullet1Point2}</li>
              <li>{t.seoBullet1Point3}</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
