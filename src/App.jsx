import './App.css'
import { Sidebar } from './components/sidebar/Sidebar'
import { Header } from './components/header/header'

function App() {
  
  return (
    <div className='principal'>
     <Sidebar title={'Dulces Momentos'}></Sidebar> 
     <Header></Header>
    </div>
  )
}

export default App
