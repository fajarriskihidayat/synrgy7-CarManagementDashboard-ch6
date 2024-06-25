import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
} from "sequelize";
import connection from "../config/dbConnect";
import { car_size as CarSize } from "./carSize";
import { users as Users } from "./users";

export class cars extends Model<
  InferAttributes<cars>,
  InferCreationAttributes<cars>
> {
  id!: number;
  size_id!: ForeignKey<number>;
  name!: string;
  rentPerDay!: number;
  img_url!: string;
  isDeleted!: number;
  createdBy!: ForeignKey<number>;
  updatedBy!: ForeignKey<number>;
  deletedBy!: ForeignKey<number>;
  createdAt!: Date;
  updatedAt!: Date;
}

cars.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    size_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    rentPerDay: {
      type: DataTypes.INTEGER,
    },
    img_url: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: connection,
  }
);

cars.belongsTo(CarSize, { foreignKey: "size_id" });
cars.belongsTo(Users, { as: "createBy", foreignKey: "createdBy" });
cars.belongsTo(Users, { as: "updateBy", foreignKey: "updatedBy" });
cars.belongsTo(Users, { as: "deleteBy", foreignKey: "deletedBy" });
