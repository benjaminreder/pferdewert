/**
 * Export Bewertungen to Markdown for manual review
 */

import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || 'test';

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
  land?: string;
  erstellt: Date;
  stripeSessionId?: string;
}

async function exportToMd() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  const query = {
    status: 'fertig',
    bewertung: { $exists: true, $ne: '' },
    stripeSessionId: { $exists: true, $regex: /^cs_/ }
  };

  const docs = await db.collection<BewertungDoc>('bewertungen')
    .find(query)
    .sort({ erstellt: -1 })
    .toArray();

  // Test-Filter
  const testRassen = [
    'test', 'fff', 'ggg', 'dsfas', 'sdfsf', 'afsd', 'ddp', 'ddsp', 'asdf', 'asd',
    'xyz', 'abc', 'xxx', 'yyy', 'zzz', 'hallo', 'bla', 'blabla', 'nnn', 'mmm'
  ];
  const testAusbildung = [
    'test', 'nb', 'kjhsdf', 'hvh', 'jj', 'j', 'f', 'g', 'h', 'l', 'asfd', 'fsdf',
    'nabucco', 'catarin', 'drjb', 't2'
  ];

  // PLZ-Häufigkeit
  const plzCount: Record<string, number> = {};
  docs.forEach(d => {
    const plz = (d.standort || '').split(',')[0].trim();
    if (plz) plzCount[plz] = (plzCount[plz] || 0) + 1;
  });
  const testPLZs = Object.entries(plzCount)
    .filter(([, c]) => c > 5)
    .map(([p]) => p);

  const filtered = docs.filter(doc => {
    const rasse = (doc.rasse || '').toLowerCase().trim();
    const ausbildung = (doc.ausbildung || '').toLowerCase().trim();

    if (testRassen.some(t => rasse === t || rasse.includes(t))) return false;
    if (rasse.length < 3) return false;
    if (testAusbildung.some(t => ausbildung === t)) return false;

    const valideSingleChars = ['a', 'e', 'l', 'm', 's'];
    if (ausbildung.length === 1 && !valideSingleChars.includes(ausbildung)) return false;

    const standort = (doc.standort || '').toLowerCase();
    if (standort.includes('hawai') || standort.includes('test')) return false;

    const plz = (doc.standort || '').split(',')[0].trim();
    if (testPLZs.includes(plz)) return false;

    return true;
  });

  // MD erstellen
  let md = `# Bewertungen Export (${filtered.length} Einträge)\n\n`;
  md += `Exportiert am: ${new Date().toLocaleString('de-DE')}\n\n`;
  md += `Rausgefilterte Test-PLZs: ${testPLZs.join(', ')}\n\n`;
  md += `---\n\n`;

  filtered.forEach((doc, i) => {
    const datum = doc.erstellt
      ? new Date(doc.erstellt).toLocaleDateString('de-DE')
      : 'k.A.';

    md += `## ${i + 1}. ${doc.rasse || 'k.A.'} (${datum})\n\n`;
    md += `| Feld | Wert |\n`;
    md += `|------|------|\n`;
    md += `| Rasse | ${doc.rasse || '-'} |\n`;
    md += `| Alter | ${doc.alter || '-'} Jahre |\n`;
    md += `| Geschlecht | ${doc.geschlecht || '-'} |\n`;
    md += `| Stockmaß | ${doc.stockmass || '-'} cm |\n`;
    md += `| Ausbildung | ${doc.ausbildung || '-'} |\n`;
    md += `| Haupteignung | ${doc.haupteignung || '-'} |\n`;
    md += `| Abstammung | ${doc.abstammung || '-'} |\n`;
    md += `| AKU | ${doc.aku || '-'} |\n`;
    md += `| Erfolge | ${doc.erfolge || '-'} |\n`;
    md += `| Standort | ${doc.standort || '-'} |\n`;
    md += `| Land | ${doc.land || 'DE'} |\n`;
    md += `\n---\n\n`;
  });

  // Sicherstellen dass .working existiert
  if (!fs.existsSync('.working')) {
    fs.mkdirSync('.working', { recursive: true });
  }

  fs.writeFileSync('.working/bewertungen-export.md', md);
  console.log(`✅ Exportiert: .working/bewertungen-export.md (${filtered.length} Einträge)`);

  await client.close();
}

exportToMd().catch(console.error);
