import { BuildOptions, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import bcrypt from 'bcrypt';
import Podcast from './Podcast';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};

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
) as UserModelStatic;

User.hasMany(Podcast);
Podcast.belongsTo(User);

export default User;
