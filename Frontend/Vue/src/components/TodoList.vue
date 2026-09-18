<script setup>
import { ref, computed } from "vue";
import { useTodos, FILTERS } from "../composables/useTodos";

const {
  filter,
  filteredTodos,
  totalCount,
  doneCount,
  pendingCount,
  addTodo,
  toggleTodo,
  removeTodo,
  setFilter,
} = useTodos();

const newTodo = ref("");

function handleSubmit() {
  if (addTodo(newTodo.value)) {
    newTodo.value = "";
  }
}

// Quantidade exibida ao lado de cada botão do filtro
const counts = computed(() => ({
  all: totalCount.value,
  pending: pendingCount.value,
  done: doneCount.value,
}));

// Mensagem mostrada quando não há tarefas para exibir no filtro atual
const emptyMessage = computed(() => {
  if (totalCount.value === 0)
    return "Nenhuma tarefa ainda. Digite acima e adicione a primeira.";
  if (filter.value === "pending") return "Nenhuma tarefa pendente. Tudo em dia!";
  if (filter.value === "done") return "Nenhuma tarefa concluída ainda.";
  return "";
});
</script>

<template>
  <section class="todo" aria-labelledby="todo-title">
    <header class="todo__header">
      <h1 id="todo-title" class="todo__title">Minhas tarefas</h1>
      <p class="todo__summary" aria-live="polite">
        {{ pendingCount }} {{ pendingCount === 1 ? "pendente" : "pendentes" }} de
        {{ totalCount }}
      </p>
    </header>

    <form class="todo__form" @submit.prevent="handleSubmit">
      <label class="visually-hidden" for="new-todo">Nova tarefa</label>
      <input
        id="new-todo"
        v-model="newTodo"
        class="todo__input"
        type="text"
        placeholder="O que precisa ser feito?"
        maxlength="120"
        autocomplete="off"
      />
      <!-- <button class="btn btn--primary" type="submit" :disabled="!newTodo.trim()">
        Adicionar
      </button>  -->
      <button
        class="btn btn--primary"
        type="submit"
        aria-label="Adicionar tarefa"
        title="Adicionar tarefa"
        :disabled="!newTodo.trim()"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
    </form>

    <div class="todo__filters" role="group" aria-label="Filtrar tarefas">
      <button
        v-for="option in FILTERS"
        :key="option.value"
        type="button"
        class="filter"
        :class="{ 'filter--active': filter === option.value }"
        :aria-pressed="filter === option.value"
        @click="setFilter(option.value)"
      >
        {{ option.label }}
        <span class="filter__count">{{ counts[option.value] }}</span>
      </button>
    </div>

    <ul v-if="filteredTodos.length" class="todo__list">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="item"
        :class="{ 'item--done': todo.done }"
      >
        <label class="item__label">
          <input
            class="item__check"
            type="checkbox"
            :checked="todo.done"
            @change="toggleTodo(todo.id)"
          />
          <span class="item__text">{{ todo.title }}</span>
        </label>
        <!-- <button
          type="button"
          class="btn btn--danger"
          :aria-label="`Excluir tarefa: ${todo.title}`"
          @click="removeTodo(todo.id)"
        >
          Excluir
        </button> -->

        <button
          type="button"
          class="btn btn--danger"
          title="Excluir tarefa"
          :aria-label="`Excluir tarefa: ${todo.title}`"
          @click="removeTodo(todo.id)"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </li>
    </ul>

    <p v-else class="todo__empty">{{ emptyMessage }}</p>
  </section>
</template>

<style scoped>
.todo {
  --ink: #2b2a2a;
  --muted: #666666;
  --line: #e1e6ea;
  --field-line: #cccccc;
  --surface: #ffffff;
  --tint: #eef3f5;
  --accent: #116ce2;
  --accent-hover: #1157b3;
  --accent-ink: #ffffff;
  --danger: #b42318;

  width: 100%;
  max-width: 36rem;
  margin: 0 auto;
  padding: 1.5rem;
  background: var(--surface);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: var(--ink);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: left;
}

.todo__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.todo__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.todo__summary {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}

/* Formulário */
.todo__form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.todo__input {
  flex: 1;
  min-width: 0;
  padding: 0.65rem 0.8rem;
  font: inherit;
  color: inherit;
  background: var(--surface);
  border: 1px solid var(--field-line);
  border-radius: 4px;
}

.todo__input::placeholder {
  color: var(--muted);
}

/* Botões */
.btn {
  padding: 0.6rem 1rem;
  font: inherit;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, color 0.15s;
}

.btn--primary {
  padding: 0 1.5rem;
  height: 2.5rem;
  background: var(--accent);
  color: var(--accent-ink);
  border-radius: 20px;
  font-weight: 500;
}

.btn--primary:hover:not(:disabled) {
  background: var(--accent-hover);
}

.btn--primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.btn--danger {
  padding: 0.35rem 0.7rem;
  font-size: 0.85rem;
  background: transparent;
  color: var(--danger);
  border-color: transparent;
}

.btn--danger:hover {
  border-color: var(--danger);
}

/* Filtro */
.todo__filters {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  margin-bottom: 1rem;
  background: var(--tint);
  border-radius: 0.6rem;
}

.filter {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.45rem 0.5rem;
  font: inherit;
  font-size: 0.9rem;
  color: var(--muted);
  background: transparent;
  border: 0;
  border-radius: 0.45rem;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.filter:hover {
  color: var(--ink);
}

.filter--active {
  background: var(--surface);
  color: var(--ink);
  font-weight: 600;
  box-shadow: 0 0 0 1px var(--line);
}

.filter__count {
  min-width: 1.4em;
  padding: 0 0.35em;
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  background: var(--tint);
  border-radius: 999px;
}

.filter--active .filter__count {
  background: var(--accent);
  color: var(--accent-ink);
}

/* Lista */
.todo__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.7rem 0;
  border-top: 1px solid var(--line);
}

.item:first-child {
  border-top: 0;
}

.item__label {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  cursor: pointer;
}

.item__check {
  flex: none;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0;
  accent-color: var(--accent);
  cursor: pointer;
}

.item__text {
  overflow-wrap: anywhere;
}

.item--done .item__text {
  color: var(--muted);
  text-decoration: line-through;
}

.todo__empty {
  margin: 1.5rem 0 0.5rem;
  color: var(--muted);
  text-align: center;
}

/* Acessibilidade */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.todo :focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media (max-width: 30rem) {
  .todo {
    padding: 1rem;
  }

  .todo__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn,
  .filter {
    transition: none;
  }
}
</style>
