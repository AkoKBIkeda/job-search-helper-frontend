import React from "react";
import { z } from "zod";

export const companySchema = z.object({
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
    z.string().min(1).max(30).nullable().optional()
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

// export type CompanyFormFields = z.infer<typeof companySchema>; <-- needed to be specific!!!
export type CompanyFormFields = {
  name: string;
  address?: string | null;
  website?: string | null;
  jobTitle?: string | null;
  workMode?: "onsite" | "remote" | "hybrid" | null;
  notes?: string | null;
  cultureRating?: number | null;
  missionRating?: number | null;
  supportRating?: number | null;
  opportunityRating?: number | null;
}