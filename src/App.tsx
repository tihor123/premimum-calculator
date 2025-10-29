import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { formValidator } from "./validator/formValidator";
import { getAgeFromDate } from "./utils/date_util";

import "./App.css";

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

function App() {
  const [premium, setPremium] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setValue,
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

  const watchOccup = watch("occupation");
  const watchDob = watch("dob");

  useEffect(() => {
    const { dob } = getValues();
    if (dob) {
      const age = getAgeFromDate(dob);
      setValue("age", age);
    }
  }, [watchDob]);

  useEffect(() => {
    calCulatePremium();
  }, [watchOccup]);

  const calCulatePremium = () => {
    const { name, age, dob, occupation, amount } = getValues();
    if (!name || !age || !dob || !occupation || !amount) {
      return;
    }
    const key = occupation as keyof typeof occupations;
    let occup = occupations[key];
    const premium =
      ((amount * rating[occup as keyof typeof rating] * age) / 1000) * 12;
    setPremium(premium.toFixed(2));
  };

  const onSubmit = () => {
    calCulatePremium();
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
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <input {...field} placeholder="Enter a valid age" type="number" />
            )}
            disabled
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="dob">Date of Birth(MM/YYYY)</label>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <input {...field} placeholder="MM/YYYY" type="text" />
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
        {premium && <h4>Your Premium is: {premium ? ` ${premium}` : "-"}</h4>}
        <button type="submit">Calculate Premium</button>
      </form>
    </div>
  );
}

export default App;
