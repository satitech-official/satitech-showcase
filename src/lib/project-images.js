import { siteConfig } from "@/config/site";
import { getProjectAsset } from "@/config/project-assets";
import { unique } from "@/lib/utils";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function withBasePath(source) {
  if (!source || !basePath || !source.startsWith("/") || source.startsWith("//")) return source;
  return source === basePath || source.startsWith(`${basePath}/`) ? source : `${basePath}${source}`;
}

function isSafeImageSource(source) {
  if (!source || typeof source !== "string") return false;
  if (source.startsWith("/") && !source.startsWith("//")) return true;

  try {
    const url = new URL(source);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function githubSocialPreview(repo) {
  const fullName = repo.full_name || `${siteConfig.githubOrg}/${repo.name}`;
  return `https://opengraph.githubassets.com/sati-tech-${encodeURIComponent(repo.name)}/${fullName}`;
}

export function resolveProjectImages(repo, metadata = {}) {
  const asset = getProjectAsset(repo.name);
  const socialPreview = githubSocialPreview(repo);
  const candidates = [
    metadata.coverImage,
    metadata.cover,
    metadata.liveScreenshot,
    metadata.repositoryImage,
    metadata.readmeImage,
    asset?.cover,
    socialPreview,
  ].map(withBasePath).filter(isSafeImageSource);

  const cover = candidates[0] || "";
  const mobile = [metadata.mobileImage, metadata.mobile].map(withBasePath).find(isSafeImageSource) || "";
  const gallery = unique([
    ...(Array.isArray(metadata.gallery) ? metadata.gallery.map(withBasePath) : []),
    cover,
  ].filter(isSafeImageSource));

  return {
    cover,
    mobile,
    gallery,
    source: cover === asset?.cover ? asset.imageSource : metadata.coverImage || metadata.cover ? "curated" : cover === socialPreview ? "github-social-preview" : "repository",
    hasCustomCover: cover === asset?.cover || Boolean(metadata.coverImage || metadata.cover),
  };
}
