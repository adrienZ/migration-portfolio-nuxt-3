FROM mcr.microsoft.com/playwright:next

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn playwright install --with-deps
RUN yarn test