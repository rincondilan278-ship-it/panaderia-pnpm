
import { Item } from '../types';

export const MOCK_ITEMS: Item[] = [
  {
    id: '1',
    name: 'Pan artesanal',
    description: 'Pan recién horneado con corteza crujiente.',
    price: 3500,
    category: 'Panes',
    image: 'https://placehold.co/400x300/DEB887/FFFFFF?text=Pan',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Croissant',
    description: 'Croissant de mantequilla suave y dorado.',
    price: 4500,
    category: 'Pastelería',
    image: 'https://placehold.co/400x300/F4C27A/FFFFFF?text=Croissant',
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Torta de chocolate',
    description: 'Torta esponjosa cubierta de chocolate.',
    price: 6500,
    category: 'Tortas',
    image: 'https://placehold.co/400x300/704214/FFFFFF?text=Torta',
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Buñuelos',
    description: 'Buñuelos tradicionales recién preparados.',
    price: 2000,
    category: 'Tradicionales',
    image: 'https://placehold.co/400x300/D2A679/FFFFFF?text=Bunuelos',
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Galletas',
    description: 'Galletas dulces con trozos de chocolate.',
    price: 3000,
    category: 'Galletas',
    image: 'https://placehold.co/400x300/C49A6C/FFFFFF?text=Galletas',
    isFavorite: true,
  },
];
