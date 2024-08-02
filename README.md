# Frontend da Aplicação

Este repositório contém o código-fonte para o frontend da aplicação, desenvolvido em React. Este README fornece instruções para iniciar e testar a aplicação.

## Funcionalidades

- Tela de Cadastro de Usuário
- Tela de Login
- Tela de Lista de Tarefas
- Estilização das Telas Criadas

## Requisitos

Certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão recomendada: 16.x ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes)

## Configuração do Projeto

1. **Clone o repositório**

   git clone [https://github.com/seu-usuario/seu-repositorio-frontend.git](https://github.com/Mateus2201/Corebiz.git)
   cd seu-repositorio-frontend

## Instale as dependências

   ```npm install```
   
## Configure as variáveis de ambiente

Por Exemplo:
REACT_APP_API_URL=http://localhost:3001/api
Nota: Substitua http://localhost:3001/api pelo URL do seu backend.

## Executando a Aplicação
Inicie o servidor de desenvolvimento

```npm start```

**Isso iniciará a aplicação em http://localhost:3000.**

Abra o navegador e acesse http://localhost:3000 para visualizar a aplicação em execução.

## Testando a Aplicação
Execute os testes unitários

```npm test```

Isso executará todos os testes unitários configurados para a aplicação.

**Execute os testes de integração**

Se você tiver testes de integração configurados, você pode executá-los com o comando apropriado:


```npm run test:integration```

Caso contrário, ajuste conforme necessário.

## Modelos de Autenticação
Para a tela de login, você pode escolher entre os seguintes modelos de autenticação:

Autenticação com JWT: O frontend envia o e-mail e a senha para o backend, que retorna um token JWT.
Autenticação com Sessões: O frontend envia o e-mail e a senha, e o backend cria uma sessão para o usuário.
Consulte o arquivo de configuração ou o código da tela de login para ver qual modelo está implementado.

## Estilização
A estilização das telas é feita utilizando TailwindCss.


## Requisitos
Node.js (versão recomendada: 16.x ou superior)
npm (gerenciador de pacotes)
MySQL

**Configuração do Backend**

```cd backend```

## Instale as dependências

```npm install```

Configure as variáveis de ambiente

**Exemplo:**
PORT=3001
DATABASE_URL=mysql://usuario:senha@localhost:3306/nome_do_banco
Nota: Substitua mysql://usuario:senha@localhost:3306/nome_do_banco pelas credenciais do seu banco de dados.

## Inicie o servidor

```npm start```
Isso iniciará o servidor backend em http://localhost:3001.

## Execute os testes

```npm test```

Isso executará todos os testes configurados para o backend.

