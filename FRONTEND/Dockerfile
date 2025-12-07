FROM node:20 AS  build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ✅ Paso temporal para ver estructura
RUN echo "=== LISTANDO ARCHIVOS ===" && \
    ls -R /app
# RUN npm run build 

# # esta es la parte del servidor
# FROM nginx:alpine
# ADD ./config/server.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /var/www/app

# EXPOSE 4000

# CMD [ "nginx","-g","daemon off;" ]