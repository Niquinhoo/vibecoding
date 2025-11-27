import React, { useState } from 'react';
import MapaConceptual from './MapaConceptual';
import ParadigmSelector from './ParadigmSelector';
import CodePresentation from './CodePresentation';
import SystemAlert from './SystemAlert'; // <--- Importamos la nueva alerta
import { projectContent } from './data';

// Helper para los colores del código
function getColorForParadigm(paradigm) {
  const colors = {
    estructurada: 'blue',
    objetos: 'purple',
    funcional: 'emerald',
    logica: 'rose'
  };
  return colors[paradigm] || 'slate';
}

function App() {
  const [view, setView] = useState('map'); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedParadigm, setSelectedParadigm] = useState(null);
  
  // Estado para controlar la Alerta Personalizada
  const [alertInfo, setAlertInfo] = useState({ 
    isOpen: false, 
    title: '', 
    message: '' 
  });

  // Función auxiliar para cerrar la alerta
  const closeAlert = () => setAlertInfo(prev => ({ ...prev, isOpen: false }));

  // 1. Lógica al seleccionar un archivo
  const handleFileSelect = (fileName) => {
    if (projectContent[fileName]) {
        setSelectedFile(fileName);
        setView('selector');
    } else {
        // EN LUGAR DE ALERT(), USAMOS NUESTRO ESTADO
        setAlertInfo({
          isOpen: true,
          title: 'Archivo de Soporte',
          message: `El archivo "${fileName}" es un módulo de configuración o base de datos. No contiene lógica de paradigmas ejecutable para analizar en esta demo.`
        });
    }
  };

  // 2. Lógica al seleccionar paradigma
  const handleParadigmSelect = (paradigm) => {
    setSelectedParadigm(paradigm);
    setView('presentation');
  };

  return (
    <>
      {/* Componente de Alerta Global */}
      <SystemAlert 
        isOpen={alertInfo.isOpen} 
        onClose={closeAlert}
        title={alertInfo.title}
        message={alertInfo.message}
      />

      {/* VISTA 1: EL MAPA VISUAL */}
      {view === 'map' && (
        <MapaConceptual onSelectFile={handleFileSelect} />
      )}

      {/* VISTA 2: SELECTOR DE 4 COLUMNAS */}
      {view === 'selector' && (
        <ParadigmSelector 
          fileName={selectedFile}
          onSelectParadigm={handleParadigmSelect}
          onBack={() => setView('map')}
        />
      )}

      {/* VISTA 3: PRESENTACIÓN DE CÓDIGO */}
      {view === 'presentation' && (
        <CodePresentation 
          data={{
            ...projectContent[selectedFile].paradigmas[selectedParadigm], 
            color: getColorForParadigm(selectedParadigm)
          }}
          onBack={() => setView('selector')} 
        />
      )}
    </>
  );
}

export default App;