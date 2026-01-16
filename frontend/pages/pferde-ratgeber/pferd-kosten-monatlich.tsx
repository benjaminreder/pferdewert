import { useMemo } from 'react'
import LocalizedLink from '@/components/LocalizedLink'
import Layout from '@/components/Layout'
import RatgeberHero from '@/components/ratgeber/RatgeberHero'
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage'
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents'
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox'
import RatgeberHead from '@/components/ratgeber/RatgeberHead'
import FAQ from '@/components/FAQ'
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles'
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA'
import SurveyBox from '@/components/surveys/SurveyBox'
import { monthlyCostsSurvey } from '@/data/surveys/monthly-costs'
import { Calculator } from 'lucide-react'
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry'
import AuthorBox from '@/components/AuthorBox'

// Section definitions for Table of Contents
const sections = [
  { id: 'kostenueberblick', title: 'Pferdehaltungskosten auf einen Blick' },
  { id: 'stallmiete', title: 'Stallmiete & Unterbringung (150-900€)' },
  { id: 'futterkosten', title: 'Futterkosten (60-220€)' },
  { id: 'hufschmied', title: 'Hufschmied-Kosten (35-130€)' },
  { id: 'tierarzt', title: 'Tierarzt & Vorsorge (20-100€)' },
  { id: 'versicherungen', title: 'Versicherungen (15-110€)' },
  { id: 'versteckte-kosten', title: 'Versteckte Kosten & Notfall-Budget' },
  { id: 'kostenszenarien', title: '3 realistische Budget-Szenarien' },
  { id: 'spartipps', title: '10 konkrete Spartipps' },
  { id: 'fazit', title: 'Fazit: Ist Pferdehaltung machbar?' },
  { id: 'faq', title: 'FAQ' }
]

// FAQ Items based on SEO schema
const faqItems = [
  {
    question: 'Was kostet ein Pferd monatlich im Unterhalt?',
    answer: 'Ein Pferd kostet durchschnittlich 700€ bis 1.000€ monatlich im Unterhalt. Das setzt sich zusammen aus: Stallmiete (450€), Futter (130€), Hufschmied (75€), Tierarzt (50€) und Versicherungen (55€). Die genaue Summe hängt von der Stallart, Region und Pferdetyp ab. Mit Reitunterricht oder Beritt können es bis zu 1.500€ monatlich werden.'
  },
  {
    question: 'Wie teuer ist es, ein Pferd zu besitzen?',
    answer: 'Die monatlichen Kosten für ein Pferd liegen zwischen 400€ (Budget-Variante mit Selbstversorger, ländlich) und 1.800€+ (Sportpferd, Vollpension, Stadt mit Beritt). Ein realistisches Budget für gute Pferdeversorgung sollte mit 700€ bis 1.200€ monatlich kalkuliert werden, plus eine Notfall-Reserve von 1.500€ bis 2.000€.'
  },
  {
    question: 'Was sind die größten Kostenpositionen bei der Pferdehaltung?',
    answer: 'Die größten Kostenpositionen sind: (1) Stallmiete - 40-50% des Budgets (150€ - 900€), (2) Futter & Heu - 15-20% (60€ - 220€), (3) Hufschmied - 5-10% (35€ - 130€), (4) Tierarzt & Versicherungen - 10-15% zusammen, (5) Reitunterricht/Training - 0-20% je nach Ambition (0€ - 350€+).'
  },
  {
    question: 'Kann ich Pferdekosten sparen?',
    answer: 'Ja, deutlich. Die wirksamsten Sparmöglichkeiten: (1) Stallwechsel zu Selbstversorger - spart 150€ bis 300€/Monat, (2) Barfuß statt Eisenbeschlag - spart 30€ bis 50€, (3) Gruppenlektionen statt Privat - spart 100€ bis 200€, (4) Heu vom Bauern kaufen - spart 15€ bis 30€. Gesamtsparpotential: 300€ bis 500€ monatlich. Aber: Spar nicht bei Futter-Qualität, Hufbetreuung oder Tierarzt!'
  },
  {
    question: 'Ist eine OP-Versicherung für Pferde sinnvoll?',
    answer: 'Ja, OP-Versicherung ist dringend empfohlen. Kosten: 200€ bis 400€/Jahr (17€ bis 33€/Monat). Eine einzige Kolik-OP kostet 4.000€ bis 8.000€. Die Versicherung amortisiert sich nach 1-2 Notfällen. Haftpflichtversicherung ist Pflicht und sollte geprüft werden.'
  },
  {
    question: 'Wie viel Notfall-Reserve sollte ich als Pferdehalter haben?',
    answer: 'Mindestens 1.500€ bis 2.000€ solltest du sofort verfügbar haben. Das entspricht einer durchschnittlichen Tierarzt-Notfallrechnung (ohne OP). Am besten legst du jeden Monat 10-15% deines Budgets als Rücklage zur Seite.'
  },
  {
    question: 'Welche regionalen Unterschiede gibt es bei Pferdekosten?',
    answer: 'Massive regionale Unterschiede besonders bei Stallmiete: Großstadt (Berlin, München) 600€ bis 900€ Vollpension, Stadtrand (Umland) 400€ bis 600€, Landkreis 250€ bis 400€, Ländlich 150€ bis 300€. Jede Stunde Fahrtweg sparen kostet etwa 200€ bis 300€ monatlich weniger.'
  },
  {
    question: 'Welche versteckten Kosten übersehen Anfänger häufig?',
    answer: 'Häufig übersehene Kosten: Raus- und Reinbringen (50€ bis 150€), zusätzlicher Koppelgang (30€ bis 80€), Aufpreis für besseres Heu (20€ bis 50€), Ersatz von Ausrüstung (10€ bis 40€ im Monat), höhere Futterpreise im Winter (+30€ bis 50€), Physiotherapie (60€ bis 150€ pro Termin). Plane immer 10-15% Puffer für Unvorhergesehenes ein.'
  }
]

// FAST REFRESH FIX: Define icons at module level
const CALCULATOR_ICON = <Calculator className="w-5 h-5" />

// FAST REFRESH FIX: Define onClick handlers at module level
const handleScrollToKosten = () => {
  document.getElementById('kostenueberblick')?.scrollIntoView({ behavior: 'smooth' })
}

// FAST REFRESH FIX: Define CTA objects at module level
const PRIMARY_CTA = {
  href: '/pferde-preis-berechnen',
  label: 'Jetzt Pferd bewerten',
  icon: CALCULATOR_ICON
}

const SECONDARY_CTA = {
  onClick: handleScrollToKosten,
  label: 'Zu den Kosten'
}

// SEO Locale Content for RatgeberHead
// Community-Daten: 40% zahlen 400-600€, 30% über 800€ (43 Teilnehmer)
const seoLocales = {
  de: {
    title: 'Was kostet ein Pferd im Monat? 40% zahlen 400-600€ (Umfrage)',
    description: 'Was kostet ein Pferd monatlich? Unsere Community-Umfrage zeigt: 40% zahlen 400-600€, 30% über 800€. Alle Kosten mit Spartipps.',
    keywords: 'was kostet ein pferd im monat, pferd kosten monatlich, pferdehalter kosten, unterhaltskosten pferd, stallmiete, futterkosten pferd',
    ogTitle: 'Was kostet ein Pferd im Monat? Community-Umfrage 2025',
    ogDescription: 'Echte Daten: 40% der Pferdebesitzer zahlen 400-600€/Monat. Detaillierte Kostenübersicht mit Spartipps und Budget-Szenarien.',
    twitterTitle: 'Was zahlen Pferdebesitzer wirklich? Umfrage-Ergebnisse',
    twitterDescription: '40% zahlen 400-600€, 30% über 800€ – echte Daten von Pferdebesitzern mit Spartipps.',
  },
  at: {
    title: 'Was kostet ein Pferd im Monat in Österreich? Umfrage-Ergebnisse',
    description: 'Pferdekosten Österreich: 40% zahlen 400-600€/Monat laut Community-Umfrage. Alle Kosten mit österreichischen Preisen.',
    keywords: 'pferd kosten monatlich österreich, pferdehalter kosten at, unterhaltskosten pferd',
    ogTitle: 'Pferdekosten Österreich: Was zahlen Pferdebesitzer wirklich?',
    ogDescription: 'Echte Umfrage-Daten: 40% zahlen 400-600€, 30% über 800€. Kostenübersicht für österreichische Pferdehalter.',
    twitterTitle: 'Pferdekosten Österreich: Community-Umfrage',
    twitterDescription: '40% zahlen 400-600€/Monat – echte Daten von Pferdebesitzern in Österreich.',
  },
  ch: {
    title: 'Was kostet ein Pferd im Monat in der Schweiz? Umfrage CHF',
    description: 'Pferdekosten Schweiz: Community-Umfrage zeigt echte monatliche Kosten. Detaillierte Übersicht in CHF mit Spartipps.',
    keywords: 'pferd kosten monatlich schweiz, pferdehalter kosten chf, unterhaltskosten pferd',
    ogTitle: 'Pferdekosten Schweiz: Was zahlen Pferdebesitzer wirklich?',
    ogDescription: 'Echte Umfrage-Daten von Pferdebesitzern. Kostenübersicht in CHF mit Schweizer Stallpreisen und Spartipps.',
    twitterTitle: 'Pferdekosten Schweiz: Community-Umfrage CHF',
    twitterDescription: 'Echte Daten: Was zahlen Pferdebesitzer in der Schweiz? Mit Spartipps.',
  },
}

export default function PferdKostenMonatlich() {
  // CRITICAL: Related articles MUST be inside component to avoid Next.js cache issues
  const relatedArticles = useMemo(() =>
    getRelatedArticles('pferd-kosten-monatlich').map(entry => ({
      title: entry.title,
      description: entry.description,
      href: getRatgeberPath(entry.slug),
      image: entry.image,
      badge: entry.category,
      readTime: entry.readTime
    })),
  [])

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <RatgeberHead
        slug="pferd-kosten-monatlich"
        image="/images/ratgeber/pferd-kaufen/was-kostet-ein-pferd/horse-chestnut-eating-hay-stable-window.webp"
        locales={seoLocales}
        datePublished="2026-01-04"
        dateModified="2026-01-04"
        wordCount={2668}
        breadcrumbTitle="Pferd Kosten monatlich"
        faqItems={faqItems}
        author={{
          name: "Benjamin Reder",
          url: "https://pferdewert.de/ueber-pferdewert",
          jobTitle: "Gründer von PferdeWert.de, KI-Experte & Pferdebesitzer seit 2017",
          image: "https://pferdewert.de/images/shared/benjamin-reder.webp"
        }}
      />

      {/* Hero Section */}
      <RatgeberHero
        title="Was kostet ein Pferd im Monat?"
        subtitle="Echte Daten aus unserer Community – 40% zahlen 400-600€ pro Monat, wir selbst über 800€. Hier die komplette Aufschlüsselung."
        primaryCta={PRIMARY_CTA}
        secondaryCta={SECONDARY_CTA}
      />

      <RatgeberHeroImage
        src="/images/ratgeber/pferd-kaufen/was-kostet-ein-pferd/horse-chestnut-eating-hay-stable-window.webp"
        alt="Was kostet ein Pferd im Monat? Pferd beim Heufressen im Stall"
        priority
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <article className="max-w-5xl mx-auto space-y-16">
          {/* Lead Paragraph */}
          <section className="scroll-mt-32 lg:scroll-mt-40">
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Traum vom eigenen Pferd ist verlockend. Aber realistisch betrachtet: <strong>Was kostet ein Pferd im Monat</strong> wirklich? Viele Anfänger unterschätzen die laufenden Kosten massiv – sie denken nur an Stallmiete und Futter. Dabei gibt es versteckte Posten, die schnell zu Überraschungen führen. In diesem Ratgeber zeigen wir dir alle <strong>Unterhaltskosten für ein Pferd</strong> mit realistischen Preisspannen, Sparmöglichkeiten und drei konkreten Budget-Beispielen. Du suchst nach einem Überblick über alle Kosten inklusive Anschaffung? Dann lies auch unseren{' '}
              <LocalizedLink href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-primary-600 hover:text-primary-700 font-semibold">
                kompletten Kostenüberblick
              </LocalizedLink>.
            </p>
          </section>

          {/* Community Survey - Unique Content! */}
          <section className="scroll-mt-32 lg:scroll-mt-40">
            <SurveyBox
              survey={monthlyCostsSurvey}
              allowVoting={true}
            />
          </section>

          {/* Table of Contents */}
          <section className="scroll-mt-32 lg:scroll-mt-40">
            <RatgeberTableOfContents sections={sections} />
          </section>

          {/* Featured Snippet Box: Kosten auf einen Blick */}
          <RatgeberHighlightBox
            title="Monatliche Pferdekosten auf einen Blick"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-brand-brown-light">
                <span className="font-semibold text-gray-900">Gesamt monatlich:</span>
                <span className="text-brand-brown font-bold">400€ – 1.800€+</span>
              </div>
              <div className="flex justify-between items-start pb-3 border-b border-brand-brown-light">
                <span className="font-semibold text-gray-900">Durchschnitt:</span>
                <span className="text-brand-brown font-bold">700€ – 1.000€</span>
              </div>
              <div className="flex justify-between items-start pb-3 border-b border-brand-brown-light">
                <span className="font-semibold text-gray-900">Stallmiete:</span>
                <span className="text-gray-700">150€ – 900€</span>
              </div>
              <div className="flex justify-between items-start pb-3 border-b border-brand-brown-light">
                <span className="font-semibold text-gray-900">Futter & Heu:</span>
                <span className="text-gray-700">60€ – 220€</span>
              </div>
              <div className="flex justify-between items-start pb-3 border-b border-brand-brown-light">
                <span className="font-semibold text-gray-900">Hufschmied:</span>
                <span className="text-gray-700">35€ – 130€</span>
              </div>
              <div className="flex justify-between items-start pb-3 border-b border-brand-brown-light">
                <span className="font-semibold text-gray-900">Tierarzt (Routine):</span>
                <span className="text-gray-700">20€ – 100€</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-semibold text-gray-900">Versicherungen:</span>
                <span className="text-gray-700">15€ – 110€</span>
              </div>
            </div>
          </RatgeberHighlightBox>

          {/* Section: Kostenübersicht */}
          <section id="kostenueberblick" className="scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Pferdehaltungskosten auf einen Blick: Die komplette Kostentabelle
            </h2>
            <p className="text-gray-700 mb-6">
              Wichtig: Wir sprechen hier von <strong>monatlichen Unterhaltskosten</strong>. Nicht von Anschaffungspreis oder Einmalauszahlungen. Es geht um die Ausgaben, die <strong>jeden Monat</strong> anfallen.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-amber-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Kostenposition</th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-semibold">Minimum</th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-semibold">Durchschnitt</th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-semibold">Maximum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">Stallmiete</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">150€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">450€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">900€</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium">Futter & Heu</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">60€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">130€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">220€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">Hufschmied</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">35€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">75€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">130€</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium">Tierarzt (Routine)</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">20€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">50€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">100€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">Versicherungen</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">15€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">55€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">110€</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-medium">Reitunterricht</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">0€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">100€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">350€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 font-medium">Ausrüstung-Verschleiß</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">10€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">40€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">60€</td>
                  </tr>
                  <tr className="bg-amber-100 font-bold">
                    <td className="border border-gray-200 px-4 py-3">MONATLICH GESAMT</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">290€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">900€</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">1.870€</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <RatgeberHighlightBox title="Praxis-Beispiel: Unsere Kosten für Blossi (Stuttgart)">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Stallmiete</strong> (Box, Futter, Halle): 550€</li>
                <li>• <strong>Hufschmied</strong> (alle 8 Wochen, ca. 120€ pro Termin): ~75€/Monat</li>
                <li>• <strong>Reitunterricht</strong> + Beritt: 250-300€</li>
                <li className="font-bold text-brand-brown">• Gesamt: &gt;800€ monatlich</li>
              </ul>
            </RatgeberHighlightBox>
          </section>

          {/* Section: Stallmiete */}
          <section id="stallmiete" className="scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Stallmiete & Unterbringungskosten: Der größte Posten (150–900€/Monat)
            </h2>
            <p className="text-gray-700 mb-6">
              Die Stallmiete ist deine größte Kostenposition. Je nachdem, wo du dein Pferd hältst, variiert der Preis massiv. Das ist ein Hauptgrund, warum <strong>was kostet ein Pferd im Monat</strong> so unterschiedlich beantwortet wird.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Selbstversorger vs. Pensionsstall vs. Offenstall</h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">Selbstversorger: 150€ - 300€</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Du fütterst selbst, mist selbst aus</li>
                  <li>• Zeitaufwand: 1-2 Stunden täglich</li>
                  <li>• Sparfaktor: Bis zu 60% günstiger</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2">Offenstall: 200€ - 600€</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Pferd lebt in der Gruppe</li>
                  <li>• Betreuer kümmern sich um Fütterung</li>
                  <li>• Sparpotential: 30-40% unter Vollpension</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 mb-2">Vollpension: 400€ - 900€+</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Alles inklusive: Box, Fütterung, Misten</li>
                  <li>• Professionelle Betreuung 24/7</li>
                  <li>• Komfortlösung, aber teuer</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Regionale Kostenunterschiede</h3>
            <p className="text-gray-700 mb-4">
              Die Region macht einen <strong>massiven Unterschied</strong> bei den <strong>monatlichen Pferdekosten</strong>:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• <strong>Großstadt</strong> (Berlin, München): 600€ - 900€ Vollpension</li>
              <li>• <strong>Stadtrand</strong> (Umland): 400€ - 600€</li>
              <li>• <strong>Landkreis</strong>: 250€ - 400€</li>
              <li>• <strong>Ländlich</strong>: 150€ - 300€</li>
            </ul>
            <p className="text-gray-700 italic">
              Faustregel: Jede Stunde Fahrtweg sparen kostet dich etwa 200-300€ monatlich weniger.
            </p>
          </section>

          {/* Section: Futterkosten */}
          <section id="futterkosten" className="scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Futterkosten: Was kostet es, dein Pferd zu füttern? (60–220€/Monat)
            </h2>
            <p className="text-gray-700 mb-6">
              Nach der Stallmiete sind die <strong>Futterkosten</strong> dein nächstgrößerer Posten – aber deutlich geringer und gut planbar.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Heu-Kosten: 40€ - 150€/Monat</h4>
                <p className="text-sm text-gray-700">Ein Pferd frisst 350-450 kg Heu monatlich. Gutes Heu kostet 18€ - 40€ pro 100kg. Winterheu ist teurer.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Kraftfutter: 15€ - 80€/Monat</h4>
                <p className="text-sm text-gray-700">Leichtfuttrige: 15€ - 30€. Sportpferde: 50€ - 80€. Mit Zusatzstoffen: +15€ - 30€.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">Mineralien & Zusätze: 10€ - 40€/Monat</h4>
                <p className="text-sm text-gray-700">Salzlecke: 5€ - 15€. Vitamine/Mineralpulver: 5€ - 25€.</p>
              </div>
            </div>

            <RatgeberHighlightBox title="Sparmaßnahmen bei Futterkosten">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Heu-Direktkauf vom Bauern:</strong> 10-20% günstiger (-15€ bis 30€/Monat)</li>
                <li>• <strong>Futter-Coop mit anderen Besitzern:</strong> Bulk-Rabatte (-10€ bis 20€/Monat)</li>
                <li>• <strong>Saisonales Einkaufen:</strong> Sommervorräte im Mai/Juni (-20€ bis 40€/Monat)</li>
              </ul>
            </RatgeberHighlightBox>
          </section>

          {/* Section: Hufschmied */}
          <section id="hufschmied" className="scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Hufschmied-Kosten: Alle 6-8 Wochen eine Ausgabe (35–130€/Monat)
            </h2>
            <p className="text-gray-700 mb-6">
              Der Hufschmied ist ein vorhersehbarer, aber oft unterschätzter Kostenfaktor für <strong>Pferdehalter</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">Barfuß-Schmied: 35€ - 60€ pro Termin</h4>
                <p className="text-sm text-gray-700">Günstigere Variante. Nicht für jedes Pferd geeignet. ~45€/Monat amortisiert.</p>
              </div>
              <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-800 mb-2">Eisenbeschlag: 80€ - 200€ pro Termin</h4>
                <p className="text-sm text-gray-700">Nötig bei Sportpferden. ~115€/Monat amortisiert. Therapeutisch bis 130€/Monat.</p>
              </div>
            </div>

            <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <strong>Qualität zählt:</strong> Ein billiger Schmied kann langfristig kostspieliger werden. Schlechte Hufbearbeitung führt zu Verletzungen – eine OP kostet dann 500€ - 2.000€.
            </p>
          </section>

          {/* Section: Tierarzt */}
          <section id="tierarzt" className="scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Tierarzt, Impfungen & Zahnkontrolle: Routine-Budget (20–100€/Monat)
            </h2>
            <p className="text-gray-700 mb-6">
              Tierarztkosten sind teils planbar, teils überraschend. Deshalb ist es wichtig, die <strong>regelmäßigen Tierarztkosten</strong> zu kennen.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>Jährliche Impfungen:</span>
                <span className="font-medium">~150€ - 220€/Jahr = 12€ - 18€/Monat</span>
              </div>
              <div className="flex justify-between p-3 bg-white rounded border">
                <span>Wurmkur (3-4x jährlich):</span>
                <span className="font-medium">45€ - 120€/Jahr = 4€ - 10€/Monat</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded">
                <span>Zahnkontrolle (1-2x/Jahr):</span>
                <span className="font-medium">~130€ - 200€/Jahr = 11€ - 17€/Monat</span>
              </div>
              <div className="flex justify-between p-3 bg-amber-100 rounded font-bold">
                <span>Gesamt Routine-Vet:</span>
                <span>30€ - 50€/Monat</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Notfall-Vorkehrung: Die versteckte Vet-Rechnung</h3>
            <div className="bg-red-50 p-5 rounded-lg border border-red-200 mb-6">
              <h4 className="font-bold text-red-800 mb-3">Tierärztliche Notfälle sind kostspielig:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Kolik (unkompliziert): 500€ - 1.200€</li>
                <li>• Kolik mit OP: 4.000€ - 8.000€</li>
                <li>• Abszess/Zahnbehandlung: 300€ - 800€</li>
                <li>• Fraktur-OP: 5.000€ - 15.000€</li>
              </ul>
              <p className="mt-3 font-medium text-red-800">Deshalb: Spar monatlich 50€ - 100€ als Notfall-Reserve!</p>
            </div>
          </section>

          {/* Section: Versicherungen */}
          <section id="versicherungen" className="scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Versicherungen: Haftpflicht & OP-Schutz (15–110€/Monat)
            </h2>
            <p className="text-gray-700 mb-6">
              Versicherungen sind kein Luxus, sondern notwendig für jeden <strong>Pferdehalter</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 p-5 rounded-lg border border-red-300">
                <h4 className="font-bold text-red-800 mb-2">Haftpflicht: PFLICHT!</h4>
                <p className="text-sm text-gray-700 mb-2">Kosten: 60€ - 180€/Jahr = 5€ - 15€/Monat</p>
                <p className="text-sm text-gray-700">Ohne sie haftest du mit deinem gesamten Vermögen. In einigen Bundesländern Pflicht!</p>
              </div>
              <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">OP-Versicherung: Empfohlen</h4>
                <p className="text-sm text-gray-700 mb-2">Kosten: 200€ - 400€/Jahr = 17€ - 33€/Monat</p>
                <p className="text-sm text-gray-700">Eine Kolik-OP kostet 5.000€. Die Versicherung amortisiert sich nach 1-2 Fällen.</p>
              </div>
            </div>
          </section>

          {/* Section: Versteckte Kosten */}
          <section id="versteckte-kosten" className="scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Versteckte Kosten, die oft vergessen werden + Notfall-Budget
            </h2>
            <p className="text-gray-700 mb-6">
              Hier verstecken sich zusätzliche Ausgaben, die viele Anfänger nicht auf dem Radar haben.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Equipment-Ersatz</h4>
                <p className="text-sm text-gray-700">Satteldecken, Bandagen, Halfter: 10€ - 40€/Monat</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Feed-Preisschwankungen</h4>
                <p className="text-sm text-gray-700">Im Winter: +30€ - 50€ für besseres Heu</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Training/Unterricht</h4>
                <p className="text-sm text-gray-700">Lektionen: 40€ - 100€/Stunde. Wöchentlich: 160€ - 400€/Monat</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Physiotherapie/Osteopathie</h4>
                <p className="text-sm text-gray-700">60€ - 150€ pro Termin, 1x monatlich empfohlen</p>
              </div>
            </div>

            <RatgeberHighlightBox title="Die goldene Regel: Notfall-Reserve sparen">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Sparquote:</strong> 10-15% deines monatlichen Budgets</li>
                <li>• <strong>Beispiel:</strong> Bei 600€ Budget: 60€ - 90€/Monat</li>
                <li>• <strong>Ziel:</strong> 1.500€ - 2.000€ Notfallkasse</li>
                <li>• <strong>Aufbaudauer:</strong> 15-24 Monate</li>
              </ul>
            </RatgeberHighlightBox>
          </section>

          {/* Section: Budget-Szenarien */}
          <section id="kostenszenarien" className="scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Realistische Kostenszenarien: Was kostet ein Pferd im Monat in verschiedenen Situationen?
            </h2>

            <div className="space-y-6">
              {/* Szenario 1 */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">Szenario 1: Budget-Halter (400€/Monat)</h3>
                <p className="text-sm text-gray-600 mb-4">Freizeitpferd, ländlich, Selbstversorger</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Stallmiete (Selbstversorger, Offenstall): 200€</li>
                  <li>• Futter (Heu + Standard-Kraftfutter): 80€</li>
                  <li>• Hufschmied (Barfuß): 40€</li>
                  <li>• Tierarzt (Routine): 30€</li>
                  <li>• Versicherungen (Haftpflicht): 10€</li>
                  <li>• Notfall-Reserve: 40€</li>
                </ul>
              </div>

              {/* Szenario 2 */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Szenario 2: Komfort-Halter (910€/Monat)</h3>
                <p className="text-sm text-gray-600 mb-4">Freizeitpferd, Stadtrand – häufigste Situation</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Stallmiete (Offenstall mit Service): 450€</li>
                  <li>• Futter (gutes Heu + Kraftfutter): 130€</li>
                  <li>• Hufschmied (Eisen): 90€</li>
                  <li>• Tierarzt (Routine + Zahnbehandlung): 50€</li>
                  <li>• Versicherungen (Haftpflicht + OP): 40€</li>
                  <li>• Gelegentliche Lektionen: 100€</li>
                  <li>• Notfall-Reserve: 50€</li>
                </ul>
              </div>

              {/* Szenario 3 */}
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Szenario 3: Sporthalter (1.780€/Monat)</h3>
                <p className="text-sm text-gray-600 mb-4">Sportpferd, Stadt, Vollpension mit Beritt</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Stallmiete (Vollpension mit Beritt): 800€</li>
                  <li>• Futter (premium, Zusätze): 180€</li>
                  <li>• Hufschmied (spezialisiert, Eisen): 130€</li>
                  <li>• Tierarzt (regelmäßige Checks): 80€</li>
                  <li>• Versicherungen (Haftpflicht + OP + optional): 90€</li>
                  <li>• Reitunterricht/Beritt: 400€</li>
                  <li>• Notfall-Reserve: 100€</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Spartipps */}
          <section id="spartipps" className="scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Kostenoptimierung: 10 konkrete Hebel zum Sparen
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-200 rounded-lg text-sm">
                <thead>
                  <tr className="bg-green-50">
                    <th className="border border-gray-200 px-3 py-2 text-left">Maßnahme</th>
                    <th className="border border-gray-200 px-3 py-2 text-center">Aufwand</th>
                    <th className="border border-gray-200 px-3 py-2 text-center">Ersparnis/Monat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">Stallwechsel zu Selbstversorger</td>
                    <td className="border border-gray-200 px-3 py-2 text-center">Hoch</td>
                    <td className="border border-gray-200 px-3 py-2 text-center font-medium text-green-700">150€ - 300€</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2">Gruppenlektionen statt Privat</td>
                    <td className="border border-gray-200 px-3 py-2 text-center">Keine</td>
                    <td className="border border-gray-200 px-3 py-2 text-center font-medium text-green-700">100€ - 200€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">Barfuß statt Eisen</td>
                    <td className="border border-gray-200 px-3 py-2 text-center">Keine</td>
                    <td className="border border-gray-200 px-3 py-2 text-center font-medium text-green-700">30€ - 50€</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2">Heu vom Bauern kaufen</td>
                    <td className="border border-gray-200 px-3 py-2 text-center">Mittel</td>
                    <td className="border border-gray-200 px-3 py-2 text-center font-medium text-green-700">15€ - 30€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-3 py-2">Versicherungen vergleichen</td>
                    <td className="border border-gray-200 px-3 py-2 text-center">Keine</td>
                    <td className="border border-gray-200 px-3 py-2 text-center font-medium text-green-700">10€ - 30€</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <strong>Warnung:</strong> Spar nicht bei Futter-Qualität, Hufbetreuung oder Tierarzt! Das rächt sich langfristig.
            </p>
          </section>

          {/* Section: Fazit */}
          <section id="fazit" className="scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Fazit: Ist Pferdehaltung finanziell machbar für dich?
            </h2>

            <RatgeberHighlightBox title="Realistische Kostenspanne">
              <p className="text-lg font-bold text-brand-brown mb-4">400€ - 1.200€ monatlich für gute Pferdeversorgung</p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Stallmiete</strong> ist dein größter Kostenfaktor (40-50% des Budgets)</li>
                <li>• <strong>Futter & Hufschmied</strong> kommen zusammen auf 20-25%</li>
                <li>• <strong>Tierarzt & Versicherungen</strong> sind die Sicherheitsausgaben</li>
                <li>• <strong>Versteckte Kosten</strong> addieren sich: 10-15% extra für Unerwartetes</li>
              </ul>
            </RatgeberHighlightBox>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Die wichtigsten Entscheidungen</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Kannst du diese Kosten 20+ Jahre tragen?</li>
                <li>Ist dein Einkommen stabil genug für Notfall-Vet-Rechnungen?</li>
                <li>Passt Pferdehaltung zu deiner Lebenssituation? (Beruf, Familie, Zeit)</li>
              </ol>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Konkrete nächste Schritte</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ <strong>Kontaktiere lokale Ställe</strong>, hole aktuelle Preise ein</li>
                <li>✓ <strong>Spar einen Notfall-Fonds auf</strong> (mindestens 1.500€)</li>
                <li>✓ <strong>Vergleiche Versicherungsangebote</strong></li>
                <li>✓ Lies unseren{' '}
                  <LocalizedLink href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-primary-600 hover:text-primary-700 font-semibold">
                    kompletten Kosten-Guide inkl. Anschaffung
                  </LocalizedLink>
                </li>
                <li>✓ Nutze unseren{' '}
                  <LocalizedLink href="/pferd-kaufen" className="text-primary-600 hover:text-primary-700 font-semibold">
                    Pferdekauf-Ratgeber
                  </LocalizedLink>{' '}für die Suche nach dem richtigen Pferd
                </li>
              </ul>
            </div>
          </section>

          {/* E-E-A-T Section */}
          <section className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Unser praktisches Wissen aus 10+ Jahren Pferdehaltung</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>1. Anfänger unterschätzen monatliche Kosten um 30-40%.</strong> Sie denken &quot;400€ Stallmiete + 100€ Futter = 500€&quot;. Aber nach 6 Monaten haben Hufschmied, Tierarzt und Equipment die Kosten verdoppelt.
              </p>
              <p>
                <strong>2. Die beste Sparmaßnahme: Richtige Stallwahl.</strong> Selbstversorger vs. Vollpension kann 200€ - 400€/Monat Unterschied machen.
              </p>
              <p>
                <strong>3. OP-Versicherung amortisiert sich schnell.</strong> Wir haben 4 Pferdehalter in unserer Community, deren Versicherung sich nach 1-2 Notfällen bezahlt gemacht hat.
              </p>
              <p>
                <strong>4. Regionale Unterschiede sind krass.</strong> Ein Freund in München zahlt 800€ Stallmiete. Sein Bruder auf der Schwäbischen Alb 250€. Beide gute Ställe.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="scroll-mt-32 lg:scroll-mt-40">
            <FAQ faqs={faqItems} sectionTitle="Noch Fragen? Die wichtigsten Antworten" />
          </section>

          {/* Author Box */}
          <AuthorBox />

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <RatgeberRelatedArticles
              title="Das könnte dich auch interessieren"
              articles={relatedArticles}
            />
          )}

          {/* Final CTA */}
          <RatgeberFinalCTA
            image={{
              src: '/images/shared/cta-pferd-bewerten.webp',
              alt: 'Pferdebewertung mit KI'
            }}
            title="Bereit für konkrete Planungen?"
            description="Berechne den Wert deines Pferdes mit unserer KI-gestützten Bewertung in nur 2 Minuten."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Pferd bewerten"
          />
        </article>
      </div>
    </Layout>
  )
}
