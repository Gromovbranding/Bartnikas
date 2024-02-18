FROM node:20

RUN mkdir -m 700 /root/.ssh && ssh-keyscan github.com > /root/.ssh/known_hosts

WORKDIR /app/frontend

COPY package*.json tsconfig.json ./

RUN --mount=type=ssh HUSKY=0 npm cache clean --force

RUN --mount=type=ssh HUSKY=0 npm install

COPY . .

RUN npm run clean

RUN npm run build

CMD [ "npm", "run", "start:prod" ]