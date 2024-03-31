FROM node:20.12.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

RUN npx next telemetry disable

COPY . .

CMD ["npm", "run", "dev"]
