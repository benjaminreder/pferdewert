# SEO Audit Checkliste - PferdeWert.de

## Priorität 1 (Sofort prüfen)

| # | Aufgabe | Status | Ergebnis |
|---|---------|--------|----------|
| 1 | Hast du eine robots.txt-Datei? | OK | robots.txt vorhanden, erlaubt Crawling, blockiert korrekt /api, /_next, /admin, /ergebnis. Sitemap referenziert. |
| 4 | Hast du eine XML-Sitemap? | OK | sitemap.xml vorhanden mit 20 URLs, lastmod-Tags, priority und changefreq. |
| 7 | Sind deine XML-Sitemaps bei Google Webmaster Tools eingereicht? | MANUELL | Bitte in GSC prüfen ob Sitemap eingereicht ist. |
| 8 | Sind deine XML-Sitemaps bei Bing Webmaster Tools eingereicht? | MANUELL | Bitte in Bing Webmaster Tools prüfen. |
| 36 | Hast du die IndexNow / Bing API bei jedem Inhaltsupdate angepingt? | DONE | IndexNow implementiert: `npm run indexnow` oder `npm run sitemap:ping` (Sitemap + Ping). Key-File deployed. |
| 56 | Hast du alle bestehenden Erwähnungen deiner Brand gesichtet? | MANUELL | Manuell zu prüfen (Google Alerts, Brand24 o.ä.). |
| 58 | Hast du dein offizielles Marken-Konto registriert? | MANUELL | Manuell zu prüfen (Reddit, Foren etc.). |
| 59 | Hast du alle Fälle von Falsch- & Fehlinformationen über deine Brand gesichtet? | MANUELL | Manuell zu prüfen. |
| 63 | Überwachst du aktiv das Sentiment deiner Brand Mentions? | MANUELL | Manuell zu prüfen - Tool-basiertes Monitoring empfohlen. |
| 74 | Hast du eine llms.txt-Datei? | DONE | llms.txt erstellt in public/llms.txt mit allen Seiten, Beschreibungen und Links. |
| 75 | Ist deine llms.txt-Datei richtig formatiert? | DONE | Markdown-Format mit Heading, Beschreibung, kategorisierten Links (Kern, Ratgeber, Commercial, Über uns). |

## Priorität 2

| # | Aufgabe | Status | Ergebnis |
|---|---------|--------|----------|
| 5 | Verwendest du lastmod-Tags in deiner XML-Sitemap? | | |
| 6 | Sind Bilder/Videos in deiner XML-Sitemap eingetragen? | | |
| 19 | Nutzt du eine stringente Überschriftenstruktur? | | |
| 22 | Ist der Kontrast zwischen Schrift und Hintergrund ausreichend? | | |
| 25 | Zeigst du Siegel, Zertifikate und Logos an? | | |
| 29 | Verwendest du ein Inhaltsverzeichnis mit Anchor-Links? | | |
| 31 | Veröffentlichst du Unternehmens-/Produktneuigkeiten? | | |
| 40 | Hast du Markenprofile in allen relevanten sozialen Medien? | | |
| 41 | Hast du Markenprofile auf UGC-Plattformen? | | |
| 51 | Unternehmensprofile in lokalen Verzeichnissen? | | |
| 52 | Unternehmensprofile in überregionalen Verzeichnissen? | | |
| 80 | Sind Veröffentlichungs-/Überprüfungsdaten sichtbar? | | |
| 81 | Klickbares Inhaltsverzeichnis? | | |
| 83 | tl;dr-Block zu Beginn der Inhalte? | | |

## Priorität 3

| # | Aufgabe | Status | Ergebnis |
|---|---------|--------|----------|
| 9 | HTTPS mit HSTS? | | |
| 10 | Organisationsschema mit sameAs-Links? | | |
| 11 | Schema-Markup für kommerzielle Seiten? | | |
| 13 | Core Web Vitals Mobile UND Desktop? | | |
| 15 | Author-Schema auf Blogbeiträgen? | | |
| 20 | Regelmäßig Zwischenüberschriften? | | |
| 21 | Ausreichende Schriftgröße (min. 16px/24px)? | | |
| 23 | Bilder und Grafiken zur Auflockerung? | | |
| 30 | FAQs auf wichtigen URLs? | | |
| 34 | Autor inkl. Autorenprofil auf Artikeln? | | |
| 35 | Autoren mit ProfilePage-Schema? | | |
| 42 | Konsistente Markenidentität? | | |
| 43 | Konsistente Markenprofile (NAP)? | | |
| 49 | Handelskammern/Verbände-Einträge? | | |
| 50 | Branchenverzeichnisse? | | |
| 53 | Prozess für PR-Anfragen? | | |
| 60 | Fehlinformationen angegangen? | | |
| 64 | Prozess für aktive Kommunikation? | | |
| 67 | Lokale Medien-Gastbeiträge? | | |
| 68 | Zusammenarbeit mit Hochschulen? | | |
| 69 | Lokale Veranstaltungen sponsern? | | |
| 70 | Lokale NGOs/Sportvereine unterstützen? | | |
| 79 | Wichtigste Seiten in letzten 6 Monaten aktualisiert? | | |
| 82 | Jedes Kapitel beantwortet einen Micro-Intent? | | |
| 84 | Einfach scanbares Layout? | | |
| 85 | Chunkable Textstruktur? | | |
| 66 | Influencer-Angebote (Social Media)? | | |
| 68 | LinkedIn-Influencer (B2B)? | | |

## Priorität 4

| # | Aufgabe | Status | Ergebnis |
|---|---------|--------|----------|
| 12 | Ladezeit unter 2 Sekunden? | | |
| 16 | Sinnvolle Seitenstrukturierung? | | |
| 17 | Intuitive Navigation? | | |
| 18 | Einfach lesbares Layout? | | |
| 24 | Bewertungen & Reviews anzeigen? | | |
| 39 | Google Business-Profil umfassend? | | |
| 54 | Prozess für Podcast-Interviews? | | |
| 55 | Prozess für Gastartikel? | | |
| 61 | Aktiv in relevanten Foren/Subreddits? | | |
| 62 | Kunden ermutigt, Erfahrungen zu teilen? | | |
| 72 | Crawlen LLMs deine Website (Logfiles)? | | |
| 73 | Ohne JS alle relevanten Infos im Quellcode? | | |
| 76 | Aktuelle Informationen? | | |
| 77 | Tiefe und umfassende Informationen? | | |

## Priorität 5

| # | Aufgabe | Status | Ergebnis |
|---|---------|--------|----------|
| 2 | Erlaubt robots.txt Suchmaschinen das Crawlen? | | |
| 3 | Sind alle relevanten URLs indexierbar? | | |
| 14 | Mobilfreundlich und responsiv? | | |
| 26 | Kernthemen ebenso gut abgedeckt wie Wettbewerber? | | |
| 27 | Großteil der URLs hochwertig und relevant? | | |
| 28 | Großteil der Inhalte einzigartig? | | |
| 32 | Inhalte basierend auf First-Party-Daten? | | |
| 33 | Erfahrungsbasierter Inhalt? | | |
| 37 | Eigene Marketingkanäle nutzen? | | |
| 38 | Google Business-Profil vorhanden? | | |
| 44 | Strukturiert Bewertungen sammeln? | | |
| 45 | Bewertungen auf mehr als einer Plattform? | | |
| 46 | Monitoring Bewertungen & Sentiment? | | |
| 47 | So viele Drittanbieterbewertungen wie Wettbewerber? | | |
| 48 | Bewertungen gleichwertig/besser als Wettbewerber? | | |
| 65 | Aktiv Partner rekrutieren? | | |
| 67 | YouTube-Influencer? | | |
| 66 | Beziehungen für Cross-Promotion? | | |
| 71 | robots.txt erlaubt LLMs/Agenten? | | |
| 78 | Einzigartige Informationen? | | |
