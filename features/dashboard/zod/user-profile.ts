import { z } from "zod";

export const userProfileSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  sms_phone: z.string().optional(),
  company_name: z.string().optional(),
  contact_name: z.string().optional(),
  region: z.string().optional(),
  address: z.string().optional(),
  category: z.string().optional(),
  id_document: z.string().url().optional(),
  profile_picture: z.union([z.instanceof(File), z.string().url()]).optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
