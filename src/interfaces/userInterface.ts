export interface UserInput {
    email: string;
    password: string;
    name: string;
  }
  
export interface CreateUserResponse {
    createUser: {
      email: string;
      name: string;
      password: string;
    }
  }
  