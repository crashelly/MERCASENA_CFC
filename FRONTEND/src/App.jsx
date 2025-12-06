import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import Shop from "./pages/shop"
import AppRoutes from './Routes'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      {/* <Shop/> */}
    </>
  )
}

export default App
