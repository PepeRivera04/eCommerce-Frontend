# Usa una imagen de Node.js como base
FROM node:18-buster

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y el yarn.lock
COPY package.json yarn.lock ./

# Establece configuración de yarn para ignorar las advertencias de engines y peer dependencies
RUN yarn config set ignore-engines true
RUN yarn config set ignore-peer-dependencies true

# Instala las dependencias del proyecto
RUN yarn install

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Compila la aplicación
RUN yarn build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación
CMD ["yarn", "start"]