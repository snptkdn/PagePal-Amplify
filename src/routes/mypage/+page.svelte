<script lang="ts">
	import Menu from '../menu.svelte';
</script>

<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css" />
<ion-header translucent={true}>
	<ion-toolbar>
		<ion-buttons slot="start">
			<ion-menu-button />
		</ion-buttons>

		<ion-buttons slot="end" />

		<ion-title>Users</ion-title>
	</ion-toolbar>
  <ion-searchbar placeholder="Search Books"/>
</ion-header>

<ion-content fullscreen>
	<ion-list>
		<ion-list-header>BookShelf</ion-list-header>
		<ion-item>
			<ion-label>
				<h2>Finn</h2>
				<h3>I'm a big deal</h3>
				<p>Listen, I've had a pretty messed up day...</p>
			</ion-label>
		</ion-item>
	</ion-list>
</ion-content>

<Menu />

<style>
	ion-card img {
	}

	.description {
		margin-bottom: 20px;
	}
</style>
