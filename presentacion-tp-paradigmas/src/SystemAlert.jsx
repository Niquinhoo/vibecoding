import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

export default function SystemAlert({ isOpen, onClose, title, message }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Fondo Oscuro con Blur (Backdrop) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
          />

          {/* La Ventana del Mensaje */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Línea de color decorativa arriba */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />

            <div className="p-6">
              <div className="flex gap-5">
                
                {/* Ícono */}
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                    <Info size={24} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Contenido de Texto */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {message}
                  </p>
                </div>
              </div>

              {/* Footer con Botón */}
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  Entendido
                </button>
              </div>
            </div>
            
            {/* Botón X discreto en la esquina */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors p-1"
            >
              <X size={20} />
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}