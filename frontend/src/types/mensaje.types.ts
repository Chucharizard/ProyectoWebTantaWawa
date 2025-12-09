// Mensaje Types
export interface MensajeObtenerDto {
  id: number;
  contenido: string;
  archivoAdjunto?: string; // Base64 o URL
  fechaEnvio: string;
  cursoId: number;
  cursoNombre: string;
  usuarioId: number;
  usuarioNombreCompleto: string;
}

export interface MensajeSimpleDto {
  id: number;
  contenido: string;
  fechaEnvio: string;
  usuarioId: number;
  usuarioNombreCompleto: string;
}

export interface MensajePorUsuarioDto {
  id: number;
  contenido: string;
  fechaEnvio: string;
  cursoId: number;
  cursoNombre: string;
}

export interface MensajeCrearDto {
  contenido: string;
  archivoAdjunto?: string; // Base64
  fechaEnvio?: string;
  cursoId: number;
  usuarioId: number;
}

export interface MensajeActualizarDto {
  id: number;
  contenido: string;
  archivoAdjunto?: string; // Base64
}
