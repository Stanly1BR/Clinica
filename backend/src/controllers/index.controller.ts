import { Router } from 'express';

import { AuthController } from './auth.controller.js';
import { PacienteController } from './paciente.controller.js';
import { MedicoController } from './medico.controller.js';

const router = Router();

router.use('/auth', new AuthController().router);
router.use('/pacientes', new PacienteController().router);
router.use('/medicos', new MedicoController().router);

export default router;