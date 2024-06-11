import { sign, verify } from "@/utils/tokenUtils";

export const generateToken = async (payload, expiresIn, secret) => {
  let token = await sign(payload, expiresIn, secret);
  return token;
};

export const verifyToken = async (token, secret) => {
  let check = verify(token, secret); // this verfifies token and return user id
  return check;
};
