import React from 'react'
import Navbar from '../common/nav-bar/NavigationBar'
import HeroSlider from './HomeImages'
import ShopByGender from './ShopByGender'
import ProductList from './ProductList'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-pink-200 relative overflow-hidden">
      
      {/* Animated Background Circles */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-spin-slow"></div>

      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      {/* Hero section with fade-in */}
      <section className="relative z-10 animate-fadeInUp">
        <div>
          <HeroSlider />
        </div>
      </section>

      {/* Products with fade-in */}
      <div className="relative z-10 animate-fadeInUp delay-200">
        <ProductList />
      </div>
    </div>
  )
}

export default Home
