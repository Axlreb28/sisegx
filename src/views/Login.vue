<template>
    <div class="login-page">
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
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

.login-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #292c37;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.login-container {
    width: 100%;
    max-width: 500px;
    background-color: #1f1f1f;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
    color: #ffffff;
    margin: 0 20px; /* Añade márgenes en dispositivos pequeños */
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #ffffff;
    font-size: 24px;
}

h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #b11623;
}

.input-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-size: 14px;
    color: #cccccc;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #2c2c2c;
    color: #ffffff;
    transition: border-color 0.3s ease;
}

input:focus {
    outline: none;
    border-color: #b11623;
}

button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    background-color: #b11623;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #9f111b;
}

p {
    text-align: center;
    margin-top: 20px;
    color: #cccccc;
}

a {
    color: #b11623;
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: #ffffff;
    text-decoration: underline;
}

/* Responsive design */
@media (max-width: 600px) {
    .login-container {
        padding: 20px;
        margin: 0 10px;
    }

    h1 {
        font-size: 20px;
    }
}
</style>