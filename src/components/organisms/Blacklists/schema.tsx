import { z } from "zod";

export const blacklistFormSchema = z.object({
  uuid: z.string(),
  number: z.string().min(1).max(20),
  reason: z.string().min(1).max(40),
  admin: z.string().min(1).max(20),
});

export const blacklistFormCreateSchema = z.object({
  number: z.string().min(1).max(20),
  reason: z.string().min(1).max(40),
  admin: z.string().min(1).max(20),
});
