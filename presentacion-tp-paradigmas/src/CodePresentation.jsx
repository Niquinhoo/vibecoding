import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Check, ArrowLeft } from 'lucide-react';

export default function CodePresentation({ data, onBack }) {
  const [activeStep, setActiveStep] = useState(0);
  const { titulo, pasos, color } = data;

  // Mapa de colores para usar clases de Tailwind dinámicamente
  const colorMap = {
    blue: "text-blue-600 border-blue-500/30 bg-blue-50",
    purple: "text-purple-600 border-purple-500/30 bg-purple-50",
    emerald: "text-emerald-600 border-emerald-500/30 bg-emerald-50",
    rose: "text-rose-600 border-rose-500/30 bg-rose-50",
  };
  
  const themeClass = colorMap[color] || colorMap.blue;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Header con botón Volver */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse bg-${color}-500`} />
            <span className={`font-mono tracking-widest text-xs uppercase font-bold text-${color}-600`}>
              {titulo}
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto pt-24">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="w-full lg:w-1/2 px-6 lg:px-12 pb-40">
          {pasos.map((paso, index) => (
            <motion.div
              key={paso.id}
              initial={{ opacity: 0.2 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-50% 0px -50% 0px" }}
              onViewportEnter={() => setActiveStep(index)}
              className={`min-h-screen flex flex-col justify-center py-20 border-l border-gray-100 pl-8 transition-colors duration-500`}
            >
              <span className={`font-mono text-xs tracking-widest mb-4 block w-fit px-2 py-1 rounded ${themeClass}`}>
                PASO 0{index + 1}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">
                {paso.titulo}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-light">
                {paso.descripcion}
              </p>
            </motion.div>
          ))}
        </div>

        {/* COLUMNA DERECHA */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen sticky top-0 lg:top-0 flex items-center justify-center p-6 bg-white lg:bg-transparent z-40">
          <div className="w-full max-w-xl bg-gray-50 rounded-xl border border-gray-200 shadow-2xl overflow-hidden relative">
            <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="w-3 h-3 rounded-full bg-gray-200" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Command size={12} />
                <span>code.editor</span>
              </div>
            </div>

            <div className="p-6 md:p-8 font-mono text-sm relative min-h-[300px]">
              <div className="pl-2 whitespace-pre-wrap leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Renderizado simple del código */}
                    {pasos[activeStep].codigo}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}