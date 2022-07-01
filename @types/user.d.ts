import "reflect-metadata";

export interface User {
  id?: string,
  first_name?: string,
  last_name?: string,
  status?: string,
  avatar?: string,
  gender?: string,
  birth_date?: string,
  phone?: string,
  email?: string,
  can_shift_location?: boolean,
  expected_salary_low?: string,
  expected_salary_high?: string,
  experience?: number | string,
  subject?: string,
  is_superuser?: boolean,
  is_staff?: boolean,
  is_available?: boolean,
  cv?: string,
  position?: string,

  is_organization?: boolean,
  org_title?: string,
  org_description?: string,
  org_number_of_employees?: string | number,
  org_average_salary?: string | number,
  org_number_of_job_post?: string | number,
}

export interface AuthContextType {
  user: User,
  isLoggedIn: boolean,
  syncUser: () => void
}