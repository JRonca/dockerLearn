# Escolha do nome do `Dockerfile`

Podemos ter um Dockerfile para cada environment, exemplo:

- `Dockerfile.base`
- `Dockerfile.dev`
- `Dockerfile.staging`
- `Dockerfile.prod`

# Escolha da Imagem

- Deve ser a mais próxima possível do ambiente de produção
- Deve suportar as ferramentas e libs necessárias para a aplicação

## As menores distribuições Linux

- Alpine Linux (termina em `:alpine` ou `-alpine`)
- Debian Slim (termina em `:slim` ou `-slim`)
- BusyBox (termina em `:busybox` ou `-busybox`) - É um linux padrão, só tem os comandos mais básicos do linux
- Scratch - É a imagem mais básica que tem, utilizada para criar uma imagem do zero, não tem nada
- Distroless - É uma imagem que não contém um sistema operacional completo, apenas as bibliotecas necessárias para a aplicação

# Instalação de ferramentas básicas

- Podemos instalar ferramentas como `curl`, `git`, `vim`, entre outras, dependendo das necessidades da aplicação.

```Docker
FROM node:22.18.0-slim

RUN apt-get update && apt install -y \
  curl && \
  npm install -g nodemon
```

- Rodando

```sh
docker build -t my-image-node -f Dockerfile.dev --no-cache .
```

# Determinando user default

- É altamente recomendável criar um usuário não-root para rodar a aplicação.
- Com isso temos uma camada extra de segurança, evitando que um possível invasor tenha acesso total ao sistema.
- Além disso, isso ajuda a evitar problemas de permissões de arquivos e diretórios.
- Podemos criar um user no-root com o seguinte comando

```docker
# debian
RUN useradd -m -u 1000 xpto

# alpine
RUN adduser -D -u 1000 xpto

USER xpto
```

- Mudar o id do user

```docker
# debian
RUN useradd -m -u 1000 xpto
RUN usermod -u 1000 xpto

# alpine
RUN adduser -D -u 1000 xpto
RUN sed -i 's/1000/1001/g' /etc/passwd

USER xpto
```

# Criando o working directory

- Criando o diretório de trabalho
- Nesse diretório será onde a aplicação será executada e todos os seguintes comandos serão executados

```docker
WORKDIR /home/xpto/app
```

# COPY and RUN

- Usaremos o COPY e o RUN para copiar os arquivos de dependências e instalar as dependências da aplicação

```Docker
COPY package*.json ./
RUN npm install
```

- Porém, teriamos um problemas se rodassemos o container com um volume

```sh
docker run -v $(pwd):/home/node/app my-image-node
```

- Dessa forma, o `node_modules` da máquina host irá sobreescrever o `node_modules` da imagem, fazendo com que as dependências instaladas na imagem sejam perdidas.
- Para contornar isso, podemos criar um volume anonimo do `node_modules`

```sh
docker run -v $(pwd):/home/node/app -v /home/node/app/node_modules my-image-node
```

- Agora teriamos mais um problema, pois por conta do `node_modules` ser um volume anônimo, não teriamos a vantagem do vscode do auto-complete.
- Para resolver isso mais para frente criaremos um script de inicialização

# EXPOSE

- Usamos o comando EXPOSE para informar ao Docker que a aplicação irá escutar em determinada porta em tempo de execução.
- Isso não publica a porta, apenas documenta qual porta será utilizada.
- Para publicar a porta, devemos usar a opção -p ao rodar o container.

```docker
EXPOSE 3000
```

# CMD VS ENTRYPOINT

- O CMD e o ENTRYPOINT são instruções do Dockerfile que definem o comando que será executado quando um container é iniciado.
- A principal diferença entre eles é que o CMD é apenas um comando padrão que pode ser sobrescrito, enquanto o ENTRYPOINT é um comando que sempre será executado.
- Em geral, recomenda-se usar o ENTRYPOINT para definir o comando principal da aplicação e o CMD para definir argumentos padrão que podem ser sobrescritos.
- Se usarmos apenas o Entrypoint e passarmos algo ao rodar a imagem, isto entrará como argumento do Entrypoint.
- Há a possibilidade de utilizar os 2 em conjunto

```docker
# Exemplo de uso do CMD
CMD ["npm", "start"]

# Exemplo de uso do ENTRYPOINT
ENTRYPOINT ["npm", "start"]
```

- Para desenvolvimento usaremos o CMD para permitir a sobrescrição do comando.
- Rodaremos apenas o comando `tail -f /dev/null` para manter o container rodando, enquanto o código é editado na máquina host.

```docker
CMD ["tail", "-f", "/dev/null"]
```
