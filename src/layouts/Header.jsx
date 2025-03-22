"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { setLanguage } from "../store/slices/languageSlice.js"
import { FaUser, FaHeart, FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa"

const Header = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const { isAuthenticated } = useSelector((state) => state.user)
  const { items: cartItems } = useSelector((state) => state.cart)
  const { items: favoriteItems } = useSelector((state) => state.favorites)
  const { current: currentLanguage } = useSelector((state) => state.language)

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
    dispatch(setLanguage(lang))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-colors">
            Beach KG
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 hover:text-blue-500 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors">
              {t("header.home")}
            </Link>
            <Link to="/beaches" className="text-gray-700 hover:text-blue-500 transition-colors">
              {t("header.beaches")}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-500 transition-colors">
              {t("header.about")}
            </Link>
            <Link to="/contacts" className="text-gray-700 hover:text-blue-500 transition-colors">
              {t("header.contacts")}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-blue-500 transition-colors">
                {currentLanguage.toUpperCase()}
              </button>
              <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-md overflow-hidden z-10 hidden group-hover:block">
                <button
                  onClick={() => handleLanguageChange("ru")}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${currentLanguage === "ru" ? "bg-gray-100" : ""}`}
                >
                  Русский
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${currentLanguage === "en" ? "bg-gray-100" : ""}`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("kg")}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${currentLanguage === "kg" ? "bg-gray-100" : ""}`}
                >
                  Кыргызча
                </button>
              </div>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={t("header.search")}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>

            {/* Favorites */}
            <Link to="/favorites" className="relative text-gray-700 hover:text-blue-500 transition-colors">
              <FaHeart size={20} />
              {favoriteItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-500 transition-colors">
              <FaShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="text-gray-700 hover:text-blue-500 transition-colors"
            >
              <FaUser size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors" onClick={toggleMenu}>
                {t("header.home")}
              </Link>
              <Link to="/beaches" className="text-gray-700 hover:text-blue-500 transition-colors" onClick={toggleMenu}>
                {t("header.beaches")}
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-500 transition-colors" onClick={toggleMenu}>
                {t("header.about")}
              </Link>
              <Link to="/contacts" className="text-gray-700 hover:text-blue-500 transition-colors" onClick={toggleMenu}>
                {t("header.contacts")}
              </Link>
            </nav>

            <div className="mt-4 flex flex-col space-y-4">
              {/* Language Selector */}
              <div className="flex space-x-4">
                <button
                  onClick={() => handleLanguageChange("ru")}
                  className={`px-2 py-1 rounded ${currentLanguage === "ru" ? "bg-gray-200" : ""}`}
                >
                  RU
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-2 py-1 rounded ${currentLanguage === "en" ? "bg-gray-200" : ""}`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange("kg")}
                  className={`px-2 py-1 rounded ${currentLanguage === "kg" ? "bg-gray-200" : ""}`}
                >
                  KG
                </button>
              </div>

              {/* Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder={t("header.search")}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>

              <div className="flex justify-between">
                {/* Favorites */}
                <Link
                  to="/favorites"
                  className="relative text-gray-700 hover:text-blue-500 transition-colors"
                  onClick={toggleMenu}
                >
                  <FaHeart size={20} />
                  {favoriteItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favoriteItems.length}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative text-gray-700 hover:text-blue-500 transition-colors"
                  onClick={toggleMenu}
                >
                  <FaShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {/* User */}
                <Link
                  to={isAuthenticated ? "/profile" : "/login"}
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                  onClick={toggleMenu}
                >
                  <FaUser size={20} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

