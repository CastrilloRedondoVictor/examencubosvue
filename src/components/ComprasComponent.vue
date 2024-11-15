<template>
    <div class="container mt-4">
      <h1 class="mb-4">Tus Compras</h1>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="table-primary">
            <tr>
              <th scope="col"># Pedido</th>
              <th scope="col">ID Cubo</th>
              <th scope="col">Fecha del Pedido</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="compra in compras" :key="compra.idPedido">
              <td>{{ compra.idPedido }}</td>
              <td>{{ compra.idCubo }}</td>
              <td>{{ compra.fechaPedido }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="row">
        <div class="col">
          <router-link to="/login" class="btn btn-primary w-100">Volver al perfil</router-link>
        </div>
        <div class="col">
          <router-link to="/pedido" class="btn btn-primary w-100">Realizar pedido</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CubosService from '@/services/CubosService'; // Asegúrate de importar el servicio correcto
  var cubosService = new CubosService()
  
  export default {
    data() {
      return {
        compras: []
      };
    },
    methods: {
      async getCompras() {
        try {
          const response = await cubosService.getCompras();
          this.compras = response.data; // Asumiendo que la respuesta es un array de compras
        } catch (error) {
          console.error('Error al obtener las compras:', error);
        }
      }
    },
    created() {
      this.getCompras(); // Se llama al obtener las compras cuando el componente se crea
    }
  };
  </script>
  
  <style scoped>
  /* Puedes agregar tus estilos personalizados aquí */
  </style>
  