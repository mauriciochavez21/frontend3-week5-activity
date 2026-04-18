# ==========================================
# Etapa 1: Construcción (Node.js)
# ==========================================
# Usamos una imagen de Node ligera
FROM node:20-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero (optimización de caché)
COPY package*.json ./

# Instalamos las dependencias de forma limpia
RUN npm ci

# Copiamos el resto del código fuente del proyecto
COPY . .

# Ejecutamos el comando de Vite para empaquetar la aplicación (genera la carpeta /dist)
RUN npm run build

# ==========================================
# Etapa 2: Servidor de Producción (Nginx)
# ==========================================
# Usamos un servidor web ligero y de alto rendimiento
FROM nginx:alpine

# Copiamos los archivos estáticos compilados desde la Etapa 1 hacia la carpeta de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 (por donde Nginx sirve la app)
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]