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
import "@/assets/login.css"
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