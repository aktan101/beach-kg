import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { I18nextProvider } from "react-i18next"
import i18n from "./i18n"
import { store } from "./store"

// Layouts
import MainLayout from "./layouts/MainLayout"

// Pages
import HomePage from "./pages/HomePage"
import AllBeachesPage from "./pages/AllBeachesPage"
import AboutKyrgyzstan from "./pages/AboutKyrgyzstan"
import ContactsPage from "./pages/ContactsPage"
import SearchPage from "./pages/SearchPage"
import ProfilePage from "./pages/ProfilePage"
import FavoritesPage from "./pages/FavoritesPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import BeachDetailPage from "./pages/BeachDetailPage"

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
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

