import React from 'react'
import styles from './page.module.css'

const Layout = ({children}: any) => {
  return (
    <div>
      <h1 className={styles.mainTitle}>Nos réalisations</h1>
      {children}
    </div>
  )
}

export default Layout