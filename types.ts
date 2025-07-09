
export interface Garment {
  id: number;
  title: string;
  description: string;
  price: number;
  originalImage: string;
  aiGeneratedImage: string | null;
  tags: string[];
  category: Category;
}

export enum Category {
  All = "Todo",
  Camisas = "Camisas",
  Chaquetas = "Chaquetas",
  Pantalones = "Pantalones",
  Zapatos = "Zapatos",
  Accesorios = "Accesorios",
}

export interface AiGeneratedDetails {
    title: string;
    description: string;
    keywords: string[];
}
