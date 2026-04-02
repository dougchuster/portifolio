# Utilizando estágio único para garantir ambiente de build completo e estável no VPS
FROM node:22

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copia arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Executa o build (Vinext/Vite)
RUN npm run build

EXPOSE 3000

# Inicia o servidor em modo produção
CMD ["npm", "start"]