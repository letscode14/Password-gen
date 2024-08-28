import express from "express";
import { body, validationResult } from "express-validator";

import { login, signup } from "../Controller/controller.js";
import {
  loginValidation,
  signupValidation,
} from "../Middleware/validationMiddleware.js";

export const router = express.Router();

router.post("/login", loginValidation, (req, res, next) => {
  login(req, res, next);
});

router.post("/signup", signupValidation, (req, res, next) => {
  signup(req, res, next);
});
router.post("/signup");
