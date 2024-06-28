import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsuario } from "../../../services/usuariosService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { TextInput, Button } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const formSchema = z.object({
    id: z.number().optional(),
    nome: z.string().min(1, {message: "Nome é requerido"}).max(255, {message: "Titulo deve ter no máximo 255 caracteres"}),
    email: z.string().email("Email inválido").max(255, {message: "Email deve ter no máximo 255 caracteres"}),
    senha: z.string().min(1, {message: "Senha é requerido"}).max(255, {message: "Senha deve ter no máximo 255 caracteres"})
});

type formData = z.infer<typeof formSchema>;

function CriarUsuario() {

    const navigate = useNavigate();
    const form = useForm<formData>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createUsuario,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['listarUsuarios'] });
            navigate("/admin/usuarios");
        },
        onError: async () => {
            notifications.show({ title: "Sucesso", message: "Usuário atualizado com sucesso", icon: <IconCheck/>, autoClose: 5000});
            await queryClient.invalidateQueries({ queryKey: ['listarUsuarios']});
        }   
        
    });

    function onSubmit(usuario: formData) {
        mutation.mutate(usuario);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}> 
            <TextInput
                label="Nome:"
                placeholder="Digite o nome do usuário"
                required
                {...form.register("nome")}
                error={form.formState.errors.nome?.message}
                maxLength={256}
            />
            <TextInput
                mt={"1rem"}
                label="Email:"
                placeholder="Digite o email do usuário"
                required
                {...form.register("email")}
                error={form.formState.errors.email?.message}
                maxLength={256}
            />
            <TextInput
                mt={"1rem"}
                label="Senha:"
                placeholder="Digite a senha do usuário"
                required
                {...form.register("senha")}
                error={form.formState.errors.senha?.message}
                maxLength={256}
            />
            <Button mt={"1rem"} type="submit" leftSection={<IconPlus/>} >Criar Usuário</Button>
        </form>
    );

}

export default CriarUsuario;