<template>
    <div class="login-container">
      <h1>Sistema de seguimiento de trámites municipales</h1>
      <h2>Iniciar Sesión</h2>
      
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" placeholder="Ingresa tu correo" required>
        </div>
  
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" placeholder="Ingresa tu contraseña" required>
        </div>
  
        <button type="submit">Iniciar Sesión</button>
      </form>
  
      <p>No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        password: ""
      };
    },
    methods: {
      login() {
        console.log("Intentando iniciar sesión con:", this.email, this.password);
        // Aquí puedes agregar la lógica para enviar los datos al backend
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #292c37;
    margin: 0;
    padding: 0;
  }
  
  .login-container {
    width: 500px;
    margin: 50px auto;
    background-color: #cccccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease-in-out;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 5px;
    margin-top: 100px;
    color: #cccccc;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 14px;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    font-size: 16px;
    border: 1px solid #000000;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #cccccc;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #b11623;
    color: #cccccc;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #9f111b;
  }
  
  p {
    text-align: center;
  }
  
  a {
    color: #b11623;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  