import { Route, Routes, Navigate } from "react-router-dom";
import ListarLivros from "./components/Livros/ListarLivros";
import CriarLivro from "./components/Livros/CriarLivro";
import EditarLivro from "./components/Livros/EditarLivro";
import ListarUsuarios from "./components/Usuarios/ListarUsuarios";
import CriarUsuario from "./components/Usuarios/CriarUsuario";
import EditarUsuario from "./components/Usuarios/EditarUsuario";
import ListarMovimentos from "./components/Movimentos/ListarMovimentos";
import CriarMovimento from "./components/Movimentos/CriarMovimento";
import EditarMovimento from "./components/Movimentos/EditarMovimento";

function AdminRouter(){
    return (
        <Routes>
            <Route path="/livros" element={<ListarLivros />} />
            <Route path="/livros/create" element={<CriarLivro />} />
            <Route path="/livros/edit/:id" element={<EditarLivro />} />
            <Route path="/usuarios" element={<ListarUsuarios />} />
            <Route path="/usuarios/create" element={<CriarUsuario />} />
            <Route path="/usuarios/edit/:id" element={<EditarUsuario />} />
            <Route path="/movimentos" element={<ListarMovimentos />} />
            <Route path="/movimentos/create" element={<CriarMovimento />} />
            <Route path="/movimentos/edit/:id" element={<EditarMovimento />} />
            <Route path="/livros/*" element={<Navigate to="/404" />} />
            <Route path="/usuarios/*" element={<Navigate to="/404" />} />
            <Route path="/movimentos/*" element={<Navigate to="/404" />} />
        </Routes>
    );
}

export default AdminRouter;