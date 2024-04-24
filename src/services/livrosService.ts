import axios from "axios";
import Livro from "../types/Livro";

async function listLivros() {
    const { data } = await axios.get("http://localhost:3000/livros");
    return data;
}

async function getLivro(id: number) {
    const { data } = await axios.get(`http://localhost:3000/livros/${id}`);
    return data;
}

async function createLivro(livro: Livro) {
    const { data } = await axios.post("http://localhost:3000/livros/", livro);
    return data;
}

async function updateLivro(livro: Livro) {
    const { data } = await axios.put(`http://localhost:3000/livros/${livro.id}`, livro);
    return data;
}

async function deleteLivro(id: number) {
    await axios.delete(`http://localhost:3000/livros/${id}`);
}

export { listLivros, getLivro, createLivro, updateLivro, deleteLivro };

