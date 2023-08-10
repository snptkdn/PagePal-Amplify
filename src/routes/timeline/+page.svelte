<script lang="ts">
	import BookShelf from '../Components/BookShelf.svelte';
	import UserStats from '../Components/UserStats.svelte';
	import { BackendHost } from '../../store.js';
	import { CurrentUser } from '../../store.js';
	import { onMount } from 'svelte';
	import { getCookie } from 'svelte-cookie';
	import HistoryCard from '../Components/HistoryCard.svelte';

	let histories = [];
	let userName = '';

	onMount(async () => {
		const userID = getCookie('userID');
		userName = getCookie('userName');
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

<ion-content fullscreen>
	<HistoryCard {histories} />
</ion-content>

<style>
</style>
