<template>
  <aside class="sidebar">
    <div class="branding">
      <h1 class="logo">SISEG</h1>
      <p class="tagline">Sistema de Trámites</p>
    </div>
    
    <div class="user-info">
      <div class="avatar">A</div>
      <div class="user-details">
        <p class="user-name">Admin</p>
        <p class="user-role">Administrador</p>
      </div>
    </div>
    
    <nav class="navigation">
      <ul>
        <li v-for="item in menuItems" :key="item.name" 
            :class="{ active: isActive(item.path) }" 
            @click="navigateTo(item.path)">
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </nav>
    
    <div class="logout-container">
      <button class="logout-button" @click="handleLogout">
        <i class="fas fa-sign-out-alt"></i> Cerrar sesión
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      menuItems: [
        { name: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-line', path: '/dashboard' },
        { name: 'tramites', label: 'Trámites', icon: 'fas fa-file-alt', path: '/tramites' },
        { name: 'gestiones', label: 'Gestiones', icon: 'fas fa-list', path: '/gestiones' },
        { name: 'reportes', label: 'Reportes', icon: 'fas fa-file-contract', path: '/reportes' },
        { name: 'configuracion', label: 'Configuración', icon: 'fas fa-cog', path: '/configuracion' }
      ]
    }
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    handleLogout() {
      // Limpiar datos de sesión
      localStorage.removeItem('user');
      // Redirigir a la página de login
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* Los estilos del sidebar se mantienen igual que en tu código original */
.sidebar {
  width: 260px;
  height: 100%;
  background-color: var(--white-color);
  box-shadow: var(--shadow);
  padding: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.branding {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.tagline {
  font-size: 14px;
  color: var(--secondary-color);
  font-weight: 300;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--white-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 15px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: var(--secondary-color);
  margin-bottom: 2px;
}

.user-role {
  font-size: 12px;
  color: var(--light-color);
}

.navigation {
  flex: 1;
  padding: 20px 0;
}

.navigation ul {
  list-style: none;
}

.navigation li {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--secondary-color);
  transition: var(--transition);
  margin-bottom: 5px;
  border-left: 3px solid transparent;
}

.navigation li:hover {
  background-color: rgba(177, 22, 35, 0.05);
  color: var(--primary-color);
}

.navigation li.active {
  background-color: rgba(177, 22, 35, 0.1);
  color: var(--primary-color);
  border-left: 3px solid var(--primary-color);
  font-weight: 500;
}

.navigation li i {
  margin-right: 15px;
  font-size: 18px;
  width: 20px;
  text-align: center;
}

.logout-container {
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.logout-button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: rgba(177, 22, 35, 0.1);
  color: var(--primary-color);
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-button:hover {
  background-color: var(--primary-color);
  color: var(--white-color);
}

.logout-button i {
  margin-right: 10px;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
  }
  
  .navigation li {
    padding: 10px 15px;
  }
}
</style>