import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
} from "sequelize";
import connection from "../config/dbConnect";

export class users extends Model<
  InferAttributes<users>,
  InferCreationAttributes<users>
> {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: string;
  refresh_token!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: connection,
  }
);
