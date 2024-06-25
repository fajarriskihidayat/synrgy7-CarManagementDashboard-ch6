const bycrpt = require("bcrypt");

export const checkPassword = async (password: string, encryptPwd: string) => {
  return await bycrpt.compare(password, encryptPwd);
};
