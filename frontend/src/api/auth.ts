import type { SignupData, LoginData, User} from "../types";


export async function signupUser(data: SignupData): Promise<{
  json(): any; message: string 
}> {
  const response = await fetch("http://localhost:8000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return response.json();
}

export async function loginUser(data: LoginData): Promise<{
  json(): any; message: string; access_token: string
}> {
const response = await fetch("http://localhost:8000/auth/login", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(data),
});

if (!response.ok) {
// Try to parse backend error message
let errMsg = "Login failed";
try {
const errorData = await response.json();
errMsg = errorData.detail || JSON.stringify(errorData);
} catch {}
throw new Error(errMsg);
}

return response.json();
}

export async function isAuthenticated(): Promise<{ isAuth: boolean; user?: any }> {
  const token = getCookie("access_token");
  if (!token){
    return { isAuth: false, user: null };
  }
  const res = await validateToken(token);
   if (res === null){
    return { isAuth: false, user: null };
   }

   return res
}

export function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
async function validateToken(token: string) {
  console.log(token)
  try {
    const res = await fetch("http://localhost:8000/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await res.json()
    return { isAuth: true, user }; // 200 means valid
  } catch {
    return { isAuth: false, user: null };
  }
}
