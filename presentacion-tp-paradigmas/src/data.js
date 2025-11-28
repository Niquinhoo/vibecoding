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
            "codigo": "import fs from 'fs';\nimport { Tarea } from './Tarea.js';\nimport * as Menu from '../io/ManejoMenu.js';\nimport * as Inputs from '../io/ManejoInput.js';",
            "salida": ">>> Cargando módulos...\n✓ fs importado\n✓ Tarea importada\n✓ Módulos de Menú e Inputs disponibles"
          },
          {
            "id": 2,
            "titulo": "Variables Globales Controladas",
            "descripcion": "En programación estructurada, el estado global se usa cuando es necesario representar el estado del sistema completo. Aquí `estadoApp` concentra la Base de Hechos cargada desde el archivo.",
            "codigo": "let estadoApp = []; // Lista principal de tareas en memoria",
            "salida": ">>> Estado inicializado\nestadoApp = []"
          },
          {
            "id": 3,
            "titulo": "Funciones como Procedimientos Claros",
            "descripcion": "Cada función es un procedimiento lineal que realiza una tarea en pasos previsibles: cargar, guardar, crear, modificar.",
            "codigo": "function cargarTareas() {\n  try {\n    const data = fs.readFileSync(RUTA_BD, 'utf-8');\n    const json = JSON.parse(data);\n    estadoApp = json.map(j => Tarea.fromJSON(j));\n  } catch(e) {\n    estadoApp = []; // Vuelve a un estado válido\n  }\n}",
            "salida": ">>> Ejecutando cargarTareas()\nArchivo leído: tareas.json\nTareas cargadas: 12\nInstancias restauradas correctamente"
          },
          {
            "id": 4,
            "titulo": "Control de Flujo Centralizado (Switch)",
            "descripcion": "La lógica estructurada privilegia la claridad: un switch–case orquesta las operaciones dependiendo de la acción del usuario. Esto permite seguir el flujo del programa como si fuera un diagrama de caja.",
            "codigo": "switch(opcion) {\n  case '1': casoCrearTarea(); break;\n  case '2': casoListarTareasDetalle(); break;\n  case '3': casoModificarTarea(); break;\n  case '4': casoEliminarTarea(); break;\n  case '5': casoOrdenarTareas(); break;\n  case '6': casoReportes(); break;\n}",
            "salida": ">>> Usuario seleccionó opción: 2\n→ Ejecutando casoListarTareasDetalle()\n(Se muestran todas las tareas en pantalla)"
          },
          {
            "id": 5,
            "titulo": "El Game Loop (While Continuo)",
            "descripcion": "El bucle continuo `while (continuar)` es el corazón del paradigma estructurado: un lazo principal que ejecuta la lógica paso por paso hasta que el usuario solicite salir.",
            "codigo": "while (continuar) {\n  Menu.displayMenu();\n  const opcion = Inputs.solicitarOpcionMenu();\n  procesar(opcion);\n}",
            "salida": ">>> Mostrando menú...\n1. Crear tarea\n2. Listar tareas\n3. Modificar\n4. Eliminar\n5. Ordenar\n6. Reportes\n>>> Ingrese opción: _"
          },
          {
            "id": 6,
            "titulo": "Manejo de Errores (Try/Catch)",
            "descripcion": "En programación estructurada, los errores deben manejarse para garantizar que el programa no muera en mitad del flujo.",
            "codigo": "try {\n  fs.writeFileSync(RUTA_BD, json);\n} catch (error) {\n  Menu.logError('No se pudo guardar.');\n}",
            "salida": ">>> Guardando cambios...\n✓ Archivo guardado correctamente"
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
            "codigo": "estadoApp = tareasJSON.map(json => Tarea.fromJSON(json));",
            "salida": ">>> Restaurando instancias...\nSe reconstruyeron 12 objetos Tarea con métodos funcionales."
          },
          {
            "id": 2,
            "titulo": "Encapsulamiento y Delegación",
            "descripcion": "Index actúa como un director: llama a `tarea.modificar()` sin preocuparse por cómo cambia internamente.",
            "codigo": "tarea.modificar(cambios); // Lógica OOP interna",
            "salida": ">>> Modificando tarea #A33F\nCambios aplicados correctamente (4 campos actualizados)"
          },
          {
            "id": 3,
            "titulo": "Instanciación y Representación",
            "descripcion": "Index nunca crea estructuras planas. Siempre crea instancias plenas con métodos, atributos y validaciones.",
            "codigo": "const nueva = new Tarea(props);",
            "salida": ">>> Nueva instancia creada:\nTarea { id: 'B77F', titulo: 'Ir al gym', estado: 'Pendiente' }"
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
            "codigo": "let resultado = filtrarTareasActivas(estadoApp);\nresultado = buscarPorTitulo(resultado, termino);",
            "salida": ">>> Filtrando tareas activas...\nResultado: 8 tareas activas\n>>> Buscando por título: \"comprar\"\nCoincidencias: 2"
          },
          {
            "id": 2,
            "titulo": "Programación Declarativa",
            "descripcion": "El index expresa 'qué' quiere lograr, no 'cómo'. Ej: filtrar, mapear, ordenar.",
            "codigo": "const ordenadas = ordenarTareasPor(lista, criterio);",
            "salida": ">>> Ordenando tareas por: fecha\nTotal: 12 tareas ordenadas correctamente"
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
            "codigo": "const vencidas = encontrarTareasVencidas(activas);",
            "salida": ">>> Consultando tareas vencidas...\nSe encontraron: 3 tareas vencidas"
          },
          {
            "id": 2,
            "titulo": "Relaciones entre Hechos",
            "descripcion": "Se deducen tareas relacionadas según similitudes o conexiones implícitas.",
            "codigo": "const relacionadas = encontrarTareasRelacionadas(activas, tareaSeleccionada);",
            "salida": ">>> Buscando tareas relacionadas a: \"Entregar TP\"\n2 tareas relacionadas encontradas"
          },
          {
            "id": 3,
            "titulo": "Sistema Híbrido",
            "descripcion": "Index ejecuta reglas lógicas como consultas, pero sin modificar la BD.",
            "codigo": "Menu.displayTaskList(relacionadas);",
            "salida": ">>> Mostrando en pantalla 2 tareas relacionadas:\n- Revisar bibliografía\n- Corregir formato"
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
            "codigo": "if (!props.titulo || typeof props.titulo !== 'string' || props.titulo.trim().length === 0) {\n  throw new Error('El \"titulo\" es obligatorio.');\n}\nif (props.titulo.length > 100) {\n  throw new Error('El \"titulo\" no puede exceder los 100 caracteres.');\n}\nif (props.descripcion && props.descripcion.length > 500) {\n  throw new Error('La \"descripcion\" no puede exceder 500 caracteres.');\n}",
            "salida": ">>> new Tarea({ titulo: '' })\nError: El \"titulo\" es obligatorio.\n\n>>> new Tarea({ titulo: 'Aprender React' })\nValidación correcta. Continúa el constructor."
          },
          {
            "id": 2,
            "titulo": "Validaciones Aplicando Constantes",
            "descripcion": "Se usan listas cerradas (enumeraciones) para validar estados y dificultades.",
            "codigo": "const dificultadValida = props.dificultad && Object.values(DIFICULTADES).includes(props.dificultad);",
            "salida": ">>> props.dificultad = 'Dios'\n>>> Object.values(DIFICULTADES)\n['Facil','Media','Dificil']\n\n>>> dificultadValida\nfalse"
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
            "codigo": "this.id = randomUUID();",
            "salida": ">>> const t = new Tarea({ titulo: 'Estudiar' })\n>>> t.id\n'a1e7b3c4-8f91-4e01-a2d4-998fb14b9c77'"
          },
          {
            "id": 2,
            "titulo": "Atributos Internos Encapsulados",
            "descripcion": "El constructor inicializa todo el estado interno, asegurando que el objeto siempre esté en un estado válido.",
            "codigo": "this.titulo = props.titulo.trim();\nthis.descripcion = props.descripcion || '';\nthis.estado = ESTADOS.PENDIENTE;\nthis.dificultad = dificultadValida ? props.dificultad : DIFICULTADES.FACIL;",
            "salida": ">>> const t = new Tarea({ titulo: '   Dormir   ', descripcion: null })\n>>> t.titulo\n'Dormir'\n>>> t.estado\n'Pendiente'\n>>> t.dificultad\n'Facil'"
          },
          {
            "id": 3,
            "titulo": "Método Mutable: modificar()",
            "descripcion": "Permite actualizar atributos específicos. Respeta el encapsulamiento y valida usando constantes del dominio.",
            "codigo": "Tarea.prototype.modificar = function(cambios) {\n  if (cambios.titulo) this.titulo = cambios.titulo;\n  if (cambios.descripcion) this.descripcion = cambios.descripcion;\n  if (cambios.estado && Object.values(ESTADOS).includes(cambios.estado)) this.estado = cambios.estado;\n  if (cambios.dificultad && Object.values(DIFICULTADES).includes(cambios.dificultad)) this.dificultad = cambios.dificultad;\n  if (cambios.vencimiento !== undefined) this.vencimiento = cambios.vencimiento;\n\n  this.ultimaEdicion = new Date();\n};",
            "salida": ">>> t.modificar({ estado: 'Terminada', titulo: 'Dormir siesta' })\n>>> t.estado\n'Terminada'\n>>> t.titulo\n'Dormir siesta'\n>>> t.ultimaEdicion instanceof Date\ntrue"
          },
          {
            "id": 4,
            "titulo": "Soft Delete",
            "descripcion": "El objeto conserva su identidad aunque esté marcado como eliminado. Esto permite historial y auditoría.",
            "codigo": "Tarea.prototype.marcarEliminada = function() {\n  this.eliminado = true;\n  this.ultimaEdicion = new Date();\n};",
            "salida": ">>> t.marcarEliminada()\n>>> t.eliminado\ntrue\n>>> t.id\n'a1e7b3c4-8f91-4e01-a2d4-998fb14b9c77'   // se mantiene la identidad"
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
            "codigo": "Tarea.prototype.toJSON = function() {\n  return {\n    id: this.id,\n    titulo: this.titulo,\n    descripcion: this.descripcion,\n    estado: this.estado,\n    dificultad: this.dificultad,\n    creacion: this.creacion.toISOString(),\n    ultimaEdicion: this.ultimaEdicion.toISOString(),\n    vencimiento: this.vencimiento ? this.vencimiento.toISOString() : null,\n    eliminado: this.eliminado,\n  };\n};",
            "salida": ">>> t.toJSON()\n{\n  id: 'a1e7b3c4-8f91-4e01-a2d4-998fb14b9c77',\n  titulo: 'Dormir siesta',\n  descripcion: '',\n  estado: 'Terminada',\n  dificultad: 'Facil',\n  creacion: '2025-11-20T11:00:00.000Z',\n  ultimaEdicion: '2025-11-21T09:33:10.123Z',\n  vencimiento: null,\n  eliminado: true\n}"
          },
          {
            "id": 2,
            "titulo": "Rehidratación desde JSON",
            "descripcion": "Transforma una estructura plana en una instancia funcional con métodos y fechas restauradas. Esto es un 'constructor funcional'.",
            "codigo": "Tarea.fromJSON = function(data) {\n  const tarea = new Tarea({ titulo: data.titulo });\n  Object.assign(tarea, {\n    ...data,\n    creacion: new Date(data.creacion),\n    ultimaEdicion: new Date(data.ultimaEdicion),\n    vencimiento: data.vencimiento ? new Date(data.vencimiento) : null,\n  });\n  return tarea;\n};",
            "salida": ">>> const copia = Tarea.fromJSON(jsonGuardado)\n>>> copia instanceof Tarea\ntrue\n>>> copia.creacion instanceof Date\ntrue\n>>> copia.titulo\n'Dormir siesta'"
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
            "codigo": "Tarea.prototype.estaVencida = function() {\n  if (!this.vencimiento || this.estado === ESTADOS.TERMINADA) return false;\n  const hoy = new Date().setHours(0,0,0,0);\n  const venc = new Date(this.vencimiento).setHours(0,0,0,0);\n  return venc < hoy;\n};",
            "salida": ">>> t.vencimiento = '2025-01-01'\n>>> t.estado = 'Pendiente'\n>>> t.estaVencida()\ntrue"
          }
        ]
      }
    }
  },

  "ServiciosTarea.js": {
    "descripcion": "El motor de procesamiento funcional del sistema. Opera mediante transformaciones puras, ordenamientos, filtros, combinaciones de predicados y cálculos basados en HOFs.",
    "paradigmas": {
      "estructurada": {
        "titulo": "Algoritmos de Selección y Control Estructurado",
        "pasos": [
          {
            "id": 1,
            "titulo": "Estructura de Selección: Switch",
            "descripcion": "El flujo se divide en casos mutuamente excluyentes según el criterio recibido. Es un control determinista propio del paradigma estructurado.",
            "codigo": "export const ordenarTareasPor = (lista, criterio) => {\n  const copia = [...lista];\n\n  switch (criterio) {\n    case 'titulo':\n      return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));\n\n    case 'creacion':\n      return copia.sort((a, b) => a.creacion - b.creacion);\n\n    case 'dificultad':\n      return copia.sort((a, b) => DIFICULTADES_ORDEN[a.dificultad] - DIFICULTADES_ORDEN[b.dificultad]);\n\n    default:\n      return copia;\n  }\n};",
            "salida": "ordenarTareasPor(lista, 'titulo') → [ 'Comprar comida', 'Estudiar para el parcial', 'Lavar la ropa' ]"
          },
          {
            "id": 2,
            "titulo": "Flujo Secuencial Determinístico",
            "descripcion": "El algoritmo sigue tres pasos lineales y previsibles: copiar → procesar → retornar. No hay ramas ocultas ni efectos colaterales.",
            "codigo": "// Flujo Secuencial\nconst copia = [...lista];\nconst ordenada = copia.sort((a, b) => a.titulo.localeCompare(b.titulo));\nreturn ordenada;",
            "salida": "Secuencia ejecutada: Copia creada → Orden aplicado → Resultado devuelto"
          }
        ]
      },
      "objetos": {
        "titulo": "Acceso a Propiedades del Modelo Objeto",
        "pasos": [
          {
            "id": 1,
            "titulo": "Consumo de Propiedades",
            "descripcion": "El módulo toma atributos directamente desde instancias de Tarea. No las modifica, solo las usa para clasificar o sumarizar.",
            "codigo": "const estado = tarea.estado;\nacumulador.estados[estado] = (acumulador.estados[estado] || 0) + 1;",
            "salida": "{ Pendiente: 4, Terminada: 2 }"
          },
          {
            "id": 2,
            "titulo": "Dependencia del Molde del Objeto",
            "descripcion": "Las funciones asumen la estructura de Tarea: campos como estado, dificultad o título deben existir según el modelo.",
            "codigo": "lista.filter(t => t.estado === 'Pendiente' && t.dificultad === 'Dificil');",
            "salida": "[ Tarea#1234: 'Revisar informe', dificultad='Dificil' ]"
          }
        ]
      },
      "funcional": {
        "titulo": "Transformaciones Puras, HOFs e Inmutabilidad",
        "pasos": [
          {
            "id": 1,
            "titulo": "Inmutabilidad",
            "descripcion": "La lista original jamás se modifica. Se trabaja sobre copias para garantizar pureza incluso en operaciones mutables.",
            "codigo": "export const ordenarTareasPor = (lista, criterio) => {\n  const copia = [...lista];\n  return copia.sort((a, b) => a.titulo.localeCompare(b.titulo));\n};",
            "salida": "// listaOriginal está intacta\n// copiaOrdenada es una nueva referencia\ntrue"
          },
          {
            "id": 2,
            "titulo": "Higher Order Functions",
            "descripcion": "Métodos como map, filter y reduce permiten expresar transformaciones declarativas sin modificar estado.",
            "codigo": "return lista\n  .filter(t => !t.eliminado)\n  .sort((a, b) => a.titulo.localeCompare(b.titulo));",
            "salida": "[ 'Comprar comida', 'Estudiar', 'Pagar servicios' ]"
          },
          {
            "id": 3,
            "titulo": "Reducción (reduce)",
            "descripcion": "El cálculo de estadísticas resume toda la lista en un único objeto acumulador.",
            "codigo": "export const calcularEstadisticas = (lista) => {\n  return lista.reduce((acc, tarea) => {\n    acc.estados[tarea.estado] = (acc.estados[tarea.estado] || 0) + 1;\n    acc.dificultades[tarea.dificultad] = (acc.dificultades[tarea.dificultad] || 0) + 1;\n    return acc;\n  }, { estados: {}, dificultades: {} });\n};",
            "salida": "{ estados: { Pendiente: 3, Terminada: 1 }, dificultades: { Facil: 2, Media: 1, Dificil: 1 } }"
          },
          {
            "id": 4,
            "titulo": "Pureza Total",
            "descripcion": "Todas las funciones dependen solo de parámetros. Sin efectos secundarios, sin I/O, sin variación de estado.",
            "codigo": "export const buscarPorTitulo = (lista, texto) =>\n  lista.filter(t => t.titulo.toLowerCase().includes(texto.toLowerCase()));",
            "salida": "buscarPorTitulo(lista, 'lav') → [ 'Lavar la ropa' ]"
          }
        ]
      },
      "logica": {
        "titulo": "Predicados y Definición Lógica de Conjuntos",
        "pasos": [
          {
            "id": 1,
            "titulo": "Definición de Conjuntos",
            "descripcion": "Cada predicado es una regla lógica que decide si una tarea pertenece al conjunto resultante.",
            "codigo": "export const filtrarTareasActivas = (lista) => {\n  return lista.filter(t => !t.eliminado);\n};",
            "salida": "filtrarTareasActivas(lista) → [ tareas sin eliminar ]"
          },
          {
            "id": 2,
            "titulo": "Predicados Declarativos",
            "descripcion": "Condiciones booleanas expresadas sin necesidad de mutación intermedia.",
            "codigo": "t => t.estado === 'Pendiente' && t.vencimiento !== null",
            "salida": "true // ejemplo: una tarea pendiente con fecha definida"
          },
          {
            "id": 3,
            "titulo": "Reglas Encadenadas",
            "descripcion": "Los predicados se combinan para crear filtros complejos.",
            "codigo": "lista\n  .filter(t => !t.eliminado)\n  .filter(t => t.estado === estado)\n  .filter(t => t.titulo.includes(texto));",
            "salida": "[ 'Estudiar para el parcial' ]"
          }
        ]
      }
    }
  },

  "LogicaTareas.js": {
    "descripcion": "El motor lógico de la aplicación: define Predicados (funciones booleanas) y Reglas (consultas lógicas que infieren información sobre la base de hechos). Este módulo representa el paradigma lógico: declara relaciones y condiciones sin modificar datos.",
    "paradigmas": {
      "estructurada": {
        "titulo": "Base de Conocimiento Organizada Secuencialmente",
        "pasos": [
          {
            "id": 1,
            "titulo": "Definición de Constantes — Átomos del Dominio",
            "descripcion": "Se importan constantes que forman la base de hechos estáticos del sistema. Son los valores fundamentales sobre los cuales se formulan predicados y reglas.",
            "codigo": "import { DIFICULTADES, ESTADOS } from '../utils/constantes.js';",
            "salida": "console.log(DIFICULTADES);\n// { FACIL: 'Facil', MEDIA: 'Media', DIFICIL: 'Dificil' }"
          },
          {
            "id": 2,
            "titulo": "Estructura del Módulo en Pasos Lógicos",
            "descripcion": "Primero se definen predicados (funciones base), luego las reglas (consultas). La estructura refleja un diseño secuencial estrictamente ordenado.",
            "codigo": "// 1) Predicados base\nconst estaVencida = (tarea) => tarea.estado !== ESTADOS.TERMINADA && tarea.vencimiento < Date.now();\n\n// 2) Regla\nexport const encontrarTareasVencidas = (lista) => lista.filter(estaVencida);",
            "salida": "const lista = [{ titulo: 'TP', estado: 'Pendiente', vencimiento: 0 }];\nconsole.log(encontrarTareasVencidas(lista));\n// [ { titulo: 'TP', estado: 'Pendiente', vencimiento: 0 } ]"
          }
        ]
      },
      "objetos": {
        "titulo": "Delegación, Mensajes y Encapsulamiento",
        "pasos": [
          {
            "id": 1,
            "titulo": "Delegación del Comportamiento al Objeto",
            "descripcion": "El predicado no calcula nada por sí mismo: llama al método del objeto. Aquí se ve que la lógica pertenece a la instancia, no al módulo.",
            "codigo": "const estaVencida = (tarea) => {\n  return tarea.estaVencida(); // mensaje a un objeto\n};",
            "salida": "console.log( estaVencida({ estaVencida: () => true }) );\n// true"
          },
          {
            "id": 2,
            "titulo": "Acceso a Propiedades Encapsuladas",
            "descripcion": "Otros predicados leen atributos encapsulados del objeto, manteniendo el estilo OOP dentro de un módulo funcional.",
            "codigo": "const esRelacionada = (t, objetivo) => \n  t.dificultad === objetivo.dificultad && !t.eliminado;",
            "salida": "console.log(\n  esRelacionada(\n    { dificultad: 'Dificil', eliminado: false },\n    { dificultad: 'Dificil' }\n  )\n);\n// true"
          }
        ]
      },
      "funcional": {
        "titulo": "Funciones Puras, Predicados y Transformación",
        "pasos": [
          {
            "id": 1,
            "titulo": "Predicados Puras",
            "descripcion": "Reciben una tarea y devuelven un booleano. No modifican nada — son deterministas.",
            "codigo": "const esPrioritaria = (tarea) => {\n  return tarea.dificultad === DIFICULTADES.DIFICIL \n      && tarea.estado !== ESTADOS.TERMINADA;\n};",
            "salida": "console.log( esPrioritaria({ dificultad: 'Dificil', estado: 'Pendiente' }) );\n// true"
          },
          {
            "id": 2,
            "titulo": "Uso de Higher-Order Functions (filter)",
            "descripcion": "Las consultas se construyen componiendo predicados + filter. Patrón funcional clásico.",
            "codigo": "export const encontrarTareasVencidas = (lista) =>\n  lista.filter(estaVencida);",
            "salida": "const lista = [ { vencimiento: 0, estado: 'Pendiente' } ];\nconsole.log( encontrarTareasVencidas(lista) );\n// [ { vencimiento: 0, estado: 'Pendiente' } ]"
          },
          {
            "id": 3,
            "titulo": "Inmutabilidad",
            "descripcion": "Las reglas generan nuevas listas sin alterar la original. Pureza total.",
            "codigo": "// No se muta la lista original:\nreturn lista.filter(esPrioritaria);",
            "salida": "const lista = [ { dificultad: 'Dificil', estado: 'Pendiente' } ];\nconst nuevas = lista.filter(x => true);\nconsole.log(lista);\n// [ { dificultad: 'Dificil', estado: 'Pendiente' } ]"
          }
        ]
      },
      "logica": {
        "titulo": "Inferencia Declarativa y Base de Hechos",
        "pasos": [
          {
            "id": 1,
            "titulo": "Consultas Declarativas",
            "descripcion": "Una regla responde una pregunta: ¿qué elementos cumplen este predicado?",
            "codigo": "export const encontrarTareasVencidas = (lista) => {\n  return lista.filter(estaVencida);\n};",
            "salida": "console.log(\n  encontrarTareasVencidas([\n    { vencimiento: 0, estado: 'Pendiente' },\n    { vencimiento: 99999999999, estado: 'Pendiente' }\n  ])\n);\n// [ { vencimiento: 0, estado: 'Pendiente' } ]"
          },
          {
            "id": 2,
            "titulo": "Relaciones Lógicas",
            "descripcion": "Se establecen relaciones entre hechos para consultar información más compleja.",
            "codigo": "const esRelacionada = (tarea, objetivo) => {\n  return (\n    tarea.id !== objetivo.id &&\n    !tarea.eliminado &&\n    tarea.dificultad === objetivo.dificultad\n  );\n};",
            "salida": "console.log(\n  esRelacionada(\n    { id: 1, dificultad: 'Media', eliminado: false },\n    { id: 2, dificultad: 'Media' }\n  )\n);\n// true"
          },
          {
            "id": 3,
            "titulo": "Reglas Construidas con Conjunción de Predicados",
            "descripcion": "Reglas más complejas se forman combinando predicados como proposiciones lógicas.",
            "codigo": "// T es relevante si esPrioritaria(T) && estaVencida(T)\nconst esRelevante = (t) => esPrioritaria(t) && estaVencida(t);",
            "salida": "console.log(\n  esRelevante({ \n    dificultad: 'Dificil', \n    estado: 'Pendiente', \n    vencimiento: 0\n  })\n);\n// true"
          },
          {
            "id": 4,
            "titulo": "Mini Sistema Experto: Base de Hechos + Reglas",
            "descripcion": "La lista es la base de hechos; las reglas derivan conclusiones sin modificarla.",
            "codigo": "const resultados = lista.filter(predicado);",
            "salida": "const lista = [1,2,3,4];\nconst predicado = x => x % 2 === 0;\nconsole.log( lista.filter(predicado) );\n// [ 2, 4 ]"
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
            "codigo": "export const displayMenu = () => {\n    console.clear();\n    console.log(\"==============================\");\n    console.log(\"   Gestor de Tareas (CLI)\");\n    console.log(\"==============================\");\n    console.log(\"1. Crear Tarea\");\n    console.log(\"2. Listar Tareas\");\n    console.log(\"0. Salir\");\n};",
            "salida": "==============================\n   Gestor de Tareas (CLI)\n==============================\n1. Crear Tarea\n2. Listar Tareas\n0. Salir"
          },
          {
            "id": 2,
            "titulo": "Subrutinas Encadenadas",
            "descripcion": "Cada opción del menú desemboca en otra rutina específica (`displayTaskDetails`, `displayStatistics`, etc.). Esto refleja un diseño estructurado tradicional basado en descomposición funcional.",
            "codigo": "// Ejemplo: el menú llama a otras rutinas\nif (opcion === 2) displayTaskList(tasks);",
            "salida": "displayTaskList(tasks) // Se ejecuta la rutina de listado"
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
            "codigo": "const EMOJIS_DIFICULTAD = {\n    [DIFICULTADES.FACIL]: '🟢 (Fácil)',\n    [DIFICULTADES.MEDIA]: '🟡 (Media)',\n    [DIFICULTADES.DIFICIL]: '🔴 (Difícil)'\n};",
            "salida": "{ FACIL: '🟢 (Fácil)', MEDIA: '🟡 (Media)', DIFICIL: '🔴 (Difícil)' }"
          },
          {
            "id": 2,
            "titulo": "Colaboración con Objetos del Modelo",
            "descripcion": "La función `displayTaskDetails` se apoya en los métodos de instancia de las tareas (`tarea.estaVencida()`). La UI no implementa la lógica: solo consulta al objeto. Esto sigue el principio de Responsabilidad Única.",
            "codigo": "console.log(`  ¿Vencida?: ${task.estaVencida() ? 'Sí' : 'No'}`);",
            "salida": "  ¿Vencida?: Sí"
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
            "codigo": "tasks.forEach(task => displayTaskDetails(task));",
            "salida": ">> Se llama displayTaskDetails(task) para cada tarea"
          },
          {
            "id": 2,
            "titulo": "Formateo Inmutable",
            "descripcion": "Aunque este módulo produce efectos, nunca modifica objetos existentes. Solo lee datos del modelo y genera una representación textual, manteniendo la idea funcional de datos inmutables.",
            "codigo": "// Ejemplo: solo lectura, sin mutación\ntask.creacion.toISOString();",
            "salida": "\"2025-03-21T14:52:00.000Z\""
          }
        ]
      },
      "logica": {
        "titulo": "Validación, Guardas y Reglas de Visualización",
        "pasos": [
          {
            "id": 1,
            "titulo": "Guard Clauses (Reglas Lógicas Previas)",
            "descripcion": "Antes de mostrar tareas, el módulo valida condiciones previas: si no hay tareas, no tiene sentido iterar. Técnica tomada del razonamiento lógico: si no se cumple la condición, no se evalúa el resto.",
            "codigo": "if (tasks.length === 0) {\n    console.log(\"No hay tareas para mostrar\");\n    return;\n}",
            "salida": "No hay tareas para mostrar"
          },
          {
            "id": 2,
            "titulo": "Reglas Visuales como Consecuencias",
            "descripcion": "La UI aplica reglas deterministas para mostrar elementos según sus propiedades. Ejemplo: una dificultad determina un emoji asociado. Esto es inferencia simple: si X → entonces usar Y.",
            "codigo": "const label = EMOJIS_DIFICULTAD[dificultad] || dificultad;",
            "salida": "🔴 (Difícil)"
          },
          {
            "id": 3,
            "titulo": "Cálculo de porcentajes como inferencia",
            "descripcion": "En `displayStatistics`, el módulo interpreta la base de datos (stats) y genera conclusiones visuales (porcentajes, totales). No produce datos nuevos, sino representaciones derivadas.",
            "codigo": "console.log(` - ${estado}: ${data.cantidad} (${data.porcentaje}%)`);",
            "salida": " - Pendiente: 4 (40%)"
          }
        ]
      }
    }
  },
"ManejoInput.js": {
  "descripcion": "El controlador de entrada. Este módulo opera como interfaz entre el usuario y el sistema. Valida, transforma y asegura que los datos ingresados sean correctos antes de llegar al núcleo del programa.",
  "paradigmas": {

    // -------------------------------------------------------------------------
    // PARADIGMA ESTRUCTURADA
    // -------------------------------------------------------------------------
    "estructurada": {
      "titulo": "Captura Imperativa",
      "pasos": [
        {
          "id": 1,
          "titulo": "Solicitud en Secuencia Determinada",
          "descripcion":
            "El sistema ejecuta una sucesión estricta de pasos. El programa se detiene hasta recibir datos válidos. Refleja el modelo clásico imperativo/estructurado.",
          "codigo": "export const solicitarPropsCreacion = () => {\n  console.clear();\n  console.log(\"-- Crear nueva tarea --\");\n\n  const titulo = _solicitarStringNoVacio(\"Título: \");\n  const descripcion = _solicitarStringOpcional(\"Descripción: \");\n  const dificultad = solicitarDificultad(\"Dificultad: \");\n  const vencimiento = solicitarVencimiento(\"Vencimiento (AAAA-MM-DD): \");\n\n  return { titulo, descripcion, dificultad, vencimiento };\n};",
          "salida": `-- Crear nueva tarea --
Título: estudiar para el final
Descripción: 
Dificultad: 1
(1) Fácil | (2) Media | (3) Difícil
Vencimiento (AAAA-MM-DD): 2025-12-01

>> Resultado final devuelto:
{
  titulo: "estudiar para el final",
  descripcion: "",
  dificultad: "Facil",
  vencimiento: "2025-12-01"
}`
        },
        {
          "id": 2,
          "titulo": "Estructuras de Control",
          "descripcion":
            "Se usan bucles (`while`) y condiciones (`if`). El flujo estructurado impide que el sistema siga adelante sin una entrada válida.",
          "codigo": "let valor;\ndo {\n  valor = prompt(\"Ingrese título: \");\n  if (!valor.trim()) {\n    console.log(\"❌ No puede estar vacío.\");\n  }\n} while (!valor.trim());",
          "salida": `Ingrese título: 
❌ No puede estar vacío.
Ingrese título: 
❌ No puede estar vacío.
Ingrese título: estudiar logica
>> valor final aceptado: "estudiar logica"`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // PARADIGMA ORIENTADO A OBJETOS
    // -------------------------------------------------------------------------
    "objetos": {
      "titulo": "Wrappers, Helpers y Colaboración con Modelos",
      "pasos": [
        {
          "id": 1,
          "titulo": "Encapsulación de la Biblioteca Externa",
          "descripcion":
            "prompt-sync se esconde detrás de helpers privados. Ningún módulo externo sabe que prompt-sync existe; solo interactúan con funciones declaradas.",
          "codigo": "import promptSync from 'prompt-sync';\nconst prompt = promptSync({ sigint: true });\n\nexport const _solicitarStringOpcional = (msg) => prompt(msg);",
          "salida": `Descripción: estudiar arrays
>> _solicitarStringOpcional retorna: "estudiar arrays"`
        },
        {
          "id": 2,
          "titulo": "Colaboración con el Objeto Tarea",
          "descripcion":
            "Las funciones operan sobre instancias de clases. ManejoInput no gestiona lógica de negocio: solo dialoga con el objeto.",
          "codigo": "export const solicitarPropsModificacion = (tarea) => {\n  const nuevoTitulo = prompt(`Título [${tarea.titulo}]: `);\n  if (nuevoTitulo) tarea.titulo = nuevoTitulo;\n  return tarea;\n};",
          "salida": `Título [estudiar para el final]: estudiar para el final con walter
>> tarea modificada:
{
  id: "a1b2...",
  titulo: "estudiar para el final con walter",
  ...
}`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // PARADIGMA FUNCIONAL
    // -------------------------------------------------------------------------
    "funcional": {
      "titulo": "Entrada como Transformación Pura",
      "pasos": [
        {
          "id": 1,
          "titulo": "Uso de Find/Filter para Selección",
          "descripcion":
            "La selección se hace sin mutar la lista original. Se ejecuta find() sobre listas de tareas sin alterar el resto del estado.",
          "codigo": "export const seleccionarTareaDeLista = (lista, accion) => {\n  const termino = prompt(\"Buscar: \");\n  return lista.find(t => t.titulo.toLowerCase().includes(termino.toLowerCase()));\n};",
          "salida": `Buscar: final
>> Resultado encontrado:
{ id: "a1b2...", titulo: "estudiar para el final", ... }`
        },
        {
          "id": 2,
          "titulo": "Funciones como Validadores",
          "descripcion":
            "El input se procesa como función pura: se transforma, se valida y se decide si es aceptable.",
          "codigo": "const esFechaValida = (str) => /^\\d{4}-\\d{2}-\\d{2}$/.test(str);\n\nexport const solicitarVencimiento = () => {\n  const input = prompt(\"Fecha: \");\n  return esFechaValida(input) ? new Date(input) : undefined;\n};",
          "salida": `Fecha: 2025-13-10
>> salida: undefined (fecha inválida)

Fecha: 2025-12-01
>> salida: new Date("2025-12-01T00:00:00.000Z")`
        },
        {
          "id": 3,
          "titulo": "Separación entre I/O e Inmutabilidad",
          "descripcion":
            "Aunque prompt es impuro, la función devuelve siempre un nuevo objeto. No modifica estructuras ya existentes.",
          "codigo": "export const solicitarPropsCreacion = () => ({\n  titulo: _solicitarStringNoVacio(\"Título: \"),\n  descripcion: _solicitarStringOpcional(\"Descripción: \"),\n  dificultad: solicitarDificultad(\"Dificultad: \")\n});",
          "salida": `Título: repasar SQL
Descripción: indices y joins
Dificultad: 2
>> Resultado:
{
  titulo: "repasar SQL",
  descripcion: "indices y joins",
  dificultad: "Media"
}`
        }
      ]
    },

    // -------------------------------------------------------------------------
    // PARADIGMA LÓGICO
    // -------------------------------------------------------------------------
    "logica": {
      "titulo": "Validación y Reglas Formales",
      "pasos": [
        {
          "id": 1,
          "titulo": "Predicados de Entrada",
          "descripcion":
            "Toda validación es un predicado lógico: cumple P o no cumple P. No existen estados intermedios.",
          "codigo": "if (valor.length > max) {\n  console.log(\"❌ Error: demasiado largo\");\n  continue;\n}",
          "salida": `Ingrese título: estudiar estructuras para el parcial final de fundamentos de programación I
❌ Error: demasiado largo
Ingrese título: estudiar estructuras
>> aceptado`
        },
        {
          "id": 2,
          "titulo": "Consistencia Temporal",
          "descripcion":
            "Las reglas lógicas impiden fechas imposibles: pasadas, fuera de rango o con formato inválido.",
          "codigo": "if (fechaInput < hoy) {\n  console.log(\"❌ No puede ser pasada\");\n  continue;\n}",
          "salida": `Vencimiento: 2024-01-01
❌ No puede ser pasada
Vencimiento: 2025-12-01
>> fecha válida`
        },
        {
          "id": 3,
          "titulo": "Normalización Semántica",
          "descripcion":
            "El input se transforma a una forma estándar para que los módulos posteriores trabajen sin ambigüedades.",
          "codigo": "const termino = prompt(\"Buscar: \").trim().toLowerCase();",
          "salida": `Buscar:   Final EXAMEN   
>> termino procesado: "final examen"`
        }
      ]
    }
  }
},

  "constantes.js": {
    "descripcion": "El diccionario central del sistema. Agrupa valores compartidos como estados, dificultades, configuraciones y expresiones estándar del dominio. Previene 'magic strings', mejora la mantenibilidad y asegura coherencia global.",
    "paradigmas": {
      "estructurada": {
        "titulo": "Datos Globales Controlados",
        "pasos": [
          {
            "id": 1,
            "titulo": "Constantes Declaradas como Tabla de Configuración",
            "descripcion": "El módulo se comporta como una tabla de configuración. Todo está declarado secuencialmente, arriba del flujo principal del programa.",
            "codigo": "export const ESTADOS = { PENDIENTE: 'Pendiente', EN_CURSO: 'En Curso', TERMINADA: 'Terminada', CANCELADA: 'Cancelada' };",
            "salida": ">> console.log(ESTADOS);\n{ PENDIENTE: 'Pendiente', EN_CURSO: 'En Curso', TERMINADA: 'Terminada', CANCELADA: 'Cancelar' }"
          },
          {
            "id": 2,
            "titulo": "Eliminación de Magic Strings",
            "descripcion": "Usar constantes en vez de cadenas sueltas evita errores como 'pendiete', 'pendient', o variaciones no detectadas.",
            "codigo": "if (tarea.estado === ESTADOS.PENDIENTE) console.log('Tarea pendiente');",
            "salida": ">> tarea.estado = 'Pendiente'\n>> 'Tarea pendiente'"
          },
          {
            "id": 3,
            "titulo": "Tablas de Categorías Claras",
            "descripcion": "Las dificultades se definen como un catálogo estático, simple y estructurado.",
            "codigo": "export const DIFICULTADES = { FACIL: 'Facil', MEDIA: 'Media', DIFICIL: 'Dificil' };",
            "salida": ">> console.log(DIFICULTADES.MEDIA);\n\"Media\""
          }
        ]
      },
      "objetos": {
        "titulo": "Enums, Modelado y Representación del Dominio",
        "pasos": [
          {
            "id": 1,
            "titulo": "Pseudo-Enums Inmutables",
            "descripcion": "Los enums simulados con Object.freeze funcionan como clases de valores inmutables.",
            "codigo": "export const TIPOS_ACCION = Object.freeze({ CREAR: 'Crear', EDITAR: 'Editar', BORRAR: 'Borrar' });",
            "salida": ">> TIPOS_ACCION.BORRAR\n'Borrar'\n>> TIPOS_ACCION.NUEVO = 'X'\nError: Cannot add property NUEVO, object is not extensible"
          },
          {
            "id": 2,
            "titulo": "Identidad Semántica",
            "descripcion": "Los objetos del dominio usan estas constantes como atributos semánticos, no como strings arbitrarios.",
            "codigo": "tarea.estado = ESTADOS.EN_CURSO;",
            "salida": ">> tarea.estado\n'En Curso'"
          },
          {
            "id": 3,
            "titulo": "Aislamiento del Conocimiento del Dominio",
            "descripcion": "Las clases externas no necesitan saber qué valor exacto representa un estado. Siguen usando la constante.",
            "codigo": "if (usuario.rol === ROLES.ADMIN) permitirModificacion();",
            "salida": ">> usuario.rol = 'ADMIN'\n>> permitirModificacion()\n'Modificación habilitada'"
          }
        ]
      },
      "funcional": {
        "titulo": "Inmutabilidad y Tablas para Transformaciones Puras",
        "pasos": [
          {
            "id": 1,
            "titulo": "Inmutabilidad Estricta",
            "descripcion": "Las constantes se congelan para mantenerlas puras y confiables en cualquier función.",
            "codigo": "export const ESTADOS = Object.freeze({ PENDIENTE: 'Pendiente', EN_CURSO: 'En Curso' });",
            "salida": ">> ESTADOS.PENDIENTE = 'X'\n'Pendiente' // No cambia"
          },
          {
            "id": 2,
            "titulo": "Mapas Funcionales",
            "descripcion": "Los mapas permiten transformar y ordenar sin lógica adicional.",
            "codigo": "export const DIFICULTADES_ORDEN = { Facil: 1, Media: 2, Dificil: 3 };",
            "salida": ">> DIFICULTADES_ORDEN['Dificil']\n3"
          },
          {
            "id": 3,
            "titulo": "Constantes como Parámetros",
            "descripcion": "Las funciones puras reciben constantes como valores atómicos.",
            "codigo": "const ordenarPorDificultad = lista => lista.sort((a,b)=>DIFICULTADES_ORDEN[a.dificultad]-DIFICULTADES_ORDEN[b.dificultad]);",
            "salida": ">> ordenarPorDificultad([\n  { titulo: 'A', dificultad: 'Media' },\n  { titulo: 'B', dificultad: 'Facil' }\n])\n[\n  { titulo: 'B', dificultad: 'Facil' },\n  { titulo: 'A', dificultad: 'Media' }\n]"
          },
          {
            "id": 4,
            "titulo": "Creación de Utilidades Temporales",
            "descripcion": "Funciones auxiliares permiten cálculos sin modificar estado global.",
            "codigo": "export const getHoy = () => new Date().toISOString().split('T')[0];",
            "salida": ">> getHoy()\n'2025-11-27'"
          }
        ]
      },
      "logica": {
        "titulo": "Átomos y Reglas del Sistema",
        "pasos": [
          {
            "id": 1,
            "titulo": "Vocabulario de Predicados",
            "descripcion": "Las constantes son átomos indivisibles usados en validaciones y reglas.",
            "codigo": "// validarEstado(valor) retorna true si valor ∈ ESTADOS",
            "salida": ">> validarEstado('Pendiente')\ntrue\n>> validarEstado('Pendienteeeee')\nfalse"
          },
          {
            "id": 2,
            "titulo": "Consistencia del Dominio",
            "descripcion": "Cualquier valor fuera de las listas establecidas se rechaza.",
            "codigo": "if (!Object.values(ESTADOS).includes(estado)) throw new Error('Estado inválido');",
            "salida": ">> estado = 'Cualquier cosa'\nError: Estado inválido"
          },
          {
            "id": 3,
            "titulo": "Centro de Verdad del Sistema",
            "descripcion": "Los validadores consultan a las constantes como 'fuente de verdad'.",
            "codigo": "const esDificultadValida = d => Object.values(DIFICULTADES).includes(d);",
            "salida": ">> esDificultadValida('Media')\ntrue\n>> esDificultadValida('SuperDificil')\nfalse"
          }
        ]
      }
    }
  },

  "tareas.json": {
    "descripcion": "La memoria permanente del sistema. Guarda la versión final del objeto después de pasar por los 4 paradigmas.",
    "paradigmas": {
      "estructurada": {
        "titulo": "Entrada y Flujo Secuencial",
        "pasos": [
          {
            "id": 1,
            "titulo": "Captura de Datos",
            "descripcion": "Los valores ingresados por el usuario (título, descripción, dificultad, vencimiento) se guardan tal como entraron en el flujo estructurado.",
            "codigo": "{\n  \"titulo\": \"estudiar para el final\",\n  \"descripcion\": \"hacer resúmenes y practicar SQL\",\n  \"dificultad\": \"Facil\",\n  \"vencimiento\": \"2025-12-01\"\n}",
            "salida": "--- INGRESO DE DATOS ---\nTítulo: estudiar para el final\nDescripción: hacer resúmenes y practicar SQL\nDificultad: Facíl\nVencimiento: 2025-12-01\n\n>> Datos capturados correctamente."
          },
          {
            "id": 2,
            "titulo": "Orden Determinista",
            "descripcion": "El flujo estructurado garantiza que la tarea recibe datos válidos en el orden correcto.",
            "codigo": "// pedirTitulo() → pedirDescripcion() → pedirDificultad() → pedirVencimiento()",
            "salida": ">> Ejecutando flujo estructurado...\n1) pedirTitulo()\n2) pedirDescripcion()\n3) pedirDificultad()\n4) pedirVencimiento()\n>> Flujo completado sin errores."
          }
        ]
      },
      "objetos": {
        "titulo": "Instancias y Estado Interno",
        "pasos": [
          {
            "id": 1,
            "titulo": "Construcción del Objeto",
            "descripcion": "El constructor de la clase Tarea define propiedades internas, genera ID y fecha de creación.",
            "codigo": "{\n  \"id\": \"uuid()\",\n  \"creacion\": \"2025-11-20T11:00:00.000Z\",\n  \"eliminado\": false\n}",
            "salida": ">> Creando instancia Tarea...\nID generado: bb3f09f8-84df-4b24-9a7d-1da0e29e78f1\nFecha creación: 2025-11-20T11:00:00.000Z\nEstado inicial: Pendiente\nEliminado: false\n>> Instancia creada."
          },
          {
            "id": 2,
            "titulo": "Serialización",
            "descripcion": "El objeto instanciado se convierte en un JSON plano que se guarda sin métodos ni prototipos.",
            "codigo": "// JSON.stringify(tarea)",
            "salida": ">> Serializando objeto...\n{\n  \"id\": \"bb3f09f8-84df-4b24-9a7d-1da0e29e78f1\",\n  \"titulo\": \"estudiar para el final\",\n  \"descripcion\": \"hacer resúmenes y practicar SQL\",\n  \"dificultad\": \"Facil\",\n  \"estado\": \"Pendiente\",\n  \"vencimiento\": \"2025-12-01\",\n  \"creacion\": \"2025-11-20T11:00:00.000Z\",\n  \"ultimaEdicion\": \"2025-11-20T11:00:00.000Z\",\n  \"eliminado\": false\n}\n>> Guardado en tareas.json"
          }
        ]
      },
      "funcional": {
        "titulo": "Transformaciones Puras",
        "pasos": [
          {
            "id": 1,
            "titulo": "Versión Actualizada del Objeto",
            "descripcion": "Cada cambio produce una nueva copia del objeto con su 'ultimaEdicion' modificada.",
            "codigo": "{\n  ...tarea,\n  \"estado\": \"En Curso\",\n  \"ultimaEdicion\": \"2025-11-21T13:40:00.000Z\"\n}",
            "salida": ">> Editando tarea (modo funcional)...\nEstado previo: Pendiente\nEstado nuevo: En Curso\nÚltima edición: 2025-11-21T13:40:00.000Z\n>> Nueva versión generada sin mutar el original."
          },
          {
            "id": 2,
            "titulo": "Datos Inmutables",
            "descripcion": "El archivo funciona como una fuente de datos pura para las funciones de filtrado, mapeo y ordenamiento.",
            "codigo": "tareas.filter(t => t.estado === \"Pendiente\")",
            "salida": ">> Filtrando tareas (función pura):\n> Resultado:\n[\n  { \"id\": \"a19cc21f-2625-4d45-9c2f-f7ef77388ba4\", \"titulo\": \"ir al gimnasio\", \"estado\": \"Pendiente\" }\n]"
          },
          {
            "id": 3,
            "titulo": "Persistencia como Valor Inmutable",
            "descripcion": "El archivo JSON se interpreta como un snapshot del estado actual.",
            "codigo": "// leerJSON() produce un array nuevo cada vez",
            "salida": ">> Leyendo tareas.json...\nArray nuevo generado (sin referencias compartidas)."
          }
        ]
      },
      "logica": {
        "titulo": "Hechos y Reglas del Sistema",
        "pasos": [
          {
            "id": 1,
            "titulo": "Hechos Registrados",
            "descripcion": "Cada entrada del JSON funciona como un hecho que el motor lógico utiliza para validar operaciones.",
            "codigo": "// Hecho: tarea.eliminado === false",
            "salida": ">> Verificando hechos...\nHecho válido: eliminado === false\nHecho válido: estado pertenece a ESTADOS\n>> Hechos confirmados."
          },
          {
            "id": 2,
            "titulo": "Reglas de Coherencia",
            "descripcion": "La lógica determina si un cambio es válido antes de que el JSON sea actualizado.",
            "codigo": "// Regla: no se puede editar si eliminado = true",
            "salida": ">> Aplicando regla lógica:\n¿Puede editarse la tarea?\n→ eliminado === false → OK\n>> Edición permitida."
          }
        ]
      }
    }
  }
};