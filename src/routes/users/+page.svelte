<script lang="ts">
	import Menu from '../menu.svelte';
	import { BackendHost, CurrentUser } from '../../store.js';
	import BookShelf from '../Components/BookShelf.svelte';
	import UserStats from '../Components/UserStats.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getCookie } from 'svelte-cookie';

	let users = [];
  let histories = [];
  let userName = "test";

	let modal;
	const openModal = async (userID, userName) => {
    histories = await getHistories(userID);
		modal.isOpen = true;
	};

	const closeModal = () => {
		modal.isOpen = false;
	};

  const getHistories = async (userID) => {
			const response = await fetch(`${$BackendHost}/read_histories?user_id=${userID}`);
			return await response.json();
  }

	onMount(async () => {
		const userID = getCookie('userID');
		if (!userID) {
			window.location.href = '/';
			$CurrentUser.ID = Number(userID);
		}

		const response = await fetch(`${$BackendHost}/users`);
		users = await response.json();
	});
</script>

<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css" />

<ion-content fullscreen>
	<ion-list>
		<ion-list-header>Users</ion-list-header>
		{#each users as user}
			<ion-item>
				<ion-label on:click={() => {openModal(user.ID)}}>
					<h2>{user.Name}</h2>
				</ion-label>
			</ion-item>
		{/each}
	</ion-list>
</ion-content>

<ion-modal bind:this={modal}>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="primary">
				<ion-button on:click={closeModal}>Close</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		<UserStats {histories} {userName} />
		<BookShelf {histories} />
	</ion-content>
</ion-modal>

<style>
	ion-card img {
	}

	.description {
		margin-bottom: 20px;
	}
</style>
