"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa"

const ContactsPage = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("contacts.title")}</h1>
      <p className="text-xl text-gray-600 mb-8">{t("contacts.subtitle")}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Contact Information */}
        <div>
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{t("contacts.address")}</h2>
            <div className="flex items-start mb-4">
              <FaMapMarkerAlt className="text-blue-500 mt-1 mr-3" size={20} />
              <p className="text-gray-700">
                {t("contacts.address")}: {t("footer.address")}
              </p>
            </div>
            <div className="flex items-start mb-4">
              <FaPhone className="text-blue-500 mt-1 mr-3" size={20} />
              <p className="text-gray-700">{t("contacts.phone")}: +996 (123) 456-789</p>
            </div>
            <div className="flex items-start">
              <FaEnvelope className="text-blue-500 mt-1 mr-3" size={20} />
              <p className="text-gray-700">{t("contacts.email")}: info@kyrgyzstanbeaches.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Location</h2>
            <div className="h-64 bg-gray-200 rounded-lg">
              {/* Here you would integrate a map component like Google Maps or Leaflet */}
              <div className="w-full h-full flex items-center justify-center">
                <iframe className='w-full h-full'
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6157235.462234152!2d69.46024913672899!3d41.102586407807046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3897381dfce927f3%3A0x281058b74e88c433!2z0JrRi9GA0LPRi9C30YHRgtCw0L0!5e0!3m2!1sru!2skg!4v1742644749424!5m2!1sru!2skg"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{t("contacts.form.title")}</h2>

          {submitSuccess ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Thank you for your message! We will get back to you soon.
            </div>
          ) : submitError ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              There was an error sending your message. Please try again later.
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                {t("contacts.form.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                {t("contacts.form.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                {t("contacts.form.message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                t("contacts.form.send")
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What is the best time to visit beaches in Kyrgyzstan?</h3>
            <p className="text-gray-700">
              The beach season in Kyrgyzstan typically runs from June to September, with July and August being the
              warmest months. Water temperatures at Issyk-Kul Lake are most comfortable during this period.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Do I need a visa to visit Kyrgyzstan?</h3>
            <p className="text-gray-700">
              Citizens of many countries can visit Kyrgyzstan visa-free for up to 60 days. However, visa requirements
              vary by nationality, so it's best to check with the Kyrgyz embassy or consulate in your country before
              traveling.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What currency is used in Kyrgyzstan?</h3>
            <p className="text-gray-700">
              The official currency is the Kyrgyzstani Som (KGS). Major hotels and some restaurants in tourist areas may
              accept credit cards, but it's advisable to carry cash, especially when visiting beaches and rural areas.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How do I get to Issyk-Kul Lake from Bishkek?</h3>
            <p className="text-gray-700">
              Issyk-Kul Lake is about 250 km from Bishkek. You can reach it by marshrutka (shared minibus), taxi, or
              rental car. The journey takes approximately 3-4 hours, depending on your specific destination around the
              lake.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactsPage

