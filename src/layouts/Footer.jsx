import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa"

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("footer.about")}</h3>
            <p className="text-gray-600 mb-4">{t("footer.aboutText")}</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link to="/beaches" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t("footer.beaches")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t("footer.aboutKyrgyzstan")}
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t("footer.contacts")}
                </Link>
              </li>
            </ul>
          </div>

          {/* User Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("footer.userLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t("footer.profile")}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t("footer.favorites")}
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t("footer.cart")}
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-blue-500 transition-colors">
                  {t("footer.login")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t("footer.contact")}</h3>
            <address className="not-italic text-gray-600 space-y-2">
              <p>{t("footer.address")}</p>
              <p>
                <a href="tel:+996123456789" className="hover:text-blue-500 transition-colors">
                  +996 (123) 456-789
                </a>
              </p>
              <p>
                <a href="mailto:info@kyrgyzstanbeaches.com" className="hover:text-blue-500 transition-colors">
                  info@kyrgyzstanbeaches.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>
            &copy; {currentYear} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

