
import { Garment, Category } from './types';

export const CATEGORIES: Category[] = [
    Category.All,
    Category.Camisas,
    Category.Chaquetas,
    Category.Pantalones,
    Category.Zapatos,
    Category.Accesorios
];

export const INITIAL_GARMENTS: Garment[] = [
  {
    id: 1,
    title: 'Chaqueta de Cuero Vintage',
    description: 'Chaqueta de cuero genuino, estilo motociclista. Perfecta para un look audaz.',
    price: 75.00,
    originalImage: 'https://picsum.photos/seed/leatherjacket/600/800',
    aiGeneratedImage: 'https://picsum.photos/seed/aigirl1/600/800',
    tags: ['cuero', 'chaqueta', 'vintage', 'motociclista'],
    category: Category.Chaquetas,
  },
  {
    id: 2,
    title: 'Camisa de Lino Fresca',
    description: 'Camisa de lino blanca, ideal para climas cálidos. Elegante y cómoda.',
    price: 30.00,
    originalImage: 'https://picsum.photos/seed/linenshirt/600/800',
    aiGeneratedImage: 'https://picsum.photos/seed/aiguy2/600/800',
    tags: ['lino', 'camisa', 'blanco', 'verano'],
    category: Category.Camisas,
  },
  {
    id: 3,
    title: 'Pantalones Cargo Modernos',
    description: 'Pantalones estilo cargo con múltiples bolsillos, color beige. Resistentes y funcionales.',
    price: 45.00,
    originalImage: 'https://picsum.photos/seed/cargopants/600/800',
    aiGeneratedImage: 'https://picsum.photos/seed/aiguy3/600/800',
    tags: ['cargo', 'pantalones', 'beige', 'utilitario'],
    category: Category.Pantalones,
  },
   {
    id: 4,
    title: 'Zapatos Deportivos Retro',
    description: 'Zapatos deportivos con un diseño inspirado en los años 90. Cómodos y con estilo.',
    price: 60.00,
    originalImage: 'https://picsum.photos/seed/retrosneakers/600/800',
    aiGeneratedImage: 'https://picsum.photos/seed/aiguy4/600/800',
    tags: ['zapatos', 'deportivo', 'retro', '90s'],
    category: Category.Zapatos,
  },
  {
    id: 5,
    title: 'Bolso de Mano Elegante',
    description: 'Un bolso de mano de cuero sintético negro, perfecto para cualquier ocasión.',
    price: 35.00,
    originalImage: 'https://picsum.photos/seed/handbag/600/800',
    aiGeneratedImage: 'https://picsum.photos/seed/aigirl5/600/800',
    tags: ['bolso', 'accesorio', 'cuero sintético', 'elegante'],
    category: Category.Accesorios,
  },
  {
    id: 6,
    title: 'Chaqueta Denim Clásica',
    description: 'Chaqueta de mezclilla azul, un básico indispensable en cualquier armario.',
    price: 50.00,
    originalImage: 'https://picsum.photos/seed/denimjacket/600/800',
    aiGeneratedImage: 'https://picsum.photos/seed/aigirl6/600/800',
    tags: ['chaqueta', 'denim', 'mezclilla', 'clásico'],
    category: Category.Chaquetas,
  },
];
