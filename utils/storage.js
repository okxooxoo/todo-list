const STORAGE_KEY = 'todos'

export const loadTodos = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : []
}

export const saveTodos = (data) => {
  const cleanData = data
    .filter(todo => todo && typeof todo.name === 'string') // ✅ null 방지
    .map(({ name, isCompleted }) => ({
      name,
      isCompleted,
    }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData))
}