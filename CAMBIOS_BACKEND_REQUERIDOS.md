# 📋 CAMBIOS NECESARIOS EN EL BACKEND

> **Fecha:** 9 de Diciembre 2025  
> **Proyecto:** Sistema Académico Tantawawas  
> **Objetivo:** Ajustar autorizaciones para que coincidan con la documentación de la API

---

## ❌ 1. CursoController - Problema de Autorización (CRÍTICO)

**Archivo:** `Controllers/CursoController.cs`

### Problema actual:
```csharp
[Authorize(Policy = "EsAdmin")]  // ← Línea 10 - TODO el controlador es solo Admin
public class CursoController : ControllerBase
```

### Lo que se necesita según la documentación:
| Método | Endpoint | Autorización Actual | Autorización Requerida |
|--------|----------|---------------------|------------------------|
| GET | `/obtenerCursos` | Admin | Admin ✅ |
| GET | `/obtenerCursoPorId/{id}` | Admin | **Autenticado** ❌ |
| GET | `/buscarPorNombre/{nombre}` | Admin | **Autenticado** ❌ |
| POST | `/crearCurso` | Admin | Admin ✅ |
| PUT | `/actualizarCurso` | Admin | Admin ✅ |
| PUT | `/activarCurso` | Admin | Admin ✅ |
| PUT | `/eliminarCursoLogico` | Admin | Admin ✅ |

### Solución sugerida:
Quitar `[Authorize(Policy = "EsAdmin")]` de la clase y ponerlo solo en los métodos específicos:

```csharp
[ApiController]
[Route("api/curso")]
[Authorize]  // ← Solo requiere estar autenticado a nivel de clase
public class CursoController : ControllerBase
{
    [HttpGet("obtenerCursos")]
    [Authorize(Policy = "EsAdmin")]  // ← Solo admin puede ver TODOS
    public async Task<IActionResult> ObtenerCursos() { ... }

    [HttpGet("obtenerCursoPorId/{id}")]
    // Sin autorización adicional - cualquier autenticado puede ver un curso
    public async Task<IActionResult> ObtenerCursoPorId(int id) { ... }

    [HttpGet("buscarPorNombre/{nombre}")]
    // Sin autorización adicional - cualquier autenticado puede buscar
    public async Task<IActionResult> BuscarPorNombre(string nombre) { ... }
    
    [HttpPost("crearCurso")]
    [Authorize(Policy = "EsAdmin")]
    public async Task<IActionResult> CrearCurso(CursoCrearDto dto) { ... }

    [HttpPut("actualizarCurso")]
    [Authorize(Policy = "EsAdmin")]
    public async Task<IActionResult> ActualizarCurso(CursoActualizarDto dto) { ... }

    [HttpPut("activarCurso")]
    [Authorize(Policy = "EsAdmin")]
    public async Task<IActionResult> ActivarCurso(CursoIdDto dto) { ... }

    [HttpPut("eliminarCursoLogico")]
    [Authorize(Policy = "EsAdmin")]
    public async Task<IActionResult> EliminarCursoLogico(CursoIdDto dto) { ... }
}
```

---

## ❌ 2. InscripcionController - Problema de Autorización (CRÍTICO)

**Archivo:** `Controllers/InscripcionController.cs`

### Problema actual:
```csharp
[Authorize(Policy = "EsAdmin")]  // ← TODO el controlador es solo Admin
public class InscripcionController : ControllerBase
```

### Lo que se necesita:
El **estudiante** necesita poder ver **sus propios cursos inscritos**.

| Método | Endpoint | Autorización Actual | Autorización Requerida |
|--------|----------|---------------------|------------------------|
| GET | `/obtenerInscripciones` | Admin | Admin ✅ |
| GET | `/obtenerInscripcionPorId/{id}` | Admin | Admin ✅ |
| GET | `/buscarCursosPorEstudiante/{estudianteId}` | Admin | **Autenticado** ❌ |
| GET | `/buscarEstudiantesPorCurso/{cursoId}` | Admin | Admin/Docente ❌ |
| POST | `/crearInscripcion` | Admin | Admin ✅ |
| PUT | `/actualizarInscripcion` | Admin | Admin ✅ |
| DELETE | `/eliminarInscripcion` | Admin | Admin ✅ |

### Solución sugerida:
```csharp
[ApiController]
[Route("api/inscripcion")]
[Authorize]  // ← Cambiar a solo autenticado a nivel de clase
public class InscripcionController : ControllerBase
{
    [HttpGet("obtenerInscripciones")]
    [Authorize(Policy = "EsAdmin")]
    public async Task<IActionResult> ObtenerInscripciones() { ... }

    [HttpGet("obtenerInscripcionPorId/{id}")]
    [Authorize(Policy = "EsAdmin")]
    public async Task<IActionResult> ObtenerInscripcionPorId(int id) { ... }

    [HttpGet("buscarCursosPorEstudiante/{estudianteId}")]
    // Sin autorización adicional - estudiante puede ver sus cursos
    // (Idealmente validar que el estudianteId sea el mismo del token JWT)
    public async Task<IActionResult> BuscarCursosPorEstudiante(int estudianteId) { ... }

    [HttpGet("buscarEstudiantesPorCurso/{cursoId}")]
    [Authorize(Roles = "Administrador,Docente")]  // Admin o Docente del curso
    public async Task<IActionResult> BuscarEstudiantesPorCurso(int cursoId) { ... }

    [HttpPost("crearInscripcion")]
    [Authorize(Policy = "EsAdmin")]
    public async Task<IActionResult> CrearInscripcion(InscripcionCrearDto dto) { ... }

    // ... resto con [Authorize(Policy = "EsAdmin")]
}
```

---

## ❌ 3. FALTA ENDPOINT: Obtener Cursos por Docente (CRÍTICO)

**Problema:** No existe un endpoint para que un **Docente** vea solo sus cursos asignados.

### Lo que se necesita crear:

**En `CursoController.cs` agregar:**
```csharp
[HttpGet("obtenerCursosPorDocente/{docenteId}")]
[Authorize]  // Cualquier autenticado
public async Task<IActionResult> ObtenerCursosPorDocente(int docenteId)
{
    try
    {
        var cursos = await _service.ObtenerPorDocenteAsync(docenteId);
        return Ok(cursos);
    }
    catch (Exception ex)
    {
        return BadRequest(new { error = ex.Message });
    }
}
```

**En `CursoService.cs` agregar:**
```csharp
public async Task<List<CursoDocenteObtenerDto>> ObtenerPorDocenteAsync(int docenteId)
{
    var cursos = await _context.Cursos
        .Include(c => c.Docente)
        .Where(c => c.DocenteId == docenteId && c.EsActivo)
        .Select(c => new CursoDocenteObtenerDto
        {
            Id = c.Id,
            Nombre = c.Nombre,
            Descripcion = c.Descripcion,
            DocenteId = c.DocenteId,
            Nombres = c.Docente != null ? c.Docente.Nombres : "Desconocido",
            Apellidos = c.Docente != null ? c.Docente.Apellidos : "Desconocido",
            CarnetIdentidad = c.Docente != null ? c.Docente.CarnetIdentidad : 0,
            EsActivo = c.EsActivo
        })
        .ToListAsync();

    return cursos;
}
```

---

## ⚠️ 4. MaterialController - Ajuste de autorización

**Archivo:** `Controllers/MaterialController.cs`

### Problema actual:
```csharp
[Authorize(Policy = "EsDocente")]  // ← Solo Docente puede actualizar/eliminar
[HttpPut("actualizarMaterial")]

[Authorize(Policy = "EsDocente")]
[HttpDelete("eliminarMaterial/{id}")]
```

### Lo que dice la documentación:
Actualizar/Eliminar → **Admin, Docente** (ambos deberían poder)

### Solución:
```csharp
[Authorize(Roles = "Administrador,Docente")]  // ← Cambiar a esto
[HttpPut("actualizarMaterial")]
public async Task<IActionResult> ActualizarMaterial(MaterialActualizarDto dto) { ... }

[Authorize(Roles = "Administrador,Docente")]  // ← Cambiar a esto
[HttpDelete("eliminarMaterial/{id}")]
public async Task<IActionResult> EliminarMaterial(int id) { ... }
```

---

## ⚠️ 5. MensajeController - Ajuste de autorización

**Archivo:** `Controllers/MensajeController.cs`

### Cambios necesarios:
```csharp
// ANTES:
[Authorize(Policy = "EsDocente")]
[HttpPut("actualizarMensaje")]

[Authorize(Policy = "EsDocente")]
[HttpDelete("eliminarMensaje/{id}")]

// DESPUÉS:
[Authorize(Roles = "Administrador,Docente")]
[HttpPut("actualizarMensaje")]

[Authorize(Roles = "Administrador,Docente")]
[HttpDelete("eliminarMensaje/{id}")]
```

---

## ⚠️ 6. EvaluacionController - Ajuste de autorización

**Archivo:** `Controllers/EvaluacionController.cs`

### Cambios necesarios:
```csharp
// ANTES:
[Authorize(Policy = "EsDocente")]
[HttpGet("obtenerResultadosEvaluacion/{evaluacionId}")]

[Authorize(Policy = "EsDocente")]
[HttpPut("actualizarEvaluacion")]

[Authorize(Policy = "EsDocente")]
[HttpDelete("eliminarEvaluacion/{id}")]

// DESPUÉS:
[Authorize(Roles = "Administrador,Docente")]
[HttpGet("obtenerResultadosEvaluacion/{evaluacionId}")]

[Authorize(Roles = "Administrador,Docente")]
[HttpPut("actualizarEvaluacion")]

[Authorize(Roles = "Administrador,Docente")]
[HttpDelete("eliminarEvaluacion/{id}")]
```

---

## ⚠️ 7. ResultadoEvaluacionController - Ajuste de autorización

**Archivo:** `Controllers/ResultadoEvaluacionController.cs`

### Cambios necesarios:
```csharp
// ANTES:
[Authorize(Policy = "EsDocente")]
[HttpGet("obtenerResultadosPorEvaluacion/{evaluacionId}")]

[Authorize(Policy = "EsDocente")]
[HttpPut("actualizarResultado")]

[Authorize(Policy = "EsDocente")]
[HttpDelete("eliminarResultado/{id}")]

// DESPUÉS:
[Authorize(Roles = "Administrador,Docente")]
[HttpGet("obtenerResultadosPorEvaluacion/{evaluacionId}")]

[Authorize(Roles = "Administrador,Docente")]
[HttpPut("actualizarResultado")]

[Authorize(Roles = "Administrador,Docente")]
[HttpDelete("eliminarResultado/{id}")]
```

---

## 📊 RESUMEN DE CAMBIOS

| # | Controlador | Cambio Requerido | Prioridad |
|---|-------------|------------------|-----------|
| 1 | **CursoController** | Quitar `[Authorize(Policy = "EsAdmin")]` de la clase, ponerlo solo en métodos específicos | 🔴 ALTA |
| 2 | **CursoController** | Crear endpoint `obtenerCursosPorDocente/{docenteId}` + método en Service | 🔴 ALTA |
| 3 | **InscripcionController** | Quitar `[Authorize(Policy = "EsAdmin")]` de la clase, permitir que estudiantes vean sus inscripciones | 🔴 ALTA |
| 4 | **MaterialController** | Cambiar `EsDocente` → `Roles = "Administrador,Docente"` en PUT/DELETE | 🟡 MEDIA |
| 5 | **MensajeController** | Cambiar `EsDocente` → `Roles = "Administrador,Docente"` en PUT/DELETE | 🟡 MEDIA |
| 6 | **EvaluacionController** | Cambiar `EsDocente` → `Roles = "Administrador,Docente"` en GET resultados/PUT/DELETE | 🟡 MEDIA |
| 7 | **ResultadoEvaluacionController** | Cambiar `EsDocente` → `Roles = "Administrador,Docente"` en GET por evaluación/PUT/DELETE | 🟡 MEDIA |

---

## 🎯 ¿Por qué es importante?

Sin estos cambios:
1. ❌ **Docentes** no pueden ver sus cursos (reciben 403 Forbidden)
2. ❌ **Estudiantes** no pueden ver sus cursos inscritos (reciben 403 Forbidden)
3. ❌ **Admin** no puede actualizar/eliminar materiales, mensajes, evaluaciones (solo Docente puede actualmente)

---

## ✅ Lo que YA está bien implementado

- `MaterialController`: GET endpoints con `[Authorize]` general ✅
- `MensajeController`: GET endpoints con `[Authorize]` general ✅
- `EvaluacionController`: GET endpoints con `[Authorize]` general ✅
- `ResultadoEvaluacionController`: GET endpoints con `[Authorize]` general ✅
- Todos los POST de creación con `[Authorize(Roles = "Administrador,Docente")]` ✅

---

*Generado automáticamente - Sistema Académico Tantawawas*
