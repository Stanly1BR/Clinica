import sequelize from '../db.js';
import { DataTypes, Model } from 'sequelize';
import type { AuthDTO } from '../schemas/auth.schema.js';

class Auth extends Model<AuthDTO> implements AuthDTO {
    public declare id: string;
    public declare nome: string;
    public declare email: string;
    public declare password: string;
    public declare tipo: 'medico' | 'paciente';
    public declare createdAt: Date;
    public declare updatedAt: Date;
}

Auth.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM('medico', 'paciente'),
            allowNull: false,
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
        modelName: 'Auth',
        tableName: 'auths',
    }
);

export default Auth;