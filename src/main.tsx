import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, RouterProvider, useParams } from 'react-router-dom'
import {ProtectedRoute} from './config/ProtectedRoute.tsx'
import { Orders } from './pages/orders/Orders.tsx'
import { NewOrder } from './pages/new-order/NewOrder.tsx'
import { DetailOrder } from './components/detailOrder/DetailOrder.tsx'
import { Login } from './pages/login/Login.tsx'
import { AuthProvider } from './config/AuthProvider.tsx'
import { getToken } from './services/AuthService.ts'
import App from './App.tsx'




ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <BrowserRouter>
    <AuthProvider>
      <React.StrictMode>
          <App/>
      </React.StrictMode>
    </AuthProvider>
  </BrowserRouter>,
)
