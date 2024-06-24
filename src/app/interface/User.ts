export interface User {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  dob: Date; // or Date if you handle date conversion
  password: string;
  confirmPassword: string;
}
