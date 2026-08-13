import { getProjectAsset } from "@/config/project-assets";
import { siteConfig } from "@/config/site";
import { unique } from "@/lib/utils";

const LIVE_TIMEOUT = 4000;

function githubPagesCandidate(repo) {
  if (!repo?.has_pages || !repo?.name) return "";
  return `https://${siteConfig.githubOrg}.github.io/${repo.name}/`;
}

function normalizeLiveUrl(value) {
  if (!value || typeof value !== "string") return "";

  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    if (url.hostname === "github.com" || url.hostname.endsWith(".github.com")) return "";
    return url.toString();
  } catch {
    return "";
  }
}

export async function verifyLiveUrl(value) {
  const url = normalizeLiveUrl(value);
  if (!url) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), LIVE_TIMEOUT);

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Range: "bytes=0-2048",
        "User-Agent": "Sati-Tech-Portfolio-Link-Validator",
      },
      next: { revalidate: 21600 },
    });

    return response.status >= 200 && response.status < 400;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function resolveProjectLiveUrl(repo, metadata = {}) {
  const asset = getProjectAsset(repo.name);
  // These curated URLs are checked during the portfolio audit and recorded with
  // a verification date. Do not make the UI depend on a third-party request at
  // render time; a temporary outage must not remove a known-good demo button.
  if (asset?.liveVerified && asset.liveUrl) return asset.liveUrl;

  const candidates = unique([
    repo.homepage,
    metadata.liveUrl,
    metadata.cmsLiveUrl,
    githubPagesCandidate(repo),
  ].map(normalizeLiveUrl));

  for (const candidate of candidates) {
    if (await verifyLiveUrl(candidate)) return candidate;
  }

  return "";
}
