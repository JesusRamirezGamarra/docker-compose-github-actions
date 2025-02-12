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


# 🔹 Etapa de construcción (Builder)
FROM node:18-alpine AS builder

# Definir directorio de trabajo
WORKDIR /app

# Copiar dependencias del proyecto
COPY package*.json ./

# Instalar dependencias sin conflictos
RUN npm install --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Copiar fix/timerHandle.d.ts solo si existe
RUN test -f fix/timerHandle.d.ts && cp fix/timerHandle.d.ts /app/node_modules/rxjs/dist/types/internal/scheduler/ || echo "Archivo no encontrado"

# Construir la aplicación Angular (sin --prod porque ya no se usa)
RUN npm run build --configuration=production

# 🔹 Etapa de despliegue (Nginx)
FROM nginx:alpine

# Copiar la aplicación Angular construida desde la etapa builder
COPY --from=builder /app/dist/angular-frontend /usr/share/nginx/html

# Exponer el puerto 80 para servir la aplicación
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]
