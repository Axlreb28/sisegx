// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost/SISE/backend/api/';

class AuthService {
  // Método para iniciar sesión
  async login(usuario, password) {
    try {
      const response = await axios.post(API_URL + 'login.php', { usuario, password });
      
      if (response.data.success) {
        // Guardar datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('authToken', Date.now());
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await axios.post(API_URL + 'logout.php');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Siempre eliminar datos locales incluso si hay error en el servidor
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  }

  // Verificar si hay un usuario autenticado
  isAuthenticated() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    return !!user && !!token && this.checkSessionValidity();
  }

  // Obtener datos del usuario actual
  getCurrentUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // Verificar si el usuario tiene un permiso específico
  hasPermission(permission) {
    const user = this.getCurrentUser();
    
    if (!user || !user.permisos) {
      return false;
    }
    
    return user.permisos.includes(permission);
  }

  // Verificar si el usuario pertenece a una unidad específica
  belongsToUnit(unitId) {
    const user = this.getCurrentUser();
    
    if (!user || !user.unidades) {
      return false;
    }
    
    return user.unidades.some(unit => unit.unidad_id === unitId);
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(rolId) {
    const user = this.getCurrentUser();
    
    if (!user || !user.rol) {
      return false;
    }
    
    return user.rol.id === rolId;
  }

  // Verificar si la sesión ha expirado
  checkSessionValidity() {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    // Sesión válida por 8 horas (ajustable según necesidades)
    const tokenTime = parseInt(token);
    const now = Date.now();
    const hoursPassed = (now - tokenTime) / (1000 * 60 * 60);
    
    return hoursPassed < 8;
  }
}

export default new AuthService();