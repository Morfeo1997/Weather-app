import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SaltaPage from './pages/Salta'
import ValenciaPage from './pages/Valencia'
import JujuyPage from './pages/Jujuy'

function App() {

  return (
	<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/salta" element={<SaltaPage />} />
        
        <Route path="/valencia" element={<ValenciaPage />} />
        
        <Route path="/jujuy" element={<JujuyPage />} />
	
      </Routes>
    </BrowserRouter>
  )
}

export default App
