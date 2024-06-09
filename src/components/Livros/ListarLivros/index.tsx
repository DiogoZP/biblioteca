import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, type MRT_Row } from 'mantine-react-table';
import { Button, Flex, Tooltip, ActionIcon, Text } from "@mantine/core";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import { MRT_Localization_PT_BR } from 'mantine-react-table/locales/pt-BR/index.cjs';
import { listarLivros, deleteLivro } from "../../../services/livrosService";
import Livro from "../../../types/Livro";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { modals } from "@mantine/modals";
const columns: MRT_ColumnDef<Livro>[] = [
    {
        header: 'ID',
        accessorKey: 'id',
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

function ListarLivros(){

    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery<Livro[]>({ queryKey: ['listarLivros'], queryFn: listarLivros });
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteLivro,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['listarLivros']});
        }
    });

    const openDeleteConfirmModal = (row: MRT_Row<Livro>) =>
        modals.openConfirmModal({
          title: 'Tem certeza que deseja deletar esse livro?',
          children: (
            <Text>
              Essa ação não pode ser desfeita!
            </Text>
          ),
          labels: { confirm: 'Deletar', cancel: 'Cancelar' },
          confirmProps: { color: 'red' },
          onConfirm: () => mutation.mutate(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: data ?? [],
        localization: MRT_Localization_PT_BR,
        enableDensityToggle: false, 
        enableEditing: true,
        initialState: { density: 'xs' },
        renderTopToolbarCustomActions: () => (
            <Button style={{alignSelf: "flex-end"}} leftSection={<IconPlus/>} onClick={() => {navigate("/admin/livros/create/")}}>Adicionar Livro</Button>
        ),
         renderRowActions: ({ row }) => (
            <Flex gap="md">
              <Tooltip label="Edit">
                <ActionIcon onClick={() => {navigate(`/admin/livros/edit/${row.original.id}`)}}>
                  <IconPencil />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete">
                <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
                  <IconTrash />
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

export default ListarLivros;