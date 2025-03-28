<template>
    <div class="login-page">
        <div class="login-container">
            <h1>Sistema de seguimiento de trámites municipales</h1>
            <h2>Iniciar Sesión</h2>
            
            <form @submit.prevent="login">
                <div class="input-group">
                    <label for="usuario">Usuario</label>
                    <input 
                        type="text" 
                        id="usuario" 
                        v-model="usuario" 
                        placeholder="Ingresa tu usuario" 
                        required
                    >
                </div>
        
                <div class="input-group">
                    <label for="password">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        v-model="password" 
                        placeholder="Ingresa tu contraseña" 
                        required
                    >
                </div>

                <!-- Añadir mensaje de error -->
                <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                </div>
        
                <button type="submit">Iniciar Sesión</button>
            </form>
        
            <p>No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
    </div>
</template>
  
<script>
import "@/assets/css/login.css"
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        return { router }
    },
    data() {
        return {
            usuario: "",
            password: "",
            errorMessage: ""
        }
    },
    methods: {
        async login() {
            // Limpiar mensaje de error anterior
            this.errorMessage = ""

            try {
                const response = await axios.post('http://localhost/SISE/backend/api/login.php', {
                    usuario: this.usuario,
                    password: this.password
                })

                if (response.data.success) {
                    // Guardar información de usuario en localStorage
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    
                    // Redirigir al dashboard o página principal
                    this.router.push('/dashboard')
                }
            } catch (error) {
                // Manejar diferentes tipos de errores
                if (error.response) {
                    // El servidor respondió con un error
                    this.errorMessage = error.response.data.message || 'Error de inicio de sesión'
                } else if (error.request) {
                    // La solicitud se hizo pero no se recibió respuesta
                    this.errorMessage = 'No se pudo conectar con el servidor'
                } else {
                    // Otro tipo de error
                    this.errorMessage = 'Error inesperado'
                }
                console.error('Error de inicio de sesión:', error)
            }
        }
    }
}
</script>

<style scoped>
.error-message {
    color: #ff4444;
    background-color: rgba(255, 68, 68, 0.1);
    border: 1px solid #ff4444;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    text-align: center;
}
</style>