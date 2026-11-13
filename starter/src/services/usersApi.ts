
import axios from 'axios';

// Estructura de los usuarios de la API
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

// Función que consulta los usuarios
export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  );

  return response.data;
}
