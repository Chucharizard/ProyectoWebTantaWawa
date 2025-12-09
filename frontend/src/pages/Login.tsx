import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { ROLES } from '../types/rol.types';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [carnetIdentidad, setCarnetIdentidad] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({
        carnetIdentidad: parseInt(carnetIdentidad),
        password,
      });

      // Get user role and redirect accordingly
      const user = authService.getCurrentUser();
      if (user) {
        switch (user.rol) {
          case ROLES.ADMINISTRADOR:
            navigate('/admin/dashboard');
            break;
          case ROLES.DOCENTE:
            navigate('/docente/dashboard');
            break;
          case ROLES.ESTUDIANTE:
            navigate('/estudiante/dashboard');
            break;
          default:
            navigate('/');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TantaWawa</h1>
          <p className="text-gray-600">Sistema Académico</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Carnet de Identidad"
            type="number"
            value={carnetIdentidad}
            onChange={(e) => setCarnetIdentidad(e.target.value)}
            placeholder="Ingrese su CI"
            required
          />

          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="font-semibold mb-2">Usuarios de prueba:</p>
          <div className="space-y-1">
            <p>Admin: 12345670 / admin123</p>
            <p>Docente: 12345671 / docente123</p>
            <p>Estudiante: 12345672 / alumno123</p>
          </div>
        </div>
      </div>
    </div>
  );
};
