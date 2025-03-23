"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, updateQuantity, clearCart } from "../../store/slices/cartSlice.js"
import { Link } from "react-router-dom"
import { FaShoppingCart, FaTrash, FaMinus, FaPlus } from "react-icons/fa"

const CartPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { items: cartItems, total } = useSelector((state) => state.cart)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleUpdateQuantity = (id, days) => {
    if (days < 1) return
    dispatch(updateQuantity({ id, days }))
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      setCheckoutSuccess(true)
      dispatch(clearCart())

      // Reset checkout success after 5 seconds
      setTimeout(() => {
        setCheckoutSuccess(false)
      }, 5000)
    }, 2000)
  }

  if (checkoutSuccess) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your order. You will receive a confirmation email shortly.</p>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t("cart.title")}</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FaShoppingCart className="text-gray-400" size={24} />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">{t("cart.empty")}</h2>
          <p className="text-gray-500 mb-6">Add beaches to your cart to book your vacation.</p>
          <Link
            to="/beaches"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("cart.continue")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Your Items</h2>
              </div>

              <ul className="divide-y">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="text-lg font-medium text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-gray-600">
                          {item.pricePerDay} {t("currency")} × {item.days} {t("cart.days")}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.days - 1)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="mx-2 w-8 text-center">{item.days}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.days + 1)}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-gray-800 mb-1">
                            {item.total} {t("currency")}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm flex items-center"
                          >
                            <FaTrash className="mr-1" size={12} />
                            {t("cart.remove")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              </div>

              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {total} {t("currency")}
                  </span>
                </div>

                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">0 {t("currency")}</span>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-semibold text-gray-800">{t("cart.total")}</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {total} {t("currency")}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                  >
                    {isCheckingOut ? (
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
                      t("cart.checkout")
                    )}
                  </button>

                  <Link
                    to="/beaches"
                    className="w-full mt-4 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center block"
                  >
                    {t("cart.continue")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage

