# Projeto lojinha de prêmios

## Descrição

Aplicação para um programa de fidelidade de uma empresa, onde os clientes podem acumular pontos e trocá-los por prêmios em uma loja virtual. A aplicação permite que os usuários visualizem os produtos disponíveis, adicionem itens ao carrinho, verifiquem seu saldo de pontos e realizem o checkout utilizando seus pontos acumulados.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para criar interfaces de usuário.
  -- **React-hook-form**: Gerenciamento de formulários em React.
  -- **React-icons**: Conjunto de ícones.
  -- **React-router-dom**: Roteamento para navegação em aplicações React.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **SASS/SCSS**: Pré-processador CSS para estilização de componentes React.
- **Json-server**: API REST fake para desenvolvimento e testes.
- **Moment**: Manipulação e formatação de datas em JavaScript.
- **Concurrently**: Executar multiplus comandos (Executar api em seguida iniciar a aplicação).
- **Yarn**: Gerenciador de pacotes para o projeto.

## Funcionalidades

- **Listagem de produtos**: Listagem dos produtos que podem ser trocados por pontos.
- **Historico de compras**: Mostra detalhes dos produtos que fora comprados anteriormente dividido por hoje, esta semana, este mês e mais antigas.
- **Carrinho de compras**: Sidescreen para visualizar os produtos que foram escolhidos, assim como os valores, quantidade e total da compra.
- **Checkout**: Efetuar a compra dos itens escolhidos no carrinho utilizando os pontos acumulados.

## Instalação

Para instalar as dependências do projeto, utilize o Yarn.

- **Instalar as Dependências**: Execute o seguinte comando na raiz do projeto:

```bash
yarn install
```

## Script

- **Iniciar a Aplicação**: Para iniciar a aplicação, execute:

```bash
yarn start
```

## Estrutura do Projeto

- **`src/`**: Contém o código-fonte da aplicação.
  - **`@types/`**: Definições globais de arquivos.
  - **`components/`**: Componentes reutilizáveis da aplicação.
  - **`pages/`**: Páginas da aplicação.
  - **`context/`**: Contextos React para gerenciamento de estado e lógica de negócios.
  - **`services/`**: Serviços para chamadas à API.
  - **`interfaces/`**: Tipos e interfaces TypeScript.
- **`db.json/`**: Arquivo mock de dados do json-server.
- **`public/`**: Arquivos estáticos e a estrutura básica do HTML.
- **`package.json`**: Configuração do projeto e scripts.
- **`tsconfig.json`**: Configuração do TypeScript.
