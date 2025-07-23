import TodoStats from './components/TodoStats.js'
import TodoList from './components/TodoList.js'
import TodoInput from './components/TodoInput.js'
import { loadTodos, saveTodos } from './utils/storage.js'

function App() {
	this.data = []

	this.todoStats = null
	this.todoList = null
	this.todoInput = null
	this.$todoStats = document.querySelector('#todo-stats')
	this.$todoList = document.querySelector('#todo-list')
	this.$todoInput = document.querySelector('#todo-input')

	this.init = () => {
		this.data = loadTodos().map(todo => ({ ...todo, isEditing: false }))

		this.todoStats = new TodoStats(this.$todoStats)
		this.todoInput = new TodoInput(this.$todoInput, handleAdd)
		this.todoList = new TodoList(this.$todoList, {
			handleEdit,
			handleSave,
			handleDelete,
			handleComplete,
			handleCompleteAll,
			handleDeleteAll,
		})

		this.render()
	}

	const handleAdd = (value) => {
		const newData = [...this.data, { name: value, isCompleted: false, isEditing: false }]
		this.setState(newData)
	}

	const handleEdit = (index) => {
		const updatedData = this.data.map((todo, i) =>
			i === index ? { ...todo, isEditing: true } : todo
		)
		this.setState(updatedData)
	}

	const handleSave = (newValue, index) => {
		const updatedData = [...this.data]
		updatedData[index] = {
			...updatedData[index],
			name: newValue,
			isEditing: false
		}
		this.setState(updatedData)
	}

	const handleDelete = (index) => {
		const updatedData = this.data.filter((_, i) => i !== index)
		this.setState(updatedData)
	}

	const handleComplete = (index) => {
		const updatedData = this.data.map((todo, i) =>
			i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
		)
		this.setState(updatedData)
	}

	const handleCompleteAll = () => {
		const updatedData = this.data.map(todo => ({ ...todo, isCompleted: true }))
		this.setState(updatedData)
	}

	const handleDeleteAll = () => {
		this.setState([])
	}

	this.setState = (nextState) => {
		this.data = nextState
		saveTodos(this.data)
		this.render()
	}

	this.render = () => {
		console.log("렌더링")
		this.todoList.render(this.data)
		this.todoStats.render(this.data)
		this.todoInput.render()
	}

	this.init()
}

export default App
