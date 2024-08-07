const jwt = require("jsonwebtoken");

interface Payload {
  id: number;
  email: string;
  role: string;
}

export const createToken = (payload: Payload, SECRET: any, exp: string) => {
  return jwt.sign(
    { id: payload.id, email: payload.email, role: payload.role },
    SECRET,
    {
      expiresIn: exp,
    }
  );
};
