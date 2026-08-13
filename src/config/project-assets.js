// Curated portfolio media and independently checked deployment URLs.
// Repository names are the stable merge key shared with the GitHub REST API.

const githubPages = (repoName) => `https://satitech-official.github.io/${repoName}/`;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const featured = new Set([
  "indian-cloth-store-premium-website",
  "ysda-website",
  "mac-studio-website",
  "anuroop-premium-fashion-website",
  "the-good-bite-premium-website",
  "DS-Agro-website",
]);

const projectCatalog = [
  ["saapna-resort-premium-website", "saapna-resort.webp", ""],
  ["indian-cloth-store-premium-website", "indian-cloth-store.webp", githubPages("indian-cloth-store-premium-website")],
  ["the-good-bite-premium-website", "the-good-bite.webp", githubPages("the-good-bite-premium-website")],
  ["mac-studio-website", "mac-studio.webp", githubPages("mac-studio-website")],
  ["ysda-website", "ysda-football-academy.webp", "https://ysdasports.com/"],
  ["royal-planning-house-premium-website", "royal-planning-house.webp", githubPages("royal-planning-house-premium-website")],
  ["DS-Agro-website", "ds-agro-resort.webp", githubPages("DS-Agro-website")],
  ["anamika-sarees-website", "anamika-sarees.webp", githubPages("anamika-sarees-website")],
  ["green-car-decor-premium-website", "green-car-decor.webp", githubPages("green-car-decor-premium-website")],
  ["rr-tourism-website", "rr-tourism.webp", githubPages("rr-tourism-website")],
  ["venus-event-decor-premium-website", "venus-event-decor.webp", githubPages("venus-event-decor-premium-website")],
  ["roof-and-more-website", "roof-and-more.webp", githubPages("roof-and-more-website")],
  ["trioak-furniture-website", "trioak-furniture.webp", githubPages("trioak-furniture-website")],
  ["celebration-life-indore", "celebrate-life-indore.webp", githubPages("celebration-life-indore")],
  ["complete-dental-studio-premium-website", "complete-dental-studio.webp", githubPages("complete-dental-studio-premium-website")],
  ["infinity-dance-studio-premium-website", "infinity-dance-studio.webp", githubPages("infinity-dance-studio-premium-website")],
  ["satitech-showcase", "satitech-showcase.webp", githubPages("satitech-showcase")],
  ["chaat-adda-cafe-site", "chaat-adda-cafe.webp", githubPages("chaat-adda-cafe-site")],
  ["indias-got-latent-site", "indias-got-latent.webp", githubPages("indias-got-latent-site")],
  ["luxury-catering-website", "luxury-catering.webp", githubPages("luxury-catering-website")],
  ["the-homespun-gifts-premium-website", "homespun-gifts.webp", githubPages("the-homespun-gifts-premium-website")],
  ["ASHWAMEDH--RESORT", "ashwamedh-resort.webp", githubPages("ASHWAMEDH--RESORT")],
  ["anuroop-premium-fashion-website", "anuroop-fashion.webp", githubPages("anuroop-premium-fashion-website")],
];

export const projectAssets = Object.fromEntries(
  projectCatalog.map(([repoName, imageFile, liveUrl]) => [
    repoName,
    {
      cover: `${basePath}/images/projects/${imageFile}`,
      gallery: [`${basePath}/images/projects/${imageFile}`],
      liveUrl,
      liveVerified: Boolean(liveUrl),
      verifiedAt: "2026-08-13",
      imageSource: liveUrl ? "verified-live-screenshot" : "verified-repository-screenshot",
      featured: featured.has(repoName),
    },
  ])
);

export function getProjectAsset(repoName) {
  return projectAssets[repoName] || null;
}
