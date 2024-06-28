import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { updateLivro, getLivro } from "../../../services/livrosService";
import Livro from "../../../types/Livro";
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
    titulo: z.string().min(1, {message: "Título é requerido"}).max(255, {message: "Titulo deve ter no máximo 255 caracteres"}),
    genero: z.string().min(1, {message: "Gênero é requerido"}).max(255, {message: "Gênero deve ter no máximo 255 caracteres"}),
    autor: z.string().min(1, {message: "Autor é requerido"}).max(255, {message: "Autor deve ter no máximo 255 caracteres"})
});

type formData = z.infer<typeof formSchema>;

function EditarLivro() {

    const { id } = useParams<{id: string}>();

    const { data, isLoading, error } = useQuery<Livro>({ queryKey: [`getLivro-${id}`, id], queryFn: () => getLivro(Number(id)) });

    const form = useForm<formData>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateLivro,
        onSuccess: async () => {
            notifications.show({ title: "Sucesso", message: "Livro atualizado com sucesso", icon: <IconCheck/>, autoClose: 5000});
            await queryClient.invalidateQueries({ queryKey: ['listarLivros']});
            await queryClient.invalidateQueries({ queryKey: [`getLivro-${id}`]});
        },
    });

    function onSubmit(livro: formData) {
        mutation.mutate(livro); 
    }

    if(isLoading){
        return <div>Carregando...</div>;
    }

    if(error){
        return <div>Ocorreu um erro ao buscar o livro</div>;
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
                label="Título:"
                placeholder="Digite o título do livro"
                required
                {...form.register("titulo")}
                error={form.formState.errors.titulo?.message}
                defaultValue={data?.titulo}
                maxLength={255}
            />
            <TextInput
                mt={"1rem"}
                label="Gênero:"
                placeholder="Digite o gênero do livro"
                required
                {...form.register("genero")}
                error={form.formState.errors.genero?.message}
                defaultValue={data?.genero}
                maxLength={255}
            />
            <TextInput
                mt={"1rem"}
                label="Autor:"
                placeholder="Digite o nome do autor"
                required
                {...form.register("autor")}
                error={form.formState.errors.autor?.message}
                defaultValue={data?.autor}
                maxLength={255}
            />
            <Button mt={"1rem"} type="submit" leftSection={<IconPencil/>}>Salvar</Button>
        </form>
    );

}

export default EditarLivro;