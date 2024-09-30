import { z } from "zod";

export const blacklistFormSchema = z.object({
  number: z.string().min(1).max(20),
  reason: z.string().min(1).max(40),
  admin: z.string().min(1).max(20),
});


