import React from 'react'
import Navigation from '../Navigation'
import HomeRoute from './HomeRoute'

const Home = () => {
  return (
    <section className="app-main">
      <Navigation />
      <HomeRoute />
    </section>
  )
}

export default Home
