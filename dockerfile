FROM mcr.microsoft.com/playwright:v1.50.0-noble

WORKDIR /pw_hillel

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npx", "playwright", "test"]