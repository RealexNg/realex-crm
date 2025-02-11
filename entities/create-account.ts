export interface UserProfile {
  full_name: string;
  email: string;
  phone: string;
  sms_phone?: string; // OPTIONAL
  company_name?: string; // OPTIONAL
  contact_name?: string; // OPTIONAL
  region?: string; // OPTIONAL
  address?: string; // OPTIONAL
  category?: string; // OPTIONAL
  id_document?: string; // OPTIONAL
  profile_picture?: File | string; // OPTIONAL
}

export interface UserProfileResponse {
  id: string; // UUID string
  status: "UN_VERIFIED" | "VERIFIED"; // Only these two possible status values
  full_name: string;
  email: string;
  phone: string;
  sms_phone?: string; // Optional
  company_name: string;
  contact_name: string;
  region: string;
  category: string;
  id_document: string; // URL string
  profile_picture: string; // URL string
  created_by: string; // UUID string
  role: "DISTRIBUTOR" | "ADMIN" | "USER"; // Possible roles
  updated_at: string; // ISO string
  created_at: string; // ISO string
  registered_by: string | null; // Can be null
  deleted_at: string | null; // Can be null
}

export interface FileMetadata {
  url: string; // A URL as a string
  format: string; // The format of the file as a string (e.g., "jpg", "png")
  file_name: string; // The name of the file as a string
}

// Interface for the User object
interface User {
  id: string; // UUID string
  full_name: string;
  email: string;
  password: string;
  phone: string;
  profile_picture: string | null; // Can be a string (URL) or null
  company_name: string | null;
  created_by: string | null;
  role: "AGENT" | "DISTRIBUTOR"; // Enums for roles
  status: "VERIFIED" | "UN_VERIFIED"; // Enums for status
  registered_by: string | null;
  sms_phone: string | null;
  category: string | null;
  contact_name: string | null;
  id_document: string | null;
  region: string | null;
  created_at: string; // Date in ISO format as string
  updated_at: string; // Date in ISO format as string
  deleted_at: string | null; // Nullable date or null
}

// Interface for the main object containing User object
export interface AllUserProfileResponse {
  id: string; // UUID string
  full_name: string;
  email: string;
  phone: string;
  profile_picture: string; // URL of profile picture
  company_name: string | null;
  created_by: string; // UUID string
  role: "DISTRIBUTOR"; // Hardcoded to DISTRIBUTOR
  status: "UN_VERIFIED"; // Hardcoded to UN_VERIFIED
  registered_by: string | null;
  sms_phone: string;
  category: string | null;
  contact_name: string;
  id_document: string; // URL
  region: string;
  created_at: string; // Date in ISO format as string
  updated_at: string; // Date in ISO format as string
  deleted_at: string | null; // Nullable date or null
  user: User; // Nested User object
}
