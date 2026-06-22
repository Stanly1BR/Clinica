import { MedicoService } from '../services/medico.service';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MedicoDTO } from '../schemas/medico.schema';

export const useMedico = () => {
    const queryClient = useQueryClient();

    const buscarMedicoPorId = (id: string) => useQuery({
        queryKey: ['medico', id],
        queryFn: async () => MedicoService.getById(id),
        enabled: !!id,
    });

    const buscarTodosMedicos = useQuery({
        queryKey: ['medicos'],
        queryFn: async () => MedicoService.getAll()
    });

    const criarMedico = useMutation({
        mutationFn: (data: Omit<MedicoDTO, 'id' | 'createdAt' | 'updatedAt'>) => MedicoService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicos'] });
        },
    });

    const atualizarMedico = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Omit<MedicoDTO, 'id' | 'createdAt' | 'updatedAt'>> }) => MedicoService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicos'] });
        },
    });

    const deletarMedico = useMutation({
        mutationFn: (id: string) => MedicoService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicos'] });
        },
    });

    return {
        buscarMedicoPorId,
        buscarTodosMedicos,
        criarMedico: criarMedico.mutate,
        criarMedicoAsync: criarMedico.mutateAsync, // Adicionado para uso com await
        atualizarMedico: atualizarMedico.mutate,
        deletarMedico: deletarMedico.mutate,
        isCriandoMedico: criarMedico.isPending || criarMedico.isLoading,
        isAtualizandoMedico: atualizarMedico.isPending || atualizarMedico.isLoading,
        isDeletandoMedico: deletarMedico.isPending || deletarMedico.isLoading,
    };
}