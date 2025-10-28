import * as yup from "yup";

export const formValidator = yup
  .object({
    name: yup.string().required("Name is required"),
    amount: yup
      .number()
      .typeError("Please enter a valid number")
      .integer("Amount must be an integer")
      .positive("Amount must be positive")
      .required("Amount is required"),
    occupation: yup.string().required("Occupation is required"),
    age: yup
      .number()
      .typeError("Please enter a valid number")
      .required("Age is required")
      .min(5, "Age must be at least 5")
      .max(70, "Age must be at most 70"),
    dob: yup
      .date()
      .typeError("Please enter a valid date")
      .required("Date of Birth is required"),
  })
  .required();
