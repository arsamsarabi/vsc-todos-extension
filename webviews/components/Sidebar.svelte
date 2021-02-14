<script lang="ts">
  let todos: Array<{ text: string; completed: boolean }> = []
  let text = ''
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

<pre>
  {JSON.stringify(todos, null, 2)}
</pre>

<style>
  input {
    border: 1px solid white;
  }

  .complete {
    text-decoration: line-through;
  }
</style>
