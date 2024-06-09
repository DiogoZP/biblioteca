import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, type MRT_Row } from 'mantine-react-table';
import { Button, Flex, Tooltip, ActionIcon, Text } from "@mantine/core";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import { MRT_Localization_PT_BR } from 'mantine-react-table/locales/pt-BR/index.cjs';
import { listarUsuarios, deleteUsuario } from "../../../services/usuariosService";
import Usuario from "../../../types/Usuario";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { modals } from "@mantine/modals";
const columns: MRT_ColumnDef<Usuario>[] = [
    {
        header: 'ID',
        accessorKey: 'id',
    },
    {
        header: 'Nome',
        accessorKey: 'nome',
    },
    {
        header: 'Email',
        accessorKey: 'email',
    }
];

function ListarUsuarios(){

    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery<Usuario[]>({ queryKey: ['listarUsuarios'], queryFn: listarUsuarios });
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteUsuario,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['listarUsuarios']});
        }
    });

    const openDeleteConfirmModal = (row: MRT_Row<Usuario>) =>
        modals.openConfirmModal({
          title: 'Tem certeza que deseja deletar esse usuário?',
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
            <Button style={{alignSelf: "flex-end"}} leftSection={<IconPlus/>} onClick={() => {navigate("/admin/usuarios/create/")}}>Adicionar Usuário</Button>
        ),
         renderRowActions: ({ row }) => (
            <Flex gap="md">
              <Tooltip label="Editar">
                <ActionIcon onClick={() => {navigate(`/admin/usuarios/edit/${row.original.id}`)}}>
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
        return <div>Ocorreu um erro ao carregar os usuários</div>;
    }

    return(
        <Flex>
            <MantineReactTable table={table}/>
        </Flex>
    );
}

export default ListarUsuarios;