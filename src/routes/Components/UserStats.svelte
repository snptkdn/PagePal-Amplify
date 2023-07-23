<script>
	export let histories;
	export let userName;

	let count_books_month;
	let count_books_year;
	let count_books_all;
	let count_pages_month;
	let count_pages_year;
	let count_pages_all;

	const isThisMonth = (date, today) => {
		const year = date.getYear();
		const month = date.getMonth();
		return year === today.getYear() && month === today.getMonth();
	};

	const isThisYear = (date, today) => {
		const year = date.getYear();
		return year === today.getYear();
	};

	$: {
		console.log(histories);
		const today = new Date();
		count_books_month = histories.filter((history) =>
			isThisMonth(new Date(history.CreatedAt), today)
		).length;
		count_books_year = histories.filter((history) =>
			isThisYear(new Date(history.CreatedAt), today)
		).length;
		count_books_all = histories.length;
		count_pages_month = histories
			.filter((history) => isThisMonth(new Date(history.CreatedAt), today))
			.reduce((acc, history) => acc + history.Book.page_count, 0);
		count_pages_year = histories
			.filter((history) => isThisYear(new Date(history.CreatedAt), today))
			.reduce((acc, history) => acc + history.Book.page_count, 0);
		count_pages_all = histories
			.reduce((acc, history) => acc + history.Book.page_count, 0);
	}
</script>

<ion-card>
	<ion-card-header>
		<ion-card-title> {userName} </ion-card-title>
	</ion-card-header>
	<ion-grid>
		<ion-row>
			<ion-col>
				<div class="stats_header">THIS MONTH</div>
				<div class="stats">{count_books_month} Books</div>
				<div class="stats">{count_pages_month} Pages</div>
			</ion-col>

			<ion-col>
				<div class="stats_header">THIS YEAR</div>
				<div class="stats">{count_books_year} Books</div>
				<div class="stats">{count_pages_year} Pages</div>
			</ion-col>

			<ion-col>
				<div class="stats_header">TOTAL</div>
				<div class="stats">{count_books_all} Books</div>
				<div class="stats">{count_pages_all} Pages</div>
			</ion-col>
		</ion-row>
	</ion-grid>
</ion-card>

<style>
	ion-col {
		text-align: center;
	}

	.stats_header {
		font-size: 200%;
		padding-bottom: 10px;
	}

	.stats {
		font-size: 150%;
		padding-bottom: 5px;
	}
</style>
