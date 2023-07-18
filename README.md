
---

# Boas vindas ao repositório Serverless - FullStack <a name="boas-vindas-ao-repositório-serverless"></a>

---

# Sumário

- [Boas vindas ao repositório Serverless - FullStack](#boas-vindas-ao-repositório-serverless)
- [Back-End](#back-end)
  - [O que foi desenvolvido](#o-que-foi-desenvolvido-back)
  - [Conexão com o Banco](#conexao-db)
    - [Conexão local](#conexao-local-back)
  - [Para testar o projeto](#testar-o-projeto-back)
  - [Testes desenvolvidos](#tdd-back)
    - [Testes](#tdd-1-back)
  - [Endpoint's](#endpoint)
    - [Para buscar dados POST](#task-post)
    - [Para buscar funcionário POST](#task-get)
    - [Para adicionar funcionário POST](#task-put)
- [Front-End](#front-end)
  - [O que foi desenvolvido](#o-que-foi-desenvolvido-front)
  - [Para testar o projeto](#testar-o-projeto-front)
    - [Conexão local](#conexao-local-front)
  - [Testes desenvolvidos](#tdd-front)
    - [Testes](#tdd-1-front)
- [Protótipo](#prototipo)

---

# Back-End <a name="back-end"></a>

## O que foi desenvolvido: <a name="o-que-foi-desenvolvido-back"></a>

  Foi desenvolvido um back-end para um sistema para consultar o headcound e turnover de um empresa

  A tabela de funcionários é inserida em um banco de dados **PostgreSQL** sendo possível modelar os dados através do **prisma ORM**

  É possível:
   - Consultar dados de um funcionário
   - Adicionar novo funcionário

---

### Conexão com o Banco: <a name="conexao-db"></a>

#### Conexão local <a name="conexao-local-back"></a>

**⚠️ IMPORTANTE! ⚠️**

Aplicação utilizado o banco de dados **PostgreSQL**

Essa API utiliza as seguintes variáveis de ambiente:

```sh
DATABASE_URL="postgresql://user:password@host:port/mydb?schema=public""
```
---

## Para testar o projeto Localmente: <a name="testar-o-projeto-back"></a>

1. Clone o repositório
  * `https://github.com/Thiago-FR/serverless.git`.
  * Entre na pasta do repositório que você acabou de clonar

2. Acesse a past back-end
  * `cd backend`

3. Rode a API local
  * Entre na pasta */backend*

4. Instale as dependências
  * `npm install`

5. Inicie a API.
  * `npm run dev`

Obs: Este projeto utiliza variável de ambiente veja a sessação - [Conexão com o Banco](#conexao-db)

---

## Testes desenvolvidos: <a name="tdd-back"></a>

### Testes <a name="tdd-1--back"></a>

1. Após instalar as dependências rode o comando:
  * `npm test`

---

## Endpoint's <a name="endpoint"></a>

### Para buscar dados POST <a name="task-post"></a>

* Endpoint: `/role`

Body
```json
  { 
    "email": "",
    "ano": "",
  }
 ```

Reponse
```json
  {
    "result": {
      "headcount": {
        "id": "",
        "color": "hsl(291, 70%, 50%)",
        "data": [
          {
            "x": "",
            "y": 0
          },
          ...
        ]
      },
      "turnover": {
        "id": "",
        "color": "hsl(291, 70%, 50%)",
        "data": [
          {
            "x": "",
            "y": null
          },
          ...
        ]
      }
    }
  }
```
---

### Para buscar funcionário POST <a name="task-get"></a>

* Endpoint: `/login`

```json
  [
    {
      "email": ""
    },
  ]
```

Reponse
```json
  {
    "id": 0,
    "status": "",
    "nome": "",
    "email": "",
    "emailDoGestor": "",
    "dataDeAdmissao": "",
    "dataDeRecisao": "",
    "cargo": ""
  }
```
---

### Para adicionar funcionário POST <a name="task-put"></a>

* Endpoint: `/employee`

Body
```json
  {
    "status": "",
    "nome": "",
    "email": "",
    "emailDoGestor": "",
    "dataDeAdmissao": "",
    "dataDeRecisao": "",
    "cargo": ""
  }
```
---

# Front-End <a name="front-end"></a>

## O que foi desenvolvido: <a name="o-que-foi-desenvolvido-front"></a>

  Foi desenvolvido um fron-end para demostrar os gráficos de headcound e turnover de um empresa

  É possível:
   - Logar no sistema conforme e-mail ativo
   - Consultar gráficos pré estabelecido pelo backend

---

## Para testar o projeto: <a name="testar-o-projeto-front"></a>

---

#### Conexão local <a name="conexao-local-front"></a>

**⚠️ IMPORTANTE! ⚠️**

Essa aplicação as seguintes variáveis de ambiente para conexão com o back-end:

```sh
REACT_APP_HOST="http://localhost:3001"
```

---

1. Clone o repositório
  * `https://github.com/Thiago-FR/serverless.git`.
  * Entre na pasta do repositório que você acabou de clonar

2. Acesse a pasta front-end
  * `cd frontend`

3. Rode localmente
  * Entre na pasta */frontend*

4. Instale as dependências
  * `npm install`

5. Inicie o projeto.
  * `npm start`

Obs: É recomendado subir o back-end antes de testar a aplicação!

---

## Testes desenvolvidos: <a name="tdd-front"></a>

### Testes <a name="tdd-1-front"></a>

1. Após instalar as dependências rode o comando:
  * `npm test`

---

## Protótipo <a name="prototipo"></a>
![Prototipo]()

---
