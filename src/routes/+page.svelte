<script>
</script>

<ion-menu content-id="main-content">
	<ion-header>
		<ion-toolbar>
			<ion-title>Menu</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content>
		<ion-list>
			<ion-item button> Users </ion-item>
			<ion-item button> Books </ion-item>
			<ion-item button> Ranking </ion-item>
		</ion-list>
	</ion-content>
	<ion-footer>
		<ion-toolbar>
			<ion-avatar slot="start">
				<img
					alt="Silhouette of a person's head"
					src="https://ionicframework.com/docs/img/demos/avatar.svg"
				/>
			</ion-avatar>
			<ion-label> Test User </ion-label>
		</ion-toolbar>
	</ion-footer>
</ion-menu>
<div class="ion-page" id="main-content">
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-title>PagePal</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding"> Welcome to PagePal. </ion-content>
</div>

<style>
	ion-avatar img {
		width: 60% !important;
		height: 60% !important;
    margin: 15%;
	}
</style>
