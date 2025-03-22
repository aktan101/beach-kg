"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { addToFavorites, removeFromFavorites } from "../store/slices/favoritesSlice"
import { addToCart } from "../store/slices/cartSlice"
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa"

const BeachCard = ({ beach }) => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const currentLang = i18n.language
  const favorites = useSelector((state) => state.favorites.items)
  const isFavorite = favorites.some((item) => item.id === beach.id)

  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [days, setDays] = useState(1)

  const handleFavoriteToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      dispatch(removeFromFavorites(beach.id))
    } else {
      dispatch(addToFavorites(beach))
    }
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isAddingToCart) {
      dispatch(
        addToCart({
          id: beach.id,
          name: beach.name[currentLang],
          pricePerDay: beach.pricePerDay,
          days,
        }),
      )
      setIsAddingToCart(false)
      setDays(1)
    } else {
      setIsAddingToCart(true)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <Link to={`/beaches/${beach.id}`} className="block">
        <div className="relative">
          <img
            src={beach.images[0] || "/placeholder.svg"}
            alt={beach.name[currentLang]}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-70 rounded-full"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" size={20} />
            ) : (
              <FaRegHeart className="text-gray-700" size={20} />
            )}
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center">
              <div className="flex items-center text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.floor(beach.rating) ? "text-yellow-400" : "text-gray-300"}
                    size={16}
                  />
                ))}
              </div>
              <span className="text-white font-medium">{beach.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{beach.name[currentLang]}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{beach.description[currentLang]}</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-600 font-bold">
                {beach.pricePerDay} {t("currency")}
              </p>
              <p className="text-xs text-gray-500">{t("perDay")}</p>
            </div>
            {isAddingToCart ? (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  value={days}
                  onChange={(e) => setDays(Number.parseInt(e.target.value) || 1)}
                  className="w-16 p-1 border rounded text-center"
                  onClick={(e) => e.stopPropagation()}
                />
                <button onClick={handleAddToCart} className="p-2 bg-blue-500 text-white rounded-full">
                  <FaShoppingCart size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="p-2 bg-gray-200 hover:bg-blue-500 hover:text-white rounded-full transition-colors"
              >
                <FaShoppingCart size={16} />
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BeachCard

