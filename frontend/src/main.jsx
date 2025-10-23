import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import ShopContextProvider from './context/Shopcontext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
   </BrowserRouter>,
  </StrictMode>
)
