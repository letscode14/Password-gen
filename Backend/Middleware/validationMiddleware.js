import { body } from "express-validator";
import jwt from "jsonwebtoken";
const { JsonWebTokenError } = jwt;

export const loginValidation = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long"),
];

export const signupValidation = [
  body("name").notEmpty().withMessage("Name must be provided"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long"),
];

export const authMiddleWare = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (token) {
      req.token = token;
      const isValid = jwt.verify(token, process.env.SECRET);
      req.user = isValid;
      if (isValid) {
        return next();
      } else {
        res.status(401).json({ message: "Token not valid" });
      }
    }

    res.status(401).json({ message: "No token provided" });
  } catch (error) {
    console.log(error);
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: "Token error " });
    }
    res.status(401).json({ message: "Token expired please login again" });
  }
};
