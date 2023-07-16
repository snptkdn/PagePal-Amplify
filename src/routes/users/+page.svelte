<script lang="ts">
	import Menu from '../menu.svelte';
  import { BackendHost, CurrentUser } from '../../store.js'
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(async () => {
    if ($CurrentUser.ID === 0) {
      goto('/');
    }
  });
</script>

<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css" />

<ion-content fullscreen>
	<ion-list>
		<ion-list-header>MySelf</ion-list-header>
		<ion-item>
			<ion-label>
				<h2>Finn</h2>
				<h3>I'm a big deal</h3>
				<p>Listen, I've had a pretty messed up day...</p>
			</ion-label>
		</ion-item>
	</ion-list>
</ion-content>

<style>
	ion-card img {
	}

	.description {
		margin-bottom: 20px;
	}
</style>
