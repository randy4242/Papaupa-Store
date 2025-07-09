
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AiGeneratedDetails } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

export const generateItemDetailsFromImage = async (imageBase64: string, mimeType: string): Promise<AiGeneratedDetails> => {
    try {
        const imagePart = {
            inlineData: {
                mimeType,
                data: imageBase64,
            },
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { 
                parts: [
                    imagePart,
                    { text: "Analiza esta imagen de una prenda de vestir. Genera un título atractivo, una descripción detallada (mencionando estilo, material y ocasión de uso) y una lista de 5-7 palabras clave y sinónimos relevantes en español para mejorar la búsqueda. Responde únicamente en formato JSON." }
                ] 
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: "Título atractivo para la prenda." },
                        description: { type: Type.STRING, description: "Descripción detallada de la prenda." },
                        keywords: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "Lista de palabras clave y sinónimos."
                        },
                    },
                    required: ["title", "description", "keywords"]
                },
            },
        });
        
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as AiGeneratedDetails;

    } catch (error) {
        console.error("Error generating item details:", error);
        throw new Error("No se pudieron generar los detalles del artículo. Inténtalo de nuevo.");
    }
};


export const generateAiModelImage = async (imageBase64: string, mimeType: string): Promise<string> => {
    try {
        // This is a placeholder for sending image to model and getting image back.
        // For real implementation, you'd send the image to a model.
        // For now, we simulate by calling the image generation model with a text prompt.
        const imagePart = {
             inlineData: {
                mimeType,
                data: imageBase64,
            },
        };

        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: 'Genera una imagen fotorrealista de un modelo de moda (mujer u hombre, apropiado para la prenda) vistiendo esta prenda exacta. El modelo debe estar de pie sobre un fondo de estudio gris neutro y liso. Mantén con precisión el color, la textura y la forma de la prenda de la imagen original. La imagen debe ser un retrato de cuerpo entero o de tres cuartos.',
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '3:4',
            },
            // The following would be the ideal input if the model supported image-to-image with this fidelity
            // contents: { parts: [imagePart] } 
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("La API de imagen no devolvió ninguna imagen.");
        }
    } catch (error) {
        console.error("Error generating model image:", error);
        throw new Error("No se pudo generar la imagen del modelo. Inténtalo de nuevo.");
    }
};
