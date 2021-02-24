FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

RUN rm -r node_modules

RUN npm install --production

EXPOSE 3333

CMD ["npm", "run", "posbuild" ]
