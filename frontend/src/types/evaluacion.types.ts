// Evaluacion Types
export interface EvaluacionObtenerDto {
  id: number;
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  cursoId: number;
  cursoNombre: string;
  cantidadResultados: number;
  promedioNotas: number;
}

export interface EvaluacionSimpleDto {
  id: number;
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  cantidadResultados: number;
  promedioNotas: number;
}

export interface EvaluacionCrearDto {
  titulo: string;
  descripcion: string;
  fechaCreacion?: string;
  cursoId: number;
}

export interface EvaluacionActualizarDto {
  id: number;
  titulo: string;
  descripcion: string;
}
