import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ListaLivros from "./components/Livros/ListaLivros";
import ListaMovimentos from "./components/Movimentos/ListaMovimentos";
import ListaUsuarios from "./components/Usuarios/ListaUsuarios";

function AdminRouter(){
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/livros" element={<ListaLivros />} />
            <Route path="/movimentos" element={<ListaMovimentos />} />
            <Route path="/usuarios" element={<ListaUsuarios />} />
        </Routes>
    );
}

export default AdminRouter;