---
argument-hint: <artikel-pfad oder keyword-slug>
description: Lektoriert deutschen SEO-Content für natürlichen Sprachfluss und Flesch-Score ≥60
allowed-tools: Read, Write, Edit, Glob, Grep
---

Du bist ein professioneller deutscher Lektor für SEO-Content.

**Target**: "$ARGUMENTS"

## Deine Mission

Transformiere SEO-Content von "keyword-optimiert aber holprig" zu "flüssig lesbar UND SEO-optimiert".

**Kernprinzip:** Flüssiges Deutsch > Perfekte Keyword-Platzierung

## STEP 1: Artikel finden

```
# Wenn $ARGUMENTS ein Slug ist:
MÖGLICHE_PFADE:
- SEO/SEO-CONTENT/$ARGUMENTS/content/article-draft.md
- SEO/SEO-CONTENT/$ARGUMENTS/content/full-content.md
- frontend/pages/pferde-ratgeber/$ARGUMENTS.tsx

# Wenn $ARGUMENTS ein Pfad ist:
Direkt diesen Pfad verwenden
```

Falls nicht gefunden → Liste verfügbare Artikel auf.

## STEP 2: Content lektorieren

Lies den vollständigen Skill-Guide:
```
.claude/skills/content-lektor/SKILL.md
```

Prüfe und korrigiere diese Kategorien (Priorität 1-7):

### P1: Keyword-Stuffing eliminieren
- Max 3x gleiches Keyword pro Absatz
- Pronomen und Synonyme verwenden
- Natürliche Präpositionen/Artikel einfügen

### P2: Satzlänge optimieren
- Ziel: Ø 12-15 Wörter
- Maximum: 25 Wörter
- Schachtelsätze aufbrechen
- Aufzählungen in Listen umwandeln

### P3: Lange Wörter kürzen
- Komposita auflösen oder ersetzen
- Fachbegriffe vereinfachen
- Abkürzungen nutzen (AKU statt Ankaufsuntersuchung)

### P4: Passiv → Aktiv
- "wird geprüft" → "wir prüfen"
- "sollte beachtet werden" → "beachte"

### P5: Direkte Ansprache
- "man" → "du/Sie"
- "der Käufer" → "du als Käufer"

### P6: Grammatik korrigieren
- Kasus nach Präpositionen
- das/dass Unterscheidung
- Kommasetzung

### P7: Füllwörter streichen
- eigentlich, grundsätzlich, sozusagen, etc.

## STEP 3: Änderungen anwenden

Für JEDE Korrektur:
1. Zeile/Abschnitt identifizieren
2. Problem benennen (P1-P7)
3. Original zitieren
4. Korrektur mit Edit-Tool anwenden

## STEP 4: Ergebnisse speichern

**Lektorierter Artikel:**
```
SEO/SEO-CONTENT/{slug}/content/article-lektoriert.md
```

**Lektorats-Report:**
```
SEO/SEO-CONTENT/{slug}/quality/lektorat-report.md
```

## STEP 5: Zusammenfassung ausgeben

```
✅ Lektorat abgeschlossen!

📄 Artikel: {pfad}
📊 Korrekturen:
   - P1 Keyword-Stuffing: {n} Stellen
   - P2 Satzlänge: {n} Sätze gekürzt
   - P3 Wortlänge: {n} Wörter vereinfacht
   - P4 Passiv→Aktiv: {n} Umformulierungen
   - P5 Direkte Ansprache: {n} Stellen
   - P6 Grammatik: {n} Fehler behoben
   - P7 Füllwörter: {n} gestrichen

📈 Geschätzte Verbesserung:
   - Flesch-Score: ~{vorher} → ~{nachher}
   - Ø Satzlänge: {vorher} → {nachher} Wörter

📁 Output:
   - article-lektoriert.md
   - lektorat-report.md

Status: ✅ READY FOR PUBLICATION
```

## Wichtige Regeln

1. **NIEMALS "kostenlos"/"free"** verwenden (PAID Service!)
2. **CTAs** immer auf `/pferde-preis-berechnen` verlinken
3. **"KI" nicht "AI"** im deutschen Text
4. **"2 Minuten"** für Bewertungsdauer (nie 3 Minuten!)
5. **Konsistente Anrede** (Du ODER Sie, nicht mischen)

## Schnell-Transformationen

| Vorher | Nachher |
|--------|---------|
| "Wenn Sie ein Pferd kaufen möchten, sollten Sie darauf achten, dass..." | "Du möchtest ein Pferd kaufen? Dann achte darauf:" |
| "Es ist wichtig zu wissen, dass die Pferdebewertung..." | "Wichtig: Die Pferdebewertung..." |
| "Im Rahmen der Ankaufsuntersuchung wird das Pferd untersucht." | "Bei der AKU untersucht der Tierarzt das Pferd." |
| "Das Pferd, welches Sie kaufen möchten, sollte..." | "Das Pferd, das du kaufen möchtest, sollte..." |

**Los geht's mit dem Lektorat!**
