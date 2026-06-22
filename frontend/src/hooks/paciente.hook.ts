import { PacienteService } from '../services/paciente.service';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PacienteDTO } from '../schemas/paciente.schema';

export const usePaciente = () => {
    const queryClient = useQueryClient();

    const buscarPacientePorId = (id: string) => useQuery({
        queryKey: ['paciente', id],
        queryFn: async () => PacienteService.getById(id),
        enabled: !!id,
    });

    const buscarTodosPacientes = useQuery({
        queryKey: ['pacientes'],
        queryFn: async () => PacienteService.getAll()
    });

    const criarPaciente = useMutation({
        mutationFn: (data: Omit<PacienteDTO, 'id' | 'createdAt' | 'updatedAt'>) => PacienteService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pacientes'] });
        },
    });

    const atualizarPaciente = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Omit<PacienteDTO, 'id' | 'createdAt' | 'updatedAt'>> }) => PacienteService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pacientes'] });
        },
    });

    const deletarPaciente = useMutation({
        mutationFn: (id: string) => PacienteService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pacientes'] });
        },
    });

    return {
        buscarPacientePorId,
        buscarTodosPacientes,
        criarPaciente: criarPaciente.mutate,
        criarPacienteAsync: criarPaciente.mutateAsync, // Adicionado para uso com await
        atualizarPaciente: atualizarPaciente.mutate,
        deletarPaciente: deletarPaciente.mutate,
        isCriandoPaciente: criarPaciente.isPending || criarPaciente.isLoading,
        isAtualizandoPaciente: atualizarPaciente.isPending || atualizarPaciente.isLoading,
        isDeletandoPaciente: deletarPaciente.isPending || deletarPaciente.isLoading,
    };
}