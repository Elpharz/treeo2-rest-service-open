FROM node:14.5.0-alpine AS builder
WORKDIR /treeo/server
COPY package.json /treeo/server/package.json
COPY package-lock.json /treeo/server/package-lock.json
RUN npm install
COPY . .

EXPOSE 9002
CMD ["npm", "run", "start"]