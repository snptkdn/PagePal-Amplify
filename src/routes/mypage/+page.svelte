<script lang="ts">
	import Menu from '../menu.svelte';
	import { onMount } from 'svelte';
  import { BackendHost} from '../../store.js'
  import { CurrentUser } from '../../store.js';

	let histories = [];

	onMount(async () => {
    if ($CurrentUser.ID !== 0) {
      const response = await fetch(`${$BackendHost}/read_histories?user_id=${$CurrentUser.ID}`);
      histories = await response.json();
    }
	});
</script>

<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css" />
<ion-header translucent={true}>
	<ion-toolbar>
		<ion-buttons slot="start">
			<ion-menu-button />
		</ion-buttons>

		<ion-buttons slot="end" />

		<ion-title>Users</ion-title>
	</ion-toolbar>
	<ion-searchbar placeholder="Search Books" />
</ion-header>

<ion-content fullscreen>
	<ion-list>
		<ion-list-header>BookShelf</ion-list-header>
		{#each histories as history}
			<ion-item>
				<ion-label>
					<h2>{history.Book.title}</h2>
					<h3>{history.Book.author}</h3>
					<p>{history.Book.description}</p>
				</ion-label>
			</ion-item>
		{/each}
	</ion-list>
</ion-content>

<Menu />

<style>
	ion-card img {
	}

	.description {
		margin-bottom: 20px;
	}
</style>
