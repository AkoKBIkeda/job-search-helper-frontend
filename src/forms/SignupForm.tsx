import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BASE_URL } from "../constants";
import Button from "../components/Buttons";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const signupSchema = z.object({
  username: z.string().min(5).max(20),
  email: z.string().email().max(50),
  password: z.string().min(8).max(20),
});

type SignupFormFields = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormFields>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    try {
      await axios
        .post(BASE_URL + "/signup/", {
          username: data.username,
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          console.log("Signup successful:", response.data);
          alert(response.data.message || "Signup successful!");
          const token = response.data.token;
          localStorage.setItem("token", token);
          //   login(token);
          navigate("/dashboard");
        });
    } catch (error) {
      console.error("Signup error:", error);
      setError("root", { message: "Signup failed" });
    }
  };

  return (
    <form
      className="p-10 space-y-4 max-w-full text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <p className="text-blue-800">Between 5 and 20 characters</p>
        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          className="max-w-sm w-full border border-[#4C0A0B] p-2"
        />
      </div>
      {errors.username && (
        <div className="text-red-500">{errors.username.message}</div>
      )}
      <div>
        <p className="text-blue-800">
          Maximum length is 50 characters <br /> Contact us if your email is
          longer!
        </p>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="max-w-sm w-full border border-[#4C0A0B] p-2"
        />
      </div>
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <div>
        <p className="text-blue-800">Between 8 and 20 characters</p>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="max-w-sm w-full border border-[#4C0A0B] p-2"
        />
      </div>
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}
      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </div>

      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
};

export default SignupForm;
