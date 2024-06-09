import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, type MRT_Row } from 'mantine-react-table';
import { Button, Flex, Tooltip, ActionIcon, Text } from "@mantine/core";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import { MRT_Localization_PT_BR } from 'mantine-react-table/locales/pt-BR/index.cjs';
import { listarMovimentos, deleteMovimento } from "../../../services/movimentosService";
import Movimento from "../../../types/Movimento";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { modals } from "@mantine/modals";
const columns: MRT_ColumnDef<Movimento>[] = [
    {
        header: 'ID',
        accessorKey: 'id',
    },
    {
        header: 'Livro',
        accessorKey: 'livro.titulo',
    },
    {
        header: 'Usuario',
        accessorKey: 'user.nome',
    },
    {
        header: 'Data de Retirada',
        accessorFn(originalRow) {
            return new Date(originalRow.dataRetirada).toLocaleDateString();
        },
    },
    {
        header: 'Data de Devolução',
        accessorFn(originalRow) {
            return originalRow.dataDevolucao ? new Date(originalRow.dataDevolucao).toLocaleDateString() : 'Não Devolvido';
        },
    }
];

function ListarMovimentos(){

    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery<Movimento[]>({ queryKey: ['listarMovimentos'], queryFn: listarMovimentos });
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteMovimento,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['listarMovimentos']});
        }
    });

    const openDeleteConfirmModal = (row: MRT_Row<Movimento>) =>
        modals.openConfirmModal({
          title: 'Tem certeza que deseja deletar esse movimento?',
          closeOnConfirm: true,
          closeOnCancel: true,
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
            <Button style={{alignSelf: "flex-end"}} leftSection={<IconPlus/>} onClick={() => {navigate("/admin/movimentos/create/")}}>Adicionar Movimento</Button>
        ),
         renderRowActions: ({ row }) => (
            <Flex gap="md">
              <Tooltip label="Editar">
                <ActionIcon onClick={() => {navigate(`/admin/movimentos/edit/${row.original.id}`)}}>
                  <IconPencil />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Deletar">
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
        return <div>Ocorreu um erro ao carregar os movimentos</div>;
    }

    return(
        <Flex>
            <MantineReactTable table={table}/>
        </Flex>
    );
}

export default ListarMovimentos;