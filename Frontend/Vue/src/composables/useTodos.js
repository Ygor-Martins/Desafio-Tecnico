import { ref, computed } from 'vue'

export const FILTERS = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'done', label: 'Concluídas' },
]

export function useTodos() {
  const todos = ref([])
  const filter = ref('all')
  let nextId = 1

  // Adiciona uma nova tarefa. Retorna true se foi adicionada.
  function addTodo(title) {
    const clean = title.trim()
    if (!clean) return false

    todos.value.push({ id: nextId++, title: clean, done: false })
    return true
  }

  // Marca/desmarca uma tarefa como concluída.
  function toggleTodo(id) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.done = !todo.done
  }

  // Remove uma tarefa da lista.
  function removeTodo(id) {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  function setFilter(value) {
    filter.value = value
  }

  const filteredTodos = computed(() => {
    if (filter.value === 'pending') return todos.value.filter((t) => !t.done)
    if (filter.value === 'done') return todos.value.filter((t) => t.done)
    return todos.value
  })

  const totalCount = computed(() => todos.value.length)
  const doneCount = computed(() => todos.value.filter((t) => t.done).length)
  const pendingCount = computed(() => totalCount.value - doneCount.value)

  return {
    todos,
    filter,
    filteredTodos,
    totalCount,
    doneCount,
    pendingCount,
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
  }
}
