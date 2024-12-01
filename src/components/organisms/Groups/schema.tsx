import { z } from "zod";

export const groupFormSchema = z.object({
  gname: z.string().min(1).max(20),
  link: z.string().url(),
  commands_disabled: z.string(),
});

export type GroupFormSchema = z.infer<typeof groupFormSchema>;
