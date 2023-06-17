import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Header } from './components/header/header'
import { Order } from './components/order/Order'
import { NewOrder } from './pages/new-order/NewOrder'
import { Route, Routes } from 'react-router-dom'
import { Orders } from './pages/orders/Orders'
function App() {
  const title = 'Dulces Momentos';
  return (
      <div className='principal'>
        <div className='container-principal'>
          <Header title={title}></Header>
          <main className='main'>
            <Routes>
              <Route path='/' element={<Orders/>} errorElement={<h1>Error</h1>}></Route>
              <Route path='/new-order' element={<NewOrder/>} errorElement={<h1>Error</h1>}></Route>
            </Routes>
          </main>
        </div>
      </div>
  )
}

export default App
