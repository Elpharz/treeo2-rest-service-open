export interface User {
  status: string;
  data: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface UserError {
  status: number;
  error: string;
}
