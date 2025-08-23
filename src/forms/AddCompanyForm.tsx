// Reference for using RHF with Zod: https://youtu.be/cc_xmawJ8Kg?feature=shared
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Buttons";
import RatingRadioGroups from "../components/RatingRadioGroups";
import axios, { isAxiosError } from "axios";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { companySchema, CompanyFormFields } from "../schemas/companySchema";
import CompanyFormBaseFields from "./CompanyFormBaseFields";

export default function AddCompanyForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<CompanyFormFields>({
    resolver: zodResolver(companySchema) as any, // Type assertion to avoid TS error for now
    defaultValues: {
      name: "",
      address: undefined,
      website: undefined,
      jobTitle: undefined,
      workMode: undefined,
      notes: undefined,
      cultureRating: undefined,
      missionRating: undefined,
      supportRating: undefined,
      opportunityRating: undefined,
    },
  });

  const onSubmit: SubmitHandler<CompanyFormFields> = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .post(
          BASE_URL + "/companies/",
          {
            name: data.name,
            address: data.address,
            website: data.website,
            job_title: data.jobTitle,
            work_mode: data.workMode,
            notes: data.notes,
            culture_rating: data.cultureRating,
            mission_rating: data.missionRating,
            support_rating: data.supportRating,
            opportunity_rating: data.opportunityRating,
          },
          {
            headers: {
              Authorization: "Token " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Form submitted successfully:", response.data);
          alert(response.data.message || "Company added successfully!");
          reset();
          navigate("/dashboard");
        });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        alert("Error: " + JSON.stringify(error.response?.data, null, 2));
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="p-10 space-y-4 max-w-full text-center">
      <Header />
      <form
        className="flex flex-col p-10 space-y-4 mx-auto max-w-full items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CompanyFormBaseFields
          register={register}
          errors={errors}
          control={control}
          title="Add New Company"
          description="Register a new company to track your job research!"
        />
        <div className="flex flex-col items-center">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding company..." : "Add Company"}
          </Button>
        </div>
      </form>
    </div>
  );
}
