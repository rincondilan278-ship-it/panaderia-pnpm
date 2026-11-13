
import axios from 'axios';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com';

// GET: consultar publicaciones
export async function fetchPosts(): Promise<Post[]> {
  console.log('🔄 Consultando posts de la API...');

  const response = await axios.get<Post[]>(
    `${API_URL}/posts?_limit=10`
  );

  console.log('✅ Posts recibidos:', response.data.length);

  return response.data;
}

// POST: crear publicación
export async function createPost(title: string): Promise<Post> {
  console.log('📤 Creando publicación:', title);

  const response = await axios.post<Post>(
    `${API_URL}/posts`,
    {
      title,
      body: 'Contenido de prueba',
      userId: 1,
    }
  );

  console.log('✅ POST exitoso:', response.data);

  return response.data;
}

// DELETE: eliminar publicación
export async function deletePost(id: number): Promise<void> {
  console.log('🗑️ Eliminando publicación:', id);

  await axios.delete(`${API_URL}/posts/${id}`);

  console.log('✅ DELETE exitoso');
}
