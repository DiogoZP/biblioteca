import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Registro from "./components/Registro";
import App from "./App";
import NotFound from "./components/NotFound";
import { isAuthenticated } from "./services/auth";


function Router() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/admin"/> : <Navigate to="/login"/> } />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={isAuthenticated() ? <App /> : <Navigate to="/login"/>} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;