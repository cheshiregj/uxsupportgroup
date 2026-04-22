import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMeta } from "@/seo/pageMeta";

function findOrCreateMeta(attr: "name" | "property", key: string): HTMLMetaElement {
  const metas = document.head.querySelectorAll("meta");
  for (const node of metas) {
    if (node.getAttribute(attr) === key) return node;
  }
  const el = document.createElement("meta");
  el.setAttribute(attr, key);
  document.head.appendChild(el);
  return el;
}

export function DocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description, ogImagePath } = getPageMeta(pathname);
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    const origin = window.location.origin;
    const pageUrl = `${origin}${pathname}`;
    const ogImageUrl = `${origin}${ogImagePath}`;

    findOrCreateMeta("property", "og:title").setAttribute("content", title);
    findOrCreateMeta("property", "og:description").setAttribute("content", description);
    findOrCreateMeta("property", "og:url").setAttribute("content", pageUrl);
    findOrCreateMeta("property", "og:image").setAttribute("content", ogImageUrl);
    findOrCreateMeta("property", "og:type").setAttribute("content", "website");
    findOrCreateMeta("property", "og:site_name").setAttribute("content", "UX Support Group");

    findOrCreateMeta("name", "twitter:card").setAttribute("content", "summary_large_image");
    findOrCreateMeta("name", "twitter:site").setAttribute("content", "@aixux_summit");
    findOrCreateMeta("name", "twitter:title").setAttribute("content", title);
    findOrCreateMeta("name", "twitter:description").setAttribute("content", description);
    findOrCreateMeta("name", "twitter:image").setAttribute("content", ogImageUrl);
  }, [pathname]);

  return null;
}
