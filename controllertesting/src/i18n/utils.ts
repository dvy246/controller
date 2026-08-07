/**
 * utils.ts — Helper utilities for Astro i18n
 */

import { ui, defaultLang, languages } from "./translations";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedUrl(url: URL, lang: keyof typeof languages) {
  const currentLang = getLangFromUrl(url);
  let pathname = url.pathname;

  if (currentLang !== defaultLang) {
    pathname = pathname.replace(`/${currentLang}`, "");
  }

  if (lang === defaultLang) {
    return pathname || "/";
  }

  return `/${lang}${pathname.startsWith("/") ? pathname : "/" + pathname}`;
}
