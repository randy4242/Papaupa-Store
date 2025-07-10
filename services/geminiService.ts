import { AiGeneratedDetails } from '../types';

// Se ha eliminado la dependencia de la API de Google para permitir el despliegue
// del frontend sin necesidad de una API_KEY. Las funciones ahora están simuladas.

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

export const generateItemDetailsFromImage = async (imageBase64: string, mimeType: string): Promise<AiGeneratedDetails> => {
    console.log("Simulating AI details generation for:", { mimeType });
    
    // Simula un retraso de red para mantener la experiencia de usuario
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Devuelve datos de ejemplo
    const mockDetails: AiGeneratedDetails = {
        title: "Prenda Asombrosa (Simulado)",
        description: "Esta es una descripción simulada, generada para demostrar la funcionalidad. La prenda parece ser de alta calidad, ideal para un estilo casual y moderno.",
        keywords: ["simulado", "ia", "prenda", "moderno", "casual", "demostración"],
    };
    
    return mockDetails;
};


export const generateAiModelImage = async (imageBase64: string, mimeType: string): Promise<string> => {
    console.log("Simulating AI model image generation for:", { mimeType });

    // Simula un retraso de red
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Devuelve una URL de imagen de marcador de posición aleatoria.
    // Esto hace que la simulación se sienta más dinámica.
    return `https://picsum.photos/seed/aimodel${Math.random()}/600/800`;
};
