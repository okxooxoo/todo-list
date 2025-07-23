import TodoStats from './components/TodoStats.js'
import TodoList from './components/TodoList.js'
import { model } from './model/model.js'

function App() {
  this.data = []
  this.todoStats = null
  this.todoList = null
  this.$todoStats = document.querySelector('#todo-stats')
  this.$todoList = document.querySelector('#todo-list')

  this.init = () => {
    const savedData = localStorage.getItem('todos')
    this.data = savedData ? JSON.parse(savedData) : model

    this.data = this.data.map(todo => ({ ...todo, isEditing: false }))

    this.todoStats = new TodoStats(this.$todoStats)
    this.todoList = new TodoList(this.$todoList)

    this.setEventListeners()
    this.render()
  }

  this.setEventListeners = () => {
    this.$todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-btn')) {
        const $input = this.$todoList.querySelector('.new-todo-input')
        const value = $input.value.trim()
        if (value) {
          $input.value = ''
          const newTodo = { name: value, isCompleted: false, isEditing: false }
          const updatedData = [...this.data, newTodo]
          this.setState(updatedData)
        }
      }

      // 전체 완료 버튼 클릭
      if (e.target.classList.contains('complete-all-btn')) {
        const updatedData = this.data.map(todo => ({
          ...todo,
          isCompleted: true
        }))
        this.setState(updatedData)
      }

      // 전체 삭제 버튼 클릭
      if (e.target.classList.contains('delete-all-btn')) {
        this.setState([])
      }

      const $li = e.target.closest('li')
      if (!$li) return
      const index = $li.dataset.index

      if (e.target.classList.contains('toggle-complete')) {
        const updatedData = this.data.map((todo, i) =>
          i === Number(index)
            ? { ...todo, isCompleted: e.target.checked }
            : todo
        )
        this.setState(updatedData)
      }

      if (e.target.classList.contains('toggle-complete-text')) {
        const updatedData = this.data.map((todo, i) =>
          i === Number(index)
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        )
        this.setState(updatedData)
      }

      if (e.target.classList.contains('delete-btn')) {
        const updatedData = this.data.filter((_, i) => i !== Number(index))
        this.setState(updatedData)
      }

      if (e.target.classList.contains('edit-btn')) {
        this.data[index].isEditing = true
        this.render()
      }

      if (e.target.classList.contains('save-btn')) {
        const $input = $li.querySelector('.edit-input')
        const updatedData = [...this.data]
        updatedData[index] = {
          ...updatedData[index],
          name: $input.value,
          isEditing: false
        }
        this.setState(updatedData)
      }
    })

    // Enter 키로도 Todo 추가할 수 있도록 함
    this.$todoList.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const $input = this.$todoList.querySelector('.new-todo-input')
        const value = $input.value.trim()
        if (value) {
          $input.value = ''
          this.setState([...this.data, { name: value, isCompleted: false, isEditing: false }])
        }
      }
    })
  }

  this.saveToLocalStorage = () => {
    const cleanData = this.data.map(({ name, isCompleted }) => ({
      name,
      isCompleted
    }))
    localStorage.setItem('todos', JSON.stringify(cleanData))
  }

  // 상태 변경 시 Local Storage에 저장 후 리렌더링
  this.setState = (nextState) => {
    this.data = nextState
    this.saveToLocalStorage()
    this.render()
  }

  this.render = () => {
    this.todoList.render(this.data)
    this.todoStats.render(this.data)
  }

  this.init()
}

export default App
