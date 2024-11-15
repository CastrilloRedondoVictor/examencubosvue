<template>
    <div class="container p-5 my-5">
      <div v-if="isLogged && perfil">
        <div class="container mt-4">
          <h1 class="mb-4">Tus Compras</h1>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-primary">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ perfil.nombre }}</td>
                  <td>{{ perfil.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div class="row">
            <div class="col">
              <router-link to="/compras" class="btn btn-primary w-100">Mostrar compras</router-link>
            </div>
          </div>
        </div>
      </div>
  
      <div v-else>
        <h1 class="text-center text-primary mb-4">Iniciar Sesión</h1>
  
        <!-- Formulario de Login -->
        <form @submit.prevent="onLogin" class="p-4 border rounded shadow-sm bg-light">
          <!-- Campo de Email -->
          <div class="form-group">
            <label for="email" class="font-weight-bold">Email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              v-model="email"
              placeholder="Ingresa tu email"
              required
            />
          </div>
  
          <!-- Campo de Contraseña -->
          <div class="form-group">
            <label for="password" class="font-weight-bold">Contraseña</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
  
          <!-- Mensaje de Error -->
          <div v-if="errorMessage" class="text-danger mt-2">
            <small>{{ errorMessage }}</small>
          </div>
  
          <!-- Botón de Login -->
          <div class="d-flex justify-content-between mt-4">
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import CubosService from '@/services/CubosService';

  var cubosService = new CubosService()
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: '',
        perfil: null
      };
    },
    computed: {
      isLogged() {
        return cubosService.isLogged(); // Si usas Vuex para almacenar si el usuario está autenticado
      }
    },
    methods: {
      async onLogin() {
        try {
          const response = await cubosService.login(this.email, this.password);
          localStorage.setItem('access_token', response.data.response);
          this.$router.push('/');
        } catch (error) {
          this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
        }
      },
      async getPerfil() {
        try {
          const response = await cubosService.getPerfil();
          this.perfil = response.data;
        } catch (error) {
          console.error(error);
        }
      }
    },
    async mounted() {
      if (this.isLogged) {
        await this.getPerfil();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aquí puedes agregar tus estilos personalizados */
  </style>
  