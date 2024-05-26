import {  Route,  Routes } from 'react-router-dom';
import './App.css'
import { ProtectedRoute } from './config/ProtectedRoute';
import { Orders } from './pages/orders/Orders';
import { NewOrder } from './pages/new-order/NewOrder';
import { DetailOrder } from './components/detailOrder/DetailOrder';
import { Login } from './pages/login/Login';
import { Header } from './components/header/Header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, Theme } from '@mui/material';
function App() {
  const title = 'Dulces Momentos';

   
  const newTheme = (theme:Theme) => createTheme({
    ...theme,
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: '#ffffff',
            borderRadius:"15px"
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: '#ffffff',
            backgroundColor: '#0B1320',
            border: "2px solid",
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color:'#ffffff'
          }
        }
      }
    }
  })
  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={newTheme}>
      <div className='principal'>
        <div className='container-principal'>
          <Header title={title}></Header>
          <main className='main'>
          <Routes>
            <Route path='/' element={(<ProtectedRoute><Orders></Orders></ProtectedRoute>)}></Route>
            <Route path='/new-order' element={(<ProtectedRoute><NewOrder></NewOrder></ProtectedRoute>)}></Route>
            <Route path='/order/:id' element={(<ProtectedRoute><DetailOrder order={null}></DetailOrder></ProtectedRoute>)}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
          </Routes>
          </main>
        </div>
      </div>
        </ThemeProvider>
      </LocalizationProvider>

  )
}

export default App
