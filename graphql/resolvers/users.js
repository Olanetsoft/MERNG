const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
// const { SECRET_KEY } = require("../../config.env");
const User = require("../../models/User");

//using the dotenv variable
dotenv.config({ path: '../config.env' });

// helper for generating token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);

      //Check for valid Input
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Check user
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      // Check password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong Credentials";
        throw new UserInputError("Wrong Credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      //Validate User data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Make sure user don't already exist
      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Username is not available", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
