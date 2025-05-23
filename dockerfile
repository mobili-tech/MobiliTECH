# Step 1/7

# Usamos uma imagem oficial do Node.js como base, sempre pegando a versão mais recente

FROM node:latest



# Step 2/7

# Define o diretório de trabalho dentro do contêiner

WORKDIR /usr/src/app



# Step 3/7

# Clona o repositório do GitHub onde está o código da aplicação

RUN git clone https://github.com/mobili-tech/MobiliTECH.git




# Step 4/7

# Muda para o diretório onde está o código da aplicação web dentro do projeto clonado

WORKDIR /usr/src/app/MobiliTECH



# Step 5/7

# Instala as dependências do Node.js definidas no package.json

RUN npm i



# Step 6/7

# Expõe a porta desenvolvimento:3333 ou produção:8080 ou 80 do contêiner, que será usada para acessar a aplicação pela web

EXPOSE 3333



# Step 7/7

# Define o comando que será executado quando o contêiner iniciar

# Neste caso, ele executa "npm start" para iniciar a aplicação Node.js

CMD ["npm" ,"start"]