<script lang="ts">
  import type { Todo } from '../types'

  export let todo: Todo
  export let accessToken: string

  const handleChecked = async () => {
    todo.completed = !todo.completed
    await fetch(`${apiBaseUrl}todo`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
    })
  }
</script>

<div class="container">
  <p class="text" class:complete={todo.completed}>{todo.text}</p>
  <input class="checkbox" type="checkbox" checked={todo.completed} on:change={handleChecked} />
</div>

<style>
  .container {
    width: 100%;
    border: 1px dotted #f1f1f1;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .text {
    font-size: 16px;
    font-weight: 300;
  }
  .complete {
    text-decoration: line-through;
  }
  .checkbox {
    outline: none;
  }
</style>
