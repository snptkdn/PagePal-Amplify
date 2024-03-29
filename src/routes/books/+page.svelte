<script lang="ts">
	import IonNav from 'ionic-svelte/components/IonNav.svelte';
	import Menu from '../menu.svelte';
	import { star } from 'ionicons/icons';
	import { BackendHost, CurrentUser } from '../../store.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getCookie } from 'svelte-cookie';

	onMount(async () => {
		const userID = getCookie('userID');
		if (!userID) {
			window.location.href = '/';
		}
		$CurrentUser.ID = Number(userID);
	});

	export let books: Object[] = [];
	const handleInput = async (event) => {
		const query = event.target.value;
		// if (query === '') {
		// 	window.location.reload();
		// }
		const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
		const res_json = await res.json();
		books = res_json.items;
	};

	let modal;
	let selectedBook = null;
	let rate;
	let date;

	const postReadHistory = async (book, rate, date) => {
    console.log(date);
		const isbn = book.volumeInfo.industryIdentifiers.find((id) => id.type === 'ISBN_13' || id.type === 'ISBN_10' || id.type === 'OTHER').identifier;
		const data = {
			isbn: isbn,
			author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : null,
			page_count: book.volumeInfo.pageCount,
			title: book.volumeInfo.title,
			image_url: book.volumeInfo.imageLinks?.smallThumbnail,
			description: book.volumeInfo.description
		};
		await fetch(`${$BackendHost}/books`, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const target_book = await fetch(`${$BackendHost}/books?isbn=${isbn}`, {
			mode: 'cors'
		})
			.then((res) => res.json())
			.then((json) => json);

		console.log(target_book.ID);
    
    let today = new Date();
    today.setHours(9);
    if (date === undefined) {
      date = today.toISOString();
    } else {
      date = date+"Z";
    }

		const history_data = {
			user_id: $CurrentUser.ID,
			book_id: target_book.ID,
			is_read: true,
      rate: rate,
      date: date,
		};

		await fetch(`${$BackendHost}/read_histories`, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(history_data)
		});
		closeModal();
	};

	const openModal = (book) => {
		selectedBook = book;
		modal.isOpen = true;
	};

	const closeModal = () => {
		modal.isOpen = false;
	};
</script>

<ion-searchbar placeholder="book name" on:ionChange={handleInput} />
<ion-content class="ion-padding">
	{#if books.length > 0}
		{#each books as book}
			<!-- {#if book.volumeInfo.industryIdentifiers.some((id) => id.type === 'ISBN_13' || id.type === 'ISBN_10' || id.type === 'Other')} -->
				<ion-card>
					{#if 'imageLinks' in book.volumeInfo}
						<img alt="Silhouette of mountains" src={book.volumeInfo.imageLinks.smallThumbnail} />
					{:else}
						<img
							alt="Silhouette of mountains"
							src="https://ionicframework.com/docs/img/demos/card-media.png"
						/>
					{/if}
					<ion-card-header>
						<ion-card-title>{book.volumeInfo.title}</ion-card-title>
						{#if 'authors' in book.volumeInfo}
							<ion-card-subtitle>著者: {book.volumeInfo.authors[0]}</ion-card-subtitle>
						{/if}
						{#if 'publishedDate' in book.volumeInfo}
							<ion-card-subtitle>発売日: {book.volumeInfo.publishedDate}</ion-card-subtitle>
						{/if}
					</ion-card-header>

					<ion-button expand="block" on:click={() => openModal(book)} color="medium">
						<ion-label>View Detail</ion-label>
					</ion-button>
				</ion-card>
			<!-- {/if} -->
		{/each}
	{:else}
		<ion-content>There are no books.</ion-content>
	{/if}

	<ion-content class="ion-padding">
		<ion-modal bind:this={modal}>
			{#if selectedBook !== null}
				<ion-header>
					<ion-toolbar>
						<ion-buttons slot="secondary">
							<ion-button
								expand="block"
								on:click={() => postReadHistory(selectedBook, rate.value, date.value)}
								color="warning"
							>
								<ion-label>読んだ！</ion-label>
							</ion-button>
						</ion-buttons>
						<ion-title>{selectedBook.volumeInfo.title}</ion-title>
						<ion-buttons slot="primary">
							<ion-button on:click={closeModal}>Close</ion-button>
						</ion-buttons>
					</ion-toolbar>
				</ion-header>
				<ion-content class="ion-padding">
					{#if 'imageLinks' in selectedBook.volumeInfo}
						<img
							alt="Silhouette of mountains"
							src={selectedBook.volumeInfo.imageLinks.smallThumbnail}
						/>
					{:else}
						<img
							alt="Silhouette of mountains"
							src="https://ionicframework.com/docs/img/demos/card-media.png"
						/>
					{/if}
					<ion-item-group>
						<ion-item-divider>
							<ion-label> AUTHOR </ion-label>
						</ion-item-divider>
						{#if 'authors' in selectedBook.volumeInfo}
							<ion-item>{selectedBook.volumeInfo.authors[0]}</ion-item>
						{:else}
							<ion-item> No Info </ion-item>
						{/if}

						<ion-item-divider>
							<ion-label> PUBLISH DATE </ion-label>
						</ion-item-divider>
						{#if 'publishedDate' in selectedBook.volumeInfo}
							<ion-item>{selectedBook.volumeInfo.publishedDate}</ion-item>
						{:else}
							<ion-item> No Info </ion-item>
						{/if}

						<ion-item-divider>
							<ion-label> PAGE COUNT </ion-label>
						</ion-item-divider>
						{#if 'pageCount' in selectedBook.volumeInfo}
							<ion-item>{selectedBook.volumeInfo.pageCount}</ion-item>
						{:else}
							<ion-item> No Info </ion-item>
						{/if}

						<ion-item-divider>
							<ion-label> RATING </ion-label>
							<ion-range pin bind:this={rate}>
								<ion-icon slot="start" name="snow-outline" />
								<ion-icon slot="end" name="sunny-outline" />
							</ion-range>
						</ion-item-divider>

						<ion-item-divider>
							<ion-label> DATE </ion-label>
						</ion-item-divider>
						<ion-datetime presentation="month-year" bind:this={date} />

						<br />
					</ion-item-group>

					<ion-item class="description">{selectedBook.volumeInfo.description}</ion-item>
					<br />
				</ion-content>
			{/if}
		</ion-modal>
	</ion-content>
</ion-content>

<style>
	ion-card img {
	}

	.description {
		margin-bottom: 20px;
	}
</style>
