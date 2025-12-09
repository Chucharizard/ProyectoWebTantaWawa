// API Endpoints - COMPLETO
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
    OBTENER_POR_ID: (id) => `/usuario/obtenerUsuarioPorId/${id}`,
    BUSCAR_POR_CI: (ci) => `/usuario/buscarPorCI/${ci}`,
    BUSCAR_POR_NOMBRE: (nombre) => `/usuario/buscarPorNombreCompleto/${nombre}`,
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
    OBTENER_POR_ID: (id) => `/rol/obtenerRolPorId/${id}`,
  },

  // Curso
  CURSO: {
    OBTENER_TODOS: '/curso/obtenerCursos',
    OBTENER_POR_ID: (id) => `/curso/obtenerCursoPorId/${id}`,
    BUSCAR_POR_NOMBRE: (nombre) => `/curso/buscarPorNombre/${nombre}`,
    CREAR: '/curso/crearCurso',
    ACTUALIZAR: '/curso/actualizarCurso',
    ACTIVAR: '/curso/activarCurso',
    ELIMINAR: '/curso/eliminarCursoLogico',
  },

  // Inscripcion
  INSCRIPCION: {
    OBTENER_TODOS: '/inscripcion/obtenerInscripciones',
    OBTENER_POR_ID: (id) => `/inscripcion/obtenerInscripcionPorId/${id}`,
    POR_ESTUDIANTE: (estudianteId) => `/inscripcion/buscarCursosPorEstudiante/${estudianteId}`,
    POR_CURSO: (cursoId) => `/inscripcion/buscarEstudiantesPorCurso/${cursoId}`,
    CREAR: '/inscripcion/crearInscripcion',
    ACTUALIZAR: '/inscripcion/actualizarInscripcion',
    ELIMINAR: '/inscripcion/eliminarInscripcion',
  },

  // Material
  MATERIAL: {
    OBTENER_TODOS: '/Material/obtenerMateriales',
    POR_CURSO: (cursoId) => `/Material/obtenerMaterialesPorCurso/${cursoId}`,
    OBTENER_POR_ID: (id) => `/Material/obtenerMaterialPorId/${id}`,
    BUSCAR_POR_TITULO: (cursoId, titulo) => `/Material/buscarMaterialPorTitulo/${cursoId}/${titulo}`,
    CREAR: '/Material/crearMaterial',
    ACTUALIZAR: '/Material/actualizarMaterial',
    ELIMINAR: (id) => `/Material/eliminarMaterial/${id}`,
  },

  // Mensaje
  MENSAJE: {
    OBTENER_TODOS: '/Mensaje/obtenerMensajes',
    POR_CURSO: (cursoId) => `/Mensaje/obtenerMensajesPorCurso/${cursoId}`,
    POR_USUARIO: (usuarioId) => `/Mensaje/obtenerMensajesPorUsuario/${usuarioId}`,
    OBTENER_POR_ID: (id) => `/Mensaje/obtenerMensajePorId/${id}`,
    CREAR: '/Mensaje/crearMensaje',
    ACTUALIZAR: '/Mensaje/actualizarMensaje',
    ELIMINAR: (id) => `/Mensaje/eliminarMensaje/${id}`,
  },

  // Evaluacion
  EVALUACION: {
    OBTENER_TODOS: '/Evaluacion/obtenerEvaluaciones',
    POR_CURSO: (cursoId) => `/Evaluacion/obtenerEvaluacionesPorCurso/${cursoId}`,
    OBTENER_POR_ID: (id) => `/Evaluacion/obtenerEvaluacionPorId/${id}`,
    BUSCAR_POR_TITULO: (cursoId, titulo) => `/Evaluacion/buscarEvaluacionPorTitulo/${cursoId}/${titulo}`,
    OBTENER_RESULTADOS: (evaluacionId) => `/Evaluacion/obtenerResultadosEvaluacion/${evaluacionId}`,
    CREAR: '/Evaluacion/crearEvaluacion',
    ACTUALIZAR: '/Evaluacion/actualizarEvaluacion',
    ELIMINAR: '/Evaluacion/eliminarEvaluacion',
  },

  // Resultado Evaluacion
  RESULTADO: {
    OBTENER_TODOS: '/ResultadoEvaluacion/obtenerResultados',
    POR_EVALUACION: (evaluacionId) => `/ResultadoEvaluacion/obtenerResultadosPorEvaluacion/${evaluacionId}`,
    POR_ESTUDIANTE: (estudianteId) => `/ResultadoEvaluacion/obtenerResultadosPorEstudiante/${estudianteId}`,
    POR_ESTUDIANTE_CURSO: (estudianteId, cursoId) =>
      `/ResultadoEvaluacion/obtenerResultadosEstudiantePorCurso/${estudianteId}/${cursoId}`,
    OBTENER_POR_ID: (id) => `/ResultadoEvaluacion/obtenerResultadoPorId/${id}`,
    CREAR: '/ResultadoEvaluacion/crearResultado',
    ACTUALIZAR: '/ResultadoEvaluacion/actualizarResultado',
    ELIMINAR: '/ResultadoEvaluacion/eliminarResultado',
  },
};
