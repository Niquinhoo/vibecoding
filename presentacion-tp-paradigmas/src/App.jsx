import React, { useState } from 'react';
import Home from './Home';
import CodePresentation from './CodePresentation';
import { paradigmas } from './data';

function App() {
  // Estado para controlar qué pantalla vemos ('home' o el nombre del paradigma)
  const [currentView, setCurrentView] = useState('home');

  // Si estamos en home, mostramos el menú
  if (currentView === 'home') {
    return <Home onNavigate={(view) => setCurrentView(view)} />;
  }

  // Si no, buscamos los datos del paradigma seleccionado y mostramos la presentación
  const data = paradigmas[currentView];
  
  return (
    <CodePresentation 
      data={data} 
      onBack={() => setCurrentView('home')} 
    />
  );
}

export default App;