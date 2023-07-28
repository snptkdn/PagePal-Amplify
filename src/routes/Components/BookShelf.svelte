<script>
	export let histories;

  const getDateString = (date) => {
    const datetime = new Date(date);
    console.log(typeof datetime);
    return datetime.getFullYear() + "年" + datetime.getMonth()+1 + "月" + datetime.getDate() + "日"
  }
</script>

<ion-card>
	<ion-list>
		<ion-list-header>BookShelf</ion-list-header>
		{#each histories as history}
			<ion-item>
				<ion-label>
					<img
						class="book_image"
						alt="image"
						src={history.Book.image_url}
					/>
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
