import React from 'react';
import { SparkleIcon } from './icons';

const PlanFeature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-center space-x-3">
    <svg className="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
    <span className="text-gray-600">{children}</span>
  </li>
);

const PremiumPlans: React.FC = () => {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 animate-fade-in-up">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-4 text-4xl lg:text-5xl font-serif font-bold text-brand-secondary">Planes Premium Inteligentes</h2>
        <p className="mb-5 font-light text-gray-500 sm:text-xl">Desbloquea todo el potencial de la IA para maximizar tus ventas y personalizar tu tienda.</p>
      </div>
      <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
        {/* Plan Básico */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow-md">
          <h3 className="mb-4 text-2xl font-semibold">Básico</h3>
          <p className="font-light text-gray-500 sm:text-lg">Perfecto para empezar a vender.</p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-4xl sm:text-5xl font-extrabold">$0</span>
            <span className="text-gray-500">/mes</span>
          </div>
          <ul role="list" className="mb-8 space-y-4 text-left">
            <PlanFeature>Publicaciones ilimitadas</PlanFeature>
            <PlanFeature>Comisión del 15% por venta</PlanFeature>
            <PlanFeature>5 Generaciones IA por mes</PlanFeature>
            <li className="flex items-center space-x-3 text-gray-400">
               <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
               <span>Personalización de armario</span>
            </li>
          </ul>
          <button className="bg-brand-primary/20 text-brand-primary font-bold rounded-lg text-sm px-5 py-2.5 text-center">Plan Actual</button>
        </div>
        
        {/* Plan Vendedor Pro */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border-2 border-brand-primary shadow-2xl lg:transform lg:scale-105">
           <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">Más Popular</span>
            </div>
          <h3 className="mb-4 text-2xl font-semibold">Vendedor Pro</h3>
          <p className="font-light text-gray-500 sm:text-lg">Para vendedores serios que buscan crecer.</p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-4xl sm:text-5xl font-extrabold">$12</span>
            <span className="text-gray-500">/mes</span>
          </div>
          <ul role="list" className="mb-8 space-y-4 text-left">
             <PlanFeature>Publicaciones ilimitadas</PlanFeature>
            <PlanFeature>Comisión reducida del 10%</PlanFeature>
            <PlanFeature>50 Generaciones IA por mes</PlanFeature>
            <PlanFeature>Personalización básica del armario</PlanFeature>
            <PlanFeature>Mayor visibilidad en búsquedas</PlanFeature>
          </ul>
          <button className="bg-brand-primary hover:bg-opacity-90 text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center transition-colors">Empezar</button>
        </div>

        {/* Plan Boutique */}
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow-md">
          <h3 className="mb-4 text-2xl font-semibold">Boutique</h3>
          <p className="font-light text-gray-500 sm:text-lg">La experiencia definitiva para marcas y tiendas.</p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-4xl sm:text-5xl font-extrabold">$29</span>
            <span className="text-gray-500">/mes</span>
          </div>
          <ul role="list" className="mb-8 space-y-4 text-left">
            <PlanFeature>Publicaciones ilimitadas</PlanFeature>
            <PlanFeature>Comisión más baja del 5%</PlanFeature>
            <PlanFeature>Generaciones IA ilimitadas</PlanFeature>
            <PlanFeature>Personalización avanzada del armario</PlanFeature>
            <PlanFeature>Máxima visibilidad y promociones</PlanFeature>
            <PlanFeature>Análisis de tendencias con IA</PlanFeature>
          </ul>
          <button className="bg-brand-secondary hover:bg-opacity-90 text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center transition-colors">Contactar</button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;