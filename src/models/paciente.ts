import sequelize from '../db.js';
import { DataTypes, Model } from 'sequelize';
import type { PacienteDTO } from '../schemas/paciente.schema.js';

export class Paciente extends Model<PacienteDTO> implements PacienteDTO {
    public declare id: string;
    public declare nome: string;
    public declare cpf: string;
    public declare dataNascimento: Date;
    public declare telefone: string;
    public declare authId: string;
    public declare createdAt: Date;
    public declare updatedAt: Date;
}

Paciente.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true,
        },
        dataNascimento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        authId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "auths",
                key: "id",
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Paciente",
        tableName: "pacientes",
    }
);

export default Paciente;