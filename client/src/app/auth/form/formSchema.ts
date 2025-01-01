import { object, string } from "yup";

export const formSchema = object().shape({
  email: string()
  .required('Email is required')
  .email('It should be an email'),
  password: string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .matches(/^[a-zA-Z,0-9]+$/, 'Is not in correct format'),
});

