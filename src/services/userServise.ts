import { users as Users } from "../models/users";
import usersRepository from "../repositories/userRepo";

export default class UsersService {
  #usersRepository: usersRepository;

  constructor() {
    this.#usersRepository = new usersRepository();
  }

  async register(body: Users) {
    return await this.#usersRepository.register(body);
  }

  async getUsers(payload: string) {
    return await this.#usersRepository.getUsers(payload);
  }

  async getByEmail(email: string) {
    return await this.#usersRepository.getByEmail(email);
  }

  async updateToken(id: number, payload: string | null) {
    return await this.#usersRepository.updateToken(id, payload);
  }
}
