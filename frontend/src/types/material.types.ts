// Material Types
export interface MaterialObtenerDto {
  id: number;
  titulo: string;
  archivoAdjunto?: string; // Base64 o URL
  fechaCreacion?: string;
  cursoId: number;
  cursoNombre: string;
}

export interface MaterialSimpleDto {
  id: number;
  titulo: string;
  fechaCreacion?: string;
}

export interface MaterialCrearDto {
  titulo: string;
  archivoAdjunto?: string; // Base64
  fechaCreacion?: string;
  cursoId: number;
}

export interface MaterialActualizarDto {
  id: number;
  titulo: string;
  archivoAdjunto?: string; // Base64
}
