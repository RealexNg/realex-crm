export interface Login {
  identifier: string;
  password: string;
}
export interface LoginResponse {
  id: string; // UUID format
  full_name: string;
  email: string;
  phone: string;
  profile_picture: string | null; // URL or null
  company_name: string | null;
  role: "AGENT" | "ADMIN" | "USER"; // Enumerate possible roles
  status: "VERIFIED" | "PENDING" | "SUSPENDED"; // Enumerate possible statuses
  registered_by: string | null; // UUID or null
  created_at: string; // ISO date format
  updated_at: string; // ISO date format
  deleted_at: string | null; // ISO date format or null
  token: string; // JWT token
}
