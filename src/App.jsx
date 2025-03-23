import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { I18nextProvider } from "react-i18next"
import i18n from "./i18n"
import { store } from "./store"

// Layouts
import Layout from "./layouts/layout/Layout.jsx"

// Pages
import HomePage from "./pages/home/HomePage.jsx"
import AllBeachesPage from "./pages/beaches/AllBeachesPage.jsx"
import AboutKyrgyzstan from "./pages/about/AboutKyrgyzstan.jsx"
import ContactsPage from "./pages/contact/ContactsPage.jsx"
import SearchPage from "./pages/search/SearchPage.jsx"
import ProfilePage from "./pages/profil-user/ProfilePage.jsx"
import FavoritesPage from "./pages/favorite/FavoritesPage.jsx"
import CartPage from "./pages/cart/CartPage.jsx"
import LoginPage from "./pages/login/LoginPage.jsx"
import BeachDetailPage from "./pages/beach-detail/BeachDetailPage.jsx"

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="beaches" element={<AllBeachesPage />} />
              <Route path="beaches/:id" element={<BeachDetailPage />} />
              <Route path="about" element={<AboutKyrgyzstan />} />
              <Route path="contacts" element={<ContactsPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="cart" element={<CartPage />} />
            <Route path="login" element={<LoginPage />} />
            </Route>
          </Routes>
        </Router>
      </I18nextProvider>
    </Provider>
  )
}

export default App

