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

                <!-- Mensaje de error -->
                <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                </div>

                <!-- Indicador de carga -->
                <div v-if="loading" class="loading-indicator">
                    Verificando credenciales...
                </div>

                <button type="submit" :disabled="loading">Iniciar Sesión</button>
            </form>

            <p>No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
    </div>
</template>

<script>
import "@/assets/css/login.css"
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        const router = useRouter()
        return { router }
    },
    data() {
        return {
            usuario: "",
            password: "",
            errorMessage: "",
            loading: false
        }
    },
    methods: {
        async login() {
            this.errorMessage = ""
            this.loading = true

            try {
                const response = await axios.post('http://localhost/SISE/backend/api/login.php', {
                    usuario: this.usuario,
                    password: this.password
                })

                if (response.data.success) {
                    // Guardar datos del usuario en localStorage
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    localStorage.setItem('authToken', Date.now()) // Token simple para validación
                    
                    // Redirigir al dashboard
                    this.router.push('/dashboard')
                } else {
                    this.errorMessage = response.data.message || "Error durante el inicio de sesión"
                }
            } catch (error) {
                if (error.response) {
                    // Error con respuesta del servidor
                    this.errorMessage = error.response.data.message || "Credenciales inválidas"
                } else {
                    // Error de conexión u otro problema
                    this.errorMessage = "Error de conexión al servidor"
                    console.error("Error:", error)
                }
            } finally {
                this.loading = false
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

.loading-indicator {
    text-align: center;
    margin-bottom: 15px;
    color: var(--primary-color);
}
</style>