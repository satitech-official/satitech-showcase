export function cn(...classes) {
  return classes.flat().filter(Boolean).join(" ");
}

export function humanizeRepoName(name = "") {
  return String(name)
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bWebsite\b/g, "")
    .replace(/\bPremium\b/g, "")
    .trim();
}

export function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(date) {
  if (!date) return "Recently";
  try {
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
  } catch {
    return "Recently";
  }
}

export function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}

export function truncate(value = "", length = 150) {
  if (!value || value.length <= length) return value || "";
  return `${value.slice(0, length).trim()}…`;
}

export function isExternalUrl(href = "") {
  return /^https?:\/\//i.test(href);
}

export function absoluteUrl(path = "/", base = "") {
  try {
    return new URL(path, base).toString();
  } catch {
    return path;
  }
}

export function getInitials(title = "Sati Tech") {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "ST";
}
