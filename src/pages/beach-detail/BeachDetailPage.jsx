"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { addToFavorites, removeFromFavorites } from "../../store/slices/favoritesSlice.js"
import { addToCart } from "../../store/slices/cartSlice.js"
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa"

const BeachDetailPage = () => {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const currentLang = i18n.language

  const { items: beaches, status } = useSelector((state) => state.beaches)
  const favorites = useSelector((state) => state.favorites.items)

  const [beach, setBeach] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [days, setDays] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (beaches.length > 0) {
      const foundBeach = beaches.find((b) => b.id === Number.parseInt(id))
      if (foundBeach) {
        setBeach(foundBeach)
        setIsFavorite(favorites.some((item) => item.id === foundBeach.id))
      }
    }
  }, [beaches, id, favorites])

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(beach.id))
    } else {
      dispatch(addToFavorites(beach))
    }
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: beach.id,
        name: beach.name[currentLang],
        pricePerDay: beach.pricePerDay,
        days,
      }),
    )
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (status === "failed") {
    return <div className="text-center py-12 text-red-500">{t("errors.failedToLoad")}</div>
  }

  if (!beach) {
    return <div className="text-center py-12 text-gray-500">Beach not found</div>
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <Link to="/beaches" className="text-blue-600 hover:underline">
          &larr; {t("beaches.title")}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="relative mb-4">
            <img
              src={beach.images[activeImage] || "/placeholder.svg"}
              alt={beach.name[currentLang]}
              className="w-full h-96 object-cover rounded-lg"
            />
            <button
              onClick={handleFavoriteToggle}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-70 rounded-full"
            >
              {isFavorite ? (
                <FaHeart className="text-red-500" size={24} />
              ) : (
                <FaRegHeart className="text-gray-700" size={24} />
              )}
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {beach.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`border-2 rounded ${activeImage === index ? "border-blue-500" : "border-transparent"}`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${beach.name[currentLang]} ${index + 1}`}
                  className="w-full h-20 object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Beach Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{beach.name[currentLang]}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(beach.rating) ? "text-yellow-400" : "text-gray-300"}
                  size={20}
                />
              ))}
            </div>
            <span className="text-gray-700 font-medium">{beach.rating.toFixed(1)}</span>
            <span className="text-gray-500 ml-2">
              ({beach.reviews.length} {t("beach.reviews.title").toLowerCase()})
            </span>
          </div>

          <p className="text-gray-700 mb-6">{beach.description[currentLang]}</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("beach.price")}</h3>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-blue-600 font-bold text-2xl">
                  {beach.pricePerDay} {t("currency")}
                </p>
                <p className="text-gray-500">{t("beach.perDay")}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-blue-600 font-bold text-2xl">
                  {beach.pricePerMonth} {t("currency")}
                </p>
                <p className="text-gray-500">{t("beach.perMonth")}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("beach.amenities")}</h3>
            <div className="flex flex-wrap gap-2">
              {beach.amenities.map((amenity) => (
                <span key={amenity} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {t(`amenities.${amenity}`)}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t("beach.characteristics.title")}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600 mb-1">{t("beach.characteristics.cleanliness")}</p>
                <div className="flex items-center">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(beach.cleanliness) ? "text-yellow-400" : "text-gray-300"}
                        size={16}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700">{beach.cleanliness.toFixed(1)}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-1">{t("beach.characteristics.facilities")}</p>
                <div className="flex items-center">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(beach.facilities) ? "text-yellow-400" : "text-gray-300"}
                        size={16}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700">{beach.facilities.toFixed(1)}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-1">{t("beach.characteristics.accessibility")}</p>
                <div className="flex items-center">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(beach.accessibility) ? "text-yellow-400" : "text-gray-300"}
                        size={16}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700">{beach.accessibility.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaShoppingCart className="mr-2" />
              {t("beach.addToCart")}
            </button>
            <button
              onClick={handleFavoriteToggle}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isFavorite ? (
                <>
                  <FaHeart className="mr-2 text-red-500" />
                  {t("beach.removeFromFavorites")}
                </>
              ) : (
                <>
                  <FaRegHeart className="mr-2" />
                  {t("beach.addToFavorites")}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {beach.videoUrl && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("beach.video")}</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={beach.videoUrl.replace("watch?v=", "embed/")}
              title={`${beach.name[currentLang]} video`}
              className="w-full h-96 rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("beach.reviews.title")}</h2>

        {beach.reviews.length === 0 ? (
          <p className="text-gray-500">{t("beach.reviews.noReviews")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beach.reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(review.rating) ? "text-yellow-400" : "text-gray-300"}
                        size={16}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">{review.rating.toFixed(1)}</span>
                </div>
                <p className="text-gray-700 mb-4">"{review.text[currentLang]}"</p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-800">{review.author}</p>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Location Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("beach.location")}</h2>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center">
          <FaMapMarkerAlt className="text-red-500 mr-2" size={24} />
          <p className="text-gray-700">
            {beach.location.lat.toFixed(4)}, {beach.location.lng.toFixed(4)}
          </p>
        </div>
        <div className="mt-4 h-96 bg-gray-200 rounded-lg">
          {/* Here you would integrate a map component like Google Maps or Leaflet */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Map would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeachDetailPage

