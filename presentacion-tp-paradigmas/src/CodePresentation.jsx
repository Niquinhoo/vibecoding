import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Check, Command, ArrowLeft } from 'lucide-react';

export default function CodePresentation({ data, onBack }) {
  const [activeStep, setActiveStep] = useState(0);

  // Aceptamos pasos con código y salida
  const pasos = data.pasos || [
    { id: 1, titulo: data.titulo, descripcion: data.descripcion, codigo: data.codigo || '// Sin código disponible' }
  ];

  const { titulo, color } = data;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900">
            <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-${color}-600 animate-pulse`} />
          <span className={`font-mono text-${color}-600 tracking-widest text-xs uppercase font-bold`}>
            {titulo || "Análisis"}
          </span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto pt-24">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="w-full lg:w-1/2 px-6 lg:px-12 pb-40">
          {pasos.map((paso, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.3 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-50% 0px -50% 0px" }}
              onViewportEnter={() => setActiveStep(index)}
              className="min-h-[80vh] flex flex-col justify-center border-l-2 border-gray-100 pl-8 transition-colors duration-500 hover:border-blue-500/30"
            >
              <span className={`font-mono text-${color}-600 text-xs tracking-widest mb-4 block bg-${color}-50 w-fit px-2 py-1 rounded border border-${color}-100`}>
                PASO 0{index + 1}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-slate-900 leading-tight">
                {paso.titulo}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-light">
                {paso.descripcion}
              </p>
            </motion.div>
          ))}
          <div className="h-[20vh]" />
        </div>

        {/* COLUMNA DERECHA: CÓDIGO + SALIDA */}
        <div className="hidden lg:flex w-1/2 h-screen sticky top-0 items-center justify-center p-6 bg-slate-50 border-l border-slate-100">
          
          <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            
            {/* TITULO */}
            <div className="bg-slate-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <div className="w-3 h-3 rounded-full bg-gray-300" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Command size={12} />
                <span>source_viewer.js</span>
              </div>
            </div>

            {/* EDITOR DE CÓDIGO */}
            <div className="p-6 font-mono text-sm overflow-y-auto bg-slate-900 text-slate-300 custom-scrollbar flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep + '-code'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <pre className="whitespace-pre-wrap break-words">
                    <code>{pasos[activeStep].codigo}</code>
                  </pre>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ---------- NUEVA SECCIÓN: SALIDA DE CONSOLA ---------- */}
            {pasos[activeStep].salida && (
              <div className="border-t border-gray-200 bg-black text-green-400 font-mono text-xs px-4 py-3 max-h-[30vh] overflow-y-auto">
                <div className="flex items-center gap-2 mb-2 text-green-300 uppercase tracking-widest">
                  <Terminal size={14} />
                  <span>Salida de Consola</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep + '-out'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                  >
                    <pre className="whitespace-pre-wrap break-words">
                      {pasos[activeStep].salida}
                    </pre>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
            {/* --------------------------------------------------------- */}

            {/* FOOTER */}
            <div className="bg-slate-50 border-t border-gray-200 px-4 py-2 flex justify-between items-center text-[10px] text-gray-400 font-mono uppercase tracking-wider shrink-0">
               <span>JavaScript / ES6</span>
               <span className="flex items-center gap-1 text-emerald-600 font-bold">
                 <Check size={10} /> Live View
               </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
