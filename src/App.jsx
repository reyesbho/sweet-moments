import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Header } from './components/header/header'
import { Orders} from './components/orders/Orders'
import {pedidos} from './mocks/pedidos.json'
function App() {
  
  return (
    <div className='principal'>
     <Sidebar title={'Dulces Momentos'}></Sidebar> 
     <div className='container-principal'>
        <Header></Header>
        <main className='main'>
          <Orders orders={pedidos}></Orders>
        </main>
     </div>
    </div>
  )
}

export default App
