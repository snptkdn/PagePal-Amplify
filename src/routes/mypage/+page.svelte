<script lang="ts">
	import Menu from '../menu.svelte';
	import BookShelf from '../Components/BookShelf.svelte';
	import UserStats from '../Components/UserStats.svelte';
	import { BackendHost } from '../../store.js';
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

<ion-content fullscreen>
  <UserStats {histories} />
	<BookShelf {histories} />
</ion-content>

<style>
</style>
