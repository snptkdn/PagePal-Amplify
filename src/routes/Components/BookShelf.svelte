<script>
	export let histories;

  const getDateString = (date) => {
    const datetime = new Date(date);
    console.log(typeof datetime);
    return datetime.getFullYear() + "年" + datetime.getMonth() + "月" + datetime.getDate() + "日"
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
					<p class="rate">{history.Rate}</p>
					{#if history.Rate < 60}
						<ion-progress-bar color="danger" value={history.Rate/100} />
					{:else if history.Rate < 80}
						<ion-progress-bar color="warning" value={history.Rate/100} />
					{:else if history.Rate < 90}
						<ion-progress-bar color="success" value={history.Rate/100} />
					{:else if history.Rate < 95}
						<ion-progress-bar color="secondary" value={history.Rate/100} />
					{:else}
						<ion-progress-bar color="primary" value={history.Rate/100} />
					{/if}
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
