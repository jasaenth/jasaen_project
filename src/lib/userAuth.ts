import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateUserToken = (userId: string, role: string) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

export const verifyUserToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
