import React, { useState, useMemo } from 'react';
import { Garment, Category } from '../types';
import { CATEGORIES } from '../constants';
import GarmentCard from './GarmentCard';

interface StoreProps {
  garments: Garment[];
}

const Store: React.FC<StoreProps> = ({ garments }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.All);

  const filteredGarments = useMemo(() => {
    if (activeCategory === Category.All) {
      return garments;
    }
    return garments.filter(g => g.category === activeCategory);
  }, [garments, activeCategory]);

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-secondary">Explora Estilos Únicos</h2>
        <p className="text-lg text-gray-600 mt-2">Encuentra tesoros de segunda mano y dale una nueva vida a la moda.</p>
      </div>

      <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="bg-white p-2 rounded-full shadow-lg flex flex-wrap justify-center gap-1">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-colors duration-300 text-sm sm:text-base ${
                activeCategory === category
                  ? 'bg-brand-secondary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {filteredGarments.map((garment, index) => (
          <div key={garment.id} style={{ animationDelay: `${index * 100 + 400}ms` }}>
            <GarmentCard garment={garment} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Store;