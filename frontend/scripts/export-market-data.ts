/**
 * Export Market Data for SEO Content
 *
 * Extrahiert anonymisierte Marktdaten aus echten Bewertungen
 * für SEO-Mehrwert-Content (Statistiken, Trends, Insights)
 *
 * Usage: npx tsx scripts/export-market-data.ts
 */

import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || 'pferdewert';

interface BewertungDoc {
  _id: string;
  rasse: string;
  alter: number;
  geschlecht: string;
  stockmass: number;
  ausbildung: string;
  haupteignung?: string;
  abstammung?: string;
  aku?: string;
  erfolge?: string;
  standort?: string;
  charakter?: string;
  besonderheiten?: string;
  land?: string;
  status: string;
  bewertung?: string;
  erstellt: Date;
  ai_model?: string;
}

interface MarketStats {
  totalBewertungen: number;
  zeitraum: { von: Date; bis: Date };

  // Rassen-Statistiken
  rassenVerteilung: Record<string, number>;
  top10Rassen: { rasse: string; anzahl: number; prozent: number }[];

  // Altersverteilung
  altersVerteilung: {
    durchschnitt: number;
    median: number;
    min: number;
    max: number;
    gruppen: Record<string, number>;
  };

  // Geschlechter
  geschlechterVerteilung: Record<string, number>;

  // Ausbildungsstand
  ausbildungsVerteilung: Record<string, number>;

  // Haupteignung/Disziplin
  eignungsVerteilung: Record<string, number>;

  // Regionale Verteilung
  landVerteilung: Record<string, number>;
  standortVerteilung: Record<string, number>;

  // Stockmaß
  stockmassVerteilung: {
    durchschnitt: number;
    min: number;
    max: number;
    gruppen: Record<string, number>;
  };

  // AKU Status
  akuVerteilung: Record<string, number>;
}

function normalizeRasse(rasse: string): string {
  const r = rasse.toLowerCase().trim();

  // Mapping für Varianten
  const mappings: Record<string, string> = {
    'deutsches warmblut': 'Warmblut',
    'warmblut': 'Warmblut',
    'hannoveraner': 'Hannoveraner',
    'holsteiner': 'Holsteiner',
    'oldenburger': 'Oldenburger',
    'westfale': 'Westfale',
    'westfalen': 'Westfale',
    'trakehner': 'Trakehner',
    'haflinger': 'Haflinger',
    'isländer': 'Isländer',
    'islandpferd': 'Isländer',
    'friese': 'Friese',
    'friesenpferd': 'Friese',
    'quarter horse': 'Quarter Horse',
    'american quarter horse': 'Quarter Horse',
    'paint horse': 'Paint Horse',
    'vollblut': 'Vollblut',
    'englisches vollblut': 'Vollblut',
    'araber': 'Araber',
    'vollblutaraber': 'Araber',
    'andalusier': 'Andalusier',
    'pre': 'Andalusier',
    'pura raza española': 'Andalusier',
    'lusitano': 'Lusitano',
    'welsh': 'Welsh Pony',
    'welsh pony': 'Welsh Pony',
    'shetland': 'Shetlandpony',
    'shetlandpony': 'Shetlandpony',
    'fjordpferd': 'Fjord',
    'fjord': 'Fjord',
    'norweger': 'Fjord',
    'appaloosa': 'Appaloosa',
    'knabstrupper': 'Knabstrupper',
    'tinker': 'Tinker',
    'irish cob': 'Tinker',
    'deutsches reitpony': 'Deutsches Reitpony',
    'reitpony': 'Deutsches Reitpony',
    'pony': 'Pony (Sonstige)',
    'kaltblut': 'Kaltblut',
    'schwarzwälder': 'Schwarzwälder',
    'süddeutsches kaltblut': 'Süddeutsches Kaltblut',
  };

  for (const [key, value] of Object.entries(mappings)) {
    if (r.includes(key)) return value;
  }

  // Capitalize first letter
  return rasse.charAt(0).toUpperCase() + rasse.slice(1).toLowerCase();
}

function normalizeAusbildung(ausbildung: string): string {
  const a = ausbildung.toLowerCase().trim();

  if (a.includes('roh') || a.includes('unberitten')) return 'Roh/Unberitten';
  if (a.includes('angeritten')) return 'Angeritten';
  if (a.includes('a-dressur') || a.includes('a dressur')) return 'A-Niveau';
  if (a.includes('l-dressur') || a.includes('l dressur')) return 'L-Niveau';
  if (a.includes('m-dressur') || a.includes('m dressur')) return 'M-Niveau';
  if (a.includes('s-dressur') || a.includes('s dressur')) return 'S-Niveau';
  if (a.includes('grand prix')) return 'Grand Prix';
  if (a.includes('freizeit')) return 'Freizeitgeritten';
  if (a.includes('grundausgebildet') || a.includes('grundausbildung')) return 'Grundausgebildet';
  if (a.includes('fertig ausgebildet') || a.includes('voll ausgebildet')) return 'Fertig ausgebildet';

  return ausbildung;
}

function normalizeEignung(eignung: string | undefined): string {
  if (!eignung) return 'Nicht angegeben';

  const e = eignung.toLowerCase().trim();

  if (e.includes('dressur')) return 'Dressur';
  if (e.includes('spring') || e.includes('parcours')) return 'Springen';
  if (e.includes('vielseitigkeit') || e.includes('eventing')) return 'Vielseitigkeit';
  if (e.includes('freizeit')) return 'Freizeit';
  if (e.includes('western')) return 'Western';
  if (e.includes('gelände') || e.includes('ausritt')) return 'Gelände/Ausreiten';
  if (e.includes('fahren')) return 'Fahrsport';
  if (e.includes('gang') || e.includes('tölt')) return 'Gangreiten';
  if (e.includes('zucht')) return 'Zucht';
  if (e.includes('therapie') || e.includes('voltigieren')) return 'Therapie/Voltigieren';

  return eignung;
}

function getAltersgruppe(alter: number): string {
  if (alter <= 3) return '0-3 Jahre (Jungpferd)';
  if (alter <= 7) return '4-7 Jahre (Aufbaujahre)';
  if (alter <= 12) return '8-12 Jahre (Leistungsjahre)';
  if (alter <= 17) return '13-17 Jahre (Erfahren)';
  return '18+ Jahre (Senior)';
}

function getStockmassgruppe(stockmass: number): string {
  if (stockmass === 0) return 'Nicht angegeben';
  if (stockmass < 130) return 'Pony (< 130 cm)';
  if (stockmass < 148) return 'Kleinpferd (130-147 cm)';
  if (stockmass < 160) return 'Mittleres Pferd (148-159 cm)';
  if (stockmass < 170) return 'Großes Pferd (160-169 cm)';
  return 'Sehr groß (170+ cm)';
}

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function exportMarketData() {
  console.log('🐴 PferdeWert Market Data Export\n');
  console.log(`📦 Connecting to MongoDB: ${MONGODB_DB}...`);

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(MONGODB_DB);
    const collection = db.collection<BewertungDoc>('bewertungen');

    // Nur ECHTE KÄUFE: fertige Bewertungen mit Stripe-Session (keine Tests)
    const query = {
      status: 'fertig',
      bewertung: { $exists: true, $ne: '' },
      stripeSessionId: { $exists: true, $regex: /^cs_/ } // Echte Stripe Sessions starten mit cs_
    };

    // Testdaten-Filter für Rassen (Müll-Eingaben)
    const testRassen = [
      'test', 'fff', 'ggg', 'dsfas', 'sdfsf', 'afsd', 'ddp', 'ddsp', 'asdf', 'asd',
      'xyz', 'abc', 'xxx', 'yyy', 'zzz', 'hallo', 'bla', 'blabla', 'nnn', 'mmm'
    ];

    // Testdaten-Filter für Ausbildungsstand (Müll-Eingaben)
    const testAusbildung = [
      'test', 'nb', 'kjhsdf', 'hvh', 'jj', 'j', 'f', 'g', 'h', 'l', 'asfd', 'fsdf',
      'nabucco', 'catarin', 'drjb', 't2' // Namen statt Ausbildungsstand
    ];

    const allDocs = await collection.find(query).toArray();

    // Schritt 1: Finde PLZs die zu oft vorkommen (wahrscheinlich deine Test-PLZ)
    const plzCount: Record<string, number> = {};
    for (const doc of allDocs) {
      const plz = (doc.standort || '').split(',')[0].trim();
      if (plz) plzCount[plz] = (plzCount[plz] || 0) + 1;
    }
    const testPLZs = Object.entries(plzCount)
      .filter(([, count]) => count > 5) // PLZ kommt >5x vor = verdächtig
      .map(([plz]) => plz);

    console.log(`🚫 Verdächtige Test-PLZs (>5x): ${testPLZs.join(', ')}`);

    // Filter: Testdaten rausfiltern (Rassen, Ausbildung, PLZs)
    const docs = allDocs.filter(doc => {
      const rasse = (doc.rasse || '').toLowerCase().trim();
      const ausbildung = (doc.ausbildung || '').toLowerCase().trim();

      // Rasse ist Test-Rasse?
      if (testRassen.some(t => rasse === t || rasse.includes(t))) return false;
      // Rasse ist zu kurz (wahrscheinlich Müll)?
      if (rasse.length < 3) return false;

      // Ausbildung ist Müll?
      if (testAusbildung.some(t => ausbildung === t)) return false;
      // Ausbildung ist nur 1 Zeichen (außer echte Klassen wie A, E, L, M, S)?
      const valideSingleChars = ['a', 'e', 'l', 'm', 's'];
      if (ausbildung.length === 1 && !valideSingleChars.includes(ausbildung)) return false;

      // Standort ist offensichtlich fake?
      const standort = (doc.standort || '').toLowerCase();
      if (standort.includes('hawai') || standort.includes('test')) return false;
      // PLZ ist eine bekannte Test-PLZ?
      const plz = (doc.standort || '').split(',')[0].trim();
      if (testPLZs.includes(plz)) return false;

      return true;
    });

    console.log(`📊 ${allDocs.length} Bewertungen mit Stripe-Session gefunden`);
    console.log(`✅ ${docs.length} valide Bewertungen nach Testdaten-Filter\n`);

    if (docs.length === 0) {
      console.log('❌ Keine Bewertungen zum Analysieren gefunden');
      return;
    }

    // Statistiken berechnen
    const stats: MarketStats = {
      totalBewertungen: docs.length,
      zeitraum: {
        von: new Date(Math.min(...docs.map(d => new Date(d.erstellt).getTime()))),
        bis: new Date(Math.max(...docs.map(d => new Date(d.erstellt).getTime())))
      },
      rassenVerteilung: {},
      top10Rassen: [],
      altersVerteilung: {
        durchschnitt: 0,
        median: 0,
        min: 0,
        max: 0,
        gruppen: {}
      },
      geschlechterVerteilung: {},
      ausbildungsVerteilung: {},
      eignungsVerteilung: {},
      landVerteilung: {},
      standortVerteilung: {},
      stockmassVerteilung: {
        durchschnitt: 0,
        min: 0,
        max: 0,
        gruppen: {}
      },
      akuVerteilung: {}
    };

    const alter: number[] = [];
    const stockmass: number[] = [];

    for (const doc of docs) {
      // Rassen
      const rasse = normalizeRasse(doc.rasse || 'Unbekannt');
      stats.rassenVerteilung[rasse] = (stats.rassenVerteilung[rasse] || 0) + 1;

      // Alter
      if (doc.alter && doc.alter > 0) {
        alter.push(doc.alter);
        const gruppe = getAltersgruppe(doc.alter);
        stats.altersVerteilung.gruppen[gruppe] = (stats.altersVerteilung.gruppen[gruppe] || 0) + 1;
      }

      // Geschlecht
      const geschlecht = doc.geschlecht || 'Unbekannt';
      stats.geschlechterVerteilung[geschlecht] = (stats.geschlechterVerteilung[geschlecht] || 0) + 1;

      // Ausbildung
      const ausbildung = normalizeAusbildung(doc.ausbildung || 'Unbekannt');
      stats.ausbildungsVerteilung[ausbildung] = (stats.ausbildungsVerteilung[ausbildung] || 0) + 1;

      // Eignung
      const eignung = normalizeEignung(doc.haupteignung);
      stats.eignungsVerteilung[eignung] = (stats.eignungsVerteilung[eignung] || 0) + 1;

      // Land
      const land = doc.land || 'DE';
      stats.landVerteilung[land] = (stats.landVerteilung[land] || 0) + 1;

      // Standort (nur Bundesland/Region)
      if (doc.standort) {
        const standort = doc.standort.split(',')[0].trim();
        stats.standortVerteilung[standort] = (stats.standortVerteilung[standort] || 0) + 1;
      }

      // Stockmaß
      if (doc.stockmass && doc.stockmass > 0) {
        stockmass.push(doc.stockmass);
        const gruppe = getStockmassgruppe(doc.stockmass);
        stats.stockmassVerteilung.gruppen[gruppe] = (stats.stockmassVerteilung.gruppen[gruppe] || 0) + 1;
      }

      // AKU
      if (doc.aku) {
        const akuStatus = doc.aku.toLowerCase().includes('ohne') || doc.aku.toLowerCase().includes('befund')
          ? 'Ohne Befund'
          : doc.aku.toLowerCase().includes('röntgen')
            ? 'Röntgenbefunde'
            : 'Sonstige';
        stats.akuVerteilung[akuStatus] = (stats.akuVerteilung[akuStatus] || 0) + 1;
      }
    }

    // Berechnungen finalisieren
    if (alter.length > 0) {
      stats.altersVerteilung.durchschnitt = Math.round(alter.reduce((a, b) => a + b, 0) / alter.length * 10) / 10;
      stats.altersVerteilung.median = median(alter);
      stats.altersVerteilung.min = Math.min(...alter);
      stats.altersVerteilung.max = Math.max(...alter);
    }

    if (stockmass.length > 0) {
      stats.stockmassVerteilung.durchschnitt = Math.round(stockmass.reduce((a, b) => a + b, 0) / stockmass.length);
      stats.stockmassVerteilung.min = Math.min(...stockmass);
      stats.stockmassVerteilung.max = Math.max(...stockmass);
    }

    // Top 10 Rassen
    stats.top10Rassen = Object.entries(stats.rassenVerteilung)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([rasse, anzahl]) => ({
        rasse,
        anzahl,
        prozent: Math.round(anzahl / docs.length * 1000) / 10
      }));

    // Output
    console.log('═'.repeat(60));
    console.log('📊 MARKTDATEN-ÜBERSICHT');
    console.log('═'.repeat(60));
    console.log(`\n📈 Datenbasis: ${stats.totalBewertungen} Bewertungen`);
    console.log(`📅 Zeitraum: ${stats.zeitraum.von.toLocaleDateString('de-DE')} - ${stats.zeitraum.bis.toLocaleDateString('de-DE')}`);

    console.log('\n\n🐴 TOP 10 RASSEN:');
    console.log('─'.repeat(40));
    stats.top10Rassen.forEach((r, i) => {
      console.log(`${i + 1}. ${r.rasse.padEnd(20)} ${r.anzahl.toString().padStart(4)} (${r.prozent}%)`);
    });

    console.log('\n\n📊 ALTERSVERTEILUNG:');
    console.log('─'.repeat(40));
    console.log(`Durchschnitt: ${stats.altersVerteilung.durchschnitt} Jahre`);
    console.log(`Median: ${stats.altersVerteilung.median} Jahre`);
    console.log(`Spanne: ${stats.altersVerteilung.min} - ${stats.altersVerteilung.max} Jahre`);
    console.log('\nAltersgruppen:');
    Object.entries(stats.altersVerteilung.gruppen)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([gruppe, anzahl]) => {
        const prozent = Math.round(anzahl / docs.length * 100);
        console.log(`  ${gruppe.padEnd(30)} ${anzahl.toString().padStart(4)} (${prozent}%)`);
      });

    console.log('\n\n⚥ GESCHLECHTERVERTEILUNG:');
    console.log('─'.repeat(40));
    Object.entries(stats.geschlechterVerteilung)
      .sort((a, b) => b[1] - a[1])
      .forEach(([geschlecht, anzahl]) => {
        const prozent = Math.round(anzahl / docs.length * 100);
        console.log(`  ${geschlecht.padEnd(20)} ${anzahl.toString().padStart(4)} (${prozent}%)`);
      });

    console.log('\n\n🎯 HAUPTEIGNUNG/DISZIPLIN:');
    console.log('─'.repeat(40));
    Object.entries(stats.eignungsVerteilung)
      .sort((a, b) => b[1] - a[1])
      .forEach(([eignung, anzahl]) => {
        const prozent = Math.round(anzahl / docs.length * 100);
        console.log(`  ${eignung.padEnd(25)} ${anzahl.toString().padStart(4)} (${prozent}%)`);
      });

    console.log('\n\n📚 AUSBILDUNGSSTAND:');
    console.log('─'.repeat(40));
    Object.entries(stats.ausbildungsVerteilung)
      .sort((a, b) => b[1] - a[1])
      .forEach(([ausbildung, anzahl]) => {
        const prozent = Math.round(anzahl / docs.length * 100);
        console.log(`  ${ausbildung.padEnd(25)} ${anzahl.toString().padStart(4)} (${prozent}%)`);
      });

    console.log('\n\n📏 STOCKMASS:');
    console.log('─'.repeat(40));
    console.log(`Durchschnitt: ${stats.stockmassVerteilung.durchschnitt} cm`);
    console.log(`Spanne: ${stats.stockmassVerteilung.min} - ${stats.stockmassVerteilung.max} cm`);
    console.log('\nGrößengruppen:');
    Object.entries(stats.stockmassVerteilung.gruppen)
      .forEach(([gruppe, anzahl]) => {
        const prozent = Math.round(anzahl / docs.length * 100);
        console.log(`  ${gruppe.padEnd(30)} ${anzahl.toString().padStart(4)} (${prozent}%)`);
      });

    console.log('\n\n🌍 LÄNDER:');
    console.log('─'.repeat(40));
    Object.entries(stats.landVerteilung)
      .sort((a, b) => b[1] - a[1])
      .forEach(([land, anzahl]) => {
        const prozent = Math.round(anzahl / docs.length * 100);
        console.log(`  ${land.padEnd(10)} ${anzahl.toString().padStart(4)} (${prozent}%)`);
      });

    if (Object.keys(stats.standortVerteilung).length > 0) {
      console.log('\n\n📍 TOP STANDORTE:');
      console.log('─'.repeat(40));
      Object.entries(stats.standortVerteilung)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([standort, anzahl]) => {
          const prozent = Math.round(anzahl / docs.length * 100);
          console.log(`  ${standort.padEnd(25)} ${anzahl.toString().padStart(4)} (${prozent}%)`);
        });
    }

    // JSON Export
    console.log('\n\n═'.repeat(60));
    console.log('📦 JSON EXPORT:');
    console.log('═'.repeat(60));
    console.log(JSON.stringify(stats, null, 2));

  } finally {
    await client.close();
  }
}

exportMarketData().catch(console.error);
