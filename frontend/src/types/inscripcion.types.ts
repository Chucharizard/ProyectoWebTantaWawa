// Inscripcion Types
export interface Inscripcion {
  id: number;
  estudianteId: number;
  estudianteNombreCompleto?: string;
  cursoId: number;
  cursoNombre?: string;
  fechaInscripcion: string;
}

export interface InscripcionCrearDto {
  estudianteId: number;
  cursoId: number;
}

export interface InscripcionActualizarDto {
  id: number;
  estudianteId: number;
  cursoId: number;
}
