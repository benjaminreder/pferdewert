---
name: content-lektor
description: Lektoriert deutschen SEO-Content für natürlichen Sprachfluss und hohen Readability-Score. Korrigiert Keyword-Stuffing, Grammatikfehler und unnatürliche Konstruktionen. Verwenden bei "lektorieren", "deutsch prüfen", "readability verbessern".
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Content-Lektor - Deutsches Sprachlektorat für SEO-Content

Professionelles Lektorat für deutschen SEO-Content mit Fokus auf **natürlichen Sprachfluss** und **optimalen Readability-Score**.

## Kernprinzip

**Flüssiges, korrektes Deutsch > Perfekte Keyword-Platzierung**

Ein Text mit Flesch-Score 70 und natürlichem Sprachfluss rankt besser als ein keyword-gestopfter Text mit Score 35. Google erkennt und bestraft unnatürliche Texte.

---

## Wann diesen Skill verwenden

- Nach SEO-Content-Erstellung (Phase 4/5 des SEO-Workflows)
- Bevor Content publiziert wird
- Bei User-Anfragen: "lektorieren", "deutsch prüfen", "readability verbessern", "text korrigieren"
- Wenn Flesch-Score < 60 festgestellt wurde

## Ziel-Metriken

| Metrik | Ziel | Minimum |
|--------|------|---------|
| **Flesch-Score (DE)** | ≥65 | ≥60 |
| **Durchschnittliche Satzlänge** | 12-15 Wörter | ≤20 Wörter |
| **Maximale Satzlänge** | 20 Wörter | 25 Wörter |
| **Keyword-Dichte** | 0.8-1.5% | ≤2% |

---

## Deutsche Flesch-Formel

```
Flesch-Score (DE) = 180 - ASL - (58.5 × ASW)

ASL = Average Sentence Length (Wörter pro Satz)
ASW = Average Syllables per Word (Silben pro Wort)
```

**Was den Score beeinflusst:**
1. **Satzlänge** (wichtigster Faktor!) - Kürzere Sätze = höherer Score
2. **Wortlänge** - Kürzere Wörter = höherer Score (problematisch bei deutschen Komposita)

---

## Lektorats-Workflow

### STEP 1: Content laden

```
# Mögliche Pfade:
SEO/SEO-CONTENT/{keyword-slug}/content/article-draft.md
SEO/SEO-CONTENT/{keyword-slug}/content/full-content.md
frontend/pages/pferde-ratgeber/{slug}.tsx
```

Falls kein Pfad angegeben, frage nach.

### STEP 2: Analyse durchführen

Prüfe systematisch auf diese Probleme:

---

## Problemkategorien & Korrekturen

### 1. KEYWORD-STUFFING (Kritisch!)

**Erkennungsmuster:**
- Gleiches Keyword >3x in einem Absatz
- Keyword am Satzanfang UND Satzende
- Unnatürliche Keyword-Phrasen ohne Artikel/Präpositionen
- Keyword in aufeinanderfolgenden Sätzen

**Korrektur-Strategien:**

| Problem | Lösung |
|---------|--------|
| Keyword-Wiederholung | Pronomen ("es", "sie", "diese") verwenden |
| Unnatürliche Phrase | Artikel/Präpositionen einfügen |
| Keyword-Häufung | Synonyme und Umschreibungen nutzen |
| Keyword am Satzende | Satz umstellen oder streichen |

**Beispiele:**

```
❌ FALSCH:
"Wenn Sie Pferd kaufen Bayern möchten, ist Pferd kaufen Bayern
eine gute Entscheidung. Pferd kaufen Bayern bietet viele Vorteile."

✅ RICHTIG:
"Sie möchten ein Pferd in Bayern kaufen? Das ist eine gute
Entscheidung. Der Freistaat bietet viele Vorteile für Pferdebesitzer."
```

```
❌ FALSCH:
"Die Pferdebewertung ist wichtig. Eine Pferdebewertung hilft beim
Kauf. Mit einer Pferdebewertung kennen Sie den Wert."

✅ RICHTIG:
"Eine professionelle Pferdebewertung ist wichtig. Sie hilft beim
Kauf und zeigt Ihnen den realistischen Marktwert."
```

**Keyword-Synonyme für PferdeWert-Content:**

| Keyword | Synonyme/Alternativen |
|---------|----------------------|
| Pferd kaufen | Pferdekauf, ein Pferd erwerben, Kauf eines Pferdes |
| Pferdebewertung | Wertermittlung, Pferde-Check, Marktwertanalyse |
| Ankaufsuntersuchung | AKU, tierärztliche Untersuchung, Kaufuntersuchung |
| Kosten | Preis, Ausgaben, Budget, was kostet |
| Pferdepreis | Kaufpreis, Marktwert, Wert des Pferdes |

---

### 2. SATZLÄNGE (Wichtigster Readability-Faktor!)

**Ziel: Durchschnitt 12-15 Wörter, Maximum 20-25 Wörter**

**Erkennungsmuster für zu lange Sätze:**
- Mehr als 2 Kommas im Satz
- Mehrere Nebensätze (erkennbar an: wenn, weil, obwohl, dass, welcher)
- Satz über 2 Zeilen im Editor

**Korrektur-Techniken:**

**a) Schachtelsätze aufbrechen:**
```
❌ FALSCH (38 Wörter):
"Wenn Sie ein Pferd kaufen möchten, das sowohl für Anfänger
geeignet ist als auch über eine solide Ausbildung verfügt,
sollten Sie unbedingt darauf achten, dass Sie eine professionelle
Ankaufsuntersuchung durchführen lassen, bevor Sie den Kaufvertrag
unterschreiben."

✅ RICHTIG (4 Sätze, je ~10 Wörter):
"Sie möchten ein Pferd kaufen? Es soll für Anfänger geeignet
sein und eine gute Ausbildung haben. Dann ist eine AKU Pflicht.
Lassen Sie diese immer vor der Vertragsunterschrift durchführen."
```

**b) Relativsätze auflösen:**
```
❌ FALSCH:
"Das Pferd, welches wir Ihnen empfehlen möchten, ist ein
Warmblut, das sich durch seine Gutmütigkeit auszeichnet."

✅ RICHTIG:
"Wir empfehlen Ihnen dieses Warmblut. Es zeichnet sich durch
seine Gutmütigkeit aus."
```

**c) Aufzählungen in Listen umwandeln:**
```
❌ FALSCH:
"Bei der AKU prüft der Tierarzt den allgemeinen
Gesundheitszustand, die Bewegungsabläufe, die Atemwege,
das Herz-Kreislauf-System sowie die Augen und Zähne."

✅ RICHTIG:
"Bei der AKU prüft der Tierarzt:
- Allgemeine Gesundheit
- Bewegungsabläufe
- Atemwege
- Herz und Kreislauf
- Augen und Zähne"
```

---

### 3. WORTLÄNGE (Deutsche Komposita entschärfen)

**Problem:** Deutsche Komposita haben viele Silben und senken den Flesch-Score.

**Lösung:** Lange Wörter durch kürzere ersetzen oder aufteilen.

| Komplex (vermeiden) | Einfach (bevorzugen) |
|---------------------|----------------------|
| Ankaufsuntersuchung | AKU |
| Pferdebewertung | Pferde-Check |
| Gesundheitszustand | Gesundheit |
| Veterinärmedizinisch | tierärztlich |
| Dokumentation | Nachweis, Unterlagen |
| Qualitätskriterien | Prüfpunkte |
| Marktwertsteigerung | mehr Wert |
| Haltungsbedingungen | wie das Pferd gehalten wird |
| Futtermittelzusammensetzung | was gefüttert wird |
| Leistungsbereitschaft | Motivation, Eifer |

**Technik: Komposita auflösen:**
```
❌ "Die Pferdegesundheitsvorsorgeuntersuchung..."
✅ "Die Vorsorge-Untersuchung für die Gesundheit des Pferdes..."
   Oder besser: "Der jährliche Gesundheits-Check..."
```

---

### 4. PASSIV → AKTIV

**Erkennungsmuster:** "wird/werden" + Partizip II

```
❌ PASSIV:
"Das Pferd wird vom Tierarzt untersucht."
"Die Bewertung wird in 2 Minuten erstellt."
"Es sollte darauf geachtet werden, dass..."

✅ AKTIV:
"Der Tierarzt untersucht das Pferd."
"Du bekommst die Bewertung in 2 Minuten."
"Achte darauf, dass..."
```

---

### 5. UNPERSÖNLICH → DIREKTE ANSPRACHE

```
❌ UNPERSÖNLICH:
"Man sollte darauf achten..."
"Es empfiehlt sich..."
"Der Käufer sollte bedenken..."

✅ DIREKT:
"Achte darauf..." / "Achten Sie darauf..."
"Wir empfehlen dir..." / "Wir empfehlen Ihnen..."
"Bedenke als Käufer..." / "Als Käufer solltest du..."
```

**Anrede konsistent halten:**
- "Du/Dir/Dein" ODER "Sie/Ihnen/Ihr" - niemals mischen!
- PferdeWert Standard: "Du" (informell, nahbar)

---

### 6. GRAMMATIK-FALLEN BEI SEO-CONTENT

**a) Kasus nach Präpositionen:**
```
❌ "wegen dem Preis" → ✅ "wegen des Preises"
❌ "trotz dem Regen" → ✅ "trotz des Regens"
❌ "während dem Kauf" → ✅ "während des Kaufs"
```

**b) Das/Dass Unterscheidung:**
```
❌ "Das Pferd, dass du kaufst..." → ✅ "Das Pferd, das du kaufst..."
❌ "Ich weiß, das es teuer ist." → ✅ "Ich weiß, dass es teuer ist."
```

**c) Relativpronomen:**
```
❌ "Das Pferd, welches Sie kaufen" → ✅ "Das Pferd, das Sie kaufen"
(welches klingt gestelzt/altmodisch)
```

**d) Kommasetzung bei Infinitivgruppen:**
```
❌ "Er beschloss das Pferd zu kaufen."
✅ "Er beschloss, das Pferd zu kaufen."
```

---

### 7. FÜLLWÖRTER STREICHEN

Diese Wörter können meist ersatzlos gestrichen werden:

| Füllwort | Beispiel | Besser |
|----------|----------|--------|
| eigentlich | "Das ist eigentlich wichtig." | "Das ist wichtig." |
| grundsätzlich | "Grundsätzlich sollte man..." | "Du solltest..." |
| gewissermaßen | "Das ist gewissermaßen richtig." | "Das ist richtig." |
| sozusagen | "Das ist sozusagen der Kern." | "Das ist der Kern." |
| natürlich | "Natürlich ist das wichtig." | "Das ist wichtig." |
| selbstverständlich | "Selbstverständlich prüfen wir..." | "Wir prüfen..." |
| im Prinzip | "Im Prinzip funktioniert das." | "Das funktioniert." |
| an und für sich | "An und für sich ist das gut." | "Das ist gut." |

---

## STEP 3: Korrekturen anwenden

Für jedes gefundene Problem:

1. **Zitiere** den Original-Satz mit Zeilennummer
2. **Erkläre** das Problem (Kategorie + warum problematisch)
3. **Biete** korrigierte Version an
4. **Wende** die Korrektur an (mit Edit tool)

---

## STEP 4: Korrigierten Content speichern

Speichere in:
```
SEO/SEO-CONTENT/{keyword-slug}/content/article-lektoriert.md
```

---

## STEP 5: Lektorats-Report erstellen

Speichere in:
```
SEO/SEO-CONTENT/{keyword-slug}/quality/lektorat-report.md
```

**Report-Struktur:**

```markdown
# Lektorats-Report

**Artikel:** {keyword}
**Datum:** {YYYY-MM-DD}
**Status:** ✅ PASS / ⚠️ CORRECTED / ❌ NEEDS REVIEW

## Zusammenfassung

| Metrik | Vorher | Nachher | Status |
|--------|--------|---------|--------|
| Flesch-Score (geschätzt) | ~XX | ~XX | ✅/❌ |
| Ø Satzlänge | XX Wörter | XX Wörter | ✅/❌ |
| Keyword-Stuffing | X Fälle | 0 Fälle | ✅ |
| Grammatikfehler | X | 0 | ✅ |
| Passive Konstruktionen | X | X | ⚠️ |

## Korrekturen nach Kategorie

### Keyword-Stuffing ({n} Korrekturen)
1. **Zeile X:** "Original..." → "Korrigiert..."
2. ...

### Satzlänge ({n} Korrekturen)
1. **Zeile X:** Satz von {n} auf {n} Wörter gekürzt
2. ...

### Wortlänge ({n} Korrekturen)
1. **Zeile X:** "{langes Wort}" → "{kurzes Wort}"
2. ...

### Grammatik ({n} Korrekturen)
1. **Zeile X:** "{falsch}" → "{richtig}" (Kasus/Komma/etc.)
2. ...

### Passiv → Aktiv ({n} Korrekturen)
1. **Zeile X:** "{passiv}" → "{aktiv}"
2. ...

## Empfehlungen für künftiges Schreiben

- {Hauptproblem 1 und wie vermeiden}
- {Hauptproblem 2 und wie vermeiden}

## Fazit

{Gesamtbewertung der Textqualität nach Lektorat}
```

---

## Output nach Abschluss

```
✅ Lektorat abgeschlossen!

📄 Input:  SEO/SEO-CONTENT/{keyword}/content/article-draft.md
📄 Output: SEO/SEO-CONTENT/{keyword}/content/article-lektoriert.md
📊 Report: SEO/SEO-CONTENT/{keyword}/quality/lektorat-report.md

📈 Verbesserungen:
- Flesch-Score: ~{vorher} → ~{nachher} (+{delta})
- Keyword-Stuffing: {n} Fälle korrigiert
- Satzlänge: Ø {vorher} → Ø {nachher} Wörter
- Grammatik: {n} Fehler behoben

Status: ✅ READY FOR PUBLICATION
```

---

## Checkliste vor Abschluss

- [ ] Kein Keyword-Stuffing mehr (max 3x gleiches Keyword pro Absatz)
- [ ] Durchschnittliche Satzlänge ≤15 Wörter
- [ ] Keine Sätze >25 Wörter
- [ ] Grammatik korrekt (Kasus, Kommas, das/dass)
- [ ] Überwiegend aktive Formulierungen
- [ ] Konsistente Anrede (Du oder Sie)
- [ ] Keine "kostenlos"/"free" Formulierungen (PAID Service!)
- [ ] Alle CTAs auf "/pferde-preis-berechnen"

---

## Schnell-Referenz: Typische Umschreibungen

| Von | Zu |
|-----|-----|
| "Wenn Sie ... möchten, sollten Sie ... beachten, dass ..." | "Du möchtest ...? Dann beachte: ..." |
| "Es ist wichtig zu wissen, dass ..." | "Wichtig: ..." |
| "Dabei handelt es sich um ..." | "Das ist ..." |
| "In diesem Zusammenhang ..." | "Dabei ..." |
| "Im Rahmen des ..." | "Beim ..." |
| "Eine Durchführung der Prüfung erfolgt ..." | "Wir prüfen ..." |
| "Es sollte darauf geachtet werden ..." | "Achte darauf ..." |
| "Zur Verfügung stehen ..." | "Es gibt ..." / "Du hast ..." |

---

## Integration in SEO-Workflow

Dieser Skill wird verwendet:
- Nach Phase 4 (Content Writing) des `/seo` Workflows
- Vor Phase 6 (Quality Check)
- Kann auch standalone für bestehende Artikel verwendet werden

**Aufruf:** `/content-lektor {pfad-zum-artikel}`
