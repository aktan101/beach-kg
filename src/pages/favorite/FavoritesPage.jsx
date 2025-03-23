"use client"

import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { clearFavorites } from "../../store/slices/favoritesSlice.js"
import { Link } from "react-router-dom"
import { FaHeart, FaTrash } from "react-icons/fa"
import BeachCard from "../../components/BeachCard.jsx"

const FavoritesPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { items: favorites } = useSelector((state) => state.favorites)

  const handleClearFavorites = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      dispatch(clearFavorites())
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t("favorites.title")}</h1>

        {favorites.length > 0 && (
          <button
            onClick={handleClearFavorites}
            className="flex items-center text-red-600 hover:text-red-800 transition-colors"
          >
            <FaTrash className="mr-2" />
            {t("favorites.removeAll")}
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FaHeart className="text-gray-400" size={24} />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{t("favorites.empty")}</h2>
          <p className="text-gray-500 mb-6">Add beaches to your favorites to see them here.</p>
          <Link
            to="/beaches"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("beaches.title")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((beach) => (
            <BeachCard key={beach.id} beach={beach} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage

