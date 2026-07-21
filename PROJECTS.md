# Sati Technologies Project Registry

This registry tracks projects that are published, under development or waiting for source-code intake.

## Published or connected repositories

| Project | Repository | Classification | Status | Next requirement |
| --- | --- | --- | --- | --- |
| SatiTech Interactive Showcase | `satitech-showcase` | Internal Product | Live | Maintain demos and deployment checks |
| [Sati Technologies Official Website](https://satitech-official.github.io/sati-technologies-website/) | [`sati-technologies-website`](https://github.com/satitech-official/sati-technologies-website) | Official Corporate Website | Published and live | Maintain CI, Pages deployment, and screenshots |
| [Drishti Verma Developer Portfolio](https://satitech-official.github.io/satitech-showcase/demos/drishti-verma-portfolio/) | Hosted in `satitech-showcase` | Sanitized Portfolio Demo | Ready for publication | Verify Pages deployment after merge |
| Chaat Adda Café Experience | `chaat-adda-cafe-site` | Portfolio Demo | Connected | Add approved live URL and screenshots |
| [India’s Got Latent Fan Experience](https://satitech-official.github.io/indias-got-latent-site/) | [`indias-got-latent-site`](https://github.com/satitech-official/indias-got-latent-site) | Unofficial Fan Experience | Published and live | Maintain the disclaimer, Pages deployment, and media review |

## Local Codex projects awaiting GitHub intake

The following known projects require their actual local source folders to be pushed or made accessible before a complete repository can be published:

- Veena Vadini Public School website
- RKP Black Gold Gym website
- Mamaji Jewellers website
- RR Tourism website
- YSDFI sports platform
- YSDA football platform
- Room rental platform
- Sai Mart e-commerce platform
- Restaurant, gym, jewellery, school, tourism and healthcare demo sites

## Intake checklist

Before adding any project to the organization:

1. Confirm the project folder and ownership.
2. Remove `.env`, API keys, tokens, private customer records and generated dependencies.
3. Confirm licensing or permission for logos, photos, videos, fonts and written content.
4. Run lint and production build.
5. Add a project classification and disclaimer.
6. Add screenshots and an approved live demo.
7. Create the repository under `satitech-official`.
8. Open a pull request for review instead of pushing unreviewed work directly to `main`.
9. Add the project to the showcase after the repository and demo are verified.

## Naming convention

Use lowercase kebab-case names that explain the project clearly, for example:

- `veena-vadini-school-website`
- `rkp-black-gold-gym`
- `mamaji-jewellers-website`
- `rr-tourism-website`
- `ysdfi-sports-platform`

Avoid unclear names such as `project-final`, `website-new` or `demo2`.
