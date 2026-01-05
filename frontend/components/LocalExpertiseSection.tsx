// components/LocalExpertiseSection.tsx
// Unique content section for AT/CH domains explaining localized algorithm
// Purpose: Differentiate AT/CH from DE to improve indexing

import { MapPin, Award, CheckCircle, Settings, Heart, TrendingUp } from 'lucide-react';
import { useCountryConfig } from '@/hooks/useCountryConfig';

// Pre-define icons at module level (Fast Refresh Fix)
const mapPinIcon = <MapPin className="w-6 h-6 text-brand-brown" />;
const awardIcon = <Award className="w-6 h-6 text-brand-brown" />;
const checkCircleIcon = <CheckCircle className="w-6 h-6 text-brand-brown" />;
const settingsIcon = <Settings className="w-6 h-6 text-brand-brown" />;
const heartIcon = <Heart className="w-6 h-6 text-brand-brown" />;
const trendingUpIcon = <TrendingUp className="w-6 h-6 text-brand-brown" />;

export default function LocalExpertiseSection() {
  const { isAustria, isSwitzerland } = useCountryConfig();

  // Only render on AT/CH domains
  if (!isAustria && !isSwitzerland) {
    return null;
  }

  // Country-specific content
  const countryName = isAustria ? 'Österreich' : 'Schweiz';
  const federation = isAustria ? 'OEPS' : 'SVPS';
  const federationFull = isAustria
    ? 'Österreichischen Pferdesportverband (OEPS)'
    : 'Schweizerischen Verband für Pferdesport (SVPS)';

  // Training level differences explanation
  const trainingDifferences = isAustria
    ? {
        headline: 'Österreichisches Ausbildungssystem',
        description: 'Unser Formular nutzt die in Österreich üblichen Ausbildungsstufen. Anders als in Deutschland kennt das österreichische System kein E-Level (Einsteiger). Dafür gibt es spezielle Zwischenstufen wie LP (L mit Galoppwechseln) und LM (L mit Seitengängen), die den Wert präziser abbilden.',
        levels: ['A', 'L', 'LP', 'LM', 'M', 'S'],
        uniqueNote: 'LP und LM sind österreichische Zwischenstufen, die es in Deutschland nicht gibt'
      }
    : {
        headline: 'Schweizer Ausbildungssystem',
        description: 'In der Schweiz ist das Ausbildungssystem etwas vereinfacht. Es gibt kein E-Level (Einsteiger) wie in Deutschland. Die Klassifizierung folgt dem SVPS-Standard und wird entsprechend in unserer Bewertung berücksichtigt.',
        levels: ['A', 'L', 'M', 'S'],
        uniqueNote: 'Das Schweizer System ist schlanker als das deutsche oder österreichische'
      };

  const marketFeatures = isAustria
    ? [
        'Preisdaten aus Wien, Salzburg, Tirol und allen Bundesländern',
        'Berücksichtigung lokaler Auktionsergebnisse (z.B. Stadl-Paura)',
        'Haflinger-Expertise: Die beliebteste Rasse Österreichs'
      ]
    : [
        'Preisdaten aus Zürich, Bern, Basel und allen Kantonen',
        'Berücksichtigung des Schweizer Preisniveaus',
        'Freiberger-Expertise: Die Schweizer Nationalrasse'
      ];

  // Popular breeds in the country
  const popularBreeds = isAustria
    ? [
        { name: 'Haflinger', note: 'Österreichs beliebteste Rasse' },
        { name: 'Lipizzaner', note: 'Spanische Hofreitschule Wien' },
        { name: 'Noriker', note: 'Traditionelle Kaltblutrasse' },
        { name: 'Warmblut', note: 'Dressur & Springen' },
      ]
    : [
        { name: 'Freiberger', note: 'Schweizer Nationalrasse' },
        { name: 'Warmblut', note: 'Sport & Freizeit' },
        { name: 'Haflinger', note: 'Beliebte Freizeitrasse' },
        { name: 'Isländer', note: 'Für Gangpferde-Fans' },
      ];

  // Regional price factors
  const regionalFactors = isAustria
    ? {
        headline: 'Regionale Preisunterschiede in Österreich',
        description: 'Der österreichische Pferdemarkt zeigt deutliche regionale Unterschiede. Pferde aus Tirol und Vorarlberg erzielen oft andere Preise als in Niederösterreich oder der Steiermark.',
        examples: [
          { region: 'Wien & Umgebung', factor: 'Höhere Nachfrage, urbaner Markt' },
          { region: 'Tirol & Salzburg', factor: 'Starke Haflinger-Tradition' },
          { region: 'Steiermark', factor: 'Vielseitiger Markt, gute Zuchtbetriebe' },
        ]
      }
    : {
        headline: 'Regionale Preisunterschiede in der Schweiz',
        description: 'Die Schweizer Kantone zeigen unterschiedliche Marktdynamiken. Das generell höhere Preisniveau wird durch unsere Bewertung berücksichtigt.',
        examples: [
          { region: 'Zürich & Basel', factor: 'Urbaner Markt, höhere Preise' },
          { region: 'Jura & Bern', factor: 'Freiberger-Hochburg' },
          { region: 'Graubünden', factor: 'Bergregion, robuste Rassen' },
        ]
      };

  return (
    <section className="section bg-gradient-to-b from-white to-brand-light/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-brand-light px-4 py-2 rounded-full text-sm font-medium text-brand-brown mb-4">
            {mapPinIcon}
            Speziell für {countryName}
          </span>
          <h2 className="text-h2 font-bold text-gray-900 mb-4">
            Pferdebewertung in {countryName}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unser Modell wurde speziell für den Markt in {countryName} entwickelt – mit {isAustria ? 'österreichischem' : 'Schweizer'} Ausbildungssystem,
            regionalen Marktdaten und {federation}-konformen Standards.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Training System Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              {settingsIcon}
              <h3 className="text-xl font-bold text-gray-900">
                {trainingDifferences.headline}
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              {trainingDifferences.description}
            </p>

            {/* Training Levels Display */}
            <div className="bg-brand-light/50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Verfügbare Ausbildungsstufen im Formular:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm text-gray-600">roh</span>
                <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm text-gray-600">angeritten</span>
                {trainingDifferences.levels.map(level => (
                  <span
                    key={level}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      ['LP', 'LM'].includes(level)
                        ? 'bg-brand-brown text-white'
                        : 'bg-brand-light text-brand-brown'
                    }`}
                  >
                    {level}
                  </span>
                ))}
                <span className="px-3 py-1 bg-gray-200 rounded-lg text-sm text-gray-600">Sonstiges</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 italic">
              {trainingDifferences.uniqueNote}
            </p>
          </div>

          {/* Market Data Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              {awardIcon}
              <h3 className="text-xl font-bold text-gray-900">
                Regionale Marktexpertise
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Der {isAustria ? 'österreichische' : 'Schweizer'} Pferdemarkt hat eigene Dynamiken.
              Unser Modell berücksichtigt lokale Preisunterschiede und regionale Besonderheiten.
            </p>

            <ul className="space-y-3">
              {marketFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  {checkCircleIcon}
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">Warum das wichtig ist:</strong> Ein Pferd in {isAustria ? 'Tirol' : 'Graubünden'} kann
                einen anderen Marktwert haben als dasselbe Pferd in {isAustria ? 'Wien' : 'Zürich'}.
                Unsere Bewertung berücksichtigt diese regionalen Unterschiede.
              </p>
            </div>
          </div>
        </div>

        {/* Second Row: Popular Breeds & Regional Factors */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-8">

          {/* Popular Breeds Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              {heartIcon}
              <h3 className="text-xl font-bold text-gray-900">
                Beliebte Rassen in {countryName}
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Unsere KI kennt die Besonderheiten der in {countryName} beliebten Pferderassen
              und bewertet sie entsprechend ihrer Marktrelevanz.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {popularBreeds.map((breed, index) => (
                <div key={index} className="bg-brand-light/30 rounded-lg p-3">
                  <p className="font-semibold text-gray-900">{breed.name}</p>
                  <p className="text-xs text-gray-600">{breed.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Price Factors Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              {trendingUpIcon}
              <h3 className="text-xl font-bold text-gray-900">
                {regionalFactors.headline}
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              {regionalFactors.description}
            </p>

            <div className="space-y-3">
              {regionalFactors.examples.map((example, index) => (
                <div key={index} className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-brown mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{example.region}:</span>{' '}
                    <span className="text-gray-600">{example.factor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Federation Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-xl px-6 py-4 shadow-md border border-gray-100">
            <Award className="w-5 h-5 text-brand-brown" />
            <p className="text-gray-700">
              Ausbildungsstufen basierend auf dem {federationFull}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
