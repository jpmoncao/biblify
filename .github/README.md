<h1 align="center">
  <img src="./bible-icon.png" height="150" width="150" alt="Logo Biblify" /><br>
  Biblify
</h1>

O **Biblify** é um projeto que tem como objetivo te ajudar a descobrir e compreender as riquezas registradas no livro mas impressionante de todos os tempos: *a Bíblia*!
<br/>
A Bíblia não é só um livro, mas a própria Palavra de Deus, por isso, nossa missão é, com a maior excelência, disponibilizar ferramentas para essa sua experiência.

### [🪢 Acesse clicando aqui! ](https://biblify.vercel.app)
#

![GitHub License](https://img.shields.io/github/license/jpmoncao/biblify?labelColor=101010)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/jpmoncao/biblify/XXXXXX.yml?style=flat&labelColor=%23101010)

## Techs

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=ffb20a)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node](https://img.shields.io/badge/node-%DDDDDD.svg?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongoDB-%DDDDDD.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/express-%2320232a.svg?style=for-the-badge&logo=express&logoColor=white)

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

![GitHub](https://img.shields.io/badge/GitHub-fff?style=for-the-badge&logo=github&logoColor=181717)
<!-- ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088ff?style=for-the-badge&logo=github-actions&logoColor=fff) -->

<!-- ## Arquitetura

Descrição sobre arquitetura escolhida, tanto de diretórios (monorepo, MVC, etc.) quando de projeto (monolito, microsserviços, APIs, fluxo de comunicação, etc.), tudo conforme cabível dentro do escopo desejado.

Exemplos com fluxogramas, mermaid e/ou imagens são sempre bem-vindos -->

## Rodando

Antes de iniciar com o desenvolvimento e os comandos, é importante definir as variáveis de ambiente no seu ambiente de desenvolvimento. Abaixo a listagem de quais definir para qual finalidade:

| Variável                           | Tipo     | Necessidade | Default                                   | Descrição                                    |
| :--------------------------------- | :------- | :---------- | :---------------------------------------- | -------------------------------------------- |
| **Variávies de ambiente (Client)** |
| `VITE_BASEURL_API_BIBLE`           | `string` | [Required]  | `https://www.abibliadigital.com.br/api`   | URL da API para recursos da Bíblia           |
| `VITE_TOKEN_API_BIBLE`             | `string` | [Required]  | `secret`                                  | Token de autentificação da API da Bíblia API |
| `VITE_BASEURL_API_ACCOUNT`         | `string` | [Required]  | `http://localhost:5000/api`               | URL da API para gestão de contas de usuário  |
| **Variávies de ambiente (API)**    |
| `MONGO_URI`                        | `string` | [Required]  | `mongodb://localhost:27017/nome_do_banco` | URL de conexão do cliente MongoDB            |
| `PORT`                             | `int`    | [Required]  | `5000`                                    | Porta padrão da API                          |
| `JWT_SECRET`                       | `string` | [Required]  | `secret`                                  | Chave de encriptação do token JWT            |

### Ação
Instalar dependências: `npm install`
>
Inicializar servidor hot-reload de desenvolvimento: `npm run dev`
>
Build da aplicação: `npm run build`

<!--
LISTA DE POSSÍVEIS AÇÕES

Linter
Checagem de Tipos
Conversão TS -> JS
Buscar/iniciar Migrações (Atualizações) de Banco de Dados
Atualizar Estrutura do Banco de Dados com Novas Migrações
Iniciar Testes Automatizados
Popular Banco de Dados para Execução Local
Iniciar o Servidor
...
 -->

## To-Do List

- [x] Definição de uma Licença
- [x] Menu inicial
- [x] Caderno para anotações diárias e isoladas
- [x] API para gerenciamento dos usuários
- [x] Persistir as marcações, anotações e outras informações
- [ ] Modificar menu de estilização do caderno nas versões mobile
- [ ] Copiar e compartilhar versículos
- [ ] Controle de capítulos lidos
- [ ] Integrar caderno de anotações no leitor
- [ ] Menção de endereços bíblicos no caderno
- [ ] Avaliar viabilidade de criação de testes automatizados
- [ ] Workflow de teste - se aplicável

<!-- ## Contrib

Definições curtas e objetivas de padrões a serem seguidos para contribuição de PRs.

Padrões em detalhes, explicações e informações/solicitações mais profundas em um "CONTRIBUTING.MD"; vide [https://github.com/jessesquires/.github/blob/main/CONTRIBUTING.md](https://github.com/jessesquires/.github/blob/main/CONTRIBUTING.md)
-->

## Licença
`Biblify` is licensed under the terms of the Boost Software License. 
See [LICENSE_1_0.txt](http://www.boost.org/LICENSE_1_0.txt) for more information.
