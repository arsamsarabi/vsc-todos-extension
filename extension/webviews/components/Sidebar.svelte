<script lang="ts">
  import { onMount } from 'svelte'

  import Profile from './Profile.svelte'
  import Todos from './Todos.svelte'
  import type { User } from '../types'

  let accessToken = ''
  let loading = true
  let user: User | null = null
  let page: 'todos' | 'profile' = tsvscode.getState()?.page || 'todos'

  $: {
    tsvscode.setState({ page })
  }

  onMount(async () => {
    window.addEventListener('message', async (event) => {
      const message = event.data
      switch (message.type) {
        case 'token': {
          accessToken = message.value
          const response = await fetch(`${apiBaseUrl}user/me`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          })
          const data = await response.json()
          user = data.user
          loading = false
          break
        }
      }
    })

    tsvscode.postMessage({ type: 'get-token', value: undefined })
  })
</script>

{#if loading}
  <div>Loading...</div>
{:else if user}
  {#if page === 'todos'}
    <Todos {accessToken} />
  {:else}
    <Profile {user} />
  {/if}
  <button
    on:click={() => {
      page === 'todos' ? (page = 'profile') : (page = 'todos')
    }}
  >
    {page === 'todos' ? 'Profile' : 'Todos'}
  </button>
  <button
    on:click={() => {
      accessToken = ''
      user = null
      tsvscode.postMessage({ type: 'logout', value: undefined })
    }}>logout</button
  >
{:else}
  <button
    on:click={() => {
      tsvscode.postMessage({ type: 'authenticate', value: undefined })
    }}>login with Github</button
  >
{/if}

<style>
</style>
