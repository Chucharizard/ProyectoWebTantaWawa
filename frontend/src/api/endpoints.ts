// API Endpoints
export const ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/usuario/login',
    LOGOUT: '/usuario/logout',
  },

  // Usuario
  USUARIO: {
    BASE: '/usuario',
    OBTENER_TODOS: '/usuario/obtenerUsuarios',
    OBTENER_POR_ID: (id: number) => `/usuario/obtenerUsuarioPorId/${id}`,
    BUSCAR_POR_CI: (ci: string) => `/usuario/buscarPorCI/${ci}`,
    BUSCAR_POR_NOMBRE: (nombre: string) => `/usuario/buscarPorNombreCompleto/${nombre}`,
    CREAR: '/usuario/crearUsuario',
    ACTUALIZAR: '/usuario/actualizarUsuario',
    CAMBIAR_PASSWORD: '/usuario/cambiarPasswordUsuario',
    RESET_PASSWORD: '/usuario/reestablecerPassword',
    ACTIVAR: '/usuario/activarUsuario',
    ELIMINAR: '/usuario/eliminarUsuarioLogico',
  },

  // Rol
  ROL: {
    OBTENER_TODOS: '/rol/obtenerRoles',
    OBTENER_POR_ID: (id: number) => `/rol/obtenerRolPorId/${id}`,
  },

  // Curso
  CURSO: {
    OBTENER_TODOS: '/curso/obtenerCursos',
    OBTENER_POR_ID: (id: number) => `/curso/obtenerCursoPorId/${id}`,
    BUSCAR_POR_NOMBRE: (nombre: string) => `/curso/buscarPorNombre/${nombre}`,
    CREAR: '/curso/crearCurso',
    ACTUALIZAR: '/curso/actualizarCurso',
    ACTIVAR: '/curso/activarCurso',
    ELIMINAR: '/curso/eliminarCursoLogico',
  },

  // Inscripcion
  INSCRIPCION: {
    OBTENER_TODOS: '/inscripcion/obtenerInscripciones',
    OBTENER_POR_ID: (id: number) => `/inscripcion/obtenerInscripcionPorId/${id}`,
    POR_ESTUDIANTE: (estudianteId: number) => `/inscripcion/buscarCursosPorEstudiante/${estudianteId}`,
    POR_CURSO: (cursoId: number) => `/inscripcion/buscarEstudiantesPorCurso/${cursoId}`,
    CREAR: '/inscripcion/crearInscripcion',
    ACTUALIZAR: '/inscripcion/actualizarInscripcion',
    ELIMINAR: '/inscripcion/eliminarInscripcion',
  },

  // Material
  MATERIAL: {
    OBTENER_TODOS: '/Material/obtenerMateriales',
    POR_CURSO: (cursoId: number) => `/Material/obtenerMaterialesPorCurso/${cursoId}`,
    OBTENER_POR_ID: (id: number) => `/Material/obtenerMaterialPorId/${id}`,
    BUSCAR_POR_TITULO: (cursoId: number, titulo: string) => `/Material/buscarMaterialPorTitulo/${cursoId}/${titulo}`,
    CREAR: '/Material/crearMaterial',
    ACTUALIZAR: '/Material/actualizarMaterial',
    ELIMINAR: (id: number) => `/Material/eliminarMaterial/${id}`,
  },

  // Mensaje
  MENSAJE: {
    OBTENER_TODOS: '/Mensaje/obtenerMensajes',
    POR_CURSO: (cursoId: number) => `/Mensaje/obtenerMensajesPorCurso/${cursoId}`,
    POR_USUARIO: (usuarioId: number) => `/Mensaje/obtenerMensajesPorUsuario/${usuarioId}`,
    OBTENER_POR_ID: (id: number) => `/Mensaje/obtenerMensajePorId/${id}`,
    CREAR: '/Mensaje/crearMensaje',
    ACTUALIZAR: '/Mensaje/actualizarMensaje',
    ELIMINAR: (id: number) => `/Mensaje/eliminarMensaje/${id}`,
  },

  // Evaluacion
  EVALUACION: {
    OBTENER_TODOS: '/Evaluacion/obtenerEvaluaciones',
    POR_CURSO: (cursoId: number) => `/Evaluacion/obtenerEvaluacionesPorCurso/${cursoId}`,
    OBTENER_POR_ID: (id: number) => `/Evaluacion/obtenerEvaluacionPorId/${id}`,
    BUSCAR_POR_TITULO: (cursoId: number, titulo: string) => `/Evaluacion/buscarEvaluacionPorTitulo/${cursoId}/${titulo}`,
    OBTENER_RESULTADOS: (evaluacionId: number) => `/Evaluacion/obtenerResultadosEvaluacion/${evaluacionId}`,
    CREAR: '/Evaluacion/crearEvaluacion',
    ACTUALIZAR: '/Evaluacion/actualizarEvaluacion',
    ELIMINAR: '/Evaluacion/eliminarEvaluacion',
  },

  // Resultado Evaluacion
  RESULTADO: {
    OBTENER_TODOS: '/ResultadoEvaluacion/obtenerResultados',
    POR_EVALUACION: (evaluacionId: number) => `/ResultadoEvaluacion/obtenerResultadosPorEvaluacion/${evaluacionId}`,
    POR_ESTUDIANTE: (estudianteId: number) => `/ResultadoEvaluacion/obtenerResultadosPorEstudiante/${estudianteId}`,
    POR_ESTUDIANTE_CURSO: (estudianteId: number, cursoId: number) =>
      `/ResultadoEvaluacion/obtenerResultadosEstudiantePorCurso/${estudianteId}/${cursoId}`,
    OBTENER_POR_ID: (id: number) => `/ResultadoEvaluacion/obtenerResultadoPorId/${id}`,
    CREAR: '/ResultadoEvaluacion/crearResultado',
    ACTUALIZAR: '/ResultadoEvaluacion/actualizarResultado',
    ELIMINAR: '/ResultadoEvaluacion/eliminarResultado',
  },
} as const;
