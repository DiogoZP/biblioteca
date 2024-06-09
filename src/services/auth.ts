import axios from "axios";
import { queryClient } from "../main";
axios.defaults.validateStatus = status => status >= 200 && status <= 500;

const TOKEN_KEY = "BibliotecaToken";


async function isAuthenticated(){
    if(!getToken()) return false;
    const { status } = await axios.get("http://localhost:3000/usuarios/login", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    if(status === 200){
        return true;
    }
    
    logout();
    return false;
}

function getToken(){
    return localStorage.getItem(TOKEN_KEY);
}

async function login(email: string, senha: string){
    const { data, status } = await axios.post("http://localhost:3000/usuarios/login", {
        email,
        senha
    });

    if(status == 200)
    {
        localStorage.setItem(TOKEN_KEY, data.token);
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        return true;
    }
    return false;
}

function logout(){
    localStorage.removeItem(TOKEN_KEY);
    queryClient.invalidateQueries({ queryKey: ["auth"] });
}

export { isAuthenticated, getToken, login, logout };