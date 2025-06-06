FROM node:16.19.0
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm install
 
COPY . .
 
ENTRYPOINT [ "node", "server"]