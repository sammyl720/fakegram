import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'
const Layout = props => {
  return (
    <React.Fragment>
      <Head>
        <title>FakeGram</title>
        <link
          rel='stylesheet'
          href='https://bootswatch.com/4/solar/bootstrap.min.css'
        />
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
      </Head>
      <Navbar />
      <main className='container'>{props.children}</main>
      <style jsx>{`
        .container {
          padding: 20px;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Layout
