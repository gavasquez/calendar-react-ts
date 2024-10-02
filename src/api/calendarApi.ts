import axios,{ AxiosRequestHeaders } from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

//* Configurar interceptores
calendarApi.interceptors.request.use( (config: any) => {

  const token = localStorage.getItem('token') || '';
  // Aquí puedes agregar código para modificar la configuración de la petición
  const headers: AxiosRequestHeaders = {
    ...config.headers,
    'x-token': token,
  };

  return { ...config, headers };
  
});

export default calendarApi;