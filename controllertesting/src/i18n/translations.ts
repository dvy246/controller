/**
 * translations.ts — Master i18n Dictionary for ControllerTesting.com
 * Supports: en, es, de, fr, ja, pt, ko, ru, zh-tw, it
 */

import enDict from "./locales/en.json";
import esDict from "./locales/es.json";
import deDict from "./locales/de.json";
import frDict from "./locales/fr.json";
import jaDict from "./locales/ja.json";
import ptDict from "./locales/pt.json";
import koDict from "./locales/ko.json";
import ruDict from "./locales/ru.json";
import zh_twDict from "./locales/zh-tw.json";
import itDict from "./locales/it.json";

export const languages = {
  en: "🇺🇸 English",
  es: "🇪🇸 Español",
  de: "🇩🇪 Deutsch",
  fr: "🇫🇷 Français",
  ja: "🇯🇵 日本語",
  pt: "🇧🇷 Português",
  ko: "🇰🇷 한국어",
  ru: "🇷🇺 Русский",
  "zh-tw": "🇹🇼 繁體中文",
  it: "🇮🇹 Italiano",
} as const;

export const defaultLang = "en" as const;

export const ui = {
  en: enDict,
  es: esDict,
  de: deDict,
  fr: frDict,
  ja: jaDict,
  pt: ptDict,
  ko: koDict,
  ru: ruDict,
  "zh-tw": zh_twDict,
  it: itDict,
} as const;

export type SupportedLanguage = keyof typeof languages;
export type TranslationKey = keyof typeof enDict;
