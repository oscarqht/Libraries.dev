import { useEffect, useState } from "react";

export type SiteTheme = "light" | "dark";

/* The page's resolved theme: <html data-theme>, which the inline script in
   each page's <head> sets before first paint and site.js keeps in sync
   (Appearance menu, OS changes, other tabs). Library components that take
   an explicit theme prop are handed this so they flip with the page. */
export function readSiteTheme(): SiteTheme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function useSiteTheme(): SiteTheme {
  const [theme, setTheme] = useState<SiteTheme>(readSiteTheme);
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(readSiteTheme());
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    sync();
    return () => mo.disconnect();
  }, []);
  return theme;
}
