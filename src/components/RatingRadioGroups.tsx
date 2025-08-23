import React from "react";
import { Controller, Control } from "react-hook-form";

type RatingRadioGroupsProps = {
  control: Control<any>;
  name: string;
  label: string;
};

export default function RatingRadioGroups({
  control,
  name, 
  label,
}: RatingRadioGroupsProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col items-center gap-4">
          <div>
            <label className="text-primary text-sm font-semibold">
              {label}
            </label>
          </div>
          {/* <div className="flex flex-col gap-4"></div> */}
          <div className="flex justify-center gap-5 mb-3">
            {[0, 1, 2, 3, 4, 5].map((value) => (
              <label
                key={value}
                className="flex flex-col items-center text-primary"
              >
                <input
                  type="radio"
                  value={value.toString()}
                  checked={field.value === value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
                <span className="ml-2">{value}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    />
  );
}
