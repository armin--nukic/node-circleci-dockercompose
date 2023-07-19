# Koristi Node.js sliku kao osnovu
FROM node:latest

# Postavi radni direktorij u kontejneru
WORKDIR /app

# Kopiraj package.json i package-lock.json
COPY package*.json ./

# Instaliraj ovisnosti
RUN npm install

# Kopiraj izvorni kod aplikacije
COPY . .

# Postavi okolinu za port
ENV PORT=3001

# Izvrši naredbu za pokretanje aplikacije
CMD ["node", "server.js"]
