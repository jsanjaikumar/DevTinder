const { kMaxLength } = require('buffer');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      minLength: 3,
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    age: {
      type: Number,
      min: 18,

    },
    gender: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender is Not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      trim: true,
      default:
        "https://imgs.search.brave.com/EeNJW7iBuJN9coOhD8907Y69cMIOa-30Ciyg4g8oagU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvaW5mbHVlbmNl/ci1pY29uLXZlY3Rv/ci1pbWFnZS1jYW4t/YmUtdXNlZC1kaWdp/dGFsLW5vbWFkXzEy/MDgxNi0yNjM0NDEu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw",
    },
    about: {
      type: String,
      trim: true,
      default: "Hey there! I am using this app first time, let's connect.",
      MaxLength: 200,
    },
    skills: {
      type: [String],
      maxLength: 10
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);