// src/types.ts
export interface SignupData {
    full_name: string;
    username: string;
    email: string;
    password: string;
  }

  export interface LoginData {
    username: string;
    password: string;
  }
  export interface User {
    full_name: string;
    username: string;
    email: string;
    id: string;
    token?: string;
  }

  // types/journal.ts

export interface Journal {
  id: string;
  name: string;
  description: string;
  is_private: boolean;
  created_at: string;
}

export interface JournalCreatePayload {
  name: string;
  description: string;
  is_private: boolean;
}
