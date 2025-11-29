// src/types.ts
export interface SignupData {
    fullname: string;
    username: string;
    email: string;
    password: string;
  }

  export interface LoginData {
    username: string;
    password: string;
  }
  export interface User {
    fullname: string;
    username: string;
    email: string;
    id: string;
    token?: string;
  }