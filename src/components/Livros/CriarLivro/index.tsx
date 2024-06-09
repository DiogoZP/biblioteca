import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLivro } from "../../../services/livrosService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { TextInput, Button } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";

const formSchema = z.object({
    id: z.number().optional(),
    titulo: z.string().min(1, {message: "Titulo é requerido"}).max(255, {message: "Título deve ter no máximo 255 caracteres"}),
    genero: z.string().min(1, {message: "Gênero é requerido"}).max(255, {message: "Gênero deve ter no máximo 255 caracteres"}),
    autor: z.string().min(1, {message: "Autor é requerido"}).max(255, {message: "Autor deve ter no máximo 255 caracteres"})
});

type formData = z.infer<typeof formSchema>;

function CriarLivro() {

    const navigate = useNavigate();
    const form = useForm<formData>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createLivro,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['listarLivros'] });
            navigate("/admin/livros");
        },
    });

    function onSubmit(livro: formData) {
        mutation.mutate(livro);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}> 
            <TextInput
                label="Titulo:"
                placeholder="Digite o titulo do livro"
                required
                {...form.register("titulo")}
                error={form.formState.errors.titulo?.message}
                maxLength={255}
            />
            <TextInput
                mt={"1rem"}
                label="Gênero:"
                placeholder="Digite o gênero do livro"
                required
                {...form.register("genero")}
                error={form.formState.errors.genero?.message}
                maxLength={255}
            />
            <TextInput
                mt={"1rem"}
                label="Autor:"
                placeholder="Digite o nome do autor"
                required
                {...form.register("autor")}
                error={form.formState.errors.autor?.message}
                maxLength={255}
            />
            <Button mt={"1rem"} type="submit" leftSection={<IconPlus/>} >Criar Livro</Button>
        </form>
    );

}

export default CriarLivro;