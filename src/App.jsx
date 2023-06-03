import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Header } from './components/header/header'
import {RouterProvider} from 'react-router-dom'
import { router } from './config/routes.config'
function App() {
  
  return (
    <div className='principal'>
     <Sidebar title={'Dulces Momentos'}></Sidebar> 
     <div className='container-principal'>
        <Header></Header>
        <main className='main'>
          <RouterProvider router={router}></RouterProvider>
        </main>
     </div>
    </div>
  )
}

export default App
