# 🚀 TantaWawa - Frontend React + TypeScript

Sistema Académico - Frontend construido con React, TypeScript, Vite y Tailwind CSS.

## 📋 Características

- ✅ **React 18** con TypeScript
- ✅ **Vite** para desarrollo rápido
- ✅ **TailwindCSS** para estilos
- ✅ **React Router v6** para rutas
- ✅ **TanStack Query** para manejo de estado del servidor
- ✅ **Axios** para peticiones HTTP
- ✅ **React Hook Form** + **Zod** para formularios
- ✅ **Autenticación JWT** con cookies HttpOnly
- ✅ **Rutas protegidas** por rol

## 🏗️ Arquitectura

```
frontend/
├── src/
│   ├── api/              # Configuración Axios
│   ├── components/       # Componentes reutilizables
│   │   ├── common/      # Botones, Inputs, Cards, etc.
│   │   ├── layout/      # Navbar, Sidebar, Layout
│   │   └── forms/       # Formularios específicos
│   ├── contexts/        # React Context (Auth)
│   ├── hooks/           # Custom hooks (useUsuarios, useCursos, etc.)
│   ├── pages/           # Páginas por rol
│   │   ├── admin/
│   │   ├── docente/
│   │   └── estudiante/
│   ├── routes/          # Configuración de rutas
│   ├── services/        # Servicios API
│   ├── types/           # TypeScript types
│   └── utils/           # Utilidades
```

## 🚀 Instalación

1. **Clonar e instalar dependencias:**

```bash
cd frontend
npm install
```

2. **Configurar variables de entorno:**

Crear archivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

3. **Iniciar el servidor de desarrollo:**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 👥 Usuarios de Prueba

| Rol | CI | Password |
|-----|------|----------|
| **Administrador** | 12345670 | admin123 |
| **Docente** | 12345671 | docente123 |
| **Estudiante** | 12345672 | alumno123 |

## 📚 Estructura de Roles

### 🔴 Administrador
- Gestión de usuarios
- Gestión de cursos
- Gestión de inscripciones
- Acceso total al sistema

### 🔵 Docente
- Ver sus cursos asignados
- Gestionar materiales de curso
- Publicar mensajes
- Crear y gestionar evaluaciones
- Registrar notas

### 🟢 Estudiante
- Ver sus cursos inscritos
- Acceder a materiales
- Ver mensajes del curso
- Ver sus evaluaciones y notas

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

## 🌐 Integración con API

El frontend se comunica con el backend .NET a través de:

- **Axios** con interceptors para manejo de tokens
- **TanStack Query** para cache y sincronización
- **JWT** almacenado en localStorage
- **Cookies HttpOnly** para seguridad adicional

### Ejemplo de uso:

```typescript
// Hook para obtener cursos
const { data: cursos, isLoading } = useCursos();

// Hook para crear un curso
const { mutate: crearCurso } = useCrearCurso();

crearCurso({
  nombre: "Nuevo Curso",
  descripcion: "Descripción",
  docenteId: 1
});
```

## 🎨 Componentes Principales

### Button
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

### Input
```tsx
<Input
  label="Email"
  type="email"
  error={errors.email?.message}
  {...register("email")}
/>
```

### Card
```tsx
<Card title="Mi Card">
  Contenido aquí
</Card>
```

## 🔒 Autenticación

El sistema usa Context API para manejar la autenticación:

```typescript
const { user, login, logout, isAuthenticated, hasRole } = useAuth();

// Login
await login({ carnetIdentidad: 12345670, password: "admin123" });

// Logout
await logout();

// Verificar rol
if (hasRole('Administrador')) {
  // Solo admins
}
```

## 🛣️ Rutas Protegidas

Las rutas están protegidas por autenticación y rol:

```typescript
// Solo usuarios autenticados
<Route element={<PrivateRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>

// Solo admin
<Route element={<RoleRoute allowedRoles={['Administrador']} />}>
  <Route path="/admin/usuarios" element={<Usuarios />} />
</Route>
```

## 📦 Dependencias Principales

```json
{
  "react": "^18.3.1",
  "react-router-dom": "^6.x",
  "@tanstack/react-query": "^5.x",
  "axios": "^1.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "tailwindcss": "^3.x"
}
```

---

**Desarrollado con ❤️ usando React + TypeScript + Vite**
