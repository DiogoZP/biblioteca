import axios from "axios";
import Movimento from "../types/Movimento";
import { getToken } from "./auth";

async function listarMovimentos() {
    const { data } = await axios.get("http://localhost:3000/movimentos",
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
    return data;
}

async function getMovimento(id: number) {
    const { data } = await axios.get(`http://localhost:3000/movimentos/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
    return data;
}

async function createMovimento(movimento: Partial<Movimento>) {
    const { data } = await axios.post("http://localhost:3000/movimentos/", movimento,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
    return data;
}

async function updateMovimento(movimento: Partial<Movimento>) {
    const { data } = await axios.put(`http://localhost:3000/movimentos/${movimento.id}`, movimento,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
    return data;
}

async function deleteMovimento(id: number | undefined) {
    await axios.delete(`http://localhost:3000/movimentos/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            }
        }
    );
}

export { listarMovimentos, getMovimento, createMovimento, updateMovimento, deleteMovimento };