import React, { useState } from 'react';
import { StoreIcon, WardrobeIcon, PremiumIcon, MenuIcon, XIcon } from './icons';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: 'store' | 'wardrobe' | 'premium') => void;
}

const NavLink: React.FC<{
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ isActive, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-all duration-300 ${
      isActive
        ? 'bg-brand-primary text-white shadow-lg'
        : 'text-brand-dark hover:bg-brand-primary/10'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (view: 'store' | 'wardrobe' | 'premium') => {
    setActiveView(view);
    setIsMenuOpen(false); // Close menu on navigation
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-light/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-secondary">
            Papaupa
          </h1>
          <span className="text-xs bg-brand-primary text-white px-2 py-0.5 rounded-full font-bold">Store</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2 bg-white p-2 rounded-full shadow-md">
           <button onClick={() => handleLinkClick('store')} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${activeView === 'store' ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-dark hover:bg-brand-primary/10'}`}>
                <StoreIcon className="h-5 w-5" />
                <span className="font-medium">Tienda</span>
            </button>
             <button onClick={() => handleLinkClick('wardrobe')} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${activeView === 'wardrobe' ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-dark hover:bg-brand-primary/10'}`}>
                <WardrobeIcon className="h-5 w-5" />
                <span className="font-medium">Mi Armario</span>
            </button>
             <button onClick={() => handleLinkClick('premium')} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${activeView === 'premium' ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-dark hover:bg-brand-primary/10'}`}>
                <PremiumIcon className="h-5 w-5" />
                <span className="font-medium">Premium</span>
            </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-brand-dark">
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg mx-4 mb-4 rounded-lg p-4 animate-fade-in-up" style={{animationDuration: '300ms'}}>
            <div className="flex flex-col space-y-2">
                <NavLink
                    isActive={activeView === 'store'}
                    onClick={() => handleLinkClick('store')}
                    icon={<StoreIcon className="h-5 w-5" />}
                    label="Tienda"
                />
                <NavLink
                    isActive={activeView === 'wardrobe'}
                    onClick={() => handleLinkClick('wardrobe')}
                    icon={<WardrobeIcon className="h-5 w-5" />}
                    label="Mi Armario"
                />
                <NavLink
                    isActive={activeView === 'premium'}
                    onClick={() => handleLinkClick('premium')}
                    icon={<PremiumIcon className="h-5 w-5" />}
                    label="Premium"
                />
            </div>
        </nav>
      )}
    </header>
  );
};

export default Header;