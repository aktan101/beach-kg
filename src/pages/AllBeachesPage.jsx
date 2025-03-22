"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { setFilters, resetFilters } from "../store/slices/beachesSlice"
import { FaFilter, FaSort, FaStar, FaTimes } from "react-icons/fa"
import BeachCard from "../components/BeachCard"

const AllBeachesPage = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { filteredItems, status, filters } = useSelector((state) => state.beaches)

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState({
    rating: 0,
    minPrice: 0,
    maxPrice: 10000,
    amenities: [],
  })
  const [sortOption, setSortOption] = useState("popular")
  const [sortedBeaches, setSortedBeaches] = useState([])

  // Initialize local filters from redux state
  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  // Apply sorting and update sorted beaches when filtered items change
  useEffect(() => {
    if (filteredItems.length > 0) {
      const sorted = [...filteredItems]

      switch (sortOption) {
        case "priceAsc":
          sorted.sort((a, b) => a.pricePerDay - b.pricePerDay)
          break
        case "priceDesc":
          sorted.sort((a, b) => b.pricePerDay - a.pricePerDay)
          break
        case "rating":
          sorted.sort((a, b) => b.rating - a.rating)
          break
        default: // popular - default sorting
          sorted.sort((a, b) => b.rating * b.reviews.length - a.rating * a.reviews.length)
      }

      setSortedBeaches(sorted)
    }
  }, [filteredItems, sortOption])

  const handleFilterChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleAmenityToggle = (amenity) => {
    setLocalFilters((prev) => {
      const amenities = [...prev.amenities]

      if (amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: amenities.filter((a) => a !== amenity),
        }
      } else {
        return {
          ...prev,
          amenities: [...amenities, amenity],
        }
      }
    })
  }

  const applyFilters = () => {
    dispatch(setFilters(localFilters))
    setIsFilterOpen(false)
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
    setLocalFilters({
      rating: 0,
      minPrice: 0,
      maxPrice: 10000,
      amenities: [],
    })
  }

  const amenitiesList = [
    "parking",
    "restaurants",
    "showers",
    "lifeguards",
    "water_sports",
    "wifi",
    "beach_chairs",
    "water_park",
  ]

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t("beaches.title")}</h1>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors mb-4 md:mb-0"
        >
          <FaFilter className="mr-2" />
          {t("beaches.filter.title")}
        </button>

        <div className="relative">
          <div className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg">
            <FaSort className="mr-2" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent focus:outline-none"
            >
              <option value="popular">{t("beaches.sort.popular")}</option>
              <option value="priceAsc">{t("beaches.sort.priceAsc")}</option>
              <option value="priceDesc">{t("beaches.sort.priceDesc")}</option>
              <option value="rating">{t("beaches.sort.rating")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{t("beaches.filter.title")}</h3>
            <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating Filter */}
            <div>
              <h4 className="font-medium mb-2">{t("beaches.filter.rating")}</h4>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange("rating", rating)}
                    className={`mr-1 p-1 rounded ${localFilters.rating >= rating ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    <FaStar size={24} />
                  </button>
                ))}
                {localFilters.rating > 0 && (
                  <button
                    onClick={() => handleFilterChange("rating", 0)}
                    className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h4 className="font-medium mb-2">{t("beaches.filter.price")}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {localFilters.minPrice} {t("currency")}
                  </span>
                  <span className="text-sm text-gray-600">
                    {localFilters.maxPrice} {t("currency")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={localFilters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={localFilters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Amenities Filter */}
            <div>
              <h4 className="font-medium mb-2">{t("beaches.filter.amenities")}</h4>
              <div className="grid grid-cols-2 gap-2">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="mr-2"
                    />
                    <span className="text-sm">{t(`amenities.${amenity}`)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button onClick={handleResetFilters} className="px-4 py-2 text-gray-700 hover:text-gray-900">
              {t("beaches.filter.reset")}
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t("beaches.filter.apply")}
            </button>
          </div>
        </div>
      )}

      {/* Beaches Grid */}
      {status === "loading" ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : status === "failed" ? (
        <div className="text-center py-12 text-red-500">{t("errors.failedToLoad")}</div>
      ) : sortedBeaches.length === 0 ? (
        <div className="text-center py-12 text-gray-500">{t("beaches.noResults")}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedBeaches.map((beach) => (
            <BeachCard key={beach.id} beach={beach} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllBeachesPage

