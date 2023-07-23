<script lang="ts">
	import Menu from '../menu.svelte';
  import { BackendHost} from '../../store.js'
  import { CurrentUser } from '../../store.js';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getCookie } from 'svelte-cookie';

	let histories = [];

	onMount(async () => {
    const userID = getCookie('userID');
    if (!userID) {
      window.location.href = '/';
      $CurrentUser.ID = Number(userID);
    }
    if (userID) {
      const response = await fetch(`${$BackendHost}/read_histories?user_id=${getCookie('userID')}`);
      histories = await response.json();
    }
	});
</script>

<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css" />
<ion-header translucent={true}>
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


<style>
	ion-card img {
	}

	.description {
		margin-bottom: 20px;
	}
</style>
