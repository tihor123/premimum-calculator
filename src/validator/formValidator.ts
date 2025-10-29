import { isBefore, isValid, parse, subYears } from "date-fns";
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
      .string()
      .required("Date of Birth is required")
      .matches(
        /^(0[1-9]|1[0-2])\/\d{4}$/,
        "Date must be in MM/YYYY format with 4-digit year"
      )
      .test("is-valid-date", "Date must be in MM/YYYY format", (value) => {
        if (!value) return false;
        const parsedDate = parse(value, "MM/yyyy", new Date());
        return isValid(parsedDate);
      })
      .test(
        "max-date",
        "Date must be at least 5 years before today",
        (value) => {
          if (!value) return false;
          const parsed = parse(value, "MM/yyyy", new Date());
          if (!isValid(parsed)) return false;
          const fiveYearsAgo = subYears(new Date(), 5);
          return isBefore(parsed, fiveYearsAgo);
        }
      ),
  })
  .required();
