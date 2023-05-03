<script lang="ts">
	import { writable } from 'svelte/store';
	import Menu from '../menu.svelte';

	export let books: Object[] = [];
	const handleInput = async (event) => {
		books = [];
		const query = event.target.value;
		if (query === '') {
			window.location.reload();
		}
		const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
		const res_json = await res.json();
		books = res_json.items;

		console.log(books);
	};
</script>

<Menu>
	<ion-searchbar placeholder="book name" on:ionInput={handleInput} />
	<ion-content class="ion-padding">
		{#if books.length > 0}
			{#each books as book}
				<ion-card>
					{#if 'imageLinks' in book.volumeInfo}
						<img
							alt="Silhouette of mountains"
							src={book.volumeInfo.imageLinks.smallThumbnail}
						/>
          {:else}
						<img
							alt="Silhouette of mountains"
							src="https://ionicframework.com/docs/img/demos/card-media.png"
						/>
					{/if}
					<ion-card-header>
						<ion-card-title>{book.volumeInfo.title}</ion-card-title>
						<ion-card-subtitle>{book.volumeInfo.description}</ion-card-subtitle>
						{#if 'authors' in book.volumeInfo}
							<ion-card-subtitle>{book.volumeInfo.authors[0]}</ion-card-subtitle>
						{/if}
					</ion-card-header>

					<ion-card-content>
						Here's a small text description for the card content. Nothing more, nothing less.
					</ion-card-content>
				</ion-card>
			{/each}
		{:else}
			<ion-content>There are no books.</ion-content>
		{/if}
	</ion-content>
</Menu>

<style>
	ion-card img {
	}
</style>
