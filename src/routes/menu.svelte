<script>
	import { goto } from '$app/navigation';

	const Navigate = () => {
		goto('/books');
	};
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
			<ion-item button on:click={Navigate}> Ranking </ion-item>
		</ion-list>
	</ion-content>
	<ion-footer>
		<ion-toolbar>
			<ion-avatar>
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

  <slot />
</div>
