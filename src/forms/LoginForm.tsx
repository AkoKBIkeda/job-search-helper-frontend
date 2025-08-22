import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BASE_URL } from "../constants";
import Button from "../components/Buttons";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(8).max(20),
});

type LoginFormFields = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      console.log("Login data submitted:", data);
      await axios
        .post(BASE_URL + "/auth/", {
          username: data.username,
          password: data.password,
        })
        .then((response) => {
          console.log("Login successful:", response.data);
          // Assuming the response contains a token
          const token = response.data.token;
          localStorage.setItem("token", token);
          login(token);
          navigate("/dashboard");
        });
    } catch (error) {
      console.error("Login error:", error);
      setError("root", { message: "Login failed" });
    }
  };

  return (
    <form
      className="p-10 space-y-4 max-w-full text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          className="max-w-sm w-full border border-[#ccc] p-2"
        />
      </div>
      {errors.username && (
        <div className="text-red-500">{errors.username.message}</div>
      )}
      <div>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="max-w-sm w-full border border-[#ccc] p-2"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>
      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </Button>
      </div>

      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
};

export default LoginForm;
