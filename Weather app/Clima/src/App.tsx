import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SaltaPage from './pages/Salta'
import ValenciaPage from './pages/Valencia'

function App() {

  return (
	<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/salta" element={<SaltaPage />} />
        
        <Route path="/valencia" element={<ValenciaPage />} />
	
      </Routes>
    </BrowserRouter>
  )
}

export default App
