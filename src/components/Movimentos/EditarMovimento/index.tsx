import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { updateMovimento, getMovimento } from "../../../services/movimentosService";
import { listarLivros } from "../../../services/livrosService";
import { listarUsuarios } from "../../../services/usuariosService";
import Movimento from "../../../types/Movimento";
import Livro from "../../../types/Livro";
import Usuario from "../../../types/Usuario";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form";
import { Button, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useParams } from "react-router-dom";
import { IconPencil } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const formSchema = z.object({
    id: z.coerce.number().optional(),
    dataRetirada: z.date(),
    dataDevolucao: z.date().optional(),
    livroId: z.coerce.number(),
    userId: z.coerce.number()
});

type formData = z.infer<typeof formSchema>;

function EditarMovimento() {

    const { id } = useParams<{id: string}>();

    const { data , isLoading, error } = useQuery<Movimento>({ queryKey: [`getMovimento-${id}`, id], queryFn: () => getMovimento(Number(id)) });
    const { data: livros } = useQuery<Livro[]>({ queryKey: ['listarLivros'], queryFn: () => listarLivros() });
    const { data: usuarios } = useQuery<Usuario[]>({ queryKey: ['listarUsuarios'], queryFn: () => listarUsuarios() });

    const form = useForm<formData>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateMovimento,
        onSuccess: async () => {
            notifications.show({ title: "Sucesso", message: "Movimento atualizado com sucesso", icon: <IconCheck/>, autoClose: 5000});
            await queryClient.invalidateQueries({ queryKey: ['listarMovimentos']});
            await queryClient.invalidateQueries({ queryKey: [`getMovimento-${id}`]});
        },
    });

    function onSubmit(movimento: formData) {
        mutation.mutate(movimento); 
    }

    if(isLoading){
        return <div>Carregando...</div>;
    }

    if(error){
        return <div>Ocorreu um erro ao buscar o movimento</div>;
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
            <Controller
            defaultValue={data?.livroId}
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
            defaultValue={data?.userId}
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
            defaultValue={new Date(data?.dataRetirada ?? "")}
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
            defaultValue={data?.dataDevolucao && new Date(data.dataDevolucao)}
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
            <Button mt={"1rem"} type="submit" leftSection={<IconPencil/>}>Salvar</Button>
        </form>
    );

}

export default EditarMovimento;