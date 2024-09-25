import { z } from "zod";

export const memberFormSchema = z.object({
  uuid: z.string(),
  username: z.string().min(1).max(20),
  number: z.string().min(1).max(20),
  donation: z.number().min(0),
});
