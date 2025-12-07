import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/tienda/style.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Store } from "./App/Store"


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>

  </StrictMode>
)
