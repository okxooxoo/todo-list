function TodoStats($container) {
	this.$container = $container

	this.render = (todos) => {
		const total = todos.length
		const completed = todos.filter(todo => todo.isCompleted).length

		this.$container.innerHTML = `
			<div class="todo-stats">
				완료된 할 일: ${completed} / 전체 할 일: ${total}
			</div>
		`
	}
}

export default TodoStats
