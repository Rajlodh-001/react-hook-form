import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Form, SubmitHandler, useForm } from "react-hook-form";

type FormField = {
  email: string;
  password: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting,isSubmitSuccessful },
  } = useForm<FormField>();

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve,1000))
    console.log(data);
  };

  return (
    <form className="formcss" onSubmit={handleSubmit(onSubmit)} action="">
      <input
        {...register("email", {
          required: "email is req",
          // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$]/,
          validate: (value) => {
            if (!value.includes("@")) {
              return "eamil not valit";
            }
            return true;
          },
        })}
        type="text"
        placeholder="Email"
      />
      {errors.email && <div>{errors.email.message}</div>}
      <input
        {...register("password", {
          required: true,
          minLength: {
            value :4,
            message :"password must be 8 Char"
          },
        })}
        type="password"
        placeholder="password"
      />
      {errors.password && (<div>{errors.password.message}</div>)}
      <button disabled={isSubmitting}>{isSubmitting ? "Loading..." :"submit"} {isSubmitSuccessful ? "successfully" :""}</button>
    </form>
  );
}

export default App;
