export interface GetAllFactoryDistributorResponse {
  id: number;
  first_name: string;
  last_name: string;
  no_of_goods: number;
  email: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  phone: string;
  address: string;
  status: "PENDING" | "APPROVED" | "REJECTED"; // Assuming possible status values
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
