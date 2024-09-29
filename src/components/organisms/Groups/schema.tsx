import { z } from "zod";

export const groupFormSchema = z.object({
  gname: z.string().min(1).max(20),
  link: z.string().min(1).max(20),
});

export const groupFormCreateSchema = z.object({
  gname: z.string().min(1).max(20),
  link: z.string().min(1).max(20),
});
