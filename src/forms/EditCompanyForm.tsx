import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Buttons";
import RatingRadioGroups from "../components/RatingRadioGroups";
import axios, { isAxiosError } from "axios";
import { BASE_URL } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { companySchema, CompanyFormFields } from "../schemas/companySchema";
import CompanyFormBaseFields from "./CompanyFormBaseFields";

export default function EditCompanyForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors, isSubmitting },
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

  // To update company info
  const onSubmit: SubmitHandler<CompanyFormFields> = async (data) => {
    console.log("originalData:", JSON.stringify(data, null, 2));
    const token = localStorage.getItem("token");
    const cleanData = {
      ...data,
      address: data.address === "" ? null : data.address ?? null,
      website: data.website === "" ? null : data.website ?? null,
      jobTitle: data.jobTitle === "" ? null : data.jobTitle ?? null,
      workMode: data.workMode ?? null,
      notes: data.notes === "" ? null : data.notes ?? null,
      cultureRating: data.cultureRating ?? null,
      missionRating: data.missionRating ?? null,
      supportRating: data.supportRating ?? null,
      opportunityRating: data.opportunityRating ?? null,
    };
    try {
      console.log("cleanData:", JSON.stringify(cleanData, null, 2));
      await axios
        .put(
          BASE_URL + "/companies/" + id + "/",
          {
            name: cleanData.name,
            address: cleanData.address,
            website: cleanData.website,
            job_title: cleanData.jobTitle,
            work_mode: cleanData.workMode,
            notes: cleanData.notes,
            culture_rating: cleanData.cultureRating,
            mission_rating: cleanData.missionRating,
            support_rating: cleanData.supportRating,
            opportunity_rating: cleanData.opportunityRating,
          },
          {
            headers: {
              Authorization: "Token " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(
            "Company updated successfully:",
            JSON.stringify(response.data, null, 2)
          );
          alert("Company updated successfully!");
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

  const deleteCompany = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .delete(BASE_URL + "/companies/" + id + "/", {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((response) => {
          console.log("Company deleted successfully:", response.data);
          alert("Company deleted successfully!");
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

  // fetch current company data from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      axios
        .get(BASE_URL + "/companies/" + id + "/", {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((response) => {
          const companyData = response.data;
          console.log("Fetched company data:", companyData);
          // set default value fetched from backend
          setValue("name", companyData.name);
          setValue("address", companyData.address);
          setValue("website", companyData.website);
          setValue("jobTitle", companyData.job_title);
          setValue("workMode", companyData.work_mode);
          setValue("notes", companyData.notes);
          setValue("cultureRating", companyData.culture_rating);
          setValue("missionRating", companyData.mission_rating);
          setValue("supportRating", companyData.support_rating);
          setValue("opportunityRating", companyData.opportunity_rating);
        });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          "Error fetching company data:",
          error.response?.data || error.message
        );
        alert("Failed to load company data.");
      } else {
        console.error("Error fetching company data:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [id, setValue]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-10 space-y-4 max-w-full text-center">
      <Header />
      <div className="flex flex-col items-center">
        <h1>Edit Company</h1>
        <h2>
          Update the company information
        </h2>
        <div className="flex items-center justify-between space-x-10">
          <div className="md:w-[200px]"></div>
          <Button onClick={() => deleteCompany()}>Delete</Button>
        </div>
      </div>
      <form
        className="flex flex-col p-10 space-y-4 mx-auto max-w-full items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CompanyFormBaseFields
          register={register}
          errors={errors}
          control={control}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </div>
  );
}
