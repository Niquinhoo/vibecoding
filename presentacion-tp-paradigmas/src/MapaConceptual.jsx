import React, { useState } from 'react';
import { FileCode, Database, Cpu, Boxes, GitBranch, Terminal, Settings, FolderTree, ArrowRight } from 'lucide-react';

const FileNode = ({ name, icon: Icon, color, description, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`
      group relative px-4 py-3 rounded-lg border-2 transition-all duration-300 w-full md:w-auto z-10
      ${isActive 
        ? `${color} border-opacity-100 shadow-lg scale-105 ring-2 ring-offset-2 ring-blue-300` 
        : 'bg-white border-gray-200 hover:border-gray-400 hover:shadow-md'
      }
    `}
  >
    <div className="flex items-center gap-2">
      <Icon size={18} className={isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-900'} />
      <span className={`font-mono text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-800'}`}>
        {name}
      </span>
    </div>
    {isActive && description && (
      <p className="text-xs text-white mt-2 text-left opacity-90 hidden md:block">
        {description}
      </p>
    )}
  </button>
);

export default function MapaConceptual({ onSelectFile }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const archivos = {
    'index.js': { color: 'bg-blue-600', icon: Terminal, description: 'Punto de entrada. Orquesta todos los paradigmas.', paradigma: 'Estructurado', imports: ['Tarea.js', 'constantes.js', 'ManejoMenu.js', 'ManejoInput.js', 'ServiciosTarea.js', 'LogicaTareas.js'] },
    'Tarea.js': { color: 'bg-purple-600', icon: Boxes, description: 'Entidad principal (Modelo). Define estructura y métodos.', paradigma: 'Orientado a Objetos', imports: ['constantes.js'] },
    'ServiciosTarea.js': { color: 'bg-emerald-600', icon: GitBranch, description: 'Funciones puras. Transformaciones sin efectos secundarios.', paradigma: 'Funcional', imports: ['constantes.js'] },
    'LogicaTareas.js': { color: 'bg-rose-600', icon: Cpu, description: 'Reglas de negocio y predicados lógicos.', paradigma: 'Lógico', imports: ['constantes.js'] },
    'ManejoInput.js': { color: 'bg-amber-600', icon: Terminal, description: 'Captura y validación de datos de entrada.', paradigma: 'Estructurado', imports: ['constantes.js'] },
    'ManejoMenu.js': { color: 'bg-amber-600', icon: Terminal, description: 'Interfaz de usuario (CLI) y visualización.', paradigma: 'Estructurado', imports: ['Tarea.js', 'constantes.js'] },
    'constantes.js': { color: 'bg-slate-600', icon: Settings, description: 'Valores compartidos y configuración.', paradigma: 'Estructurado', imports: [] },
    'tareas.json': { color: 'bg-cyan-600', icon: Database, description: 'Persistencia de datos.', paradigma: 'Datos', imports: [] }
  };

  const paradigmas = {
    'Estructurado': { color: 'bg-blue-100 text-blue-800' },
    'Orientado a Objetos': { color: 'bg-purple-100 text-purple-800' },
    'Funcional': { color: 'bg-emerald-100 text-emerald-800' },
    'Lógico': { color: 'bg-rose-100 text-rose-800' },
    'Datos': { color: 'bg-cyan-100 text-cyan-800' }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pb-32 overflow-x-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 text-center relative z-20">
        <div className="inline-flex items-center gap-3 mb-2 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-200">
          <FolderTree className="text-blue-600" size={24} />
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Arquitectura del Sistema Final PDP Nolasco Triberti
          </h1>
        </div>
        <p className="text-slate-500 mt-4">Selecciona un archivo para ver sus detalles y paradigmas</p>
      </div>

      {/* Mapa Visual */}
      <div className="max-w-6xl mx-auto relative py-10">
        
        {/* CONECTORES SVG (Corregido) */}
        {/* Usamos viewBox 0 0 100 100 para que las coordenadas sean porcentajes relativos */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none -z-0 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
             {/* Del Centro Arriba (Index) hacia abajo */}
             <path d="M50 10 L50 30" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
             
             {/* Bifurcación a 3 ramas */}
             <path d="M50 30 L20 30 L20 40" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" fill="none" /> {/* Izq */}
             <path d="M50 30 L80 30 L80 40" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" fill="none" /> {/* Der */}
             <path d="M50 30 L50 40" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" /> {/* Centro */}

             {/* Hacia abajo (Base) */}
             <path d="M20 55 L20 70 L40 70" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" fill="none" />
             <path d="M50 55 L50 70" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
             <path d="M80 55 L80 70 L60 70" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" fill="none" />
        </svg>

        {/* Nivel 1: Index (Top) */}
        <div className="flex justify-center mb-16 relative z-10">
            <FileNode {...archivos['index.js']} name="index.js" onClick={() => setSelectedFile('index.js')} isActive={selectedFile === 'index.js'} />
        </div>

        {/* Nivel 2: Módulos Principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="flex flex-col items-center gap-4">
               <FileNode {...archivos['ManejoInput.js']} name="ManejoInput.js" onClick={() => setSelectedFile('ManejoInput.js')} isActive={selectedFile === 'ManejoInput.js'} />
               <FileNode {...archivos['ManejoMenu.js']} name="ManejoMenu.js" onClick={() => setSelectedFile('ManejoMenu.js')} isActive={selectedFile === 'ManejoMenu.js'} />
            </div>

            <div className="flex flex-col items-center gap-4">
               <FileNode {...archivos['LogicaTareas.js']} name="LogicaTareas.js" onClick={() => setSelectedFile('LogicaTareas.js')} isActive={selectedFile === 'LogicaTareas.js'} />
               <FileNode {...archivos['ServiciosTarea.js']} name="ServiciosTarea.js" onClick={() => setSelectedFile('ServiciosTarea.js')} isActive={selectedFile === 'ServiciosTarea.js'} />
            </div>

            <div className="flex flex-col items-center gap-4">
                <FileNode {...archivos['Tarea.js']} name="Tarea.js" onClick={() => setSelectedFile('Tarea.js')} isActive={selectedFile === 'Tarea.js'} />
            </div>
        </div>

        {/* Nivel 3: Base */}
        <div className="flex justify-center gap-8 pb-10">
           <FileNode {...archivos['constantes.js']} name="constantes.js" onClick={() => setSelectedFile('constantes.js')} isActive={selectedFile === 'constantes.js'} />
           <FileNode {...archivos['tareas.json']} name="tareas.json" onClick={() => setSelectedFile('tareas.json')} isActive={selectedFile === 'tareas.json'} />
        </div>

      </div>

      {/* PANEL FLOTANTE INFERIOR (Con botón de entrada) */}
      {selectedFile && (
        <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 w-full max-w-3xl pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-6 animate-bounce-in">
                
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${archivos[selectedFile].color} text-white shadow-lg`}>
                        {React.createElement(archivos[selectedFile].icon, { size: 24 })}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            {selectedFile}
                            <span className={`text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-mono uppercase`}>
                                {archivos[selectedFile].paradigma}
                            </span>
                        </h3>
                        <p className="text-slate-500 text-sm mt-1 max-w-md">
                            {archivos[selectedFile].description}
                        </p>
                    </div>
                </div>

                <button 
                   onClick={() => onSelectFile(selectedFile)}
                   className="whitespace-nowrap px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 group"
                >
                   Analizar Código
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

            </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-bounce-in {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}