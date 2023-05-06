<script lang="ts">
	import IonNav from 'ionic-svelte/components/IonNav.svelte';
	import Menu from '../menu.svelte';

	export let books: Object[] = [];
	const handleInput = async (event) => {
		const query = event.target.value;
		// if (query === '') {
		// 	window.location.reload();
		// }
		const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
		const res_json = await res.json();
		books = res_json.items;

		console.log(books);
	};

	let modal;
	let selectedBook = null;
	const openModal = (book) => {
		selectedBook = book;
		modal.isOpen = true;
	};

	const closeModal = () => {
		modal.isOpen = false;
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

					<ion-button expand="block" on:click={() => openModal(book)} color="medium">
						<ion-label>View Detail</ion-label>
					</ion-button>
				</ion-card>
			{/each}
		{:else}
			<ion-content>There are no books.</ion-content>
		{/if}

		<ion-content class="ion-padding">
			<ion-modal bind:this={modal}>
				{#if selectedBook !== null}
					<ion-header>
						<ion-toolbar>
							<ion-title>{selectedBook.volumeInfo.title}</ion-title>
							<ion-buttons slot="end">
								<ion-button fill="solid" expand="block" on:click={() => openModal(book)} color="warning">
									<ion-label>読んだ！</ion-label>
								</ion-button>
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

							<br />
						</ion-item-group>
            
						<ion-item class="description">{selectedBook.volumeInfo.description}</ion-item>
						<br />
					</ion-content>
				{/if}
			</ion-modal>
		</ion-content>
	</ion-content>
</Menu>

<style>
	ion-card img {
	}

	.description {
		margin-bottom: 20px;
	}
</style>
