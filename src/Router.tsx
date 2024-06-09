import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Registro from "./components/Registro";
import App from "./App";
import NotFound from "./components/NotFound";
import { isAuthenticated } from "./services/auth";
import { useQuery } from "@tanstack/react-query";
import { Loader, Flex } from "@mantine/core";

function Router() {

const { data: auth, isLoading } = useQuery<boolean>({ queryKey: ["auth"], queryFn: isAuthenticated});

if(isLoading) 
return(
  <Flex justify={"center"} align={"center"} h={"100vh"}>
    <Loader size="xl"/>
  </Flex>
);

return(  
  <BrowserRouter >
    <Routes>
      <Route path="/admin/*" element={auth ? <App /> : <Navigate to="/login"/>} />
      <Route path="/" element={auth ? <Navigate to="/admin/livros"/> : <Navigate to="/login"/>}/>
      <Route path="/registro" element={<Registro/>} />
      <Route path="/login" element={auth ? <Navigate to="/admin/livros"/> : <Login/>} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404"/>} />
    </Routes>
  </BrowserRouter>
);
}

export default Router;