# # #para obtener la imagen base
# # FROM node:16-alpine AS builder

# # #para definir el directorio de trabajo
# # WORKDIR /app

# # #para copiar el archivo de dependencias del proyecto
# # COPY package*.json /app/

# # #para instalar las dependencias del proyecto
# # RUN npm install

# # #para copiar el codigo del proyecto
# # COPY . /app

# # COPY fix/timerHandle.d.ts app/node_modules/rxjs/dist/types/internal/scheduler/

# # #para construir la aplicacion angular
# # RUN npm run build --prod

# # #etapa de nginx
# # FROM nginx:alpine

# # #copiar el contenikdo del build de angular
# # COPY --from=builder /app/dist/angular-frontend /usr/share/nginx/html

# # #para exponer el puerto 80 del container
# # EXPOSE 80

# # #comando por defecto de nginx
# # CMD [ "nginx", "-g", "daemon off;" ]


# Usar una versión más reciente de Node.js
FROM node:18-alpine AS builder

# Definir directorio de trabajo
WORKDIR /app

# Copiar dependencias y paquetes de Angular
COPY package*.json ./

# Instalar dependencias sin conflictos
RUN npm install --legacy-peer-deps

# Copiar el código fuente del proyecto
COPY . .

# Si fix/timerHandle.d.ts no existe, evitar error
COPY fix/timerHandle.d.ts /app/node_modules/rxjs/dist/types/internal/scheduler/ || true

# Construir la aplicación Angular (sin --prod)
RUN npm run build --configuration=production

# Etapa de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar el contenido del build de Angular
COPY --from=builder /app/dist/angular-frontend /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]
