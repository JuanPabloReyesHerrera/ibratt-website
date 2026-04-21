# 🎵 IBRATT - Official Website & Beat Store

Plataforma oficial, portafolio y tienda de instrumentales (beats) del productor IBRATT. Esta aplicación web permite a los usuarios explorar el catálogo musical, reproducir pistas con una interfaz de audio interactiva de alta fidelidad y adquirir licencias comerciales de manera segura.

## 🚀 Resumen del Proyecto

El objetivo principal de esta plataforma es centralizar la marca IBRATT, ofreciendo una experiencia de usuario fluida y sin interrupciones, similar a las grandes aplicaciones de streaming.

### ✨ Funcionalidades Principales

- **Reproductor de Audio Persistente:** Un reproductor global que permite navegar por toda la página sin que la música se interrumpa, con visualización de ondas de audio en tiempo real.
- **Tienda y E-commerce:** Integración completa de carrito de compras y pasarela de pago para la venta de licencias de beats.
- **Catálogo Dinámico:** Exploración de beats con filtrado, carruseles y detalles específicos (BPM, Key, Género).
- **Modo Oscuro/Claro:** Soporte nativo para temas visuales.

### 🛠️ Stack Tecnológico Core

- **Framework:** Next.js 16 (App Router) / React 19
- **Estilos:** Tailwind CSS v4, Shadcn UI, Radix UI
- **Base de Datos:** PostgreSQL + Drizzle ORM
- **Pagos:** Stripe (Stripe.js & Stripe Node)

---

## 🏗️ Arquitectura y Detalles Técnicos

Esta aplicación está construida siguiendo principios de ingeniería de software modernos (SOLID y Clean Code), priorizando la escalabilidad, la mantenibilidad y el rendimiento.

### 1. Gestión de Estado y Reproducción de Audio

La complejidad de mantener un reproductor de audio global se resuelve utilizando **Zustand** para un manejo del estado global ligero y predecible.

- **Wavesurfer.js:** Se implementa para renderizar formas de onda (waveforms) precisas basadas en la decodificación del archivo de audio, mejorando la interactividad.
- **Vaul:** Utilizado para crear un "Drawer" (cajón deslizante) responsivo en dispositivos móviles que aloja la vista expandida del reproductor, manteniendo la vista colapsada siempre accesible sin desmontar la instancia de audio.

### 2. Base de Datos y Tipado Estricto (Type-Safety)

Se ha optado por **Drizzle ORM** conectado a una base de datos **PostgreSQL**.

- Drizzle proporciona un tipado estricto (End-to-End Type Safety) desde el esquema de la base de datos hasta el cliente en React.
- Las migraciones y el prototipado se manejan mediante `drizzle-kit`.
- **Zod** actúa como la capa de validación de esquemas, asegurando que los datos que entran a la base de datos o a la API de Stripe tengan el formato exacto requerido, evitando errores en tiempo de ejecución.

### 3. Sistema de Componentes y UI/UX

La interfaz gráfica no depende de pesados frameworks de componentes, sino que utiliza una base arquitectónica más limpia:

- **Shadcn UI + Radix UI:** Componentes accesibles (a11y) y sin estilos predefinidos restrictivos.
- **Utilidades de clases:** Se usa una función personalizada `cn()` (combinando `clsx` y `tailwind-merge`) para resolver conflictos de clases dinámicas en Tailwind de manera determinista.
- **Animaciones:** Controladas fluidamente mediante `tw-animate-css` y transiciones nativas optimizadas.

### 4. Robustez y Calidad del Código (Testing)

Para asegurar que la lógica de negocio (como el cálculo de precios, el manejo de la cola de reproducción y las integraciones con la base de datos) no falle ante nuevos despliegues, el proyecto implementa pruebas unitarias utilizando **Vitest**. Esto garantiza un entorno de desarrollo seguro y profesional.

---

## 💻 Instalación y Desarrollo Local

Asegúrate de tener instalado Node.js (>=20.0.0) y `pnpm`.

**1. Clonar el repositorio e instalar dependencias:**

```bash
pnpm install
```
