import { cars as Cars } from "../models/cars";
import sequelize from "../config/dbConnect";

export default class carsRepository {
  async get() {
    return await Cars.findAll({
      attributes: {
        include: [[sequelize.col("car_size.size"), "size"]],
        exclude: ["size_id", "createdBy", "updatedBy", "deletedBy"],
      },
      include: [
        {
          association: "car_size",
          attributes: [],
        },
        {
          association: "createBy",
          attributes: ["id", "name", "email", "role"],
        },
        {
          association: "updateBy",
          attributes: ["id", "name", "email", "role"],
        },
        {
          association: "deleteBy",
          attributes: ["id", "name", "email", "role"],
        },
      ],
      order: [["id", "ASC"]],
    });
  }

  async getById(id: number) {
    return await Cars.findOne({
      where: { id: id },
      attributes: {
        include: [[sequelize.col("car_size.size"), "size"]],
        exclude: ["size_id", "createdBy", "updatedBy", "deletedBy"],
      },
      include: [
        {
          association: "car_size",
          attributes: ["id", "size"],
        },
        {
          association: "createBy",
          attributes: ["id", "name", "email", "role"],
        },
        {
          association: "updateBy",
          attributes: ["id", "name", "email", "role"],
        },
        {
          association: "deleteBy",
          attributes: ["id", "name", "email", "role"],
        },
      ],
    });
  }

  async post(body: Cars) {
    return await Cars.create({ ...body });
  }

  async put(id: number, body: Cars) {
    return await Cars.update({ ...body }, { where: { id: id } });
  }

  async delete(id: number, body: Cars) {
    return await Cars.update({ ...body }, { where: { id: id } });
  }
}
