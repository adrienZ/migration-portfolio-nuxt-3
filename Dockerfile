FROM mcr.microsoft.com/playwright:v1.36.1-focal

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn playwright install --with-deps
RUN yarn test