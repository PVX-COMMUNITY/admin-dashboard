import { z } from "zod";

export const birthdayFormSchema = z.object({
  uuid: z.string(),
  username: z.string().min(1).max(20),
  day: z.number().min(1).max(31),
  month: z.number().min(1).max(12),
  year: z.number().min(1).max(2020),
  place: z.string().min(1).max(20),
  number: z.string().min(1).max(20),
});

export const birthdayFormCreateSchema = z.object({
  username: z.string().min(1).max(20),
  day: z.number().min(1).max(31),
  month: z.number().min(1).max(12),
  year: z.number().min(1).max(2020),
  place: z.string().min(1).max(20),
  number: z.string().min(1).max(20),
});
