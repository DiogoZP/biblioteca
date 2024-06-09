import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { updateUsuario, getUsuario } from "../../../services/usuariosService";
import Usuario from "../../../types/Usuario";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { TextInput, Button } from '@mantine/core';
import { useParams } from "react-router-dom";
import { IconPencil } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const formSchema = z.object({
    id: z.coerce.number().readonly(),
    nome: z.string().min(1, {message: "Nome é requerido"}).max(255, {message: "Titulo deve ter no máximo 255 caracteres"}),
    email: z.string().min(1, {message: "Senha é requerido"}).email("Email inválido").max(255, {message: "Email deve ter no máximo 255 caracteres"}),
    senha: z.string().min(1, {message: "Senha é requerido"}).max(255, {message: "Senha deve ter no máximo 255 caracteres"})
});

type formData = z.infer<typeof formSchema>;

function EditarUsuario() {

    const { id } = useParams<{id: string}>();

    const { data, isLoading, error } = useQuery<Usuario>({ queryKey: [`getUsuario-${id}`, id], queryFn: () => getUsuario(Number(id)) });

    const form = useForm<formData>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateUsuario,
        onSuccess: async () => {
            notifications.show({ title: "Sucesso", message: "Usuário atualizado com sucesso", icon: <IconCheck/>, autoClose: 5000});
            await queryClient.invalidateQueries({ queryKey: ['listarUsuarios']});
            await queryClient.invalidateQueries({ queryKey: [`getUsuario-${id}`]});
        },
    });

    function onSubmit(usuario: formData) {
        mutation.mutate(usuario); 
    }

    if(isLoading){
        return <div>Carregando...</div>;
    }

    if(error){
        return <div>Ocorreu um erro ao buscar o usuário</div>;
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextInput
                label="Id:"
                required
                {...form.register("id")}
                error={form.formState.errors.id?.message}
                defaultValue={data?.id}
                readOnly
            />
            <TextInput
                mt={"1rem"}
                label="Nome:"
                placeholder="Digite o nome do usuário"
                required
                {...form.register("nome")}
                error={form.formState.errors.nome?.message}
                defaultValue={data?.nome}
                maxLength={255}
            />
            <TextInput
                mt={"1rem"}
                label="Email:"
                placeholder="Digite o email do usuário"
                required
                {...form.register("email")}
                error={form.formState.errors.email?.message}
                defaultValue={data?.email}
                maxLength={255}
            />
            <TextInput
                mt={"1rem"}
                label="Senha:"
                placeholder="Digite a senha do usuário"
                required
                {...form.register("senha")}
                error={form.formState.errors.senha?.message}
                maxLength={255}
            />
            <Button mt={"1rem"} type="submit" leftSection={<IconPencil/>}>Salvar</Button>
        </form>
    );

}

export default EditarUsuario;