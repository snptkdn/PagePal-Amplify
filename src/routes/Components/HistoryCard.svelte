<script>
	import IonNav from 'ionic-svelte/components/IonNav.svelte';
	import IonPage from 'ionic-svelte/components/IonPage.svelte';

	export let histories;

	const getDateString = (date, is_detail) => {
		const datetime = new Date(date);
		console.log(typeof datetime.getMonth());
		const month = datetime.getMonth() + 1;
		if (is_detail) {
			return (
				datetime.getFullYear() +
				'/' +
				month +
				'/' +
				datetime.getDay() +
				'      ' +
				datetime.getHours() +
				':' +
				datetime.getMinutes()
			);
		} else {
			return datetime.getFullYear() + '年' + month + '月';
		}
	};
</script>

<ion-content class="ion-padding">
	{#each histories as history}
		<ion-card>
			<ion-card-header>
				<ion-card-title>
					<strong>{history.User.Name}</strong> が <strong>{history.Book.title}</strong> を読了しました
				</ion-card-title>
				<ion-card-subtitle>{getDateString(history.CreatedAt, true)}</ion-card-subtitle>
			</ion-card-header>

			<div class="card_body">
				<img class="book_image" alt="image" src={history.Book.image_url} />
				<div class="spacer" />
			</div>
			<ion-item class="ion-text-center">
				<ion-label>
					<div class="test">{history.Rate}点と評価しました</div>
				</ion-label>
			</ion-item>
		</ion-card>
	{/each}
</ion-content>

<style>
	.card_body {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.test {
		padding-top: 2px;
	}

	.spacer {
		width: 100%;
	}

	.book_image {
		height: 130;
	}
</style>
