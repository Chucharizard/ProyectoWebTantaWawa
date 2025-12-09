// Resultado Evaluacion Types
export interface ResultadoEvaluacionObtenerDto {
  id: number;
  estudianteId: number;
  estudianteNombreCompleto: string;
  evaluacionId: number;
  evaluacionTitulo: string;
  cursoId: number;
  cursoNombre: string;
  nota: number;
}

export interface ResultadoEvaluacionSimpleDto {
  id: number;
  estudianteId: number;
  estudianteNombreCompleto: string;
  nota: number;
}

export interface ResultadoPorEstudianteDto {
  id: number;
  evaluacionId: number;
  evaluacionTitulo: string;
  cursoId: number;
  cursoNombre: string;
  fechaEvaluacion: string;
  nota: number;
}

export interface ResultadoPorCursoEstudianteDto {
  id: number;
  evaluacionId: number;
  evaluacionTitulo: string;
  fechaEvaluacion: string;
  nota: number;
}

export interface ResultadoEvaluacionCrearDto {
  estudianteId: number;
  evaluacionId: number;
  nota: number;
}

export interface ResultadoEvaluacionActualizarDto {
  id: number;
  nota: number;
}
