<script>
	export let histories;

	const getDateString = (date) => {
		const datetime = new Date(date);
		console.log(typeof datetime.getMonth());
		const month = datetime.getMonth() + 1;
		return datetime.getFullYear() + '年' + month + '月';
	};
</script>

<ion-card>
	<ion-list>
		<ion-list-header>BookShelf</ion-list-header>
		{#each histories as history}
			<ion-item>
				<ion-label>
					{#if history.Book.image_url !== ''}
						<img class="book_image" alt="image" src={history.Book.image_url} />
					{/if}
					<h2>{history.Book.title}</h2>
					<h3>{history.Book.author}</h3>
					<p>{history.Book.description}</p>
					<h3>Rating</h3>
					<p>{history.Rate}</p>
					<h3>Date</h3>
					<p>{getDateString(history.Date)}</p>
				</ion-label>
			</ion-item>
		{/each}
	</ion-list>
</ion-card>

<style>
	.book_image {
		height: 20%;
	}
</style>
