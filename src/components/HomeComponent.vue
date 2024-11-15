<template>
    <div class="container mt-4">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div v-for="cubo in cubos" :key="cubo.id" class="col">
          <div class="card h-100 shadow-sm">
            <img
              :src="cubo.imagen"
              :alt="'Imagen del cubo ' + cubo.nombre"
              class="card-img-top"
              style="height: 200px; object-fit: cover;"
            />
            <div class="card-body">
              <h5 class="card-title">{{ cubo.nombre }}</h5>
              <p class="price text-muted"><strong>Precio:</strong> {{ cubo.precio}}</p>
            </div>
            <div class="card-footer text-center">
              <router-link
                class="btn btn-outline-primary btn-sm"
                :to="'/cubo/' + cubo.idCubo"
              >
                Detalles
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CubosService from '../services/CubosService';

  var cubosService = new CubosService()
  
  export default {
    data() {
      return {
        cubos: [],
      };
    },
    mounted() {
      this.getCubos();
    },
    methods: {
      async getCubos() {
        try {
          const response = await cubosService.getCubos();
          this.cubos = response.data;
        } catch (error) {
          console.error('Error al obtener cubos:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    margin-bottom: 20px;
  }
  
  .card-body {
    text-align: center;
  }
  
  .card-footer {
    background-color: #f8f9fa;
  }
  </style>
  