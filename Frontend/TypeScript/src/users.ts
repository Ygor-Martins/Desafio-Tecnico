// ---------- Tipos ----------

interface User {
  id: number;
  name: string;
  age: number;
}

// Operadores de comparação aceitos pelo filtro genérico
type Comparison = ">" | ">=" | "<" | "<=" | "===";

// Do tipo T, pega apenas os NOMES dos campos cujo valor é number
type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

// ---------- Dados ----------

const users: User[] = [
  { id: 1, name: "Ana", age: 25 },
  { id: 2, name: "Pedro", age: 30 },
  { id: 3, name: "Maria", age: 22 },
];

// ---------- Funções ----------

// Para cada operador, uma função que compara dois números.
// O Record obriga a cobrir TODOS os operadores de Comparison.
const compare: Record<Comparison, (a: number, b: number) => boolean> = {
  ">": (a, b) => a > b,
  ">=": (a, b) => a >= b,
  "<": (a, b) => a < b,
  "<=": (a, b) => a <= b,
  "===": (a, b) => a === b,
};

// Genérica: filtra qualquer lista de objetos por qualquer campo numérico
function filterByNumericField<T, K extends NumericKeys<T>>(
  items: T[],
  field: K,
  operator: Comparison,
  value: number
): T[] {
  return items.filter((item) => compare[operator](item[field] as number, value));
}

// Específica: nomes dos usuários com mais de 23 anos
function getNamesOlderThan23(list: User[]): string[] {
  return filterByNumericField(list, "age", ">", 23).map((user) => user.name);
}

// ---------- Exemplos de uso ----------

console.log(getNamesOlderThan23(users)); // ["Ana", "Pedro"]
console.log(filterByNumericField(users, "age", "<=", 25)); // Ana e Maria
console.log(filterByNumericField(users, "id", ">", 1)); // Pedro e Maria

// filterByNumericField(users, "name", ">", 1);
// ^ erro de compilação: "name" é string, não é campo numérico
