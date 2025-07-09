import React, { useState } from 'react';
import { Garment } from '../types';

interface GarmentCardProps {
  garment: Garment;
}

const GarmentCard: React.FC<GarmentCardProps> = ({ garment }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const displayImage = isHovered && garment.aiGeneratedImage ? garment.aiGeneratedImage : garment.originalImage;
  const imageSrc = displayImage.startsWith('http') ? displayImage : `data:image/jpeg;base64,${displayImage}`;


  return (
    <div 
      className="group animate-fade-in-up"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
        <div className="relative h-80 sm:h-96">
          <img
            src={imageSrc}
            alt={garment.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
          {garment.aiGeneratedImage && (
             <div className="absolute top-2 right-2 bg-brand-primary text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isHovered ? 'Vista IA' : ''}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-brand-dark truncate">{garment.title}</h3>
          <p className="text-brand-primary font-bold text-xl mt-1">${garment.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default GarmentCard;