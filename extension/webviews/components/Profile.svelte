<script lang="ts">
  import type { User } from '../types'

  export let user: User
</script>

<div class="container">
  {#if user.avatar}
    <img src={user.avatar} alt={`${user.name}'s avatar`} class="avatar" />
  {:else}
    <p>No avatar</p>
  {/if}

  <h1 class="username">{user.name}</h1>
</div>

<style>
  .container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 16px;
    margin-bottom: 24px;
  }
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    margin-right: 16px;
  }
  .username {
    font-size: 18px;
  }
</style>
