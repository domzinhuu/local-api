FROM node:10

# Comando cria um usuario para rodar apenas o container sem muitas permissoes e seta uma versão fixa 
# do npm para evitar conflito
RUN useradd --user-group --create-home --shell /bin/false app &&\npm install -g npm@6.9.0

# cria uma variavel de ambiente para onde o projeto será criado
ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/fouward-utils/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/fouward-utils
RUN npm install --silence --progress=false
USER root
COPY . $HOME/fouward-utils
RUN chown -R app:app $HOME/*

USER app
RUN pwd&&ls&&npm run tsc
EXPOSE 3000
CMD ["npm","run","prod"]