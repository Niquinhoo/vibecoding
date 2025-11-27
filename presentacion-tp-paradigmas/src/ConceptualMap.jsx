import React, { useState } from 'react';
import { FileCode, Database, Cpu, Boxes, GitBranch, Terminal, Settings, FolderTree } from 'lucide-react';

const FileNode = ({ name, icon: Icon, color, description, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`
      group relative px-4 py-3 rounded-lg border-2 transition-all duration-300
      ${isActive 
        ? `${color} border-opacity-100 shadow-lg scale-105` 
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
      <p className="text-xs text-white mt-2 text-left opacity-90">
        {description}
      </p>
    )}
  </button>
);

const Connection = ({ from, to, type = 'solid' }) => (
  <div className={`absolute h-0.5 ${type === 'dashed' ? 'border-t-2 border-dashed border-gray-300' : 'bg-gray-300'}`} 
       style={{
         width: '60px',
         top: '50%',
         left: '100%',
         transform: 'translateY(-50%)'
       }} 
  />
);

export default function MapaConceptual() {
  const [selectedFile, setSelectedFile] = useState(null);

  const archivos = {
    // CAPA DE ENTRADA
    'index.js': {
      color: 'bg-blue-600',
      icon: Terminal,
      description: 'Punto de entrada. Orquesta todos los paradigmas.',
      paradigma: 'Estructurado',
      imports: ['Tarea.js', 'constantes.js', 'ManejoMenu.js', 'ManejoInput.js', 'ServiciosTarea.js', 'LogicaTareas.js']
    },
    
    // PARADIGMA OOP
    'Tarea.js': {
      color: 'bg-purple-600',
      icon: Boxes,
      description: 'Entidad principal. Define la estructura y comportamiento de una tarea.',
      paradigma: 'Orientado a Objetos',
      imports: ['constantes.js']
    },
    
    // PARADIGMA FUNCIONAL
    'ServiciosTarea.js': {
      color: 'bg-emerald-600',
      icon: GitBranch,
      description: 'Funciones puras. Transformaciones inmutables usando HOF.',
      paradigma: 'Funcional',
      imports: ['constantes.js']
    },
    
    // PARADIGMA LÓGICO
    'LogicaTareas.js': {
      color: 'bg-rose-600',
      icon: Cpu,
      description: 'Predicados y reglas. Infiere relaciones entre tareas.',
      paradigma: 'Lógico',
      imports: ['constantes.js']
    },
    
    // I/O ESTRUCTURADO
    'ManejoInput.js': {
      color: 'bg-amber-600',
      icon: Terminal,
      description: 'Captura de datos del usuario mediante prompt-sync.',
      paradigma: 'Estructurado',
      imports: ['constantes.js']
    },
    
    'ManejoMenu.js': {
      color: 'bg-amber-600',
      icon: Terminal,
      description: 'Renderizado de menús y feedback visual.',
      paradigma: 'Estructurado',
      imports: ['Tarea.js', 'constantes.js']
    },
    
    // UTILIDADES
    'constantes.js': {
      color: 'bg-slate-600',
      icon: Settings,
      description: 'Constantes compartidas. Evita magic strings.',
      paradigma: 'Estructurado',
      imports: []
    },
    
    // PERSISTENCIA
    'tareas.json': {
      color: 'bg-cyan-600',
      icon: Database,
      description: 'Base de datos en JSON. Persistencia de tareas.',
      paradigma: 'Datos',
      imports: []
    }
  };

  const paradigmas = {
    'Estructurado': { color: 'bg-blue-100 text-blue-800', files: ['index.js', 'ManejoInput.js', 'ManejoMenu.js', 'constantes.js'] },
    'Orientado a Objetos': { color: 'bg-purple-100 text-purple-800', files: ['Tarea.js'] },
    'Funcional': { color: 'bg-emerald-100 text-emerald-800', files: ['ServiciosTarea.js'] },
    'Lógico': { color: 'bg-rose-100 text-rose-800', files: ['LogicaTareas.js'] },
    'Datos': { color: 'bg-cyan-100 text-cyan-800', files: ['tareas.json'] }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FolderTree className="text-slate-700" size={32} />
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Arquitectura Multi-Paradigma
          </h1>
        </div>
        <p className="text-slate-600 text-sm">
          Sistema de gestión de tareas integrando 4 paradigmas de programación
        </p>
      </div>

      {/* Leyenda de Paradigmas */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap gap-3">
        {Object.entries(paradigmas).map(([nombre, { color }]) => (
          <div key={nombre} className={`px-4 py-2 rounded-full ${color} text-sm font-semibold`}>
            {nombre}
          </div>
        ))}
      </div>

      {/* Mapa Conceptual */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        
        {/* CAPA 1: Punto de Entrada */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Punto de Entrada
          </h2>
          <div className="flex justify-center">
            <FileNode 
              name="index.js" 
              icon={archivos['index.js'].icon}
              color={archivos['index.js'].color}
              description={archivos['index.js'].description}
              onClick={() => setSelectedFile('index.js')}
              isActive={selectedFile === 'index.js'}
            />
          </div>
        </div>

        {/* Flecha hacia abajo */}
        <div className="flex justify-center mb-8">
          <div className="w-0.5 h-12 bg-gray-300" />
        </div>

        {/* CAPA 2: Paradigmas Principales */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Paradigmas Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* OOP */}
            <div className="flex flex-col items-center gap-4">
              <FileNode 
                name="Tarea.js" 
                icon={archivos['Tarea.js'].icon}
                color={archivos['Tarea.js'].color}
                description={archivos['Tarea.js'].description}
                onClick={() => setSelectedFile('Tarea.js')}
                isActive={selectedFile === 'Tarea.js'}
              />
              <span className="text-xs font-mono text-purple-600 font-semibold">OOP</span>
            </div>

            {/* Funcional */}
            <div className="flex flex-col items-center gap-4">
              <FileNode 
                name="ServiciosTarea.js" 
                icon={archivos['ServiciosTarea.js'].icon}
                color={archivos['ServiciosTarea.js'].color}
                description={archivos['ServiciosTarea.js'].description}
                onClick={() => setSelectedFile('ServiciosTarea.js')}
                isActive={selectedFile === 'ServiciosTarea.js'}
              />
              <span className="text-xs font-mono text-emerald-600 font-semibold">FUNCIONAL</span>
            </div>

            {/* Lógico */}
            <div className="flex flex-col items-center gap-4">
              <FileNode 
                name="LogicaTareas.js" 
                icon={archivos['LogicaTareas.js'].icon}
                color={archivos['LogicaTareas.js'].color}
                description={archivos['LogicaTareas.js'].description}
                onClick={() => setSelectedFile('LogicaTareas.js')}
                isActive={selectedFile === 'LogicaTareas.js'}
              />
              <span className="text-xs font-mono text-rose-600 font-semibold">LÓGICO</span>
            </div>
          </div>
        </div>

        {/* Flecha hacia abajo */}
        <div className="flex justify-center mb-8">
          <div className="w-0.5 h-12 bg-gray-300" />
        </div>

        {/* CAPA 3: I/O y Utilidades */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            Interfaz de Usuario (I/O)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <FileNode 
              name="ManejoInput.js" 
              icon={archivos['ManejoInput.js'].icon}
              color={archivos['ManejoInput.js'].color}
              description={archivos['ManejoInput.js'].description}
              onClick={() => setSelectedFile('ManejoInput.js')}
              isActive={selectedFile === 'ManejoInput.js'}
            />
            <FileNode 
              name="ManejoMenu.js" 
              icon={archivos['ManejoMenu.js'].icon}
              color={archivos['ManejoMenu.js'].color}
              description={archivos['ManejoMenu.js'].description}
              onClick={() => setSelectedFile('ManejoMenu.js')}
              isActive={selectedFile === 'ManejoMenu.js'}
            />
          </div>
        </div>

        {/* CAPA 4: Fundación */}
        <div>
          <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-500" />
            Fundación del Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <FileNode 
              name="constantes.js" 
              icon={archivos['constantes.js'].icon}
              color={archivos['constantes.js'].color}
              description={archivos['constantes.js'].description}
              onClick={() => setSelectedFile('constantes.js')}
              isActive={selectedFile === 'constantes.js'}
            />
            <FileNode 
              name="tareas.json" 
              icon={archivos['tareas.json'].icon}
              color={archivos['tareas.json'].color}
              description={archivos['tareas.json'].description}
              onClick={() => setSelectedFile('tareas.json')}
              isActive={selectedFile === 'tareas.json'}
            />
          </div>
        </div>
      </div>

      {/* Panel de Información */}
      {selectedFile && (
        <div className="max-w-7xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <FileCode size={24} className="text-blue-600" />
            {selectedFile}
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-semibold text-slate-600">Paradigma:</span>
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${paradigmas[archivos[selectedFile].paradigma]?.color || 'bg-gray-100 text-gray-800'}`}>
                {archivos[selectedFile].paradigma}
              </span>
            </div>
            <div>
              <span className="text-sm font-semibold text-slate-600">Descripción:</span>
              <p className="text-sm text-slate-700 mt-1">{archivos[selectedFile].description}</p>
            </div>
            {archivos[selectedFile].imports.length > 0 && (
              <div>
                <span className="text-sm font-semibold text-slate-600">Importa de:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {archivos[selectedFile].imports.map(imp => (
                    <button
                      key={imp}
                      onClick={() => setSelectedFile(imp)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-mono text-slate-700 transition-colors"
                    >
                      {imp}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Leyenda de Flujo */}
      <div className="max-w-7xl mx-auto mt-8 bg-slate-800 rounded-xl p-6 text-white">
        <h3 className="text-lg font-bold mb-4">🔄 Flujo de Datos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-blue-300">1. index.js</span> → Carga tareas.json y orquesta los paradigmas
          </div>
          <div>
            <span className="font-semibold text-purple-300">2. Tarea.js</span> → Define la estructura y comportamiento (OOP)
          </div>
          <div>
            <span className="font-semibold text-emerald-300">3. ServiciosTarea.js</span> → Transforma listas de forma pura (Funcional)
          </div>
          <div>
            <span className="font-semibold text-rose-300">4. LogicaTareas.js</span> → Infiere relaciones mediante predicados (Lógico)
          </div>
          <div>
            <span className="font-semibold text-amber-300">5. ManejoInput/Menu</span> → Interactúa con el usuario (I/O)
          </div>
          <div>
            <span className="font-semibold text-slate-300">6. constantes.js</span> → Provee valores compartidos
          </div>
        </div>
      </div>

    </div>
  );
}