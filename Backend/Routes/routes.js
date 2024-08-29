import express from "express";
import { body, validationResult } from "express-validator";

import {
  deletePassword,
  generatePassoword,
  getSavedPass,
  getUser,
  login,
  logout,
  savePass,
  signup,
} from "../Controller/controller.js";
import {
  authMiddleWare,
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

router.post("/generate", (req, res, next) => {
  generatePassoword(req, res, next);
});

router.get("/user", authMiddleWare, (req, res, next) => {
  getUser(req, res, next);
});

router.post("/save-pass", authMiddleWare, (req, res, next) => {
  savePass(req, res, next);
});

router.get("/saved-pass", authMiddleWare, (req, res, next) => {
  getSavedPass(req, res, next);
});

router.patch("/delete-pass", authMiddleWare, (req, res, next) => {
  deletePassword(req, res, next);
});

router.post("/logout", authMiddleWare, (req, res, next) => {
  logout(req, res, next);
});
