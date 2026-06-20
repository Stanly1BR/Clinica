import express from 'express';
import type { AuthDTO, LoginDTO, RegisterDTO, AuthResponseDTO } from '../schemas/auth.schema.js';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(req: express.Request, res: express.Response): Promise<void> {
        try {
            const authData: LoginDTO = req.body;
            const response: AuthResponseDTO = await this.authService.Login(authData);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async register(req: express.Request, res: express.Response): Promise<void> {
        try {
            const authData: RegisterDTO = req.body;
            const response: AuthResponseDTO = await this.authService.Register(authData);
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}