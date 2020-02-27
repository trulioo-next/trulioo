/**
* Create the store with redux sagas
**/

import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import createSagaMiddleware, { END } from 'redux-saga'

import createReducer from './reducers'
import rootSagas from './rootSagas'


const sagaMiddleware = createSagaMiddleware({
  // logger: (leval, ...args) => {},
  // onError: () => {}
})

export default function configureStore(initialState = {}, options) {

  // Create the store with middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware]

  const enhancers = [applyMiddleware(...middlewares)]

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle, indent */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  )

  sagaMiddleware.run(rootSagas)
  // store.runSagaTask = () => {
  //   store.sagaTask = sagaMiddleware.run(rootSagas)
  // }
  // //
  // store.runSagaTask()

  // Extensions
  store.runSaga = () => {
    if (store.saga) return
    store.saga = sagaMiddleware.run(rootSagas)
  };

  store.stopSaga = async () => {
    if (!store.saga) return
    store.dispatch(END)
    await store.saga.done
    store.saga = null
  }

  store.execSagaTask = async (action) => {
    if (options.isServer) {
      // run saga
      store.runSaga()
      // dispatch saga tasks
      // tasks(store.dispatch)
      store.dispatch(action)
      // Stop all running sagas to this point and wait for the tasks to be done
      await store.stopSaga()
    } else {
      // Re-run on client side
      store.runSaga()
    }
  }

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers))
    })
  }

  // Initial run
  store.runSaga()

  return store
}
