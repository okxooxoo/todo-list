function TodoList($container) {
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

}

export default TodoList
