import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import styles from "./Layout.module.scss";

function Layout() {
  return (
    <div className={styles.Layout}>
      <Header/>
     <main>
       <Outlet/>
     </main>
      <Footer/>
    </div>
  )
}

export default Layout
