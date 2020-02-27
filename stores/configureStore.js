/**
* Create the store with redux sagas
**/

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

import stateStorage from '../utils/stateStorage'
import createRootReducer from './reducers'
import rootSagas from './rootSagas'


// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();

const composeWithReduxDevtools = (compose) => {
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  return  process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose
}


export default function configureStore(initialState, options) {

  const sagaMiddleware = createSagaMiddleware({})

  // Configure the list of middlewares to be applied to store
  const middlewares = [ sagaMiddleware ]
  const enhancers = [ applyMiddleware(...middlewares) ]

  const composeEnhancers = composeWithReduxDevtools(compose)

  // retrive local state as initialState
  if(!options.isServer) {
    initialState.app.stateVersion = options.VERSION//publicRuntimeConfig.VERSION
    const localState = stateStorage.loadState()
    initialState = localState && localState.app.stateVersion === options.VERSION ? localState : initialState
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(...enhancers),
  )

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

  if(!options.isServer) {
    store.subscribe(() => {
      stateStorage.saveState(store.getState())
    })

    // Make reducers hot reloadable
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(createRootReducer(store.injectedReducers))
      })
    }
  }

  // Initial run
  store.runSaga()

  // sagaMiddleware.run(rootSagas)
  // store.runSaga = sagaMiddleware.run
  return store
}
