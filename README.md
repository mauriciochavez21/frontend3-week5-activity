# 🎮 Proyecto TechStore - Frontend III

Bienvenido a la construcción de tu primera Single Page Application (SPA) conectada a una base de datos real de videojuegos, utilizando React, React Router y la API de RAWG.

## 🚀 Paso 1: Instalación desde Cero

Abre tu terminal y ejecuta los siguientes comandos para inicializar el proyecto base con Vite:

```bash
# 1. Crear el proyecto (escribe 'y' si te pide confirmación)
git clone https://github.com/JosephRangel/frontend3-week5-activity.git

# 2. Entrar a la carpeta recién creada
cd frontend3-week5-activity

# 3. Instalar las dependencias de Node.js
npm install
```

## 🔑 Paso 2: Tu Credencial de Desarrollador (API Key)

Para poder descargar la información de los videojuegos, necesitas una llave de acceso:
1. Entra a [rawg.io](https://rawg.io/) y crea una cuenta gratuita.
2. Ve a tu perfil en la esquina superior derecha y selecciona **"Get an API key"**.
3. Copia el código que te generen y guárdalo en un lugar seguro. Lo usaremos en el Paso 5.

## 🏃‍♂️ Paso 3: Ejecutar el Proyecto

Para levantar el servidor de desarrollo y ver tu catálogo de juegos en vivo:

```bash
npm run dev
```
Abre `http://localhost:5173` en tu navegador para ver el resultado.

## 📂 Estructura de Carpetas

Arquitectura dentro de la carpeta `src/`:

```text
src/
 ├── components/       
 │    ├── Navbar.jsx      
 │    └── GameCard.jsx 
 ├── pages/            
 │    ├── Home.jsx         
 │    ├── GameDetails.jsx  
 │    └── Favorites.jsx    
```

*(Asegúrate de que cada archivo tenga la estructura básica de un componente de React exportado por defecto `export default ComponentName`)*.


## ☁️ Configuracion para publicar en Docker Hub

Para que GitHub Actions pueda publicar automáticamente la imagen de tu aplicación en internet, necesita tener permiso para entrar a tu cuenta de Docker Hub. Para esto, guardaremos tus credenciales de forma segura usando los "Secrets" de GitHub.

### Pasos para agregar tus credenciales:

1. Ve a la página principal de tu repositorio en GitHub.
2. Haz clic en la pestaña **Settings** (⚙️ Configuración) en la parte superior.
3. En el menú lateral izquierdo, baja hasta la sección "Security", despliega **Secrets and variables** y haz clic en **Actions**.
4. Haz clic en el botón verde que dice **New repository secret**.

Deberás repetir este proceso para crear **dos** secretos diferentes:

**Primer Secreto (Tu Usuario):**
* **Name:** Escribe exactamente `DOCKER_USERNAME` (todo en mayúsculas).
* **Secret:** Escribe tu nombre de usuario público de Docker Hub.
* Haz clic en **Add secret**.

**Segundo Secreto (Tu Contraseña):**
* Haz clic nuevamente en **New repository secret**.
* **Name:** Escribe exactamente `DOCKER_PASSWORD` (todo en mayúsculas).
* **Secret:** Escribe la contraseña real con la que inicias sesión en Docker Hub.
* Haz clic en **Add secret**.

> **Nota:** Al guardarlos como "Secrets", GitHub los encripta. Nadie (ni tú, ni el profesor, ni otros colaboradores) podrá volver a ver la contraseña en texto plano, solo el bot encargado de subir la imagen.

## 🧪 Pruebas Unitarias

La calidad del código se valida mediante **Vitest** y **React Testing Library**. Las pruebas cubren el ciclo de vida de los componentes, incluyendo el manejo de estados asíncronos (Carga, Éxito y Error).

### Comandos de Testing
Desde la terminal, utiliza los siguientes scripts configurados en el `package.json`:

```bash
# Ejecutar pruebas una sola vez
npm run test

# Ejecutar pruebas en modo observador (ideal para desarrollo)
npm run test:watch

## 🐳 Dockerización (Despliegue)

Este proyecto utiliza Docker para garantizar que la aplicación se ejecute de forma consistente en cualquier entorno. Seguimos un proceso de tres pasos para construir, ejecutar y gestionar el contenedor.

### 1. Construir la Imagen
Este comando crea una imagen optimizada que contiene el servidor Nginx y los archivos estáticos de la aplicación. Sustituye `<tu-usuario>` por tu nombre de usuario en Docker Hub.

```bash
docker build -t <tu-usuario>/proyecto-frontend-iii:latest .
```

### 2. Ejecutar el Contenedor
Inicia la aplicación mapeando el puerto **8080** de tu computadora al puerto **80** interno del contenedor (donde escucha Nginx).

```bash
docker run -d -p 8080:80 --name frontend-app <tu-usuario>/proyecto-frontend-iii:latest
```
* **Verificación:** Abre tu navegador en [http://localhost:8080](http://localhost:8080).

### 3. Gestión y Mantenimiento
Comandos esenciales para controlar el ciclo de vida de los contenedores en el laboratorio:

```bash
# Listar contenedores activos
docker ps

# Detener el servidor
docker stop frontend-app

# Reiniciar el contenedor previamente detenido
docker start frontend-app

# Eliminar el contenedor para liberar recursos
docker rm -f frontend-app

# Consultar las imágenes almacenadas localmente
docker images
```

## 🤝 Guía de Colaboración (Workflow)

Para este proyecto, seguimos un flujo de trabajo profesional basado en ramas por actividad y consolidación de commits. Este método asegura que la rama `main` se mantenga limpia y sea fácil de rastrear para las herramientas de automatización.

### 1. Creación de Rama por Actividad
Cada tarea o práctica debe realizarse en su propia rama. Nunca trabajes directamente sobre `main`.

1. Asegúrate de tener la última versión de la rama principal:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Crea una rama nueva para tu actividad actual:
   ```bash
   git checkout -b actividad/nombre-de-la-tarea
   ```

### 2. Desarrollo y Commits
Realiza tus cambios y crea commits con mensajes claros. Se recomienda usar el estándar de **Conventional Commits** (ej: `feat: agregar lógica de suma` o `fix: corregir error de estilo`).

### 3. Pull Request (PR)
Una vez finalizada la actividad:
1. Sube tu rama al repositorio: `git push origin actividad/nombre-de-la-tarea`.
2. Ve a GitHub y abre un **Pull Request** desde tu rama hacia `main`.
3. El sistema ejecutará automáticamente los tests. Si los tests fallan, el PR no podrá ser integrado.

### 4. Squash and Merge (Fusión)
La integración de la actividad a la rama principal se realizará exclusivamente mediante **Squash and merge**.

* **¿Qué es?**: Esta opción combina todos los commits de tu rama (incluyendo los de prueba o corrección de errores) en un **único commit limpio** en `main`.
* **Beneficio**: Facilita el trabajo de *Semantic Release*, ya que cada actividad se registra como un solo cambio significativo en el historial del proyecto.

### 5. Finalización
Una vez que el PR ha sido fusionado, puedes borrar tu rama local:
```bash
git checkout main
git pull origin main
git branch -d actividad/nombre-de-la-tarea
```
