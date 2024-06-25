import { car_size as CarSize } from "../models/carSize";

export default class carSizeRepository {
  async get() {
    return await CarSize.findAll();
  }

  async getById(id: number) {
    return await CarSize.findOne({ where: { id: id } });
  }

  async post(body: CarSize) {
    return await CarSize.create({
      ...body,
      size: body.size.toLowerCase(),
    });
  }

  async put(id: number, body: CarSize) {
    return await CarSize.update(
      { ...body, size: body.size.toLowerCase() },
      { where: { id: id } }
    );
  }

  async delete(id: number) {
    return await CarSize.destroy({ where: { id: id } });
  }
}
