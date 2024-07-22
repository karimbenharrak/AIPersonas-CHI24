FROM node:20-alpine

WORKDIR /ui

COPY . .
RUN yarn install --ignore-engines

CMD ["yarn", "build"]
