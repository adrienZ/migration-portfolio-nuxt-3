FROM mcr.microsoft.com/playwright:next

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn test