<template>
    <div v-if="cubo">
      <div class="container mt-3">
        <div class="card">
          <img :src="cubo.imagen" :alt="'Imagen del cubo ' + cubo.nombre" class="card-img-top" />
          <div class="card-content">
            <h3>{{ cubo.nombre }} - {{ cubo.marca }}</h3>
            <p><strong>Modelo:</strong> {{ cubo.modelo }}</p>
            <p><strong>Color:</strong> {{ cubo.color }}</p>
            <p class="price"><strong>Precio:</strong> {{ cubo.precio}}</p>
            <p class="rating"><strong>Valoración:</strong> {{ cubo.valoracion }}</p>
            <div class="card-footer text-center">
              <router-link to="/home" class="btn btn-outline-primary btn-sm">Volver</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Cargando...</p>
    </div>
    <div class="container mt-5">
        <h2>Comentarios: </h2>
        <br>
        <div v-for="comentario in comentarios" :key="comentario">
            <h3>{{ comentario.comentario }}</h3>
            <hr>
        </div>
    </div>
  </template>
  
  <script>
import CubosService from '@/services/CubosService';

  var cubosService = new CubosService()
  
  
  export default {
    data() {
      return {
        cubo: {
          idCubo: 0,
          nombre: "",
          modelo: "",
          marca: "",
          color: "",
          imagen: "",
          precio: 0,
          valoracion: 0
        },
        comentarios: []
      };
    },
    mounted() {
      const id = this.$route.params.id;
      this.getCubo(id);
      this.getComentarios(id)
    },
    methods: {
      getCubo(id) {
        cubosService.getCubo(id).then(response => {
            this.cubo = response.data
        })
      },
      getComentarios(id) {
        cubosService.getComentarios(id).then(response => {
            this.comentarios = response.data
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    width: 300px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: transform 0.3s;
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  
  .card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-content {
    padding: 20px;
  }
  
  .card-content h3 {
    margin: 0;
    color: #333;
    font-size: 1.4em;
    font-weight: bold;
  }
  
  .card-content p {
    margin: 5px 0;
    color: #666;
  }
  
  .price {
    color: #2c7a7b;
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .rating {
    color: #ffa500;
  }
  </style>
  