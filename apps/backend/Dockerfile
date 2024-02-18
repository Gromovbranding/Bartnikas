FROM node:20

RUN mkdir -m 700 /root/.ssh && ssh-keyscan github.com > /root/.ssh/known_hosts

WORKDIR /app/backend

# Install Node without having the whole application files (cache)
COPY package*.json tsconfig*.json ./

RUN --mount=type=ssh HUSKY=0 npm cache clean --force
RUN --mount=type=ssh HUSKY=0 npm install

COPY . .

EXPOSE 3000

RUN ["chmod", "+x", "/app/backend/docker-entrypoint.sh"]

ENTRYPOINT ["sh", "/app/backend/docker-entrypoint.sh"]