import React from 'react'
import Link from 'next/link'

import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'

class AboutPage extends React.Component {

  render() {

    return (
      <Layout>
        <Header title="About - 7 - Eleven Canada" />
        <div className='hero'>
          <h1 className='title'>Welcome to 7-11</h1>
          <p className='description'>
            Coming Soon!
          </p>
        </div>

        <style jsx>
          {`
            .hero {
              width: 100%;
              color: #333;
            }
            .title {
              margin: 0;
              width: 100%;
              padding-top: 80px;
              line-height: 1.15;
              font-size: 48px;
            }
            .title,
            .description {
              text-align: center;
            }
            .row {
              max-width: 880px;
              margin: 80px auto 40px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
            }
          `}
        </style>

      </Layout>
    )
  }
}

export default AboutPage
