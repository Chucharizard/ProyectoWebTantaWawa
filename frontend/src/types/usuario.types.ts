// Usuario Types
export interface Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  carnetIdentidad: number;
  email: string;
  rolId: number;
  nombreRol: string;
  esUsuarioActivo: boolean;
}

export interface UsuarioCrearDto {
  nombres: string;
  apellidos: string;
  carnetIdentidad: number;
  email: string;
  password: string;
  rolId: number;
}

export interface UsuarioActualizarDto {
  id: number;
  nombres: string;
  apellidos: string;
  carnetIdentidad: number;
  email: string;
  rolId: number;
}

export interface UsuarioCambiarPasswordDto {
  id: number;
  passwordActual: string;
  nuevaPassword: string;
}

export interface UsuarioResetPasswordDto {
  id: number;
  nuevaPassword: string;
}

export interface UsuarioFiltros {
  ci?: string;
  nombreCompleto?: string;
}
