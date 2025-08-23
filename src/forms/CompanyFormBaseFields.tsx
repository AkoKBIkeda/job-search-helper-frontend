import React from "react";
import RatingRadioGroups from "../components/RatingRadioGroups";
import Button from "../components/Buttons";
import Header from "../components/Header";
import { CompanyFormFields } from "../schemas/companySchema";
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";

type CompanyFormBaseProps = {
  register: UseFormRegister<CompanyFormFields>;
  //  register: SubmitHandler<CompanyFormFields>;
  errors: FieldErrors<CompanyFormFields>;
  control: Control<CompanyFormFields>;
  title: string;
  description: string;
  // isSubmitting: boolean;
  // buttonLabel: string;
  // onSubmit: (e?: React.BaseSyntheticEvent) => void;
};

export default function CompanyFormBaseFields({
  register,
  errors,
  control,
  title,
  description,
}: CompanyFormBaseProps) {
  return (
    <>
      <div className="flex flex-col w-full mx-auto max-w-3xl gap-4">
        <div className="flex flex-col items-center">
          <h1 className="text-primary text-4xl font-bold">{title}</h1>
          <p className="text-primary text-lg font-semibold">{description}</p>
        </div>
        <div className="flex flex-col items-center">
          {/* <div className="flex flex-col items-start text-red-800 text-sm text-left mb-1">
            <p>*Required</p>
          </div> */}
          <input
            {...register("name")}
            type="text"
            placeholder="Company Name (Required)"
          />
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
          <RatingRadioGroups
            control={control}
            name="cultureRating"
            label="Company Culture"
          />
        </div>
        <div>
          <RatingRadioGroups
            control={control}
            name="missionRating"
            label="Company Mission"
          />
        </div>
        <div>
          <RatingRadioGroups
            control={control}
            name="supportRating"
            label="Company Growth Support"
          />
        </div>
        <div>
          <RatingRadioGroups
            control={control}
            name="opportunityRating"
            label="Company Career Opportunity"
          />
        </div>

        {errors.root && (
          <span className="text-red-500">
            <br />
            {errors.root.message}
          </span>
        )}
      </div>
    </>
    // <form
    //   className="flex flex-col p-10 space-y-4 mx-auto max-w-full items-center"
    //   onSubmit={onSubmit}
    // >
    //   <Header />

    // {/* <div className="flex flex-col items-center">
    //   <Button type="submit" disabled={isSubmitting}>
    //     {buttonLabel}
    //   </Button>
    // </div> */}

    // </form>
  );
}
