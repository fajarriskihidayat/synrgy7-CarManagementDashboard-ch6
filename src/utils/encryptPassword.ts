const bcrypt = require("bcrypt");

const encryptPassword = async (pass: string) => {
  return await bcrypt.hash(pass, 10);
};

module.exports = encryptPassword;
