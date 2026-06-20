import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
import type { MedicoDTO } from "../schemas/medico.schema.js";

export class Medico extends Model<MedicoDTO> implements MedicoDTO {
    public declare id: string;
    public declare nome: string;
    public declare crm: string;
    public declare especialidade: string;
    public declare authId: string;
    public declare createdAt: Date;
    public declare updatedAt: Date;
}

Medico.init(
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
        crm: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        especialidade: {
            type: DataTypes.STRING(100),
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
        modelName: "Medico",
        tableName: "medicos",
    }
);

export default Medico;