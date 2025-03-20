export interface RequestBody {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface UserResponse {
  message: string;
  filteredUser: Omit<User, 'password'>;
}

export interface ErrorResponse {
  message: string;
}
