// Auth Types
export interface LoginCredentials {
  carnetIdentidad: number;
  password: string;
}

export interface LoginResponse {
  token: string;
  mensaje: string;
}

export interface AuthUser {
  id: number;
  nombreCompleto: string;
  carnet: number;
  rol: string;
}

export interface DecodedToken {
  sub: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  Carnet: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
  iss: string;
  aud: string;
}
