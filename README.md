# zerxapp.com

Website of ZerX, the macOS disk-space utility, with a reserved Sparkle update feed. The app itself is closed source; releases and the issue tracker live in [VPNsafe/zerx-releases](https://github.com/VPNsafe/zerx-releases). Static HTML + one CSS file + one tiny script, served by GitHub Pages from `main` / root. The spec lives in the app repository: `docs/TZ-site.md`.

## Layout

```
index.html              EN home
ru/index.html           RU home
privacy/index.html      EN privacy
ru/privacy/index.html   RU privacy
safety/index.html       EN: deletion rules and limits
ru/safety/index.html    RU
support/index.html      EN support and installation
ru/support/index.html   RU support and installation
changelog/index.html    release notes (EN only)
download/index.html     shared EN/RU Mac App Store redirect and visible download link
appcast.xml             reserved empty Sparkle feed; not used by the App Store app
404.html                served by Pages for unknown paths
assets/style.css        the only stylesheet, no build step
assets/site.js          reserved copy-button helper; not loaded by current pages
assets/                 logo.png, icon-1024.png, og.png
favicon.ico, favicon-16.png, favicon-32.png, apple-touch-icon.png
robots.txt, sitemap.xml, CNAME, .nojekyll
```

Rules: no external requests of any kind (no CDN, fonts, analytics, iframes), every page carries a
`Content-Security-Policy` meta tag without `unsafe-inline`, so no inline `style=` or `<script>` blocks.
Every page exists in both `/` (EN) and `/ru/` with `hreflang` and `canonical` links, except
`changelog` (English-only) and `download` (shared English/Russian). The site never links to the private app repository.

## Release and content updates

Public release: **0.1.6 (7)**, available free on the [Mac App Store](https://apps.apple.com/app/id6817715716), released October 15, 2026. macOS 13+, Apple Silicon and Intel. No direct DMG is offered on this site.

The deploy agent owns `download/index.html`, `changelog/index.html` and `appcast.xml`. For App Store releases, update the download link/release notes; do not populate the Sparkle feed or promise a direct release. Site content belongs to site-dev and must reflect the shipped App Store app, not the Direct target or old prelaunch spec. The user-requested release update supersedes the original prelaunch wording in `docs/TZ-site.md`.

Before publishing: verify public Apple listing, compare access and deletion claims with source, review EN/RU pages, run link/metadata checks, then follow QA → security → deploy. Publish only after user authorization.

No screenshots are currently shown. Add only actual, reviewed product captures. Social previews use `assets/icon-1024.png`; the legacy `og.png` is not used because its safety slogan is too absolute.

## Local check

```bash
python3 -m http.server 8080
# then in another terminal
for p in / /ru/ /privacy/ /ru/privacy/ /changelog/ /download/ /appcast.xml /404.html; do
  printf '%-16s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8080$p)"
done
grep -rhoE 'https?://[^"<) ]+' --include=*.html --include=*.xml . | sort -u   # review ordinary outbound links separately from asset requests; no external assets are loaded
```

## Hosting

GitHub Pages, "Deploy from a branch", `main` / `/ (root)`, custom domain `zerxapp.com` (file `CNAME`),
"Enforce HTTPS" on once DNS has propagated. Also add `zerxapp.com` under GitHub → Settings → Pages → Verified domains for the
`VPNsafe` account, so the domain cannot be claimed by another Pages site if this repository is ever renamed or removed. DNS at the registrar:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
AAAA  @    2606:50c0:8000::153
AAAA  @    2606:50c0:8001::153
AAAA  @    2606:50c0:8002::153
AAAA  @    2606:50c0:8003::153
CNAME www  vpnsafe.github.io
```

Check: `dig +short zerxapp.com` shows the four A records; `curl -sI https://zerxapp.com/appcast.xml` returns `200` with an XML content type and no redirect.

## September 29, 2026 — App Store preparation

Added EN/RU support pages, local data retention/deletion details, accurate sandbox and permanent-deletion descriptions, support navigation and sitemap entries. External privacy/license links are ordinary links, not background requests. Public support email supplied by the owner: support@techdatacloud.org (listed on EN/RU support and privacy pages).

## October 15, 2026 — Public App Store release

Replaced prelaunch copy with the public App Store link. EN/RU pages describe startup-disk selection, optional Full Disk Access, unreadable areas and home-limited deletion. Removed blanket safety/cache claims and future direct-release promises; corrected Google Drive cache handling and added specific safety limits. Support documents installation, permissions and feedback; privacy reflects the shipped App Store version. No analytics or external assets added.
