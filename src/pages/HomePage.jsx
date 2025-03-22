"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { FaArrowRight, FaStar } from "react-icons/fa"
import BeachCard from "../components/BeachCard"

const HomePage = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const { items: beaches, status } = useSelector((state) => state.beaches)
  const [popularBeaches, setPopularBeaches] = useState([])
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    if (beaches.length > 0) {
      // Get top rated beaches
      const topRated = [...beaches].sort((a, b) => b.rating - a.rating).slice(0, 4)
      setPopularBeaches(topRated)

      // Get random testimonials
      const allTestimonials = beaches.flatMap((beach) =>
        beach.reviews.map((review) => ({
          ...review,
          beachName: beach.name[currentLang],
        })),
      )

      // Shuffle and get 3 testimonials
      const shuffled = [...allTestimonials].sort(() => 0.5 - Math.random())
      setTestimonials(shuffled.slice(0, 3))
    }
  }, [beaches, currentLang])

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-blue-600 rounded-2xl overflow-hidden">
          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("home.hero.title")}</h1>
              <p className="text-xl mb-8">{t("home.hero.subtitle")}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/beaches"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {t("home.hero.exploreButton")}
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  {t("home.hero.aboutButton")}
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent"></div>
          <img
            src="https://avatars.mds.yandex.net/get-vertis-journal/4466156/cover.jpg_1704460145002/orig"
            alt={t("home.hero.imageAlt")}
            className="absolute top-0 right-0 h-full w-1/2 object-cover object-left opacity-75 hidden md:block"
          />
        </div>
      </section>

      {/* Popular Beaches Section */}
      <section>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{t("home.popularBeaches.title")}</h2>
            <Link to="/beaches" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              {t("home.popularBeaches.viewAll")} <FaArrowRight className="ml-2" />
            </Link>
          </div>

          {status === "loading" ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : status === "failed" ? (
            <div className="text-center py-12 text-red-500">{t("errors.failedToLoad")}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularBeaches.map((beach) => (
                <BeachCard key={beach.id} beach={beach} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("home.features.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("home.features.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("home.features.quality.title")}</h3>
              <p className="text-gray-600">{t("home.features.quality.description")}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("home.features.convenience.title")}</h3>
              <p className="text-gray-600">{t("home.features.convenience.description")}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("home.features.community.title")}</h3>
              <p className="text-gray-600">{t("home.features.community.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("home.testimonials.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("home.testimonials.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(testimonial.rating) ? "text-yellow-400" : "text-gray-300"}
                        size={16}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">{testimonial.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text[currentLang]}"</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">
                      {t("home.testimonials.about")} {testimonial.beachName}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{new Date(testimonial.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 rounded-2xl text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{t("home.cta.title")}</h2>
            <p className="text-xl mb-8">{t("home.cta.subtitle")}</p>
            <Link
              to="/beaches"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t("home.cta.button")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

