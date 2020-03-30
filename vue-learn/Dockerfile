FROM node:10
COPY ./ /vue-learn
WORKDIR /vue-learn
RUN npm install && npm run build

FROM nginx
RUN mkdir /vue-learn
COPY --from=0 /vue-learn/dist /vue-learn
COPY nginx.conf /etc/nginx/nginx.conf