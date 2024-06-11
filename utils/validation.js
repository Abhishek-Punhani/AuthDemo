import * as yup from "yup";

export const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Full name is required!")
    .matches(/^[a-zA-Z_ ]*$/, "No Special Characters allowed !")
    .min(2, "Name must be between 2 and 16 characters")
    .max(16, "Name must be between 2 and 16 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email address!"),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{6,}$/,
      "Password must contain atleast 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
});

export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid Email address!"),
  password: yup.string().required("Password is required."),
});
