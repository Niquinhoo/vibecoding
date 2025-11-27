import React from 'react';
import { motion } from 'framer-motion';
import { Box, Code2, GitBranch, Cpu, ArrowRight } from 'lucide-react';

const Card = ({ title, description, icon: Icon, color, onClick, delay }) => {
  // Mapeo de colores usando clases completas de Tailwind
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'bg-blue-500',
      text: 'text-blue-600',
      hover: 'group-hover:text-blue-700',
      line: 'group-hover:bg-blue-300',
      arrow: 'text-blue-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'bg-purple-500',
      text: 'text-purple-600',
      hover: 'group-hover:text-purple-700',
      line: 'group-hover:bg-purple-300',
      arrow: 'text-purple-600'
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'bg-emerald-500',
      text: 'text-emerald-600',
      hover: 'group-hover:text-emerald-700',
      line: 'group-hover:bg-emerald-300',
      arrow: 'text-emerald-600'
    },
    rose: {
      bg: 'bg-rose-50',
      border: 'bg-rose-500',
      text: 'text-rose-600',
      hover: 'group-hover:text-rose-700',
      line: 'group-hover:bg-rose-300',
      arrow: 'text-rose-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay, duration: 0.8, type: "spring", stiffness: 50 }}
      style={{ originY: 1 }}
      onClick={onClick}
      className="group relative w-full aspect-[4/3] bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      {/* Fondo de color */}
      <div className={`absolute inset-0 ${colors.bg} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
      
      {/* Borde superior */}
      <div className={`absolute top-0 left-0 w-full h-2 ${colors.border}`} />

      {/* Contenido Superior */}
      <div className="relative z-10 flex flex-col items-center pt-4">
        <div className={`p-3 rounded-full bg-gray-50 ${colors.text} mb-4 group-hover:scale-110 group-hover:bg-white transition-all duration-300 border border-gray-100`}>
          <Icon size={28} strokeWidth={1.5} />
        </div>
        
        <h3 className={`text-xl font-bold text-slate-900 text-center mb-2 ${colors.hover} transition-colors uppercase tracking-tight`}>
          {title}
        </h3>
        
        {/* Línea decorativa */}
        <div className={`w-6 h-1 bg-gray-200 rounded-full mb-4 ${colors.line} transition-colors`} />
        
        {/* Descripción */}
        <p className="text-slate-500 text-center text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 px-2">
          {description}
        </p>
      </div>

      {/* Contenido Inferior */}
      <div className="relative z-10 w-full flex justify-center pb-2 opacity-50 group-hover:opacity-100 transition-opacity">
        <div className={colors.arrow}>
          <ArrowRight size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center py-12 px-4 relative">
      
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none" />

      <div className="w-full max-w-5xl z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-2">
            PARADIGMAS
          </h1>
          <p className="text-slate-400 font-mono text-xs tracking-[0.3em] uppercase">
            Selecciona un pilar de arquitectura
          </p>
        </motion.div>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <br />
          <Card 
            title="Estructurada" 
            description="Secuencia lógica y flujo controlado."
            icon={Code2} 
            color="blue" 
            onClick={() => onNavigate('estructurada')}
            delay={0.1}
          />
          <br />
          <Card 
            title="Objetos" 
            description="Abstracción del mundo real."
            icon={Box} 
            color="purple" 
            onClick={() => onNavigate('objetos')}
            delay={0.2}
          />
          <br />
          <Card 
            title="Funcional" 
            description="Matemática pura e inmutabilidad."
            icon={GitBranch} 
            color="emerald" 
            onClick={() => onNavigate('funcional')}
            delay={0.3}
          />
          <br />
          <Card 
            title="Lógica" 
            description="Hechos, reglas y deducciones."
            icon={Cpu} 
            color="rose" 
            onClick={() => onNavigate('logica')}
            delay={0.4}
          />
          <br />
        </div>

      </div>
    </div>
  );
}