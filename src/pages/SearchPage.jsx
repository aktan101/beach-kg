"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { searchBeaches } from "../store/slices/beachesSlice"
import { FaSearch } from "react-icons/fa"
import BeachCard from "../components/BeachCard"

const SearchPage = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const dispatch = useDispatch()
  const currentLang = i18n.language

  const { filteredItems, status } = useSelector((state) => state.beaches)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const query = params.get("q") || ""
    setSearchQuery(query)

    if (query) {
      dispatch(searchBeaches(query))
    }
  }, [location.search, dispatch])

  // Update search results when filtered items change
  useEffect(() => {
    setSearchResults(filteredItems)
  }, [filteredItems])

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(searchBeaches(searchQuery))
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{t("search.title")}</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex w-full max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("header.search")}
            className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            <FaSearch />
          </button>
        </div>
      </form>

      {status === "loading" ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : status === "failed" ? (
        <div className="text-center py-12 text-red-500">{t("errors.failedToLoad")}</div>
      ) : searchResults.length === 0 ? (
        <div className="text-center py-12 text-gray-500">{t("search.noResults")}</div>
      ) : (
        <>
          <p className="text-lg text-gray-600 mb-6">
            {t("search.subtitle")} <span className="font-semibold">{searchResults.length}</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((beach) => (
              <BeachCard key={beach.id} beach={beach} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchPage

