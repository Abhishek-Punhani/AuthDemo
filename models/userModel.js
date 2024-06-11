import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      unique: [true, "This email address is already registered!!"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address!"],
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    password: {
      type: String,
      required: [true, "Please Provide your password"],
      minLength: [
        6,
        "Please make sure your password is atleast 6 characters long!",
      ],
      maxLength: [
        128,
        "Please make sure your password is atmost 128 characters long!",
      ],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export { UserModel };
