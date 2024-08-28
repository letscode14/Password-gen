import { body } from "express-validator";

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
