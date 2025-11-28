export const projectContent = {
"index.js": {
  "descripcion": "El Director de Orquesta (Entry Point). No contiene la lógica compleja de negocio, sino que coordina a los actores. Gestiona el ciclo de vida del programa (inicio, ejecución continua y salida), mantiene la 'Base de Hechos' en memoria y centraliza todas las operaciones de entrada/salida para mantener los demás módulos limpios y puros.",
  "paradigmas": {
    "estructurada": {
      "titulo": "Control de Flujo, I/O y Estructura del Programa",
      "descripcionGeneral": "Es el paradigma dominante en este archivo. El programa opera como un cuidadoso procedimiento secuencial: inicializar → cargar datos → mostrar menú → ejecutar una acción → volver a mostrar el menú → salir. Este enfoque imperativo es ideal para aplicaciones de consola y sistemas que requieren pasos muy claros y ordenados.",
      "pasos": [
        {
          "id": 1,
          "titulo": "Modularización (Imports) como Organización Jerárquica",
          "descripcion": "Desde la programación estructurada, dividir en módulos es una forma de organizar responsabilidades. Aquí se importa todo lo necesario para operar: módulos de datos, funciones puras, clases, entrada/salida y constantes.",
          "codigo": "import fs from 'fs';\nimport { Tarea } from './Tarea.js';\nimport * as Menu from '../io/ManejoMenu.js';\nimport * as Inputs from '../io/ManejoInput.js';"
        },
        {
          "id": 2,
          "titulo": "Variables Globales Controladas",
          "descripcion": "En programación estructurada, el estado global se usa cuando es necesario representar el estado del sistema completo. Aquí `estadoApp` concentra la Base de Hechos cargada desde el archivo.",
          "codigo": "let estadoApp = []; // Lista principal de tareas en memoria"
        },
        {
          "id": 3,
          "titulo": "Funciones como Procedimientos Claros",
          "descripcion": "Cada función es un procedimiento lineal que realiza una tarea en pasos previsibles: cargar, guardar, crear, modificar.",
          "codigo": "function cargarTareas() {\n  try {\n    const data = fs.readFileSync(RUTA_BD, 'utf-8');\n    const json = JSON.parse(data);\n    estadoApp = json.map(j => Tarea.fromJSON(j));\n  } catch(e) {\n    estadoApp = []; // Vuelve a un estado válido\n  }\n}"
        },
        {
          "id": 4,
          "titulo": "Control de Flujo Centralizado (Switch)",
          "descripcion": "La lógica estructurada privilegia la claridad: un switch–case orquesta las operaciones dependiendo de la acción del usuario. Esto permite seguir el flujo del programa como si fuera un diagrama de caja.",
          "codigo": "switch(opcion) {\n  case '1': casoCrearTarea(); break;\n  case '2': casoListarTareasDetalle(); break;\n  case '3': casoModificarTarea(); break;\n  case '4': casoEliminarTarea(); break;\n  case '5': casoOrdenarTareas(); break;\n  case '6': casoReportes(); break;\n}"
        },
        {
          "id": 5,
          "titulo": "El Game Loop (While Continuo)",
          "descripcion": "El bucle continuo `while (continuar)` es el corazón del paradigma estructurado: un lazo principal que ejecuta la lógica paso por paso hasta que el usuario solicite salir.",
          "codigo": "while (continuar) {\n  Menu.displayMenu();\n  const opcion = Inputs.solicitarOpcionMenu();\n  procesar(opcion);\n}"
        },
        {
          "id": 6,
          "titulo": "Manejo de Errores (Try/Catch)",
          "descripcion": "En programación estructurada, los errores deben manejarse para garantizar que el programa no muera en mitad del flujo.",
          "codigo": "try {\n  fs.writeFileSync(RUTA_BD, json);\n} catch (error) {\n  Menu.logError('No se pudo guardar.');\n}"
        }
      ]
    },

    "objetos": {
      "titulo": "Uso de Objetos como Entidades con Comportamiento",
      "descripcionGeneral": "El index no implementa lógica de negocio. La delega a la entidad `Tarea`, que encapsula reglas internas. Esto sigue el espíritu OOP: las funciones del index solo llaman métodos públicos.",
      "pasos": [
        {
          "id": 1,
          "titulo": "Hidratación de Objetos",
          "descripcion": "Cuando se carga la BD, no basta con leer JSON. Se aplican constructores y se restauran métodos gracias a `Tarea.fromJSON()`.",
          "codigo": "estadoApp = tareasJSON.map(json => Tarea.fromJSON(json));"
        },
        {
          "id": 2,
          "titulo": "Encapsulamiento y Delegación",
          "descripcion": "Index actúa como un director: llama a `tarea.modificar()` sin preocuparse por cómo cambia internamente.",
          "codigo": "tarea.modificar(cambios); // Lógica OOP interna"
        },
        {
          "id": 3,
          "titulo": "Instanciación y Representación",
          "descripcion": "Index nunca crea estructuras planas. Siempre crea instancias plenas con métodos, atributos y validaciones.",
          "codigo": "const nueva = new Tarea(props);"
        }
      ]
    },

    "funcional": {
      "titulo": "Transformaciones Puras de Colecciones",
      "descripcionGeneral": "Aquí se concentra el paradigma funcional: funciones sin efectos secundarios, que reciben datos y devuelven datos nuevos sin tocar el estado global.",
      "pasos": [
        {
          "id": 1,
          "titulo": "Uso de Funciones Puras",
          "descripcion": "El index pasa listas y recibe nuevas listas filtradas u ordenadas. No muta directamente.",
          "codigo": "let resultado = filtrarTareasActivas(estadoApp);\nresultado = buscarPorTitulo(resultado, termino);"
        },
        {
          "id": 2,
          "titulo": "Programación Declarativa",
          "descripcion": "El index expresa 'qué' quiere lograr, no 'cómo'. Ej: filtrar, mapear, ordenar.",
          "codigo": "const ordenadas = ordenarTareasPor(lista, criterio);"
        }
      ]
    },

    "logica": {
      "titulo": "Predicados, Hechos e Inferencias",
      "descripcionGeneral": "La parte lógica se basa en reglas que responden preguntas sobre la Base de Hechos (estadoApp): '¿Qué tareas están vencidas?', '¿Qué tareas están relacionadas?'",
      "pasos": [
        {
          "id": 1,
          "titulo": "Consultas como Predicados",
          "descripcion": "Las funciones lógicas representan reglas de conocimiento evaluadas sobre los datos.",
          "codigo": "const vencidas = encontrarTareasVencidas(activas);"
        },
        {
          "id": 2,
          "titulo": "Relaciones entre Hechos",
          "descripcion": "Se deducen tareas relacionadas según similitudes o conexiones implícitas.",
          "codigo": "const relacionadas = encontrarTareasRelacionadas(activas, tareaSeleccionada);"
        },
        {
          "id": 3,
          "titulo": "Sistema Híbrido",
          "descripcion": "Index ejecuta reglas lógicas como consultas, pero sin modificar la BD.",
          "codigo": "Menu.displayTaskList(relacionadas);"
        }
      ]
    }
  }
},

"Tarea.js": {
  "descripcion": "El Modelo del Dominio. Representa la entidad fundamental del sistema. Una Tarea posee identidad, estado interno, reglas de negocio y comportamiento propio. Este módulo es independiente de la UI y del almacenamiento.",
  "paradigmas": {

    "estructurada": {
      "titulo": "Validación Secuencial y Lógica Determinista",
      "descripcionGeneral": "El constructor funciona como un procedimiento donde se verifican las reglas en un orden estricto. Si alguna regla falla, se aborta la creación del objeto.",
      "pasos": [
        {
          "id": 1,
          "titulo": "Guardas (Validaciones Previas)",
          "descripcion": "Se evalúan condiciones que deben cumplirse antes de inicializar el objeto. Esto obliga a que ninguna tarea inválida llegue al sistema.",
          "codigo": "if (!props.titulo || typeof props.titulo !== 'string' || props.titulo.trim().length === 0) {\n  throw new Error('El \"titulo\" es obligatorio.');\n}\nif (props.titulo.length > 100) {\n  throw new Error('El \"titulo\" no puede exceder los 100 caracteres.');\n}\nif (props.descripcion && props.descripcion.length > 500) {\n  throw new Error('La \"descripcion\" no puede exceder 500 caracteres.');\n}"
        },
        {
          "id": 2,
          "titulo": "Validaciones Aplicando Constantes",
          "descripcion": "Se usan listas cerradas (enumeraciones) para validar estados y dificultades.",
          "codigo": "const dificultadValida = props.dificultad && Object.values(DIFICULTADES).includes(props.dificultad);"
        }
      ]
    },

    "objetos": {
      "titulo": "Modelo Orientado a Objetos",
      "descripcionGeneral": "Este archivo es el núcleo OOP del proyecto. Cada tarea es un objeto con autonomía, identidad propia y comportamiento interno bien definido.",
      "pasos": [
        {
          "id": 1,
          "titulo": "Identidad",
          "descripcion": "Cada tarea posee un ID único generado por el sistema, lo que garantiza que sea identificable incluso si tiene el mismo título que otra.",
          "codigo": "this.id = randomUUID();"
        },
        {
          "id": 2,
          "titulo": "Atributos Internos Encapsulados",
          "descripcion": "El constructor inicializa todo el estado interno, asegurando que el objeto siempre esté en un estado válido.",
          "codigo": "this.titulo = props.titulo.trim();\nthis.descripcion = props.descripcion || '';\nthis.estado = ESTADOS.PENDIENTE;\nthis.dificultad = dificultadValida ? props.dificultad : DIFICULTADES.FACIL;"
        },
        {
          "id": 3,
          "titulo": "Método Mutable: modificar()",
          "descripcion": "Permite actualizar atributos específicos. Respeta el encapsulamiento y valida usando constantes del dominio.",
          "codigo": "Tarea.prototype.modificar = function(cambios) {\n  if (cambios.titulo) this.titulo = cambios.titulo;\n  if (cambios.descripcion) this.descripcion = cambios.descripcion;\n  if (cambios.estado && Object.values(ESTADOS).includes(cambios.estado)) this.estado = cambios.estado;\n  if (cambios.dificultad && Object.values(DIFICULTADES).includes(cambios.dificultad)) this.dificultad = cambios.dificultad;\n  if (cambios.vencimiento !== undefined) this.vencimiento = cambios.vencimiento;\n\n  this.ultimaEdicion = new Date();\n};"
        },
        {
          "id": 4,
          "titulo": "Soft Delete",
          "descripcion": "El objeto conserva su identidad aunque esté marcado como eliminado. Esto permite historial y auditoría.",
          "codigo": "Tarea.prototype.marcarEliminada = function() {\n  this.eliminado = true;\n  this.ultimaEdicion = new Date();\n};"
        }
      ]
    },

    "funcional": {
      "titulo": "Transformaciones Puras (Serialización y Recreación)",
      "descripcionGeneral": "El paradigma funcional aparece en procesos que devuelven nuevos datos sin afectar el estado global.",
      "pasos": [
        {
          "id": 1,
          "titulo": "Serialización Pura",
          "descripcion": "El método retorna una nueva estructura plana para guardarla en JSON. No modifica al objeto.",
          "codigo": "Tarea.prototype.toJSON = function() {\n  return {\n    id: this.id,\n    titulo: this.titulo,\n    descripcion: this.descripcion,\n    estado: this.estado,\n    dificultad: this.dificultad,\n    creacion: this.creacion.toISOString(),\n    ultimaEdicion: this.ultimaEdicion.toISOString(),\n    vencimiento: this.vencimiento ? this.vencimiento.toISOString() : null,\n    eliminado: this.eliminado,\n  };\n};"
        },
        {
          "id": 2,
          "titulo": "Rehidratación desde JSON",
          "descripcion": "Transforma una estructura plana en una instancia funcional con métodos y fechas restauradas. Esto es un 'constructor funcional'.",
          "codigo": "Tarea.fromJSON = function(data) {\n  const tarea = new Tarea({ titulo: data.titulo });\n  Object.assign(tarea, {\n    ...data,\n    creacion: new Date(data.creacion),\n    ultimaEdicion: new Date(data.ultimaEdicion),\n    vencimiento: data.vencimiento ? new Date(data.vencimiento) : null,\n  });\n  return tarea;\n};"
        }
      ]
    },

    "logica": {
      "titulo": "Reglas de Negocio Basadas en Predicados",
      "descripcionGeneral": "Son funciones que devuelven verdadero/falso sobre la base de hechos del objeto. La esencia del paradigma lógico.",
      "pasos": [
        {
          "id": 1,
          "titulo": "Predicado: está vencida",
          "descripcion": "Evalúa una condición lógica pura sobre el estado de la tarea.",
          "codigo": "Tarea.prototype.estaVencida = function() {\n  if (!this.vencimiento || this.estado === ESTADOS.TERMINADA) return false;\n  const hoy = new Date().setHours(0,0,0,0);\n  const venc = new Date(this.vencimiento).setHours(0,0,0,0);\n  return venc < hoy;\n};"
        }
      ]
    }
  }
},


  "ServiciosTarea.js": {
  descripcion: "El motor de procesamiento de datos. Este módulo es puramente funcional: recibe listas, las transforma sin modificar las originales (inmutabilidad) y devuelve nuevos resultados. Aquí se concentran las operaciones de filtrado, búsqueda, ordenamiento y cálculo de estadísticas, todas representadas mediante funciones puras y combinaciones de HOFs.",
  paradigmas: {
    estructurada: {
      titulo: "Algoritmos de Selección y Control de Flujo",
      pasos: [
        {
          id: 1,
          titulo: "Estructura de Selección (Switch)",
          descripcion:
            "Aunque el módulo sigue una filosofía funcional, se emplea la estructura clásica `switch` para seleccionar, de manera determinista y ordenada, qué algoritmo de ordenamiento aplicar según el criterio recibido. Esta es una construcción propia del paradigma estructurado, ya que divide el flujo en casos mutuamente excluyentes.",
          codigo: `export const ordenarTareasPor = (lista, criterio) => {
  const copia = [...lista]; // Inmutabilidad primero

  switch (criterio) {
    case 'titulo':
      return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));

    case 'creacion':
      return copia.sort((a, b) => a.creacion - b.creacion);

    case 'dificultad':
      return copia.sort((a, b) => DIFICULTADES_ORDEN[a.dificultad] - DIFICULTADES_ORDEN[b.dificultad]);

    default:
      return copia;
  }
};`
        },
        {
          id: 2,
          titulo: "Secuencialidad y Flujo Determinado",
          descripcion:
            "Las funciones siguen un orden claro: copiar → procesar → retornar. Esta estructura lineal es característica del paradigma estructurado. El flujo nunca se bifurca de forma implícita ni depende de efectos secundarios.",
          codigo: `// Flujo secuencial:
const copia = [...lista];   // Paso 1
const ordenada = copia.sort(/*...*/);  // Paso 2
return ordenada;            // Paso 3`
        }
      ]
    },

    objetos: {
      titulo: "Manipulación de Modelos y Acceso a Atributos",
      pasos: [
        {
          id: 1,
          titulo: "Consumo de Propiedades",
          descripcion:
            "Las funciones trabajan sobre instancias de objetos `Tarea` y extraen atributos como `estado`, `titulo`, `dificultad`, `creacion` y `vencimiento`. Si bien no se usan métodos propios del objeto (no hay mutación), sí se consumen sus propiedades para clasificarlas, ordenarlas y transformarlas.",
          codigo: `// Dentro de calcularEstadisticas:
const estado = tarea.estado;
acumulador.estados[estado] = (acumulador.estados[estado] || 0) + 1;`
        },
        {
          id: 2,
          titulo: "Dependencia de la Estructura del Modelo",
          descripcion:
            "El módulo asume la forma del objeto `Tarea` para funcionar correctamente. Esto representa el paradigma de objetos como 'molde de datos', aunque no exista instanciación ni métodos mutables.",
          codigo: `// Ejemplo de acceso a múltiples propiedades
lista.filter(t => t.estado === 'Pendiente' && t.dificultad === 'Dificil');`
        }
      ]
    },

    funcional: {
      titulo: "Funciones Puras, HOFs e Inmutabilidad",
      pasos: [
        {
          id: 1,
          titulo: "Inmutabilidad (Copia del Array)",
          descripcion:
            "El principio fundamental del módulo: jamás se modifica la lista original. Para garantizar pureza, cualquier operación mutable (como sort) se realiza sobre una copia superficial usando el operador spread (`[...]`).",
          codigo: `export const ordenarTareasPor = (lista, criterio) => {
  const copia = [...lista]; // Nunca mutar la original
  return copia.sort(/* comparación */);
};`
        },
        {
          id: 2,
          titulo: "Uso de Higher Order Functions",
          descripcion:
            "Métodos como `filter`, `map`, `reduce` y `sort` son HOFs fundamentales del estilo funcional. Permiten expresar transformaciones completas sin crear bucles, sin modificar estado y sin variables auxiliares mutables.",
          codigo: `// Ejemplo compuesto de HOFs:
return lista
  .filter(t => !t.eliminado) 
  .sort((a, b) => a.titulo.localeCompare(b.titulo));`
        },
        {
          id: 3,
          titulo: "Reducción (Reduce)",
          descripcion:
            "La función `calcularEstadisticas` es un ejemplo claro de reducción: toma una lista completa y la resume en un único objeto acumulador. Esto es funcional clásico.",
          codigo: `export const calcularEstadisticas = (lista) => {
  return lista.reduce((acc, tarea) => {
    acc.estados[tarea.estado] = (acc.estados[tarea.estado] || 0) + 1;
    acc.dificultades[tarea.dificultad] = (acc.dificultades[tarea.dificultad] || 0) + 1;
    return acc;
  }, { estados: {}, dificultades: {} });
};`
        },
        {
          id: 4,
          titulo: "Funciones Puras sin Efectos Secundarios",
          descripcion:
            "Todas las funciones dependen únicamente de sus parámetros y devuelven nuevos valores. No modifican variables externas ni realizan I/O. Dadas las mismas entradas, siempre devuelven las mismas salidas.",
          codigo: `// Pureza garantizada:
export const buscarPorTitulo = (lista, texto) =>
  lista.filter(t => t.titulo.toLowerCase().includes(texto.toLowerCase()));`
        }
      ]
    },

    logica: {
      titulo: "Filtros, Predicados y Definición de Conjuntos",
      pasos: [
        {
          id: 1,
          titulo: "Definición de Conjuntos con Predicados",
          descripcion:
            "Las funciones de filtrado operan como reglas lógicas que seleccionan subconjuntos a partir de condiciones booleanas. Cada predicado define exactamente qué elementos pertenecen al conjunto resultante.",
          codigo: `export const filtrarTareasActivas = (lista) => {
  // Regla Lógica: pertenece ⟺ NO está eliminado
  return lista.filter(t => !t.eliminado);
};`
        },
        {
          id: 2,
          titulo: "Representación de Condiciones en Forma Declarativa",
          descripcion:
            "Se utiliza la lógica proposicional aplicada directamente a estructuras de datos. No hay estados intermedios: solo condiciones booleanas expresadas como funciones.",
          codigo: `// Predicado lógico compuesto:
t => t.estado === 'Pendiente' && t.vencimiento !== null`
        },
        {
          id: 3,
          titulo: "Construcción de Reglas Encadenadas",
          descripcion:
            "El paradigma lógico aparece cuando se combinan múltiples predicados para construir criterios más complejos, como búsqueda + estado + actividad.",
          codigo: `// Conjunto definido por múltiples reglas:
lista
  .filter(t => !t.eliminado)
  .filter(t => t.estado === estado)
  .filter(t => t.titulo.includes(texto));`
        }
      ]
    }
  }
},


"LogicaTareas.js": {
  descripcion:
    "El motor de inferencia del sistema. Este módulo define Predicados (funciones que responden preguntas lógicas con V/F) y Reglas (funciones que usan predicados para consultar la base de hechos). Representa el paradigma lógico dentro de la app: dadas ciertas condiciones, el sistema determina qué tareas cumplen la regla, sin modificar el estado ni alterar objetos.",
  paradigmas: {
    estructurada: {
      titulo: "Base de Conocimiento y Control Lógico",
      pasos: [
        {
          id: 1,
          titulo: "Definición de Constantes (Átomos del Universo del Problema)",
          descripcion:
            "Importamos constantes que actúan como 'hechos' estáticos del dominio: estos son los posibles valores para dificultad y estado. En un sistema lógico, estos valores representan átomos fundamentales de nuestra base de conocimiento sobre los que se construyen las reglas.",
          codigo: `import { DIFICULTADES, ESTADOS } from '../utils/constantes.js';`
        },
        {
          id: 2,
          titulo: "Estructuración del Módulo como Conjunto de Hechos + Reglas",
          descripcion:
            "La organización del archivo sigue la estructura clásica del paradigma lógico: primero se definen los predicados base (hechos derivados), luego se definen las reglas que operan como consultas. El orden y secuencialidad en la escritura del módulo sigue el paradigma estructurado.",
          codigo: `// 1) Predicados
const estaVencida = (...) => {...}

const esPrioritaria = (...) => {...}

// 2) Reglas lógicas
export const encontrarTareasVencidas = lista => lista.filter(estaVencida);`
        }
      ]
    },

    objetos: {
      titulo: "Delegación al Modelo y Encapsulamiento",
      pasos: [
        {
          id: 1,
          titulo: "Consulta al Modelo (Mensaje a un Objeto)",
          descripcion:
            "El predicado 'estaVencida' NO calcula él mismo la lógica: delega directamente al método `tarea.estaVencida()`. Esto muestra un principio del paradigma orientado a objetos: el comportamiento pertenece al objeto `Tarea`, no a la lógica global.",
          codigo: `const estaVencida = (tarea) => {
  return tarea.estaVencida(); // Mensaje enviado a la instancia
};`
        },
        {
          id: 2,
          titulo: "Uso de Propiedades Encapsuladas del Modelo",
          descripcion:
            "Otros predicados consultan atributos del objeto (estado, dificultad, eliminado). Aunque este módulo es funcional, sigue dependiendo de la estructura interna del objeto Tarea, lo cual es propio del paradigma de objetos.",
          codigo: `const esRelacionada = (t, objetivo) => 
  t.dificultad === objetivo.dificultad && !t.eliminado;`
        }
      ]
    },

    funcional: {
      titulo: "Predicados Puros y Transformación sin Efectos Colaterales",
      pasos: [
        {
          id: 1,
          titulo: "Predicados Puros (Funciones Booleanas)",
          descripcion:
            "Un predicado es una función pura que recibe un dato y devuelve un valor booleano. No modifica nada, no altera objetos, no tiene efectos secundarios y siempre devuelve el mismo resultado dado el mismo parámetro. Esto es el corazón del estilo funcional.",
          codigo: `const esPrioritaria = (tarea) => {
  return tarea.dificultad === DIFICULTADES.DIFICIL
      && tarea.estado !== ESTADOS.TERMINADA;
};`
        },
        {
          id: 2,
          titulo: "Uso Extensivo de Higher-Order Functions: filter()",
          descripcion:
            "Las reglas lógicas (consultas) se implementan como filtros: una HOF recibe un predicado y construye un subconjunto. Esta composición predicado + filter es un patrón funcional clásico.",
          codigo: `// Regla funcional pura
export const encontrarTareasVencidas = (lista) =>
  lista.filter(estaVencida);`
        },
        {
          id: 3,
          titulo: "Inmutabilidad de la Base de Hechos",
          descripcion:
            "Las funciones jamás modifican el array original; generan nuevas listas derivadas. Esto mantiene el sistema puro y hace que todas las reglas sean referencialmente transparentes.",
          codigo: `// No se toca la lista original:
return lista.filter(esPrioritaria);`
        }
      ]
    },

    logica: {
      titulo: "Motor de Inferencia y Razonamiento Declarativo",
      pasos: [
        {
          id: 1,
          titulo: "Consultas (Queries Lógicas)",
          descripcion:
            "Cada regla funciona como una 'consulta' al conjunto de hechos (la lista de tareas). Se formula una pregunta: '¿Qué tareas cumplen esta condición lógica?' El sistema aplica el predicado como si fuera una regla declarativa y obtiene las soluciones.",
          codigo: `export const encontrarTareasVencidas = (lista) => {
  // Consulta declarativa: devolver soluciones
  return lista.filter(estaVencida);
};`
        },
        {
          id: 2,
          titulo: "Relaciones Lógicas (Reglas entre Hechos)",
          descripcion:
            "Las reglas no solo evalúan tareas individualmente, sino que también establecen relaciones entre elementos ('tareas relacionadas', 'tareas hermanas', etc.). Este tipo de razonamiento pertenece directamente al paradigma lógico.",
          codigo: `const esRelacionada = (tarea, objetivo) => {
  return (  
    tarea.id !== objetivo.id &&          // Distintos objetos
    !tarea.eliminado &&                  // El hecho es válido
    tarea.dificultad === objetivo.dificultad // Relación lógica
  );
};`
        },
        {
          id: 3,
          titulo: "Reglas de Inferencia con Múltiples Predicados",
          descripcion:
            "Se pueden construir reglas más complejas encadenando predicados. Cada predicado actúa como una proposición lógica, y la regla final combina esas proposiciones (conjunción AND, disyunción OR, etc.).",
          codigo: `// Ejemplo conceptual (no está en el código real):
// T es relevante si esPrioritaria(T) Y estaVencida(T)
t => esPrioritaria(t) && estaVencida(t);`
        },
        {
          id: 4,
          titulo: "Base de Hechos + Reglas = Micro-Sistema Experto",
          descripcion:
            "El módulo opera igual que un pequeño sistema experto: la 'base de hechos' es la lista de tareas, los predicados son propiedades del dominio y las reglas permiten inferir nueva información (tareas vencidas, relacionadas, críticas). Todo esto sin modificar los hechos originales.",
          codigo: `// Base de hechos: lista
// Reglas: filter + predicados
const resultados = lista.filter(predicado);`
        }
      ]
    }
  }
},

"ManejoMenu.js": {
  "descripcion": "La capa de presentación (UI) en consola. Este módulo traduce los datos internos del sistema en una representación legible para el usuario. Actúa como la vista del patrón MVC, encargándose de formatear, imprimir y estructurar la salida en terminal.",
  "paradigmas": {
    "estructurada": {
      "titulo": "Salida Secuencial y Programación Imperativa",
      "pasos": [
        {
          "id": 1,
          "titulo": "Procedimientos Imperativos",
          "descripcion": "Las funciones como `displayMenu` implementan una secuencia lineal de instrucciones. No devuelven valores: solo ejecutan acciones (limpiar pantalla y mostrar texto). Es programación imperativa pura, centrada en el cómo.",
          "codigo": "export const displayMenu = () => {\n    console.clear();\n    console.log(\"==============================\");\n    console.log(\"   Gestor de Tareas (CLI)\");\n    console.log(\"==============================\");\n    console.log(\"1. Crear Tarea\");\n    console.log(\"2. Listar Tareas\");\n    console.log(\"0. Salir\");\n};"
        },
        {
          "id": 2,
          "titulo": "Subrutinas Encadenadas",
          "descripcion": "Cada opción del menú desemboca en otra rutina específica (`displayTaskDetails`, `displayStatistics`, etc.). Esto refleja un diseño estructurado tradicional basado en descomposición funcional.",
          "codigo": "// Ejemplo: el menú llama a otras rutinas\nif (opcion === 2) displayTaskList(tasks);"
        }
      ]
    },
    "objetos": {
      "titulo": "Representación y Modelado",
      "pasos": [
        {
          "id": 1,
          "titulo": "Diccionarios de Presentación",
          "descripcion": "El módulo utiliza un objeto (`EMOJIS_DIFICULTAD`) como mapa declarativo que transforma un atributo del modelo (`dificultad`) en una representación visual amigable para humanos. Es un ejemplo de encapsular reglas de presentación.",
          "codigo": "const EMOJIS_DIFICULTAD = {\n    [DIFICULTADES.FACIL]: '🟢 (Fácil)',\n    [DIFICULTADES.MEDIA]: '🟡 (Media)',\n    [DIFICULTADES.DIFICIL]: '🔴 (Difícil)'\n};"
        },
        {
          "id": 2,
          "titulo": "Colaboración con Objetos del Modelo",
          "descripcion": "La función `displayTaskDetails` se apoya en los métodos de instancia de las tareas (`tarea.estaVencida()`). La UI no implementa la lógica: solo consulta al objeto. Esto sigue el principio de Responsabilidad Única.",
          "codigo": "console.log(`  ¿Vencida?: ${task.estaVencida() ? 'Sí' : 'No'}`);"
        }
      ]
    },
    "funcional": {
      "titulo": "Efectos Aislados y Transformaciones Declarativas",
      "pasos": [
        {
          "id": 1,
          "titulo": "Processing mediante Iteración Declarativa",
          "descripcion": "La función `displayTaskList` usa `forEach`, que representa una iteración declarativa pensada para efectos secundarios controlados (mostrar información). El objetivo no es construir un valor, sino ejecutar acciones puras por ítem.",
          "codigo": "tasks.forEach(task => displayTaskDetails(task));"
        },
        {
          "id": 2,
          "titulo": "Formateo Inmutable",
          "descripcion": "Aunque este módulo produce efectos, nunca modifica objetos existentes. Solo *lee* datos del modelo y *genera una representación textual*, manteniendo la idea funcional de datos inmutables.",
          "codigo": "// Ejemplo: solo lectura, sin mutación\ntask.creacion.toISOString();"
        }
      ]
    },
    "logica": {
      "titulo": "Validación, Guardas y Reglas de Visualización",
      "pasos": [
        {
          "id": 1,
          "titulo": "Guard Clauses (Reglas Lógicas Previas)",
          "descripcion": "Antes de mostrar tareas, el módulo valida condiciones previas (precondiciones): si no hay tareas, no tiene sentido iterar. Esta técnica proviene del razonamiento lógico: 'si no se cumple la condición, no se evalúa el resto'.",
          "codigo": "if (tasks.length === 0) {\n    console.log(\"No hay tareas para mostrar\");\n    return;\n}"
        },
        {
          "id": 2,
          "titulo": "Reglas Visuales como Consecuencias",
          "descripcion": "La UI aplica reglas deterministas para mostrar elementos según sus propiedades. Ejemplo: una dificultad determina un emoji asociado. Esta es una forma básica de inferencia: si X → entonces usar Y.",
          "codigo": "const label = EMOJIS_DIFICULTAD[dificultad] || dificultad;"
        },
        {
          "id": 3,
          "titulo": "Cálculo de porcentajes como inferencia",
          "descripcion": "En `displayStatistics`, el módulo interpreta la base de datos (stats) y genera conclusiones visuales (porcentajes, totales). No produce datos nuevos, sino representaciones derivadas.",
          "codigo": "console.log(` - ${estado}: ${data.cantidad} (${data.porcentaje}%)`);"
        }
      ]
    }
  }
},

  "ManejoInput.js": {
  descripcion: "El controlador de entrada. Este módulo opera como interfaz entre el usuario y el sistema. Recibe cadenas escritas por el usuario mediante prompt-sync, valida, transforma y garantiza que la información que pasa al núcleo del programa sea estructuralmente correcta.",
  paradigmas: {

    // -------------------------------------------------------------------------
    // PARADIGMA ESTRUCTURADA
    // -------------------------------------------------------------------------
    estructurada: {
      titulo: "Captura Imperativa",
      pasos: [
        {
          id: 1,
          titulo: "Solicitud en Secuencia Determinada",
          descripcion:
            "El usuario completa una serie de pasos uno tras otro. El programa se detiene en cada input hasta recibir una respuesta válida. Esto refleja el paradigma imperativo clásico donde el flujo es lineal.",
          codigo: `export const solicitarPropsCreacion = () => {
  console.clear();
  console.log("-- Crear nueva tarea --");

  const titulo = _solicitarStringNoVacio("Título: ");
  const descripcion = _solicitarStringOpcional("Descripción: ");
  const dificultad = solicitarDificultad("Dificultad: ");
  const vencimiento = solicitarVencimiento("Vencimiento (AAAA-MM-DD): ");

  return { titulo, descripcion, dificultad, vencimiento };
};`
        },
        {
          id: 2,
          titulo: "Estructuras de Control",
          descripcion:
            "Aparecen bucles claros (`while`, `do/while`) y condiciones (`if`, `switch`) que definen el flujo exacto del programa y evitan entradas inválidas.",
          codigo: `let valor;
do {
  valor = prompt("Ingrese título: ");
  if (!valor.trim()) {
    console.log("❌ No puede estar vacío.");
  }
} while (!valor.trim());`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // PARADIGMA ORIENTADO A OBJETOS
    // -------------------------------------------------------------------------
    objetos: {
      titulo: "Wrappers, Helpers y Colaboración con Modelos",
      pasos: [
        {
          id: 1,
          titulo: "Encapsulación de la Biblioteca Externa",
          descripcion:
            "La librería prompt-sync no se usa directamente en el flujo principal. Se encapsula dentro de helpers privados como `_solicitarStringNoVacio`, asegurando que el resto del sistema no dependa de la librería.",
          codigo: `import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

// Nadie fuera de este módulo conoce 'prompt':
export const _solicitarStringOpcional = (msg) => prompt(msg);`
        },
        {
          id: 2,
          titulo: "Colaboración con el Objeto Tarea",
          descripcion:
            "Las funciones leen o actualizan propiedades de un objeto `Tarea`. La lógica de negocio queda dentro de la clase, mientras que ManejoInput solo recolecta datos. Esto divide responsabilidades.",
          codigo: `// solicitud de modificación
export const solicitarPropsModificacion = (tarea) => {
  const nuevoTitulo = prompt(\`Título [\${tarea.titulo}]: \`);
  if (nuevoTitulo) tarea.titulo = nuevoTitulo;
  return tarea;
};`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // PARADIGMA FUNCIONAL
    // -------------------------------------------------------------------------
    funcional: {
      titulo: "Entrada como Transformación Pura",
      pasos: [
        {
          id: 1,
          titulo: "Uso de Find/Filter para Selección",
          descripcion:
            "Se aplican funciones de orden superior como `find`, la cual recibe un predicado y retorna el primer elemento coincidente. No se alteran las listas.",
          codigo: `export const seleccionarTareaDeLista = (lista, accion) => {
  const termino = prompt("Buscar: ");
  return lista.find(t => t.titulo.toLowerCase().includes(termino.toLowerCase()));
};`
        },
        {
          id: 2,
          titulo: "Funciones como Validadores",
          descripcion:
            "Cada función de solicitud actúa como una transformación pura: recibe un input crudo y devuelve un valor validado, o null/undefined si falla.",
          codigo: `const esFechaValida = (str) => /^\d{4}-\d{2}-\d{2}$/.test(str);

export const solicitarVencimiento = () => {
  const input = prompt("Fecha: ");
  return esFechaValida(input) ? new Date(input) : undefined;
};`
        },
        {
          id: 3,
          titulo: "Separación entre I/O e Inmutabilidad",
          descripcion:
            "Aunque prompt es una operación impura, la función retorna siempre datos nuevos sin modificar estructuras externas. Esto acerca este módulo a un estilo funcional parcialmente puro.",
          codigo: `export const solicitarPropsCreacion = () => {
  return {
    titulo: _solicitarStringNoVacio("Título: "),
    descripcion: _solicitarStringOpcional("Descripción: "),
    dificultad: solicitarDificultad("Dificultad: ")
  };
};`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // PARADIGMA LÓGICO
    // -------------------------------------------------------------------------
    logica: {
      titulo: "Validación y Reglas Formales",
      pasos: [
        {
          id: 1,
          titulo: "Predicados de Entrada",
          descripcion:
            "Cada verificación es una regla del tipo: 'la entrada es válida si se cumple P'. Este paradigma se basa en lógica de predicados: evaluar verdadero/falso.",
          codigo: `if (valor.length > max) {
  console.log("❌ Error: demasiado largo");
  continue;
}`
        },
        {
          id: 2,
          titulo: "Consistencia Temporal",
          descripcion:
            "Para las fechas se aplican reglas lógicas (no puede ser pasada, debe cumplir formato, debe ser real).",
          codigo: `if (fechaInput < hoy) {
  console.log("❌ No puede ser pasada");
  continue;
}`
        },
        {
          id: 3,
          titulo: "Normalización Semántica",
          descripcion:
            "Los inputs se transforman a una versión estándar antes de entrar al sistema (trim, lowercase, default values).",
          codigo: `const termino = prompt("Buscar: ").trim().toLowerCase();`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // PARADIGMA REACTIVO / UX (EXTRA)
    // -------------------------------------------------------------------------
    reactivo: {
      titulo: "Feedback Inmediato",
      pasos: [
        {
          id: 1,
          titulo: "Mensajes de Error en Tiempo Real",
          descripcion:
            "Si el usuario ingresa algo inválido, el programa no continúa. Vuelve a pedir el dato inmediatamente y explica qué salió mal.",
          codigo: `if (!regexFecha.test(fechaStr)) {
  console.log("❌ Formato AAAA-MM-DD requerido.");
  continue;
}`
        },
        {
          id: 2,
          titulo: "Confirmaciones y Cancelaciones",
          descripcion:
            "La tecla Enter o Ctrl+C permiten abortar una acción completa. Esto le da al usuario un control suave sobre el flujo.",
          codigo: `if (input === null || input === '') {
  return undefined; // Cancelar / omitir
}`
        }
      ]
    }
  }
},

"constantes.js": {
  descripcion: "El diccionario del sistema. Centraliza la configuración, el vocabulario y previene el uso de valores mágicos.",
  paradigmas: {

    estructurada: {
      titulo: "Datos Globales Controlados",
      pasos: [
        {
          id: 1,
          titulo: "Constantes Definidas",
          descripcion: "En el paradigma estructurado, este módulo actúa como el 'sector de configuración'. Se declaran listas de valores válidos para estados, dificultades y otras categorías que el programa utiliza.",
          codigo: `export const ESTADOS = { PENDIENTE: 'Pendiente', EN_CURSO: 'En Curso', ... };`
        },
        {
          id: 2,
          titulo: "Evita Magic Strings",
          descripcion: "En vez de escribir 'Pendiente' en 20 partes distintas, se referencia ESTADOS.PENDIENTE. Eso previene errores humanos y hace más fácil cambiar nombres globalmente.",
          codigo: `if (tarea.estado === ESTADOS.CANCELADA) { ... }`
        }
      ]
    },

    objetos: {
      titulo: "Enums y Encapsulación",
      pasos: [
        {
          id: 1,
          titulo: "Pseudo-Enums Inmutables",
          descripcion: "Usamos objetos congelados para simular enums. Son un patrón clásico de JS antes de que existieran enums reales.",
          codigo: `export const DIFICULTADES = Object.freeze({ FACIL: 'Facil', MEDIA: 'Media', ... });`
        },
        {
          id: 2,
          titulo: "Representación de Dominio",
          descripcion: "Los objetos representan conceptos abstractos del dominio: «estado», «nivel», «dificultad», etc.",
          codigo: `console.log(ESTADOS.TERMINADA); // 'Terminada'`
        }
      ]
    },

    funcional: {
      titulo: "Datos Inmutables y Funciones Puras",
      pasos: [
        {
          id: 1,
          titulo: "Inmutabilidad Garantizada",
          descripcion: "Object.freeze permite que las funciones puras trabajen sin riesgo de mutación externa. Es decir: ESTADOS jamás cambia.",
          codigo: `Object.freeze(ESTADOS); // Evita escritura accidental`
        },
        {
          id: 2,
          titulo: "Mapas de Orden como Funciones",
          descripcion: "Los valores numéricos (DIFICULTADES_ORDEN) permiten crear funciones puras para ordenar sin modificar listas originales.",
          codigo: `lista.sort((a,b) => DIFICULTADES_ORDEN[a.dificultad] - DIFICULTADES_ORDEN[b.dificultad]);`
        },
        {
          id: 3,
          titulo: "Funciones utilitarias puras",
          descripcion: "Ejemplo: getHoy retorna una nueva fecha siempre igual, sin efectos secundarios.",
          codigo: `const hoy = getHoy(); // '2025-11-27'`
        }
      ]
    },

    logica: {
      titulo: "Átomos del Lenguaje del Sistema",
      pasos: [
        {
          id: 1,
          titulo: "Vocabulario Controlado",
          descripcion: "Los valores del sistema (Pendiente, En Curso, etc.) funcionan como 'átomos' en el sentido lógico: términos indivisibles sobre los que se construyen reglas.",
          codigo: `// Reglas de validación: solo son válidos los elementos de ESTADOS`
        },
        {
          id: 2,
          titulo: "Diccionario Coherente",
          descripcion: "Las funciones de validación verifican pertenencia a este vocabulario, evitando estados inválidos («Hecho», «Listo», etc.).",
          codigo: `if (!Object.values(ESTADOS).includes(valor)) throw new Error('Estado inválido');`
        }
      ]
    }
  }
},

  "tareas.json": {
  descripcion: "La memoria permanente del sistema. Guarda la versión final del objeto después de pasar por los 4 paradigmas.",
  paradigmas: {
    
    estructurada: {
      titulo: "Entrada y Flujo Secuencial",
      pasos: [
        {
          id: 1,
          titulo: "Captura de Datos",
          descripcion: "Los valores ingresados por el usuario (título, descripción, dificultad, vencimiento) se guardan tal como entraron en el flujo estructurado.",
          codigo: `{
  "titulo": "estudiar para el final",
  "descripcion": "",
  "dificultad": "Facil",
  "vencimiento": "2025-12-01"
}`
        },
        {
          id: 2,
          titulo: "Orden Determinista",
          descripcion: "El flujo estructurado garantiza que la tarea recibe datos válidos en el orden correcto.",
          codigo: `// pedirTitulo() → pedirDificultad() → pedirVencimiento()`
        }
      ]
    },

    objetos: {
      titulo: "Instancias y Estado Interno",
      pasos: [
        {
          id: 1,
          titulo: "Construcción del Objeto",
          descripcion: "El constructor de la clase Tarea define propiedades internas, genera ID y fecha de creación.",
          codigo: `{
  "id": "uuid()",
  "creacion": "2025-11-20T11:00:00.000Z",
  "eliminado": false
}`
        },
        {
          id: 2,
          titulo: "Serialización",
          descripcion: "El objeto instanciado se convierte en un JSON plano que se guarda sin métodos ni prototipos.",
          codigo: `// JSON.stringify(tarea)`
        }
      ]
    },

    funcional: {
      titulo: "Transformaciones Puras",
      pasos: [
        {
          id: 1,
          titulo: "Versión Actualizada del Objeto",
          descripcion: "Cada cambio produce una nueva copia del objeto con su 'ultimaEdicion' modificada.",
          codigo: `{
  ...tarea,
  "estado": "En Curso",
  "ultimaEdicion": "2025-11-21T13:40:00.000Z"
}`
        },
        {
          id: 2,
          titulo: "Datos Inmutables",
          descripcion: "El archivo funciona como una fuente de datos pura para las funciones de filtrado, mapeo y ordenamiento.",
          codigo: `tareas.filter(t => t.estado === "Pendiente")`
        }
      ]
    },

    logica: {
      titulo: "Hechos y Reglas del Sistema",
      pasos: [
        {
          id: 1,
          titulo: "Hechos Registrados",
          descripcion: "Cada entrada del JSON funciona como un 'hecho' que el motor lógico utiliza para validar operaciones.",
          codigo: `// Hecho: tarea.eliminado === false`
        },
        {
          id: 2,
          titulo: "Reglas de Coherencia",
          descripcion: "La lógica determina si un cambio es válido antes de que el JSON sea actualizado.",
          codigo: `// Regla: no se puede editar si eliminado = true`
        }
      ]
    }
  }
}

};