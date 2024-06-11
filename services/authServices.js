import validator from "validator";
import createHttpError from "http-errors";
import { UserModel } from "@/models/userModel";
import bcrypt from "bcrypt";
const { DEFAULT_PICTURE } = process.env;

export const createUser = async (userData) => {
  const { name, email, picture, password } = userData;

  //check if fields are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields.");
  }

  //check name length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Plase make sure your name is between 2 and 16 characters."
    );
  }

  //check if email address is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to provide a valid email address."
    );
  }

  //check if user already exist
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict(
      "Please try again with a different email address, this email already exist."
    );
  }

  //check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your password is between 6 and 128 characters."
    );
  }

  //hash password--->to be done in the user model

  //adding user to database
  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();

  return user;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  //check if user exist
  if (!user) throw createHttpError.NotFound("Invalid credentials.");

  //compare passwords
  let passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) throw createHttpError.NotFound("Invalid credentials.");

  return user;
};

export const findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) throw createHttpError.BadRequest("Please fil all fields!");
  return user;
};
