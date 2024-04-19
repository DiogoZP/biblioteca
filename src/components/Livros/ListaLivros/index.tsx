import { useReactTable } from "@tanstack/react-table";

function ListaLivros(){

    type TData = {
        id: number;
        titulo: string;
        autor: string;
        editora: string;
        ano: number;
    };

    const livros = [
        {
            id: 1,
            titulo: 'O Senhor dos Anéis',
            autor: 'J.R.R. Tolkien',
            editora: 'HarperCollins',
            ano: 1954
        },
        {
            id: 2,
            titulo: 'Dom Casmurro',
            autor: 'Machado de Assis',
            editora: 'Martin Claret',
            ano: 1899
        }
    ];



    return(
        <div>
            <h1>Lista de Livros</h1>
        </div>
    );
}

export default ListaLivros;