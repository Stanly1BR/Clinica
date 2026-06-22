import sequelize from '../db.js';

// 1. Importando todos os models
import Auth from './auth.js';
import Medico from './medico.js';
import Paciente from './paciente.js';
import Consulta from './consulta.js';
import Diagnostico from './diagnostico.js';

// 2. Definindo as Associações (Relacionamentos)

// --- Auth <-> Médico / Paciente ---
Auth.hasOne(Medico, { foreignKey: 'authId', as: 'medico' });
Medico.belongsTo(Auth, { foreignKey: 'authId', as: 'auth' });

Auth.hasOne(Paciente, { foreignKey: 'authId', as: 'paciente' });
Paciente.belongsTo(Auth, { foreignKey: 'authId', as: 'auth' });

// --- Médico / Paciente <-> Consulta ---
Medico.hasMany(Consulta, { foreignKey: 'medicoId', as: 'consultas' });
Consulta.belongsTo(Medico, { foreignKey: 'medicoId', as: 'medico' });

Paciente.hasMany(Consulta, { foreignKey: 'pacienteId', as: 'consultas' });
Consulta.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente' });

// --- Consulta / Paciente <-> Diagnóstico ---
Consulta.hasMany(Diagnostico, { foreignKey: 'consultaId', as: 'diagnosticos' });
Diagnostico.belongsTo(Consulta, { foreignKey: 'consultaId', as: 'consulta' });

Paciente.hasMany(Diagnostico, { foreignKey: 'pacienteId', as: 'diagnosticos' });
Diagnostico.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente' });

// 3. Exportando o sequelize e os models centralizados
export {
  sequelize,
  Auth,
  Medico,
  Paciente,
  Consulta,
  Diagnostico
};