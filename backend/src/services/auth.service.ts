import bicrypt from 'bcrypt';
import auth from '../models/auth.js';
import paciente from '../models/paciente.js'; // Importe o model de paciente
import medico from '../models/medico.js';     // Importe o model de medico
import type { LoginDTO, AuthResponseDTO, RegisterDTO } from '../schemas/auth.schema.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export class AuthService {

    async Login(authData: LoginDTO): Promise<AuthResponseDTO> {
        const user = await auth.findOne({ where: { email: authData.email } });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bicrypt.compare(authData.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // 1. Busca o ID do perfil específico com base no tipo
        let userId = null;
        if (user.tipo === 'paciente') {
            const perfilPaciente = await paciente.findOne({ where: { authId: user.id } });
            if (perfilPaciente) userId = perfilPaciente.id;
        } else if (user.tipo === 'medico') {
            const perfilMedico = await medico.findOne({ where: { authId: user.id } });
            if (perfilMedico) userId = perfilMedico.id;
        }

        const token = jwt.sign(
            {userId, tipo: user.tipo }, // Opcional: injetar no token também
            JWT_SECRET, 
            { expiresIn: '1d' }
        );
        
        // 2. Retorna o perfilId junto com os dados de Auth
        return { token, userId, authId: user.id, tipo: user.tipo };
    }

    async Register(authData: RegisterDTO): Promise<AuthResponseDTO> {
        const { password } = authData;
        const hashedPassword = await bicrypt.hash(password, 10);

        const newAuth = await auth.create({ ...authData, password: hashedPassword });
        // 1. Busca o ID do perfil específico com base no tipo
        let userId = null;
        if (newAuth.tipo === 'paciente') {
            const perfilPaciente = await paciente.findOne({ where: { authId: newAuth.id } });
            if (perfilPaciente) userId = perfilPaciente.id;
        } else if (newAuth.tipo === 'medico') {
            const perfilMedico = await medico.findOne({ where: { authId: newAuth.id } });
            if (perfilMedico) userId = perfilMedico.id;
        }

        const token = jwt.sign(
            {userId, tipo: newAuth.tipo }, // Opcional: injetar no token também
            JWT_SECRET, 
            { expiresIn: '1d' }
        );

        // 2. Retorna o perfilId junto com os dados de Auth
        return { token, userId, authId: newAuth.id, tipo: newAuth.tipo };
    }
}