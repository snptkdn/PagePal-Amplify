<script>
	import { goto } from '$app/navigation';

	const NavigateBooks = () => {
		goto('/books');
	};
  
	const NavigateUsers = () => {
		goto('/users');
	};
  
	const NavigateMyPage = () => {
		goto('/mypage');
	};
  
	const NavigateTimeLine = () => {
		goto('/timeline');
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
			<ion-item button on:click={NavigateUsers}> Users </ion-item>
			<ion-item button on:click={NavigateBooks}> Books </ion-item>
			<ion-item button on:click={NavigateMyPage}> MyPage </ion-item>
			<ion-item button on:click={NavigateTimeLine}> TimeLine </ion-item>
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
