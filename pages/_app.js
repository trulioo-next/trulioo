import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'

import configureStore from '../stores/configureStore'

// Create redux store with sagas
const store = configureStore({})

class MyApp extends App {
  render() {
    const { Component, pageProps, children } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default MyApp