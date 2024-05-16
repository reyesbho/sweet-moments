import {  Route,  Routes,  useSearchParams } from 'react-router-dom';
import './App.css'
import { Fragment, useEffect, useState } from 'react';
import { getToken } from './services/AuthService';
import { AuthProvider, useAuth } from './config/AuthProvider';
import { ProtectedRoute } from './config/ProtectedRoute';
import { Orders } from './pages/orders/Orders';
import { NewOrder } from './pages/new-order/NewOrder';
import { DetailOrder } from './components/detailOrder/DetailOrder';
import { Login } from './pages/login/Login';
import { Header } from './components/header/Header';
import { registerInterceptor } from './config/Interceptor';
function App() {
  const title = 'Dulces Momentos';
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAuth();

  
  useEffect(() => {
    let code:string | null = searchParams.get('code');
    if(code !== undefined && code !== null){
         getToken(code).then((response) => {
          user.login({id:0, token:response.token});
        }).catch((error) => {console.error(error)});
    }
  }, [])

 

  return (
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
      

  )
}

export default App
