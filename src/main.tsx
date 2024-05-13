import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {ProtectedRoute} from './config/ProtectedRoute.tsx'
import { Orders } from './pages/orders/Orders.tsx'
import { NewOrder } from './pages/new-order/NewOrder.tsx'
import { DetailOrder } from './components/detailOrder/DetailOrder.tsx'
import { Login } from './pages/login/Login.tsx'
import { AuthProvider } from './config/AuthProvider.tsx'

const routes = createBrowserRouter([
  {
    path:"/",
    element:(<ProtectedRoute> <Orders/></ProtectedRoute>)
  },
  {
    path:"/new-order",
    element:(<ProtectedRoute><NewOrder/></ProtectedRoute>)
  },{
    path:"/order/:id",
    element:(<ProtectedRoute><DetailOrder order={null}/></ProtectedRoute>)
  },
  {
    path:"/login",
    element:<Login/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider isSignedIn={false}>
      <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
