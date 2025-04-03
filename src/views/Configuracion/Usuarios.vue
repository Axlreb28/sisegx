<template>
    <div class="usuarios-container">
      <div class="card">
        <div class="card-header">
          <h3>Gestión de Usuarios</h3>
        </div>
        <div class="card-body">
          <p class="welcome-message">Administración de Usuarios del Sistema</p>
          <p>Desde aquí podrás crear, editar y eliminar usuarios.</p>
          
          <div class="usuarios-list">
            <div class="list-header">
              <div>Nombre</div>
              <div>Correo</div>
              <div>Rol</div>
              <div>Acciones</div>
            </div>
            
            <!-- Lista de usuarios (ejemplo) -->
            <div class="usuario-item">
              <div class="usuario-info">
                <p>Juan Pérez</p>
              </div>
              <div class="usuario-info">
                <p>juan.perez@example.com</p>
              </div>
              <div class="usuario-info">
                <p>Administrador</p>
              </div>
              <div class="usuario-actions">
                <button class="action-btn edit"><font-awesome-icon :icon="['fas', 'edit']" /></button>
                <button class="action-btn delete"><font-awesome-icon :icon="['fas', 'trash']" /></button>
              </div>
            </div>
            
            <div class="usuario-item">
              <div class="usuario-info">
                <p>María González</p>
              </div>
              <div class="usuario-info">
                <p>maria.gonzalez@example.com</p>
              </div>
              <div class="usuario-info">
                <p>Editor</p>
              </div>
              <div class="usuario-actions">
                <button class="action-btn edit"><font-awesome-icon :icon="['fas', 'edit']" /></button>
                <button class="action-btn delete"><font-awesome-icon :icon="['fas', 'trash']" /></button>
              </div>
            </div>
            
            <div class="usuario-item">
              <div class="usuario-info">
                <p>Carlos Rodríguez</p>
              </div>
              <div class="usuario-info">
                <p>carlos.rodriguez@example.com</p>
              </div>
              <div class="usuario-info">
                <p>Usuario</p>
              </div>
              <div class="usuario-actions">
                <button class="action-btn edit"><font-awesome-icon :icon="['fas', 'edit']" /></button>
                <button class="action-btn delete"><font-awesome-icon :icon="['fas', 'trash']" /></button>
              </div>
            </div>
          </div>
          
          <div class="actions-container">
            <button class="btn-primary"><font-awesome-icon :icon="['fas', 'plus']" /> Nuevo Usuario</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Usuarios'
  }
  </script>
  
  <style scoped>
  .usuarios-container {
    padding: 20px;
  }
  
  .card {
    background-color: var(--white-color);
    border-radius: 8px;
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  
  .card-header {
    padding: 20px;
    background-color: var(--white-color);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .card-header h3 {
    margin: 0;
    color: var(--secondary-color);
    font-size: 18px;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .welcome-message {
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-color);
    margin-bottom: 10px;
  }
  
  .usuarios-list {
    margin-top: 20px;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--white-color);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }
  
  .list-header {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr 0.5fr;
    background-color: rgba(177, 22, 35, 0.1);
    padding: 15px;
    font-weight: 600;
    color: var(--secondary-color);
  }
  
  .usuario-item {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr 0.5fr;
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: var(--transition);
  }
  
  .usuario-item:hover {
    background-color: rgba(177, 22, 35, 0.05);
  }
  
  .usuario-info p {
    margin: 0;
    color: var(--secondary-color);
  }
  
  .usuario-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .action-btn {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .action-btn.edit {
    background-color: #f0ad4e;
    color: white;
  }
  
  .action-btn.delete {
    background-color: #d9534f;
    color: white;
  }
  
  .action-btn:hover {
    opacity: 0.8;
  }
  
  .actions-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  
  .btn-primary {
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .btn-primary:hover {
    background-color: var(--secondary-color);
  }
  </style>