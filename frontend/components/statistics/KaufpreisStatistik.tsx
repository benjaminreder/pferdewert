/**
 * KaufpreisStatistik Component
 *
 * Zeigt echte Marktdaten aus 90 KI-Bewertungen von PferdeWert.de
 * Basierend auf realen Pferdebewertungen aus unserer Datenbank
 */

import { TrendingUp, BarChart3, Database, Euro } from 'lucide-react'
import LocalizedLink from '@/components/LocalizedLink'

// Statische Daten aus der Analyse von 90 echten Bewertungen (Januar 2026)
const STATISTIK_DATEN = {
  anzahl: 90,
  durchschnitt: 15893,
  median: 12500,
  min: 1000,
  max: 60000,
  stand: 'Januar 2026',
  verteilung: [
    { label: 'Unter 5.000 €', count: 11, percent: 12.2 },
    { label: '5.000 - 10.000 €', count: 15, percent: 16.7 },
    { label: '10.000 - 20.000 €', count: 35, percent: 38.9 },
    { label: '20.000 - 35.000 €', count: 21, percent: 23.3 },
    { label: '35.000 - 50.000 €', count: 6, percent: 6.7 },
    { label: 'Über 50.000 €', count: 2, percent: 2.2 },
  ]
}

// Farben für die Balken
const BALKEN_FARBEN = [
  'bg-green-500',
  'bg-emerald-500',
  'bg-brand-brown',
  'bg-amber-500',
  'bg-orange-500',
  'bg-red-500',
]

// Preis-Formatierung (module level für Performance)
const formatPreis = (preis: number) =>
  preis.toLocaleString('de-DE', { maximumFractionDigits: 0 })

interface KaufpreisStatistikProps {
  /** Kompakte Ansicht ohne Verteilung */
  compact?: boolean
  /** Zusätzliche CSS-Klassen */
  className?: string
  /** CTA anzeigen */
  showCta?: boolean
}

export default function KaufpreisStatistik({
  compact = false,
  className = '',
  showCta = true
}: KaufpreisStatistikProps) {
  return (
    <div className={`bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-amber-100/50 px-5 py-4 border-b border-amber-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-brown/10 rounded-lg">
            <BarChart3 className="w-5 h-5 text-brand-brown" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              Echte Marktdaten: Was kosten Pferde wirklich?
            </h3>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Database className="w-3.5 h-3.5" />
              Basierend auf {STATISTIK_DATEN.anzahl} KI-Bewertungen ({STATISTIK_DATEN.stand})
            </p>
          </div>
        </div>
      </div>

      {/* Hauptstatistiken */}
      <div className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* Durchschnitt */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Durchschnitt
            </div>
            <div className="text-2xl font-bold text-brand-brown">
              {formatPreis(STATISTIK_DATEN.durchschnitt)} €
            </div>
          </div>

          {/* Median */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Median
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {formatPreis(STATISTIK_DATEN.median)} €
            </div>
          </div>

          {/* Min */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Minimum
            </div>
            <div className="text-xl font-semibold text-gray-700">
              {formatPreis(STATISTIK_DATEN.min)} €
            </div>
          </div>

          {/* Max */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Maximum
            </div>
            <div className="text-xl font-semibold text-gray-700">
              {formatPreis(STATISTIK_DATEN.max)} €
            </div>
          </div>
        </div>

        {/* Preisverteilung */}
        {!compact && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-brown" />
              Preisverteilung
            </h4>
            <div className="space-y-3" role="img" aria-label="Preisverteilung: Die meisten Pferde (39%) kosten zwischen 10.000 und 20.000 Euro">
              {STATISTIK_DATEN.verteilung.map((item, index) => (
                <div key={item.label} className="flex items-center gap-3" aria-hidden="true">
                  <div className="w-32 text-sm text-gray-600 shrink-0">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className={`h-full ${BALKEN_FARBEN[index]} rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                      style={{ width: `${Math.max(item.percent, 8)}%` }}
                    >
                      <span className="text-xs font-medium text-white">
                        {item.count}
                      </span>
                    </div>
                  </div>
                  <div className="w-14 text-sm font-medium text-gray-700 text-right">
                    {item.percent.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insight Box */}
        <div className="bg-brand-brown/5 rounded-lg p-4 border border-brand-brown/20">
          <div className="flex gap-3">
            <Euro className="w-5 h-5 text-brand-brown shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">Die meisten Pferde (39%)</strong> werden zwischen{' '}
                <strong className="text-brand-brown">10.000 € und 20.000 €</strong> bewertet.
                Der Median von {formatPreis(STATISTIK_DATEN.median)} € zeigt, dass die Hälfte
                aller bewerteten Pferde unter diesem Wert liegt.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        {showCta && (
          <div className="mt-5 pt-5 border-t border-amber-200">
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center gap-2 bg-brand-brown hover:bg-brand-brown-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Dein Pferd bewerten lassen
            </LocalizedLink>
            <p className="text-xs text-gray-500 mt-2">
              KI-gestützte Marktwertanalyse in 2 Minuten
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
