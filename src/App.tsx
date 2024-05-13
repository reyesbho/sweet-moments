import './App.css'
import { Header } from './components/header/Header';
function App() {
  const title = 'Dulces Momentos';

  

  return (
      <div className='principal'>
        <div className='container-principal'>
          <Header title={title}></Header>
          <main className='main'>
          </main>
        </div>
      </div>
  )
}

export default App
