import InicioPage from "./pages/InicioPage"
import { Routes,Route } from "react-router-dom"
import PortafolioPage from "./pages/PortafolioPage";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/detalle-portafolio" element={<PortafolioPage/>} />
      </Routes>
    </div>
  );
}

export default App
