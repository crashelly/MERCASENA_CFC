FROM node:20

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto del dev server de React
EXPOSE 5173

# Ejecutamos React en modo dev
CMD ["npm", "run","dev"]
