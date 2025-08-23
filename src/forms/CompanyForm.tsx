// Reference for using RHF with Zod: https://youtu.be/cc_xmawJ8Kg?feature=shared
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Buttons";
import RatingRadioGroups from "../components/RatingRadioGroups";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const companySchema = z.object({
  // set them to match the Django Company model with extra mins
  name: z.string().min(2).max(30),
  address: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().min(5).max(255).nullable().optional()
  ),
  website: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().url().min(5).max(100).nullable().optional()
  ),
  jobTitle: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().min(2).max(30).nullable().optional()
  ),
  // To avoid type errors for Zod with Typescript
  workMode: z.preprocess(
    (val) => (val === "" ? undefined : val), // if blank, treat as undefined
    z
      .string()
      .refine((val) => ["onsite", "remote", "hybrid"].includes(val))
      .nullable()
      .optional()
  ),
  notes: z.string().nullable().optional(),
  cultureRating: z.number().min(0).max(5).nullable().optional(),
  missionRating: z.number().min(0).max(5).nullable().optional(),
  supportRating: z.number().min(0).max(5).nullable().optional(),
  opportunityRating: z.number().min(0).max(5).nullable().optional(),
});

type CompanyFormFields = z.infer<typeof companySchema>;

export default function CompanyForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(companySchema),
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
    console.log(
      "Payload being sent:",
      JSON.stringify(
        {
          name: data.name,
          address: data.address,
          website: data.website,
          job_title: data.jobTitle,
          work_mode: data.workMode,
          notes: data.notes,
          culture_rating: data.cultureRating,
          mission_rating: data.missionRating,
          growth_support_rating: data.supportRating,
          career_path_rating: data.opportunityRating,
        },
        null,
        2
      )
    );
    try {
      await axios
        .post(
          BASE_URL + "/companies/",
          {
            // user: currentUserId,
            name: data.name,
            address: data.address,
            website: data.website,
            job_title: data.jobTitle,
            work_mode: data.workMode,
            notes: data.notes,
            culture_rating: data.cultureRating,
            mission_rating: data.missionRating,
            growth_support_rating: data.supportRating,
            career_path_rating: data.opportunityRating,
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
      if (axios.isAxiosError(error)) {
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        alert("Error: " + JSON.stringify(error.response?.data, null, 2));
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <form
      className="flex flex-col p-10 space-y-4 mx-auto max-w-full items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Header />
      <div className="flex flex-col w-full mx-auto max-w-3xl gap-4">
        <div className="flex flex-col items-center">
          <h1 className="text-primary text-4xl font-bold">Add New Company</h1>
          <p className="text-primary text-lg font-semibold">
            Register a new company to track your job research!
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start text-red-800 text-sm text-left mb-1">
            <p>*Required</p>
          </div>
          <input {...register("name")} type="text" placeholder="Company Name" />
          <span>
            {errors.name && (
              <span className="text-red-500">
                <br />
                {errors.name.message}
              </span>
            )}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <input
            {...register("address")}
            type="text"
            placeholder="Company Address"
          />
          <span>
            {errors.address && (
              <span className="text-red-500">
                <br />
                {errors.address.message}
              </span>
            )}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <input
            {...register("website")}
            type="text"
            placeholder="Website URL"
          />
          <span>
            {errors.website && (
              <span className="text-red-500">
                <br />
                {errors.website.message}
              </span>
            )}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <input
            {...register("jobTitle")}
            type="text"
            placeholder="Job Title"
          />
          <span>
            {errors.jobTitle && (
              <span className="text-red-500">
                <br />
                {errors.jobTitle.message}
              </span>
            )}
          </span>
        </div>
        <div className="flex flex-col items-center">
          {/* <div className="flex flex-col mb-2">
            <label className="text-primary font-semibold text-sm">
              Work Mode
            </label>
          </div> */}

          <select {...register("workMode")}>
            <option value="">Select Work Mode</option>
            <option value="onsite">On-Site</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="flex flex-col items-center">
          <textarea
            {...register("notes")}
            placeholder="Notes"
            className="h-28"
          />
          <span>
            {errors.notes && (
              <span className="text-red-500">
                <br />
                {errors.notes.message}
              </span>
            )}
          </span>
        </div>
        <div>
          <RatingRadioGroups control={control} name="Company Culture" />
          {/* <input
            {...register("cultureRating")}
            type="number"
            min={0}
            max={5}
            placeholder="Culture Rating"
          /> */}
        </div>
        <div>
          <RatingRadioGroups control={control} name="Company Mission" />
        </div>
        {/* <div>
          <input
            {...register("missionRating")}
            type="number"
            min={0}
            max={5}
            placeholder="Mission Rating"
          />
        </div> */}
        <div>
          <RatingRadioGroups control={control} name="Growth Support" />
          {/* <input
            {...register("supportRating")}
            type="number"
            min={0}
            max={5}
            placeholder="Support Rating"
          /> */}
        </div>
        <div>
          <RatingRadioGroups control={control} name="Career Opportunity" />
          {/* <input
            {...register("opportunityRating")}
            type="number"
            min={0}
            max={5}
            placeholder="Opportunity Rating"
          /> */}
        </div>
        <div className="flex flex-col items-center">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding company..." : "Add Company"}
          </Button>
        </div>

        {errors.root && (
          <span className="text-red-500">
            <br />
            {errors.root.message}
          </span>
        )}
      </div>
    </form>
  );
}
