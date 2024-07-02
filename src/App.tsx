import {  Route,  Routes } from 'react-router-dom';
import './App.css'
import { ProtectedRoute } from './config/ProtectedRoute';
import { Orders } from './pages/orders/Orders';
import { NewOrder } from './components/new-order/NewOrder';
import { DetailOrder } from './components/detailOrder/DetailOrder';
import { Login } from './pages/login/Login';
import { Header } from './components/header/Header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, Theme } from '@mui/material';
import { NotFound } from './pages/NotFound/NotFound';
function App() {
  const title = 'Dulces Momentos';

   const themeDark = createTheme({
    components:{
      MuiOutlinedInput:{
        styleOverrides:{
          root:{
            border:'1px solid'
          }
        }
      }
    },
    palette: {
      mode: 'dark',
    },
   })

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={themeDark}>
      <div className='principal'>
        <div className='container-principal'>
          <Header title={title}></Header>
          <main className='main'>
          <Routes>
            <Route path='/' element={(<ProtectedRoute><Orders></Orders></ProtectedRoute>)}></Route>
            <Route path='/order/:id' element={(<ProtectedRoute><DetailOrder ></DetailOrder></ProtectedRoute>)}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='*' element={<ProtectedRoute><NotFound></NotFound></ProtectedRoute>}></Route>
          </Routes>
          </main>
        </div>
      </div>
        </ThemeProvider>
      </LocalizationProvider>

  )
}

export default App
