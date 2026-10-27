# zerxapp.com

Website of ZerX, the Mac and Windows disk-space utility, with a reserved Sparkle update feed. The app itself is closed source; releases and the issue tracker live in [VPNsafe/zerx-releases](https://github.com/VPNsafe/zerx-releases). Static HTML + one CSS file + one tiny script, served by GitHub Pages from `main` / root. The spec lives in the app repository: `docs/TZ-site.md`.

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
windows/index.html      EN Windows beta download, installation and limits
ru/windows/index.html   RU Windows beta
changelog/index.html    EN platform-specific release notes
ru/changelog/index.html RU release notes
download/index.html     EN Mac/Windows choice, no redirect
ru/download/index.html  RU Mac/Windows choice, no redirect
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
Product pages exist in both `/` (EN) and `/ru/` with paired `hreflang` and `canonical` links. The generic 404 page is English. The site never links to the private app repository.

## Release and content updates

Mac public release: **0.1.6 (7)**, available free on the [Mac App Store](https://apps.apple.com/app/id6817715716), released October 15, 2026. macOS 13+, Apple Silicon and Intel. No direct DMG is offered on this site.

The deploy agent owns `download/index.html`, `changelog/index.html` and `appcast.xml`. Windows public beta: **0.1.3**, Windows 11 x64, first public Windows release October 27, 2026. Distribution is the `windows-v0.1.3` GitHub prerelease ZIP and SHA256 sidecar in the public release repository. Keep it a prerelease with `make_latest=false`; it must not replace the Mac channel. Exact final ZIP checksum is shown on both Windows pages and must match the published file. No separate .NET installation is required. Three ZerX app files and Install.ps1 are Certum-signed and timestamped; Install.cmd is a plain launcher and the ZIP is not an EXE/MSI installer. SmartScreen may still warn.

For App Store releases, update the download link/release notes. For Windows, update the paired Windows pages and platform selection. Do not populate or rewrite the Sparkle feed for either channel. Site content belongs to site-dev and must reflect each shipped platform, with Mac-only settings and deletion rules explicitly scoped to Mac. ZX-037 authorizes local deploy preparation of download/changelog before QA/security; only deploy publishes. The user-requested release update supersedes the original prelaunch wording in `docs/TZ-site.md`.

Before publishing: compare access, cleanup and signing claims with verified source/artifact evidence; review EN/RU pages; run local link, CSP, metadata and no-redirect checks; then follow QA → security → deploy. The owner authorized ZX-037 publication. Deploy must verify the published ZIP SHA256, Windows GitHub prerelease status, live platform pages and Mac App Store CTA. A queued Pages run is not proof of publication. appcast.xml must remain byte-identical (SHA256 69f23d9752aa71190fa11dc76d51421b25fb82e9f98fc44600ddaab34b371217).

No screenshots are currently shown. Add only actual, reviewed product captures. Social previews use `assets/icon-1024.png`; the legacy `og.png` is not used because its safety slogan is too absolute.

## Local check

```bash
python3 -m http.server 8080
# then in another terminal
for p in / /ru/ /privacy/ /ru/privacy/ /windows/ /ru/windows/ /changelog/ /ru/changelog/ /download/ /ru/download/ /appcast.xml /404.html; do
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

## October 27, 2026 — Windows beta

Added paired Windows installation, signature, checksum, cleanup and limitation pages, home Windows CTAs, explicit platform choice without automatic redirects, and localized changelog. Preserved Mac App Store 0.1.6 access and scoped macOS-only settings and permanent deletion. No screenshots, trackers, external assets or scripts added. appcast.xml stays unchanged.

## 27 октября 2026 — Windows бета

На сайте две независимые версии: Mac 0.1.6 из App Store и Windows 0.1.3 бета для Windows 11 x64. Страницы Windows, выбора загрузки и истории версий доступны на русском и английском. Автоопределения платформы и редиректа нет. Windows: распаковать ZIP и запустить Install.cmd; отдельная установка .NET не требуется. Подписаны три файла ZerX и Install.ps1, а не ZIP или Install.cmd; предупреждения SmartScreen возможны. Очистка только выбранных старых Temp и поддерживаемого HTTP-кэша в Корзину, без предвыбора. Перед публикацией обязательны независимые QA/security; публикует только deploy. После публикации проверить SHA256 публичного ZIP, страницы EN/RU и ссылку Mac App Store. appcast.xml не изменять.
