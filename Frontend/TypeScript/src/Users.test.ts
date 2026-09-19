import { test } from "node:test";
import assert from "node:assert/strict";
import { filterByNumericField, getNamesOlderThan23, type User } from "./users.ts";

const users: User[] = [
  { id: 1, name: "Ana", age: 25 },
  { id: 2, name: "Pedro", age: 30 },
  { id: 3, name: "Maria", age: 22 },
];

test("getNamesOlderThan23 retorna só os nomes de quem tem mais de 23 anos", () => {
  assert.deepEqual(getNamesOlderThan23(users), ["Ana", "Pedro"]);
});

test("getNamesOlderThan23 não inclui quem tem exatamente 23", () => {
  const lista: User[] = [{ id: 1, name: "Leo", age: 23 }];
  assert.deepEqual(getNamesOlderThan23(lista), []);
});

test("filterByNumericField filtra por age", () => {
  const nomes = filterByNumericField(users, "age", "<=", 25).map((u) => u.name);
  assert.deepEqual(nomes, ["Ana", "Maria"]);
});

test("filterByNumericField filtra por id", () => {
  const ids = filterByNumericField(users, "id", ">", 1).map((u) => u.id);
  assert.deepEqual(ids, [2, 3]);
});

test("filterByNumericField com lista vazia retorna lista vazia", () => {
  assert.deepEqual(filterByNumericField<User, "age">([], "age", ">", 0), []);
});