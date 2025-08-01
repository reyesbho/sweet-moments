import {  Route,  Routes } from 'react-router-dom';
import './App.css'
import { ProtectedRoute } from './config/ProtectedRoute';
import { Orders } from './pages/orders/Orders';
import { DetailOrder } from './components/detailOrder/DetailOrder';
import { Login } from './pages/login/Login';
import { Header } from './components/header/Header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme } from '@mui/material';
import { NotFound } from './pages/NotFound/NotFound';
import { AdminCatalog } from './pages/catalog/AdminCatalog';
import { DetailProducts } from './pages/products/detailProducts';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { HeaderProvider, useHeader } from './context/HeaderContext';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import Calendar from './pages/calendar/Calendar';


function App() {
  const title = 'Dulces Momentos';
  const {handleClose} = useHeader();
  dayjs.extend(utc);
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
      <div className='container-principal' >
            <Header title={title}></Header>
            <main className='main' onClick={() => handleClose()}>
            <Routes>
              <Route path='/' element={(<ProtectedRoute><Orders></Orders></ProtectedRoute>)}></Route>
              <Route path='/order/:id' element={(<ProtectedRoute><DetailOrder ></DetailOrder></ProtectedRoute>)}></Route>
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path='/catalogos' element={<AdminCatalog></AdminCatalog>}></Route>
              <Route path='/productos' element={<DetailProducts></DetailProducts>}></Route>
              <Route path='/calendario' element={<Calendar></Calendar>}></Route>
              <Route path='*' element={<ProtectedRoute><NotFound></NotFound></ProtectedRoute>}></Route>
            </Routes>
            </main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce} />
        </div>
        </ThemeProvider>
      </LocalizationProvider>

  )
}

export default App
