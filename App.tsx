
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Store from './components/Store';
import Wardrobe from './components/Wardrobe';
import PremiumPlans from './components/PremiumPlans';
import { Garment, Category } from './types';
import { INITIAL_GARMENTS } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'store' | 'wardrobe' | 'premium'>('store');
  const [garments, setGarments] = useState<Garment[]>(INITIAL_GARMENTS);
  const [userGarments, setUserGarments] = useState<Garment[]>([]);

  const addGarment = useCallback((newGarmentData: Omit<Garment, 'id' | 'category'>) => {
    // In a real app, category would be set by the user. We'll default to 'All' or derive it.
    // Here we'll just set a default for simplicity
    const newGarment: Garment = {
      ...newGarmentData,
      id: Date.now(), // simple unique id
      category: Category.Chaquetas, // default category
    };
    
    // Add to both lists for this demo
    setGarments(prev => [newGarment, ...prev]);
    setUserGarments(prev => [newGarment, ...prev]);
    
    // Switch to store view to see the new item
    setActiveView('store');
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'store':
        return <Store garments={garments} />;
      case 'wardrobe':
        return <Wardrobe userGarments={userGarments} addGarment={addGarment} />;
      case 'premium':
        return <PremiumPlans />;
      default:
        return <Store garments={garments} />;
    }
  };

  return (
    <div className="bg-brand-light font-sans text-brand-dark min-h-screen">
      <Header activeView={activeView} setActiveView={setActiveView} />
      {renderContent()}
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Papaupa Store. Revolucionando la moda circular.</p>
      </footer>
    </div>
  );
};

export default App;
