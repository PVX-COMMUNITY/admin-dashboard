import { z } from "zod";

export const birthdayFormSchema = z
  .object({
    username: z.string().min(1).max(20),
    day: z.number().min(1).max(31),
    month: z.number().min(1).max(12),
    year: z.number().min(1).max(2020),
    place: z.string().min(1).max(20),
  })
  .refine(
    (data) => {
      const daysInMonth = new Date(data.year, data.month, 0).getDate();
      return data.day <= daysInMonth;
    },
    {
      message: "Invalid day for the selected month and year",
      path: ["day"],
    }
  );

export type BirthdayFormSchema = z.infer<typeof birthdayFormSchema>;
