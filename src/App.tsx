import { useState } from "react";
import "./App.css";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type FormField = z.infer<typeof schema>;

// type FormField = {
//   email: string;
//   password: string;
// };

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormField>({
    defaultValues: {
      email: "test12@testmail.com",
      password: "test1234",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error();
    } catch (error) {
      // setError("email",{message:"This Email is already taken"})
      setError("root", { message: "This Email is already taken" });
    }
  };

  return (
    <div>
      <form className="formcss" onSubmit={handleSubmit(onSubmit)} action="">
        <h1>Login</h1>
        <input {...register("email")} type="text" placeholder="Email" />
        {errors.email && <div>{errors.email.message}</div>}
        <input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        {errors.password && <div>{errors.password.message}</div>}
        <button disabled={isSubmitting}>
          Submit
          {/* {isSubmitting ? "Loading..." :"submit"} {isSubmitSuccessful ? "successfully" :""} */}
        </button>

        {/* {errors.root && <div>{errors.root.message}</div>} */}
      </form>
    </div>
  );
}

export default App;
