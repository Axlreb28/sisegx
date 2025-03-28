<script>
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
            password: ""
        }
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost/SISE/backend/api/login.php', {
                    usuario: this.usuario,
                    password: this.password
                })

                if (response.data.success) {
                    // Guardar información de usuario en localStorage o Pinia
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    
                    // Redirigir al dashboard o página principal
                    this.router.push('/dashboard')
                }
            } catch (error) {
                // Manejar errores de inicio de sesión
                console.error('Error de inicio de sesión:', error.response.data.message)
                // Mostrar mensaje de error al usuario
            }
        }
    }
}
</script>