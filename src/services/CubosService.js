
import axios from 'axios';

const apiCubos = 'https://apitiendacubos2024a.azurewebsites.net/';

export default class CubosService {

  

  constructor() {}
  // Método de login
  login(email, password) {
    const request = 'api/Manage/Login';
    return axios.post(apiCubos + request, { email, password });
  }

  // Método de registro
  register(nombre, email, pass) {
    const request = 'api/Manage/RegistroUsuario';
    return axios.post(apiCubos + request, { idUsuario: 0, nombre, email, pass });
  }

  // Obtener el token
  getToken() {
    return localStorage.getItem('access_token');
  }

  // Verificar si el usuario está logueado
  isLogged() {
    return !!localStorage.getItem('access_token');
  }

  // Obtener todos los cubos
  getCubos() {
    const request = 'api/Cubos';
    return axios.get(apiCubos + request);
  }

  // Obtener un cubo por su ID
  getCubo(id) {
    const request = `api/Cubos/${id}`;
    return axios.get(apiCubos + request);
  }

  // Obtener el perfil del usuario
  getPerfil() {
    const request = 'api/Manage/PerfilUsuario';
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return axios.get(apiCubos + request, { headers });
  }

  // Obtener todas las marcas
  getMarcas() {
    const request = 'api/Cubos/Marcas';
    return axios.get(apiCubos + request);
  }

  // Obtener cubos por marca
  getCubosMarca(marca) {
    const request = `api/Cubos/CubosMarca/${marca}`;
    return axios.get(apiCubos + request);
  }

  // Obtener compras del usuario
  getCompras() {
    const request = 'api/Compra/ComprasUsuario';
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return axios.get(apiCubos + request, { headers });
  }

  // Realizar un pedido
  postPedido(idCubo) {
    const request = `api/Compra/InsertarPedido/${idCubo}`;
    const token = this.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.post(apiCubos + request, {}, { headers });
  }



  getComentarios(idCubo) {
    const request = `api/ComentariosCubo/GetComentariosCubo/${idCubo}`;

    return axios.get(apiCubos + request)
  }
}
