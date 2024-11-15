<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container">
        <!-- Logo y Nombre del Sitio -->
        <router-link class="navbar-brand fw-bold" to="/">
          CUBOS
        </router-link>
  
        <!-- Botón de Menú Móvil -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Menú de Navegación -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" :class="{ active: isActive('/') }">
              <router-link class="nav-link fw-semibold" to="/">
                Home
              </router-link>
            </li>
  
            <!-- Menú desplegable para opciones adicionales -->
            <li class="nav-item dropdown" :class="{ active: isActive('/marca') }">
              <a
                class="nav-link dropdown-toggle fw-semibold"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Marcas
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li v-for="marca in marcas" :key="marca">
                  <router-link class="dropdown-item" :to="`/marca/${marca}`">{{ marca }}</router-link>
                </li>
              </ul>
            </li>
  
            <!-- Opciones según estado de sesión -->
            <li class="nav-item dropdown" v-if="isLogged" :class="{ active: isActive('/seguridad') }">
              <a
                class="nav-link dropdown-toggle fw-semibold"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Seguridad
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <button class="nav-link text-dark fw-semibold" @click="logOut">
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </li>
  
            <li class="nav-item dropdown" v-if="isLogged" :class="{ active: isActive('/usuario') }">
              <a
                class="nav-link dropdown-toggle fw-semibold"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Usuario
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="nav-link text-dark fw-semibold" to="/login">
                    Perfil
                  </router-link>
                </li>
                <li>
                  <router-link class="nav-link text-dark fw-semibold" to="/compras">
                    Compras
                  </router-link>
                </li>
                <li>
                  <router-link class="nav-link text-dark fw-semibold" to="/pedido">
                    Realizar pedido
                  </router-link>
                </li>
              </ul>
            </li>
  
            <li class="nav-item dropdown" v-else :class="{ active: isActive('/seguridad') }">
              <a
                class="nav-link dropdown-toggle fw-semibold"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Seguridad
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="nav-link text-dark fw-semibold" to="/login">
                    Iniciar sesión
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
    import CubosService from '@/services/CubosService';

    var cubosService = new CubosService();
  
  export default {
    name: 'MenuComponent',
    data() {
      return {
        marcas: [],
      };
    },
    computed: {
      isLogged() {
        return cubosService.isLogged();
      },
    },
    methods: {
      isActive(route) {
        return this.$route.path === route;
      },
      logOut() {
        // Eliminar el token de acceso
        localStorage.removeItem('access_token');
        // Redirigir a login
        this.$router.push('/login');
      },
    },
    mounted() {
        cubosService.getMarcas().then(response => {
          this.marcas = response.data;
        })
        .catch((error) => {
          console.error('Error fetching marcas:', error);
        });
    },
    updated(){
        cubosService.getMarcas().then(response => {
          this.marcas = response.data;
        })
        .catch((error) => {
          console.error('Error fetching marcas:', error);
        });
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales para personalizar la apariencia */
  </style>
  