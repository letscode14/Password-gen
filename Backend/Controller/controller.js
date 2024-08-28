import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import userModel from "../Model/userModel.js";

import bcrypt from "bcryptjs";

let statusCode;
export const login = async (req, res, next) => {
  try {
    const reqError = validationResult(req);
    if (reqError.errors.length) {
      statusCode = 401;
      throw new Error(reqError.errors[0]?.msg);
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });
    if (!user) {
      statusCode = 401;
      throw new Error("User already exist");
    }

    res.status(201).json({ message: "Login success fully" });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const reqError = validationResult(req);
    if (reqError.errors.length) {
      statusCode = 401;
      throw new Error(reqError.errors[0].msg);
    }

    const { email, password, name } = req.body;

    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      statusCode = 401;
      throw new Error("User already exist Please login");
    }

    const salt = await bcrypt.genSalt(10);

    var hash = await bcrypt.hashSync(password, salt);

    const user = await userModel.updateOne(
      { email },
      { email, password: hash, name },
      { upsert: true }
    );
    

    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "30d" });
    if (user && token) {
      res.status(200).json({ token, message: "User created successfully" });
    } else {
      statusCode = 500;
      throw new Error("Internal server error");
    }
  } catch (error) {
    error.statusCode = statusCode;
    next(error);
  }
};
