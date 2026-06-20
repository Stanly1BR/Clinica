import bicrypt from 'bcrypt';

import auth from '../models/auth.js';
import type { LoginDTO, AuthResponseDTO, RegisterDTO } from '../schemas/auth.schema.js';

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

        return { id: user.id };
    }

    async Register(authData: RegisterDTO): Promise<AuthResponseDTO> {
        const { password } = authData;
        const hashedPassword = await bicrypt.hash(password, 10);

        const newAuth = await auth.create({ ...authData, password: hashedPassword });

        return { id: newAuth.id };
    }
}