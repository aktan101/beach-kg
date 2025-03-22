"use client"

import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchBeaches } from "../store/slices/beachesSlice"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"

const MainLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBeaches())
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout

