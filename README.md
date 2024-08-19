## Prerequisites

- ### Resources
  - [Docker Engine](https://get.docker.com/ 'https://get.docker.com/')
  - [Docker Compose](https://docs.docker.com/engine/install/ubuntu/ 'https://docs.docker.com/engine/install/ubuntu/')
  - [NODE](https://nodejs.org/en/ 'https://nodejs.org/en/') or [NVM](https://gist.github.com/shahanahmed86/77616c67e0397a7ed2db89a4a71801d0#node-version-managers-using-nvm 'https://gist.github.com/shahanahmed86/77616c67e0397a7ed2db89a4a71801d0#node-version-managers-using-nvm')
  - [Make](https://linuxhint.com/install-make-ubuntu/ 'https://linuxhint.com/install-make-ubuntu/')
- ### Knowledge
  - Typescript
  - Restful
  - GraphQL with custom directives
  - Docker architecture
  - Container orchestration with docker-compose **_(at-least)_**
  - node:20 and its npm installer

## Implemented Feature

- User authentication APIs
- File Upload with express-fileupload
- Pre-commit hook to check linting/testing and formatting
- Jest used to cover unit/api testing

## Installation

```sh
# Clone
git clone git@github.com:shahanahmed86/nest-server nest-server && cd $_

# copy the example env file and update the values in it
cp .env.example .env
cp .env.example .env.development.local

# development mode
make run-dev-up # to start the server for the first time
make run-dev-rebuild # to rebuild whenever package.json files changes
make run-dev-down # to destroy containers
make run-dev-down-hard # to destroy with clearing data

# testing
make run-test-up # start
make run-test-down # end
make run-test # to run test cases while development run like:
```

## server

```sh
# execute bash inside of the container
docker exec -it container_name bash

# flags
-it # for interactive
```

## mysql

```sh
# docker
docker exec -it container_name mysql -u username -p password db_name

# flags
-it # for interactive
-u # for username
-p # password
db_name # is the name of database
```

## redis

```sh
docker exec -it container_name redis-cli -a password

# flags
-it # for interactive
redis-cli # to load redis command line interface
-a # cli password

# redis commands
scan 0
get "unique_identifier"
ttl "unique_identifier"
del "unique_identifier"
flushall # delete all transactions
```

## git

```sh
git commit -m "message" --no-verify
# flags
--no-verify # it will not call pre-hook of commit where tests/linting will execute
```

## Development hacks

```sh
# ec2 or any other instance of linux
echo "Host ssh-app
  StrictHostKeyChecking no
  Hostname <ip>
  User <user>
  IdentityFile <path/to/file.pem>\n" >> ~/.ssh/config

# to ssh into the server, run this in your terminal
ssh ssh-app
```

NOTE: in order to avoid password/token prompt on git pull command you need to add ssh id_rsa.pub key to your github authorized [SSH Keys](https://github.com/settings/keys 'https://github.com/settings/keys')

