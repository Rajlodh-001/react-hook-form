import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./login.css";

import {  SubmitHandler, useForm } from "react-hook-form";

type FormField = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors,isSubmitting,isSubmitSuccessful },
  } = useForm<FormField>({
    defaultValues:{
      email:"test12@testmail.com",
      password:"test1234"
    }
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve,1000));
    console.log(data);
    throw new Error()
    } catch (error) {
      // setError("email",{message:"This Email is already taken"})
      setError("root",{message:"This Email is already taken"})
    }
    
  };

  return (
    <div>
      
    <form className="formcss" onSubmit={handleSubmit(onSubmit)} action="">
      <h1>Login</h1>
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
      <button disabled={isSubmitting}>Submit
        {/* {isSubmitting ? "Loading..." :"submit"} {isSubmitSuccessful ? "successfully" :""} */}
        </button>

        {errors.root && (<div>{errors.root.message}</div>)}
    </form>
    </div>
  );
}

export default Login;
