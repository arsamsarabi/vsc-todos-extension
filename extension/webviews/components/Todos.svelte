<script lang="ts">
  import { onMount } from 'svelte'

  import type { Todo } from '../types'
  import TodoItem from './TodoItem.svelte'

  let todos: Todo[] = []
  let text = ''
  export let accessToken: string

  const addTodo = async (t: string) => {
    const response = await fetch(`${apiBaseUrl}todo`, {
      method: 'POST',
      body: JSON.stringify({
        text: t,
      }),
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
    })
    const { todo } = await response.json()
    todos = [todo, ...todos]
    text = ''
  }

  onMount(async () => {
    window.addEventListener('message', async (event) => {
      const message = event.data
      switch (message.type) {
        case 'new-todo': {
          addTodo(message.value)
          break
        }
      }
    })

    const response = await fetch(`${apiBaseUrl}todo`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    const remoteTodos = await response.json()
    todos = remoteTodos.todos
  })
</script>

<form
  class="todo-form"
  on:submit|preventDefault={async () => {
    if (text === '') return
    addTodo(text)
  }}
>
  <input bind:value={text} placeholder="Todo text ..." />
</form>

{#each todos as todo (todo._id)}
  <TodoItem {todo} {accessToken} />
{/each}

<style>
  .todo-form {
    margin-bottom: 16px;
  }

  input {
    border: 1px solid white;
  }
</style>
