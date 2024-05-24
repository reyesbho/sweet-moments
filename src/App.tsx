import {  Route,  Routes } from 'react-router-dom';
import './App.css'
import { ProtectedRoute } from './config/ProtectedRoute';
import { Orders } from './pages/orders/Orders';
import { NewOrder } from './pages/new-order/NewOrder';
import { DetailOrder } from './components/detailOrder/DetailOrder';
import { Login } from './pages/login/Login';
import { Header } from './components/header/Header';
function App() {
  const title = 'Dulces Momentos';

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
