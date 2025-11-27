export const paradigmas = {
  estructurada: {
    titulo: "Programación Estructurada",
    color: "blue", // Color del tema
    pasos: [
      {
        id: 1,
        titulo: "Secuencia",
        descripcion: "El código se ejecuta línea por línea, de arriba a abajo. Es la base de todo algoritmo imperativo.",
        codigo: `// Ejemplo en C o Pseudocódigo
int main() {
    int x = 10;
    int y = 20;
    printf("%d", x + y);
    return 0;
}`
      },
      {
        id: 2,
        titulo: "Selección (if/else)",
        descripcion: "Tomamos decisiones basadas en condiciones lógicas.",
        codigo: `if (x > y) {
    print("X es mayor");
} else {
    print("Y es mayor");
}`
      },
      {
        id: 3,
        titulo: "Iteración (Bucles)",
        descripcion: "Repetimos bloques de código mientras se cumpla una condición.",
        codigo: `for (int i = 0; i < 5; i++) {
    print(i);
}`
      },
      {
        id: 4,
        titulo: "Iteración (Bucles)",
        descripcion: "Repetimos bloques de código mientras se cumpla una condición.",
        codigo: `for (int i = 0; i < 5; i++) {
    print(i);
}`
      }


    ]
  },
  objetos: {
    titulo: "Orientada a Objetos",
    color: "purple",
    pasos: [
      {
        id: 1,
        titulo: "Clases y Objetos",
        descripcion: "Definimos plantillas (Clases) para crear instancias (Objetos) que agrupan datos y comportamiento.",
        codigo: `class Coche {
  constructor(marca) {
    this.marca = marca;
  }
  
  arrancar() {
    console.log(this.marca + " en marcha");
  }
}`
      },
      // ... Agrega más pasos aquí ...
    ]
  },
  funcional: {
    titulo: "Programación Funcional",
    color: "emerald",
    pasos: [
      {
        id: 1,
        titulo: "Funciones Puras",
        descripcion: "Dados los mismos inputs, siempre devuelve el mismo output sin efectos secundarios.",
        codigo: `const sumar = (a, b) => a + b;`
      }
    ]
  },
  logica: {
    titulo: "Programación Lógica",
    color: "rose",
    pasos: [
      {
        id: 1,
        titulo: "Hechos y Reglas",
        descripcion: "En lugar de decir CÓMO hacer algo, definimos QUÉ es verdad.",
        codigo: `% Prolog
padre(juan, pedro).
padre(pedro, ana).

abuelo(X, Y) :- padre(X, Z), padre(Z, Y).`
      }
    ]
  }
};