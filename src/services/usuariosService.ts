import axios from "axios";
import Usuario from "../types/Usuario";
import { getToken } from "./auth";

async function listarUsuarios() {
    const { data } = await axios.get("http://localhost:3000/usuarios",
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
    return data;
}

async function getUsuario(id: number) {
    const { data } = await axios.get(`http://localhost:3000/usuarios/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
    return data;
}

async function createUsuario(usuario: Partial<Usuario>) {
    const { data, status} = await axios.post("http://localhost:3000/usuarios/", usuario,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );

    if(status == 400){
        return data
    } else {

        return data;
    }
}

async function updateUsuario(usuario: Partial<Usuario>) {
    const { data } = await axios.put(`http://localhost:3000/usuarios/${usuario.id}`, usuario,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
    return data;
}

async function deleteUsuario(id: number | undefined) {
    await axios.delete(`http://localhost:3000/usuarios/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
}

export { listarUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario };