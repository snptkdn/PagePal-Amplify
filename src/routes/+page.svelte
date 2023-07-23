<script>
	import { BackendHost } from '../store';
	import { CurrentUser } from '../store';
	import { goto } from '$app/navigation';

	let userName = null;
	let password = null;
	let error = '';

	const onLogin = async (userName, password) => {
		const data = {
			user_name: userName.value,
			password: password.value
		};
		const res = await fetch(`${$BackendHost}/signin`, {
			method: 'POST',
			mode: 'cors',
			// headers: {
			// 	'Content-Type': 'application/json'
			// },
			body: JSON.stringify(data)
		});

		console.log(res);
		if (res.ok) {
			const userID = await res.text();
			CurrentUser.set({
				ID: Number(userID),
				Name: userName.value
			});
			error = 'ログインに成功しました！';

      goto('/mypage');
		} else {
			error = 'ユーザーネームかパスワードが間違っています。';
		}
	};

	const onSignUp = async (userName, password) => {
		const data = {
			user_name: userName.value,
			password: password.value
		};
		const res = await fetch(`${$BackendHost}/signup`, {
			method: 'POST',
			mode: 'cors',
			// headers: {
			// 	'Content-Type': 'application/json'
			// },
			body: JSON.stringify(data)
		});

		if (res.ok) {
			const user = await res.json();
			console.log(user);
			CurrentUser.set({
				ID: Number(user.ID),
				Name: user.Name
			});
			error = '登録しました！そのままログインしてください！';
		} else {
			error = 'そのユーザーネームは既に使われています。';
		}
	};
</script>

<ion-content class="ion-padding">
	<dev class="title_area">
		{#if $CurrentUser.ID === 0}
			<dev class="title"> Welcome to PagePal! </dev>
		{:else}
			<dev class="title"> Welcome to {$CurrentUser.Name} </dev>
		{/if}
	</dev>
	<dev class:error_message={error}>
		{error}
	</dev>
	<ion-item>
		<ion-input label="UserName" placeholder="Enter user name" bind:this={userName} />
	</ion-item>
	<ion-item>
		<ion-input type="password" label="Password" placeholder="Enter password" bind:this={password} />
	</ion-item>
	<ion-item>
		<ion-button
			on:click={() => {
				onLogin(userName, password);
			}}
		>
			ログイン
		</ion-button>
		<ion-button
			on:click={() => {
				onSignUp(userName, password);
			}}
		>
			登録
		</ion-button>
	</ion-item>
</ion-content>

<style>
	.title_area {
		display: flex;
		align-items: center;
	}
	.title {
		font-size: 40px;
		text-align: center;
		padding-top: 10px;
		padding-bottom: 20px;
	}

	.error_message {
		color: red;
	}
</style>
