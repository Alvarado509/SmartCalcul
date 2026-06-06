/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';

export const BASELINE_CURRENCIES = [
  { code: "EUR", nameFr: "Euro (€)", nameEn: "Euro (€)", nameEs: "Euro (€)", rateToBaseEUR: 1.0 },
  { code: "USD", nameFr: "Dollar US ($)", nameEn: "US Dollar ($)", nameEs: "Dólar EE.UU. ($)", rateToBaseEUR: 1.085 },
  { code: "GBP", nameFr: "Livre Sterling (£)", nameEn: "British Pound (£)", nameEs: "Libra Esterlina (£)", rateToBaseEUR: 0.852 },
  { code: "JPY", nameFr: "Yen Japonais (¥)", nameEn: "Japanese Yen (¥)", nameEs: "Yen Japonés (¥)", rateToBaseEUR: 169.15 },
  { code: "CAD", nameFr: "Dollar Canadien (C$)", nameEn: "Canadian Dollar (C$)", nameEs: "Dólar Canadiense (C$)", rateToBaseEUR: 1.487 },
  { code: "CHF", nameFr: "Franc Suisse (CHF)", nameEn: "Swiss Franc (CHF)", nameEs: "Franco Suizo (CHF)", rateToBaseEUR: 0.972 },
  { code: "AUD", nameFr: "Dollar Australien (A$)", nameEn: "Australian Dollar (A$)", nameEs: "Dólar Australiano (A$)", rateToBaseEUR: 1.635 },
  { code: "CNY", nameFr: "Yuan Chinois (¥)", nameEn: "Chinese Yuan (¥)", nameEs: "Yuan Chino (¥)", rateToBaseEUR: 7.854 },
  { code: "BRL", nameFr: "Réal Brésilien (R$)", nameEn: "Brazilian Real (R$)", nameEs: "Real Brasileño (R$)", rateToBaseEUR: 5.680 },
  { code: "INR", nameFr: "Roupie Indienne (₹)", nameEn: "Indian Rupee (₹)", nameEs: "Rupia India (₹)", rateToBaseEUR: 90.35 },
  { code: "MXN", nameFr: "Peso Mexicain ($)", nameEn: "Mexican Peso ($)", nameEs: "Peso Mexicano ($)", rateToBaseEUR: 19.12 },
  { code: "SGD", nameFr: "Dollar Singapour (S$)", nameEn: "Singapore Dollar (S$)", nameEs: "Dólar de Singapur (S$)", rateToBaseEUR: 1.465 },
  { code: "AED", nameFr: "Dirham des Émirats (AED)", nameEn: "UAE Dirham (AED)", nameEs: "Dírham emiratí (AED)", rateToBaseEUR: 3.98 },
  { code: "ARS", nameFr: "Peso Argentin (ARS)", nameEn: "Argentine Peso (ARS)", nameEs: "Peso Argentino (ARS)", rateToBaseEUR: 975.30 },
  { code: "CLP", nameFr: "Peso Chilien (CLP)", nameEn: "Chilean Peso (CLP)", nameEs: "Peso Chileno (CLP)", rateToBaseEUR: 1012.40 },
  { code: "COP", nameFr: "Peso Colombien (COP)", nameEn: "Colombian Peso (COP)", nameEs: "Peso Colombiano (COP)", rateToBaseEUR: 4235.00 },
  { code: "EGP", nameFr: "Livre Égyptienne (EGP)", nameEn: "Egyptian Pound (EGP)", nameEs: "Libra Egipcia (EGP)", rateToBaseEUR: 51.50 },
  { code: "HKD", nameFr: "Dollar Hong Kong (HK$)", nameEn: "Hong Kong Dollar (HK$)", nameEs: "Dólar de Hong Kong (HK$)", rateToBaseEUR: 8.47 },
  { code: "IDR", nameFr: "Roupie Indonésienne (IDR)", nameEn: "Indonesian Rupee (IDR)", nameEs: "Rupia Indonesia (IDR)", rateToBaseEUR: 17680.00 },
  { code: "ILS", nameFr: "Shekel Israélien (ILS)", nameEn: "Israeli Shekel (ILS)", nameEs: "Shéquel israelí (ILS)", rateToBaseEUR: 4.02 },
  { code: "KRW", nameFr: "Won Sud-Coréen (KRW)", nameEn: "South Korean Won (KRW)", nameEs: "Won Surcoreano (KRW)", rateToBaseEUR: 1485.00 },
  { code: "MAD", nameFr: "Dirham Marocain (MAD)", nameEn: "Moroccan Dirham (MAD)", nameEs: "Dírham Marroquí (MAD)", rateToBaseEUR: 10.85 },
  { code: "MYR", nameFr: "Ringgit Malaisien (MYR)", nameEn: "Malaysian Ringgit (MYR)", nameEs: "Ringgit Malayo (MYR)", rateToBaseEUR: 5.10 },
  { code: "NOK", nameFr: "Couronne Norvégienne (NOK)", nameEn: "Norwegian Krone (NOK)", nameEs: "Corona Noruega (NOK)", rateToBaseEUR: 11.55 },
  { code: "NZD", nameFr: "Dollar Néo-Zélandais (NZ$)", nameEn: "New Zealand Dollar (NZ$)", nameEs: "Dólar Neozelandés (NZ$)", rateToBaseEUR: 1.76 },
  { code: "PHP", nameFr: "Peso Philippin (PHP)", nameEn: "Philippine Peso (PHP)", nameEs: "Peso Filipino (PHP)", rateToBaseEUR: 63.60 },
  { code: "PLN", nameFr: "Zloty Polonais (PLN)", nameEn: "Polish Zloty (PLN)", nameEs: "Zloty Polaco (PLN)", rateToBaseEUR: 4.29 },
  { code: "RUB", nameFr: "Rouble Russe (RUB)", nameEn: "Russian Ruble (RUB)", nameEs: "Rublo Ruso (RUB)", rateToBaseEUR: 96.40 },
  { code: "SAR", nameFr: "Riyal Saoudien (SAR)", nameEn: "Saudi Riyal (SAR)", nameEs: "Riyal Saudí (SAR)", rateToBaseEUR: 4.07 },
  { code: "SEK", nameFr: "Couronne Suédoise (SEK)", nameEn: "Swedish Krona (SEK)", nameEs: "Corona Sueca (SEK)", rateToBaseEUR: 11.38 },
  { code: "THB", nameFr: "Baht Thaïlandais (THB)", nameEn: "Thai Baht (THB)", nameEs: "Baht Tailandés (THB)", rateToBaseEUR: 39.80 },
  { code: "TRY", nameFr: "Lire Turque (TRY)", nameEn: "Turkish Lira (TRY)", nameEs: "Lira Turca (TRY)", rateToBaseEUR: 35.10 },
  { code: "TWD", nameFr: "Nouveau Dollar Taïwanais (TWD)", nameEn: "New Taiwan Dollar (TWD)", nameEs: "Nuevo Dólar Taiwanés (TWD)", rateToBaseEUR: 35.05 },
  { code: "VND", nameFr: "Dong Vietnamien (VND)", nameEn: "Vietnamese Dong (VND)", nameEs: "Dong Vietnamita (VND)", rateToBaseEUR: 27600.00 },
  { code: "ZAR", nameFr: "Rand Sud-Africain (ZAR)", nameEn: "South African Rand (ZAR)", nameEs: "Rand Sudafricano (ZAR)", rateToBaseEUR: 20.15 },
  { code: "DKK", nameFr: "Couronne Danoise (DKK)", nameEn: "Danish Krone (DKK)", nameEs: "Corona Danesa (DKK)", rateToBaseEUR: 7.46 },
  { code: "HUF", nameFr: "Forint Hongrois (HUF)", nameEn: "Hungarian Forint (HUF)", nameEs: "Forinto Húngaro (HUF)", rateToBaseEUR: 395.20 },
  { code: "CZK", nameFr: "Couronne Tchèque (CZK)", nameEn: "Czech Koruna (CZK)", nameEs: "Corona Checa (CZK)", rateToBaseEUR: 24.60 },
  { code: "RON", nameFr: "Leu Roumain (RON)", nameEn: "Romanian Leu (RON)", nameEs: "Leu Rumano (RON)", rateToBaseEUR: 4.97 }
];

export const BASELINE_DISTANCES = [
  { id: 'm', labelFr: 'Mètre (m)', labelEn: 'Meter (m)', labelEs: 'Metro (m)', factor: 1 },
  { id: 'cm', labelFr: 'Centimètre (cm)', labelEn: 'Centimeter (cm)', labelEs: 'Centímetro (cm)', factor: 0.01 },
  { id: 'mm', labelFr: 'Millimètre (mm)', labelEn: 'Millimeter (mm)', labelEs: 'Milímetro (mm)', factor: 0.001 },
  { id: 'km', labelFr: 'Kilomètre (km)', labelEn: 'Kilometer (km)', labelEs: 'Kilómetro (km)', factor: 1000 },
  { id: 'in', labelFr: 'Pouce (in)', labelEn: 'Inch (in)', labelEs: 'Pulgada (in)', factor: 0.0254 },
  { id: 'ft', labelFr: 'Pied (ft)', labelEn: 'Foot (ft)', labelEs: 'Pie (ft)', factor: 0.3048 },
  { id: 'yd', labelFr: 'Yard (yd)', labelEn: 'Yard (yd)', labelEs: 'Yarda (yd)', factor: 0.9144 },
  { id: 'mi', labelFr: 'Mille Terrestre (mi)', labelEn: 'Mile (mi)', labelEs: 'Milla (mi)', factor: 1609.344 },
  { id: 'nm', labelFr: 'Mille Nautique (nm)', labelEn: 'Nautical Mile (nm)', labelEs: 'Milla Náutica (nm)', factor: 1852 }
];

export const BASELINE_KITCHEN_INGREDIENTS = [
  { id: 'flour', nameFr: "Farine de blé", nameEn: "All-Purpose Flour", nameEs: "Harina de trigo", density: 0.52 },
  { id: 'sugar', nameFr: "Sucre blanc raffiné", nameEn: "Refined White Sugar", nameEs: "Azúcar blanco refinado", density: 0.85 },
  { id: 'butter', nameFr: "Beurre solide", nameEn: "Solid Dairy Butter", nameEs: "Mantequilla pura", density: 0.95 },
  { id: 'milk', nameFr: "Lait entier", nameEn: "Whole Milk", nameEs: "Leche entera", density: 1.03 },
  { id: 'water', nameFr: "Eau pure", nameEn: "Pure Water", nameEs: "Agua limpia", density: 1.00 },
  { id: 'rice', nameFr: "Riz blanc", nameEn: "Long Grain White Rice", nameEs: "Arroz blanco", density: 0.80 },
  { id: 'cocoa', nameFr: "Cacao en poudre", nameEn: "Cocoa Powder", nameEs: "Cocoa en polvo", density: 0.45 },
  { id: 'honey', nameFr: "Miel liquide", nameEn: "Liquid Honey", nameEs: "Miel de abeja", density: 1.42 }
];

export const KITCHEN_UNITS = [
  { id: 'g', labelFr: 'g (Grammes)', labelEn: 'g (Grams)', labelEs: 'g (Gramos)', type: 'weight', factor: 1 },
  { id: 'kg', labelFr: 'kg (Kilogrammes)', labelEn: 'kg (Kilograms)', labelEs: 'kg (Kilogramos)', type: 'weight', factor: 1000 },
  { id: 'oz', labelFr: 'oz (Onces poids)', labelEn: 'oz (Ounces weight)', labelEs: 'oz (Onzas)', type: 'weight', factor: 28.3495 },
  { id: 'lb', labelFr: 'lb (Livres)', labelEn: 'lb (Pounds)', labelEs: 'lb (Libras)', type: 'weight', factor: 453.592 },
  { id: 'ml', labelFr: 'ml (Millilitres)', labelEn: 'ml (Milliliters)', labelEs: 'ml (Mililitros)', type: 'volume', factor: 1 },
  { id: 'L', labelFr: 'L (Litres)', labelEn: 'L (Liters)', labelEs: 'L (Litros)', type: 'volume', factor: 1000 },
  { id: 'cups', labelFr: 'cups (Tasses)', labelEn: 'cups (US Cups)', labelEs: 'cups (Tazas)', type: 'volume', factor: 240 },
  { id: 'tbsp', labelFr: 'tbsp (C. à soupe)', labelEn: 'tbsp (Tablespoons)', labelEs: 'tbsp (Cuchara)', type: 'volume', factor: 15 },
  { id: 'tsp', labelFr: 'tsp (C. à café)', labelEn: 'tsp (Teaspoons)', labelEs: 'tsp (Cucharadita)', type: 'volume', factor: 5 },
  { id: 'floz', labelFr: 'fl oz (Onces liquides)', labelEn: 'fl oz (Fluid Ounces)', labelEs: 'fl oz (Onzas líquidas)', type: 'volume', factor: 29.5735 }
];

// Provide some pre-configured sizing presets, but the mapping is open
export const BASELINE_SIZING_PRESETS = [
  { id: '1', categoryFr: 'Chaussures Femme', categoryEn: 'Womenswear Shoes', categoryEs: 'Calzado Mujer', source: 'EU', target: 'US', valueIn: '38', valueOut: '7.5' },
  { id: '2', categoryFr: 'Chaussures Femme', categoryEn: 'Womenswear Shoes', categoryEs: 'Calzado Mujer', source: 'EU', target: 'UK', valueIn: '38', valueOut: '5.5' },
  { id: '3', categoryFr: 'Chaussures Homme', categoryEn: 'Menswear Shoes', categoryEs: 'Calzado Hombre', source: 'EU', target: 'US', valueIn: '42', valueOut: '9.5' },
  { id: '4', categoryFr: 'Costumes Homme', categoryEn: 'Mens Suits', categoryEs: 'Trajes Hombre', source: 'EU', target: 'US', valueIn: '50', valueOut: '40' },
  { id: '5', categoryFr: 'Robes & Vestes Femme', categoryEn: 'Womens Dresses & Jackets', categoryEs: 'Vestidos Mujer', source: 'FR', target: 'US', valueIn: '38', valueOut: '8' }
];

export const TRANSLATIONS: Record<Language, any> = {
  fr: {
    metaTitle: "smartcalcul - Standard Mondial de Calcul de Haute Précision",
    tagline: "Plateforme sémantique libre & sans limites physiques",
    heroTitle: "L'intelligence de calcul, sans aucune frontière.",
    heroSubtitle: "Découvrez smartcalcul Système Ouvert. Calculez votre métabolisme, gérez vos prêts immobiliers, convertissez vos ingrédients via OpenFoodFacts, et modélisez vos proportions. Vos données restent conservées à 100% localement.",
    startJourney: "Lancer les consoles métriques",
    trustedBy: "Calibré pour des calculs d'ingénierie et de transport international",
    backToHome: "Retour au tableau d'accueil",
    menuTools: "Consoles",
    menuAbout: "Savoir-faire",
    menuContact: "Liaisons Desk",
    recentHistory: "Historique récent des calculs",
    noHistory: "Aucun historique disponible pour le moment. Effectuez votre première simulation ci-dessus !",
    precisionCertifiedRating: "Précision Certifiée IEEE 754",
    certifiedComment: "Double Précision Flottante Intégrale",

    // Social Proof
    confTitle: "Souveraineté des Données",
    confDesc: "Vos requêtes, taux saisis et produits alimentaires recherchés ne Transitent par Aucun serveur cloud d'analyse. Tout s'exécute en local.",
    precTitle: "Précision Calibrée",
    precDesc: "Nos constantes physiques s'adossent aux standards du Bureau International des Poids et Mesures (BIPM).",
    speedTitle: "Latence Nulle de Flux",
    speedDesc: "Grâce à notre moteur sémantique, profitez de réponses millisecondes pendant que vous tapez vos caractères.",

    // How we calculate section
    sectionIntroTitle: "ANALYSE MÉTROLOGIQUE",
    sectionIntroSubtitle: "L'art de l'infaillibilité globale",
    calcPrecisionTitle: "Zéro Approximation",
    calcPrecisionDesc: "L'application neutralise l'accumulation des erreurs de calcul binaire via des algorithmes de filtrage de double précision.",
    calcDensityTitle: "OpenFoodFacts en Direct",
    calcDensityDesc: "Recherchez n'importe quel produit dans l'annuaire mondial alimentaire pour ajuster les ratios de masse volumétrique.",
    calcEngineTitle: "Moteur Static 'Infaillible'",
    calcEngineDesc: "Zéro blocage. Même déconnecté au milieu de la mer, le système propose un mode de saisie libre et manuel pour toutes les échelles.",

    // About Page
    aboutHeader: "Savoir-faire, Privauté & Rigueur Éternelle",
    aboutSub: "Le standard de calcul décentralisé le plus avancé du web.",
    aboutP1: "smartcalcul réinvente les applications de calcul en brisant les verrous des listes fixes et des abonnements payants. Nous pensons que le calcul physique et de santé est un bien commun mondial.",
    aboutP2: "L'intégration directe d'OpenFoodFacts permet d'accéder au catalogue de millions de produits alimentaires en temps réel pour équilibrer les mesures de la cuisine. De même, notre moteur de mapping d'habillement s'affranchit des grilles arbitraires pour vous laisser définir vos propres correspondances. Un outil pensé pour l'éternité et la souveraineté.",

    // Contact Page
    contactHeader: "Mesa de Communication & Commandes Privées",
    contactSub: "Assistance technique et déploiements en environnement stérile ou déconnecté.",
    contactP1: "Besoin de configurer une version dédiée de smartcalcul pour vos serveurs locaux, votre club de sport ou votre bureau sans réseaux mobiles ? Remplissez ce formulaire d'échange.",
    contactLabelEmail: "Courriel de l'organisation",
    contactLabelMsg: "Description détaillée de l'écosystème récepteur",
    contactSend: "Transmettre la requête métrologique",
    contactSuccess: "Votre requête a été reçue par le bureau technique de smartcalcul. Notre équipe l'examinera sous 24h.",

    // General Form Labels
    labelFrom: "Système de Départ (Recherche active)",
    labelTo: "Système Target (Recherche active)",
    labelValue: "Valeur numérique ou format",
    labelResult: "Calcul de Double Précision Résolu",
    labelSearchUnit: "Saisir ou rechercher une unité...",
    labelSearchIngredient: "Saisir un ingrédient ou scanner un nom de produit...",
    labelCreateItem: "Créer un élément personnalisé",
    labelManualOverview: "Activer le Taux Manuel Surchargé",
    modeManualToggle: "Compensation Manuelle",
    loadingRates: "Séquence de synchronisation des devises...",
    placeholderSearch: "Recherchez d'après le nom ou le code...",
    cantFind: "Vous ne trouvez pas votre unité ?",
    createBtn: "Créer et ajouter '{query}'",
    manualRateActive: "Calcul calculé via votre taux manuel surchargé personnalisé.",
    autoRateFetched: "Taux synchronisés en temps réel de Frankfurter API",

    // Tool specific
    toolsHeaderTitle: "CONSOLES OPÉRATIONNELLES",
    toolCurrencyTitle: "Devises Bancaires",
    toolCurrencyDesc: "Régulation des parités interbancaires en direct. Mode secours automatique hors-connexion.",
    toolSizeTitle: "Tallage d'Habillement",
    toolSizeDesc: "Moteur de mapping universel pour vêtements et chaussures du monde entier sans barrière.",
    toolKitchenTitle: "Ratios Culinaires Organiques",
    toolKitchenDesc: "Conversion instantanée du volume au poids d'après l'index d'OpenFoodFacts ou d'index personnalisés.",
    toolDistanceTitle: "Distances & Cotes",
    toolDistanceDesc: "Standardisation physiques de la micro-électronique aux milles nautiques navals.",
    toolPercentTitle: "Proportions & Marges",
    toolPercentDesc: "Fractions, variations de gains relatifs, accroissements nets résolus en sandbox.",

    // Modal forms
    modalTitle: "Création d'une Unité Sémantique",
    modalName: "Nom de l'unité ou matière",
    modalCode: "Symbole (ex: CUST, kg, cm, m...)",
    modalFactor: "Facteur multiplicateur de conversion par rapport à la base",
    modalPlaceholderName: "ex: Poudre de vanille de Madagascar",
    modalPlaceholderCode: "ex: VANI",
    modalSave: "Enregistrer à la volée",
    modalCancel: "Fermer",

    // specific categories
    ingredientCol: "Ingrédient (Source de densité)",
    densityCol: "Densité appliquée (g/ml)",
    ingredientSearchPlaceholder: "Tapez 'chocolat', 'farine', ou n'importe quel produit...",
    sizingCategoryLabel: "Type ou catégorie de vêtement (ex: Veste, Jupe, Costards, Bottes...)",
    sizingPlaceholderCat: "ex: Tallage Chemises de Luxe",
    sizeFromLabel: "Norme / Pays source (ex: EU, US, UK...)",
    sizeToLabel: "Norme / Pays destination (ex: FR, IT, AU...)",
    sizeInputPlaceholder: "Saisissez la taille d'origine (ex: M, 42, 10.5, L)",
    sizeMappedResult: "Taille équivalente résolue",
    formulaUsed: "Formule ou correction appliquée",
    customAddMapping: "Créer une nouvelle règle de taille",
    customRulesLabel: "Vos règles de mapping enregistrées",

    // API notices
    liveOFF: "API OpenFoodFacts connectée en direct",
    offlineFallback: "Aucune connexion trouvée : moteur de densité locale activé.",
    currencyUpdatedOn: "Taux mis à jour le {date} (Infaillibilité automatique de secours)"
  },
  en: {
    metaTitle: "smartcalcul - Worldwide High-Precision Calculator and Conversion Standard",
    tagline: "Free-form semantic platform without physical boundaries",
    heroTitle: "Metric intelligence, completely borderless.",
    heroSubtitle: "Welcome to the smartcalcul Open System. Track body metrics and metabolism, plan physical performance, calculate loan interests, convert weights via OpenFoodFacts, and map clothing sizes in your secure sandbox.",
    startJourney: "Launch Conversion Consoles",
    trustedBy: "Calibrated for logistics, shipping control houses, and haute-couture houses",
    backToHome: "Return to central workspace",
    menuTools: "Consoles",
    menuAbout: "Sartorial Know-How",
    menuContact: "Liaisons Desk",
    recentHistory: "Recent calculations history",
    noHistory: "No database query log yet. Perform a conversion above to populate this deck!",
    precisionCertifiedRating: "IEEE 754 Certified Precision",
    certifiedComment: "Full Double-Precision Floating Math",

    // Social Proof
    confTitle: "Sovereign Framework",
    confDesc: "Your values, entered variables, and grocery searches are never uploaded to dynamic tracking clouds. Stored strictly in local storage.",
    precTitle: "Physical Calibration",
    precDesc: "Fundamental metrics align with physical coefficients managed by the International Bureau of Weights and Measures.",
    speedTitle: "Zero Latency Buffer",
    speedDesc: "Powered by browser-compiled JavaScript core algorithms for instant calculation feedback as you enter text.",

    // How we calculate section
    sectionIntroTitle: "METROLOGICAL SCIENCE",
    sectionIntroSubtitle: "Engineering global infallibility",
    calcPrecisionTitle: "Double-Floating Precision",
    calcPrecisionDesc: "The system dynamically filters binary representation drift using exact floating-point metrics to fully eliminate approximation loops.",
    calcDensityTitle: "Live OpenFoodFacts Nodes",
    calcDensityDesc: "Connect directly with millions of crowd-sourced foods to look up product layouts and density properties.",
    calcEngineTitle: "Fail-Safe Implementation",
    calcEngineDesc: "Even in offline environments or deep sea corridors, standard manual compensation models keep the tool fully operational.",

    // About Page
    aboutHeader: "Precision, Trust, and Open-ended Heritage",
    aboutSub: "The most robust client-tier conversion node online.",
    aboutP1: "smartcalcul was born as a countermeasure against bloated, ad-ridden calculation utilities. We believe mathematical estimations, metabolism projections, and financial schedules are fundamental services that should execute privately.",
    aboutP2: "By blending live biological and health formulas with an interactive sandboxed environment, smartcalcul offers an unrestricted playground. You can compute custom values, manage loan constants, or track food parameters easily.",

    // Contact Page
    contactHeader: "Corporate Communications & Isolated Deployments",
    contactSub: "Technical deployments for localized secure workspaces.",
    contactP1: "Need help deploying an isolated local mirror of smartcalcul for fitness clinics, financial offices, or specialized training spaces? Access our support form below.",
    contactLabelEmail: "Enterprise Email Address",
    contactLabelMsg: "Infrastructural deployment criteria",
    contactSend: "Transmit Métrographie Dossier",
    contactSuccess: "Your transmission has reached our operations desk. Our engineering team will review the parameters in 24 hours.",

    // General Form Labels
    labelFrom: "Source System (Instant Autocomplete)",
    labelTo: "Destination System (Instant Autocomplete)",
    labelValue: "Numeric parameter or scale input",
    labelResult: "Double Precision Resolution Output",
    labelSearchUnit: "Type or select a metric unit...",
    labelSearchIngredient: "Type or query a global food product...",
    labelCreateItem: "Construct custom unit element",
    labelManualOverview: "Enable custom override rate",
    modeManualToggle: "Manual Compensation Override",
    loadingRates: "Sourcing live interbank currency grids...",
    placeholderSearch: "Search by identifier, country, or code...",
    cantFind: "Missing a specific unit?",
    createBtn: "Create and populate '{query}'",
    manualRateActive: "Calculated with your custom-configured override rate.",
    autoRateFetched: "Real-time rates synced from Frankfurter interbank API",

    // Tool specific
    toolsHeaderTitle: "WORKSPACE DECK CONSOLES",
    toolCurrencyTitle: "Interbank Currencies",
    toolCurrencyDesc: "Simulate interbank values and processing spreads. Auto fallback offline capabilities active.",
    toolSizeTitle: "Sartorial Garments",
    toolSizeDesc: "Open mapping engine for tailored shoes and attire across any geographic sizing system.",
    toolKitchenTitle: "Culinary Mass & Volume",
    toolKitchenDesc: "Convert liquid or dry ingredients based on customized densities or OpenFoodFacts lookup queries.",
    toolDistanceTitle: "Physical Engineering Distance",
    toolDistanceDesc: "Rigorous standards translation spanning microscopic parameters up to large maritime leagues.",
    toolPercentTitle: "Proportions & Marges",
    toolPercentDesc: "Solve percentage ratios, yields, and growth margins instantly in safe sandbox.",

    // Modal forms
    modalTitle: "Construct Custom Metrology Unit",
    modalName: "Ingredient or Unit Identification",
    modalCode: "Symbol Code (e.g., CUST, lb, ml, mm...)",
    modalFactor: "Multiplication coefficient relative to baseline standard",
    modalPlaceholderName: "e.g., Pure Vanilla Paste",
    modalPlaceholderCode: "e.g., VANI",
    modalSave: "Inject Custom Parameter",
    modalCancel: "Dismiss",

    // specific categories
    ingredientCol: "Ingredient (Density Source)",
    densityCol: "Applied Volumetric Weight (g/ml)",
    ingredientSearchPlaceholder: "Type 'sugar', 'flour', 'chocolate', or scan product...",
    sizingCategoryLabel: "Sartorial attire category (e.g., Coat, Evening Gown, Luxury Boot...)",
    sizingPlaceholderCat: "e.g., Handcrafted Dress Shirts Sizing",
    sizeFromLabel: "Source System (e.g. EU, US, UK...)",
    sizeToLabel: "Target Sizing System (e.g., FR, IT, JP...)",
    sizeInputPlaceholder: "Type source clothing size (e.g. M, 42, 10.5, XL)",
    sizeMappedResult: "Resolved Sizing Value",
    formulaUsed: "Sartorial conversion logic applied",
    customAddMapping: "Register a sizing map override rule",
    customRulesLabel: "Your customized clothing mapping overrides",

    // API notices
    liveOFF: "Directly connected to OpenFoodFacts database node",
    offlineFallback: "API node offline: utilizing local density parameters.",
    currencyUpdatedOn: "Exchange rate calibrated on {date} (Automatic Infallible Standby fallback)"
  },
  es: {
    metaTitle: "smartcalcul - El Estándar Mundial de Conversión y Cálculo",
    tagline: "Calculadora de alta velocidad con motor local libre",
    heroTitle: "La excelencia métrica corporativa, sin fronteras.",
    heroSubtitle: "Bienvenido a smartcalcul Sistema Abierto. Calcule su metabolismo corporal, planifique préstamos financieros, convierta ingredientes con OpenFoodFacts, y calcule proporciones físicas sin límites.",
    startJourney: "Iniciar consolas de cálculo",
    trustedBy: "Estructurado para ingenieros, modistas, corredores bursátiles y logísticos mundiales",
    backToHome: "Volver al panel central",
    menuTools: "Consolas",
    menuAbout: "Soberanía Profesional",
    menuContact: "Canal Corporativo",
    recentHistory: "Historial de cálculo reciente",
    noHistory: "No se registran cálculos en el historial de consulta. Realice su primera operación para llenar los controles.",
    precisionCertifiedRating: "Precisión Certificada IEEE 754",
    certifiedComment: "Doble Precisión Punto Flotante Integral",

    // Social Proof
    confTitle: "Soberanía de Datos",
    confDesc: "Sus valores de ingreso, productos alimenticios preferidos y notas financieras no se comparten con ningún servidor cloud de métricas comerciales.",
    precTitle: "Conversión de Alta Gama",
    precDesc: "Nuestras constantes de correspondencia física están diseñadas conforme al Sistema Internacional de Unidades.",
    speedTitle: "Computación Nativa",
    speedDesc: "Al ejecutarse en el dispositivo, el software procesa y asimila los cambios tan rápido como digita cada letra.",

    // How we calculate section
    sectionIntroTitle: "METROLOGÍA APLICADA",
    sectionIntroSubtitle: "La ciencia detrás de la perfección",
    calcPrecisionTitle: "Error Reducido al Mínimo",
    calcPrecisionDesc: "Se implementan validaciones aritméticas flotantes bajo el estándar IEEE 754 para anular errores residuales en redondeos complejos.",
    calcDensityTitle: "OpenFoodFacts de Vanguardia",
    calcDensityDesc: "Consulte millones de denominaciones de comida directamente de bases libres para definir el peso exacto por volumen.",
    calcEngineTitle: "Esquema Local Infatigable",
    calcEngineDesc: "Incluso sin conectividad de internet o en naves navales de altamar, el sistema activa campos opcionales manuales.",

    // About Page
    aboutHeader: "Pristinidad, Confianza y Patrimonio Métrico",
    aboutSub: "La consola descentralizada de conversión más segura de internet.",
    aboutP1: "smartcalcul elimina la saturación de las herramientas lentas y de pago. Sostenemos que el cálculo de rendimiento corporal y finanzas es un servicio fundamental para facilitar la toma de decisiones.",
    aboutP2: "Utilizando coeficientes basados en estándares junto con un software ágil y local, smartcalcul es un entorno sin límites. Calcule su TDEE, proyecte mensualidades de préstamos, y defina equivalencia de medidas sin restricciones.",

    // Contact Page
    contactHeader: "Mesa de Enlace y Entregas Desconectadas",
    contactSub: "Ajustes de infraestructura para servidores locales seguros.",
    contactP1: "¿Busca implementar una versión autónoma sin dependencias web para bodegas portuarias, laboratorios o mineras aisladas de redes tradicionales? Envíe sus requerimientos a continuación.",
    contactLabelEmail: "Email Corporativo",
    contactLabelMsg: "Descripción detallada del entorno receptor",
    contactSend: "Enviar datos del Technical Desk",
    contactSuccess: "Transmisión enviada. Nuestro departamento técnico revisará sus requisitos y se comunicará en 24 horas laborables.",

    // General Form Labels
    labelFrom: "Sistema Origen (Autocompletar de inmediato)",
    labelTo: "Sistema Destino (Autocompletar de inmediato)",
    labelValue: "Parámetro numérico a ponderar",
    labelResult: "Resolución de Precisión Resuelta",
    labelSearchUnit: "Escriba o busque una unidad de escala...",
    labelSearchIngredient: "Escriba un ingrediente o busque comida real...",
    labelCreateItem: "Crear unidad personalizada",
    labelManualOverview: "Habilitar compensación de tasa manual",
    modeManualToggle: "Compensación de Tasa Manual",
    loadingRates: "Sintonizando cambios de divisas interbancarias...",
    placeholderSearch: "Búsqueda por nombre, código de país...",
    cantFind: "¿No encuentra la unidad que busca?",
    createBtn: "Crear y añadir '{query}'",
    manualRateActive: "Cálculo computado con su tasa manual de compensación.",
    autoRateFetched: "Tasas actualizadas desde la API interbancaria Frankfurter",

    // Tool specific
    toolsHeaderTitle: "CONSOLAS DE TRABAJO REGISTRADAS",
    toolCurrencyTitle: "Paridades de Divisas",
    toolCurrencyDesc: "Calcule spreads monetarios y divisas internacionales. Sistema con soporte de emergencia local.",
    toolSizeTitle: "Indumentarias del Mundo",
    toolSizeDesc: "Mapeo libre de tallas de moda, ropa de diseño y calzado infantil o adulto sin trabas territoriales.",
    toolKitchenTitle: "Equivalencias Culinarias",
    toolKitchenDesc: "Verifique mermas en peso de ingredientes usando densidades específicas u OpenFoodFacts.",
    toolDistanceTitle: "Distancias Navales & Terrestres",
    toolDistanceDesc: "Correspondencia científica desde longitudes micrométricas hasta extensiones marítimas.",
    toolPercentTitle: "Proporciones & Ratios",
    toolPercentDesc: "Resuelva incrementos porcentuales, coeficientes de beneficio y variaciones brutas instantáneas.",

    // Modal forms
    modalTitle: "Creación de Unidad Métrica Dinámica",
    modalName: "Nombre de la unidad o compuesto",
    modalCode: "Código o símbolo (Ej: CUST, g, m, lb...)",
    modalFactor: "Factor de proporción multiplicadora (En relación a la base)",
    modalPlaceholderName: "Ej: Azúcar refinado de caña morena",
    modalPlaceholderCode: "Ej: AZUC",
    modalSave: "Guardar Unidad en el Aire",
    modalCancel: "Cancelar",

    // specific categories
    ingredientCol: "Ingrediente (Origen de Densidad)",
    densityCol: "Densidad de Masa Volumétrica (g/ml)",
    ingredientSearchPlaceholder: "Ej: cacao, mantequilla, galleta, pan...",
    sizingCategoryLabel: "Grupo o categoría de calzado/vestido (Ej: Chaqueta formal, Vestido de noche...)",
    sizingPlaceholderCat: "Ej: Tallaje Poleras de Diseñador",
    sizeFromLabel: "Ajuste de origen (Ej: EU, US, UK...)",
    sizeToLabel: "Ajuste destino (Ej: FR, IT, MX...)",
    sizeInputPlaceholder: "Escriba talla original (Ej: M, 42, 10.5, XL)",
    sizeMappedResult: "Talla Equivalente Resuelta",
    formulaUsed: "Fórmula de correspondencia aplicada",
    customAddMapping: "Registrar regla de correspondencia de tallas",
    customRulesLabel: "Sus reglas de equivalencia de tallaje guardadas",

    // API notices
    liveOFF: "Navegador conectado directamente a OpenFoodFacts",
    offlineFallback: "Servicio OFF: aplicando coeficientes de densidad locales.",
    currencyUpdatedOn: "Cambio calibrado el {date} (Conexión inactiva: tasa de contingencia)"
  }
};
