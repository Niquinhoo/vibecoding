export const projectContent = {
"index.js": {
    descripcion: "El Director de Orquesta (Entry Point). No contiene la lógica compleja de negocio, sino que coordina a los actores. Gestiona el ciclo de vida (Start/Exit), mantiene la 'Base de Hechos' en memoria y maneja la 'Suciedad' (I/O) para que los otros módulos puedan ser puros.",
    // analisis_arquitectonico: [
    //     "Inyección de Dependencias: Importamos módulos especializados (OOP, Funcional, Lógico) en lugar de escribir todo en un archivo.",
    //     "Separación de Responsabilidades: Delegamos la UI a 'io/' y la lógica a 'src/', manteniendo el índice limpio.",
    //     "Gestión de Estado Centralizado: 'estadoApp' es la única fuente de verdad mutable del programa."
    // ],
    paradigmas: {
      estructurada: {
        titulo: "Control de Flujo e Infraestructura",
        pasos: [
          {
            id: 1,
            titulo: "Modularización (Imports)",
            descripcion: "Antes de ejecutar nada, estructuramos el código importando herramientas. Esto demuestra orden y reutilización de código.",
            codigo: `import fs from 'fs'; 
import { Tarea } from './Tarea.js'; // Entidad
import * as Servicios from './ServiciosTarea.js'; // Funciones Puras`
          },
          {
            id: 2,
            titulo: "El Game Loop (While)",
            descripcion: "El corazón de la aplicación es imperativo. Un bucle infinito controlado mantiene el programa receptivo a inputs hasta que el usuario decida salir.",
            codigo: `while (continuar) {
    Menu.displayMenu(); 
    const opcion = Inputs.solicitarOpcionMenu();
    // El programa 'espera' activamente aquí
}`
          },
          {
            id: 3,
            titulo: "Robustez (Try-Catch)",
            descripcion: "En la programación estructurada, asumimos que cosas pueden fallar (como leer un archivo). Usamos bloques `try-catch` para evitar que el programa colapse.",
            codigo: `try {
    const data = fs.readFileSync(RUTA_BD, 'utf-8');
} catch (error) {
    Menu.logError(\`Error fatal: \${error.message}\`);
    // Recuperación elegante del error
    estadoApp = []; 
}`
          }
        ]
      },
      objetos: {
        titulo: "Entidades y Encapsulamiento",
        pasos: [
          {
            id: 1,
            titulo: "Hidratación de Objetos",
            descripcion: "Al cargar datos, no usamos objetos planos. Los 'hidratamos' usando el método estático `fromJSON` para restaurar su prototipo y comportamientos.",
            codigo: `// De JSON plano a Instancias ricas con métodos
estadoApp = tareasJSON.map(json => Tarea.fromJSON(json));`
          },
          {
            id: 2,
            titulo: "Delegación de Comportamiento",
            descripcion: "El index no sabe *cómo* modificar una tarea, solo sabe *a quién* pedírselo. Llama al método público `.modificar()`, respetando el encapsulamiento.",
            codigo: `if (tarea) {
    // El 'cómo' está oculto dentro de la clase Tarea
    tarea.modificar(cambios);
    Menu.logSuccess('¡Estado actualizado internamente!');
}`
          }
        ]
      },
      funcional: {
        titulo: "Transformación de Datos (Pura)",
        pasos: [
          {
            id: 1,
            titulo: "Aislamiento de Impurezas",
            descripcion: "El `index.js` es 'impuro' (maneja I/O y estado), pero usa funciones puras para la lógica difícil. Pasamos datos, obtenemos nuevos datos, sin efectos secundarios ocultos.",
            codigo: `// 'estadoApp' entra, 'resultado' sale. 
// No se modificó nada globalmente en estas líneas.
let resultado = filtrarTareasActivas(estadoApp);
resultado = buscarPorTitulo(resultado, termino);`
          }
        ]
      },
      logica: {
        titulo: "Motor de Reglas",
        pasos: [
          {
            id: 1,
            titulo: "Inferencia sobre Hechos",
            descripcion: "Tratamos el array de tareas como una base de conocimiento y aplicamos predicados lógicos para 'descubrir' información, como tareas vencidas o relacionadas.",
            codigo: `// Pregunta lógica: "¿Qué tareas cumplen la regla 'Vencida'?"
const vencidas = encontrarTareasVencidas(activas);

// Pregunta lógica: "¿Qué tareas se relacionan con X?"
const relacionadas = encontrarTareasRelacionadas(activas, tareaX);`
          }
        ]
      }
    }
  },
"ServiciosTarea.js": {
    descripcion: "El motor de procesamiento de datos. Este módulo es puramente funcional: recibe listas, las transforma sin modificar las originales (inmutabilidad) y devuelve nuevos resultados.",
    paradigmas: {
      estructurada: {
        titulo: "Algoritmos de Selección",
        pasos: [
          {
            id: 1,
            titulo: "Estructura de Selección (Switch)",
            descripcion: "Aunque el enfoque es funcional, usamos una estructura de control clásica (`switch`) para decidir qué algoritmo de ordenamiento aplicar según el criterio del usuario.",
            codigo: `export const ordenarTareasPor = (lista, criterio) => {
  const copia = [...lista]; // Inmutabilidad primero

  switch (criterio) {
    case 'titulo': 
       return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));
    case 'vencimiento':
       // ... lógica imperativa de fechas
    default: 
       return copia;
  }
};`
          }
        ]
      },
      objetos: {
        titulo: "Manipulación de Modelos",
        pasos: [
          {
            id: 1,
            titulo: "Consumo de Propiedades",
            descripcion: "Las funciones no son entes abstractos; dependen de la estructura interna de los objetos `Tarea` (como `dificultad` o `estado`) para poder clasificarlos.",
            codigo: `// Dentro de calcularEstadisticas:
const estado = tarea.estado;
acumulador.estados[estado] = (acumulador.estados[estado] || 0) + 1;

// Accedemos a las propiedades del objeto para agruparlo.`
          }
        ]
      },
      funcional: {
        titulo: "Funciones Puras y HOFs",
        pasos: [
          {
            id: 1,
            titulo: "Inmutabilidad (Copia)",
            descripcion: "Nunca modificamos el array original. Operaciones como `sort` mutan el array, por lo que primero creamos una copia superficial usando el spread operator `[...]`.",
            codigo: `export const ordenarTareasPor = (lista, criterio) => {
  // CRÍTICO: Creamos copia para no afectar 'estadoApp' en index.js
  const copia = [...lista]; 
  return copia.sort(/*...*/);
};`
          },
          {
            id: 2,
            titulo: "Reducción (Reduce)",
            descripcion: "Usamos `reduce`, la herramienta más poderosa del paradigma funcional, para transformar una lista entera en un único objeto de reporte estadístico.",
            codigo: `export const calcularEstadisticas = (lista) => {
  return lista.reduce((acumulador, tarea) => {
    // Lógica pura que acumula contadores
    return acumulador;
  }, { estados: {}, dificultades: {} }); // Valor inicial
};`
          }
        ]
      },
      logica: {
        titulo: "Filtros como Predicados",
        pasos: [
          {
            id: 1,
            titulo: "Definición de Conjuntos",
            descripcion: "Cada función de filtro actúa como una regla lógica que define un subconjunto de datos. 'Dame todos los X tal que cumplan Y'.",
            codigo: `export const filtrarTareasActivas = (lista) => {
  // Regla Lógica: Elemento NO debe estar eliminado
  return lista.filter(t => !t.eliminado);
};

export const filtrarPorEstado = (lista, estado) => {
  // Regla Lógica: Elemento debe coincidir con el estado dado
  return lista.filter(t => t.estado === estado);
};`
          }
        ]
      }
    }
  },
"LogicaTareas.js": {
    descripcion: "El motor de inferencia del sistema. Aquí definimos 'Predicados' (preguntas de V/F) y 'Reglas' para consultar nuestra base de conocimiento (la lista de tareas). Simula el pensamiento declarativo.",
    paradigmas: {
      estructurada: {
        titulo: "Base de Conocimiento",
        pasos: [
          {
            id: 1,
            titulo: "Definición de Constantes",
            descripcion: "Para que las reglas funcionen, necesitamos un vocabulario común. Importamos las constantes que actúan como los 'átomos' o valores fijos de nuestro universo lógico.",
            codigo: `import { DIFICULTADES, ESTADOS } from '../utils/constantes.js';`
          }
        ]
      },
      objetos: {
        titulo: "Delegación de Reglas",
        pasos: [
          {
            id: 1,
            titulo: "Consulta al Modelo",
            descripcion: "A veces, la regla lógica no calcula nada, simplemente le pregunta al objeto. Aquí delegamos la definición de 'vencimiento' al método encapsulado en la clase Tarea.",
            codigo: `/**
 * Predicado: ¿La tarea está vencida?
 * Delega la lógica interna al objeto.
 */
const estaVencida = (tarea) => {
  return tarea.estaVencida(); 
};`
          }
        ]
      },
      funcional: {
        titulo: "Predicados Puros",
        pasos: [
          {
            id: 1,
            titulo: "Función Booleana",
            descripcion: "Un predicado es simplemente una función pura que recibe un dato y devuelve `true` o `false`. No tiene efectos secundarios, solo evalúa una verdad.",
            codigo: `const esPrioritaria = (tarea) => {
  // La regla es: Dificil Y (No terminada)
  return tarea.dificultad === DIFICULTADES.DIFICIL 
      && tarea.estado !== ESTADOS.TERMINADA;
};`
          }
        ]
      },
      logica: {
        titulo: "Motor de Inferencia",
        pasos: [
          {
            id: 1,
            titulo: "Consultas (Queries)",
            descripcion: "En el paradigma lógico, no 'iteramos' para modificar. 'Consultamos' la base de hechos para encontrar un subconjunto que cumpla una regla.",
            codigo: `export const encontrarTareasVencidas = (lista) => {
  // Query: Dame todas las T tal que T es vencida
  return lista.filter(estaVencida);
};`
          },
          {
            id: 2,
            titulo: "Relaciones Complejas",
            descripcion: "Podemos definir reglas que relacionen dos entidades distintas. Aquí buscamos 'hermanos' lógicos: tareas distintas con la misma dificultad.",
            codigo: `const esRelacionada = (tarea, objetivo) => {
  return (  
    tarea.id !== objetivo.id &&       // No es ella misma
    !tarea.eliminado &&               // Es válida
    tarea.dificultad === objetivo.dificultad // Comparten atributo
  )
}

export const encontrarTareasRelacionadas = (lista, target) => {
    return lista.filter(t => esRelacionada(t, target));
};`
          }
        ]
      }
    }
  },
"ManejoMenu.js": {
    descripcion: "La capa de presentación (UI) en consola. Se encarga de dar feedback visual al usuario y mostrar los datos formateados.",
    paradigmas: {
      estructurada: {
        titulo: "Salida Secuencial",
        pasos: [
          {
            id: 1,
            titulo: "Procedimiento de Dibujo",
            descripcion: "La función `displayMenu` es una secuencia imperativa de instrucciones de impresión. Se ejecuta línea por línea para 'pintar' la interfaz.",
            codigo: `export const displayMenu = () => {
    console.clear();
    console.log("==========================");
    console.log("   Gestor de Tareas ");
    console.log("==========================");
    console.log("1. Crear Tarea");
    // ... más logs
}`
          }
        ]
      },
      objetos: {
        titulo: "Mapeo de Datos",
        pasos: [
          {
            id: 1,
            titulo: "Diccionarios Visuales",
            descripcion: "Usamos objetos constantes como diccionarios para mapear códigos internos (ej. 'hard') a representaciones visuales amigables (ej. '🔴').",
            codigo: `const EMOJIS_DIFICULTAD = {
    [DIFICULTADES.FACIL]: '🟢 (Facil)',
    [DIFICULTADES.MEDIA]: '🟡 (Media)',
    [DIFICULTADES.DIFICIL]: '🔴 (Dificil)',
}`
          }
        ]
      },
      funcional: {
        titulo: "Iteración de Efectos",
        pasos: [
          {
            id: 1,
            titulo: "ForEach (Efectos)",
            descripcion: "Para mostrar la lista, no usamos un bucle `for(i=0...)`. Usamos `forEach`, un método funcional para ejecutar un 'efecto secundario' (imprimir) por cada elemento.",
            codigo: `export const displayTaskList = (tasks) => {
    // Recorremos la lista declarativamente
    tasks.forEach((task) => {
        displayTaskDetails(task);
    });
};`
          }
        ]
      },
      logica: {
        titulo: "Control de Flujo",
        pasos: [
          {
            id: 1,
            titulo: "Guardas (Guard Clauses)",
            descripcion: "Antes de intentar mostrar nada, aplicamos una regla lógica de negación. Si no se cumple la precondición (tener tareas), cortamos la ejecución.",
            codigo: `if (tasks.length === 0){
    console.log("No hay tareas para mostrar");
    return; // Early return
}`
          }
        ]
      }
    }
  },

  "ManejoInput.js": {
    descripcion: "El controlador de entrada. Captura lo que escribe el usuario, lo limpia y valida antes de pasarlo a la lógica de negocio.",
    paradigmas: {
      estructurada: {
        titulo: "Captura Imperativa",
        pasos: [
          {
            id: 1,
            titulo: "Solicitud en Cascada",
            descripcion: "Pedimos los datos uno por uno en un orden específico. El programa se 'pausa' esperando cada respuesta.",
            codigo: `export const solicitarPropsCreacion = () => {
  const titulo = solicitarInput("Título: ");
  const descripcion = solicitarInput("Descripción: ");
  // ... sigue pidiendo datos
  return { titulo, descripcion };
};`
          }
        ]
      },
      objetos: {
        titulo: "Wrappers y Helpers",
        pasos: [
          {
            id: 1,
            titulo: "Abstracción de Librería",
            descripcion: "Encapsulamos la librería externa `prompt-sync` dentro de una función helper propia para centralizar la configuración de entrada.",
            codigo: `import promptSync from 'prompt-sync';
const prompt = promptSync();

const solicitarInput = (mensaje) => {
  return prompt(mensaje);
};`
          }
        ]
      },
      funcional: {
        titulo: "Búsqueda en Colección",
        pasos: [
          {
            id: 1,
            titulo: "Método Find",
            descripcion: "Para seleccionar una tarea, no iteramos manualmente. Usamos `.find()`, una función de orden superior que devuelve el primer elemento que cumpla la condición.",
            codigo: `export const seleccionarTareaDeLista = (lista) => {
  const id = solicitarInput("Ingrese ID: ");
  // Buscamos declarativamente
  return lista.find(t => t.id === id);
};`
          }
        ]
      },
      logica: {
        titulo: "Validación de Restricciones",
        pasos: [
          {
            id: 1,
            titulo: "Validación de Tipos",
            descripcion: "Aplicamos reglas para asegurar la integridad de los datos, como verificar si una fecha ingresada es válida.",
            codigo: `const fecha = new Date(fechaStr);

// Regla: La fecha debe ser un número válido de tiempo
if (isNaN(fecha.getTime())) {
   console.log("Fecha inválida");
   return null;
}`
          }
        ]
      }
    }
  },
  "constantes.js": {
    descripcion: "El diccionario del sistema. Centraliza la configuración y evita los 'números mágicos' o cadenas sueltas, facilitando el mantenimiento.",
    paradigmas: {
      estructurada: {
        titulo: "Datos Globales",
        pasos: [
          {
            id: 1,
            titulo: "Constantes Exportadas",
            descripcion: "En el enfoque estructurado, definimos valores fijos al inicio para ser reutilizados secuencialmente por los módulos que los importen.",
            codigo: `// Definición imperativa de valores
export const ESTADOS = {
  PENDIENTE: 'pendiente',
  EN_CURSO: 'en_curso',
  TERMINADA: 'terminada',
};`
          },
          {
            id: 2,
            titulo: "Configuración de Dificultad",
            descripcion: "Centralizamos las opciones de dificultad para asegurar que el `switch` principal y las validaciones usen siempre los mismos valores.",
            codigo: `export const DIFICULTADES = {
  FACIL: 'facil',
  MEDIA: 'media',
  DIFICIL: 'dificil'
};`
          }
        ]
      },
      objetos: {
        titulo: "Objetos de Configuración",
        pasos: [
          {
            id: 1,
            titulo: "Pseudo-Enums",
            descripcion: "JavaScript no tiene `Enums` nativos como Java, pero simulamos este comportamiento usando Objetos congelados (inmutables) que agrupan propiedades relacionadas.",
            codigo: `// Objeto que actúa como Enum
export const DIFICULTADES_ORDEN = {
  'facil': 1,
  'media': 2,
  'dificil': 3
};
// Object.freeze(DIFICULTADES_ORDEN); // Opción común en OOP`
          }
        ]
      },
      funcional: {
        titulo: "Fuente de Verdad Inmutable",
        pasos: [
          {
            id: 1,
            titulo: "Valores Puros",
            descripcion: "Para el paradigma funcional, este archivo representa datos de solo lectura. Las funciones puras importarán esto para hacer cálculos sin riesgo de efectos secundarios.",
            codigo: `// Ruta al archivo de persistencia
// Es una constante, no una variable.
export const RUTA_BD = './data/tareas.json';`
          }
        ]
      },
      logica: {
        titulo: "Vocabulario del Universo",
        pasos: [
          {
            id: 1,
            titulo: "Átomos Lógicos",
            descripcion: "En programación lógica, estos strings actúan como 'átomos'. Son las únicas palabras válidas que nuestro motor de inferencia entiende para formar reglas.",
            codigo: `// El universo de estados válidos es finito:
// { 'pendiente', 'en_curso', 'terminada' }
// Cualquier otro valor rompe las reglas de inferencia.`
          }
        ]
      }
    }
  },

  "tareas.json": {
    descripcion: "La memoria a largo plazo. Es una representación textual del estado de la aplicación que permite que los datos sobrevivan cuando el programa se cierra.",
    paradigmas: {
      estructurada: {
        titulo: "Almacenamiento Secuencial",
        pasos: [
          {
            id: 1,
            titulo: "Estructura Lineal",
            descripcion: "El archivo se lee de principio a fin como una cadena de texto larga y luego se convierte en un Array simple.",
            codigo: `[
  {
    "id": "1b9d6bcd-bbfd",
    "titulo": "Estudiar Paradigmas",
    "descripcion": "Repasar los 4 conceptos clave",
    "estado": "pendiente",
    "dificultad": "media"
  }
]`
          }
        ]
      },
      objetos: {
        titulo: "Serialización de Objetos",
        pasos: [
          {
            id: 1,
            titulo: "Snapshot de Instancias",
            descripcion: "Cada entrada en este JSON es una 'foto' (snapshot) de una instancia de la clase `Tarea`. No guarda los métodos, solo sus atributos (estado).",
            codigo: `{
  "id": "uuid-v4-generado",
  "creacion": "2023-10-27T10:00:00.000Z", 
  "vencimiento": null,
  "eliminado": false 
  // Solo atributos, sin lógica
}`
          },
          {
            id: 2,
            titulo: "Rehidratación",
            descripcion: "Al cargar este JSON, el sistema 'rehidrata' estos datos crudos convirtiéndolos de nuevo en objetos `new Tarea()`.",
            codigo: `// JSON -> new Tarea(json)`
          }
        ]
      },
      funcional: {
        titulo: "Datos Puros",
        pasos: [
          {
            id: 1,
            titulo: "Input de Funciones",
            descripcion: "Para el paradigma funcional, este JSON es la lista inmutable inicial que alimentará nuestras funciones de transformación (Map/Filter/Reduce).",
            codigo: `// Input Data (Inmutable)
[
  { "titulo": "Tarea 1", "dificultad": "facil" },
  { "titulo": "Tarea 2", "dificultad": "dificil" }
]`
          }
        ]
      },
      logica: {
        titulo: "Base de Hechos",
        pasos: [
          {
            id: 1,
            titulo: "Hechos Declarados",
            descripcion: "Cada objeto en esta lista cuenta como un 'Hecho' verdadero en nuestro mundo. El motor lógico consultará esta base para deducir nueva información.",
            codigo: `// Hecho 1: Existe una tarea 'Estudiar' que es 'pendiente'.
// Hecho 2: Existe una tarea 'Comprar pan' que es 'terminada'.
// Inferencia: Si busco tareas pendientes, el Hecho 1 es la respuesta.`
          }
        ]
      }
    }
  }
};