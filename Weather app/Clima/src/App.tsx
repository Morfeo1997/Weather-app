import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SaltaPage from './pages/Salta'

function App() {

  return (
	<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/salta" element={<SaltaPage />} />
	
      </Routes>
    </BrowserRouter>
  )
}

export default App
