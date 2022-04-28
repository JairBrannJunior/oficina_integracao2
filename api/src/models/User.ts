import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import bcrypt from 'bcrypt';

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
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
  },
  {
    tableName: 'users',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user: any) => {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      },
    },
  }
);

export default User;
