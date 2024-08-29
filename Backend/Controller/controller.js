import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import userModel from "../Model/userModel.js";

import bcrypt from "bcryptjs";
import { ObjectId } from "mongoose";
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
      throw new Error("User dont exist please signup");
    }

    const isValidp = await bcrypt.compare(password, user.password);
    if (!isValidp) {
      statusCode = 401;
      throw new Error("Invalid credentials");
    }

    const userEmail = user.email;
    const token = jwt.sign({ email: userEmail }, process.env.SECRET);

    res.status(200).json({ message: "Login success fully", token });
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
      res.status(201).json({ token, message: "User created successfully" });
    } else {
      statusCode = 500;
      throw new Error("Internal server error");
    }
  } catch (error) {
    error.statusCode = statusCode;
    next(error);
  }
};

async function genPassword(options) {
  const { length, special, numbers, uppercase, symbols } = options;

  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const specialChars = "!@#$%&?";
  const symbolChars = "+=}{[]^()><";

  let characterSet = lowerCaseChars;

  if (uppercase) characterSet += upperCaseChars;
  if (numbers) characterSet += numberChars;
  if (special) characterSet += specialChars;
  if (symbols) characterSet += symbolChars;

  if (characterSet.length === 0) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    password += characterSet[randomIndex];
  }

  return password;
}

export const generatePassoword = async (req, res, next) => {
  try {
    const password = await genPassword(req.body);

    if (password) {
      return res.status(200).json({ password: password });
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const deletePassword = async (req, res, next) => {
  try {
    const { id } = req.body;

    const deletedPassword = await userModel.updateOne(
      { "savedPasswords._id": id },
      { $set: { "savedPasswords.$.isDeleted": true } }
    );

    if (deletedPassword) {
      res.status(200).json({ message: "Password deleted successfully" });
    } else {
      throw new Error("Error while deleting the password");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (user) res.status(200).json({ email: user.email });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const savePass = async (req, res, next) => {
  try {
    const user = req.user;
    const { desc, pass } = req.body;
    const updateUser = await userModel.updateOne(
      { email: user.email },
      { $push: { savedPasswords: { password: pass, des: desc } } }
    );

    if (updateUser) {
      res.status(200).json({ message: "Password saved successfully" });
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getSavedPass = async (req, res, next) => {
  try {
    const us = req.user;
    const user = await userModel.aggregate([
      {
        $match: { email: us.email },
      },
      {
        $project: {
          savedPasswords: {
            $filter: {
              input: "$savedPasswords",
              as: "password",
              cond: { $eq: ["$$password.isDeleted", false] },
            },
          },
        },
      },
    ]);

    const savedPasswords = user[0]?.savedPasswords || [];

    const map = savedPasswords.reduce((acc, val) => {
      acc[val?._id] = false;
      return acc;
    }, {});

    if (map && savedPasswords) {
      res.status(200).json({
        passwords: savedPasswords,
        map: map,
      });
    } else {
      throw new Error("Fectching error");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.status(200).json({ message: "User logout successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
