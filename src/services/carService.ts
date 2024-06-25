import { cars as Cars } from "../models/cars";
import carsRepository from "../repositories/carsRepo";

export default class CarsService {
  #carsRepository: carsRepository;

  constructor() {
    this.#carsRepository = new carsRepository();
  }

  async get() {
    return await this.#carsRepository.get();
  }

  async getById(id: number) {
    return await this.#carsRepository.getById(id);
  }

  async post(body: Cars) {
    return await this.#carsRepository.post(body);
  }

  async put(id: number, body: Cars) {
    return await this.#carsRepository.put(id, body);
  }

  async delete(id: number, body: Cars) {
    return await this.#carsRepository.delete(id, body);
  }
}
