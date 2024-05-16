import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './config/AuthProvider.tsx'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <AuthProvider>
          <App/>
    </AuthProvider>
  </BrowserRouter>,
)
