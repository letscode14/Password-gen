import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  savedPasswords: {
    type: [
      {
        password: {
          type: String,
        },
        des: {
          type: String,
        },
        isDeleted: {
          type: Boolean,
          default: false,
        },
        createdOn: {
          type: Date,
          default: Date.now(),
        },
      },
    ],

    default: [],
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
