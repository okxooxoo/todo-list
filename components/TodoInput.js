function TodoInput($container, onAdd) {
	this.$container = $container

	this.render = () => {
		this.$container.innerHTML = `
			<div class="todo-input-wrapper">
				<input type="text" class="new-todo-input" placeholder="할 일을 입력하세요" />
				<button type="button" class="add-btn">추가</button>
			</div>
		`

		const $input = this.$container.querySelector('.new-todo-input')
		const $addBtn = this.$container.querySelector('.add-btn')

		$addBtn.addEventListener('click', () => {
			const value = $input.value.trim()
			if (!value) return
			$input.value = ''
			onAdd(value)
		})

		$input.addEventListener('keydown', (e) => {
			if (e.key !== 'Enter') return
			const value = $input.value.trim()

			if (!value) return
			$input.value = ''
			onAdd(value)
		}
		)
	}
}

export default TodoInput
