import "reflect-metadata";

export interface User {
  id?: number,
  first_name?: string,
  last_name?: string,
  status?: string,
  avatar?: string,
  gender?: string,
  birth_date?: string,
  phone?: string,
  email?: string,
  is_organization?: boolean,
  can_shift_location?: boolean,
  expected_salary_low?: string,
  expected_salary_high?: string,
  experience?: number,
  subject?: string,
  is_superuser?: boolean,
  is_staff?: boolean,
  is_available?: boolean
}

export interface AuthContextType {
  user: User,
  isLoggedIn: boolean,
  syncUser?: () => void
}