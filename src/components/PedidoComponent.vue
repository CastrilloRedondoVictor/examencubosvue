<template>
    <div class="container mt-5">
      <form @submit.prevent="onSubmit" class="p-4 border rounded shadow-sm bg-light">
        
        <!-- Campo de Cubo -->
        <div class="form-group">
          <label for="cubo" class="font-weight-bold">Cubo</label>
          <select
            id="cubo"
            class="form-control"
            v-model="cubo"
            required
          >
            <option v-for="cub in cubos" :key="cub.idCubo" :value="cub.idCubo">
              {{ cub.nombre }}
            </option>
          </select>
        </div>
  
        <!-- Botón de Compra -->
        <div class="d-flex justify-content-between mt-4">
          <button type="submit" class="btn btn-primary">
            Comprar cubo
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import CubosService from '@/services/CubosService';
  var cubosService = new CubosService()
  
  export default {
    data() {
      return {
        cubos: [],
        cubo: 1
      };
    },
    methods: {
      async getCubos() {
        try {
          const response = await cubosService.getCubos();
          this.cubos = response.data;
        } catch (error) {
          console.error('Error al obtener los cubos:', error);
        }
      },
      async onSubmit() {
        try {
          await cubosService.postPedido(this.cubo);
          this.$router.push('/compras');
        } catch (error) {
          console.error('Error al realizar el pedido:', error);
        }
      }
    },
    created() {
      this.getCubos();
    }
  };
  </script>