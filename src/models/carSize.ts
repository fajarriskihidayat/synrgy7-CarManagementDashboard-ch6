import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import connection from "../config/dbConnect";

export class car_size extends Model<
  InferAttributes<car_size>,
  InferCreationAttributes<car_size>
> {
  id!: number;
  size!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

car_size.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    size: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: connection,
  }
);
