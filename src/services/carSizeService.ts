import { car_size as CarSize } from "../models/carSize";
import carSizeRepository from "../repositories/carSizeRepo";

export default class CarSizeService {
  #carSizeRepository: carSizeRepository;

  constructor() {
    this.#carSizeRepository = new carSizeRepository();
  }

  async get() {
    return await this.#carSizeRepository.get();
  }

  async getById(id: number) {
    return await this.#carSizeRepository.getById(id);
  }

  async post(body: CarSize) {
    return await this.#carSizeRepository.post(body);
  }

  async put(id: number, body: CarSize) {
    return await this.#carSizeRepository.put(id, body);
  }

  async delete(id: number) {
    return await this.#carSizeRepository.delete(id);
  }
}
