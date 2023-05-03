<script lang="ts">
	import { writable } from 'svelte/store';
	import Menu from '../menu.svelte';

	export let books: Object[] = [];
	const handleInput = async (event) => {
		books = [];
		const query = event.target.value;
		// if (query === '') {
		// 	window.location.reload();
		// }
		const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
		const res_json = await res.json();
		books = res_json.items;

		console.log(books);
	};
</script>

<Menu>
	<ion-searchbar placeholder="book name" on:ionChange={handleInput} />
	<ion-content class="ion-padding">
		{#if books.length > 0}
			{#each books as book}
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

					<ion-card-content>
						{book.volumeInfo.description}
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
