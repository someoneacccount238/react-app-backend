FROM node:22-alpine

WORKDIR /app

# COPY package.json .
 
# RUN npm install

COPY . .

EXPOSE 1444

CMD ["npm","run","start:dev"]