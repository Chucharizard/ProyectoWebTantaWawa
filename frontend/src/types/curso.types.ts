// Curso Types
export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  esActivo: boolean;
  docenteId: number;
  nombres?: string;
  apellidos?: string;
  carnetIdentidad?: number;
}

export interface CursoCrearDto {
  nombre: string;
  descripcion: string;
  docenteId: number;
}

export interface CursoActualizarDto {
  id: number;
  nombre: string;
  descripcion: string;
  docenteId: number;
}
