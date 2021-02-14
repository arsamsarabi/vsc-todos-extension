<script lang="ts">
  import { onMount } from 'svelte'

  let todos: Array<{ text: string; completed: boolean }> = []
  let text = ''

  onMount(() => {
    window.addEventListener('message', (event) => {
      const message = event.data
      switch (message.type) {
        case 'new-todo': {
          todos = [{ text: message.value, completed: false }, ...todos]
          break
        }
      }
    })
  })
</script>

<form
  on:submit|preventDefault={() => {
    todos = [{ text, completed: false }, ...todos]
    text = ''
  }}
>
  <input bind:value={text} />
</form>

<ul>
  {#each todos as { text, completed } (text)}
    <li
      on:click={() => {
        completed = !completed
      }}
      class:complete={completed}
    >
      {text}
    </li>
  {/each}
</ul>

<style>
  input {
    border: 1px solid white;
  }

  .complete {
    text-decoration: line-through;
  }
</style>
