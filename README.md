<img src="https://raw.githubusercontent.com/thauanbo/thauanbo/refs/heads/main/img/banner-project.png" alt="Banner" width="100%">

# Script 

Este projeto foi realizado de forma educacional, com o princípio fundamental na experiência de interação e manipulação de páginas web.
## Funcionalidades

- Injetado um botão na parte inferior da página;

- O Sistema é iniciado por injeção desse Script na página;

- Sistema captura as questões com múltiplas respostas e envia para a API;

- O Sistema captura os blocos da API e realiza a injeção individual do retorno;

## Estrutura do Projeto

```
meu-projeto/
├── .env
├── http-client.private.env.json
├── src/
│   └── index.js
├── package.json
└── README.md
```
## Stack utilizada

**Back-end:**
Javascript


## Clone o Projeto

```bash
  git clone https://github.com/thauanbo/AnswerInjector.git
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`API_KEY`: Chave de autenticação para a API.

## Uso/Exemplos

Antes do Processamento
```html
<div class="no">Questão 1</div>
<div class="no">Questão 2</div>
```
Após o Processamento
```html
<div class="no">Questão 1
    <div class="resposta">1 = m/v/t/m/j/s/u/n</div>
</div>
<div class="no">Questão 2
    <div class="resposta">2 = a/b/c</div>
</div>
```
## Captura/Resposta

```
1 = Quais são os planetas do sistema solar?
```
```
1 = m/v/t/m/j/s/u/n (Mercúrio/Vênus/Terra/Marte/Júpiter/Saturno/Urano/Netuno)
```


## 🔗 Links
[![github](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/thauanbo)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thauan-barbosa/)
