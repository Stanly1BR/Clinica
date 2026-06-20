import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
import type { ConsultaDTO } from "../schemas/consulta.schema.js";

export class Consulta extends Model<ConsultaDTO> {
    public declare id: string;
    public declare pacienteId: string;
    public declare medicoId: string;
    public declare data: Date;
    public declare horario: string;
    public declare motivo: string;
    public declare status: 'agendada' | 'cancelada' | 'concluida';
    public declare createdAt: Date;
    public declare updatedAt: Date;
}

Consulta.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    pacienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "pacientes",
            key: "id",
        },
    },
    medicoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "medicos",
            key: "id",
        },
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('agendada', 'cancelada', 'concluida'),
        defaultValue: 'agendada',
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: "Consulta",
    tableName: "consultas",
});

export default Consulta;