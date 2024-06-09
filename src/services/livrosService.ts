import axios from "axios";
axios.defaults.validateStatus = status => status >= 200 && status <= 500;
import Livro from "../types/Livro";
import { getToken } from "./auth";

async function listarLivros() {
    const { data } = await axios.get("http://localhost:3000/livros",
    {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return data;
}

async function getLivro(id: number) {
    const { data } = await axios.get(`http://localhost:3000/livros/${id}`,
    {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return data;
}

async function createLivro(livro: Partial<Livro>) {
    const { data } = await axios.post("http://localhost:3000/livros/", livro, 
    {
         headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return data;
}

async function updateLivro(livro: Partial<Livro>) {
    const { data } = await axios.put(`http://localhost:3000/livros/${livro.id}`, livro, 
    {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
    return data;
}

async function deleteLivro(id: number | undefined) {
    await axios.delete(`http://localhost:3000/livros/${id}`,
    {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    });
}

export { listarLivros, getLivro, createLivro, updateLivro, deleteLivro };

