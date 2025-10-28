import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formValidator } from "./validator/formValidator";

import "./App.css";

function App() {
  const occupations = {
    Cleaner: "Light Manual",
    Doctor: "Professional",
    Author: "White Collar",
    Farmer: "Heavy Manual",
    Mechanic: "Heavy Manual",
    Florist: "Light Manual",
    Other: "Heavy Manual",
  };

  const rating = {
    Professional: 1.5,
    "White Collar": 2.25,
    "Light Manual": 11.5,
    "Heavy Manual": 31.75,
  };

  const [occup, setOccup] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      age: 0,
      dob: "",
      occupation: "",
      amount: 0,
    },
    resolver: yupResolver(formValidator),
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label htmlFor="name">Name</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input {...field} placeholder="Enter your name" type="text" />
            )}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="age">Age Next Birthday</label>
          {/* <input id="age" type="number" /> */}
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <input {...field} placeholder="Enter a valid age" type="number" />
            )}
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="dob">Date of Birth(mm/YYYY)</label>
          {/* <input id="dob" type="month" /> */}
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter your date of birth"
                type="month"
              />
            )}
          />
          {errors.dob && <p className="error">{errors.dob.message}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="occupation">Usual Occupation</label>
          <Controller
            name="occupation"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">-- Select --</option>
                {Object.keys(occupations).map((occupation) => (
                  <option key={occupation} value={occupation}>
                    {occupation}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.occupation && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.occupation.message}
            </p>
          )}
        </div>
        <div className="input-container">
          <label htmlFor="amount">Death - Sum Insured</label>
          <Controller
            name="amount"
            control={control}
            rules={{ required: "Amount is required" }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Enter a valid amount"
                type="number"
              />
            )}
          />
          {errors.amount && <p className="error">{errors.amount.message}</p>}
        </div>
        <button type="submit">Calculate Premium</button>
      </form>
    </div>
  );
}

export default App;
