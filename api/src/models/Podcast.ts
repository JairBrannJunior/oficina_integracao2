import { BuildOptions, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import User from './User';

interface PodcastAttributes {
  id?: number;
  title: string;
  members?: string;
  publishedAt: Date;
  thumbnail?: string;
  description?: string;
  fileUrl: string;
  userId: number;
}

interface PodcastInstance extends Model<PodcastAttributes>, PodcastAttributes {}

type PodcastModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PodcastInstance;
};

const Podcast = sequelize.define(
  'podcast',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    members: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'podcasts',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
) as PodcastModelStatic;

export default Podcast;
