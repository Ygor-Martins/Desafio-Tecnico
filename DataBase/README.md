# Banco de Dados

Esta etapa utiliza MySQL para trabalhar com uma tabela de usuários.

## Estrutura

A tabela `users` possui os seguintes campos:

* `id`: identificador do usuário.
* `name`: nome do usuário.
* `email`: e-mail do usuário.
* `created_at`: data de criação do usuário.

## Consultas

### 1. Usuários por data de criação

A consulta utiliza `ORDER BY created_at DESC` para ordenar os usuários da data de criação mais recente para a mais antiga.

### 2. Usuários criados por mês

A consulta utiliza `COUNT()` para contar os usuários e `GROUP BY` para agrupá-los pelo ano e mês de criação.

As consultas foram testadas utilizando os dados fornecidos no desafio.
