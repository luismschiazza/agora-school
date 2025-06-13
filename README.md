# Ágora

## Sobre o Projeto

Ágora é um sistema desenvolvido para facilitar as funções escolares e automatiza-lás sem perda de rendimento. Utiliza tecnologias modernas para fornecer uma experiência segura, eficiente e escalável.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript
- **Express**: Framework minimalista para servidores web
- **Nodemon**: Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento
- **OpenAI API**: Integração com inteligência artificial para processamento de linguagem natural
- **Orion**: IA de reconhecimento facial proprietária com funções automatizadas
- **JWT & Refresh JWT**: Autenticação segura e renovação de tokens
- **Docker**: Containerização do ambiente para fácil distribuição
- **Sequelize**: ORM para interação eficiente com banco de dados

## Como Executar o Projeto

### 1. Configuração do Ambiente

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) Version: 22.15.0
- [Docker](https://www.docker.com/) Version: 28.1.1
- [MariaDB](https://(https://mariadb.org/))
- [Yarn](https://yarnpkg.com/) Version: 1.22.22

### 2. Clonar o Repositório

```sh
[git clone https://github.com/seu-usuario/agora.git](https://github.com/luismschiazza/-agora-school.git)
cd agora
````

### 3. Instalar Dependências
```sh
yarn install
````

### 4. Configuração do Banco de Dados

Edite o arquivo .env com as informações de conexão e execute as migrações:
```sh
yarn sequelize db:migrate
````

### 5. Executar o Projeto
Modo Desenvolvimento
```sh
yarn dev
````
Modo Produção
```sh
yarn start
````

6. Utilizando Docker
Caso prefira executar com Docker:
```sh
docker-compose up --build
````

API Endpoints

| Método | Rota | Descrição | 
| POST | /login | Autenticação de usuário | 
| POST | /refresh-token | Renovação de JWT | 
| POST | /reconhecimento | Processamento pela IA Orion | 


Contribuição
Sinta-se à vontade para abrir issues e enviar PRs com melhorias! 🛠️
Licença
Este projeto está sob a licença MIT.
