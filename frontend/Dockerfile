# React/Viteが快適に動くNode.js 20系を使用
FROM node:20-alpine

WORKDIR /app

# パソコン側のパッケージ設定をコピーする準備
COPY package.json /app/
RUN npm install

COPY . /app

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
