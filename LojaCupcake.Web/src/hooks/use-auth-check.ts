import AuthModel from "../interfaces/models/auth-model";

export interface AuthValidation {
  hasToken: boolean;
  expired: boolean;
  role: string | null;
}

function validateExpiredToken(tokenExpirationDate: string): boolean {
  const currentDate = new Date();
  const expiredDate = new Date(tokenExpirationDate);
  return currentDate > expiredDate;
}

export const useAuthCheck = (): AuthValidation => {
  const data: AuthValidation = { expired: false, hasToken: false, role: null };
  const authCache: string | null = sessionStorage.getItem("auth");

  if (!authCache) {
    data.hasToken = false;
    data.expired = true;
    return data;
  }
  data.hasToken = true;

  const token: AuthModel = JSON.parse(authCache);
  const expired = validateExpiredToken(token.expiresIn);

  if (expired) {
    sessionStorage.clear();
    data.expired = true;
    data.role = null;
    return data;
  } else {
    data.expired = false;
    data.role = token.role;
    return data;
  }
};
