FROM node:20.17-alpine

EXPOSE 3000

WORKDIR /app
COPY . .

RUN npm install --verbose --no-optional
ENV PATH /app/node_modules/.bin:$PATH

USER node
