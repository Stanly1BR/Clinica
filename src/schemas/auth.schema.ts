import z from 'zod';

export const authSchema = z.object({
    id: z.uuid().optional(),
    email: z.email(),
    password: z.string().min(6),
    tipo: z.enum(['medico', 'paciente']),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export type AuthDTO = z.infer<typeof authSchema>;