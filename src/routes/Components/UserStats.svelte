<script>
	export let histories;
</script>

<ion-card>
	<ion-card-header>
		<ion-card-title> SNPTKDN </ion-card-title>
	</ion-card-header>
	<ion-grid>
		<ion-row>
			<ion-col>
				<div class="stats_header">THIS MONTH</div>
				<div class="stats">1 Books</div>
				<div class="stats">164 Pages</div>
			</ion-col>

			<ion-col>
				<div class="stats_header">THIS YEAR</div>
				<div class="stats">13 Books</div>
				<div class="stats">1657 Pages</div>
			</ion-col>

			<ion-col>
				<div class="stats_header">TOTAL</div>
				<div class="stats">1 Books</div>
				<div class="stats">164 Pages</div>
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
