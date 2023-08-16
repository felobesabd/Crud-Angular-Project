export interface AuthRej {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: string;
}

export interface LoginRej {
  email: string;
  password: string;
  role?: string;
}

export interface UserRes {
  email?: string;
  userId?: string;
  token: string;
}
