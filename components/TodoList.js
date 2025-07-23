function TodoList($container, { handleEdit, handleSave, handleDelete, handleComplete, handleCompleteAll, handleDeleteAll }) {
  this.$container = $container

  this.render = (todos) => {
    this.data = todos
    this.$container.innerHTML = `
    <div class="bulk-actions">
      <button type="button" class="complete-all-btn">전체 완료</button>
      <button type="button" class="delete-all-btn">전체 삭제</button>
    </div>

    <ul>${this.data
        .map(
          (todo, index) => {
            if (todo.isEditing) {
              return `
                <li data-index="${index}">
                  <input type="text" value="${todo.name}" class="edit-input" />
                  <button type="button" class="save-btn">저장</button>
                </li>
              `
            }

            if (todo.isCompleted) {
              return `
                <li data-index="${index}">
                  <input type="checkbox" class="toggle-complete" checked />
                  <span class="toggle-complete-text" style="text-decoration: line-through;">${todo.name}</span>
                  <button type="button" class="delete-btn">삭제</button>
                </li>
              `
            }

            return `
              <li data-index="${index}">
                <input type="checkbox" class="toggle-complete" />
                <span class="toggle-complete-text">${todo.name}</span>
                <button type="button" class="edit-btn">수정</button>
                <button type="button" class="delete-btn">삭제</button>
              </li>
            `
          })
        .join('')}
    </ul>`
  }

  this.$container.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-all-btn')) {
      handleCompleteAll()
    }

    if (e.target.classList.contains('delete-all-btn')) {
      handleDeleteAll()
    }

    const $li = e.target.closest('li')
    if (!$li) return
    const index = Number($li.dataset.index)

    if (e.target.classList.contains('edit-btn')) {
      handleEdit(index)
    }

    if (e.target.classList.contains('save-btn')) {
      const input = $li.querySelector('.edit-input')
      handleSave(input.value, index)
    }

    if (e.target.classList.contains('delete-btn')) {
      handleDelete(index)
    }

    if (e.target.classList.contains('toggle-complete-text')) {
      handleComplete(index)
    }
  })

  this.$container.addEventListener('change', (e) => {
    const $li = e.target.closest('li')
    if (!$li) return
    const index = Number($li.dataset.index)

    if (e.target.classList.contains('toggle-complete')) {
      handleComplete(index, e.target.checked)
    }
  })
}

export default TodoList
