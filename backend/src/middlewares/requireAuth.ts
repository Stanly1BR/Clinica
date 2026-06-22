import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Estendendo a interface do Express para aceitar nossos campos customizados
declare global {
  namespace Express {
    interface Request {
      usuarioId?: string;
      tipoConta?: string;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'chave-secreta-padrao-docsync-2026';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    // Busca o token no formato "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: "Acesso negado: Token não fornecido ou em formato incorreto." });
        return;
    }

    // Extrai apenas a string do token
    const token = authHeader.split(' ')[1];

    try {
        // Valida o token e decodifica os dados, usando unknown para contornar a limitação de tipos do TS
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as { userId: string, tipo: string };
        
        // Injeta os dados na requisição para que os controllers possam usar (ex: req.usuarioId)
        req.usuarioId = decoded.userId;
        req.tipoConta = decoded.tipo;
        
        next();
    } catch (error) {
        res.status(401).json({ error: "Acesso negado: Token inválido ou expirado." });
    }
};

export default requireAuth;