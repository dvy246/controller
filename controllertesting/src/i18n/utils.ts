/**
 * utils.ts — Helper utilities for Astro i18n
 */

import { ui, defaultLang, languages } from "./translations";

export function getLangFromUrl(url: URL) {
  const cleanPath = url.pathname.replace(/\.html$/, '');
  const segments = cleanPath.split('/').filter(Boolean);
  const lang = segments[0];
  if (lang && lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedUrl(url: URL, lang: keyof typeof languages, overridePath?: string) {
  const currentLang = getLangFromUrl(url);
  let pathname = overridePath !== undefined ? overridePath : url.pathname;
  // Ensure clean route without .html extension
  pathname = pathname.replace(/\.html$/, '');

  if (currentLang !== defaultLang && overridePath === undefined) {
    pathname = pathname.replace(`/${currentLang}`, "");
  }

  for (const l of Object.keys(languages)) {
    if (pathname.startsWith(`/${l}/`) || pathname === `/${l}`) {
      pathname = pathname.replace(`/${l}`, "");
      break;
    }
  }

  if (pathname === "/" || pathname === "") {
    return lang === defaultLang ? "/" : `/${lang}`;
  }

  const targetPath = pathname.startsWith("/") ? pathname : "/" + pathname;
  const result = lang === defaultLang ? targetPath : `/${lang}${targetPath}`;

  const cleanResult = result.length > 1 && result.endsWith("/") ? result.slice(0, -1) : result;
  return cleanResult.replace(/\.html$/, '');
}

export function l(path: string, currentLang: keyof typeof languages = defaultLang): string {
  if (currentLang === defaultLang) return path;
  if (path === '/' || path === '') return `/${currentLang}`;
  return `/${currentLang}${path.startsWith('/') ? path : '/' + path}`;
}

export const supportedLocales = Object.keys(languages) as (keyof typeof languages)[];
export const nonDefaultLocales = supportedLocales.filter((loc) => loc !== defaultLang);
