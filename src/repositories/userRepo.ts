import { users as Users } from "../models/users";
import sequelize from "../config/dbConnect";

export default class usersRepository {
  async register(body: Users) {
    return await Users.create({ ...body });
  }

  async getUsers(payload: string) {
    return await Users.findAll({ where: { refresh_token: payload } });
  }

  async getByEmail(email: string) {
    return await Users.findOne({ where: { email: email } });
  }

  async updateToken(id: number, payload: string | null) {
    return await Users.update(
      {
        refresh_token: payload,
      },
      { where: { id: id } }
    );
  }
}
