import React from 'react';
import { motion } from 'framer-motion';
import { Box, Code2, GitBranch, Cpu, ArrowRight, ArrowLeft, FileText } from 'lucide-react';

// Tarjeta Estilo "Pilar Vertical"
const Card = ({ title, description, icon: Icon, color, onClick, delay }) => (
  <motion.div
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ delay, duration: 0.5, type: "spring", stiffness: 60 }}
    style={{ originY: 1 }}
    onClick={onClick}
    // FORZAMOS h-full para que ocupe toda la altura del contenedor padre
    className="group relative w-full h-full bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
  >
    {/* Fondo de color al hover */}
    <div className={`absolute inset-0 bg-${color}-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
    
    {/* Borde superior */}
    <div className={`absolute top-0 left-0 w-full h-2 bg-${color}-500`} />

    {/* Contenido Superior */}
    <div className="relative z-10 flex flex-col items-center pt-6">
      <div className={`p-4 rounded-2xl bg-gray-50 text-${color}-600 mb-6 group-hover:scale-110 group-hover:bg-white transition-all duration-300 border border-gray-100 shadow-sm`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className={`text-xl font-bold text-slate-900 text-center mb-3 group-hover:text-${color}-700 transition-colors uppercase tracking-tight`}>
        {title}
      </h3>
      
      <p className="text-slate-500 text-center text-sm leading-relaxed opacity-80 group-hover:opacity-100">
        {description}
      </p>
    </div>

    {/* Flecha Inferior */}
    <div className="relative z-10 w-full flex justify-center pt-6 opacity-40 group-hover:opacity-100 transition-opacity">
      <ArrowRight className={`text-${color}-600 group-hover:translate-y-1 transition-transform`} size={24} />
    </div>
  </motion.div>
);

// Recibimos las props correctas: fileName, onSelectParadigm, onBack
export default function ParadigmSelector({ fileName, onSelectParadigm, onBack }) {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />

      {/* Botón Volver */}
      <button onClick={onBack} className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-slate-600 hover:text-slate-900 hover:border-gray-400 transition-all shadow-sm">
        <ArrowLeft size={18} />
        <span className="font-medium text-sm">Volver al Mapa</span>
      </button>

      <div className="w-full max-w-[1600px] h-full flex flex-col z-10">
        
        {/* Header con Nombre del Archivo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm mb-4">
            <FileText size={16} className="text-blue-500"/>
            <span className="font-mono text-slate-700 font-bold text-sm">{fileName || "Archivo Seleccionado"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Selecciona el Paradigma
          </h1>
        </motion.div>

        {/* CONTENEDOR DE GRILLA ALTA */}
        <div className="flex-1 w-full h-[65vh]"> {/* Altura fija para forzar pilares */}
          <div className="grid grid-cols-4 gap-6 w-full h-full">
            <Card 
              title="Estructurada" 
              description="Control de flujo imperativo."
              icon={Code2} 
              color="blue" 
              onClick={() => onSelectParadigm('estructurada')} 
              delay={0.1}
            />
            <Card 
              title="Orientada a Objetos" 
              description="Encapsulamiento y estado."
              icon={Box} 
              color="purple" 
              onClick={() => onSelectParadigm('objetos')}
              delay={0.2}
            />
            <Card 
              title="Funcional" 
              description="Inmutabilidad pura."
              icon={GitBranch} 
              color="emerald" 
              onClick={() => onSelectParadigm('funcional')}
              delay={0.3}
            />
            <Card 
              title="Lógica" 
              description="Hechos y reglas."
              icon={Cpu} 
              color="rose" 
              onClick={() => onSelectParadigm('logica')}
              delay={0.4}
            />
          </div>
        </div>

      </div>
    </div>
  );
}