/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Shirt, Plus, Search, Check, HelpCircle } from "lucide-react";
import { Language, HistoryItem, SizingMapping } from "../types";
import { COUNTRIES } from "../data/countries";

export interface SizingStandard {
  code: string;
  labelFr: string;
  labelEn: string;
  labelEs: string;
  placeholder: string;
}

export interface CategoryConfig {
  id: string;
  nameFr: string;
  nameEn: string;
  nameEs: string;
  defaultSrc: string;
  defaultTgt: string;
  defaultInput: string;
  table: any[];
  standards: SizingStandard[];
}

export const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    id: "shirts",
    nameFr: "Hauts / Chemises",
    nameEn: "Shirts & Tops",
    nameEs: "Partes de arriba e Camisas",
    defaultSrc: "INT",
    defaultTgt: "EU",
    defaultInput: "M",
    table: [
      { INT: "XS",  EU: 36, US: 14.0, UK: 14.0, JP: 36 },
      { INT: "S",   EU: 38, US: 14.5, UK: 14.5, JP: 38 },
      { INT: "M",   EU: 40, US: 15.0, UK: 15.0, JP: 40 },
      { INT: "L",   EU: 42, US: 15.5, UK: 15.5, JP: 42 },
      { INT: "XL",  EU: 44, US: 16.0, UK: 16.0, JP: 44 },
      { INT: "XXL", EU: 48, US: 17.0, UK: 17.0, JP: 48 },
      { INT: "3XL", EU: 52, US: 18.0, UK: 18.0, JP: 52 },
    ],
    standards: [
      { code: "INT", labelFr: "Intl. Alpha (XS à 3XL)", labelEn: "Intl. Alpha (XS to 3XL)", labelEs: "Intl. Alfa (XS a 3XL)", placeholder: "ex: M" },
      { code: "EU", labelFr: "Europe Col / Poitrine (36 à 52)", labelEn: "Europe Collar / Chest (36 to 52)", labelEs: "Europa Cuello / Pecho (36 a 52)", placeholder: "ex: 40" },
      { code: "US", labelFr: "US Col en pouces", labelEn: "US Collar inches", labelEs: "US Cuello pulgadas", placeholder: "ex: 15" },
      { code: "UK", labelFr: "UK Col standard", labelEn: "UK Collar standard", labelEs: "UK Cuello estándar", placeholder: "ex: 15" },
      { code: "JP", labelFr: "Japon / Asie", labelEn: "Japan / Asia", labelEs: "Japón / Asia", placeholder: "ex: 40" }
    ]
  },
  {
    id: "pants",
    nameFr: "Pantalons / Jeans",
    nameEn: "Pants & Jeans",
    nameEs: "Pantalones y Vaqueros",
    defaultSrc: "US",
    defaultTgt: "EU",
    defaultInput: "31",
    table: [
      { US: 26, EU: 36, UK: 26, JP: 66, INT: "XS" },
      { US: 28, EU: 38, UK: 28, JP: 71, INT: "S" },
      { US: 30, EU: 40, UK: 30, JP: 76, INT: "M" },
      { US: 32, EU: 42, UK: 32, JP: 81, INT: "L" },
      { US: 34, EU: 44, UK: 34, JP: 86, INT: "XL" },
      { US: 36, EU: 46, UK: 36, JP: 91, INT: "XXL" },
      { US: 38, EU: 48, UK: 38, JP: 96, INT: "3XL" },
      { US: 40, EU: 50, UK: 40, JP: 101, INT: "4XL" },
      { US: 42, EU: 52, UK: 42, JP: 106, INT: "5XL" },
    ],
    standards: [
      { code: "US", labelFr: "US taille en pouces (waist in.)", labelEn: "US waist in inches", labelEs: "US pulgadas cintura", placeholder: "ex: 31" },
      { code: "EU", labelFr: "Europe / FR standard (36 à 52)", labelEn: "Europe / French (36 to 52)", labelEs: "Europa / Francia (36 a 52)", placeholder: "ex: 41" },
      { code: "UK", labelFr: "UK standard en pouces", labelEn: "UK standard inches", labelEs: "UK pulgadas", placeholder: "ex: 31" },
      { code: "JP", labelFr: "Japon taille (taille en cm)", labelEn: "Japan waist (cm)", labelEs: "Japón cintura (cm)", placeholder: "ex: 78" },
      { code: "INT", labelFr: "International Alpha (S, M, L...)", labelEn: "International Alpha (S, M, L...)", labelEs: "Internacional Alfa (S, M, L...)", placeholder: "ex: L" }
    ]
  },
  {
    id: "suits",
    nameFr: "Costumes & Vestes",
    nameEn: "Suits & Blazers",
    nameEs: "Trajes y Chaquetas",
    defaultSrc: "US",
    defaultTgt: "EU",
    defaultInput: "40",
    table: [
      { US: 34, UK: 34, EU: 44, JP: 34, INT: "XS" },
      { US: 36, UK: 36, EU: 46, JP: 36, INT: "S" },
      { US: 38, UK: 38, EU: 48, JP: 38, INT: "M" },
      { US: 40, UK: 40, EU: 50, JP: 40, INT: "L" },
      { US: 42, UK: 42, EU: 52, JP: 42, INT: "XL" },
      { US: 44, UK: 44, EU: 54, JP: 44, INT: "XXL" },
      { US: 46, UK: 46, EU: 56, JP: 46, INT: "3XL" },
      { US: 48, UK: 48, EU: 58, JP: 48, INT: "4XL" },
      { US: 50, UK: 50, EU: 60, JP: 50, INT: "5XL" },
    ],
    standards: [
      { code: "US", labelFr: "US poitrine en pouces (US chest)", labelEn: "US chest in inches", labelEs: "US pecho pulgadas", placeholder: "ex: 40" },
      { code: "UK", labelFr: "UK poitrine en pouces (UK chest)", labelEn: "UK chest in inches", labelEs: "UK pecho pulgadas", placeholder: "ex: 40" },
      { code: "EU", labelFr: "Europe standard (44 à 60)", labelEn: "Europe standard (44 to 60)", labelEs: "Europa estándar (44 a 60)", placeholder: "ex: 50" },
      { code: "JP", labelFr: "Japon taille poitrine", labelEn: "Japan chest size", labelEs: "Japón tamaño de pecho", placeholder: "ex: 40" },
      { code: "INT", labelFr: "International Alpha", labelEn: "International Alpha", labelEs: "Internacional Alfa", placeholder: "ex: L" }
    ]
  },
  {
    id: "shoes_men",
    nameFr: "Chaussures Homme",
    nameEn: "Men's Shoes",
    nameEs: "Calzado de Hombre",
    defaultSrc: "EU",
    defaultTgt: "US",
    defaultInput: "42",
    table: [
      { EU: 39.0, US: 6.0,  UK: 5.5,  JP: 24.5 },
      { EU: 39.5, US: 6.5,  UK: 6.0,  JP: 25.0 },
      { EU: 40.0, US: 7.0,  UK: 6.5,  JP: 25.5 },
      { EU: 41.0, US: 8.0,  UK: 7.5,  JP: 26.0 },
      { EU: 41.5, US: 8.5,  UK: 8.0,  JP: 26.5 },
      { EU: 42.0, US: 9.0,  UK: 8.5,  JP: 27.0 },
      { EU: 42.5, US: 9.5,  UK: 9.0,  JP: 27.5 },
      { EU: 43.0, US: 10.0, UK: 9.5,  JP: 28.0 },
      { EU: 44.0, US: 11.0, UK: 10.5, JP: 29.0 },
      { EU: 44.5, US: 11.5, UK: 11.0, JP: 29.5 },
      { EU: 45.0, US: 12.0, UK: 11.5, JP: 30.0 },
      { EU: 46.0, US: 13.0, UK: 12.5, JP: 31.0 },
    ],
    standards: [
      { code: "EU", labelFr: "Pointure Europe (EU size)", labelEn: "Europe shoe size (EU)", labelEs: "Europa número de calzado", placeholder: "ex: 42" },
      { code: "US", labelFr: "Pointure US Homme (US Men)", labelEn: "US Men shoe size", labelEs: "US Hombre número calzado", placeholder: "ex: 9" },
      { code: "UK", labelFr: "Pointure UK Homme (UK Men)", labelEn: "UK Men shoe size", labelEs: "UK Hombre número calzado", placeholder: "ex: 8.5" },
      { code: "JP", labelFr: "Japon Longueur de pied (cm)", labelEn: "Japan foot length (cm)", labelEs: "Japón largo de pie (cm)", placeholder: "ex: 27" }
    ]
  },
  {
    id: "shoes_women",
    nameFr: "Chaussures Femme",
    nameEn: "Women's Shoes",
    nameEs: "Calzado de Mujer",
    defaultSrc: "EU",
    defaultTgt: "US",
    defaultInput: "38",
    table: [
      { EU: 35.0, US: 5.0,  UK: 3.0,  JP: 21.0 },
      { EU: 36.0, US: 6.0,  UK: 4.0,  JP: 22.0 },
      { EU: 36.5, US: 6.5,  UK: 4.5,  JP: 22.5 },
      { EU: 37.0, US: 7.0,  UK: 5.0,  JP: 23.0 },
      { EU: 38.0, US: 7.5,  UK: 5.5,  JP: 23.5 },
      { EU: 38.5, US: 8.0,  UK: 6.0,  JP: 24.0 },
      { EU: 39.0, US: 8.5,  UK: 6.5,  JP: 24.5 },
      { EU: 40.0, US: 9.0,  UK: 7.0,  JP: 25.0 },
      { EU: 41.0, US: 9.5,  UK: 7.5,  JP: 25.5 },
      { EU: 42.0, US: 10.5, UK: 8.5,  JP: 26.5 },
    ],
    standards: [
      { code: "EU", labelFr: "Pointure Europe (EU size)", labelEn: "Europe shoe size (EU)", labelEs: "Europa número de calzado", placeholder: "ex: 38" },
      { code: "US", labelFr: "Pointure US Femme (US Women)", labelEn: "US Women shoe size", labelEs: "US Mujer número calzado", placeholder: "ex: 7.5" },
      { code: "UK", labelFr: "Pointure UK Femme (UK Women)", labelEn: "UK Women shoe size", labelEs: "UK Mujer número calzado", placeholder: "ex: 5.5" },
      { code: "JP", labelFr: "Japon Longueur de pied (cm)", labelEn: "Japan foot length (cm)", labelEs: "Japón largo de pie (cm)", placeholder: "ex: 23.5" }
    ]
  },
  {
    id: "dresses_women",
    nameFr: "Robes Femme",
    nameEn: "Women's Dresses",
    nameEs: "Vestidos de Mujer",
    defaultSrc: "US",
    defaultTgt: "EU",
    defaultInput: "6",
    table: [
      { US: 0, EU: 32 },
      { US: 2, EU: 34 },
      { US: 4, EU: 36 },
      { US: 6, EU: 38 },
      { US: 8, EU: 40 },
      { US: 10, EU: 42 },
      { US: 12, EU: 44 },
      { US: 14, EU: 46 },
      { US: 16, EU: 48 },
      { US: 18, EU: 50 },
    ],
    standards: [
      { code: "US", labelFr: "Taille US Robe (0 à 18)", labelEn: "US Dress Size (0 to 18)", labelEs: "Talla US Vestido (0 a 18)", placeholder: "ex: 6" },
      { code: "EU", labelFr: "Taille Europe Robe (32 à 50)", labelEn: "Europe Dress Size (32 to 50)", labelEs: "Talla Europa Vestido (32 a 50)", placeholder: "ex: 38" }
    ]
  },
  {
    id: "tops_women",
    nameFr: "Hauts / T-shirts Femme",
    nameEn: "Women's Tops & T-shirts",
    nameEs: "Tops y Camisetas de Mujer",
    defaultSrc: "INT",
    defaultTgt: "EU",
    defaultInput: "M",
    table: [
      { INT: "XS", EU: 34 },
      { INT: "S", EU: 36 },
      { INT: "M", EU: 38 },
      { INT: "L", EU: 40 },
      { INT: "XL", EU: 44 },
    ],
    standards: [
      { code: "INT", labelFr: "International (XS à XL)", labelEn: "International (XS to XL)", labelEs: "Internacional (XS a XL)", placeholder: "ex: M" },
      { code: "EU", labelFr: "Europe Hauts (34 à 44)", labelEn: "Europe Tops (34 to 44)", labelEs: "Europa Tops (34 a 44)", placeholder: "ex: 38" }
    ]
  },
  {
    id: "skirts_women",
    nameFr: "Jupes Femme",
    nameEn: "Women's Skirts",
    nameEs: "Faldas de Mujer",
    defaultSrc: "US",
    defaultTgt: "EU",
    defaultInput: "6",
    table: [
      { US: 0, EU: 34 },
      { US: 2, EU: 36 },
      { US: 4, EU: 38 },
      { US: 6, EU: 40 },
      { US: 8, EU: 42 },
      { US: 10, EU: 44 },
      { US: 12, EU: 46 },
      { US: 14, EU: 48 },
      { US: 16, EU: 48 },
    ],
    standards: [
      { code: "US", labelFr: "Taille US Jupe (0 à 16)", labelEn: "US Skirt Size (0 to 16)", labelEs: "Talla US Falda (0 a 16)", placeholder: "ex: 6" },
      { code: "EU", labelFr: "Taille Europe Jupe (34 à 48)", labelEn: "Europe Skirt Size (34 to 48)", labelEs: "Talla Europa Falda (34 a 48)", placeholder: "ex: 40" }
    ]
  }
];

function getNormalizedCategory(cat: string): string {
  const norm = cat.toLowerCase().trim();
  
  if (["shirts", "pants", "suits", "shoes_men", "shoes_women", "dresses_women", "tops_women", "skirts_women"].includes(norm)) {
    return norm;
  }

  // Women's Dresses matching (robe, dress, vestido)
  if (norm.includes("robe") || norm.includes("dress") || norm.includes("vestido")) {
    return "dresses_women";
  }

  // Women's Skirts matching (jupe, skirt, falda)
  if (norm.includes("jupe") || norm.includes("skirt") || norm.includes("falda")) {
    return "skirts_women";
  }

  // Women's Tops / T-shirts (haut, top, t-shirt, camiseta, camisa, blusa with women keyword)
  if (
    (norm.includes("femme") || norm.includes("women") || norm.includes("mujer") || norm.includes("dama")) &&
    (norm.includes("haut") || norm.includes("top") || norm.includes("shirt") || norm.includes("camiseta") || norm.includes("camisa") || norm.includes("blusa"))
  ) {
    return "tops_women";
  }

  // Women's Shoes matching (French, Spanish, English) - Checked BEFORE Men's Shoes because "women" contains "men"
  if (
    (norm.includes("femme") || norm.includes("mujer") || norm.includes("donna") || norm.includes("women")) && 
    (norm.includes("chaussure") || norm.includes("calzado") || norm.includes("shoe") || norm.includes("zapato"))
  ) {
    return "shoes_women";
  }

  // Men's Shoes matching (French, Spanish, English)
  if (
    (norm.includes("homme") || norm.includes("hombre") || norm.includes("uomo") || norm.includes("men")) && 
    (norm.includes("chaussure") || norm.includes("calzado") || norm.includes("shoe") || norm.includes("zapato"))
  ) {
    return "shoes_men";
  }

  // Wildcard Shoes matching
  if (
    norm.includes("chaussure") || 
    norm.includes("shoe") || 
    norm.includes("calzado") || 
    norm.includes("zapato") || 
    norm.includes("sandalia") || 
    norm.includes("bota")
  ) {
    return "shoes_men";
  }

  // Suits
  if (
    norm.includes("costume") || 
    norm.includes("suit") || 
    norm.includes("veste") || 
    norm.includes("jacket") || 
    norm.includes("traje") || 
    norm.includes("chaqueta") || 
    norm.includes("americana")
  ) {
    return "suits";
  }

  // Shirts and Tops
  if (
    norm.includes("chemise") || 
    norm.includes("shirt") || 
    norm.includes("t-shirt") || 
    norm.includes("tshirt") || 
    norm.includes("camiseta") || 
    norm.includes("camisa") || 
    norm.includes("blusa") || 
    norm.includes("top") || 
    norm.includes("arriba") || 
    norm.includes("haut")
  ) {
    return "shirts";
  }

  // Pants & Jeans
  if (
    norm.includes("pantalon") || 
    norm.includes("pants") || 
    norm.includes("jeans") || 
    norm.includes("jean") || 
    norm.includes("vaquero") || 
    norm.includes("pantalones")
  ) {
    return "pants";
  }

  return "shirts";
}

function mapSizingStandard(std: string): string {
  const code = std.trim().toUpperCase();
  const equivalents: Record<string, string> = {
    "FR": "EU",
    "IT": "EU",
    "BR": "EU",
    "MX": "US",
    "CN": "JP",
    "AU": "UK"
  };
  return equivalents[code] || code;
}

interface SizingConverterProps {
  lang: Language;
  onAddHistory: (item: HistoryItem) => void;
}

export default function SizingConverter({ lang, onAddHistory }: SizingConverterProps) {
  // Load registered sizing mapping rules from LocalStorage
  const [customRules, setCustomRules] = useState<SizingMapping[]>(() => {
    try {
      const stored = localStorage.getItem("smartcalcul_size_mappings");
      if (stored) return JSON.parse(stored);
      
      const baseline: SizingMapping[] = [
        { id: "seed_1", category: "Chaussures Femme", sourceStandard: "EU", targetStandard: "US", sourceSize: "38", targetSize: "7.5" },
        { id: "seed_2", category: "Chaussures Femme", sourceStandard: "EU", targetStandard: "US", sourceSize: "37", targetSize: "6.5" },
        { id: "seed_3", category: "Chaussures Homme", sourceStandard: "EU", targetStandard: "US", sourceSize: "42", targetSize: "9.5" },
        { id: "seed_4", category: "Costume", sourceStandard: "EU", targetStandard: "US", sourceSize: "50", targetSize: "40" }
      ];
      return baseline;
    } catch {
      return [];
    }
  });

  const [categoryQuery, setCategoryQuery] = useState(
    lang === "fr" ? "Chaussures Homme" : lang === "es" ? "Calzado de Hombre" : "Men's Shoes"
  );
  const [sourceQuery, setSourceQuery] = useState("EU");
  const [targetQuery, setTargetQuery] = useState("US");
  const [sizeInput, setSizeInput] = useState("42");

  // Resolve config from selection
  const activeConfig = useMemo(() => {
    const norm = getNormalizedCategory(categoryQuery);
    const found = CATEGORY_CONFIGS.find(cfg => {
      return cfg.id === norm || 
        cfg.nameFr.toLowerCase() === categoryQuery.toLowerCase() ||
        cfg.nameEn.toLowerCase() === categoryQuery.toLowerCase() ||
        cfg.nameEs.toLowerCase() === categoryQuery.toLowerCase();
    });
    return found || CATEGORY_CONFIGS[0];
  }, [categoryQuery]);

  // Sync standards automatically when category changes
  useEffect(() => {
    const isSrcValid = activeConfig.standards.some(s => s.code === sourceQuery.toUpperCase());
    if (!isSrcValid) {
      setSourceQuery(activeConfig.defaultSrc);
    }
    const isTgtValid = activeConfig.standards.some(s => s.code === targetQuery.toUpperCase());
    if (!isTgtValid) {
      setTargetQuery(activeConfig.defaultTgt);
    }
    // Set a matching helpful default size when changing profile to avoid blank/incompatible numbers
    if (sizeInput === "42" || sizeInput === "100" || sizeInput === "38" || sizeInput === "40" || sizeInput === "31") {
      setSizeInput(activeConfig.defaultInput);
    }
  }, [activeConfig]);

  // Autocomplete menu helpers
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [targetDropdownOpen, setTargetDropdownOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  // Suggested categories list
  const categoriesList = useMemo(() => {
    const list = lang === "fr"
      ? ["Chaussures Homme", "Chaussures Femme", "Costumes & Vestes", "Hauts / Chemises", "Pantalons / Jeans", "Robes Femme", "Hauts / T-shirts Femme", "Jupes Femme"]
      : lang === "es"
      ? ["Calzado de Hombre", "Calzado de Mujer", "Trajes y Chaquetas", "Partes de arriba e Camisas", "Pantalones y Vaqueros", "Vestidos de Mujer", "Tops y Camisetas de Mujer", "Faldas de Mujer"]
      : ["Men's Shoes", "Women's Shoes", "Suits & Blazers", "Shirts & Tops", "Pants & Jeans", "Women's Dresses", "Women's Tops & T-shirts", "Women's Skirts"];
    customRules.forEach(r => {
      if (!list.includes(r.category)) list.push(r.category);
    });
    return list;
  }, [customRules, lang]);

  const filteredCategories = useMemo(() => {
    const q = categoryQuery.toLowerCase().trim();
    if (!q) return categoriesList;
    return categoriesList.filter(c => c.toLowerCase().includes(q));
  }, [categoryQuery, categoriesList]);

  // Click outside listener for all three dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
      if (sourceRef.current && !sourceRef.current.contains(event.target as Node)) {
        setSourceDropdownOpen(false);
      }
      if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
        setTargetDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Country Flag Emoji Helper
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    try {
      return String.fromCodePoint(...codePoints);
    } catch {
      return "🏳️";
    }
  };

  // Filter countries for source and target searching (ISO database)
  const filteredSourceCountries = useMemo(() => {
    const q = sourceQuery.toUpperCase().trim();
    if (!q) return COUNTRIES.slice(0, 40); // Display popular subset of countries initially to keep rendering clean
    return COUNTRIES.filter(
      (c) =>
        c.code.includes(q) ||
        c.sizing.includes(q) ||
        c.nameFr.toUpperCase().includes(q) ||
        c.nameEn.toUpperCase().includes(q) ||
        c.nameEs.toUpperCase().includes(q)
    );
  }, [sourceQuery]);

  const filteredTargetCountries = useMemo(() => {
    const q = targetQuery.toUpperCase().trim();
    if (!q) return COUNTRIES.slice(0, 40);
    return COUNTRIES.filter(
      (c) =>
        c.code.includes(q) ||
        c.sizing.includes(q) ||
        c.nameFr.toUpperCase().includes(q) ||
        c.nameEn.toUpperCase().includes(q) ||
        c.nameEs.toUpperCase().includes(q)
    );
  }, [targetQuery]);

  // Resolve country to its standard label
  const resolvedSourceStandard = useMemo(() => {
    const val = sourceQuery.trim().toUpperCase();
    const foundCountry = COUNTRIES.find(c => 
      c.code === val || 
      c.sizing === val ||
      c.nameFr.toUpperCase() === val ||
      c.nameEn.toUpperCase() === val ||
      c.nameEs.toUpperCase() === val
    );
    return foundCountry ? foundCountry.sizing : val || activeConfig.defaultSrc;
  }, [sourceQuery, activeConfig]);

  const resolvedTargetStandard = useMemo(() => {
    const val = targetQuery.trim().toUpperCase();
    const foundCountry = COUNTRIES.find(c => 
      c.code === val || 
      c.sizing === val ||
      c.nameFr.toUpperCase() === val ||
      c.nameEn.toUpperCase() === val ||
      c.nameEs.toUpperCase() === val
    );
    return foundCountry ? foundCountry.sizing : val || activeConfig.defaultTgt;
  }, [targetQuery, activeConfig]);

  // Custom mapping triggers
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [newSrcStd, setNewSrcStd] = useState("EU");
  const [newTgtStd, setNewTgtStd] = useState("US");
  const [newSrcSize, setNewSrcSize] = useState("");
  const [newTgtSize, setNewTgtSize] = useState("");

  const resolvedSizeResult = useMemo(() => {
    const normalizedInput = sizeInput.trim().toUpperCase();
    const rawSrcStd = resolvedSourceStandard.trim().toUpperCase();
    const rawTgtStd = resolvedTargetStandard.trim().toUpperCase();
    
    const srcStd = mapSizingStandard(rawSrcStd);
    const tgtStd = mapSizingStandard(rawTgtStd);

    if (!normalizedInput) {
      return {
        value: "—",
        isFallback: true,
        method: lang === 'fr' 
          ? "Saisissez une taille pour commencer la conversion." 
          : lang === 'es' 
          ? "Introduzca una talla para iniciar la conversión." 
          : "Enter a size to begin conversion."
      };
    }
    
    // 1. Exact custom-defined mapping rule check
    const exactMatch = customRules.find(
      (rule) =>
        getNormalizedCategory(rule.category) === activeConfig.id &&
        rule.sourceStandard.toUpperCase() === srcStd &&
        rule.targetStandard.toUpperCase() === tgtStd &&
        rule.sourceSize.toUpperCase() === normalizedInput
    );

    if (exactMatch) {
      return {
        value: exactMatch.targetSize,
        isFallback: false,
        method: lang === 'fr' ? "Équivalence trouvée dans vos règles personnalisées." : lang === 'es' ? "Equivalencia guardada personalizada." : "Sizing match found in your custom rules."
      };
    }

    // Boundary check validation for new women's categories (Robes, Hauts/T-shirts, Jupes)
    const categoryId = activeConfig.id;
    const isWomensNewCat = ["dresses_women", "tops_women", "skirts_women"].includes(categoryId);

    if (isWomensNewCat) {
      let isInputOutOfRange = false;
      
      const parseValToCoordsLocal = (valStr: string, std: string): number | null => {
        const clean = valStr.toUpperCase();
        if (clean === "XS" || clean === "3XS") return 2.0;
        if (clean === "S" || clean === "2XS") return 3.0;
        if (clean === "M") return 4.0;
        if (clean === "L") return 5.0;
        if (clean === "XL") return 6.0;
        if (clean === "XXL" || clean === "2XL") return 7.0;
        if (clean === "3XL") return 8.0;
        if (clean === "4XL") return 9.0;
        if (clean === "5XL") return 10.0;
        const num = Number(valStr.replace(",", "."));
        return isNaN(num) ? null : num;
      };

      const parsedNum = parseValToCoordsLocal(normalizedInput, srcStd);

      if (parsedNum === null) {
        isInputOutOfRange = true;
      } else {
        if (categoryId === "dresses_women") {
          if (srcStd === "US") {
            if (parsedNum < 0 || parsedNum > 18) {
              isInputOutOfRange = true;
            }
          } else if (srcStd === "EU") {
            if (parsedNum < 32 || parsedNum > 50) {
              isInputOutOfRange = true;
            }
          } else {
            isInputOutOfRange = true;
          }
        } else if (categoryId === "tops_women") {
          if (srcStd === "INT") {
            if (parsedNum < 2.0 || parsedNum > 6.0) {
              isInputOutOfRange = true;
            }
          } else if (srcStd === "EU") {
            if (parsedNum < 34 || parsedNum > 44) {
              isInputOutOfRange = true;
            }
          } else {
            isInputOutOfRange = true;
          }
        } else if (categoryId === "skirts_women") {
          if (srcStd === "US") {
            if (parsedNum < 0 || parsedNum > 16) {
              isInputOutOfRange = true;
            }
          } else if (srcStd === "EU") {
            if (parsedNum < 34 || parsedNum > 48) {
              isInputOutOfRange = true;
            }
          } else {
            isInputOutOfRange = true;
          }
        }
      }

      if (isInputOutOfRange) {
        return {
          value: "—",
          isFallback: true,
          method: lang === "fr" 
            ? "Taille hors limites standards" 
            : lang === "es" 
            ? "Talla fuera de límites estándar" 
            : "Standard range exceeded"
        };
      }
    }

    // 2. Exact match check inside the database table row
    const table = activeConfig.table;
    const exactRow = table.find((row: any) => {
      const val = row[srcStd];
      if (val === undefined || val === null) return false;
      return val.toString().toUpperCase() === normalizedInput;
    });

    if (exactRow) {
      const targetVal = exactRow[tgtStd];
      if (targetVal !== undefined && targetVal !== null) {
        return {
          value: targetVal.toString(),
          isFallback: false,
          method: lang === "fr" 
            ? `Correspondance de taille exacte d'après les standards officiels.` 
            : lang === "es" 
            ? `Equivalencia exacta según los estándares oficiales.` 
            : `Exact sizing match found according to standard tables.`,
        };
      }
    }

    // 3. Mathematical mapping & interpolation mechanism
    const parseValToCoords = (valStr: string, std: string): number | null => {
      const clean = valStr.toUpperCase();
      if (clean === "XS" || clean === "3XS") return 2.0;
      if (clean === "S" || clean === "2XS") return 3.0;
      if (clean === "M") return 4.0;
      if (clean === "L") return 5.0;
      if (clean === "XL") return 6.0;
      if (clean === "XXL" || clean === "2XL") return 7.0;
      if (clean === "3XL") return 8.0;
      if (clean === "4XL") return 9.0;
      if (clean === "5XL") return 10.0;

      const num = Number(valStr.replace(",", "."));
      return isNaN(num) ? null : num;
    };

    const getTargetRawValueStr = (valNum: number, stdStr: string): string => {
      if (stdStr === "INT") {
        const targetInt = Math.round(valNum);
        if (targetInt <= 2) return "XS";
        if (targetInt === 3) return "S";
        if (targetInt === 4) return "M";
        if (targetInt === 5) return "L";
        if (targetInt === 6) return "XL";
        if (targetInt === 7) return "XXL";
        if (targetInt === 8) return "3XL";
        if (targetInt === 9) return "4XL";
        return "5XL";
      }
      return valNum % 1 === 0 ? valNum.toString() : valNum.toFixed(1);
    };

    const rowValToNumber = (row: any, stdStr: string): number | null => {
      const val = row[stdStr];
      if (val === undefined || val === null) return null;
      return parseValToCoords(val.toString(), stdStr);
    };

    const inputNumeric = parseValToCoords(normalizedInput, srcStd);

    if (inputNumeric !== null) {
      const validRows = table
        .map((row: any) => {
          const srcNum = rowValToNumber(row, srcStd);
          const tgtNum = rowValToNumber(row, tgtStd);
          return { row, srcNum, tgtNum };
        })
        .filter((item) => item.srcNum !== null && item.tgtNum !== null) as { row: any; srcNum: number; tgtNum: number }[];

      if (validRows.length >= 2) {
        validRows.sort((a, b) => a.srcNum - b.srcNum);

        const minSrc = validRows[0].srcNum;
        const maxSrc = validRows[validRows.length - 1].srcNum;

        if (inputNumeric >= minSrc && inputNumeric <= maxSrc) {
          let idxA = 0;
          let idxB = 0;
          for (let i = 0; i < validRows.length - 1; i++) {
            if (inputNumeric >= validRows[i].srcNum && inputNumeric <= validRows[i + 1].srcNum) {
              idxA = i;
              idxB = i + 1;
              break;
            }
          }

          const a = validRows[idxA];
          const b = validRows[idxB];

          if (a.srcNum === b.srcNum) {
            const displayVal = getTargetRawValueStr(a.tgtNum, tgtStd);
            return {
              value: displayVal,
              isFallback: false,
              method: lang === "fr" 
                ? "Calculé par équivalence linéaire d'étapes." 
                : lang === "es" 
                ? "Calculado por correspondencia exacta." 
                : "Calculated via exact point.",
            };
          }

          const ratio = (inputNumeric - a.srcNum) / (b.srcNum - a.srcNum);
          const targetNumeric = a.tgtNum + ratio * (b.tgtNum - a.tgtNum);
          const displayVal = getTargetRawValueStr(targetNumeric, tgtStd);

          const aSrcDisplay = String(a.row[srcStd]);
          const bSrcDisplay = String(b.row[srcStd]);
          const aTgtDisplay = String(a.row[tgtStd]);
          const bTgtDisplay = String(b.row[tgtStd]);

          return {
            value: displayVal,
            isFallback: false,
            method: lang === "fr"
              ? `Calculé par interpolation linéaire : ${normalizedInput} ${srcStd} suggère la taille la plus proche (${displayVal} ${tgtStd}), située entre la taille ${aSrcDisplay} ${srcStd} (équivalent à ${aTgtDisplay} ${tgtStd}) et la taille ${bSrcDisplay} ${srcStd} (équivalent à ${bTgtDisplay} ${tgtStd}).`
              : lang === "es"
              ? `Interpolación lineal: ${normalizedInput} ${srcStd} sugiere la talla más cercana (${displayVal} ${tgtStd}), situada entre la talla ${aSrcDisplay} ${srcStd} (equivale a ${aTgtDisplay} ${tgtStd}) y la talla ${bSrcDisplay} ${srcStd} (equivale a ${bTgtDisplay} ${tgtStd}).`
              : `Linear interpolation: ${normalizedInput} ${srcStd} suggests nearest size (${displayVal} ${tgtStd}), between size ${aSrcDisplay} ${srcStd} (equivalent to ${aTgtDisplay} ${tgtStd}) and size ${bSrcDisplay} ${srcStd} (equivalent to ${bTgtDisplay} ${tgtStd}).`
          };
        } else {
          // Extrapolate
          const isLower = inputNumeric < minSrc;
          const extreme = isLower ? validRows[0] : validRows[validRows.length - 1];
          const adjacent = isLower ? validRows[1] : validRows[validRows.length - 2];

          const ratioExtrap = (inputNumeric - extreme.srcNum) / (adjacent.srcNum - extreme.srcNum);
          const targetNumeric = extreme.tgtNum + ratioExtrap * (adjacent.tgtNum - extreme.tgtNum);
          const displayVal = getTargetRawValueStr(targetNumeric, tgtStd);

          return {
            value: displayVal,
            isFallback: false,
            method: lang === "fr"
              ? `Extrapolation calculée : ${normalizedInput} ${srcStd} s'extrapole en dehors des tables de données standards (proche de ${extreme.row[srcStd]} ${srcStd}).`
              : lang === "es"
              ? `Extrapolación calculada: ${normalizedInput} ${srcStd} se extrapola fuera del límite oficial (cerca de ${extreme.row[srcStd]} ${srcStd}).`
              : `Calculated extrapolation: ${normalizedInput} ${srcStd} extrapolated outside official grids (closest to ${extreme.row[srcStd]} ${srcStd}).`
          };
        }
      }
    }

    return {
      value: "—",
      isFallback: true,
      method: lang === 'fr' 
        ? "Taille non répertoriée dans les standards officiels. Référez-vous au guide du fabricant." 
        : lang === 'es' 
        ? "Talla no especificada en los estándares oficiales. Consulte la guía del fabricante." 
        : "Size not listed in official global standards. Refer to manufacturing guide."
    };
  }, [sizeInput, categoryQuery, resolvedSourceStandard, resolvedTargetStandard, customRules, lang, activeConfig]);

  const triggerHistoryPost = () => {
    if (sizeInput && resolvedSizeResult.value !== "—") {
      onAddHistory({
        id: `size_hist_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        module: "size",
        moduleLabel: lang === "fr" ? "Tailles" : lang === "es" ? "Tallajes" : "Sizing",
        expression: `${categoryQuery} : ${sizeInput} [${resolvedSourceStandard}] → ${resolvedSizeResult.value} [${resolvedTargetStandard}]`,
        details: `${resolvedSizeResult.method}`
      });
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      triggerHistoryPost();
    }, 1500);
    return () => clearTimeout(handler);
  }, [sizeInput, categoryQuery, resolvedSourceStandard, resolvedTargetStandard, resolvedSizeResult.value]);

  const handleSaveCustomRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat || !newSrcSize || !newTgtSize) return;

    const newItem: SizingMapping = {
      id: `rule_${Date.now()}`,
      category: newCat,
      sourceStandard: newSrcStd.toUpperCase(),
      targetStandard: newTgtStd.toUpperCase(),
      sourceSize: newSrcSize,
      targetSize: newTgtSize
    };

    const updated = [...customRules, newItem];
    setCustomRules(updated);
    localStorage.setItem("smartcalcul_size_mappings", JSON.stringify(updated));

    setCategoryQuery(newCat);
    setSourceQuery(newSrcStd);
    setTargetQuery(newTgtStd);
    setSizeInput(newSrcSize);

    setNewCat("");
    setNewSrcSize("");
    setNewTgtSize("");
    setShowAddModal(false);
  };

  const handleDeleteRule = (id: string) => {
    const updated = customRules.filter(r => r.id !== id);
    setCustomRules(updated);
    localStorage.setItem("smartcalcul_size_mappings", JSON.stringify(updated));
  };

  const t = lang === 'fr' ? {
    title: "Convertisseur de tailles universel",
    categoryLabel: "Catégorie de vêtement / mode",
    fromLabel: "Standard ou Pays source",
    toLabel: "Standard ou Pays cible",
    sizeInputLabel: "Taille de départ à convertir",
    addBtn: "Ajouter une règle d'équivalence personnalisée",
    addTitle: "Saisir liaison de tailles",
    cancel: "Annuler",
    save: "Enregistrer la règle",
    explainSuggest: "Changer de catégorie :",
    placeholderInput: "Saisissez ou recherchez...",
    resultLabel: "ÉQUIVALENCE DE TAILLE",
    reasoningLabel: "Analyse du moteur de calcul :",
    customRulesTitle: "Règles d'équivalence personnalisées existantes",
    deleteBtn: "Supprimer",
    freeTextEntry: "Saisie libre activée",
    placeholderCatModal: "Catégorie, ex: Mocassins",
    placeholderFromModal: "De (ex: EU)",
    placeholderToModal: "À (ex: US)",
    placeholderSrcSizeModal: "Taille init.",
    placeholderTgtSizeModal: "Taille cible",
    placeholderMainSize: "ex: 42 ou L",
    quickSelectLabel: "Raccourcis de standards :"
  } : lang === 'es' ? {
    title: "Convertidor de Tallas Universal",
    categoryLabel: "Categoría de prenda / calzado",
    fromLabel: "Estándar o País origen",
    toLabel: "Estándar o País destino",
    sizeInputLabel: "Talla inicial a convertir",
    addBtn: "Registrar nueva regla de equivalencia",
    addTitle: "Crear regla de tallas",
    cancel: "Cancelar",
    save: "Guardar regla",
    explainSuggest: "Cambiar categoría:",
    placeholderInput: "Escriba o filtre...",
    resultLabel: "EQUIVALENCIA DE TALLA",
    reasoningLabel: "Análisis del motor de cálculo:",
    customRulesTitle: "Reglas de equivalencia personalizadas existentes",
    deleteBtn: "Eliminar",
    freeTextEntry: "Entrada libre activa",
    placeholderCatModal: "Categoría, ej: Mocasines",
    placeholderFromModal: "De (ej: EU)",
    placeholderToModal: "A (ej: US)",
    placeholderSrcSizeModal: "Talla init.",
    placeholderTgtSizeModal: "Talla destino",
    placeholderMainSize: "ej: 42 o L",
    quickSelectLabel: "Atajos estándar:"
  } : {
    title: "Universal Sizing & Clothing Converter",
    categoryLabel: "Garment or Shoe Category",
    fromLabel: "Source Country or Standard",
    toLabel: "Target Country or Standard",
    sizeInputLabel: "Starting Size to Convert",
    addBtn: "Add custom size mapping rule",
    addTitle: "Add Size Equivalence rule",
    cancel: "Cancel",
    save: "Save Mapped Rule",
    explainSuggest: "Switch Category:",
    placeholderInput: "Type or match garment profiles...",
    resultLabel: "SIZING EQUIVALENCE RESULT",
    reasoningLabel: "Calculation Engine Analysis:",
    customRulesTitle: "Custom sizing equivalences database",
    deleteBtn: "Remove",
    freeTextEntry: "Free text entry active",
    placeholderCatModal: "Category, e.g. Loafers",
    placeholderFromModal: "From (e.g. EU)",
    placeholderToModal: "To (e.g. US)",
    placeholderSrcSizeModal: "Source size",
    placeholderTgtSizeModal: "Target size",
    placeholderMainSize: "e.g. 42 or L",
    quickSelectLabel: "Quick-switch standards:"
  };

  const dynamicPlaceholder = useMemo(() => {
    const std = activeConfig.standards.find(s => s.code === sourceQuery.toUpperCase());
    return std ? std.placeholder : t.placeholderMainSize;
  }, [activeConfig, sourceQuery, t.placeholderMainSize]);

  const activeSourceLabelStr = useMemo(() => {
    const std = activeConfig.standards.find(s => s.code === sourceQuery.toUpperCase());
    if (!std) return "";
    return lang === 'fr' ? std.labelFr : lang === 'es' ? std.labelEs : std.labelEn;
  }, [activeConfig, sourceQuery, lang]);

  const activeTargetLabelStr = useMemo(() => {
    const std = activeConfig.standards.find(s => s.code === targetQuery.toUpperCase());
    if (!std) return "";
    return lang === 'fr' ? std.labelFr : lang === 'es' ? std.labelEs : std.labelEn;
  }, [activeConfig, targetQuery, lang]);

  return (
    <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 sm:p-10 flex flex-col gap-6 max-w-4xl mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.04)] transition-all duration-300">
      {/* Title */}
      <div className="flex items-center gap-3 border-b border-gray-150 pb-4">
        <Shirt className="w-6 h-6 text-[#FF3B30]" />
        <h3 className="text-xl font-bold text-[#0A0A0A] tracking-tight uppercase">
          {t.title}
        </h3>
      </div>

      {/* CORE Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        {/* Left Inputs block */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Category autocomplete selector */}
          <div className="space-y-1" ref={categoryRef}>
            <label className="text-xs font-semibold text-black uppercase tracking-wider block">
              {t.categoryLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={categoryQuery}
                onChange={(e) => {
                  setCategoryQuery(e.target.value);
                  setCategoryDropdownOpen(true);
                }}
                onFocus={() => setCategoryDropdownOpen(true)}
                placeholder={t.placeholderInput}
                className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-md text-sm font-semibold text-black focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] transition-colors"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />

              {categoryDropdownOpen && (
                <div className="absolute left-0 right-0 top-12 z-50 bg-white border border-[#E6E6E6] rounded-md max-h-48 overflow-y-auto shadow-lg">
                  {filteredCategories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCategoryQuery(c);
                        setCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#FF3B30]/5 text-xs font-semibold text-black flex items-center justify-between border-b border-gray-50 last:border-0 cursor-pointer"
                    >
                      <span>{c}</span>
                      {categoryQuery === c && <Check className="w-3.5 h-3.5 text-[#FF3B30]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Micro suggestions tag list */}
            <div className="space-y-1.5 pt-1 text-[10px] font-bold">
              <span className="text-gray-400 block tracking-wider uppercase">{t.explainSuggest}</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setCategoryQuery(lang === "fr" ? "Hauts / Chemises" : lang === "es" ? "Partes de arriba e Camisas" : "Shirts & Tops")}
                  className={`px-2.5 py-1 border rounded transition-colors cursor-pointer ${activeConfig.id === 'shirts' ? 'bg-[#FF3B30] text-white border-[#FF3B30]' : 'bg-white border-gray-200 text-black hover:border-[#FF3B30]'}`}
                >
                  {lang === 'fr' ? "Hauts/Chemises" : lang === 'es' ? "Partes de arriba / Camisas" : "Shirts/Tops"}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryQuery(lang === "fr" ? "Pantalons / Jeans" : lang === "es" ? "Pantalones y Vaqueros" : "Pants & Jeans")}
                  className={`px-2.5 py-1 border rounded transition-colors cursor-pointer ${activeConfig.id === 'pants' ? 'bg-[#FF3B30] text-white border-[#FF3B30]' : 'bg-white border-gray-200 text-black hover:border-[#FF3B30]'}`}
                >
                  {lang === 'fr' ? "Pantalons/Jeans" : lang === 'es' ? "Pantalones / Vaqueros" : "Pants/Jeans"}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryQuery(lang === "fr" ? "Costumes & Vestes" : lang === "es" ? "Trajes y Chaquetas" : "Suits & Blazers")}
                  className={`px-2.5 py-1 border rounded transition-colors cursor-pointer ${activeConfig.id === 'suits' ? 'bg-[#FF3B30] text-white border-[#FF3B30]' : 'bg-white border-gray-200 text-black hover:border-[#FF3B30]'}`}
                >
                  {lang === 'fr' ? "Costumes" : lang === 'es' ? "Trajes y Chaquetas" : "Suits"}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryQuery(lang === "fr" ? "Chaussures Homme" : lang === "es" ? "Calzado de Hombre" : "Men's Shoes")}
                  className={`px-2.5 py-1 border rounded transition-colors cursor-pointer ${activeConfig.id === 'shoes_men' ? 'bg-[#FF3B30] text-white border-[#FF3B30]' : 'bg-white border-gray-200 text-black hover:border-[#FF3B30]'}`}
                >
                  {lang === 'fr' ? "Souliers Homme" : lang === 'es' ? "Calzado de Hombre" : "Men Shoes"}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryQuery(lang === "fr" ? "Chaussures Femme" : lang === "es" ? "Calzado de Mujer" : "Women's Shoes")}
                  className={`px-2.5 py-1 border rounded transition-colors cursor-pointer ${activeConfig.id === 'shoes_women' ? 'bg-[#FF3B30] text-white border-[#FF3B30]' : 'bg-white border-gray-200 text-black hover:border-[#FF3B30]'}`}
                >
                  {lang === 'fr' ? "Souliers Femme" : lang === 'es' ? "Calzado de Mujer" : "Women Shoes"}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryQuery(lang === "fr" ? "Robes Femme" : lang === "es" ? "Vestidos de Mujer" : "Women's Dresses")}
                  className={`px-2.5 py-1 border rounded transition-colors cursor-pointer ${activeConfig.id === 'dresses_women' ? 'bg-[#FF3B30] text-white border-[#FF3B30]' : 'bg-white border-gray-200 text-black hover:border-[#FF3B30]'}`}
                >
                  {lang === 'fr' ? "Robes Femme" : lang === 'es' ? "Vestidos" : "Dresses"}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryQuery(lang === "fr" ? "Hauts / T-shirts Femme" : lang === "es" ? "Tops y Camisetas de Mujer" : "Women's Tops & T-shirts")}
                  className={`px-2.5 py-1 border rounded transition-colors cursor-pointer ${activeConfig.id === 'tops_women' ? 'bg-[#FF3B30] text-white border-[#FF3B30]' : 'bg-white border-gray-200 text-black hover:border-[#FF3B30]'}`}
                >
                  {lang === 'fr' ? "Hauts Femme" : lang === 'es' ? "Tops Mujer" : "Women Tops"}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryQuery(lang === "fr" ? "Jupes Femme" : lang === "es" ? "Faldas de Mujer" : "Women's Skirts")}
                  className={`px-2.5 py-1 border rounded transition-colors cursor-pointer ${activeConfig.id === 'skirts_women' ? 'bg-[#FF3B30] text-white border-[#FF3B30]' : 'bg-white border-gray-200 text-black hover:border-[#FF3B30]'}`}
                >
                  {lang === 'fr' ? "Jupes Femme" : lang === 'es' ? "Faldas" : "Skirts"}
                </button>
              </div>
            </div>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* SOURCE standard autocomplete with full ISO 3166-1 country lookup */}
            <div className="space-y-1 animate-in fade-in duration-300" ref={sourceRef}>
              <div className="flex flex-wrap justify-between items-baseline text-xs gap-1">
                <label className="font-semibold text-black uppercase tracking-wider">
                  {t.fromLabel}
                </label>
                {activeSourceLabelStr && (
                  <span className="text-[10px] font-bold text-gray-400 capitalize bg-gray-50 px-1.5 py-0.5 border rounded sm:max-w-[200px] max-w-[155px] truncate" title={activeSourceLabelStr}>
                    {activeSourceLabelStr}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={sourceQuery}
                  onChange={(e) => {
                    setSourceQuery(e.target.value);
                    setSourceDropdownOpen(true);
                  }}
                  onFocus={() => setSourceDropdownOpen(true)}
                  placeholder="EU"
                  className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-md text-sm font-semibold text-black focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] transition-colors font-mono"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />

                {sourceDropdownOpen && (
                  <div className="absolute left-0 right-0 top-12 z-50 bg-white border border-[#E6E6E6] rounded-md max-h-56 overflow-y-auto shadow-lg">
                    {filteredSourceCountries.length > 0 ? (
                      filteredSourceCountries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setSourceQuery(c.sizing);
                            setSourceDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-[#FF3B30]/5 text-xs font-semibold text-black flex items-center justify-between border-b border-gray-50 last:border-0 cursor-pointer text-ellipsis overflow-hidden"
                        >
                          <span className="flex items-center gap-2">
                            <span>{getFlagEmoji(c.code)}</span>
                            <span>{lang === "fr" ? c.nameFr : lang === "es" ? c.nameEs : c.nameEn}</span>
                          </span>
                          <span className="text-[#FF3B30] font-mono font-bold uppercase">{c.sizing}</span>
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-xs text-gray-400 font-light italic">
                        {t.freeTextEntry}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quick source selection indicators */}
              <div className="flex flex-wrap gap-1 pt-1">
                {activeConfig.standards.map((std) => (
                  <button
                    key={std.code}
                    type="button"
                    onClick={() => setSourceQuery(std.code)}
                    className={`px-2 py-0.5 border rounded text-[9px] font-extrabold tracking-wide uppercase transition-all cursor-pointer ${
                      sourceQuery.toUpperCase() === std.code
                        ? "bg-[#FF3B30] border-[#FF3B30] text-white"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {std.code}
                  </button>
                ))}
              </div>
            </div>
 
            {/* TARGET standard autocomplete with full ISO 3166-1 country lookup */}
            <div className="space-y-1 animate-in fade-in duration-300" ref={targetRef}>
              <div className="flex flex-wrap justify-between items-baseline text-xs gap-1">
                <label className="font-semibold text-black uppercase tracking-wider">
                  {t.toLabel}
                </label>
                {activeTargetLabelStr && (
                  <span className="text-[10px] font-bold text-gray-400 capitalize bg-gray-50 px-1.5 py-0.5 border rounded sm:max-w-[200px] max-w-[155px] truncate" title={activeTargetLabelStr}>
                    {activeTargetLabelStr}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={targetQuery}
                  onChange={(e) => {
                    setTargetQuery(e.target.value);
                    setTargetDropdownOpen(true);
                  }}
                  onFocus={() => setTargetDropdownOpen(true)}
                  placeholder="US"
                  className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-md text-sm font-semibold text-black focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] transition-colors font-mono"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
 
                {targetDropdownOpen && (
                  <div className="absolute left-0 right-0 top-12 z-50 bg-white border border-[#E6E6E6] rounded-md max-h-56 overflow-y-auto shadow-lg">
                    {filteredTargetCountries.length > 0 ? (
                      filteredTargetCountries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setTargetQuery(c.sizing);
                            setTargetDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-[#FF3B30]/5 text-xs font-semibold text-black flex items-center justify-between border-b border-gray-50 last:border-0 cursor-pointer text-ellipsis overflow-hidden"
                        >
                          <span className="flex items-center gap-2">
                            <span>{getFlagEmoji(c.code)}</span>
                            <span>{lang === "fr" ? c.nameFr : lang === "es" ? c.nameEs : c.nameEn}</span>
                          </span>
                          <span className="text-[#FF3B30] font-mono font-bold uppercase">{c.sizing}</span>
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-xs text-gray-400 font-light italic">
                        {t.freeTextEntry}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quick target selection indicators */}
              <div className="flex flex-wrap gap-1 pt-1">
                {activeConfig.standards.map((std) => (
                  <button
                    key={std.code}
                    type="button"
                    onClick={() => setTargetQuery(std.code)}
                    className={`px-2 py-0.5 border rounded text-[9px] font-extrabold tracking-wide uppercase transition-all cursor-pointer ${
                      targetQuery.toUpperCase() === std.code
                        ? "bg-[#FF3B30] border-[#FF3B30] text-white"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                    }`}
                  >
                    {std.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
 
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-black uppercase tracking-wider block">
              {t.sizeInputLabel}
            </label>
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              placeholder={dynamicPlaceholder}
              className="w-full h-11 px-4 bg-white border border-gray-200 rounded-md text-black text-sm font-bold focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] font-mono transition-colors placeholder:text-gray-300"
            />
          </div>
 
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setNewCat(categoryQuery);
                setNewSrcStd(resolvedSourceStandard);
                setNewTgtStd(resolvedTargetStandard);
                setNewSrcSize(sizeInput);
                setShowAddModal(true);
              }}
              className="text-xs font-bold text-[#FF3B30] hover:text-[#E02D22] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 duration-100"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addBtn}</span>
            </button>
          </div>
 
        </div>
 
        {/* Right Output Layout Card */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between min-h-[180px] hover:border-[#FF3B30] transition-all shadow-xs duration-300 relative overflow-hidden">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 block mb-1">
              {t.resultLabel}
            </span>
            <div className="text-4xl font-extrabold text-[#0A0A0A] font-mono tracking-tight break-all">
              {resolvedSizeResult.value}{' '}
              {resolvedSizeResult.value !== "—" && (
                <span className="text-[#FF3B30] font-black text-2xl uppercase ml-1 block sm:inline-block font-sans">
                  {resolvedTargetStandard}
                </span>
              )}
            </div>
          </div>
 
          <div className={`border-t border-gray-150 pt-4 mt-4 text-xs space-y-1 leading-snug ${resolvedSizeResult.isFallback ? "text-[#FF3B30] font-medium" : "text-gray-500"}`}>
            <span className="font-extrabold text-black block tracking-wide uppercase text-[10px]">
              {t.reasoningLabel}
            </span>
            <p className="font-normal">{resolvedSizeResult.method}</p>
          </div>

          {resolvedSizeResult.isFallback && (
            <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-[#FF3B30]/5 text-[#FF3B30] flex items-center justify-center text-sm" title="Warning">
              ⚠️
            </div>
          )}
        </div>
 
      </div>
 
      {/* RETAINED SIMPLE LIST OF CUSTOM SIZE RULES (White card bordered layouts) */}
      {customRules.length > 0 && (
        <div className="border-t border-gray-150 pt-5 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
            {t.customRulesTitle}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {customRules.map((rule) => (
              <div key={rule.id} className="p-3 bg-white border border-[#E6E6E6] rounded-xl flex items-center justify-between text-xs gap-3 shadow-xs">
                <div className="truncate">
                  <span className="font-extrabold text-gray-400 uppercase tracking-widest text-[9px] block truncate">{rule.category}</span>
                  <span className="text-black font-mono font-bold">{rule.sourceSize} {rule.sourceStandard}</span>
                  <span className="text-gray-400 font-semibold px-2">&rarr;</span>
                  <span className="text-[#FF3B30] font-mono font-bold">{rule.targetSize} {rule.targetStandard}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteRule(rule.id)}
                  className="text-[10px] text-[#FF3B30] hover:underline font-bold"
                >
                  {t.deleteBtn}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
 
      {/* MODAL CONFIG */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveCustomRule}
            className="bg-white border border-[#E6E6E6] rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h4 className="text-sm font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <Shirt className="w-4 h-4 text-[#FF3B30]" />
                {t.addTitle}
              </h4>
            </div>
 
            <div className="space-y-3">
              <input
                type="text"
                required
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                placeholder={t.placeholderCatModal}
                className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-black focus:outline-none focus:border-[#FF3B30]"
              />
 
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newSrcStd}
                  onChange={(e) => setNewSrcStd(e.target.value.toUpperCase())}
                  placeholder={t.placeholderFromModal}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm uppercase text-black font-mono focus:outline-none focus:border-[#FF3B30]"
                />
                <input
                  type="text"
                  required
                  value={newTgtStd}
                  onChange={(e) => setNewTgtStd(e.target.value.toUpperCase())}
                  placeholder={t.placeholderToModal}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm uppercase text-black font-mono focus:outline-none focus:border-[#FF3B30]"
                />
              </div>
 
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newSrcSize}
                  onChange={(e) => setNewSrcSize(e.target.value)}
                  placeholder={t.placeholderSrcSizeModal}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-black font-mono focus:outline-none focus:border-[#FF3B30]"
                />
                <input
                  type="text"
                  required
                  value={newTgtSize}
                  onChange={(e) => setNewTgtSize(e.target.value)}
                  placeholder={t.placeholderTgtSizeModal}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md text-sm text-black font-mono focus:outline-none focus:border-[#FF3B30]"
                />
              </div>
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
