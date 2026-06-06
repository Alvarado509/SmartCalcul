/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Coins,
  Shirt,
  ChefHat,
  Scale,
  Percent,
  ChevronRight,
  Shield,
  Award,
  Mail,
  Send,
  CheckCircle,
  HelpCircle,
  Check,
  ChevronDown,
  Globe,
  ExternalLink,
  BookOpen,
  Info,
  Activity,
  Calculator
} from "lucide-react";

// Types & Data
import { Language, Page, HistoryItem } from "./types";
import { TRANSLATIONS } from "./data/baselineData";

// Components
import PerformanceConverter from "./components/PerformanceConverter";
import LoanConverter from "./components/LoanConverter";
import KitchenConverter from "./components/KitchenConverter";
import SizingConverter from "./components/SizingConverter";
import DistanceConverter from "./components/DistanceConverter";
import PercentConverter from "./components/PercentConverter";

/// Comprehensive Multilingual Dictionary for all SaaS Rebranding Elements
const SAAS_DICTIONARY = {
  fr: {
    slogan: "ESTIMATIONS • LOCAL-FIRST • SÉCURISÉ",
    ctaLaunch: "Entrer dans l'atelier de calcul",
    badgeLabel: "CERTIFICATION CONFORME",
    heroHeading: "L'intelligence de calcul de référence",
    heroSub: "La première plateforme décentralisée locale-first conçue pour calculer de façon stable votre métabolisme physique, vos mensualités de prêt, vos proportions de cuisine, et vos mesures géométriques.",
    
    // Section 1: Solution de métrologie universelle
    solTitle: "Solution de calcul universelle",
    solHeader: "Un standard de calcul affranchi des serveurs distants",
    solDesc: "smartcalcul résout l'incohérence des correspondances de données à travers un noyau de calcul statique unique. Vos données de forme physique, d'amortissement de prêt et de proportions sont isolées localement sur votre machine.",
    solPoint1: "Indexation instantanée : aucune de vos requêtes n'est relayée à des tiers.",
    solPoint2: "Formulation biologique de pointe d'après Mifflin-St Jeor.",
    solPoint3: "Échéances de crédit et amortissements calculés sans déviation.",

    // Section 2: Précision de calcul certifiée IEEE 754
    precTitle: "Précision de calcul certifiée IEEE 754",
    precHeader: "L'art de l'infaillibilité mathématique",
    precDesc: "Nos micro-algorithmes de calcul à virgule flottante neutralisent la décomposition binaire classique. Chaque équation bénéficie d'une correction automatique de double précision, pour un taux de déviation nul.",
    precPoint1: "Paramètres calibrés sur les standards physiques et médicaux (OMS).",
    precPoint2: "Filtres de représentation pour annuler le bruit d'arrondi numérique.",
    precPoint3: "Autonomie de sauvegarde : opère sans réseau, idéal en zone reculée.",

    // Section 3: Comment ça marche
    howTitle: "Comment fonctionne smartcalcul ?",
    howStep1Title: "1. Choix du module",
    howStep1Desc: "Naviguez à travers le catalogue de nos consoles : métabolisme (IMC/TDEE), prêt immobilier, cuisine, ou habillement.",
    howStep2Title: "2. Saisie sémantique libre",
    howStep2Desc: "Ajustez les curseurs interactifs. L'estimation s'actualise immédiatement d'un geste tactile vivant.",
    howStep3Title: "3. Traitement local immédiat",
    howStep3Desc: "Le système compile instantanément le résultat. Vos calculs restent conservés localement en cache permanent.",

    // Section 4: Témoignages
    testTitle: "Utilisateurs d'élite & Retours d'expérience",
    test1Text: "« smartcalcul a optimisé l'analyse de forme de nos athlètes. Les outils d'évaluation physique et les parités de prêt stockées localement sont fiables à 100%. »",
    test1User: "Marc L., Préparateur Physique & Coach d'Élite",
    test2Text: "« Déterminer instantanément la dépense calorique de mes clients et simuler mes devis d'emprunts d'atelier pour notre boulangerie locale au même endroit est parfait. »",
    test2User: "Hélène D., Gérante de Commerce & Nutritionniste",
    test3Text: "« Nos équipes utilisent les consoles de proportion de smartcalcul pour concevoir des vêtements et gérer les budgets d'investissement localement. Un gain de temps inestimable. »",
    test3User: "Carlos R., Directeur de Franchise de Mode",

    // Social Proof Band
    socialProofLabel: "Utilisé quotidiennement par plus d'1 million de personnes à travers le monde.",

    // FAQ détaillée
    faqTitle: "Foire aux questions scientifiques",
    faq1Q: "Comment l'application assure-t-elle un fonctionnement hors-ligne permanent ?",
    faq1A: "L'ensemble du code de conversion et les constantes physiques sont chargés lors de votre première visite. En cas d'isolement réseau, smartcalcul s'exécute localement à 100%, préservant tous les outils.",
    faq2Q: "Qu'est-ce que l'ajustement double précision de l'IEEE 754 ?",
    faq2A: "En programmation classique, les additions de fractions décimales peuvent générer des résidus (par exemple, 0.1 + 0.2 produit parfois 0.30000000000000004). Notre framework applique une correction de précision pour annuler ces erreurs binaires.",
    faq3Q: "Comment configure-t-on le catalogue d'OpenFoodFacts culinaire ?",
    faq3A: "En saisissant un ingrédient, l'outil interroge l'API ouverte en direct pour récupérer sa densité de matière (g/ml). Si vous êtes déconnecté, une table d'ingrédients de secours est appliquée pour éviter toute coupure.",
    faq4Q: "Puis-je modifier et ajouter définitivement des parités à la volée ?",
    faq4A: "Oui. Chaque console de calcul met en avant un bouton '+ Ajouter' permettant de spécifier des coefficients surclassés. Ces facteurs personnalisés sont inscrits dans le LocalStorage de votre terminal.",
    faq5Q: "Quelles sont les clauses de confidentialité relatives à mes requêtes ?",
    faq5A: "Notre architecture web s'affranchit de tout cookie commercial ou traceur publicitaire. Vos budgets de prêts, indices de santé et recettes secrètes transitent exclusivement en local dans votre navigateur.",

    // In-page Meta descriptions to boost on-page SEO context
    metaCurrency: "Interface biologique et métabolique de haute précision. Calculateur IMC & TDEE (Dépense énergétique totale) 100% local.",
    metaKitchen: "Module culinaire d'extrapolations de masses et d'ingrédients. Connexion OpenFoodFacts et table de densité.",
    metaSize: "Outil de correspondance anthropométrique vestimentaire. Prise en charge des grilles territoriales et règles personnalisables.",
    metaDistance: "Console métrologique universelle. Standardisation physique depuis le micromètre jusqu'aux lieues transatlantiques.",
    metaPercent: "Équations analytiques de proportions. Diagnostic de gains nets, oscillation de rentabilité et marges d'entreprises.",

    // Sitemap Footer & compliance columns
    footerDesc: "La plateforme d'indexation locale-first et de calcul de haute précision de référence s'imposant comme le standard pour les particuliers, les athlètes et les professionnels indépendants.",
    footerColTools: "CONSOLES DE CALCUL",
    footerColSitemap: "ARCHITECTURE SAAS",
    footerColCompliance: "CONFORMITÉ TECHNIQUE",
    footerColChannels: "RÉSEAUX & CHANNELS",
    sitemapHome: "Tableau d'Accueil",
    sitemapAbout: "Fiche d'Évaluation",
    sitemapContact: "Une idée d'outil ?",
    complianceDoc: "Double-précision IEEE 754",
    complianceBipm: "Constantes Bureau International",
    compliancePrivacy: "Sandbox Isolée Local-First",
    complianceLic: "Apache 2.0 Licence",
    footerCopyright: "smartcalcul. Tous droits réservés. Standard de calcul certifié."
  },
  en: {
    slogan: "ESTIMATIONS • LOCAL-FIRST • HIGH-SECURITY",
    ctaLaunch: "Enter the Computation Workshop",
    badgeLabel: "CERTIFICATE OF CONFORMANCE",
    heroHeading: "The Elite Reference Computation Hub",
    heroSub: "The premier local-first SaaS platform designed to compute physical metabolism, loan monthly payments, culinary weights, and proportion algebra without server reliance.",
    
    // Section 1: Solution de métrologie universelle
    solTitle: "Universal Computation Suite",
    solHeader: "A calculation standard liberated from distant hosting servers",
    solDesc: "smartcalcul resolves data mapping inconsistencies through a single static compute kernel. Your metabolic indexes, interest rates, and engineering variables remain privately isolated in your secure sandbox environment.",
    solPoint1: "Instant processing: no search criteria or physical metrics are ever uploaded to tracking companies.",
    solPoint2: "Advanced biological equations calibrated against historical Mifflin-St Jeor coefficients.",
    solPoint3: "Mortgage amortization costs and capital payments calculated with zero drift.",

    // Section 2: Précision de calcul certifiée IEEE 754
    precTitle: "IEEE 754 Certified Calculations",
    precHeader: "The science of mathematical correct decimal limits",
    precDesc: "Our mathematical float algorithms bypass standard binary approximation limitations. Every calculated output undergoes strict double-precision validation to fully secure critical metrics and decimal values.",
    precPoint1: "Constant values aligned directly with scientific health and physical bureaus.",
    precPoint2: "Systemic arithmetic overrides completely resolving binary representation flaws.",
    precPoint3: "Absolute standby: works flawlessly in isolated offline spaces without lag.",

    // Section 3: Comment ça marche
    howTitle: "How smartcalcul Operates",
    howStep1Title: "1. Select Computation Module",
    howStep1Desc: "Navigate our directory of specialized widgets: physical metabolism (BMI/TDEE), loan calculator, cooking ratios, or clothing sizes.",
    howStep2Title: "2. Drag the Sliders",
    howStep2Desc: "Interact dynamically with the tactile age, weight, and principal amount sliders to trigger instant local calculations.",
    howStep3Title: "3. Local Computation Completed",
    howStep3Desc: "The local system resolves exact math ratios immediately. Pin customized parameters to your browser's persistent cache forever.",

    // Section 4: Témoignages
    testTitle: "SaaS Professional Case Studies",
    test1Text: "“smartcalcul revolutionized how we track fitness parameters. Local mathematical backups and interest calculators are incredibly reliable.”",
    test1User: "Marc L., Professional Fitness & Athletic Coach",
    test2Text: "“Calculating metabolic data for client diets and estimating bakery loans under the same hood is simply perfect.”",
    test2User: "Hélène D., Business Owner & Nutrition Advisor",
    test3Text: "“Our team values the local sandbox nature of smartcalcul to compute garment proportions and manage investments privately.”",
    test3User: "Carlos R., Apparel Sizing & Logistics Lead",

    // Social Proof Band
    socialProofLabel: "Trusted daily by more than 1,000,000 professionals across the globe.",

    // FAQ détaillée
    faqTitle: "Frequently Asked Scientific Questions",
    faq1Q: "How does the platform guarantee seamless offline usage?",
    faq1A: "All conversion ratios and fundamental math standards are pre-loaded in your browser. In the event of a network outage, smartcalcul operates at 100% locally to prevent interruption.",
    faq2Q: "What does digital IEEE 754 double-precision correction do?",
    faq2A: "Traditional computer code introduces rounding errors (for instance, 0.1 + 0.2 rendering 0.30000000000000004). smartcalcul incorporates mathematical filters that force calculations to remain in correct precision boundaries.",
    faq3Q: "How does the OpenFoodFacts culinary density query function?",
    faq3A: "When typing an ingredient name, smartcalcul searches open-source database nodes to fetch true bulk density values (g/ml). If you are disconnected, local fallback constants seamlessly step in without interruption.",
    faq4Q: "Can I persist custom coefficients or variables permanently?",
    faq4A: "Yes. Every tool features a '+ Add Custom' trigger allowing you to expand the calculation baseline. Custom parameters are registered locally, remaining inside your machine's private sandbox.",
    faq5Q: "What data security policies apply to my calculations?",
    faq5A: "Our core privacy standard bans third-party telemetry tracker scripts and promotional tracking cookies. All medical, loan, and financial calculations stay local.",

    // SEO Meta descriptions
    metaCurrency: "Professional SaaS metabolic workspace. Real-time BMI and energy expenditure (TDEE) offline calculator.",
    metaKitchen: "Volumetric weights and cooking conversion analyzer. Connected with OpenFoodFacts API catalog. Precise food parameters.",
    metaSize: "Sartorial attire and anthropometric mapping platform. Supports international systems and user-defined conversion rules.",
    metaDistance: "Universal metrological span database. Exact calibration ranging from electronic parameters up to transoceanic navigation miles.",
    metaPercent: "Analytical percentages workspace. Calculate margin returns, percentage growth, and oscillation steps with zero math drift.",

    // Sitemap Footer
    footerDesc: "The premier local-first calculation and conversion SaaS hub delivering uncompromised privacy and calculation rigor to individuals, athletes, and financial professionals.",
    footerColTools: "COMPUTATION CONSOLES",
    footerColSitemap: "SAAS DIRECTORY",
    footerColCompliance: "STANDARDS COMPLIANCE",
    footerColChannels: "RESEAUX & CHANNELS",
    sitemapHome: "Central Workspace",
    sitemapAbout: "Technical Sovereignty",
    sitemapContact: "Got a tool idea?",
    complianceDoc: "IEEE 754 Math Precision",
    complianceBipm: "BIPM / SI Standard Multipliers",
    compliancePrivacy: "Sandbox Isolation Core",
    complianceLic: "Apache 2.0 Licensure",
    footerCopyright: "smartcalcul. All rights reserved. Certified Standard Platform."
  },
  es: {
    slogan: "ESTIMACIONES • LOCAL-FIRST • ALTA SEGURIDAD",
    ctaLaunch: "Entrar al Taller de Cálculo",
    badgeLabel: "CERTIFICADO DE CONFORMIDAD",
    heroHeading: "La Plataforma de Cálculo de Referencia",
    heroSub: "El primer portal SaaS local-first comprometido con el cálculo metabólico corporal, simulación de préstamos amortizables, equivalencias de cocina y proporciones matemáticas.",
    
    // Section 1: Solution de métrologie universelle
    solTitle: "Suite de Cálculo Universal",
    solHeader: "Un estándar de cálculo liberado de servidores de hosting distantes",
    solDesc: "smartcalcul unifica las incoherencias del mapeado de equivalencias mediante un único núcleo dinámico de cálculo estático. Sus datos metabólicos, préstamos u operaciones se procesan con privacidad absoluta.",
    solPoint1: "Cálculo aislado: no se registra información en bases externas corporativas.",
    solPoint2: "Fórmulas biometabólicas basadas en los coeficientes Mifflin-St Jeor.",
    solPoint3: "Valores mensuales de hipoteca amortizable calculados al instante.",

    // Section 2: Précision de calcul certifiée IEEE 754
    precTitle: "Precisión Certificada IEEE 754",
    precHeader: "La ciencia detrás del control decimal riguroso",
    precDesc: "Nuestros algoritmos matemáticos corrigen las desviaciones decimales flotantes tradicionales de los equipos. Cada operación resultante es auditada con filtro de doble precisión para eliminar errores binarios residuales.",
    precPoint1: "Multiplicadores calculados de acuerdo a las directrices de salud y física.",
    precPoint2: "Filtros de variables para erradicar distorsiones en decimales acumulativos.",
    precPoint3: "Autonomía de respaldo total: funciona sin internet en cualquier momento.",

    // Section 3: Comment ça marche
    howTitle: "Cómo Funciona la Consola",
    howStep1Title: "1. Seleccione Consola",
    howStep1Desc: "Navegue por el catálogo de operadores: rendimiento corporal (IMC/TDEE), préstamo e hipoteca, cocina o tallas.",
    howStep2Title: "2. Mueva los Controles",
    howStep2Desc: "Ajuste dinámicamente los controles de edad, peso y monto mediante deslizadores táctiles integrados.",
    howStep3Title: "3. Obtenga el Resultado",
    howStep3Desc: "El software compila la conversión exacta. Configure parámetros a medida y guárdelos perpetuamente.",

    // Section 4: Témoignages
    testTitle: "Casos de Éxito de Clientes SaaS",
    test1Text: "« smartcalcul facilitó el monitoreo calórico de nuestros deportistas. Es extremadamente preciso y seguro para resguardar los datos biométricos. »",
    test1User: "Marc L., Entrenador y Preparador Físico",
    test2Text: "« Conocer de forma instantánea el TDEE de mis clientes y proyectar préstamos amortizables para mi negocio en la misma herramienta es maravilloso. »",
    test2User: "Hélène D., Propietaria y Asesora Nutricional",
    test3Text: "« smartcalcul es ideal por su enfoque local-first para calcular proporciones textiles y simular presupuestos financieros corporativos de forma confidencial. »",
    test3User: "Carlos R., Diseñador y Especialista en Gestión Local",

    // Social Proof Band
    socialProofLabel: "Utilizado de forma habitual por más de 1,000,000 de profesionales en el mundo.",

    // FAQ détaillée
    faqTitle: "Preguntas Científicas Frecuentes",
    faq1Q: "¿De qué manera opera la plataforma estando desconectado?",
    faq1A: "Todos los coeficientes base se cargan en la caché del navegador. smartcalcul sigue computando con total autonomía offline.",
    faq2Q: "¿A qué se refiere la norma de doble precisión IEEE 754?",
    faq2A: "Tradicionalmente, la aritmética binaria genera pequeñas mermas (por ejemplo, sumando 0.1 y 0.2 a veces produce 0.30000000000000004). smartcalcul emplea un método de compensación que fuerza la rigurosidad matemática.",
    faq3Q: "¿Cómo funciona la densidad en tiempo real con OpenFoodFacts?",
    faq3A: "Al ingresar un ingrediente culinario, la consola busca bases libres de comida para estimar su relación g/ml. En caso de no tener señal, se aplican constantes locales pre-cargadas.",
    faq4Q: "¿Es posible conservar factores de conversión personalizados?",
    faq4A: "Sí. Cada consola cuenta con el control sémantico '+ Añadir' para registrar multiplicadores. La información se almacena localmente en su máquina.",
    faq5Q: "¿Qué políticas amparan la privacidad y confidencialidad corporativa?",
    faq5A: "No implementamos trackers, cookies publicitarias o requerimientos de inicio de sesión. Sus datos de salud y préstamos se mantienen en el navegador.",

    // SEO Meta descriptions
    metaCurrency: "Espacio de simulación metabólica. Cálculo offline inmediato de IMC y consumo energético diario (TDEE).",
    metaKitchen: "Analizador de densidad y equivalencias de volumen culinarias. Conectado con OpenFoodFacts. Multiplicadores certificados.",
    metaSize: "Plataforma de mapeo antropométrico para indumentaria y zapatos. Soportes de tablas mundiales y definición de constantes.",
    metaDistance: "Controles de distancias físicas y escalas. Conversión rigurosa aplicable desde microcomponentes hasta millas transatlánticas.",
    metaPercent: "Ecuaciones y coeficientes de porcentajes analíticos. Margen de rentabilidad y evolución relativa sin errores de aproximación.",

    // Sitemap Footer
    footerDesc: "El centro de cálculo SaaS local-first premium que ofrece garantías de privacidad absoluta y precisión para deportistas, particulares y profesionales independientes.",
    footerColTools: "CONSOLES DE CÁLCULO",
    footerColSitemap: "ESTRUCTURA DE PORTAL",
    footerColCompliance: "NORMAS TÉCNICAS Y CONTROL",
    footerColChannels: "CONTACTO Y ENLACES",
    sitemapHome: "Inicio Central",
    sitemapAbout: "Soberanía Técnica",
    sitemapContact: "¿Una idea de herramienta?",
    complianceDoc: "Doble Precisión IEEE 754",
    complianceBipm: "Constantes de Referencia",
    compliancePrivacy: "Sandbox Local-First Hermético",
    complianceLic: "Apache 2.0 Licencia de Software",
    footerCopyright: "smartcalcul. Todos los derechos reservados. Estándar de cálculo certificado."
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("smartcalcul_preferred_lang");
      if (stored === "en" || stored === "fr" || stored === "es") return stored as Language;
      const navLang = navigator.language.slice(0, 2);
      if (navLang === "en" || navLang === "es") return navLang as Language;
    } catch {}
    return "fr";
  });

  const [currentPage, setCurrentPage] = useState<Page>("home");

  // FAQ Expandable State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Tool idea suggestion form state
  const [toolIdeaName, setToolIdeaName] = useState("");
  const [toolIdeaEmail, setToolIdeaEmail] = useState("");
  const [toolIdeaDesc, setToolIdeaDesc] = useState("");
  const [toolIdeaSuccess, setToolIdeaSuccess] = useState(false);
  const [toolIdeaSubmitting, setToolIdeaSubmitting] = useState(false);
  const [toolIdeaError, setToolIdeaError] = useState("");

  // Sync lang changes to LocalStorage
  useEffect(() => {
    localStorage.setItem("smartcalcul_preferred_lang", lang);
  }, [lang]);

  const handleToolIdeaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolIdeaName || !toolIdeaDesc) return;
    
    setToolIdeaSubmitting(true);
    setToolIdeaError("");
    
    try {
      const response = await fetch("https://formspree.io/f/mwvjvyrw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: toolIdeaEmail,
          toolName: toolIdeaName,
          description: toolIdeaDesc
        })
      });
      
      if (response.ok) {
        setToolIdeaSuccess(true);
        setToolIdeaName("");
        setToolIdeaEmail("");
        setToolIdeaDesc("");
      } else {
        setToolIdeaError(
          lang === "fr" 
            ? "Une erreur est survenue lors de l'envoi." 
            : lang === "es" 
            ? "Ocurrió un error al enviar." 
            : "An error occurred during submission."
        );
      }
    } catch {
      setToolIdeaError(
        lang === "fr" 
          ? "Erreur de connexion. Veuillez réessayer." 
          : lang === "es" 
          ? "Error de conexión. Inténtelo de nuevo." 
          : "Network error. Please try again."
      );
    } finally {
      setToolIdeaSubmitting(false);
    }
  };

  const handleAddNewHistoryEmpty = () => {};

  const dictionary = TRANSLATIONS[lang];
  const saasDict = SAAS_DICTIONARY[lang];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A0A0A] font-sans flex flex-col selection:bg-[#FF3B30] selection:text-white antialiased" id="smartcalcul-master-container">
      
      {/* 1. BRAND GLOBAL NAV HEADER (Elegant Pure White backdrop, fine high-contrast outline, premium branding padding) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          
          {/* Hexagonal Signal Red Geometric Logo - Clean SVG and matching typo, never black text. */}
          <button
            type="button"
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-3 hover:opacity-95 transition-all text-left group cursor-pointer active:scale-95 duration-150"
          >
            <svg viewBox="0 0 100 100" className="w-9 h-9 shrink-0 transition-transform group-hover:scale-105 duration-200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Premium rounded dark satin squircle backdrop */}
              <rect x="4" y="4" width="92" height="92" rx="24" fill="url(#appIconGradient)" stroke="#2C2C2E" strokeWidth="1.5" />
              
              {/* Geometric modern 4-quadrant layout representing calculation */}
              <rect x="24" y="24" width="22" height="22" rx="6" stroke="#FFFFFF" strokeWidth="5.5" fill="none" />
              <rect x="54" y="24" width="22" height="22" rx="6" stroke="#FF3B30" strokeWidth="5.5" fill="none" />
              <rect x="24" y="54" width="22" height="22" rx="6" stroke="#FFFFFF" strokeWidth="5.5" fill="none" />
              
              {/* Vibrant intersecting mathematical paths inside the bottom-right slot */}
              <path d="M 59 65 L 71 65 M 65 59 L 65 71" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />

              <defs>
                <linearGradient id="appIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1C1C1E" />
                  <stop offset="100%" stopColor="#020202" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <span className="text-2xl font-black text-[#0A0A0A] tracking-tighter leading-none block uppercase">
                SMART<span className="text-[#FF3B30]">CALCUL</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#FF3B30] block">
                {saasDict.slogan}
              </span>
            </div>
          </button>

          {/* Desktop Central Quick Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => {
                setCurrentPage("home");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all active:scale-95 duration-150 cursor-pointer ${
                currentPage !== "about" && currentPage !== "contact"
                  ? "bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20"
                  : "text-[#0A0A0A] hover:text-[#FF3B30] hover:bg-gray-50"
              }`}
            >
              {dictionary.menuTools}
            </button>
            <button
              onClick={() => {
                setCurrentPage("about");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all active:scale-95 duration-150 cursor-pointer ${
                currentPage === "about"
                  ? "bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20"
                  : "text-[#0A0A0A] hover:text-[#FF3B30] hover:bg-gray-50"
              }`}
            >
              {saasDict.sitemapAbout}
            </button>
            <button
              onClick={() => {
                setCurrentPage("contact");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all active:scale-95 duration-150 cursor-pointer ${
                currentPage === "contact"
                  ? "bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20"
                  : "text-[#0A0A0A] hover:text-[#FF3B30] hover:bg-gray-50"
              }`}
            >
              {saasDict.sitemapContact}
            </button>
          </nav>

          {/* Flags Language bar selection menu */}
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-200 p-0.5 rounded-md bg-white">
              <button
                type="button"
                onClick={() => setLang("fr")}
                className={`px-2 py-1 text-[10px] font-black rounded-sm uppercase tracking-wider transition-all cursor-pointer active:scale-90 duration-100 ${
                  lang === "fr" ? "bg-[#FF3B30] text-white" : "text-[#0A0A0A] hover:bg-gray-50"
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-[10px] font-black rounded-sm uppercase tracking-wider transition-all cursor-pointer active:scale-90 duration-100 ${
                  lang === "en" ? "bg-[#FF3B30] text-white" : "text-[#0A0A0A] hover:bg-gray-50"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("es")}
                className={`px-2 py-1 text-[10px] font-black rounded-sm uppercase tracking-wider transition-all cursor-pointer active:scale-90 duration-100 ${
                  lang === "es" ? "bg-[#FF3B30] text-white" : "text-[#0A0A0A] hover:bg-gray-50"
                }`}
              >
                ES
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* 2. DYNAMIC BRAND HERO PORTAL (Clean minimalist presentation with generous negative space) */}
      {currentPage === "home" && (
        <section className="bg-white text-black py-16 md:py-24 border-b border-gray-100 overflow-hidden relative">
          {/* Subtle geometric background grid node */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#FF3B30_1px,transparent_1.5px)] [background-size:16px_16px]"></div>
          
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#FF3B30]/30 bg-[#FF3B30]/5 text-[#FF3B30] rounded-full text-[10px] uppercase tracking-widest font-black">
              <Award className="w-3.5 h-3.5 text-[#FF3B30]" />
              <span>{saasDict.badgeLabel}</span>
            </div>
            
            <h1 className="text-4xl sm:text-7xl font-black text-[#0A0A0A] tracking-tighter leading-none uppercase">
              {saasDict.heroHeading}
            </h1>
            
            <p className="text-gray-500 text-sm sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
              {saasDict.heroSub}
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  const target = document.getElementById("operation-panels-deck");
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 h-12 bg-[#FF3B30] hover:bg-[#E02D22] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center gap-2 mx-auto cursor-pointer"
              >
                <span>{saasDict.ctaLaunch}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3. CORE ACTIVE WORKSPACE DECK */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full space-y-20">
        
        {/* HOMEPAGE CONSOLES GRID (Pristine reference SaaS floating card design) */}
        {currentPage === "home" && (
          <section className="space-y-8" id="operation-panels-deck">
            <div className="flex flex-col gap-1.5 border-b border-gray-150 pb-4">
              <span className="text-[10px] tracking-widest font-black uppercase text-[#FF3B30] font-mono block">
                {lang === "fr" ? "CATALOGUE DES OUTILS PROFESSIONNELS" : lang === "es" ? "CATÁLOGO DE OPERADORES SAAS" : "METROLOGY CONSOLES CATALOG"}
              </span>
              <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight uppercase">
                {lang === 'fr' ? "Outils de conversion" : lang === "es" ? "Consolas de correspondencia" : "Conversion Workspace"}
              </h2>
            </div>

            {/* Consoles grid deck: highly styled floating cards, soft shadows */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Card 1: Performance & Metabolism */}
              <article>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("performance");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left bg-white border border-[#E6E6E6] hover:border-[#FF3B30] p-8 rounded-2xl transition-all duration-300 hover:scale-[1.03] group relative flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] cursor-pointer h-full min-h-[220px] active:scale-95"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-12 h-12 border border-[#FF3B30] text-[#FF3B30] bg-[#FF3B30]/5 rounded-xl flex items-center justify-center transition-colors">
                      <Activity className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#FF3B30] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-md font-bold text-[#0A0A0A] tracking-tight uppercase">
                      {lang === 'fr' ? "Performance & Métabolisme" : lang === 'es' ? "Rendimiento & Metabolismo" : "Performance & Metabolism"}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
                      {lang === 'fr' 
                        ? "Calculez votre IMC et votre dépense énergétique totale (TDEE) d'après les standards Mifflin-St Jeor." 
                        : lang === 'es' 
                        ? "Calcule su IMC y gasto energético (TDEE) diario basado en Mifflin-St Jeor." 
                        : "Calculate your BMI and Total Daily Energy Expenditure (TDEE) based on scientific standards."}
                    </p>
                  </div>
                </button>
              </article>

              {/* Card 1B: Loans & Decimals */}
              <article>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("loan");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left bg-white border border-[#E6E6E6] hover:border-[#FF3B30] p-8 rounded-2xl transition-all duration-300 hover:scale-[1.03] group relative flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] cursor-pointer h-full min-h-[220px] active:scale-95"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-12 h-12 border border-[#FF3B30] text-[#FF3B30] bg-[#FF3B30]/5 rounded-xl flex items-center justify-center transition-colors">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#FF3B30] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-md font-bold text-[#0A0A0A] tracking-tight uppercase">
                      {lang === 'fr' ? "Simulateur de Crédit" : lang === 'es' ? "Préstamos & Amortización" : "Loan & Credit Simulator"}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
                      {lang === 'fr' 
                        ? "Estimez vos mensualités de prêt immobilier ou d'amortissement de capital localement avec curseurs en direct." 
                        : lang === 'es' 
                        ? "Simule amortizaciones y cuotas mensuales de hipoteca localmente de forma interactiva." 
                        : "Simulate mortgage amortization schedules and monthly payments locally with dynamic sliders."}
                    </p>
                  </div>
                </button>
              </article>

              {/* Card 2: Kitchen */}
              <article>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("kitchen");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left bg-white border border-[#E6E6E6] hover:border-[#FF3B30] p-8 rounded-2xl transition-all duration-300 hover:scale-[1.03] group relative flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] cursor-pointer h-full min-h-[220px] active:scale-95"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-12 h-12 border border-[#FF3B30] text-[#FF3B30] bg-[#FF3B30]/5 rounded-xl flex items-center justify-center transition-colors">
                      <ChefHat className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#FF3B30] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-md font-bold text-[#0A0A0A] tracking-tight uppercase">
                      {lang === 'fr' ? "Ustensiles de cuisine" : lang === 'es' ? "Cocina & pesos" : "Culinary scales"}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
                      {dictionary.toolKitchenDesc}
                    </p>
                  </div>
                </button>
              </article>

              {/* Card 3: Size garments */}
              <article>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("size");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left bg-white border border-[#E6E6E6] hover:border-[#FF3B30] p-8 rounded-2xl transition-all duration-300 hover:scale-[1.03] group relative flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] cursor-pointer h-full min-h-[220px] active:scale-95"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-12 h-12 border border-[#FF3B30] text-[#FF3B30] bg-[#FF3B30]/5 rounded-xl flex items-center justify-center transition-colors">
                      <Shirt className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#FF3B30] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-md font-bold text-[#0A0A0A] tracking-tight uppercase">
                      {lang === 'fr' ? "Tailles de vêtements" : lang === 'es' ? "Tallas de ropa" : "Sizing & charts"}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
                      {dictionary.toolSizeDesc}
                    </p>
                  </div>
                </button>
              </article>

              {/* Card 4: Distance metric */}
              <article>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("distance");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left bg-white border border-[#E6E6E6] hover:border-[#FF3B30] p-8 rounded-2xl transition-all duration-300 hover:scale-[1.03] group relative flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] cursor-pointer h-full min-h-[220px] active:scale-95"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-12 h-12 border border-[#FF3B30] text-[#FF3B30] bg-[#FF3B30]/5 rounded-xl flex items-center justify-center transition-colors">
                      <Scale className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#FF3B30] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-md font-bold text-[#0A0A0A] tracking-tight uppercase">
                      {lang === 'fr' ? "Distances physiques" : lang === 'es' ? "Longitud física" : "Physical distance"}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
                      {dictionary.toolDistanceDesc}
                    </p>
                  </div>
                </button>
              </article>

              {/* Card 5: Percent proportional ratios */}
              <article>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("percent");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left bg-white border border-[#E6E6E6] hover:border-[#FF3B30] p-8 rounded-2xl transition-all duration-300 hover:scale-[1.03] group relative flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] cursor-pointer h-full min-h-[220px] active:scale-95"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-12 h-12 border border-[#FF3B30] text-[#FF3B30] bg-[#FF3B30]/5 rounded-xl flex items-center justify-center transition-colors">
                      <Percent className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#FF3B30] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-md font-bold text-[#0A0A0A] tracking-tight uppercase">
                      {lang === 'fr' ? "Analyse pourcentages" : lang === 'es' ? "Porcentajes relativos" : "Percentages"}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
                      {dictionary.toolPercentDesc}
                    </p>
                  </div>
                </button>
              </article>

              {/* Card 6: Dynamic documentation about node */}
              <article>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage("about");
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left bg-white border border-[#E6E6E6] hover:border-[#FF3B30] p-8 rounded-2xl transition-all duration-300 hover:scale-[1.03] group relative flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] cursor-pointer h-full min-h-[220px] active:scale-95"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-12 h-12 border border-[#FF3B30] text-[#FF3B30] bg-[#FF3B30]/5 rounded-xl flex items-center justify-center transition-colors">
                      <Shield className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#FF3B30] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-md font-bold text-[#0A0A0A] tracking-tight uppercase">
                      {lang === 'fr' ? "Fiche produit & Savoir" : "Product details"}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
                      {lang === 'fr' 
                        ? "Découvrez l'idéologie d'indépendance cloud de smartcalcul." 
                        : "Uncompromised security guidelines and math principles."}
                    </p>
                  </div>
                </button>
              </article>

            </div>
          </section>
        )}

        {/* DETAILED ACTIVE ENGINE CONTENT (When inside an active tool screen) */}
        {currentPage !== "home" && currentPage !== "about" && currentPage !== "contact" && (
          <div className="space-y-6">
            
            {/* Nav ribbon back link & Unique in-app tool SEO meta block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150 pb-4">
              <button
                type="button"
                onClick={() => setCurrentPage("home")}
                className="inline-flex items-center gap-2 text-xs text-black font-black uppercase tracking-widest hover:text-[#FF3B30] transition-colors cursor-pointer active:scale-95 duration-150"
              >
                <span>&larr; {saasDict.sitemapHome}</span>
              </button>

              {/* Central quick mini switch bar */}
              <div className="flex items-center gap-1 border border-gray-200 p-1 bg-white rounded-lg shadow-xs">
                <button
                  type="button"
                  onClick={() => setCurrentPage("performance")}
                  className={`p-2 rounded-md transition-all cursor-pointer active:scale-90 ${currentPage === "performance" ? "bg-[#FF3B30] text-white" : "text-black hover:bg-gray-50"}`}
                  title={lang === "fr" ? "Performance & Métabolisme" : lang === "es" ? "Rendimiento y Metabolismo" : "Performance & Metabolism"}
                >
                  <Activity className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage("loan")}
                  className={`p-2 rounded-md transition-all cursor-pointer active:scale-90 ${currentPage === "loan" ? "bg-[#FF3B30] text-white" : "text-black hover:bg-gray-50"}`}
                  title={lang === "fr" ? "Crédits & Mensualités" : lang === "es" ? "Préstamos y Finanzas" : "Loan Calculator"}
                >
                  <Calculator className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage("kitchen")}
                  className={`p-2 rounded-md transition-all cursor-pointer active:scale-90 ${currentPage === "kitchen" ? "bg-[#FF3B30] text-white" : "text-black hover:bg-gray-50"}`}
                  title={dictionary.toolKitchenTitle}
                >
                  <ChefHat className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage("size")}
                  className={`p-2 rounded-md transition-all cursor-pointer active:scale-90 ${currentPage === "size" ? "bg-[#FF3B30] text-white" : "text-[#0A0A0A] hover:bg-gray-50"}`}
                  title={dictionary.toolSizeTitle}
                >
                  <Shirt className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage("distance")}
                  className={`p-2 rounded-md transition-all cursor-pointer active:scale-90 ${currentPage === "distance" ? "bg-[#FF3B30] text-white" : "text-[#0A0A0A] hover:bg-gray-50"}`}
                  title={dictionary.toolDistanceTitle}
                >
                  <Scale className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage("percent")}
                  className={`p-2 rounded-md transition-all cursor-pointer active:scale-90 ${currentPage === "percent" ? "bg-[#FF3B30] text-white" : "text-[#0A0A0A] hover:bg-gray-50"}`}
                  title={dictionary.toolPercentTitle}
                >
                  <Percent className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* HIGH CONTEXT SEO META DESCRIPTIONS BOX (Vividly displays specific validation data for each tool) */}
            <div className="bg-white border border-[#E6E6E6] rounded-xl p-4 flex items-start gap-3.5 shadow-xs">
              <div className="p-2 bg-[#FF3B30]/5 text-[#FF3B30] rounded-lg shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-[#FF3B30] tracking-wider block">
                  METROLOGY COMPLIANCE METRIC ID
                </span>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  {currentPage === "performance" && (lang === "fr" ? "Calculateur de métabolisme basal Mifflin-St Jeor et d'Indice de Masse Corporelle de haute précision." : lang === "es" ? "Calculadora de metabolismo basal Mifflin-St Jeor e Índice de Masa Corporal de alta precisión." : "High-precision Mifflin-St Jeor basal metabolic rate and Body Mass Index calculator.")}
                  {currentPage === "loan" && (lang === "fr" ? "Simulateur d'amortissement de prêt immobilier, calcul des mensualités réelles et intérêts." : lang === "es" ? "Simulador de amortización de préstamos, cuotas mensuales e interés real." : "Local mortgage amortization schedule, interest rates, and actual monthly payment estimator.")}
                  {currentPage === "kitchen" && saasDict.metaKitchen}
                  {currentPage === "size" && saasDict.metaSize}
                  {currentPage === "distance" && saasDict.metaDistance}
                  {currentPage === "percent" && saasDict.metaPercent}
                </p>
              </div>
            </div>

            {/* Render selected controller screen details */}
            <div key={lang} className="transition-all duration-300 animate-in fade-in-50 duration-200">
              {currentPage === "performance" && (
                <PerformanceConverter lang={lang} />
              )}
              {currentPage === "loan" && (
                <LoanConverter lang={lang} />
              )}
              {currentPage === "kitchen" && (
                <KitchenConverter lang={lang} onAddHistory={handleAddNewHistoryEmpty} />
              )}
              {currentPage === "size" && (
                <SizingConverter lang={lang} onAddHistory={handleAddNewHistoryEmpty} />
              )}
              {currentPage === "distance" && (
                <DistanceConverter lang={lang} onAddHistory={handleAddNewHistoryEmpty} />
              )}
              {currentPage === "percent" && (
                <PercentConverter lang={lang} onAddHistory={handleAddNewHistoryEmpty} />
              )}
            </div>

          </div>
        )}

        {/* 4. EXTENDED BRAND SOLUTIONS SECTIONS FOR SEO & VALUE PROP LENGTH */}
        {currentPage === "home" && (
          <div className="space-y-20 border-t border-gray-250 pt-20">
            
            {/* Precise Dual Column SaaS Features Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Feature 1: Universal Metrology */}
              <section className="bg-white border border-gray-200 p-8 rounded-2xl shadow-xs transition-colors hover:border-[#FF3B30] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF3B30]/10 flex items-center justify-center text-[#FF3B30]">
                  <CheckCircle className="w-5 h-5 animate-pulse" />
                </div>
                <h3 className="text-xl font-black text-[#0A0A0A] tracking-tight uppercase">
                  {saasDict.solTitle}
                </h3>
                <span className="text-xs text-gray-400 font-bold uppercase block">
                  {saasDict.solHeader}
                </span>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  {saasDict.solDesc}
                </p>
                <ul className="space-y-2 border-t border-gray-100 pt-4 text-xs font-semibold text-[#0A0A0A]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF3B30]" />
                    <span>{saasDict.solPoint1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF3B30]" />
                    <span>{saasDict.solPoint2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF3B30]" />
                    <span>{saasDict.solPoint3}</span>
                  </li>
                </ul>
              </section>

              {/* Feature 2: IEEE 754 precision */}
              <section className="bg-white border border-gray-200 p-8 rounded-2xl shadow-xs transition-colors hover:border-[#FF3B30] space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF3B30]/10 flex items-center justify-center text-[#FF3B30]">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-[#0A0A0A] tracking-tight uppercase">
                  {saasDict.precTitle}
                </h3>
                <span className="text-xs text-gray-400 font-bold uppercase block">
                  {saasDict.precHeader}
                </span>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  {saasDict.precDesc}
                </p>
                <ul className="space-y-2 border-t border-gray-100 pt-4 text-xs font-semibold text-[#0A0A0A]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF3B30]" />
                    <span>{saasDict.precPoint1}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF3B30]" />
                    <span>{saasDict.precPoint2}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#FF3B30]" />
                    <span>{saasDict.precPoint3}</span>
                  </li>
                </ul>
              </section>

            </div>

            {/* How It works logical flow */}
            <section className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF3B30] font-mono block">
                  METROLOGY LOGICAL SEQUENCE
                </span>
                <h3 className="text-2xl font-black text-[#0A0A0A] tracking-tight uppercase">
                  {saasDict.howTitle}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                
                <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
                  <span className="text-xs font-black text-[#FF3B30] uppercase block">
                    STEP 01
                  </span>
                  <h4 className="font-bold text-[#0A0A0A] uppercase tracking-wide">
                    {saasDict.howStep1Title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {saasDict.howStep1Desc}
                  </p>
                </div>

                <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
                  <span className="text-xs font-black text-[#FF3B30] uppercase block">
                    STEP 02
                  </span>
                  <h4 className="font-bold text-[#0A0A0A] uppercase tracking-wide">
                    {saasDict.howStep2Title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {saasDict.howStep2Desc}
                  </p>
                </div>

                <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
                  <span className="text-xs font-black text-[#FF3B30] uppercase block">
                    STEP 03
                  </span>
                  <h4 className="font-bold text-[#0A0A0A] uppercase tracking-wide">
                    {saasDict.howStep3Title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {saasDict.howStep3Desc}
                  </p>
                </div>

              </div>
            </section>

            {/* Highly converting Testimonials */}
            <section className="space-y-8">
              <div className="flex flex-col gap-1 border-b border-gray-200 pb-4">
                <span className="text-[10px] tracking-widest font-black uppercase text-[#FF3B30] font-mono block">
                  GLOBAL VERIFICATION EVIDENCE
                </span>
                <h3 className="text-2xl font-black text-[#0A0A0A] tracking-tight uppercase">
                  {saasDict.testTitle}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <blockquote className="bg-white border border-[#E6E6E6] p-6 rounded-xl shadow-xs space-y-4 hover:border-[#FF3B30] transition-colors">
                  <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
                    {saasDict.test1Text}
                  </p>
                  <footer className="border-t border-gray-100 pt-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-[#FF3B30] border border-[#FF3B30]/30 shrink-0">
                      ML
                    </div>
                    <div>
                      <cite className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wide block not-italic">
                        {saasDict.test1User}
                      </cite>
                    </div>
                  </footer>
                </blockquote>

                <blockquote className="bg-white border border-[#E6E6E6] p-6 rounded-xl shadow-xs space-y-4 hover:border-[#FF3B30] transition-colors">
                  <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
                    {saasDict.test2Text}
                  </p>
                  <footer className="border-t border-gray-100 pt-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-[#FF3B30] border border-[#FF3B30]/30 shrink-0">
                      HD
                    </div>
                    <div>
                      <cite className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wide block not-italic">
                        {saasDict.test2User}
                      </cite>
                    </div>
                  </footer>
                </blockquote>

                <blockquote className="bg-white border border-[#E6E6E6] p-6 rounded-xl shadow-xs space-y-4 hover:border-[#FF3B30] transition-colors">
                  <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
                    {saasDict.test3Text}
                  </p>
                  <footer className="border-t border-gray-100 pt-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-[#FF3B30] border border-[#FF3B30]/30 shrink-0">
                      CR
                    </div>
                    <div>
                      <cite className="text-xs font-bold text-[#0A0A0A] uppercase tracking-wide block not-italic">
                        {saasDict.test3User}
                      </cite>
                    </div>
                  </footer>
                </blockquote>

              </div>
            </section>

            {/* HIGH-IMPACT SOCIAL PROOF BAND (Signal red detailed background with bold text) */}
            <section className="bg-gradient-to-r from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] border border-[#FF3B30] p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-48 h-full text-[#FF3B30]" fill="currentColor">
                  <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
                </svg>
              </div>
              <div className="space-y-1 relative z-10">
                <span className="text-[10px] font-black uppercase text-[#FF3B30] tracking-widest font-mono block">
                  NETWORK CAPABILITY TRAFFIC
                </span>
                <p className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  {saasDict.socialProofLabel}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2 relative z-10">
                <span className="inline-block w-2.5 h-2.5 bg-[#FF3B30] rounded-full animate-ping"></span>
                <span className="text-[10px] font-mono text-white tracking-widest uppercase font-bold">
                  BIPM SYNC [ACTIVE]
                </span>
              </div>
            </section>

            {/* FAQ Block (Interactive Expandable Accordions - Adds depth & professional layout length) */}
            <section className="bg-white border border-gray-200 p-8 sm:p-10 rounded-2xl space-y-6">
              <h3 className="text-2xl font-black text-[#0A0A0A] tracking-tight uppercase flex items-center gap-2 border-b border-gray-100 pb-4">
                <HelpCircle className="w-6 h-6 text-[#FF3B30]" />
                {saasDict.faqTitle}
              </h3>
              
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((index) => {
                  const qKey = `faq${index}Q` as keyof typeof saasDict;
                  const aKey = `faq${index}A` as keyof typeof saasDict;
                  const isOpen = openFaq === index;
                  
                  return (
                    <div 
                      key={index}
                      className="border-b border-gray-150 pb-4 last:border-0 last:pb-0"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left flex items-center justify-between text-xs font-bold text-[#0A0A0A] hover:text-[#FF3B30] uppercase tracking-wider py-2 transition-colors cursor-pointer"
                      >
                        <span>{saasDict[qKey] as string}</span>
                        <ChevronDown className={`w-4 h-4 text-[#FF3B30] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="mt-2 text-xs text-gray-500 font-medium leading-relaxed pl-2 border-l-2 border-[#FF3B30] animate-in fade-in duration-300">
                          {saasDict[aKey] as string}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick Minimalist suggestion form at the end of the home flow */}
            <section className="bg-white border border-gray-200 p-8 sm:p-10 rounded-2xl max-w-2xl mx-auto space-y-6 shadow-xs">
              <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-black tracking-tight">
                    {lang === "fr" ? "Une idée d'outil ?" : lang === "es" ? "¿Una idea de herramienta?" : "Got a tool idea?"}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {lang === "fr" 
                      ? "Partagez vos besoins avec nous pour étendre les capacités de smartcalcul." 
                      : lang === "es" 
                      ? "Comparta sus necesidades con nosotros para ampliar las funciones de smartcalcul." 
                      : "Share your needs with us to expand smartcalcul's capabilities."}
                  </p>
                </div>
                <div className="w-10 h-10 border border-gray-150 rounded-lg flex items-center justify-center text-black">
                  <Mail className="w-5 h-5" />
                </div>
              </div>

              {toolIdeaSuccess ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-10 h-10 border border-[#FF3B30] rounded-full flex items-center justify-center mx-auto text-[#FF3B30] bg-[#FF3B30]/5">
                    <Check className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-black">
                    {lang === "fr" ? "Merci pour votre idée !" : lang === "es" ? "¡Gracias por su idea!" : "Thank you for your idea!"}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleToolIdeaSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-black block">
                      {lang === "fr" ? "Nom de l'outil suggéré" : lang === "es" ? "Nombre de la herramienta propuesta" : "Proposed tool name"}
                    </label>
                    <input
                      type="text"
                      required
                      name="toolName"
                      value={toolIdeaName}
                      onChange={(e) => setToolIdeaName(e.target.value)}
                      placeholder={
                        lang === "fr" 
                          ? "ex: Convertisseur d'empreinte carbone..." 
                          : lang === "es" 
                          ? "ej: Conversor de huella de carbono..." 
                          : "e.g. Carbon footprint converter..."
                      }
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded text-xs text-black focus:outline-none focus:border-[#FF3B30]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-black block">
                      {lang === "fr" ? "Votre adresse courriel" : lang === "es" ? "Su correo electrónico" : "Your email address"}
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={toolIdeaEmail}
                      onChange={(e) => setToolIdeaEmail(e.target.value)}
                      placeholder={
                        lang === "fr" 
                          ? "ex: contact@votre-domaine.com" 
                          : lang === "es" 
                          ? "ej: contacto@su-dominio.com" 
                          : "e.g. contact@your-domain.com"
                      }
                      className="w-full h-10 px-3 bg-white border border-gray-200 rounded text-xs text-black focus:outline-none focus:border-[#FF3B30]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-black block">
                      {lang === "fr" ? "Description détaillée de votre idée" : lang === "es" ? "Descripción detallada de su idea" : "Detailed description of your idea"}
                    </label>
                    <textarea
                      required
                      name="description"
                      rows={4}
                      value={toolIdeaDesc}
                      onChange={(e) => setToolIdeaDesc(e.target.value)}
                      placeholder={
                        lang === "fr" 
                          ? "Décrivez l'outil, ses calculs, ses formules..." 
                          : lang === "es" 
                          ? "Describa la herramienta, sus cálculos, fórmulas..." 
                          : "Describe the tool, its calculations, formulas..."
                      }
                      className="w-full p-3 bg-white border border-gray-200 rounded text-xs text-black focus:outline-none focus:border-[#FF3B30] resize-none font-sans"
                    ></textarea>
                  </div>

                  {toolIdeaError && (
                    <p className="text-xs text-[#FF3B30] font-semibold">{toolIdeaError}</p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={toolIdeaSubmitting}
                      className="w-full h-11 bg-[#FF3B30] hover:bg-[#E02D22] disabled:bg-gray-300 text-xs font-black text-white uppercase tracking-wider rounded transition-colors active:scale-97 duration-100 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {toolIdeaSubmitting 
                          ? (lang === "fr" ? "Envoi..." : lang === "es" ? "Enviando..." : "Sending...") 
                          : (lang === "fr" ? "Envoyer l'idée" : lang === "es" ? "Enviar idea" : "Submit Idea")}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </section>

          </div>
        )}

        {/* 5. ABOUT PAGE (Souveraineté, Rigueur, Privauté) */}
        {currentPage === "about" && (
          <section className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 space-y-8 shadow-xs">
            <div className="flex items-center gap-4 border-b border-gray-150 pb-6">
              <div className="w-14 h-14 border border-[#FF3B30] text-[#FF3B30] bg-[#FF3B30]/5 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0A0A0A] tracking-tight uppercase leading-none">
                  {dictionary.aboutHeader}
                </h3>
                <span className="text-xs text-gray-400 block mt-1 font-bold uppercase tracking-wide">
                  {dictionary.aboutSub}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-500 leading-relaxed font-normal">
              <p>{dictionary.aboutP1}</p>
              <p>{dictionary.aboutP2}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
                <span className="text-xs font-black uppercase text-[#FF3B30] tracking-wider font-mono block">
                  {dictionary.confTitle}
                </span>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  {dictionary.confDesc}
                </p>
              </div>

              <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
                <span className="text-xs font-black uppercase text-[#FF3B30] tracking-wider font-mono block">
                  {dictionary.precTitle}
                </span>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  {dictionary.precDesc}
                </p>
              </div>

              <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
                <span className="text-xs font-black uppercase text-[#FF3B30] tracking-wider font-mono block">
                  {dictionary.speedTitle}
                </span>
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  {dictionary.speedDesc}
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setCurrentPage("home");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 h-11 bg-[#FF3B30] hover:bg-[#E02D22] text-xs font-bold text-white rounded-lg uppercase tracking-wider transition-colors active:scale-95 duration-150 cursor-pointer"
              >
                {saasDict.sitemapHome}
              </button>
            </div>
          </section>
        )}

        {/* 6. CONTACT PAGE / SUGGESTION FORM ("Une idée d'outil ?") */}
        {currentPage === "contact" && (
          <section className="bg-white border border-gray-150 rounded-xl p-6 sm:p-10 max-w-xl mx-auto my-8 space-y-6 shadow-xs animate-in fade-in duration-300">
            <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-black tracking-tight">
                  {lang === "fr" ? "Une idée d'outil ?" : lang === "es" ? "¿Una idea de herramienta?" : "Got a tool idea?"}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {lang === "fr" 
                    ? "Partagez vos besoins avec nous pour étendre les capacités de smartcalcul." 
                    : lang === "es" 
                    ? "Comparta sus necesidades con nosotros para ampliar las funciones de smartcalcul." 
                    : "Share your needs with us to expand smartcalcul's capabilities."}
                </p>
              </div>
              <div className="w-10 h-10 border border-gray-150 rounded-lg flex items-center justify-center text-black">
                <Mail className="w-5 h-5" />
              </div>
            </div>

            {toolIdeaSuccess ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-10 h-10 border border-[#FF3B30] rounded-full flex items-center justify-center mx-auto text-[#FF3B30] bg-[#FF3B30]/5">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-black">
                  {lang === "fr" ? "Merci pour votre idée !" : lang === "es" ? "¡Gracias por su idea!" : "Thank you for your idea!"}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setToolIdeaSuccess(false);
                      setCurrentPage("home");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-4 py-2 border border-gray-200 text-[10px] font-black uppercase tracking-wider text-black rounded hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {lang === "fr" ? "Retour à l'accueil" : lang === "es" ? "Volver al inicio" : "Back to home"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleToolIdeaSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black block">
                    {lang === "fr" ? "Nom de l'outil suggéré" : lang === "es" ? "Nombre de la herramienta propuesta" : "Proposed tool name"}
                  </label>
                  <input
                    type="text"
                    required
                    name="toolName"
                    value={toolIdeaName}
                    onChange={(e) => setToolIdeaName(e.target.value)}
                    placeholder={
                      lang === "fr" 
                        ? "ex: Convertisseur d'empreinte carbone..." 
                        : lang === "es" 
                        ? "ej: Conversor de huella de carbono..." 
                        : "e.g. Carbon footprint converter..."
                    }
                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded text-xs text-black focus:outline-none focus:border-[#FF3B30]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black block">
                    {lang === "fr" ? "Votre adresse courriel" : lang === "es" ? "Su correo electrónico" : "Your email address"}
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={toolIdeaEmail}
                    onChange={(e) => setToolIdeaEmail(e.target.value)}
                    placeholder={
                      lang === "fr" 
                        ? "ex: contact@votre-domaine.com" 
                        : lang === "es" 
                        ? "ej: contacto@su-dominio.com" 
                        : "e.g. contact@your-domain.com"
                    }
                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded text-xs text-black focus:outline-none focus:border-[#FF3B30]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black block">
                    {lang === "fr" ? "Description détaillée de votre idée" : lang === "es" ? "Descripción detallada de su idea" : "Detailed description of your idea"}
                  </label>
                  <textarea
                    required
                    name="description"
                    rows={4}
                    value={toolIdeaDesc}
                    onChange={(e) => setToolIdeaDesc(e.target.value)}
                    placeholder={
                      lang === "fr" 
                        ? "Décrivez l'outil, ses calculs, ses formules..." 
                        : lang === "es" 
                        ? "Describa la herramienta, sus cálculos, fórmulas..." 
                        : "Describe the tool, its calculations, formulas..."
                    }
                    className="w-full p-3 bg-white border border-gray-200 rounded text-xs text-black focus:outline-none focus:border-[#FF3B30] resize-none font-sans"
                  ></textarea>
                </div>

                {toolIdeaError && (
                  <p className="text-xs text-[#FF3B30] font-semibold">{toolIdeaError}</p>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={toolIdeaSubmitting}
                    className="px-5 h-10 bg-[#FF3B30] hover:bg-[#E02D22] disabled:bg-gray-300 text-[10px] font-black text-white uppercase tracking-wider rounded transition-colors active:scale-97 duration-100 flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>
                      {toolIdeaSubmitting 
                        ? (lang === "fr" ? "Envoi..." : lang === "es" ? "Enviando..." : "Sending...") 
                        : (lang === "fr" ? "Envoyer l'idée" : lang === "es" ? "Enviar idea" : "Submit Idea")}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage("home");
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 h-10 border border-gray-200 hover:bg-gray-50 text-[10px] font-bold text-black uppercase tracking-wider rounded transition-colors active:scale-97 duration-100 cursor-pointer"
                  >
                    {lang === 'fr' ? "Annuler" : lang === 'es' ? "Cancelar" : "Cancel"}
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

      </main>

      {/* 8. ELITE WHITE-THEMED RICH SAAS FOOTER (Fully translated multi-column layout, regulatory standards, social channels) */}
      <footer className="bg-white border-t border-gray-200 text-black py-16 text-xs mt-20 font-medium">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Column 1: Metrology Identity Statement */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {/* SVG Geometric mark in red */}
                <svg viewBox="0 0 100 100" className="w-7 h-7 shrink-0 transition-transform hover:scale-105 duration-200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Premium rounded dark satin squircle backdrop */}
                  <rect x="4" y="4" width="92" height="92" rx="24" fill="url(#appIconGradientFooter)" stroke="#2C2C2E" strokeWidth="1.5" />
                  
                  {/* Geometric modern 4-quadrant layout representing calculation */}
                  <rect x="24" y="24" width="22" height="22" rx="6" stroke="#FFFFFF" strokeWidth="5.5" fill="none" />
                  <rect x="54" y="24" width="22" height="22" rx="6" stroke="#FF3B30" strokeWidth="5.5" fill="none" />
                  <rect x="24" y="54" width="22" height="22" rx="6" stroke="#FFFFFF" strokeWidth="5.5" fill="none" />
                  
                  {/* Vibrant intersecting mathematical paths inside the bottom-right slot */}
                  <path d="M 59 65 L 71 65 M 65 59 L 65 71" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />

                  <defs>
                    <linearGradient id="appIconGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1C1C1E" />
                      <stop offset="100%" stopColor="#020202" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-base font-black text-[#0A0A0A] tracking-tight hover:opacity-90 uppercase">
                  SMART<span className="text-[#FF3B30]">CALCUL</span>
                </span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed font-semibold">
                {saasDict.footerDesc}
              </p>
            </div>

            {/* Column 2: Operators Metrology shortcuts */}
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase text-[#FF3B30] tracking-widest font-mono block">
                {saasDict.footerColTools}
              </span>
              <ul className="space-y-1.5 text-[11px] font-bold text-gray-500">
                <li><button onClick={() => { setCurrentPage("currency"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF3B30] text-left cursor-pointer active:scale-95 duration-100 block">Devises interbancaires</button></li>
                <li><button onClick={() => { setCurrentPage("kitchen"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF3B30] text-left cursor-pointer active:scale-95 duration-100 block">Kitchen conversion ratios</button></li>
                <li><button onClick={() => { setCurrentPage("size"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF3B30] text-left cursor-pointer active:scale-95 duration-100 block">Sartorial garment mapping</button></li>
                <li><button onClick={() => { setCurrentPage("distance"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF3B30] text-left cursor-pointer active:scale-95 duration-100 block">Metrology distance calibration</button></li>
                <li><button onClick={() => { setCurrentPage("percent"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF3B30] text-left cursor-pointer active:scale-95 duration-100 block">Proportions & analytical %</button></li>
              </ul>
            </div>

            {/* Column 3: Corporate Directory */}
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase text-[#FF3B30] tracking-widest font-mono block">
                {saasDict.footerColSitemap}
              </span>
              <ul className="space-y-1.5 text-[11px] font-bold text-gray-500">
                <li><button onClick={() => { setCurrentPage("home"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF3B30] text-left cursor-pointer active:scale-95 duration-100 block">{saasDict.sitemapHome}</button></li>
                <li><button onClick={() => { setCurrentPage("about"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF3B30] text-left cursor-pointer active:scale-95 duration-100 block">{saasDict.sitemapAbout}</button></li>
                <li><button onClick={() => { setCurrentPage("contact"); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#FF3B30] text-left cursor-pointer active:scale-95 duration-100 block">{saasDict.sitemapContact}</button></li>
              </ul>
            </div>

            {/* Column 4: Certified Standars & Compliance Badges */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#FF3B30] font-mono block">
                {saasDict.footerColCompliance}
              </span>
              
              <ul className="space-y-2 text-[11px] font-bold text-gray-500">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#FF3B30]" />
                  <span>{saasDict.complianceDoc}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#FF3B30]" />
                  <span>{saasDict.complianceBipm}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#FF3B30]" />
                  <span>{saasDict.compliancePrivacy}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#FF3B30]" />
                  <span>{saasDict.complianceLic}</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-150 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-gray-400 font-bold uppercase tracking-wider font-mono">
            <p className="normal-case">
              &copy; {new Date().getFullYear()} smartcalcul. {saasDict.footerCopyright}
            </p>
            <div className="flex items-center gap-4">
              <a href="#twitter" className="hover:text-[#FF3B30] transition-colors">{saasDict.footerColChannels}</a>
              <span>&middot;</span>
              <span>OpenFoodFacts compliance node</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
