# 🤖 Local AI Management – Ollama (TypeScript Practice)

Este repositorio es un **fork** de un proyecto desarrollado de forma colaborativa como práctica técnica,
centrada en el uso de **TypeScript puro (sin frameworks)** para construir una **interfaz de gestión local para Ollama**.

El objetivo principal del proyecto fue **diseñar y estructurar una aplicación frontend tipada**,
capaz de interactuar con un sistema de IA local, aplicando buenas prácticas de TypeScript,
organización de código y separación de responsabilidades.

> 📌 **Nota:** Este fork documenta específicamente **mi aporte personal y aprendizajes** dentro del proyecto colaborativo original.  
> ℹ️ El repositorio original no cuenta con documentación (README); esta documentación fue creada en este fork con fines educativos y de portafolio.

---

## 🎯 Objetivo del proyecto

Desarrollar una **interfaz de gestión para Ollama ejecutándose de forma local**, permitiendo:

- Administrar y visualizar información relacionada con modelos locales
- Simular flujos de interacción con servicios de IA
- Practicar el uso de TypeScript en un entorno realista
- Fortalecer el diseño de aplicaciones frontend sin depender de frameworks

El enfoque fue **educativo y práctico**, priorizando la comprensión profunda del lenguaje y su ecosistema.

---

## 🚀 Mi aporte en el proyecto

Mi participación se centró principalmente en:

- Desarrollo de la **lógica principal en TypeScript**
- Definición y uso de **tipos e interfaces** para los datos
- Organización de la arquitectura y estructura del proyecto
- Manejo de estados y flujos de la aplicación
- Implementación de **tool calling** para simular y ejecutar acciones desde la interfaz
- Consumo de **APIs externas**, incluyendo una **API de clima**, como ejercicio práctico de integración
- Comunicación conceptual y práctica con servicios locales (Ollama)

Este README refleja el proyecto desde una perspectiva de **aprendizaje técnico, experimentación y crecimiento profesional**.

---

## 🧠 Conceptos de TypeScript aplicados

Durante el desarrollo se trabajaron los siguientes conceptos clave:

- `interface` y `type` para modelado de datos
- Tipado estricto de funciones y valores de retorno
- Separación entre lógica de negocio y presentación
- Uso de `enum` para estados y configuraciones
- Manejo de valores opcionales y null safety
- Compilación de TypeScript a JavaScript
- Estructuración modular del código

Estos conceptos fueron aplicados para simular un entorno de desarrollo frontend real.

---

## 🏗️ Arquitectura y estructura del proyecto

```plaintext
local-ai-management/
├── src/
│   ├── app/
│   │   ├── controllers/   # Orquestación entre UI y servicios
│   │   ├── services/      # Lógica de negocio y comunicación externa
│   │   ├── models/        # Entidades de dominio
│   │   ├── types/         # Interfaces y contratos de datos
│   │   └── views/         # Capa de presentación (UI)
│   │
│   └── main.ts            # Bootstrap de la aplicación
│
├── dist/                  # Código compilado (JavaScript)
├── index.html             # Punto de entrada HTML
├── styles.css             # Estilos globales
├── tsconfig.json          # Configuración de TypeScript
├── package.json           # Configuración del proyecto y scripts
└── README.md              # Documentación
````

La arquitectura sigue un enfoque **por capas**, favoreciendo legibilidad, mantenibilidad y aprendizaje estructural.

---

## ⚙️ Tecnologías utilizadas

* **TypeScript** (lenguaje principal)
* **HTML & CSS** (interfaz base)
* **Servidor estático local** (por ejemplo, Live Server)
* **Ollama** (IA local – integración conceptual/práctica)
* **APIs externas** (API de clima como ejercicio de consumo y tipado)

> ℹ️ El proyecto se ejecuta como **frontend estático**.
> TypeScript se compila a JavaScript y se sirve mediante un servidor local simple (no backend).

---

## 🧪 Ejecución del proyecto

### Requisitos

* Navegador moderno
* Servidor estático local (ej. Live Server en VS Code)
* Ollama configurado localmente

### Pasos básicos

1️⃣ Clonar el repositorio y abrirlo en tu editor

2️⃣ Iniciar un servidor estático local
Por ejemplo, con **Live Server**:

* Click derecho sobre `index.html`
* Seleccionar **Open with Live Server**

3️⃣ Acceder desde el navegador al puerto asignado
(ej. `http://127.0.0.1:5500`)

---

## 📚 Aprendizajes clave

Este proyecto me permitió:

* Comprender **TypeScript más allá de frameworks**
* Mejorar la modelación de datos y contratos
* Diseñar arquitectura incluso en proyectos pequeños
* Practicar integración con servicios externos
* Simular flujos reales de aplicaciones frontend modernas

---

## 👥 Colaboración

Proyecto desarrollado de forma colaborativa como práctica técnica.
Este fork documenta exclusivamente **mi proceso, enfoque y aprendizaje personal**, respetando la autoría y el trabajo del equipo original.

---

## 📄 Licencia

Este proyecto mantiene la misma licencia que el repositorio original.
