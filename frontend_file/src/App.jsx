import InicioPage from "./pages/InicioPage"
import { Routes,Route } from "react-router-dom"
import PortafolioPage from "./pages/PortafolioPage";
import LoginPage from "./pages/LoginPage";
import EditPortafolioPage from "./pages/EditPortafolioPage";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/detalle-portafolio/:id" element={<PortafolioPage />} />
        <Route path="/login-page" element={<LoginPage/>} />
        <Route path="/editar-portafolio" element={<EditPortafolioPage/>} />
      </Routes>
    </div>
  );
}

export default App
