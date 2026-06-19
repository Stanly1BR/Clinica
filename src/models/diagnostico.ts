import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
import type { DiagnosticoDTO } from "../schemas/diagnosticos.schema.js";

class Diagnostico extends Model<DiagnosticoDTO> {
    public declare id: string;
    public declare descricao: string;
    public declare cid: string;
    public declare pacienteId: string;
    public declare consultaId: string;
    public declare dataDiagnostico: Date;
}

Diagnostico.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pacienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'pacientes',
            key: 'id',
        },
    },
    consultaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'consultas',
            key: 'id',
        },
    },
    dataDiagnostico: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Diagnostico',
    tableName: 'diagnosticos',
});

export default Diagnostico;