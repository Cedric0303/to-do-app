FROM node:18-slim

ENV NODE_ENV=development
EXPOSE 3001

WORKDIR /app

COPY . .
RUN npm install 

CMD npm run start