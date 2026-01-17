import Image from 'next/image'
import LocalizedLink from '@/components/LocalizedLink'

/**
 * FounderSection - E-E-A-T Signal für die Homepage
 *
 * Zeigt die Gründer mit echten, verifizierbaren Fakten:
 * - Pferdebesitzer seit 2017
 * - 3 Pferdekäufe/-verkäufe selbst erlebt
 * - Über 10 Jahre Digitalbranche-Erfahrung
 *
 * WICHTIG: Alle Angaben sind faktisch korrekt und verifizierbar.
 */
export default function FounderSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Wer steckt hinter PferdeWert?
            </h2>
            <p className="text-gray-600">
              Eine Pferdefamilie aus Stuttgart mit Leidenschaft für Technologie
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:w-2/5 relative">
                <div className="aspect-[4/3] md:aspect-auto md:h-full relative">
                  <Image
                    src="/images/shared/familie-blossi.webp"
                    alt="Die PferdeWert Gründer Sabine und Benjamin Reder mit Stute Blossi"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-gray-800 font-medium italic mb-6 border-l-4 border-brand-brown pl-4">
                  &ldquo;Wir kennen die Realität der Pferdehaltung aus erster Hand –
                  und verbinden sie mit modernster KI-Technologie.&rdquo;
                </blockquote>

                {/* Facts */}
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-brown mt-0.5">🐴</span>
                    <span className="text-gray-700">
                      <strong>Pferdebesitzer seit 2017</strong> – aktuell mit unserer
                      Stute Blossi (Deutsches Sportpferd)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-brown mt-0.5">💰</span>
                    <span className="text-gray-700">
                      <strong>3 Pferdekäufe und -verkäufe</strong> selbst durchlebt –
                      wir kennen den Markt aus Käufer- und Verkäufersicht
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-brown mt-0.5">💻</span>
                    <span className="text-gray-700">
                      <strong>Über 10 Jahre Erfahrung</strong> in der Digitalbranche
                    </span>
                  </li>
                </ul>

                {/* Founders */}
                <div className="flex items-center gap-4 pt-4 border-t border-amber-100">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Sabine &amp; Benjamin Reder</p>
                    <p className="text-sm text-gray-600">Gründer von PferdeWert</p>
                  </div>
                  <LocalizedLink
                    href="/ueber-pferdewert"
                    className="text-sm font-medium text-brand-brown hover:text-brand-brownDark transition-colors flex items-center gap-1"
                  >
                    Mehr über uns
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </LocalizedLink>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-brand-brown">2017</p>
              <p className="text-sm text-gray-600">Pferdebesitzer seit</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-brand-brown">3</p>
              <p className="text-sm text-gray-600">Pferde gekauft/verkauft</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-brand-brown">10+</p>
              <p className="text-sm text-gray-600">Jahre Digitalerfahrung</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-brand-brown">4.000+</p>
              <p className="text-sm text-gray-600">Instagram Follower</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
