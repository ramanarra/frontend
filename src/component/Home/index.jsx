import React, { useState } from 'react'
import Navigation from '../Navigation'
import HomeRoute from './HomeRoute'

const Home = (props) => {
    return ( 
        <section className="app-main">
            <Navigation/>
            <HomeRoute/>
        </section>
     );
}
 
export default Home;