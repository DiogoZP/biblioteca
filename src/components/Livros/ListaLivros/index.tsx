import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, type MRT_TableOptions, type MRT_Row } from 'mantine-react-table';
import { Button, Flex, Tooltip, ActionIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR/';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listLivros, createLivro, updateLivro, deleteLivro } from "../../../services/livrosService";
import Livro from "../../../types/Livro";

const columns: MRT_ColumnDef<Livro>[] = [
    {
        header: 'ID',
        accessorKey: 'id',
        Edit: () => null
    },
    {
        header: 'Título',
        accessorKey: 'titulo',
    },
    {
        header: 'Gênero',
        accessorKey: 'genero',
    },
    {
        header: 'Autor',
        accessorKey: 'autor',
    }
];

function useCreateLivro(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createLivro,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listarLivros'] });
        }
    
    });
}

function useUpdateLivro(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateLivro,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listarLivros'] });
        }
    
    });
}

function useDeleteLivro(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteLivro,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listarLivros'] });
        }
    
    });
}

function ListaLivros(){
    const { mutateAsync: createLivro } = useCreateLivro();
    const { mutateAsync: updateLivro } = useUpdateLivro();
    const { mutateAsync: deleteLivro } = useDeleteLivro();

    const openDeleteConfirmModal = (row: MRT_Row<Livro>) =>
        modals.openConfirmModal({
          title: 'Tem certeza que deseja deletar esse livro? Essa ação não pode ser desfeita!',
          labels: { confirm: 'Deletar', cancel: 'Cancelar' },
          confirmProps: { color: 'red' },
          onConfirm: () => deleteLivro(row.original.id),
        });

    const handleCreateLivro: MRT_TableOptions<Livro>['onCreatingRowSave'] = async ({ values, exitCreatingMode }) => {
        await createLivro(values);
        exitCreatingMode();
    };

    const handleUpdateLivro: MRT_TableOptions<Livro>['onEditingRowSave'] = async ({ values, table }) => {
        await updateLivro(values);
        table.setEditingRow(null);
    }

    const { data, isLoading, error } = useQuery<Livro[]>({ queryKey: ['listarLivros'], queryFn: listLivros });
    const table = useMantineReactTable({
        columns,
        data: data ?? [],
        localization: MRT_Localization_PT_BR,
        enableDensityToggle: false, 
        initialState: { density: 'xs' },
        enableEditing: true,
        onCreatingRowSave: handleCreateLivro,
        onEditingRowSave: handleUpdateLivro,
        renderTopToolbarCustomActions: ({ table }) => (
            <Button style={{alignSelf: "flex-end"}} leftSection={<FaPlus/>} onClick={() => table.setCreatingRow(true)}>Adicionar Livro</Button>
        ),
         renderRowActions: ({ row, table }) => (
            <Flex gap="md">
              <Tooltip label="Edit">
                <ActionIcon onClick={() => table.setEditingRow(row)}>
                  <FaEdit />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete">
                <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
                  <FaTrash />
                </ActionIcon>
              </Tooltip>
            </Flex>
        ),
    });
    if(isLoading){
        return <div>Carregando...</div>;
    }
    if(error){
        return <div>Ocorreu um erro ao carregar os livros</div>;
    }
    return(
        <Flex>
            <MantineReactTable table={table}/>
        </Flex>
    );
}

export default ListaLivros;