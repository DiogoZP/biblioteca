import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createMovimento } from "../../../services/movimentosService";
import { listarLivros } from "../../../services/livrosService";
import { listarUsuarios } from "../../../services/usuariosService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form";
import { Select, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useNavigate } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import Livro from "../../../types/Livro";
import Usuario from "../../../types/Usuario";
import "dayjs/locale/pt-br";

const formSchema = z.object({
    id: z.number().optional(),
    dataRetirada: z.date(),
    dataDevolucao: z.date().optional(),
    livroId: z.coerce.number(),
    userId: z.coerce.number()
});

type formData = z.infer<typeof formSchema>;

function CriarMovimento() {

    const { data: livros } = useQuery<Livro[]>({ queryKey: ['listarLivros'], queryFn: listarLivros });
    const { data: usuarios } = useQuery<Usuario[]>({ queryKey: ['listarUsuarios'], queryFn: listarUsuarios });

    const navigate = useNavigate();
    const form = useForm<formData>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createMovimento,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['listarMovimentos'] });
            navigate("/admin/movimentos");
        },
    });

    function onSubmit(movimento: formData) {
        mutation.mutate(movimento);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Select
                    required
                    label="Livro:"
                    placeholder="Selecione um livro"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value?.toString()}
                    name={name}
                    ref={ref}
                    error={form.formState.errors.livroId?.message}
                    data={livros?.map(livro => ({ label: livro.titulo, value: livro.id.toString() }))}
                    />
                )}
                name="livroId"
                control={form.control}
            />
            <Controller
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <Select
                    required
                    label="Usuário:"
                    placeholder="Selecione um usuário"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value?.toString()}
                    name={name}
                    ref={ref}
                    error={form.formState.errors.userId?.message}
                    data={usuarios?.map(usuario => ({ label: usuario.nome, value: usuario.id.toString() }))}
                    />
                )}
                name="userId"
                control={form.control}
            />
            <Controller
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <DateInput
                    required
                    label="Data de Retirada:"
                    placeholder="Selecione uma data"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                    error={form.formState.errors.dataRetirada?.message}
                    valueFormat="DD/MM/YYYY"
                    locale="pt-br"
                    />
                )}
                name="dataRetirada"
                control={form.control}
            />
            <Controller
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                    <DateInput
                    label="Data de Devolução:"
                    placeholder="Selecione uma data"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                    error={form.formState.errors.dataDevolucao?.message}
                    valueFormat="DD/MM/YYYY"
                    locale="pt-br"
                    />
                )}
                name="dataDevolucao"
                control={form.control}
            />
            <Button mt={"1rem"} type="submit" leftSection={<IconPlus/>}>Criar Movimento</Button>
        </form>
    );

}

export default CriarMovimento;