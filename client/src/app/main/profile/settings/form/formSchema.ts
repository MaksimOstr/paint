import { object, string } from "yup";

export const formSchema = object().shape({
  username: string()
    .required("Username is required")
    .min(3, "Username length should be at least 3 characters"),
});
