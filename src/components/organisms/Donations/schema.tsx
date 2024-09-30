import { z } from "zod";

export const donationFormSchema = z.object({
  username: z.string().min(1).max(20),
  number: z.string().min(1).max(20),
  donation: z.number().min(0),
});
