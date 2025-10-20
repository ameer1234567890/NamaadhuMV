FROM node:25-alpine

RUN apk update && \
    apk add --no-cache --update tzdata tini

COPY . /namaadhumv
WORKDIR /namaadhumv
RUN npm install

EXPOSE 6336

ENTRYPOINT ["tini", "--"]
CMD [ "node", "server.js" ]
