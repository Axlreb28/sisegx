<template>
    <div class="configuracion-container">
      <div class="card">
        <div class="card-header">
          <h3>Configuración del Sistema</h3>
        </div>
        <div class="card-body">
          <p class="welcome-message">Bienvenido al módulo de Configuración</p>
          <p>Desde aquí podrás administrar las configuraciones del sistema.</p>
          
          <div class="config-sections">
            <div class="config-item">
              <div class="config-icon">
                <i class="fas fa-user-cog"></i>
              </div>
              <div class="config-details">
                <h4>Usuarios</h4>
                <p>Administrar Usuarios</p>
                <div class="toggle-switch">
                  <input type="checkbox" id="user-profiles" checked>
                  <label for="user-profiles"></label>
                </div>
              </div>
            </div>
            
            <div class="config-item">
              <div class="config-icon">
                <i class="fas fa-database"></i>
              </div>
              <div class="config-details">
                <h4>Roles</h4>
                <p>Administrar roles y acciones</p>
                <div class="toggle-switch">
                  <input type="checkbox" id="data-backup">
                  <label for="data-backup"></label>
                </div>
              </div>
            </div>
            
            <div class="config-item">
              <div class="config-icon">
                <i class="fas fa-palette"></i>
              </div>
              <div class="config-details">
                <h4>Unidades</h4>
                <p>Gestion de unidades</p>
                <div class="toggle-switch">
                  <input type="checkbox" id="interface-theme">
                  <label for="interface-theme"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Configuracion'
  }
  </script>
  
  <style scoped>
  .configuracion-container {
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
  
  .config-sections {
    margin-top: 20px;
  }
  
  .config-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    background-color: rgba(177, 22, 35, 0.05);
    margin-bottom: 15px;
    transition: var(--transition);
  }
  
  .config-item:hover {
    background-color: rgba(177, 22, 35, 0.1);
  }
  
  .config-icon {
    width: 50px;
    height: 50px;
    background-color: var(--white-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    color: var(--primary-color);
    font-size: 20px;
  }
  
  .config-details {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .config-details h4 {
    margin: 0 0 5px 0;
    color: var(--secondary-color);
    font-size: 16px;
  }
  
  .config-details p {
    margin: 0;
    color: var(--light-color);
    font-size: 14px;
  }
  
  .toggle-switch {
    position: relative;
    width: 50px;
    height: 24px;
    margin-left: 20px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-switch label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }
  
  .toggle-switch label:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  .toggle-switch input:checked + label {
    background-color: var(--primary-color);
  }
  
  .toggle-switch input:checked + label:before {
    transform: translateX(26px);
  }
  </style>