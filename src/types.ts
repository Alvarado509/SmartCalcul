/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'fr' | 'en' | 'es';

export type Page = 'home' | 'performance' | 'loan' | 'size' | 'kitchen' | 'distance' | 'percent' | 'about' | 'contact';

export interface HistoryItem {
  id: string;
  timestamp: string;
  module: 'performance' | 'loan' | 'size' | 'kitchen' | 'distance' | 'percent';
  moduleLabel: string;
  expression: string; // e.g., "150 EUR = 162.75 USD"
  details?: string;
}

export interface CustomConversionItem {
  id: string;
  category: 'currency' | 'size' | 'kitchen' | 'distance';
  name: string; // Ingredient name or unit name
  factor: number; // Conversion coefficient relative to base unit
  baseUnit?: string; // e.g. "g" or "m"
  symbol?: string; // e.g. "CUST"
  countryOrStandard?: string; // For sizing / custom category countries
}

export interface SizingMapping {
  id: string;
  category: string; // apparel category text input
  sourceStandard: string; // e.g., "US"
  targetStandard: string; // e.g., "FR"
  sourceSize: string; // e.g., "M"
  targetSize: string; // e.g., "42"
}
