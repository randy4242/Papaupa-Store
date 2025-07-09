import React, { useState, useCallback } from 'react';
import { Garment, Category, AiGeneratedDetails } from '../types';
import { generateItemDetailsFromImage, generateAiModelImage, fileToBase64 } from '../services/geminiService';
import { PlusIcon, SparkleIcon } from './icons';

interface WardrobeProps {
  userGarments: Garment[];
  addGarment: (garment: Omit<Garment, 'id' | 'category'>) => void;
}

const Spinner = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

const Wardrobe: React.FC<WardrobeProps> = ({ userGarments, addGarment }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [aiGeneratedImage, setAiGeneratedImage] = useState<string | null>(null);
  
  const [isGeneratingDetails, setIsGeneratingDetails] = useState(false);
  const [isGeneratingModel, setIsGeneratingModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setOriginalImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        resetAiFields();
      };
      reader.readAsDataURL(file);
    }
  };

  const resetAiFields = () => {
    setTitle('');
    setDescription('');
    setTags([]);
    setAiGeneratedImage(null);
    setError(null);
  };
  
  const handleGenerateDetails = useCallback(async () => {
    if (!originalImageFile) {
        setError("Por favor, sube una imagen primero.");
        return;
    }
    setIsGeneratingDetails(true);
    setIsGeneratingModel(true);
    setError(null);
    
    try {
        const base64 = await fileToBase64(originalImageFile);
        
        const detailsPromise = generateItemDetailsFromImage(base64, originalImageFile.type);
        const modelImagePromise = generateAiModelImage(base64, originalImageFile.type);

        const [details, modelImage] = await Promise.all([detailsPromise, modelImagePromise]);
        
        setTitle(details.title);
        setDescription(details.description);
        setTags(details.keywords);
        setIsGeneratingDetails(false);

        setAiGeneratedImage(modelImage);
        setIsGeneratingModel(false);

    } catch (e) {
        setError(e instanceof Error ? e.message : "Ocurrió un error desconocido.");
        setIsGeneratingDetails(false);
        setIsGeneratingModel(false);
    }
  }, [originalImageFile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && price && originalImage) {
      addGarment({
        title,
        description,
        price: parseFloat(price),
        tags,
        originalImage,
        aiGeneratedImage,
      });
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setTags([]);
      setOriginalImage(null);
      setOriginalImageFile(null);
      setAiGeneratedImage(null);
      setError(null);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 animate-fade-in-up">
      <div className="bg-brand-dark rounded-2xl shadow-2xl p-6 md:p-12 text-white transform transition-all duration-500 min-h-[600px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Side */}
          <div className="lg:animate-none">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Vende tu Prenda</h2>
            <p className="text-gray-300 mb-6">Usa el poder de la IA para vender más rápido.</p>
            
            <div className="relative h-64 w-full bg-gray-700 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-500">
                {originalImage ? (
                    <img src={originalImage} alt="Prenda subida" className="h-full w-full object-contain rounded-lg p-1"/>
                ) : (
                    <span className="text-gray-400">Sube una foto de tu artículo</span>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>

            <button
                onClick={handleGenerateDetails}
                disabled={!originalImage || isGeneratingDetails || isGeneratingModel}
                className="w-full bg-brand-primary hover:bg-opacity-90 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300 mb-4"
            >
                {isGeneratingDetails ? <Spinner/> : <SparkleIcon className="h-5 w-5" />}
                <span>Generar Detalles con IA</span>
            </button>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Título del artículo" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"></textarea>
              <input type="number" placeholder="Precio ($)" value={price} onChange={e => setPrice(e.target.value)} required className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <span key={i} className="bg-gray-600 text-xs px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300">
                <PlusIcon className="h-5 w-5" />
                <span>Añadir al Armario</span>
              </button>
            </form>
          </div>
          
          {/* AI Visualization Side */}
          <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-6 md:p-8 lg:animate-none" style={{animationDelay: '300ms'}}>
            <h3 className="text-2xl font-serif font-bold text-center mb-4">Visualización con IA</h3>
             <p className="text-gray-400 text-center mb-6">Así podría verse tu prenda en nuestra tienda.</p>
            <div className="w-full aspect-[3/4] bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                {isGeneratingModel ? (
                    <div className="flex flex-col items-center text-white">
                        <Spinner />
                        <span className="mt-2 text-sm">Creando modelo virtual...</span>
                    </div>
                ) : aiGeneratedImage ? (
                    <img src={`data:image/jpeg;base64,${aiGeneratedImage}`} alt="Modelo IA" className="h-full w-full object-cover rounded-lg"/>
                ) : (
                    <div className="text-center text-gray-500 p-4">
                        <SparkleIcon className="h-12 w-12 mx-auto mb-2"/>
                        <span>La imagen generada por IA aparecerá aquí.</span>
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">La imagen generada se adjuntará a tu publicación para que los compradores puedan ver cómo queda la prenda.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wardrobe;