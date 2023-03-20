import React from 'react'
import ReactDOM from 'react-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { persistor, store } from 'redux/store'
import App from './App'
import { PersistGate } from 'redux-persist/integration/react'

test('renders the App component', () => {
  const root = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}></PersistGate>
      <App />
    </Provider>,
    root
  )
})
